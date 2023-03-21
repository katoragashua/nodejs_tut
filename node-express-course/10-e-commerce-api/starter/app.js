console.log("E-Commerce API");
require("dotenv").config();
require("express-async-errors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const express = require("express");
const xss = require("xss-clean");
const cloudinary = require("cloudinary");
const helmet = require("helmet");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const notFound = require("./middleware/not-found");

const app = express();
const connectDB = require("./db/connect");

// Middlewares
app.use(express.json())

app.get("/", (req, res) => {
  res.send("<h1>E-Commerce App</h1>");
});

app.use(notFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
