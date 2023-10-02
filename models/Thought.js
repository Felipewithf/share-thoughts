const { Schema, model } = require("mongoose");
const userSchema = require("./User");
const reactionSchema = require("./Reaction");

// Schema to create user model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    username: [userSchema],
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
