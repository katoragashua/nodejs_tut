const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connection");
const mongoose = require("mongoose");
const { config } = require("dotenv");
config();
// or
// require("dotenv").config();
const notFound = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // or
    // await mongoose.connect(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
