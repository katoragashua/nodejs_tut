const mongoose = require("mongoose");
const { Schema } = mongoose;
const Isemail = require("isemail");
const bcrypt = require("bcryptjs");

// User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Enter a name."],
    minlength: [2, "Name must be more than 2 characters."],
    trim: true,
    maxlength: [30, "Name must not exceed 30 characters."],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [(val) => Isemail.validate(val), "Enter a valid email address."],
    trim: true,
    lowercase: true,
    minlength: [6, "Email must not not be less than 6 characters."],
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
    trim: true,
    minlength: [6, "Password must not be less than 6 characters."],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

// Hashing passwords before saving them in the database
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


module.exports = mongoose.model("User", UserSchema);
