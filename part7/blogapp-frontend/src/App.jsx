import { useEffect, useContext } from 'react'
import userService from './services/users'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Home from './components/Home'
import Blog from './components/Blog'
import NavBar from './components/NavBar'
import { useQuery } from '@tanstack/react-query'
import blogService from './services/blogs'
import UserContext from './reducers/UserContext'
import { Routes, Route, Navigate, useMatch } from 'react-router-dom'
import { Container } from '@mui/material'

const App = () => {
  const [user, dispatchUser] = useContext(UserContext)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatchUser({ type: 'SETUSER', payload: user })
    }
  }, [dispatchUser])

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

  if (!user) return <LoginForm />

  return (
    <Container>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <LoginForm /> : <Navigate replace to="/" />}
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User blogUser={blogUser} />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
      </Routes>
    </Container>
  )
}

export default App
