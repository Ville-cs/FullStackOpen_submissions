import { useState } from 'react'

const Blog = ({ blog }) => {
  const [seeDetails, setSeeDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleClick = event => {
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

  return (
    <div style={blogStyle}>
      <div>{blog.title}</div>
      <div>{blog.url}</div>
      <div>{blog.likes}</div>
      <div>{blog.author}</div>
      <button onClick={handleClick}> hide </button>
    </div>
  )
}

export default Blog
