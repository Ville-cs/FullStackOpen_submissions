import { useContext } from 'react'
import NotificationContext from '../reducers/NotificationContext'
import { Alert } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'

const myStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  if (notification.style === 'error') {
    setTimeout(() => {
      dispatch({ type: 'ERASE' })
    }, 5000)
    return (
      <Alert variant="filled" severity="error">
        {notification.message}
      </Alert>
    )
  } else if (notification.style === 'success') {
    setTimeout(() => {
      dispatch({ type: 'ERASE' })
    }, 5000)
    return (
      <div style={myStyle}>
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          variant="filled"
          severity="success"
          color="info"
        >
          {notification.message}
        </Alert>
      </div>
    )
  }

  return null
}

export default Notification
