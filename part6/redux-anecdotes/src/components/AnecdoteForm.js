import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    const anecdote = e.target.newNote.value;
    if (!anecdote) {
      return;
    }
    e.target.newNote.value = "";
    dispatch(createAnecdote(anecdote));
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