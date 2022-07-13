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
    async notifications(_, {}, context) {
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
  },
};
