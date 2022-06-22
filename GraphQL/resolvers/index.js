const register = require("./register");

const login = require("../resolvers/login");

const createPost = require("../resolvers/Post");

const comments = require("../resolvers/comments");

const getSinglePost = require("../resolvers/SinglePost");

const likePost = require("../resolvers/Post");

const uploadIamge = require("../resolvers/user");

const getUser = require("../resolvers/user");

module.exports = {
  Query: {
    ...createPost.Query,
    ...getSinglePost.Query,
    ...getUser.Query,
  },
  Mutation: {
    ...register.Mutation,
    ...login.Mutation,
    ...createPost.Mutation,
    ...comments.Mutation,
    ...likePost.Mutation,
    ...uploadIamge.Mutation,
  },
};
