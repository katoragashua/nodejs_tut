const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");

const {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userControllers");

router.get("/", authenticateUser, getAllUsers);
router.get("/showMe", getCurrentUser);
router.patch("/updateUser", updateUser);
router.patch("/updatePassword", updateUserPassword);
router.get("/:id", authenticateUser, getSingleUser);

module.exports = router;
