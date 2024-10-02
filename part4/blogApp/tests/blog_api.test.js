const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blogs return the same length', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs identifier is .id and not ._id', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual('id' in response.body[0], true)
})

test('blogs can be added to db', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'blog author',
    url: 'http.url.com',
    likes: 7,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('content-type', /application\/json/)

  const blogsAfter = await helper.blogsInDb()
  assert.strictEqual(blogsAfter.length, helper.initialBlogs.length + 1)

  const title = blogsAfter.map((e) => e.title)
  assert(title.includes('new blog'))
})

test('null likes field equals zero', async () => {
  const blog = {
    title: 'blog name',
    author: 'author name',
    url: 'url address',
    likes: null,
  }
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('content-type', /application\/json/)

  const response = await helper.blogsInDb()
  assert.strictEqual(response[response.length - 1].likes, 0)
})

test('return 400 if no title or url', async () => {
  const blog = {
    title: '',
    author: 'author name',
    url: 'url address',
    likes: 1,
  }
  await Blog.deleteMany({})
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)
    .expect('content-type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})
