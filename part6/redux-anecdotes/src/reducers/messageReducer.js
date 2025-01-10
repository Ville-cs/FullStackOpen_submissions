import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    deleteMessage(state, action) {
      state = ''
      return state
    },
  },
})

export const { setMessage, deleteMessage } = messageSlice.actions

export const createMessage = (message, timer) => {
  return async dispatch => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(deleteMessage())
    }, timer * 1000)
  }
}

export default messageSlice.reducer
