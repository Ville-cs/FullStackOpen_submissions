import { useRef } from 'react'
import Togglable from './Togglable'
import BlogList from './BlogList'
import BlogForm from './BlogForm'

const Home = () => {
  const blogFormRef = useRef()

  return (
    <div>
      <h2>Create a new blog</h2>
      <Togglable buttonLabel="Post a new blog here!" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default Home
