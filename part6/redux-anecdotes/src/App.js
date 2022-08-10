import { useSelector, useDispatch } from "react-redux";
import { createAnecdote, vote as voteAction } from "./reducers/anecdoteReducer";

const sortFunction = (a, b) => {
  if (a.votes < b.votes) {
    return 1;
  } else {
    return -1;
  }
};

const App = () => {
  const anecdotes = useSelector((state) => state.sort(sortFunction));
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAction(id));
  };

  const addAnecdote = (e) => {
    e.preventDefault();
    const anecdote = e.target.newNote.value;
    if (!anecdote) {
      return;
    }
    e.target.newNote.value = "";
    dispatch(createAnecdote(anecdote));
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
