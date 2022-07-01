const { ApolloServer } = require("apollo-server-express");

const express = require("express");

const cors = require("cors");

const { createServer } = require("http");

const app = express();

const httpServer = createServer(app);

const { Server } = require("socket.io");

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");

const { mongoose } = require("mongoose");

const { MONGODB } = require("./config");

const { addCommnet } = require("./GraphQL/resolvers/comments");

const { adduser, removeUser, getUser } = require("./socketController/index");

const resolvers = require("./GraphQL/resolvers/index");

const typeDefs = require("./GraphQL/typeDefs");
const user = require("./GraphQL/resolvers/user");

require("dotenv").config();

const startServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await apolloServer.start();

  app.use(cors());

  app.use(graphqlUploadExpress());

  apolloServer.applyMiddleware({
    app,
    path: "/",
  });

  // User List

  // let users = [];

  // add User
  // const addUser = (userId, socketId) => {
  //   users.some((user) => user.userId === userId) &&
  //     users.push({ userId, socketId });
  //   console.log(users);
  // };

  // // removeUser
  // const removeUser = (socketId) => {
  //   users = users.filter((user) => user.socketId !== socketId);
  // };

  // // Get a Single user
  // const getUser = (userId) => {
  //   return users.find((user) => user.userId === userId);
  // };

  // When connect user
  io.on("connection", (socket) => {
    console.log("connected a user");
    // Get and Post method

    // Add User
    socket.on("addUser", (userId) => {
      adduser(socket.id, userId);
    });

    //send and get message
    socket.on("sendNotification", async ({ resiverId, text }) => {
      let user = await getUser(resiverId);

      io.to(user.socketId).emit("getMessage", text);
    });

    // When disconnected User
    socket.on("disconnect", () => {
      console.log(`user disconnected ${socket.id}`);
      removeUser(socket.id);
    });
  });

  mongoose
    .connect(MONGODB)
    .then(() => {
      console.log("MongoDB Connected...");
      httpServer.listen({ port: process.env.PORT || 5000 });
    })
    .then(() => {
      console.log(
        `Server listening on localhost:5000${apolloServer.graphqlPath}`
      );
    });
};

startServer();
