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

module.exports = router;
