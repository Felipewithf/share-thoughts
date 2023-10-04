const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  newFriend,
  //   deleteFriend,
} = require("../../controllers/userController");

// /api/user
router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(newFriend);

module.exports = router;
