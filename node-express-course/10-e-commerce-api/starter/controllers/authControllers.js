const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const utilFuncs = require("../utils/index");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  // Checking if user is already registered
  const alreadyRegistered = await User.findOne({ email });
  if (alreadyRegistered) {
    throw new CustomError.BadRequestError("Email is already registered");
  }

  // Making the first user an admin
  // const isAdmin = await User.countDocuments({})
  // console.log(isAdmin);
  // const role = !isAdmin ? "admin" : "user"

  // or
  const isAdmin = (await User.countDocuments({})) === 0;
  const role = isAdmin ? "admin" : "user";

  const user = await User.create({ name, email, password, role });
  // Creating the JWT token
  const tokenUser = utilFuncs.tokenUser(user);
  console.log(tokenUser);
  const token = await utilFuncs.createToken(tokenUser);
  // Creating cookies
  utilFuncs.setCookies(res,token)
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // Checking if user entered an email or password
  if (!email || !password) {
    throw new CustomError.BadRequestError(
      "Please enter a valid email or password."
    );
  }

  // Checking if the user exists
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("User not registered.");
  }
  // Comparing the password entered against the user's password'
  const auth = await bcrypt.compare(password, user.password);

  if (!auth) {
    throw new CustomError.UnauthenticatedError("Password is incorrect.");
  }

  const tokenUser = utilFuncs.tokenUser(user);
  console.log(tokenUser);
  // Signing a JWT token
  const token = await utilFuncs.createToken(tokenUser);

  // Creating cookies
  utilFuncs.setCookies(res, token);

  return res.status(StatusCodes.OK).json({ user: tokenUser, token });
};

const logout = async (req, res) => {
  setTimeout(() => {
    res.clearCookie("jwt");
    res.redirect("/");
  }, 3000)
};

module.exports = {
  register,
  login,
  logout,
};
