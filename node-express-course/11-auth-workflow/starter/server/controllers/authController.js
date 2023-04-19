const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse, createTokenUser } = require("../utils");
const bcrypt = require("bcryptjs");
// Please bear in mind that for verification tokens, we can use packages like uuid etc, but for the sake of this project we will use the crypto package.
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const utilFuncs = require("../utils/index");
const sgMail = require("@sendgrid/mail");
const { log } = require("console");
const Token = require("../models/Token");

// We can create a comparePassword function here as seen below or we can use methods in the Schema
const comparePassword = async (password, userPassword) => {
  const isCorrectPassword = await bcrypt.compare(password, userPassword);
  if (!isCorrectPassword) {
    throw new CustomError.UnauthenticatedError(
      "Please enter a correct password."
    );
  }
  return isCorrectPassword;
};

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  const origin = "http://localhost:3000";
  console.log(req.headers);
  await utilFuncs.sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });
  res.status(StatusCodes.CREATED).json({
    user,
    verificationToken: user.verificationToken,
    msg: "Success! Check your email to verify your account.",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError(
      "Please verify your account to continue."
    );
  }

  let refreshToken = "";

  // Since we don't want to keep creating token documents on every login. We can check if a token exists already where the user property is set to the users _id property (user._id). If it does, we check is the existingToken' isValid property is set to true andset the refresh token declared above to the existingToken.refreshToken. Else we throw an error if the existingToken' isValid property is set to false
  const existingToken = await Token.findOne({ user: user._id });
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new CustomError.UnauthenticatedError("Not authenticated.");
    }
    refreshToken = existingToken.refreshToken;
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  let ip = req.ip;
  let userAgent = req.get("user-agent"); // or req.headers["user-agent"]

  // console.log(req.get("user-agent"))
  // console.log(req.ip);
  const userToken = { refreshToken, ip, userAgent, user: user._id };
  // const token = await Token.create(userToken)
  await Token.create(userToken);
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser, refreshToken });
  res.status(StatusCodes.OK).json({ user });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  if (!verificationToken || !email) {
    throw new CustomError.BadRequestError("Expired");
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new CustomError.NotFoundError("User not found");
  }
  if (!(verificationToken === user.verificationToken)) {
    throw new CustomError.UnauthenticatedError("Verification failed");
  }
  user.isVerified = true;
  user.verificationToken = "";
  user.verified = new Date(Date.now());
  await user.save();
  res.status(StatusCodes.OK).json(user);
};

// const sendEmail = async (req, res) => {
//     sgMail.setApiKey(process.env.BANANA_BANDIT_KEY)
//     const msg = {
//       to: "katoragashua@gmail.com", // Change to your recipient
//       from: "katoragashua@outlook.com", // Change to your verified sender
//       subject: "Sending with SendGrid is Fun",
//       // text: "and easy to do anywhere, even with Node.js",
//       html: "<strong>and easy to do anywhere, even with Node.js</strong>",
//     };
//     const info = await sgMail.send(msg);
//     // res.json(info);
//     return info
// }

const logout = async (req, res) => {
  const token = await Token.findOne({ user: req.user.userId });
  if (!token) {
    throw new CustomError.BadRequestError("User not found");
  }
  await token.remove();
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  // res.cookie("accessToken", "logout", {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + 1000),
  // });

  // res.cookie("refreshToken", "logout", {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + 1000),
  // });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError.BadRequestError("Please enter an email.");
  }
  const user = await User.findOne({ email: email });
  // Here we do not throw an error if the user does not exist because we don't wan't an attacker to keep trying different emails.
  if (user) {
    const expirationTime = 1000 * 60 * 60; // One hour
    const origin = "http://localhost:3000";
    const passwordToken = crypto.randomBytes(40).toString("hex");
    const passwordTokenExpirationDate = new Date(Date.now() + expirationTime);
    await utilFuncs.sendResetEmail({
      name: user.name,
      email: user.email,
      passwordToken,
      origin,
    });

    // We hash the passwordToken when we save in database.
    user.passwordToken = utilFuncs.hashString(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check you email address for a password reset link." });
};

const resetPassword = async (req, res) => {
  const { email, token, password } = req.body;
  if (!email || !token || !password) {
    throw new CustomError.BadRequestError("");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new CustomError.NotFoundError("User not found.");
  }
  // Note that the passwordToken in the database is the hashed one. So we compare hash incoming token coming from the body and compare them.
  if (user.passwordToken !== utilFuncs.hashString(token)) {
    throw new CustomError.UnauthenticatedError("Invalid credentials.");
  }

  if (!(user.passwordTokenExpirationDate > new Date())) {
    throw new CustomError.BadRequestError("Password token expired.");
  }

  user.password = password;
  user.passwordToken = null;
  user.passwordTokenExpirationDate = null;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Password reset." });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
