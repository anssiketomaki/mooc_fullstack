const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET ALL
blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    if(blogs){
      response.json(blogs)
    } else {
      response.status(404).end()
    }
  } catch (error) {
      next(error)
  }
})

// ADD BLOG-POST to the DB
blogsRouter.post('/', async (request, response, next) => {
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
  try{
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error){
    next(error)
  }
})

module.exports = blogsRouter
