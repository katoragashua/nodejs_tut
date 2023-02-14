const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const createToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
};

const maxAge = 30 * 24 * 60 * 60 * 1000;

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = await createToken(user._id);
    res.cookie("user_token", token, { httpOnly: true, maxAge: maxAge });
    res.status(StatusCodes.CREATED).json(user);
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User does not exist.");
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      throw new Error("Please enter a valid password.");
    }
    return user;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { signup, login };
