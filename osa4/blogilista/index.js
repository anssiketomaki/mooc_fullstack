require('dotenv').config()
const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
const Blog = require('./models/blog')

const app = express()

// Middleware
app.use(express.json()) //parser for json data
app.use(express.static('dist')) //serve static files from dist folder
app.use(cors()) //enable CORS for all origins
app.use(morgan('tiny')) //log HTTP requests to the console

// GET ALL
app.get('/api/blogs', (request, response, next) => {
  Blog.find({})
  .then(blogs => {
    if(blogs){
      response.json(blogs)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

// ADD BLOG-POST to the DB
app.post('/api/blogs', (request, response, next) => {
  const body = request.body
  console.log(body)

  if (!body.author || !body.title || !body.url){
    return response.status(400).json({
      error: 'author, title or url missing'
    })
  }
  const likes = body.likes || 0

  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes
  })

  blog.save()
    .then((savedBlog) => {
      response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})

// Middleware for catching unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  // these specifics not set up yet to this project
  // if (error.name === 'CastError') {
  //   return response.status(400).send({ error: 'malformatted id' })
  // } else if (error.name === 'ValidationError') {
  //   return response.status(400).json({ error: error.message })
  // }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})