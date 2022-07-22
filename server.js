const { ApolloServer } = require("apollo-server-express");

const express = require("express");

const cors = require("cors");

const { createServer } = require("http");

const app = express();

const httpServer = createServer(app);

const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");

const { mongoose } = require("mongoose");

const { MONGODB } = require("./config");

const { addCommnet } = require("./GraphQL/resolvers/comments");

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
  app.use(express.json());
  app.use("/", require("./router/index"));

  app.use(graphqlUploadExpress());

  apolloServer.applyMiddleware({
    app,
    path: "/",
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
