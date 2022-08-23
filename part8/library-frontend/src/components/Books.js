import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS } from "../graphql/queries";

const Books = (props) => {
  const [getAllBooks, result] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    getAllBooks();
  }, []);

  if (!result.data) {
    return <p> Loading...</p>;
  }

  const genres = () => {
    const genres = result.data.allBooks
      .map((book) => book.genres)
      .reduce((preValue, currentValue) => preValue.concat(currentValue));
    const uniqueGenres = [...new Set(genres)];
    return uniqueGenres;
  };

  const onChangeGenre = (e) => {
    getAllBooks({ variables: { genre: e.target.value } });
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
          {result.data.allBooks.map((a) => (
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
