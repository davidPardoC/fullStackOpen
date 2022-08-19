const { gql } = require("apollo-server");

const commonTypes = gql`
  type Book {
    title: String!
    published: Int!
    author: ID!
    id: ID!
    genres: [String!]
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    books: Int
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
      author: ID!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

module.exports = { commonTypes, queryTypes, mutationTypes };
