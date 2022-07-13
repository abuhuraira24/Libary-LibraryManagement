const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    avatars: [Avatar]
    cover: [Cover]
    notification: [Notifications]
  }
  type Users {
    id: ID!
    firstName: String!
    lastName: String!
    avatars: [Avatar]
    cover: [Cover]
  }
  type Post {
    userId: String!
    firstName: String!
    lastName: String!
    avatar: String!
    _id: String!
    username: String!
    body: String!
    createdAt: String!
    readTime: String
    comments: [Comment]!
    likes: [Like]!
  }

  type Comment {
    username: String!
    avatar: String!
    userId: String!
    author: String!
    body: String!
    createdAt: String!
  }

  type Like {
    userId: String!
    createdAt: String!
  }

  type SingleUser {
    avatar: String!
    createdAt: String!
    cover: String!
  }

  input RegisterField {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Avatar {
    avatar: String!
    createdAt: String!
  }
  type Cover {
    url: String!
    createdAt: String!
  }
  type File {
    url: String!
  }

  type Notifications {
    name: String!
    authorId: String!
    avatar: String!
    senderId: String!
    createdAt: String!
    text: String
  }
  type commnetAvatar {
    avatar: String!
  }
  type Query {
    getPosts: [Post]!
    getPost: [Post]!
    getSinglePost(postId: ID!): Post!
    getUser: SingleUser!
    getUsers: [User]!
    users: [Users]!
    infinitePost(limit: Int!, offset: Int!): [Post]!
    notifications: [Notifications]!
    getCommentAvatar(userId: ID!): commnetAvatar
  }
  type Mutation {
    register(registerInput: RegisterField): User!

    login(email: String!, password: String!): User!

    createPost(body: String!): Post!

    createComment(postId: ID!, body: String!): Post!

    likePost(postId: ID!): Post!

    uploadIamge(url: String!, userId: ID!): File!

    uploadCover(url: String!, userId: ID!): Cover!

    createNotification(
      postId: ID!
      authorId: ID!
      name: String!
      text: String!
      type: String!
      avatar: String!
    ): User!
  }
`;
