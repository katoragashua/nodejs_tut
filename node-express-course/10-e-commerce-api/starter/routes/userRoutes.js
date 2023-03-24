const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userControllers");

router.get("/users", getAllUsers);
router.get("/users/showMe", getCurrentUser);
router.patch("/users/:id", updateUser);
router.get("/users/:id", getSingleUser);


module.exports = router;