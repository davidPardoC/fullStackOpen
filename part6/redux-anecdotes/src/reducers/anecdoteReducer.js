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
      const noteToVote = state.filter(
        (anecdote) => anecdote.id === action.payload
      )[0];
      const updatedNotes = [...state].map((anecdote) =>
        anecdote.id === noteToVote.id
          ? { ...noteToVote, votes: noteToVote.votes + 1 }
          : anecdote
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

export const { vote, createAnecdote, hideNotification, setNotes } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;
