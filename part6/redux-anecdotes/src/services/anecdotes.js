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

const anecdotesService = { addAnecdote, getAllAnecdotes };
export default anecdotesService;
