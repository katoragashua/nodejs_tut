const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");

const createToken = (user) => {
  return jwt.sign(
    { name: user.name, user: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = User.create({ ...req.body });
  const token = await createToken(user);
  return res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError(
      "Please enter a valid email or password."
    );
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("User not registered.");
  }

  const auth = await bcrypt.compare(password, user.password);

  if (!auth) {
    throw new CustomError.UnauthenticatedError("Password is incorrect.");
  }

  const token = await createToken(user);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    maxAge: 5 * 60 * 60 * 1000,
  });

  return res.status(StatusCodes.OK).json(user, token);
};

const logout = async (req, res) => {
  res.clearCookies("jwt");
  res.redirect("/");
};


module.exports = {
  register,
  login,
  logout,
};
