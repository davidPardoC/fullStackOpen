import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { ALL_BOOKS, ME } from "../graphql/queries";

const Recomended = (props) => {
  const meResult = useQuery(ME);
  const [getAllBooks, { data }] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (meResult.data?.me) {
      getAllBooks({
        variables: { genre: meResult.data.me.favouriteGenre },
      });
    }
  }, [meResult.data]);

  if (!data) {
    return <p> Loading...</p>;
  }

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
          {data.allBooks.map((a) => (
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
