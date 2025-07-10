const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
    {
        username: "root",
        name: "groot",
        passwordHash: "$2a$10$Ib8kxiMRU2Eh/qbkcBoG/uOSuxgA9NlPgQPJyNu2MtC269fGZNwQu",
    },
    {
        username: "boss",
        name: "Hashy",
        passwordHash: "$2a$10$OsNeVqniNn8udSgGsa89V.D4NbICn23btc8p1c5OIgAb8LfU1cNku",
    },
]

beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany(initialUsers)
    })

describe('API PUSH and GET / - can add users and get all', () => {
    test('add new user works', async () => {
        const newUser = {
            username: "normal",
            name: "just_user",
            password: "kyseenalainen",
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const saved = await api.get('/api/users')
        const added = saved.body.find( u => u.name === newUser.name)
        assert.strictEqual(added.name, newUser.name)
        assert.strictEqual(added.username, newUser.username)
        assert.strictEqual(
            Object.hasOwn(added, 'passwordHash'),
            false,
            'Password hash let alone plain text password should not be fetchable'
        )
    })

    test('all users get returned from api', async () => {
        const saved = await api.get('/api/users')
        assert.strictEqual(saved.body.length, initialUsers.length)
    })

    test('cannot add users with NO password', async () => {
        const noPassword = {
            username: "nopassword",
            name: "nopassword",
            password: ""
        }
        const saved = await api
            .post('/api/users')
            .send(noPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(saved.body.error, 'Response body should have error field')
        assert(
            saved.body.error.includes('password'),
            'The error message should mention the password field'
        );
        assert(
            saved.body.error.includes('missing'),
            'The error message should mention a field missing'
        );
        // check that none of the erronous field containing POSTs got through to the db 
        const users = await api.get('/api/users')
        assert.strictEqual(users.body.length, initialUsers.length)
    })
    test('cannot add users with NO username', async () => {
        const noUsername = {
            username: "",
            name: "nousername",
            password: "nousername"
        }
        const saved = await api
            .post('/api/users')
            .send(noUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(saved.body.error, 'Response body should have error field')
        assert(
            saved.body.error.includes('username'),
            'The error message should mention the username field'
        );
        assert(
            saved.body.error.includes('missing'),
            'The error message should mention a field missing'
        );
        // check that none of the erronous field containing POSTs got through to the db 
        const users = await api.get('/api/users')
        assert.strictEqual(users.body.length, initialUsers.length)
    })

    test('cannot add users with too short password', async () => {
        const tooShortPassword = {
            username: "tooshortpassword",
            name: "tooshortpassword",
            password: "12"
        }
        const saved = await api
            .post('/api/users')
            .send(tooShortPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(saved.body.error, 'Response body should have error field')
        assert(
            saved.body.error.includes('password'),
            'The error message should mention the password field'
        );
        // check that none of the erronous field containing POSTs got through to the db 
        const users = await api.get('/api/users')
        assert.strictEqual(users.body.length, initialUsers.length)
    })

    test('cannot add users with too short username', async () => {
        const tooShortUsername = {
            username: "12",
            name: "tooshortusername",
            password: "tooshortusername"
        }
        const saved = await api
            .post('/api/users')
            .send(tooShortUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(saved.body.error, 'Response body should have error field')
        assert(
            saved.body.error.includes('username'),
            'The error message should mention the username field'
        );

        // check that none of the erronous field containing POSTs got through to the db 
        const users = await api.get('/api/users')
        assert.strictEqual(users.body.length, initialUsers.length)
    })
    test('cannot add users with same username', async () => {
        const original = {
            username: "SpongeBob",
            name: "Squarepans",
            password: "pineapplehouse"
        }
        const sameUsername = {
            username: "SpongeBob",
            name: "biggestfan",
            password: "patrikIsCool"
        }
        // try to add the same identical username twice
        await api
            .post('/api/users')
            .send(original)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const saved = await api
            .post('/api/users')
            .send(sameUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        // console.log(saved.body.error)
        assert(saved.body.error, 'Response body should have error field')
        assert(
            saved.body.error.includes('username'),
            'The error message should mention the username field'
        );
        assert(
            saved.body.error.includes('unique'),
            'The error message should mention the word "unique"'
        );

        // check that none of the erronous field containing POSTs got through to the db 
        const users = await api.get('/api/users')
        assert.strictEqual(users.body.length, initialUsers.length +1)
    })
})

after(async () => {
  await mongoose.connection.close()
})
