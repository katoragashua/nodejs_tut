const CustomError = require("../errors/index");

// This function can be used in a lot of ways, one way is ensuring that a user who isn't an admin can only view his or her own profile only and not someone else'
const checkPermissions = (request, resourceId) => {
  console.log(request);
  console.log(resourceId);

  console.log(typeof resourceId);
  if (request.role === "admin") return;
  // the resourceId eg. a userId is usually an object and must be converted to a string to be compared as seen below
  if (request.userId === resourceId.toString()) return;
  throw new CustomError.UnauthorizedError(
    "Not authorized to access this route."
  );
};

module.exports = checkPermissions;
