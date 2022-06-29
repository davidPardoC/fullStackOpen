import { useState } from "react";

const App = () => {
  const [anecdotes, setAnecdotes] = useState( [
    { desc: "If it hurts, do it more often.", votes: 0 },
    {
      desc: "Adding manpower to a late software project makes it later!",
      votes: 0,
    },
    {
      desc: "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      votes: 0,
    },
    {
      desc: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      votes: 0,
    },
    { desc: "Premature optimization is the root of all evil.", votes: 0 },
    {
      desc: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      votes: 0,
    },
    {
      desc: "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      votes: 0,
    },
  ]);

  const [selected, setSelected] = useState(0);

  const handleClick = () => {
    const random = Math.floor(Math.random() * (anecdotes.length - 1));
    setSelected(random);
  };

  const handleVote = () => {
    const temp = [...anecdotes]
    temp[selected].votes ++
    setAnecdotes(temp)
  }

  return (
    <div>
      {anecdotes[selected].desc}
      <p>has {anecdotes[selected].votes} votes</p>
      <br />
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleClick}>next anecdote</button>
    </div>
  );
};

export default App;
