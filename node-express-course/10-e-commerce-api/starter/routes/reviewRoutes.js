const {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewControllers");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const { Router } = require("express");
const router = Router();

router.get("/", getAllReviews);
router.post("/", authenticateUser, createReview);
router.get("/:id", getSingleReview);
router.patch("/:id", authenticateUser, updateReview);
router.delete("/:id", authenticateUser, deleteReview);



module.exports = router;
