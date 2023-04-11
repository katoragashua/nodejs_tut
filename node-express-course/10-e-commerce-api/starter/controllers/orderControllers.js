const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const Order = require("../models/Order");
const Product = require("../models/Product");
const utilFuncs = require("../utils/index");

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_Secret = "backendDeveloper";
  return {
    client_Secret,
    amount,
  };
};
const createOrder = async (req, res) => {
  const { tax, items: cartItems, shippingFee } = req.body;
  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("No cart items provided");
  }

  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError(
      "Please provide tax and shipping fee."
    );
  }
  // initialize orderItems array to an empty array
  let orderItems = [];
  // Initialize subTotal to zero
  let subTotal = 0;

  for (let item of cartItems) {
    // Check if product/s in cartItems exist in database
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
    // Add each singleItem to orderItems array
    orderItems = [...orderItems, singleItem];
    // Calculate subTotal
    subTotal += item.amount * price;
  }

  // Calculate total
  const total = tax + shippingFee + subTotal;

  const paymentIntent = await fakeStripeAPI({ amount: total, currency: "usd" });

  const order = await Order.create({
    tax,
    shippingFee,
    subTotal,
    total,
    orderItems,
    clientSecret: paymentIntent.client_Secret,
    user: req.user.userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json(orders);
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.BadRequestError("Order not found.");
  }
  utilFuncs.checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json(order);
};

const getCurrentUserOrder = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.BadRequestError("Order not found.");
  }
  utilFuncs.checkPermissions(req.user, order.user);
  order.paymentIntentId = paymentIntentId;
  order.status = "paid";
  await order.save();
  res.status(StatusCodes.OK).json(order);
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
  getCurrentUserOrder,
  updateOrder,
};
