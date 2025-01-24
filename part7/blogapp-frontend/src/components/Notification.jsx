import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = ({ errorMessage, message }) => {
  const [notification, dispatch] = useContext(NotificationContext)

  if (notification.style === 'error') {
    setTimeout(() => {
      dispatch({ type: 'ERASE' })
    }, 5000)
    return <div className="errorStyle">{notification.message}</div>
  } else if (notification.style === 'success') {
    setTimeout(() => {
      dispatch({ type: 'ERASE' })
    }, 5000)
    return <div className="messageStyle">{notification.message}</div>
  }

  return null
}

export default Notification
