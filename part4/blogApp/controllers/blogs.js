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

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, body, {
    new: true,
  })
  res.json(updatedBlog)
})

module.exports = blogsRouter
