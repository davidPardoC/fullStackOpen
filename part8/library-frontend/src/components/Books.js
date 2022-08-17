import { gql, useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../graphql/queries";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  if (result.loading) {
    return <p> Loading...</p>;
  }

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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
