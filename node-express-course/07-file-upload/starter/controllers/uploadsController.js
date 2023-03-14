const Product = require("../models/Product");
const path = require("path");
const { StatusCodes } = require("http-status-codes");

const uploadProductImage = async (req, res) => {
  const productImg = req.files.image;
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

module.exports = uploadProductImage;
