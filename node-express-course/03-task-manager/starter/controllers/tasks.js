const Tasks = require("../models/Task");
const asyncWrapper = require("../middleware/asyncWrapper");
const { customError} = require("../middleware/customErrorClass")

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Tasks.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Tasks.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  // Aliasing from destructured objects. This means: id as TaskID
  const { id: taskID } = req.params;

  const task = await Tasks.findOne({ _id: taskID });
  if (!task) {
    return next(customError(`Task with id ${taskID} not found`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  console.log(req.body);

  const { id: taskID } = req.params;
  const task = await Tasks.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(customError(`Task with id ${taskID} not found`, 404));
  }
  const tasks = await Tasks.find({});
  res.status(200).json({ status: "Success", task: task, tasks: tasks });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  console.log(req.body);
  const { id: taskID } = req.params;
  const task = await Tasks.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(customError(`Task with id ${taskID} not found`, 404));
  }
  const tasks = await Tasks.find({});
  res.status(200).json({
    task: null,
    status: "Success",
    deleted_task: task,
    tasks: tasks,
  });
});

// // Original without asyncWrapper
// const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Tasks.find({});
//     res.status(200).json({ tasks });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

// const createTask = async (req, res) => {
//   console.log(req.body);
//   try {
//     const task = await Tasks.create(req.body);
//     res.status(201).json({ task });
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// };

// const getTask = async (req, res) => {
//   try {
//     // Aliasing from destructured objects. This means: id as TaskID
//     const { id: taskID } = req.params;

//     const task = await Tasks.findOne({ _id: taskID });
//     if (!task) {
//       res.status(404).json({ message: `Task with id: ${taskID} not found` });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

// const updateTask = async (req, res) => {
//   console.log(req.body);
//   try {
//     const { id: taskID } = req.params;
//     const task = await Tasks.findOneAndUpdate({ _id: taskID }, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!task) {
//       return res
//         .status(404)
//         .json({ message: `Task with id: ${taskID} not found` });
//     }
//     const tasks = await Tasks.find({});
//     res.status(200).json({ status: "Success", task: task, tasks: tasks });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

// const deleteTask = async (req, res) => {
//   console.log(req.body);
//   try {
//     const { id: taskID } = req.params;
//     const task = await Tasks.findOneAndDelete({ _id: taskID });
//     if (!task) {
//       return res
//         .status(404)
//         .json({ message: `Task with id: ${taskID} not found` });
//     }
//     const tasks = await Tasks.find({});
//     res.status(200).json({
//       task: null,
//       status: "Success",
//       deleted_task: task,
//       tasks: tasks,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

/* The Difference between the PATCH and  the PUT method is that the PATCH method updates only the specified properties while the put totally replaces the original with the new*/
// const updateTaskPut = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     const task = await Tasks.findOneAndUpdate({ _id: taskID }, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }
//     const tasks = await Tasks.find({});
//     res.status(200).json({ status: "Success", task: task, tasks });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
