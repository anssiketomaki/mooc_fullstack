const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})

    if(users){
        response.json(users)
    } else {
        response.status(404).end()
    }
    
  } catch (error){
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body

    if (!username || !password) {
        return response.status(400).json({
            error: 'username or password missing'
        })
    } else if (password.length < 3 || username.length < 3){
        return response.status(400).json({
            error: 'password and username must be at least 3 characters long'
        })
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        username,
        name,
        passwordHash,
    })
    const savedUser = await user.save()

    try{
        response.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter
