import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    addLike(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(x => x.id === id)
      anecdoteToChange.votes++
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { createAnecdote, addLike, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
