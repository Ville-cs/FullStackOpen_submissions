const User = ({ blogUser }) => {
  if (!blogUser) return null

  return (
    <div>
      <h2>{blogUser.username}</h2>
      <h3>posted blogs</h3>
      {blogUser.blogs.length ? (
        <ul>
          {blogUser.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      ) : (
        <div>No blogs posted by this user</div>
      )}
    </div>
  )
}

export default User
