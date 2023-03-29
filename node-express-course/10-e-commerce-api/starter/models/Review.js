const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide a rating."],
    },
    title: {
      type: String,
      required: [true, "Please provide a review title."],
      maxlength: 30,
      trim: true
    },
    comment: {
      type: String,
      required: [true, "Please provide a review comment."],
      maxlength: 200,
    },
    user: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({product: 1, user: 1}, {unique: true})
module.exports = mongoose.model("Review", ReviewSchema);
