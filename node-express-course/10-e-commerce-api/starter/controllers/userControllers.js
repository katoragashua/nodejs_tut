const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const utilFuncs = require("../utils/index");
const bcrypt = require("bcryptjs");
const checkPermissions = require("../utils/checkPermissions");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  //   if(!req.user) {
  //     throw new CustomError.UnauthenticatedError("Login required.")
  //   }
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json(users);
};

const getSingleUser = async (req, res) => {
  const { id: userID } = req.params;
  const user = await User.findById({ _id: userID }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError("User not found.");
  }
  console.log(user._id);
  checkPermissions(req.user.userId, user._id);
  res.status(StatusCodes.OK).json(user);
};

const getCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

// Updating using findOneAndUpdate
// const updateUser = async (req, res) => {
//   const { name, email } = req.body;
//   if(!name || !email) {
//     throw new CustomError.BadRequestError("Enter email/password.")
//   }
//   const user = await User.findByIdAndUpdate(
//     { _id: req.user.userId },
//     { name, email },
//     { runValidators: true, new: true }
//   );
//   const token = await utilFuncs.createToken(user);
//   utilFuncs.setCookies(res,token)
//   const tokenUser = utilFuncs.tokenUser(user)
//   res.status(StatusCodes.OK).json({user: tokenUser});
// };

// Updating using save()
const updateUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new CustomError.BadRequestError("Enter email/password.");
  }
  console.log(req.user);
  const user = await User.findById({ _id: req.user.userId });
  user.name = name;
  user.email = email;
  await user.save();
  const token = await utilFuncs.createToken(user);
  utilFuncs.setCookies(res, token);
  const tokenUser = utilFuncs.tokenUser(user);
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  console.log(req.user);
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Enter email/password.");
  }

  const user = await User.findById({ _id: req.user.userId });
  const auth = await bcrypt.compare(oldPassword, user.password);
  if (!auth) {
    throw new CustomError.UnauthorizedError("Invalid credentials.");
  }
  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Success! Password changed." });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updateUser,
  updateUserPassword,
};
