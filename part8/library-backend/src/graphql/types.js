const { gql } = require("apollo-server");

const commonTypes = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    books: [ID]
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
`;

const queryTypes = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
`;

const mutationTypes = gql`
  type Mutation {
    addAuthor(name: String!, born: Int, books: Int): Author
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
    addUser(username: String!, password: String!): User
  }
`;

const subscriptionTypes = gql`
  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = { commonTypes, queryTypes, mutationTypes, subscriptionTypes };
