import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeAnecdotes,
  vote as voteAction,
} from "../reducers/anecdoteReducer";

const sortFunction = (a, b) => {
  if (a.votes < b.votes) {
    return 1;
  } else {
    return -1;
  }
};

const AnecdoteList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const {
    anecdotes,
    filter: { filter },
  } = useSelector((state) => state);

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
