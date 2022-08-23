import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      id
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
