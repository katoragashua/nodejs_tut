const CustomError = require("../errors");
const { isTokenValid, attachCookiesToResponse } = require("../utils");
const Token = require("../models/Token")

const authenticateUser = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      // We must return because, if we don't, javaScript just continues reading the code.
      req.user = payload.user;
      console.log(payload);
      return next();
    }
    // Remember we attached the user and refreshToken to the payload so we can use it as seen below
    const payload = isTokenValid(refreshToken);
    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken
    });
    if(!existingToken) {
      throw new CustomError.UnauthenticatedError("Not authenticated.")
    }
    attachCookiesToResponse({res, user: payload.user, refreshToken: existingToken.refreshToken})
    req.user = payload.user
    next()
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
