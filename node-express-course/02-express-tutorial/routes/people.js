const express = require("express");
const router = express.Router();
const { people } = require("../data");
const {
  getPeople,
  postPerson,
  postPersonPostman,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

router.get("/", getPeople);

// Functionality for JavaScript approach
router.post("/", postPerson);

router.post("/postman", postPersonPostman);

// PUT request
router.put("/:id", updatePerson);

// Delete request
router.delete("/:id", deletePerson);


/* Alternatively, we can use route chaining method as seen below*/
// router.route("/").get(getPeople).post(postPerson);
// router.route("/postman").post(postPersonPostman);
// router.route("/:id").put(updatePerson).delete(deletePerson);

module.exports = router;
