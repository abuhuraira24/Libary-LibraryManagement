const User = require("../model/User");

const Post = require("../model/Post");

module.exports = {
  async adduser({ socketId, userId }) {
    let user = await User.findById(userId);

    user.socketId = socketId;
    user.active = true;

    user.save();

    return {
      socketId: "D15sfGSF5DGFsdss",
    };
  },

  async removeUser(socketId) {
    let user = await User.findOne({ socketId });

    if (user) {
      user.active = false;

      user.save();
    }

    console.log(user);
  },
};
