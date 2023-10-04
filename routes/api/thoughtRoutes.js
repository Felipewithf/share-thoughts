const router = require("express").Router();
const {
  getThoughts,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
  newReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// /api/thought
router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId").post(newReaction);

router.route("/:thoughtId/reaction/:reactionId").put(removeReaction);

module.exports = router;
