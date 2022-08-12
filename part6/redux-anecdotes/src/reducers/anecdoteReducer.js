import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";
import { showNotificationCreator } from "./notificationReducer";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    vote(state, action) {
      const noteVoted = action.payload;
      const updatedNotes = [...state].map((anecdote) =>
        anecdote.id === noteVoted.id ? noteVoted : anecdote
      );
      return updatedNotes;
    },
    createAnecdote(state, action) {
      const anecdote = action.payload;
      state.push(anecdote);
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAllAnecdotes();
    dispatch(setNotes(anecdotes));
  };
};

export const anecdoteCreator = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.addAnecdote(anecdote);
    dispatch(createAnecdote(newAnecdote));
    dispatch(showNotificationCreator("Added new notification", 2000));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    dispatch(vote(anecdote));
    dispatch(
      showNotificationCreator(`Voted ${anecdote.id} notification`, 2000)
    );
  };
};

export const { vote, createAnecdote, hideNotification, setNotes } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;
