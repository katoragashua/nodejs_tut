const {CustomAPIError, BadRequest, UnauthorizedRequest} = require("../errors/index");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username.trim() || !password.trim()) {
    throw new BadRequest("Invalid username or password");
  }

  // We are using a dummy ID
  const id = new Date().getTime();
  console.log(id);
  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable secret string value!!!!!!!!!
  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  console.log(username, password);
  res.status(200).json({ msg: "User Created", token });
};

const dashboard = async (req, res) => {
  // req.user is comming from the authMiddleware. i.e., when the next function is invoked in authMiddleware.
  console.log(req.user);
  const { username } = req.user;
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Welcome, ${username}`,
    secret: `Here is your authorized data, you secret number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
