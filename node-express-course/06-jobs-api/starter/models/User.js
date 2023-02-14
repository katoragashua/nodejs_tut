const mongoose = require("mongoose");
const Isemail = require("isemail");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your first name"],
    maxlength: [30, "Name must not exceed 30 characters"],
    minlength: [3, "Name must not not be less than 3 characters"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "An email is required to continue."],
    maxlength: [30, "Email must not exceed 30 characters"],
    minlength: [3, "Email must not not be less than 3 characters"],
    unique: [true],
    lowercase: true,
    trim: true,
    validate: [(val) => Isemail.validate(val), "Enter a valid email address."],
  },
  password: {
    type: String,
    required: [true, "A password is required."],
    minlength: [6, "Password must not not be less than 6 characters"],
    trim: true,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", UserSchema);

module.exports = User