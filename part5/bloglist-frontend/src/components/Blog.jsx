import { useState } from 'react'

const Blog = ({ blog, addLike, user, deleteBlog }) => {
  const [seeDetails, setSeeDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleClick = () => {
    setSeeDetails(!seeDetails)
  }
  if (!seeDetails) {
    return (
      <div>
        {blog.title}
        <button onClick={handleClick}> show details </button>
      </div>
    )
  }

  const handleLike = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    addLike(blog, blogObject)
  }

  const handleRemove = () => {
    deleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title}</div>
      <div> Read the article here {blog.url}</div>
      <div>
        Likes {blog.likes}
        <button onClick={handleLike}> like </button>
      </div>
      <div> By {blog.author}</div>
      <button onClick={handleClick}> hide </button>
      {user.id === blog.user.id ? (
        <button onClick={handleRemove}> remove </button>
      ) : null}
    </div>
  )
}

export default Blog
