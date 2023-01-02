const CustomAPIError = require("../errors/custom-error");

const login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username.trim() || !password.trim()) {
    throw new CustomAPIError("Invalid username or password", 400);
  }
  console.log(username, password);
  res.send("Fake login/Register/Sign up Route");
};

const dashboard = async (req, res, next) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Welcome, John Doe`,
    secret: `Here is your authorized data, you secret number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
