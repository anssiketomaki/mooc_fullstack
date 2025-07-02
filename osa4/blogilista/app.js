const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch ((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.static('dist')) //serve static files from dist folder
app.use(express.json()) //parser for json data
app.use(cors()) //enable CORS for all origins
app.use(morgan('tiny')) //log HTTP requests to the console
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
