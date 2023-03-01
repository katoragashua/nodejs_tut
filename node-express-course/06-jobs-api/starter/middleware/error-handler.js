const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (error, req, res, next) => {

  const customError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || "Something went wrong try again later."
  }

  if (error.code === 11000) {
    customError.message = `A user is already signed up with this ${Object.keys(error.keyValue)[0]}.` ;
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if(error.name === "ValidationError") {
    customError.message = Object.values(error.errors).map(
      (item) => item.message
    ).join(', ');
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if(error.name === "CastError") {
    customError.message = `There is no job with id ${error.value}`
    customError.statusCode = StatusCodes.NOT_FOUND
  }

  // if (error instanceof CustomAPIError) {
  //   return res.status(error.statusCode).json({ msg: error.message });
  // }
  
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  return res.status(customError.statusCode).json( customError );
};

// const errorHandlerFunction = (err) => {
//   const errors = { email: "", password: "" };

//   if (err.code === 11000) {
//     errors.email = "The User has already been registered.";
//     return errors;
//   }

//   if (err.name === "ValidationError") {
//     Object.values(err.errors).forEach(({ properties }) => {
//       errors[properties.path] = properties.message;
//     });
//   }
//   return errors;
// };

module.exports = errorHandlerMiddleware;
