import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import UserInfo from './components/UserInfo'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

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

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await blogService.create({
        title: title,
        author: author,
        url: url,
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage('Blog submitted!')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('Some fields missing')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (!user) {
    return (
      <div>
        <h2>Login to see blogs</h2>
        <Notification errorMessage={errorMessage} message={message} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification errorMessage={errorMessage} message={message} />
      <UserInfo userDetails={user} handleClick={handleLogout} />
      <h2>Create a new blog</h2>
      <NewBlog
        title={title}
        author={author}
        url={url}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
        handleSubmit={handleSubmit}
      />
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App