import { useFeedback } from "../store"

const Buttons = () => {
  const {
    incrementGood,
    incrementNeutral,
    incrementBad,
    incrementAll,
    calculateAverage,
    calculatePositive,
  } = useFeedback()

  const handleUpdate = (increment) => {
    increment()
    incrementAll()
    calculateAverage()
    calculatePositive()
  }

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => handleUpdate(incrementGood)}>good</button>
      <button onClick={() => handleUpdate(incrementNeutral)}>neutral</button>
      <button onClick={() => handleUpdate(incrementBad)}>bad</button>
    </div>
  )
}

export default Buttons
