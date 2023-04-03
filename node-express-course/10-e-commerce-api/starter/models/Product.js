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
  { timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true} }
);

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id", // Here we are looking for what connects them. i.e., the reviews and product
  foreignField: "product",
  justOne: false,
  // match: {rating: {$lte: 3}}, //This matches products by rating. i.e., less than or equal 5
  // match: {rating: 5}, //Matches for rating = 5
});

// This hook removes all reviews associated with a product when it is removed
ProductSchema.pre("remove", async function(next) {
  await this.model("Review").deleteMany({product: this._id})
  next()
})

module.exports = mongoose.model("Product", ProductSchema);
