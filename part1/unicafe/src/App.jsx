import { useState } from 'react'

const Statistics = (props) => {
  console.log(props.feedback)
  if (props.feedback == 0) {
    return <div> No feedback given </div>
  }
  return (
  <table>
    <tbody>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="average" value={props.average()} />
      <StatisticLine text="positive" value={props.positive()} />
    </tbody>
  </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedback, setFeedback] = useState(0)

  const average = () => {
    let avgGood = good * 1
    let avgNeutral = neutral * 0
    let avgBad = bad * -1
    return (avgGood + avgNeutral + avgBad) / (good + neutral + bad)
  }

  const positive = () => {
    return (good / (good + neutral + bad) * 100)
  }

  const handleGood = () => {
    setGood(good + 1)
    setFeedback(feedback + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setFeedback(feedback + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setFeedback(feedback + 1)
  }

  return (
    <div>
      <h1> give feedback </h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <h1> statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        average={average}
        positive={positive}
        feedback={feedback}
      />
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  if (text == "positive") {
    return (
    <tr>
      <td> {text} </td>
      <td> {value} % </td>
    </tr>
    )
  }
  return (
    <tr>
      <td> {text} </td>
      <td> {value} </td>
    </tr>
    )
}


export default App