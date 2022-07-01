const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatars: [
    {
      avatar: String,
      createdAt: String,
    },
  ],
  cover: [
    {
      url: String,
      createdAt: String,
    },
  ],
  notification: [
    {
      userId: String,
      authorId: String,
      name: String,
      body: String,
      createdAt: String,
    },
  ],
  socketId: String,
  active: Boolean,
});

module.exports = model("User", userSchema);
