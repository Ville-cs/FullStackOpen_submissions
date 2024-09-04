import { useState } from 'react'

const Button = ({ handleClick, text}) => {
  return (
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(8).fill(0))

  const handleNext = () => {
    {setSelected(getRandomInt(anecdotes.length))}
  }

  const handleVote = () => {
    console.log("Votes ", vote)
    const copy = [...vote]
    console.log("Copy ", copy)
    copy[selected] +=1
    setVote(copy)
    console.log("Copy after increment", copy)
    console.log("Selected anecdote", selected)
  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  return (
    <div>
      <h1> Anecdote of the day </h1>
      {anecdotes[selected]} <br></br>
      <div> has {vote[selected]} votes </div>
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleNext} text="next anecdote" />
      <h1> Anecdote with most votes </h1>
      {anecdotes[vote.indexOf(Math.max(...vote))]}
    </div>
  )
}

export default App