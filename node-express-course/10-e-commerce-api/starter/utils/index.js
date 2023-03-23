const { createToken, verifyToken } = require("./JWT");
const tokenUser = require("./createTokenUser");
const setCookies = require("./setCookies");

module.exports = {
  createToken,
  verifyToken,
  tokenUser,
  setCookies
};
