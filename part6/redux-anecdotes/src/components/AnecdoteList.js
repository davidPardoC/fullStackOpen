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
  const {
    anecdotes,
    filter: { filter },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAction(id));
  };

  const sortedAnecdotes = () => {
    const sortedAnecdotes = [...anecdotes].sort(sortFunction);
    if (!filter) {
      return sortedAnecdotes;
    }
    return sortedAnecdotes.filter((anecdote) =>
      anecdote.content.includes(filter)
    );
  };

  return (
    <>
      {sortedAnecdotes().map((anecdote) => (
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
