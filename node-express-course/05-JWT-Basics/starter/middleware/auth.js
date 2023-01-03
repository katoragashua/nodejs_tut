const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

// This middleware is created to handle authentication for varoius routes.
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("Invalid authorization", 401);
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
    throw new CustomAPIError("Invalid authorization", 401);
  }
};

module.exports = authMiddleware;
