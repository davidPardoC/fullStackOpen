import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const [page, setPage] = useState("books");

  return (
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
      </div>

      {page === "authors" && <Authors />}

      {page === "books" && <Books />}

      {page === "add" && <NewBook />}
    </div>
  );
};

export default App;
