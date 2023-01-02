const { Router } = require("express");
const router = Router();
const { login, dashboard } = require("../controllers/main");

router.get("/dashboard", dashboard);
router.post("/login", login);

module.exports = router;