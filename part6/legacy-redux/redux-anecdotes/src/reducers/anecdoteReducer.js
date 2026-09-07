import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdotes(state, action) {
      state.push(action.payload)
    },
    updateLikes(state, action) {
      const id = action.payload.id
      const anecdoteToChange = state.find(x => x.id === id)
      anecdoteToChange.votes++
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { appendAnecdotes, setAnecdotes, updateLikes } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addNew(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const addLike = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addLike(id)
    dispatch(updateLikes(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
