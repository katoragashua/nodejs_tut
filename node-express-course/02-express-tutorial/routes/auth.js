const express = require("express");
const router = express.Router();
const {people} = require("../data");

// Functionality for Traditional approach
router.post("/", (req, res) => {
  // Note that if your server is hosted somewhere else, you will have to provide a link for its. However, for this we use /login since its hosted here. Same thing will apply in the HTML.
  console.log(req.body);
  const { name } = req.body;
  if (name.trim()) {
    return res.status(200).send(`<h1>Welcome, ${name}</h1>`);
  }
  res.status(401).send("<h1>Please enter your credentials</h1>");
});

module.exports = router