const Jobs = require("../models/Job");
const User = require("../models/User");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors/index");

const { StatusCodes } = require("http-status-codes");

// This will be programmed so the user can only get his/her own created jobs
const getAllJobs = async (req, res) => {
    const allJobs = await Jobs.find({ createdBy: req.user.userID });
    res.status(StatusCodes.OK).json({ allJobs, count: allJobs.length });
  
};

const getJob = async (req, res) => {
  const {
    user: { userID },
    params: { id: jobID },
  } = req;
    const job = await Jobs.findOne({ _id: jobID, createdBy: userID });
    if (!job) {
      throw new Error(`Job with ID ${jobID} not found`);
    }
    res.status(StatusCodes.OK).json(job);
  
};

const createJob = async (req, res) => {
  const { company, position } = req.body;
  req.body.createdBy = req.user.userID;
  //   const user = await User.findById(req.user.userID); // You can use this to set the user's names as createdBy
    const job = await Jobs.create(req.body);
    console.log(job);
    res.status(StatusCodes.CREATED).json(job);
  
};

const updateJob = async (req, res) => {
  const {
    body: { company, position, status },
    user: { userID },
    params: { id: jobID },
  } = req;

  if (!company || !position) {
    throw new Error("Company and Position cannot be empty.");
  }
    const job = await Jobs.findByIdAndUpdate(
      { _id: jobID, createdBy: userID },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      throw new Error(`Job with ${jobID} does not exist`);
    }
    res.status(StatusCodes.OK).json(job);
  
};

const deleteJob = async (req, res) => {
  const {
    user: { userID },
    params: { id: jobID },
  } = req;

    const job = await Jobs.findByIdAndDelete({_id: jobID, createdBy: userID})
    if(!job) {
      throw new Error(`Job with ${jobID} does not exist`);
    }
    const allJobs = await Jobs.find({createdBy: userID})
    res.status(StatusCodes.OK).json({jobs: allJobs, count: allJobs.length})
  
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
