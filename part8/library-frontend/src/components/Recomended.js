import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS, ME } from "../graphql/queries";

const Recomended = (props) => {
  const [genre, setGenre] = useState("");
  const result = useQuery(ALL_BOOKS);
  const meResult = useQuery(ME);

  useEffect(() => {
    if (meResult.data?.me) {
      setGenre(meResult.data.me.favouriteGenre);
    }
  }, [meResult.data]);

  if (result.loading || meResult.loading) {
    return <p> Loading...</p>;
  }

  const getBooks = () => {
    if (!genre) {
      return result.data.allBooks;
    }
    return result.data.allBooks.filter((book) => book.genres.includes(genre));
  };

  return (
    <div>
      <h2>Recomendations</h2>
      <p>
        books in your favorite genre <b>{meResult.data.me.favouriteGenre}</b>
      </p>
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
    </div>
  );
};

export default Recomended;
