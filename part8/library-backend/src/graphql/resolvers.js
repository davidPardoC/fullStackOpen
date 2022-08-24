const {
  addBook,
  editAuthor,
  addAuthor,
  addUser,
  login,
} = require("./mutations");
const {
  allBooks,
  bookCount,
  authorCount,
  allAuthors,
  me,
} = require("./queries");
const { PubSub } = require("graphql-subscriptions");
const { AuthenticationError } = require("apollo-server-core");
const AuthorModel = require("../Models/Author.model");
const BookModel = require("../Models/Book.model");
const pubsub = new PubSub();

const resolvers = {
  Query: { allBooks, bookCount, authorCount, allAuthors, me },
  Mutation: {
    addBook: async (root, args, context) => {
      const book = addBook(root, args, context);
      pubsub.publish("BOOK_ADDED", { bookAdded: book });
      return book;
    },
    editAuthor,
    addAuthor,
    addUser,
    login,
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
