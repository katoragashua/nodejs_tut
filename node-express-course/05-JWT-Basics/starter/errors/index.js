const UnauthorizedRequest = require("./unauthorized");
const BadRequest = require("./badrequest");
const CustomAPIError = require("./custom-error")


module.exports = {
    UnauthorizedRequest,
    BadRequest,
    CustomAPIError
}