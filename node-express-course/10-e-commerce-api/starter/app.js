console.log("E-Commerce API");
require("dotenv").config();
require("express-async-errors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const express = require("express");
const xss = require("xss-clean");
const cors = require("cors");
const cloudinary = require("cloudinary"); // For Uploading images to the cloud
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
mongoose.set("strictQuery", true);
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const app = express();
const connectDB = require("./db/connect");
const User = require("./models/User");

// Routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const authenticateUser = require("./middleware/authentication");

// Middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());
app.use(fileUpload());
app.use(express.static("./public"));

// Security middlewares
app.use(helmet());

// Auth Routes middleware
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);

app.get("/", (req, res) => {
  res.send("<h1>E-Commerce App</h1>");
});

app.get("/api/v1/", (req, res) => {
  console.log(req.signedCookies);
  res.send("<h1>E-Commerce API Version 1</h1>");
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // Connect to Database
    await connectDB(process.env.MONGO_URI);
    // await User.deleteMany();
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
