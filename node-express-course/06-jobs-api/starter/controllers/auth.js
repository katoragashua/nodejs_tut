const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors/index");

const createToken = async (id, name) => {
  return jwt.sign({ userID: id, username: name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const maxAge = 30 * 24 * 60 * 60 * 1000;

const signup = async (req, res) => {
  const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = await createToken(user._id, user.name);
    // res.cookie("user_token", token, { httpOnly: true, maxAge: maxAge });
    res.status(StatusCodes.CREATED).json({ user, token });
    console.log(user);
  
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Provide email and/or password.");
  }
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError("User does not exist./Inavalid credentials");
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      throw new UnauthenticatedError("Please enter a valid password.");
    }
    console.log(user); 
    // compare password
    const token = await createToken(user._id, user.name);
    res.status(StatusCodes.OK).json({ user, token });
};

module.exports = { signup, login };
