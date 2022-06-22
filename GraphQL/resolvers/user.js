const User = require("../../model/User");

const authChecker = require("../../utils/auth-checker");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "dza2t1htw",
  api_key: process.env.API_KEY || "563859764347624",
  api_secret: process.env.API_SECRET || "ndBih7bre8-OHEII7XS6wS1uTyQ",
});

module.exports = {
  Query: {
    getUser: async (_, {}, context) => {
      const user = authChecker(context);

      const data = await User.findById(user.id).sort({ createdAt: -1 });
      if (data) {
        return {
          avatar: data.avatars[0].avatar,
          createdAt: data.avatars[0].createdAt,
        };
      }
    },
    // getUser: async (_, {}, context) => {
    //   const { id } = authChecker(context);

    //   const user = await User.findById(id);

    //   return {
    //     avatar: user.avatars[0].avatar,
    //   };
    // },
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
  },
};
