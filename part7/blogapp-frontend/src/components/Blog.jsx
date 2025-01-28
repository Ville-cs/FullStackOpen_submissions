import '../styles.css'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../reducers/NotificationContext'
import { useUserValue } from '../reducers/UserContext'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const user = useUserValue()
  const navigate = useNavigate()

  const handleRemove = blog => {
    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(['myBlogs'])
      queryClient.invalidateQueries(['myBlogs'])
      dispatch({ type: 'DELETE' })
      navigate('/')
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: blog => {
      const blogs = queryClient.getQueryData(['myBlogs'])
      queryClient.setQueryData(
        ['myBlogs'],
        blogs.map(n => (n.id === blog.id ? blog : n))
      )
      dispatch({ type: 'LIKE', payload: blog.title })
    },
  })

  const handleLike = async blog => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
    }
    updateBlogMutation.mutate(newBlog)
  }

  if (!blog) return null

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        Likes {blog.likes}
        <button className="likeStyle" onClick={() => handleLike(blog)}>
          like
        </button>
      </div>
      <div> Added by {blog.user.name}</div>
      {user.id === blog.user.id || user.id === blog.user ? (
        <button className="removeStyle" onClick={() => handleRemove(blog)}>
          remove
        </button>
      ) : null}
    </div>
  )
}

export default Blog
