import { useSelector, useDispatch } from 'react-redux'
import { addLike } from '../reducers/anecdoteReducer'

const AnecdoteLIst = () => {
  const anecdotes = useSelector(state => {
    console.log(state)
    if (!state.filter) {
      return state.notes
    }
    return state.notes.filter(x =>
      x.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })
  const dispatch = useDispatch()

  const vote = id => {
    dispatch(addLike(id))
  }

  const sortAnecdotes = () => {
    anecdotes.toSorted((a, b) => b.votes - a.votes)
  }
  sortAnecdotes()

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteLIst