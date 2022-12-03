const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  // The objects assigned to the schema properties are basic validators
  taskName: {
    type: String,
    required: [true, "You must enter a task name"],
    trim: true,
    maxlength: [30, "Task name must not exceed 30 characters"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});
const Task = mongoose.model("Task", TaskSchema);
module.exports = Task
