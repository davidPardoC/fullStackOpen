import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

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
  };

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="newNote" />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
