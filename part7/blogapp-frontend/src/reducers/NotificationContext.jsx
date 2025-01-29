import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        style: 'success',
        message: `logged into ${action.payload}`,
      }
    case 'LOGIN_ERROR':
      return {
        style: 'error',
        message: action.payload,
      }
    case 'POST':
      return {
        style: 'success',
        message: `You posted ${action.payload}`,
      }
    case 'LIKE':
      return {
        style: 'success',
        message: `You liked ${action.payload}`,
      }
    case 'COMMENT':
      return {
        style: 'success',
        message: 'You posted a comment!',
      }
    case 'DELETE':
      return {
        style: 'success',
        message: `You deleted your post`,
      }
    case 'POST_ERROR':
      return {
        style: 'error',
        message: 'Your post should a title and a url!',
      }
    case 'ERASE':
      return {}
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
    {}
  )
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
