import React from "react";

const Anecdote = ({ anecdote: { content, votes, info } }) => {
  return (
    <div>
      <h2>{content}</h2>
      <p>has {votes} votes</p>
      <p>for more info see {info}</p>
    </div>
  );
};

export default Anecdote;
