const register = require("./register");

const login = require("../resolvers/login");

const createPost = require("../resolvers/Post");

const comments = require("../resolvers/comments");

const getSinglePost = require("../resolvers/SinglePost");

const likePost = require("../resolvers/Post");

const uploadIamge = require("../resolvers/user");

const getUser = require("../resolvers/user");

const uploadCover = require("../resolvers/user");

const getUsers = require("../resolvers/user");

const users = require("../resolvers/user");

const infinitePost = require("../resolvers/Post");

const cleateLikeNotification = require("./Post");
const getCommentAvatar = require("../resolvers/comments");

const getUserById = require("../resolvers/user");

const getPostsByUserId = require("../resolvers/Post");

const seenNotifications = require("../resolvers/Post");

const addFollow = require("../resolvers/user");

const getFollowing = require("../resolvers/user");

const publicUsers = require("../resolvers/user");

module.exports = {
  Query: {
    ...createPost.Query,
    ...getSinglePost.Query,
    ...getUser.Query,
    ...getUsers.Query,
    ...users.Query,
    ...infinitePost.Query,
    ...getCommentAvatar.Query,
    ...getUserById.Query,
    ...getPostsByUserId.Query,
    ...getFollowing.Query,
    ...publicUsers.Query,
  },
  Mutation: {
    ...register.Mutation,
    ...login.Mutation,
    ...createPost.Mutation,
    ...comments.Mutation,
    ...likePost.Mutation,
    ...uploadIamge.Mutation,
    ...uploadCover.Mutation,
    ...cleateLikeNotification.Mutation,
    ...seenNotifications.Mutation,
    ...addFollow.Mutation,
  },
};
