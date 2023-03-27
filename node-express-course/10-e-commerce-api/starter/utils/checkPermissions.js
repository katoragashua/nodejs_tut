const CustomError = require("../errors/index");


const checkPermissions = (request, resourceId) => {
    console.log(request);
    console.log(resourceId);
    console.log(typeof resourceId);
    if(request.role === "admin") return
    if(request.userId === resourceId.toString()) return
    throw new CustomError.UnauthorizedError("Not authorized to access this route.")
}

module.exports = checkPermissions