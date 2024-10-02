const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  if (blog.likes === null) {
    blog.likes = 0
  }
  if (!blog.title || !blog.url) {
    response.status(400).send(blog)
  } else {
    blog.save().then((result) => {
      response.status(201).json(result)
    })
  }
})

module.exports = blogsRouter
