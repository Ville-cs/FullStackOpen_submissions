import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  const [notification, dispatch] = useContext(NotificationContext)

  if (!notification) return null

  if (notification) {
    setTimeout(() => {
      dispatch({ type: 'ERASE' })
    }, 5000)
  }

  return (
    <div style={style}>
      <div>{notification}</div>
    </div>
  )
}

export default Notification
