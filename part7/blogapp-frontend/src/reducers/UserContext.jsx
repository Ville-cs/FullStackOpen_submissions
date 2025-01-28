import { createContext, useReducer, useContext } from 'react'
import blogService from '../services/blogs'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      blogService.setToken(action.payload.token)
      return action.payload
    case 'SETUSER':
      blogService.setToken(action.payload.token)
      return action.payload
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

const UserContext = createContext()

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}

export const UserContextProvider = props => {
  const [user, userDispatch] = useReducer(userReducer, null)
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext
