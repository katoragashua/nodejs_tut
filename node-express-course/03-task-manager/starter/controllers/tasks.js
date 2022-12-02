const Task = require("../models/Task");

const getAllTasks = (req, res) => {
  console.log(req.body);
  res.status(200).json(["Task1", "Task2", "Task3", "Task4", "Task5"]);
};

const createTask = async (req, res) => {
  console.log(req.body);
  const task = await Task.create(req.body);
  res.status(201).json();
};

const getTask = (req, res) => {
  console.log(req.body);
  res.status(200).json({ id: req.params.id });
};

const updateTask = (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  res.status(200).json({ message: `Task ${id} updated.`, task: req.body });
};

const deleteTask = (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  res.status(200).json({ message: `Task ${id} deleted.` });
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
