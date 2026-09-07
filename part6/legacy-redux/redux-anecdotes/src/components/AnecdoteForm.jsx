import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createMessage } from '../reducers/messageReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const postAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))

    dispatch(createMessage(`You posted ${content}`, 3))
  }

  return (
    <div>
      <h2>create anecdote</h2>
      <form onSubmit={postAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
