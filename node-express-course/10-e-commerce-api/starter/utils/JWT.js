const jwt = require("jsonwebtoken");

// Function for signing tokens
const createToken = (user) => {
  return jwt.sign(
    {
      userId : user._id,
      username: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

// Function for verifying tokens
const verifyToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    createToken,
    verifyToken
}