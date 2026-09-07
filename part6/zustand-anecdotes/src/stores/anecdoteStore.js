import { create } from "zustand"
import {
  getAllAnecdotes,
  addAnecdote,
  upvoteAnecdote,
  deleteAnecdote,
} from "../services/anecdoteService"

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  actions: {
    initialize: async () => {
      const anecdotes = await getAllAnecdotes()
      set(() => ({ anecdotes }))
    },
    addFilter: (filter) =>
      set(() => ({
        filter: filter,
      })),
    upvote: async (id) => {
      const anecdote = get().anecdotes.find((a) => a.id === id)
      const updated = await upvoteAnecdote(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      })
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id ? updated : anecdote,
        ),
      }))
    },
    add: async (anecdote) => {
      const added = await addAnecdote(anecdote)
      set((state) => ({ anecdotes: [...state.anecdotes, added] }))
    },
    deleteAnecdote: async (id) => {
      const anecdote = get().anecdotes.find((a) => a.id === id)
      if (anecdote.votes !== 0) {
        throw new Error("Cannot delete anecdote with votes")
      }
      await deleteAnecdote(id)
      set((state) => ({
        anecdotes: state.anecdotes.filter((anecdote) => anecdote.id !== id),
      }))
    },
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  let filtered
  if (filter) {
    filtered = anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase()),
    )
    return filtered.toSorted((a, b) => b.votes - a.votes)
  }
  return anecdotes.toSorted((a, b) => b.votes - a.votes)
}

export const useFilter = () => {
  return useAnecdoteStore((state) => state.filter)
}

export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions)

export default useAnecdoteStore
