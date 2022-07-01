const User = require("../model/User");

const Post = require("../model/Post");

const ActiveUser = require("../model/ActiveUser");

module.exports = {
  async adduser(socketId, userId) {
    let user = await ActiveUser.findOne({ socketId });

    if (!user) {
      let newUser = new ActiveUser({
        userId: userId,
        socketId: socketId,
      });

      await newUser.save();
    }
  },

  async removeUser(socketId) {
    let users = await ActiveUser.findOneAndRemove({ socketId });

    // let user = users.filter((user) => user.socketId !== socketId);

    // user.save();
  },

  async getUser(resiverId) {
    let user = await ActiveUser.findOne({ resiverId });

    if (user) {
      return {
        userId: user.userId,
        socketId: user.socketId,
      };
    }
    // return {
    //   socketId: user.socketId,
    //   userId: user.userId,
    // };
  },
};
