import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
  }

  return (
    <div>
      <h2>create anecdote</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
