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

module.exports = {
  Query: {
    ...createPost.Query,
    ...getSinglePost.Query,
    ...getUser.Query,
    ...getUsers.Query,
    ...users.Query,
    ...infinitePost.Query,
  },
  Mutation: {
    ...register.Mutation,
    ...login.Mutation,
    ...createPost.Mutation,
    ...comments.Mutation,
    ...likePost.Mutation,
    ...uploadIamge.Mutation,
    ...uploadCover.Mutation,
  },
};
