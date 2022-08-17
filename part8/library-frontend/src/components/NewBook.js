import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { useState } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { ADD_BOOK } from "../graphql/mutations";
import { ALL_BOOKS } from "../graphql/queries";

const NewBook = () => {
  const { showNotification } = useContext(NotificationContext);
  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
    onError: () => {
      showNotification("Error adding new book");
    },
  });
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const submit = async (event) => {
    event.preventDefault();

    createBook({
      variables: { title, author, published /* : Number(published) */, genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    if (genre) {
      setGenres(genres.concat(genre));
      setGenre("");
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Title:
          <input
            className="form-control"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            className="form-control"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Published:
          <input
            className="form-control"
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div className="d-flex justify-content-between mt-3">
          <input
            className="form-control"
            style={{ width: "65%" }}
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button className="btn btn-primary" onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div className="my-2">Genres: {genres.join(" ")}</div>
        <button className="btn btn-primary" type="submit">
          create book
        </button>
      </form>
    </div>
  );
};

export default NewBook;
