const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const bookAdded = {
  subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
};

module.exports = { bookAdded };
