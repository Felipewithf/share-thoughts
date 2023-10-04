const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

// /api/user
router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
