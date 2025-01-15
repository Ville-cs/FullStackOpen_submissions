import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'POST':
      return `You posted ${action.payload}`
    case 'VOTE':
      return `You voted for ${action.payload}`
    case 'ERROR':
      return 'Your post should be at least 5 characters long!'
    case 'ERASE':
      state = ''
      return state
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
