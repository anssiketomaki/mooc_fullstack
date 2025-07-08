const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
    {
        _id: "5a422a851b54a676234d17r4",
        username: "root",
        password: "salainen",
        __v: 0
    },
]

// beforeEach(async () => {
//         await Blog.deleteMany({})
//         await Blog.insertMany(initialUsers)
//     })

describe('API PUSH - can add users', () => {
    test('add new user works', async () => {
        const newUser = {
            username: "root",
            name: "Superuser",
            password: "salainen",
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        // TEE SILLEE ET VOI HAKEE JOTENKI MUUTENKI TIETYN!! EHKÄ!
        const response = await api.get('/api/users')
        console.log("EWWW", response.body[0].name)
        assert.strictEqual(response.body[0].name, newUser.name)
        assert.strictEqual(response.body[0].username, newUser.username)
        assert.strictEqual(
            Object.hasOwn(response.body[0], 'password'),
            false,
            'Password hash let alone plain text password should not be fetchable'
        )
    })

    test('all users get returned from api', async () => {
    const response = await api.get('/api/users')

    })
})

// describe('API GET - returning users', () => {
//     test('blogs are returned from db as json', async () => {
//     await api
//         .get('/api/blogs')
//         .expect(200)
//         .expect('Content-Type', /application\/json/)
//     })

//     test('all blogs get returned from api', async () => {
//     const response = await api.get('/api/blogs')

//     })
// })

after(async () => {
  await mongoose.connection.close()
})
