console.log("E-Commerce API");
require("dotenv").config();
require("express-async-errors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const express = require("express");
const xss = require("xss-clean");
const cloudinary = require("cloudinary"); // For Uploading images to the cloud
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
mongoose.set("strictQuery", true);
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const app = express();
const connectDB = require("./db/connect");
const authRouter = require("./routes/authRoutes")
const User = require("./models/User")

// Middlewares
app.use(morgan("tiny"));

// Security middlewares
app.use(helmet())

// Built in middleware for JSON data
app.use(express.json());

// Auth Routes middleware
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("<h1>E-Commerce App</h1>");
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // Connect to Database
    await connectDB(process.env.MONGO_URI);
    // await User.deleteMany()
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
