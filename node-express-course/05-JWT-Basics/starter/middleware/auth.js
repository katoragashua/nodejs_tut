const jwt = require("jsonwebtoken");
const {
  CustomAPIError,
  BadRequest,
  UnauthorizedRequest,
} = require("../errors/index");

// This middleware is created to handle authentication for varoius routes.
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedRequest("Invalid authorization");
  }

  const token = authHeader.split(" ")[1];
  // console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded)
    const { username, id } = decoded;
    req.user = { username, id };
    // When next() is called it passes all req and res to a next middleware or function which may be route controllers.
    next();
  } catch (error) {
    throw new UnauthorizedRequest("Invalid authorization");
  }
};

module.exports = authMiddleware;
