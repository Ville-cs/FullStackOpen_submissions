import { createSlice } from '@reduxjs/toolkit'

// const filterReducer = (state, action) => {
//   if (!state) {
//     state = ''
//   }
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const filter = filter => {
//   return {
//     type: 'SET_FILTER',
//     payload: filter,
//   }
// }

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload
    },
  },
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
