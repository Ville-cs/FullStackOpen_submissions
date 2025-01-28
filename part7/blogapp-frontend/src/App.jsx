import { useState, useEffect, useRef, useContext } from 'react'
import loginService from './services/login'
import userService from './services/users'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Home from './components/Home'
import Blog from './components/Blog'
import NavBar from './components/NavBar'
import { useNotificationDispatch } from './reducers/NotificationContext'
import { useQuery } from '@tanstack/react-query'
import blogService from './services/blogs'
import UserContext from './reducers/UserContext'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import './styles.css'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatchNotification = useNotificationDispatch()
  const [user, dispatchUser] = useContext(UserContext)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatchUser({ type: 'SETUSER', payload: user })
    }
  }, [dispatchUser])

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
    } catch (error) {
      dispatchNotification({
        type: 'LOGIN_ERROR',
        payload: error.response.data.error,
      })
    }
  }

  const blogsResult = useQuery({
    queryKey: ['myBlogs'],
    queryFn: blogService.getAll,
    retry: 1,
    refetchOnWindowFocus: false,
  })
  const blogs = blogsResult.data

  const matchBlog = useMatch('/blogs/:id')
  let blog = null
  if (blogs && matchBlog) {
    blog = blogs.find(blog => blog.id === matchBlog.params.id)
  }

  const usersResult = useQuery({
    queryKey: ['myUsers'],
    queryFn: userService.getUsers,
    retry: 1,
    refetchOnWindowFocus: false,
  })
  const users = usersResult.data

  const matchUser = useMatch('/users/:id')
  let blogUser = null
  if (users && matchUser) {
    blogUser = users.find(user => user.id === matchUser.params.id)
  }

  const padding = {
    padding: 5,
  }

  if (!user) {
    return (
      <div>
        <h2>Login to see blogs</h2>
        <Notification />
        <Togglable buttonLabel="Log in here">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User blogUser={blogUser} />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
      </Routes>
    </div>
  )
}

export default App
