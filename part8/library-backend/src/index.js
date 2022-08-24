const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
require("./config/database");
const {
  commonTypes,
  queryTypes,
  mutationTypes,
  subscriptionTypes,
} = require("./graphql/types");
const { tokenSecret } = require("./config/config");
const UserModel = require("./Models/User.model");
const resolvers = require("./graphql/resolvers");
const express = require("express");
const http = require("http");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({
    typeDefs: [commonTypes, queryTypes, mutationTypes, subscriptionTypes],
    resolvers,
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    { server: httpServer, path: "" }
  );

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("bearer")) {
        const decodedToken = jwt.verify(auth.substring(7), tokenSecret);
        const currentUser = await UserModel.findById(decodedToken._id);
        return { currentUser };
      }
      return {};
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();

  server.applyMiddleware({ app, path: "/" });

  const PORT = 4000;

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
