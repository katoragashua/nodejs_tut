const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  uploadImage,
  deleteProduct,
} = require("../controllers/productControllers");

const {
  getSingleProductReviews,
  reviewStats,
} = require("../controllers/reviewControllers");

router.get("/", getAllProducts);
router.post(
  "/",
  authenticateUser,
  authorizePermissions("admin", "owner"),
  createProduct
);

router.post(
  "/uploadImage",
  authenticateUser,
  authorizePermissions("admin"),
  uploadImage
);

router.get("/:id", getSingleProduct);

router.patch(
  "/:id",
  authenticateUser,
  authorizePermissions("admin"),
  updateProduct
);

router.delete(
  "/:id",
  authenticateUser,
  authorizePermissions("admin"),
  deleteProduct
);

router.get("/:id/reviewStats", reviewStats)
router.get("/:id/reviews", getSingleProductReviews);

module.exports = router;
