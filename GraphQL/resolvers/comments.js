const { UserInputError } = require("apollo-server-express");

const Post = require("../../model/Post");

const User = require("../../model/User");

const AuthChecker = require("../../utils/auth-checker");

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const { username, id, firstName, lastName } = AuthChecker(context);

      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not empty",
          },
        });
      }
      const post = await Post.findById(postId);

      console.log(`post id ${post.userId}`);
      console.log(`user id ${id}`);
      console.log(post.userId === id);

      const userData = await User.findById(id);

      if (post) {
        post.comments.unshift({
          body,
          avatar: userData.avatars[0].avatar,
          username: firstName + " " + lastName,
          userId: id,
          author: post.userId === id,
          createdAt: new Date().toISOString(),
        });
        await post.save();

        return post;
      } else throw new UserInputError("Post Not Found!");
    },
  },
};
