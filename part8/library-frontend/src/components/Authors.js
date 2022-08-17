import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../graphql/queries";

const Authors = () => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table className="table">
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.books}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
