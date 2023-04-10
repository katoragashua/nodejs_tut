const { Router } = require("express");
const router = Router();

const {
  getAllOrders,
  getSingleOrder,
  createOrder,
  getCurrentUserOrder,
  updateOrder,
} = require("../controllers/orderControllers");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router.get("/", authenticateUser, authorizePermissions("admin"), getAllOrders);
router.post("/", authenticateUser, createOrder);
router.get("/showAllMyOrders", authenticateUser, getCurrentUserOrder);
router.patch("/:id", authenticateUser, updateOrder);
router.get("/:id", authenticateUser, getSingleOrder);

module.exports = router;
