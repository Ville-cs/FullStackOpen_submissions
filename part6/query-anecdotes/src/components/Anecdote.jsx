import { useAnecdotes } from "../useAnecdotes"
import { useNotify } from "../useNotify"

const Anecdote = ({ anecdote }) => {
  const { setNotification } = useNotify()
  const { upvoteAnecdote } = useAnecdotes()

  const handleVote = (anecdote) => {
    upvoteAnecdote(anecdote)
    setNotification(`Upvoted: ${anecdote.content}`)
    setTimeout(() => {
      setNotification("")
    }, 5000)
  }
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote
