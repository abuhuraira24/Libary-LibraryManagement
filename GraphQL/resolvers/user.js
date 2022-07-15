const User = require("../../model/User");

const { UserInputError } = require("apollo-server-core");

const authChecker = require("../../utils/auth-checker");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "dza2t1htw",
  api_key: process.env.API_KEY || "563859764347624",
  api_secret: process.env.API_SECRET || "ndBih7bre8-OHEII7XS6wS1uTyQ",
});

module.exports = {
  Query: {
    notifications: async (_, {}, context) => {
      let userInfo = authChecker(context);

      let user = await User.findById(userInfo.id).sort({ createdAt: -1 });

      return user.notification;
    },

    getUser: async (_, {}, context) => {
      const user = authChecker(context);

      const data = await User.findById(user.id).sort({ createdAt: -1 });

      if (data) {
        return {
          avatar: data.avatars.length !== 0 && data.avatars[0].avatar,
          cover: data.cover.length !== 0 && data.cover[0].url,
          readNotification: data.readNotification,
        };
      }
    },

    getUsers: async (_, {}) => {
      let users = await User.find();

      return users;
    },
    users: async (_, {}) => {
      let users = await User.find();

      return users;
    },

    getUserById: async (_, { userId }) => {
      let user = await User.findById(userId);

      return user;
    },
    getFollowing: async (_, {}, context) => {
      let user = authChecker(context);
      let following = await User.findById(user.id);
      return following.following;
    },
    publicUsers: async (_, {}, context) => {
      let user = authChecker(context);

      let userInfo = await User.findById(user.id);

      let following = userInfo.following;
      let users = await User.find();

      const publicUsers = users.filter(
        ({ _id: id1 }) =>
          !following.some(
            ({ userId: id2 }) => id2.toString() === id1.toString()
          )
      );

      // console.log(publicUsers[0]._id.toString());

      return publicUsers;
    },
  },
  Mutation: {
    uploadIamge: async (_, { url, userId }, context) => {
      let user = authChecker(context);

      let data = await User.findById(userId);

      if (data) {
        data.avatars.unshift({
          avatar: url,
          createdAt: new Date().toISOString(),
        });
        await data.save();
        return {
          url,
        };
      }
    },
    uploadCover: async (_, { url, userId }, context) => {
      let user = authChecker(context);

      let data = await User.findById(userId);

      if (data) {
        data.cover.unshift({
          url,
          createdAt: new Date().toISOString(),
        });
        await data.save();
        return {
          url,
        };
      }
    },

    addFollow: async (_, { userId }, context) => {
      let user = authChecker(context);

      // Me
      let sender = await User.findById(user.id);

      // Someone
      let receiver = await User.findById(userId);

      if (sender && receiver) {
        if (sender.following.find((f) => f.userId === userId)) {
          sender.following = sender.following.filter(
            (foll) => foll.userId !== userId
          );
          receiver.followers = receiver.followers.filter(
            (r) => r.userId !== user.id
          );
        } else {
          sender.following.push({
            userId: receiver._id,
            name: receiver.firstName + " " + receiver.lastName,
          });

          receiver.followers.push({
            userId: user.id,
            name: sender.firstName + " " + sender.lastName,
          });

          console.log("New Follower");
        }
        await sender.save();

        await receiver.save();

        return sender.following;
      }
    },
  },
};
