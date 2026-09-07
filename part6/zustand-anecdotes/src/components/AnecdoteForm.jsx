import { useAnecdoteActions } from "../stores/anecdoteStore"
import { useNotificationActions } from "../stores/notificationStore"

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()
  const { setMessage } = useNotificationActions()

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = e.target.anecdote.value
    add(text)
    setMessage(`Added anecdote ${text}!`)
    e.target.reset()
    setTimeout(() => {
      setMessage("")
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
