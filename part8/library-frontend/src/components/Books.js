import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../graphql/queries";

const Books = (props) => {
  const [genre, setGenre] = useState("");
  const result = useQuery(ALL_BOOKS);
  if (result.loading) {
    return <p> Loading...</p>;
  }

  const getBooks = () => {
    if (!genre) {
      return result.data.allBooks;
    }
    return result.data.allBooks.filter((book) => book.genres.includes(genre));
  };

  const genres = () => {
    const genres = result.data.allBooks
      .map((book) => book.genres)
      .reduce((preValue, currentValue) => preValue.concat(currentValue));
    const uniqueGenres = [...new Set(genres)];
    return uniqueGenres;
  };

  const onChangeGenre = (e) => {
    setGenre(e.target.value);
  };

  return (
    <div>
      <h2>books</h2>

      <table className="table">
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {getBooks().map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex flex-wrap">
        {genres().map((genre) => (
          <button
            className="btn btn-success"
            key={genre}
            value={genre}
            onClick={onChangeGenre}
          >
            {genre}
          </button>
        ))}
        <button className="btn btn-success" value={""} onClick={onChangeGenre}>
          All
        </button>
      </div>
    </div>
  );
};

export default Books;
