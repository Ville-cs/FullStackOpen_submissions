import { useAnecdotes } from "../useAnecdotes"
import { useNotify } from "../useNotify"

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes()
  const { setNotification } = useNotify()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    addAnecdote(content)
    setNotification(`Added: ${content}`)
    setTimeout(() => {
      setNotification("")
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
