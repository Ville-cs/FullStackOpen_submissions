import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAnecdotes, postAnecdote, upvoteAnecdote } from "./requests"
import { useNotify } from "./useNotify"

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotify()

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: postAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote))
    },
    onError: ({ error }) => {
      setNotification(error)
      setTimeout(() => {
        setNotification("")
      }, 5000)
    },
  })

  const upvoteMutation = useMutation({
    mutationFn: upvoteAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((a) => (a.id === newAnecdote.id ? newAnecdote : a)),
      )
    },
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    addAnecdote: (content) => newAnecdoteMutation.mutate(content),
    upvoteAnecdote: (anecdote) =>
      upvoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
  }
}
