const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    avatars: [Avatar]
  }
  type Post {
    firstName: String!
    lastName: String!
    avatar: String!
    _id: String!
    username: String!
    title: String!
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
  }
  type Query {
    getPosts: [Post]!
    getPost: [Post]!
    getSinglePost(postId: ID!): Post!
    getUser: SingleUser!
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

  type File {
    url: String!
  }
  type Mutation {
    register(registerInput: RegisterField): User!

    login(email: String!, password: String!): User!

    createPost(title: String!, body: String!): Post!

    createComment(postId: ID!, body: String!): Post!

    likePost(postId: ID!): Post!

    uploadIamge(url: String!, userId: ID!): File!
  }
`;
