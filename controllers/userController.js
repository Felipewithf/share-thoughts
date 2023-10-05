const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().select("-__v");
      // const studentObj = {
      //   students,
      //   headCount: await headCount(),
      // };
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // get user by ID
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate({
          path: "user_thoughts",
          select: "-__v",
        })
        .populate({
          path: "friends",
          select: "-__v",
        });

      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create a new User
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      //req.body should be:
      //   {
      //    "username": "alexis",
      //    "email": "alexis@gmail.com"
      //   }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update User
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { username: req.body.username, email: req.body.email },
        { new: true }
      );
      //req.body should be:
      //   {
      //    "username": "alexis",
      //    "email": "alexisssss@gmail.com"
      //   }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete User
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  /// ******* FRIENDS CONTROLLER ********* ///

  // New Friend
  async newFriend(req, res) {
    try {
      const new_friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(new_friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete Friend
  async deleteFriend(req, res) {
    try {
      const remove_friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(remove_friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
