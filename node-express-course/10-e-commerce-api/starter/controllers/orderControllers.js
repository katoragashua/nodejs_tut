const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const Order = require("../models/Order");
const Product = require("../models/Product");

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json(orders);
};

const getSingleOrder = async (req, res) => {
  res.status(StatusCodes.OK).json("Get single order.");
};

const createOrder = async (req, res) => {
  const { tax, cartItems, shippingFee } = req.body;
  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("No cart items provided");
  }

  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError(
      "Please provide tax and shipping fee."
    );
  }

  const orderItems = [];
  const subTotal = 0;

  for (let item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new CustomError.NotFoundError("Product not found");
    }
    const { name, _id, price, image } = dbProduct;
    const singleItem = {
      name,
      price,
      image,
      product: _id,
      amount: item.amount,
    };
    orderItems = [...orderItems, singleItem];
    subTotal += item.amount * price;
  }
  const total = tax + shippingFee + subTotal

  res.status(StatusCodes.CREATED).json(order);
};

const getCurrentUserOrder = async (req, res) => {
  res.status(StatusCodes.OK).json("Get Current User order.");
};

const updateOrder = async (req, res) => {
  res.status(StatusCodes.OK).json("Update order.");
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
  getCurrentUserOrder,
  updateOrder,
};
