import '../styles.css'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../reducers/NotificationContext'
import { useUserValue } from '../reducers/UserContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Blog = ({ blog }) => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const user = useUserValue()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  const handleRemove = blog => {
    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
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
    // db doesn't accept whole objects
    const comments = []
    for (let i = 0; i < blog.comments.length; i++) {
      comments.push(blog.comments[i].id)
    }
    const newBlog = {
      ...blog,
      user: blog.user.id,
      comments: comments,
      likes: blog.likes + 1,
    }
    updateBlogMutation.mutate(newBlog)
  }

  const onChange = event => {
    setComment(event.target.value)
  }

  const handleComment = comment => {
    const object = { content: comment, blog: blog.id }
    addCommentMutation.mutate(object)
    setComment('')
  }

  const addCommentMutation = useMutation({
    mutationFn: blogService.postComment,
    onSuccess: comment => {
      const blogs = queryClient.getQueryData(['myBlogs'])
      queryClient.setQueryData(
        ['myBlogs'],
        blogs.map(n =>
          n.id === comment.blog
            ? { ...n, comments: n.comments.concat(comment) }
            : n
        )
      )
      dispatch({ type: 'COMMENT' })
    },
  })

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
      <h3>Comments</h3>
      <div>
        <input value={comment} onChange={onChange} />
        <button onClick={() => handleComment(comment)}>post a comment!</button>
      </div>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
