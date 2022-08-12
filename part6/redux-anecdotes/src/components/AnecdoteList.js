import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { vote as voteAction } from "../reducers/anecdoteReducer";

const sortFunction = (a, b) => {
  if (a.votes < b.votes) {
    return 1;
  } else {
    return -1;
  }
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const anecdotes = [...state.anecdotes];
    return anecdotes.sort(sortFunction);
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAction(id));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
