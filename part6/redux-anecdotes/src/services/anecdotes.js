import axios from "axios";

const baseUrl = "http://localhost:3001";

axios.defaults.baseURL = baseUrl;

const addAnecdote = async (anecdote) => {
  const { data } = await axios.post("/anecdotes", anecdote);
  return data;
};

const getAllAnecdotes = async () => {
  const { data } = await axios.get("/anecdotes");
  return data;
};

const voteAnecdote = async (anecdote) => {
  const { data } = await axios.put(`/anecdotes/${anecdote.id}`, anecdote);
  return data;
};

const anecdotesService = { addAnecdote, getAllAnecdotes, voteAnecdote };
export default anecdotesService;
