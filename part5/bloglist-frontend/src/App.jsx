import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import UserInfo from './components/UserInfo'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Login successful')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error.message)
      setErrorMessage('Username or password wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  blogs.sort((a, b) => b.likes - a.likes)

  if (!user) {
    return (
      <div>
        <h2>Login to see blogs</h2>
        <Notification errorMessage={errorMessage} message={message} />
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
  console.log(blogs)
  return (
    <div>
      <h2>Blogs</h2>
      <Notification errorMessage={errorMessage} message={message} />
      <UserInfo userDetails={user} handleClick={handleLogout} />
      <h2>Create a new blog</h2>
      <Togglable buttonLabel="Post a new blog here!">
        <BlogForm
          setMessage={setMessage}
          setErrorMessage={setErrorMessage}
          blogs={blogs}
          setBlogs={setBlogs}
        />
      </Togglable>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} blogs={blogs} />
      ))}
    </div>
  )
}

export default App
