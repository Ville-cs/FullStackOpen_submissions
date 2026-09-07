import { useState } from "react";
import Statistics from "./components/Statistics";
import Button from "./components/Button";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>
      <Button value={good} handler={setGood} text="good" />
      <Button value={neutral} handler={setNeutral} text="neutral" />
      <Button value={bad} handler={setBad} text="bad" />
      <h2>statistics</h2>
      {good || neutral || bad ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <div>No feedback given</div>
      )}
    </div>
  );
};

export default App;
