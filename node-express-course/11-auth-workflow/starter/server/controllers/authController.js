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

  await utilFuncs.sendEmail();
  res.status(StatusCodes.CREATED).json({
    user,
    verificationToken: user.verificationToken,
    msg: "Success! Check your email to verify your account.",
    info
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
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
};
