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
      trim: true,
    },
    comment: {
      type: String,
      required: [true, "Please provide a review comment."],
      maxlength: 200,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);
  try {
    const product = await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(stats.length ? stats[0].averageRating : 0), //using tenary operation
        numOfReviews: stats[0]?.numOfReviews || 0, //using optional chaining
      },
      { new: true, runValidators: true }
    );
  }catch(error) {
    console.log(error)
  }
  // try {
  //   const user = await this.model("User").find({});
  //   console.log(user);
  // } catch (error) {
  //   console.log(error)
  // }
};

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post("remove", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model("Review", ReviewSchema);
