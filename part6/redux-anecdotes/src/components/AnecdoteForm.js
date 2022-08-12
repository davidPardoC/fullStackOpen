import React from "react";
import { useDispatch } from "react-redux";
import { anecdoteCreator } from "../reducers/anecdoteReducer";

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
    dispatch(anecdoteCreator(anecdote));
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
