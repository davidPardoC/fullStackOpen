const { ApolloServer, gql } = require("apollo-server");
const jwt = require("jsonwebtoken");
require("./config/database");
const { commonTypes, queryTypes, mutationTypes } = require("./graphql/types");
const {
  addBook,
  editAuthor,
  addAuthor,
  addUser,
  login,
} = require("./graphql/mutations");
const {
  allBooks,
  bookCount,
  authorCount,
  allAuthors,
  me,
} = require("./graphql/queries");
const { tokenSecret } = require("./config/config");
const UserModel = require("./Models/User.model");

const resolvers = {
  Query: {
    bookCount: bookCount,
    authorCount: authorCount,
    allBooks: allBooks,
    allAuthors: allAuthors,
    me: me,
  },
  Mutation: {
    addBook: addBook,
    editAuthor: editAuthor,
    addAuthor: addAuthor,
    createUser: addUser,
    login: login,
  },
};

const server = new ApolloServer({
  typeDefs: [commonTypes, queryTypes, mutationTypes],
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer")) {
      const decodedToken = jwt.verify(auth.substring(7), tokenSecret);
      const currentUser = await UserModel.findById(decodedToken._id);
      return { currentUser };
    }
    return {};
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
