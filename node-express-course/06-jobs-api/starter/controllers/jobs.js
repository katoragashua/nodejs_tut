const Jobs = require("../models/Job");
const User = require("../models/User");

const { StatusCodes } = require("http-status-codes");

// This will be programmed so the user can only get his/her own created jobs
const getAllJobs = async (req, res) => {
  try {
    const allJobs = await Jobs.find({createdBy: req.user.userID});
    res.status(StatusCodes.OK).json({allJobs, count: allJobs.length});
  } catch (error) {
    console.log(error);
  }
};

const getJob = async (req, res) => {};

const createJob = async (req, res) => {
  const { company, position } = req.body;
  req.body.createdBy = req.user.userID;
//   const user = await User.findById(req.user.userID); // You can use this to set the user's names as createdBy
  try {
    const job = await Jobs.create(req.body);
    console.log(job);
    res.status(StatusCodes.CREATED).json(job);
  } catch (error) {
    console.log(error);
  }
};

const updateJob = async (req, res) => {};

const deleteJob = async (req, res) => {};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
