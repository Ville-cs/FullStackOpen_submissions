import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createMessage, deleteMessage } from '../reducers/messageReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const postAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.addNew(content)
    dispatch(createAnecdote(newAnecdote))

    dispatch(createMessage(`You posted ${content}`))
    setTimeout(() => {
      dispatch(deleteMessage())
    }, 5000)
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
