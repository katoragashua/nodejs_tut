const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskName: String,
  isCompleted: Boolean,
});

module.exports = mongoose.model("Task", TaskSchema);
