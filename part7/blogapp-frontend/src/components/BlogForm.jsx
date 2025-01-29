import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../reducers/NotificationContext'

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
      // const blogs = queryClient.getQueryData(['myBlogs'])
      // queryClient.setQueryData(['myBlogs'], blogs.concat(newBlog))

      //updates users blog entries too
      // const users = queryClient.getQueryData(['myUsers'])
      // queryClient.setQueryData(
      //   ['myUsers'],
      //   users.map(n =>
      //     n.id === newBlog.user ? { ...n, blogs: n.blogs.concat(newBlog) } : n
      //   )
      // )

      dispatch({ type: 'POST', payload: newBlog.title })
    },
  })

  return (
    <form id="testForm" onSubmit={handleSubmit}>
      <div>
        title:
        <input
          name="title"
          {...title}
          placeholder="title of the blog"
          id="title"
        />
      </div>
      <div>
        author:
        <input
          name="author"
          {...author}
          placeholder="author of the blog"
          id="author"
        />
      </div>
      <div>
        url:
        <input name="url" {...url} placeholder="URL of the blog" id="url" />
      </div>
      <button className="postBlog" type="submit">
        Post
      </button>
    </form>
  )
}

export default BlogForm
