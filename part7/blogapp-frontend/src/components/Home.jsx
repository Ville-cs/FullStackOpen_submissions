import { useRef } from 'react'
import BlogList from './BlogList'

const Home = () => {
  const blogFormRef = useRef()

  return (
    <div>
      <h2>Create a new blog</h2>
      <BlogList />
    </div>
  )
}

export default Home
