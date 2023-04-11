const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  amount: { type: Number, required: true, default: 0 },
  product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
});

const OrderSchema = new Schema(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: {
      type: [cartItemSchema],
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "cancelled", "delivered", "paid", "failed"],
      default: "pending",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

/*

MongoServerError: E11000 duplicate key error collection: E-Commerce-App.orders index: address_1 dup key: { address: null }
    at C:\Users\user\desktop\code\node_js_tut\node-express-course\10-e-commerce-api\starter\node_modules\mongodb\lib\operations\insert.js:53:33
    at C:\Users\user\desktop\code\node_js_tut\node-express-course\10-e-commerce-api\starter\node_modules\mongodb\lib\cmap\connection_pool.js:333:25
    at C:\Users\user\desktop\code\node_js_tut\node-express-course\10-e-commerce-api\starter\node_modules\mongodb\lib\sdam\server.js:210:17
    at handleOperationResult (C:\Users\user\desktop\code\node_js_tut\node-express-course\10-e-commerce-api\starter\node_modules\mongodb\lib\sdam\server.js:326:20)
    at Connection.onMessage (C:\Users\user\desktop\code\node_js_tut\node-express-course\10-e-commerce-api\starter\node_modules\mongodb\lib\cmap\connection.js:242:9)
    at MessageStream.<anonymous> (C:\Users\user\desktop\code\node_js_tut\node-express-course\10-e-commerce-api\starter\node_modules\mongodb\lib\cmap\connection.js:61:60)
    at MessageStream.emit (node:events:513:28)
    at processIncomingData (C:\Users\user\desktop\code\node_js_tut\node-express-course\10-e-commerce-api\starter\node_modules\mongodb\lib\cmap\message_stream.js:125:16)
    at MessageStream._write (C:\Users\user\desktop\code\node_js_tut\node-express-course\10-e-commerce-api\starter\node_modules\mongodb\lib\cmap\message_stream.js:33:9)
    at writeOrBuffer (node:internal/streams/writable:392:12) {
  index: 0,
  code: 11000,
  keyPattern: { address: 1 },
  keyValue: { address: null },
  [Symbol(errorLabels)]: Set(0) {}
}
*/