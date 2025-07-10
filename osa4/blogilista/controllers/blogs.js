const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// GET ALL
blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.
    find({}).populate('user', { username: 1, name: 1, id: 1})
    if(blogs){
      response.json(blogs)
    } else {
      response.status(404).end()
    }
  } catch (error) {
      next(error)
  }
})

// GET blog by id
blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blogs = await Blog
    .findById(request.params.id).populate('user', { username: 1, name: 1, id: 1})
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

  const user = await User.findOne()

  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  try{
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

// DELETE a blog from db by id
blogsRouter.delete('/:id', async (request, response, next) => {
  try{
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

// UPDATE a blog's fields in db by id
blogsRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body

  if (!title || !author || !url){
    return response.status(400).json({
      error: 'author, title or url missing'
    })
  }

  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes
  }

  try{
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blog,
      { new: true, runValidators: true, context: 'query' }
    )

    if (updatedBlog) {
        response.json(updatedBlog)
      } else {
        response.status(404).end()
      }
  } catch (error) {
    next(error)
  }
    
})

module.exports = blogsRouter
