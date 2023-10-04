const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      return res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get one thought
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
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
};
