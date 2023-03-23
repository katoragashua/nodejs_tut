// Function to set cookies
const setCookies = (res, token) => {
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", //True if its in production
    signed: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
};

module.exports = setCookies;
