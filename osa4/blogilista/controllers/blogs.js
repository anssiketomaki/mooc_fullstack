const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET ALL
blogsRouter.get('/', (request, response, next) => {
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
blogsRouter.post('/', (request, response, next) => {
  const body = request.body

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
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
