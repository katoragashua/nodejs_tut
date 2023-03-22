const mongoose = require("mongoose");
const { Schema } = mongoose;
const Isemail = require("isemail");
const bcrypt = require("bcryptjs");

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
    required: [true, "You must enter an email"],
    trim: true,
    unique: [true, "Email already signed up."],
    validate: [(val) => Isemail.validate(val), "Please enter a valid email."],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
    trim: true,
    minlength: [6, "Password must not be less than 6 characters."],
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user"
  }
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);
