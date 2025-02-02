import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../reducers/NotificationContext'
import { TextField, Button } from '@mui/material'

const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const onReset = () => setValue('')

  return {
    type,
    value,
    onChange,
    onReset,
  }
}

const BlogForm = ({ blogFormRef }) => {
  const { onReset: resetTitle, ...title } = useField('text')
  const { onReset: resetAuthor, ...author } = useField('text')
  const { onReset: resetUrl, ...url } = useField('text')
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const handleSubmit = async event => {
    event.preventDefault()
    newBlogMutation.mutate({
      title: title.value,
      author: author.value,
      url: url.value,
    })
    resetTitle(), resetAuthor(), resetUrl()
    blogFormRef.current.toggleVisibility()
  }

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: newBlog => {
      queryClient.invalidateQueries(['myBlogs'])

      dispatch({ type: 'POST', payload: newBlog.title })
    },
  })

  return (
    <form id="testForm" onSubmit={handleSubmit}>
      <div>
        <TextField
          variant="filled"
          {...title}
          placeholder="title of the blog"
          id="title"
        />
      </div>
      <div>
        <TextField
          variant="filled"
          {...author}
          placeholder="author of the blog"
          id="author"
        />
      </div>
      <div>
        <TextField
          variant="filled"
          {...url}
          placeholder="URL of the blog"
          id="url"
        />
      </div>
      <Button type="submit">Post</Button>
    </form>
  )
}

export default BlogForm
