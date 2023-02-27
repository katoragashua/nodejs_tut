// @ts-nocheck
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const connectDB = require("./db/connect");
const cookieParser = require("cookie-parser");
const Jobs = require("./models/Job");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authMiddleware = require("./middleware/authentication");

app.use(express.json());
app.use(cookieParser());
// extra packages

// Route Middlewares
app.use("/domain/api/v1/jobs", authMiddleware, jobsRouter);
app.use("/domain/api/v1/auth", authRouter);

// routes
app.get("/", (req, res) => {
  res.send("<h1>Jobs API</h1>");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // await Jobs.deleteMany()
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
