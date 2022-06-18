const register = require("./register");

const login = require("../resolvers/login");

const createPost = require("../resolvers/Post");

const comments = require("../resolvers/comments");

const getSinglePost = require("../resolvers/SinglePost");

const likePost = require("../resolvers/Post");

const user = require("../resolvers/user");

module.exports = {
  Query: {
    ...createPost.Query,
    ...getSinglePost.Query,
  },
  Mutation: {
    ...register.Mutation,
    ...login.Mutation,
    ...createPost.Mutation,
    ...comments.Mutation,
    ...likePost.Mutation,
    ...user.Mutation,
  },
};
