const mongoose = require('mongoose');

// Function to connect to the database
const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;
