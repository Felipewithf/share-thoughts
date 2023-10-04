const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().select("-__v");
      return res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get one thought
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");
      return res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create a new Thought
  async createThought(req, res) {
    try {
      const new_thought = await Thought.create(req.body);

      const updateUser = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { user_thoughts: new_thought._id } },
        { new: true }
      );
      //req.body should be:
      //  {
      //   "thoughtText": "a lot of thinking right now",
      //   "username": "Eiji"
      // }
      if (!updateUser) {
        return res
          .status(404)
          .json({ message: "thought created, but no User with this ID" });
      }

      res.json(new_thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update a Thought
  async updateThought(req, res) {
    try {
      const updatethought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { thoughtText: req.body.thoughtText },
        { new: true }
      );
      //req.body should be:
      //  {
      //   "thoughtText": "here is a new thought I have!",
      // }
      if (!updatethought) {
        return res.status(404).json({ message: "no thoguht with this ID" });
      }

      res.json(updatethought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete a Thought
  async deleteThought(req, res) {
    console.log("deleteThought Called");
    try {
      const deleteThought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (deleteThought) {
        console.log("founded and deleted");
      }
      res.json(deleteThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
