const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userControllers");

router.get("/", authenticateUser, authorizePermissions, getAllUsers);
router.get("/showMe", getCurrentUser);
router.patch("/updateUser", updateUser);
router.patch("/updatePassword", updateUserPassword);
router.get("/:id", authenticateUser, getSingleUser);

module.exports = router;
