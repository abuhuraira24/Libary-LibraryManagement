const { UserInputError } = require("apollo-server-core");
const Post = require("../../model/Post");

const User = require("../../model/User");

const authChecker = require("../../utils/auth-checker");
module.exports = {
  Mutation: {
    async createPost(_, { body, title }, context) {
      const user = authChecker(context);

      if (body.trim() === "") {
        throw new Error("Post body must not be empty");
      }
      const text = body;

      const wpm = 225;

      const words = text.trim().split(/\s+/).length;

      const time = Math.ceil(words / wpm);

      const userData = await User.findById(user.id);

      console.log(userData);

      if (user) {
        const newPost = new Post({
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: userData.avatars[0].avatar,
          userId: user.id,
          username: user.username,
          title,
          body,
          comments: [],
          readTime: time,
          createdAt: new Date().toISOString(),
        });

        const post = newPost.save();

        return post;
      }
    },

    async likePost(_, { postId }, context) {
      const user = authChecker(context);
      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find((like) => like.userId === user.id)) {
          //    if already liked
          post.likes = post.likes.filter((like) => like.userId !== user.id);
        } else {
          // Not liked, like post
          post.likes.push({
            userId: user.id,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
  },

  Query: {
    async getPosts() {
      const posts = Post.find().sort({ createdAt: -1 });

      return posts;
    },
    async getPost() {
      const post = Post.find().sort({ createdAt: -1 });
      console.log(post);
      return post;
    },
    async getSinglePost(_, { postId }) {
      const post = Post.findById(postId);
      if (post) {
        return post;
      }
    },
  },
};
