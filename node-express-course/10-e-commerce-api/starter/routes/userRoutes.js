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

// The authorizePermissions function is invoked and arguments are passed to it as seen below.
router.get(
  "/",
  authenticateUser,
  authorizePermissions("admin", "owner"),
  getAllUsers
);
router.get("/showMe", authenticateUser, getCurrentUser);
router.patch("/updateUserPassword", authenticateUser, updateUserPassword);
router.patch("/updateUser", authenticateUser, updateUser);
router.get("/:id", authenticateUser, getSingleUser);

module.exports = router;
