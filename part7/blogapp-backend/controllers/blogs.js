const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

const middleware = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const body = req.body
  const user = req.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  })

  if (!blog.likes) {
    blog.likes = 0
  }

  if (!blog.title || !blog.url) {
    return res.status(400).send(blog)
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.post(
  '/:id/comments',
  middleware.userExtractor,
  async (req, res) => {
    const body = req.body
    const user = req.user
    // todo: blog extractor
    // const blog = req.blog

    if (!user) return res.status(401).json({ error: 'Login to post comments' })

    const comment = new Comment({
      content: body.comment,
      blog: body.blog,
    })

    // const savedComment = await comment.save()
    // blog.comments = blog.comments.concat(savedComment.id)
    // await blog.save()

    // res.status(201).json(savedComment)
  }
)

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog.user.toString() !== req.user.id) {
    return res.status(401).json({ error: 'invalid user' })
  }

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, body, {
    new: true,
  })
  res.status(200).json(updatedBlog)
})

module.exports = blogsRouter
