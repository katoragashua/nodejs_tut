const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide a company name."],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide a position."],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["Interview", "Declined", "Pending"],
      default: "Pending",
      maxlength: 50,
    },
    createdBy: {
      // type: mongoose.Types.ObjectId,
      type: String,
      // ref: "User",
      required: [true, "Please provide a user."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
