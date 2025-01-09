import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    createMessage(state, action) {
      return action.payload
    },
    deleteMessage(state, action) {
      state = ''
      return state
    },
  },
})

export const { createMessage, deleteMessage } = messageSlice.actions
export default messageSlice.reducer
