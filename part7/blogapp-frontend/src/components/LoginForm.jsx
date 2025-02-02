import loginService from '../services/login'
import { useState } from 'react'
import { useNotificationDispatch } from '../reducers/NotificationContext'
import { useUserDispatch } from '../reducers/UserContext'
import Notification from './Notification'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatchNotification = useNotificationDispatch()
  const dispatchUser = useUserDispatch()
  const navigate = useNavigate()

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      dispatchUser({ type: 'LOGIN', payload: user })
      dispatchNotification({ type: 'LOGIN', payload: user.username })
      navigate('/')
    } catch (error) {
      dispatchNotification({
        type: 'LOGIN_ERROR',
        payload: error.response.data.error,
      })
    }
  }

  return (
    <div>
      <h2>Login to see blogs</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
