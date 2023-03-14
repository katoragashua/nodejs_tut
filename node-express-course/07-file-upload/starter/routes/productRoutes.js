const {
  getAllProducts,
  createProduct,
} = require("../controllers/productController");

const uploadProductImage = require("../controllers/uploadsController")
const { Router } = require("express");
const router = Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.post("/uploads", uploadProductImage);

module.exports = router
