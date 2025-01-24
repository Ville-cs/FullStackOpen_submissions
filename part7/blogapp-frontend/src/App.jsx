import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import UserInfo from './components/UserInfo'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import './styles.css'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [renderBlog, setRenderBlog] = useState(false)
  const dispatch = useNotificationDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [renderBlog])

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
      dispatch({ type: 'LOGIN', payload: user.username })
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error.response.data.error })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleBlogPost = async object => {
    try {
      const postedBlog = await blogService.create(object)
      setBlogs(blogs.concat(postedBlog))
      setRenderBlog(!renderBlog)
      blogFormRef.current.toggleVisibility()
      dispatch({ type: 'POST', payload: postedBlog.title })
    } catch (error) {
      dispatch({ type: 'POST_ERROR' })
    }
  }

  const deleteBlog = async blog => {
    await blogService.remove(blog.id)
    setRenderBlog(!renderBlog)
    dispatch({ type: 'DELETE', payload: blog.title })
  }

  const addLike = async (blog, blogObject) => {
    const response = await blogService.update(blog.id, blogObject)
    setRenderBlog(!renderBlog)
    dispatch({ type: 'LIKE', payload: response.title })
  }

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

  return (
    <div>
      <h2>Blogs</h2>
      <Notification errorMessage={errorMessage} message={message} />
      <UserInfo userDetails={user} handleClick={handleLogout} />

      <h2>Create a new blog</h2>
      <Togglable buttonLabel="Post a new blog here!" ref={blogFormRef}>
        <BlogForm handleBlogPost={handleBlogPost} />
      </Togglable>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          deleteBlog={deleteBlog}
          addLike={addLike}
        />
      ))}
    </div>
  )
}

export default App
