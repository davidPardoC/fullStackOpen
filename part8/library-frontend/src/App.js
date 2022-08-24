import { gql, useApolloClient, useSubscription } from "@apollo/client";
import { useContext } from "react";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import Recomended from "./components/Recomended";
import { NotificationContext } from "./context/NotificationContext";
import { ALL_BOOKS } from "./graphql/queries";

const BOOK_ADDED = gql`
  subscription Subscription {
    bookAdded {
      title
      published
      id
      genres
    }
  }
`;

const App = () => {
  const [page, setPage] = useState("authors");
  const { show, message, showNotification } = useContext(NotificationContext);

  const client = useApolloClient();
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data.bookAdded;
      showNotification("Book Added");
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(bookAdded),
        };
      });
    },
  });

  return (
    <>
      {show && <Notification message={message} />}
      <div className="container p-5">
        <div className="btn-group mx-auto mb-3">
          <button
            className="btn btn-outline-primary"
            onClick={() => setPage("authors")}
          >
            authors
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => setPage("books")}
          >
            books
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => setPage("add")}
          >
            add book
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => setPage("recommended")}
          >
            recommended
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => setPage("login")}
          >
            login
          </button>
        </div>

        {page === "authors" && <Authors />}

        {page === "books" && <Books />}

        {page === "add" && <NewBook />}

        {page === "login" && <Login />}
        {page === "recommended" && <Recomended />}
      </div>
    </>
  );
};

export default App;
