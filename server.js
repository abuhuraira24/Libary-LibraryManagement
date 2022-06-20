const { ApolloServer } = require("apollo-server-express");

const express = require("express");

const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");

const { mongoose } = require("mongoose");

const { MONGODB } = require("./config");

const { createServer } = require("http");

const resolvers = require("./GraphQL/resolvers/index");

const typeDefs = require("./GraphQL/typeDefs");

require("dotenv").config();
console.log(process.env.API_KEY);
const startServer = async () => {
  const app = express();
  const httpServer = createServer(app);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await apolloServer.start();

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
