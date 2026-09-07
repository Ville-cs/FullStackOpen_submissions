import { useAnecdoteActions } from "../stores/anecdoteStore"

const Filter = () => {
  const { addFilter } = useAnecdoteActions()
  const handleChange = (event) => {
    addFilter(event.target.value)
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
