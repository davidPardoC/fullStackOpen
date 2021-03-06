import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodButton = () => {
    setGood(good + 1);
  };

  const handleNeutralButton = () => {
    setNeutral(neutral + 1);
  };

  const handleBadButton = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleGoodButton} />
      <Button text="neutral" onClick={handleNeutralButton} />
      <Button text="bad" onClick={handleBadButton} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const positivePercentage = (good * 100) / total;
  const average = (good - bad) / total;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="All" value={total} />
          <StatisticLine text="positive" value={positivePercentage} />
          <StatisticLine text="average" value={average} />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>       
    </tr>
  );
};
export default App;
