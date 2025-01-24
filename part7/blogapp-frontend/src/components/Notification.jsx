import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = ({ errorMessage, message }) => {
  const [notification, dispatch] = useContext(NotificationContext)

  if (errorMessage) {
    return <div className="errorStyle">{errorMessage}</div>
  } else if (notification) {
    setTimeout(() => {
      dispatch({ type: 'ERASE' })
    }, 5000)
    return <div className="messageStyle">{notification}</div>
  }

  return null
}

export default Notification
