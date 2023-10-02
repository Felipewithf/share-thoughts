const { Schema, model } = require('mongoose');
const thoughtSchema = require("./Thought");

// Schema to create user model
const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true,
      },
      email: {
        type: String,
        unique: true,
        required: true, // missing the email validation
      },
      thoughts: [thoughtSchema],
      friends: [userSchema],
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );

const User = model('user', userSchema);

module.exports = User;