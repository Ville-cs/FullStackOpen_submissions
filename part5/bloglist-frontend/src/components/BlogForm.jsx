import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setMessage, setErrorMessage, blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const myBlog = {
        title: title,
        author: author,
        url: url,
        likes: 0,
      }
      await blogService.create(myBlog)
      setBlogs(blogs.concat(myBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage('Blog submitted!')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error)
      setErrorMessage('Some fields missing')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Post</button>
    </form>
  )
}

export default BlogForm
