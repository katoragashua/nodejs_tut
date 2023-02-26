// const Jobs = require("../models/jobs")
const {StatusCodes} = require("http-status-codes")

const getAllJobs = async (req, res) => {
    // try {
    //     const jobs  = await Jobs.find({})
    //     res.status(StatusCodes.OK).json(jobs)
    // }catch(err) {

    // }
};


const getJob = async (req, res) => {
};

const createJob = async (req, res) => {
    res.status(200).json(req.user)
};

const updateJob = async (req, res) => {};

const deleteJob = async (req, res) => {};

module.exports = {getAllJobs, getJob, createJob, updateJob, deleteJob };
