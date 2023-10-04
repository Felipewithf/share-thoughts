const router = require("express").Router();
const {
  getThoughts,
  createThought,
  getThoughtById,
} = require("../../controllers/thoughtController");

// /api/thought
router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughtId").get(getThoughtById);

module.exports = router;
