const express = require("express");
const router = express.Router();
const { register, login, updateUser } = require("../controllers/auth");
const {authenticateUser, testUser} = require("../middleware/authentication");

router.post("/register", register);
router.post("/login", login);
router.patch("/updateUser", authenticateUser, testUser, updateUser);

module.exports = router;
