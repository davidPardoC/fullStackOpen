import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../graphql/queries";
import { EDIT_AUTHOR } from "../graphql/mutations";
import { useForm } from "../hooks/useForm";

const Authors = () => {
  const result = useQuery(ALL_AUTHORS);
  const form = useForm({
    author: { type: "text", name: "author", value: "" },
    born: { type: "number", name: "born", value: "" },
  });
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (result.loading) {
    return <p>Loading...</p>;
  }

  const onEditAuthor = (e) => {
    e.preventDefault();
    editAuthor({
      variables: {
        name: form.author.value,
        setBornTo: Number(form.born.value),
      },
    });
  };

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
      <form onSubmit={onEditAuthor}>
        <h3>Set birthyear</h3>
        <div>
          <label>Name:</label>
          <input
            className="form-control"
            type="text"
            {...form.author}
            onChange={form.onChange}
          />
        </div>
        <div>
          <label>Born:</label>
          <input
            className="form-control"
            {...form.born}
            onChange={form.onChange}
          />
          <button className="btn btn-primary mt-2">Update Author</button>
        </div>
      </form>
    </div>
  );
};

export default Authors;
