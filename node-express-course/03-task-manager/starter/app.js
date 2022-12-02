const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connection");
const mongoose = require("mongoose");
const {config} = require("dotenv")
config()
// require("dotenv").config();

app.use(express.json());
// app.get("/hello", (req, res) => {
//     res.status(200).json({status: 200, statusText: "OK", message: "Welcome to our Task Manager App"})
// })
app.use("/api/v1/tasks", tasks);

const port = 3000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
