const jwt = require("jsonwebtoken");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors/index");
const User = require("../models/User")

// This middleware is created to handle authentication for varoius routes.
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Invalid authorization");
  }

  const token = authHeader.split(" ")[1];
  // console.log(token);
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    const { username, id } = decoded;
    // We create a property called user on the existing request object and assing it to the decoded object. 
    req.user = decoded;
    // When next() is called it passes all req and res to a next middleware or function which may be route controllers.
    next();

    // Alternatively you may see other people get the user from the User model and pass it to the next middleware
    // const user = User.findById(decoded.id).select("-password") // To remove password
    // req.user = user
    // next()
  } catch (error) {
    throw new UnauthenticatedError("Invalid authorization");
  }
};

module.exports = authMiddleware;
