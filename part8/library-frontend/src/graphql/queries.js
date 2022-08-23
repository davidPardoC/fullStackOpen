import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      genres
      author {
        name
      }
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      books
    }
  }
`;

export const ME = gql`
  query Query {
    me {
      username
      favouriteGenre
      id
    }
  }
`;
