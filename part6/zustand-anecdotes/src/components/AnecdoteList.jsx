import { useAnecdotes, useAnecdoteActions } from "../stores/anecdoteStore"
import { useNotificationActions } from "../stores/notificationStore"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { upvote, deleteAnecdote } = useAnecdoteActions()
  const { setMessage } = useNotificationActions()

  const vote = (id) => {
    upvote(id)
    setMessage("Upvoted anecdote!")
    setTimeout(() => {
      setMessage("")
    }, 5000)
  }

  const remove = (id) => {
    deleteAnecdote(id)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              style={{
                marginLeft: "1em",
                backgroundColor: "green",
                color: "white",
              }}
              onClick={() => vote(anecdote.id)}
            >
              vote
            </button>
            {anecdote.votes === 0 && (
              <button
                style={{
                  marginLeft: "1em",
                  backgroundColor: "red",
                  color: "white",
                }}
                onClick={() => remove(anecdote.id)}
              >
                remove
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
