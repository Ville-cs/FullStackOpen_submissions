import Anecdote from "./Anecdote"
import { useAnecdotes } from "../useAnecdotes"

const AnecdoteList = () => {
  const { anecdotes, isPending } = useAnecdotes()

  if (isPending) {
    return <div>loading data...</div>
  }
  return (
    <div>
      {anecdotes &&
        anecdotes.map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </div>
  )
}

export default AnecdoteList
