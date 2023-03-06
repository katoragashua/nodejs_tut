const express = require("express");
const router = express.Router();
const { register, login, updateUser } = require("../controllers/auth");
const authentication = require("../middleware/authentication");

router.post("/register", register);
router.post("/login", login);
router.patch("/updateUser", authentication, updateUser);

module.exports = router;
