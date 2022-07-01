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

const { adduser, removeUser } = require("./socketController/index");

const resolvers = require("./GraphQL/resolvers/index");

const typeDefs = require("./GraphQL/typeDefs");

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

  // if (process.env.NODE_ENV === "production") {
  //   app.use(express.static("client/build"));
  //   app.get("*", (req, res) => {
  //     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  //   });
  // }

  apolloServer.applyMiddleware({
    app,
    path: "/",
  });

  // Soket.io
  io.on("connection", (socket) => {
    // Add comment

    socket.on("join", (data) => {
      adduser({ userId: data.userId, socketId: socket.id });
    });

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
