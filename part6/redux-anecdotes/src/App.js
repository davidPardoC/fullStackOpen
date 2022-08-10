import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    const action = { type: "VOTE", data: { id } };
    dispatch(action);
  };

  const addAnecdote = (e) => {
    e.preventDefault();
    const anecdote = e.target.newNote.value;
    if (!anecdote) {
      return;
    }
    e.target.newNote.value = "";
    const action = { type: "ADD", data: { anecdote } };
    dispatch(action);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="newNote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
