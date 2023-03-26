const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");

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

  res.status(StatusCodes.OK).json(user);
};

const getCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ ...req.params });
};

const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).json("Update User");
};

const updateUserPassword = async (req, res) => {
  res.status(StatusCodes.OK).json("Update User Password");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updateUser,
  updateUserPassword,
};
