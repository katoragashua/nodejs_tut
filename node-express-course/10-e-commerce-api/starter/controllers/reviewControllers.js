const CustomError = require("../errors/index");
const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const Review = require("../models/Review");
const utilFuncs = require("../utils/index");

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new CustomError.NotFoundError(`Product ${reviewId} does not exist.`);
  }

  res.status(StatusCodes.OK).json(review);
};
const createReview = async (req, res) => {
  const { product: productId } = req.body;
  req.body.user = req.user.userId;
  // Check if a product exist with that id
  const isProduct = await Product.findOne({ _id: productId });
  if (!isProduct) {
    throw new CustomError.NotFoundError(
      `Product with id ${productId} not found!`
    );
  }

  // Check is user has already reviewed the product
  const alreadyReviewed = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });
  if (alreadyReviewed) {
    throw new CustomError.BadRequestError(
      "Product has already been reviewed by user."
    );
  }

  // create review
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json(review);
};


const updateReview = async (req, res) => {
  res.status(StatusCodes.OK).json("Update review");
};

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new CustomError.NotFoundError(
      `Review with id ${reviewId} not found.`
    );
  }
  utilFuncs.checkPermissions(req.user, review.user);
  await review.remove();
  res.status(StatusCodes.OK).json({ msg: "Review deleted successfully." });
};

module.exports = {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
};
