const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const Product = require("../models/Product");
const path = require("path");

const getAllProducts = async (req, res) => {
  const products = await Product.find({}).populate("reviews");
  res
    .status(StatusCodes.OK)
    .json({ product: products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  // Note that for virtuals, we do not need a path in the populate method.
  const product = await Product.findOne({ _id: productId }).populate("reviews");
  if (!product) {
    throw new CustomError.NotFoundError(
      `Product with id ${productId} not found`
    );
  }
  res.status(StatusCodes.OK).json(product);
};

const createProduct = async (req, res) => {
  const product = await Product.create({ ...req.body, user: req.user.userId });
  res.status(StatusCodes.CREATED).json(product);
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new CustomError.NotFoundError(
      `Product with id ${productId} not found`
    );
  }
  res.status(StatusCodes.OK).json(product);
};

const uploadImage = async (req, res) => {
  console.log(req.files);
  // First check if theres a file in req.files. If not, throw an error
  if (!req.files) {
    throw new CustomError.BadRequestError("No file uploaded.");
  }
  // If there's a req.file, assign req.files.image to a variable
  const productImg = req.files.image;
  // Check if the file format is an image by checking req.files.mimetype. If not, throw an error.
  if (!productImg.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload an image.");
  }

  // Optionally you can limit the size of images to 5mb
  const maxSize = 1024 * 1024 * 5;
  if (productImg.size > maxSize) {
    throw new CustomError.BadRequestError("Image must be less than 5mb.");
  }
  // Use the path module to assign the image to a path you want it to be saved. As seen below.
  const imgPath = path.resolve(
    __dirname,
    "../public/uploads",
    `${productImg.name}`
  );
  // Use the express fileUpload method mv() to move the image file to the folder. This is asynchronous
  await productImg.mv(imgPath);

  res.status(StatusCodes.OK).json({
    image: { src: `/uploads/${productImg.name}` },
    msg: "Image uploaded succesfully",
  });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(
      `Product with id ${productId} not found`
    );
  }
  await product.remove();
  res
    .status(StatusCodes.OK)
    .json({ msg: `Product with id ${product._id} deleted` });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  uploadImage,
  deleteProduct,
};
