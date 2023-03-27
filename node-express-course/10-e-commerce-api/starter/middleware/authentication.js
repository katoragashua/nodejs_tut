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

// The function is passed a rest parameter as an a parameter which takes an array of values and is invoked in the userRoute using any number of arguments. This arguments are recieved and assigned to the roles and  further used in the returned function in authorize Permissions below.
const authorizePermissions = (...roles) => {
  // console.log(roles);
  // The function below is now used as the callback function that accepts req, res and next
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError("Unauthorized request.")
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
