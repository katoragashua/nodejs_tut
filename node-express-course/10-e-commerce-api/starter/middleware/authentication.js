const CustomError = require("../errors/index");
const User = require("../models/User");
const utilFuncs = require("../utils/index");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.jwt;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Login required.");
  }
  console.log(token);
  const decoded = await utilFuncs.verifyToken(token, process.env.JWT_SECRET);
  if (!decoded) {
    // res.user = null
    // or
    throw new CustomError.UnauthenticatedError("Login required.");
  }
  req.user = decoded;
  next();
};

const authorizePermissions = async (req, res, next) => {
  const token = req.signedCookies.jwt;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Login required.");
  }
  console.log(token);
  const decoded = await utilFuncs.verifyToken(token, process.env.JWT_SECRET);
  if (!decoded) {
    // res.user = null
    // or
    throw new CustomError.UnauthenticatedError("Login required.");
  }
  const { role } = decoded;
  const isAdmin = role;
  if (isAdmin !== "admin") {
    throw new CustomError.UnauthorizedError("Not authorized.");
  }
  next();
};

module.exports = { authenticateUser, authorizePermissions };
