const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'blog1',
    author: 'some guy',
    url: 'http.url.com',
    likes: 5,
  },
  {
    title: 'blog2',
    author: 'some guy2',
    url: 'http.url2.com',
    likes: 52,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
}
