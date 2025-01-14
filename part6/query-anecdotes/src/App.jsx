import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/anecdoteList'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['myAnecdotes'] })
      queryClient.setQueryData(
        { queryKey: ['myAnecdotes'] },
        anecdotes.concat(newAnecdote)
      )
    },
  })

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

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  const result = useQuery({
    queryKey: ['myAnecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>could not connect to the server</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote} />
      <AnecdoteList anecdotes={anecdotes} handleVote={upvoteAnecdote} />
    </div>
  )
}

export default App
