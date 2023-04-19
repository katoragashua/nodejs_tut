const crypto = require("crypto");

const hashString = (string) => crypto.createHash("md5").update("hex");

module.exports = hashString