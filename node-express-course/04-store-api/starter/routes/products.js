const { findAll, create} = require("../controllers/products");
const { Router } = require("express");
const router = Router();

router.get("/", findAll);
router.get("/", create);
module.exports = router;
