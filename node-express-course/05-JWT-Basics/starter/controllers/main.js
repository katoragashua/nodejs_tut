const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

const login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username.trim() || !password.trim()) {
    throw new CustomAPIError("Invalid username or password", 400);
  }
  const id = new Date().getTime();
  console.log(id);
  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  console.log(username, password);
  res.status(200).json({ msg: "User Created", token });
};

const dashboard = async (req, res, next) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Welcome, John Doe`,
    secret: `Here is your authorized data, you secret number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
