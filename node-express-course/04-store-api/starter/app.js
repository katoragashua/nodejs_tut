const { config } = require("dotenv");
config();
// aync errors
const express = require("express");
const app = express();
const {errorHandler} = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const mongoose = require("mongoose");
const connectDB = require("./db/connect");
const router = require("./routes/products");

app.use(express.json());
// Routes
app.get("/", (req, res) => {
  res
    .status(200)
    .send(`<h1>Home page</h1> <a href="/api/v1/products">Products</a>`);
});

// Middlewares
app.use("/api/v1/products", router);
app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.set("strictQuery", true);
    // await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true , useUnifiedTopology: true });
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
