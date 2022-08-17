import { useState } from "react";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const submit = async (event) => {
    event.preventDefault();

    console.log("add book...");

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
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
