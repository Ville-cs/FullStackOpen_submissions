import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import '../styles.css'

const BlogList = () => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['myBlogs'])

  if (!blogs) return null

  const sortBlogs = () => {
    blogs.sort((a, b) => b.likes - a.likes)
  }
  sortBlogs()

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id} className="blogStyle">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
