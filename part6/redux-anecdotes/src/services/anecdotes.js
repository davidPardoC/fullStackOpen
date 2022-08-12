import axios from "axios";

const addAnecdote = async (anecdote) => {
  const { data } = await axios.post(
    "http://localhost:3001/anecdotes",
    anecdote
  );
  return data;
};

const anecdotesService = { addAnecdote };
export default anecdotesService;
