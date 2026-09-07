const initialState = {
  good: 1,
  ok: 3,
  bad: 2,
}

const counterReducer = (state, action) => {
  if (!state) {
    state = initialState
  }
  switch (action.type) {
    case 'GOOD':
      const good = state.good + 1
      return { ...state, good }
    case 'OK':
      const ok = state.ok + 1
      return { ...state, ok }
    case 'BAD':
      const bad = state.bad + 1
      return { ...state, bad }
    case 'ZERO':
      return (state = {
        good: 0,
        ok: 0,
        bad: 0,
      })
    default:
      return state
  }
}

export default counterReducer
