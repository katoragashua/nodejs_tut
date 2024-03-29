const customAPIError = require("./custom-error");
const { StatusCodes } = require("http-status-codes");

class UnauthorizedRequest extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

module.exports = UnauthorizedRequest;
