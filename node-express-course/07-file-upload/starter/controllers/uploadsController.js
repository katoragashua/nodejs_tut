const Product = require("../models/Product");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const customErrors = require("../errors/index");
const cloudinary = require("cloudinary").v2;
const fs = require("fs")

const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new customErrors.BadRequestError("Please add a file.");
  }

  const productImg = req.files.image;

  if (!req.files.image.mimetype.startsWith("image/")) {
    throw new customErrors.BadRequestError("Format must be an image.");
  }

  if (productImg.size > process.env.MAX_SIZE) {
    throw new customErrors.BadRequestError("Image size must be less than 5mb.");
  }

  const imgPath = path.resolve(
    __dirname,
    "../public/uploads",
    `${productImg.name}`
  );
  await productImg.mv(imgPath);
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImg.name}` } });
};

const uploadProductImage = async (req, res) => {
  // console.log(req.files.image);
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    { use_filename: true, folder: "file_upload" }
  );
  
  // Removing the tempfiles
  fs.unlinkSync(req.files.image.tempFilePath);
    res.status(StatusCodes.OK).json({image: {src: result.secure_url}});
};

module.exports = uploadProductImage;
