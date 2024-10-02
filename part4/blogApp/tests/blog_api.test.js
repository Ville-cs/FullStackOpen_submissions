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

test('blogs can be deleted by id', async () => {
  const blogs = await helper.blogsInDb()
  const deleted = blogs[0]

  await api.delete(`/api/blogs/${deleted.id}`).expect(204)
  const blogsAfter = await helper.blogsInDb()

  assert.strictEqual(blogsAfter.length, blogs.length - 1)

  const titles = blogsAfter.map((blog) => blog.title)
  assert(!titles.includes(deleted.title))
})

test('blogs can be updated by id', async () => {
  const blogs = await helper.blogsInDb()
  const toBeUpdated = blogs[0]
  const updatedBlog = {
    title: 'test update',
    author: 'test update',
    url: 'new url',
    likes: 999,
  }
  await api
    .put(`/api/blogs/${toBeUpdated.id}`)
    .send(updatedBlog)
    .set('content-type', 'application/json')
    .expect(200)
})

after(async () => {
  await mongoose.connection.close()
})
