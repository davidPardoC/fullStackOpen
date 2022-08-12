import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
import anecdotesService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const anecdote = { content: e.target.newNote.value, id: getId(), votes: 0 };
    if (!anecdote) {
      return;
    }
    e.target.newNote.value = "";
    const newAnecdote = await anecdotesService.addAnecdote(anecdote);
    dispatch(createAnecdote(newAnecdote));
    dispatch(showNotification({ message: "Anecdote created" }));
  };

  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <div>
        <input name="newNote" />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
