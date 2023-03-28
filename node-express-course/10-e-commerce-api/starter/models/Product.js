const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter products name."],
      maxlength: [50, "Name must not exceed 30 characters"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please enter products price."],
      default: 0
    },
    description: {
      type: String,
      required: [true, "Please enter a product description."],
      maxlength: [500, "Description must not exceed 500 characters"],
      trim: true,
    },
    image: {
      type: String,
      required: true,
      default: "/uploads/example.jpg"
    },
    category: {
      type: String,
      required: true,
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: true,
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: `{VALUE} is not supported.`
      }
    },
    colors: {
      type: [String],
      required: true,
      default: ["#222"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15
    },
    averageRating: {
      type: Number,
      required: true,
      default: 0
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
