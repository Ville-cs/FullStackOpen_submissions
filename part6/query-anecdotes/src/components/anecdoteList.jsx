import { updateAnecdote } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: data => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['myAnecdotes'] })
      queryClient.setQueryData(
        ['myAnecdotes'],
        anecdotes.map(n => (n.id === data.id ? data : n))
      )
    },
  })

  const upvoteAnecdote = anecdote => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }
  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => upvoteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

AnecdoteList.propTypes = {
  anecdotes: PropTypes.array.isRequired,
}

export default AnecdoteList