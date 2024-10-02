const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const morgan = require('morgan')

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)
const mongoUrl = config.MONGODB_URI

mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info('connected to mongodb')
  })
  .catch((error) => {
    logger.error('error while connecting to mongodb', error.message)
  })

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
// app.use(
//   morgan(':method :url :status :res[content-length] - :response-time ms :body ')
// )
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
