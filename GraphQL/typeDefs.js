const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Upload
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
  }
  type Post {
    firstName: String!
    lastName: String!
    # author : String!
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
    userId: String!
    body: String!
    createdAt: String!
  }

  type Like {
    userId: String!
    createdAt: String!
  }

  type Query {
    getPosts: [Post]!
    getPost: [Post]!
    getSinglePost(postId: ID!): Post!
  }

  input RegisterField {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Mutation {
    register(registerInput: RegisterField): User!

    login(email: String!, password: String!): User!

    createPost(title: String!, body: String!): Post!

    createComment(postId: ID!, body: String!): Post!

    likePost(postId: ID!): Post!

    uploadIamge(file: Upload!): File!
  }
`;
