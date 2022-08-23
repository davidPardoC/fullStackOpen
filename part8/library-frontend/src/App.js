import { useContext } from "react";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import { NotificationContext } from "./context/NotificationContext";

const App = () => {
  const [page, setPage] = useState("authors");
  const { show, message } = useContext(NotificationContext);

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
            onClick={() => setPage("login")}
          >
            login
          </button>
        </div>

        {page === "authors" && <Authors />}

        {page === "books" && <Books />}

        {page === "add" && <NewBook />}

        {page === "login" && <Login />}
      </div>
    </>
  );
};

export default App;
