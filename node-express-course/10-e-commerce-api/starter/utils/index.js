const { createToken, verifyToken } = require("./JWT");
const tokenUser = require("./createTokenUser");
const setCookies = require("./setCookies");
const checkPermissions = require("./checkPermissions")

module.exports = {
  createToken,
  verifyToken,
  tokenUser,
  setCookies,
  checkPermissions,
};
