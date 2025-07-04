const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 0,
        __v: 0
    }  
]
beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(initialBlogs)
    })

describe('API GET - returning blogs', () => {
    test('blogs are returned from db as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs get returned from api', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test('returning blogs contain identifier as "id"', async () => {
        const response = await api.get('/api/blogs')
        
        assert(response.body.length > 0, 'Response contained NO blogs to test')

        const first = response.body[0]
        assert.strictEqual(
            Object.hasOwn(first, '_id'),
            false,
            'Mongodb default property "_id" should be changed to "id"'
        )
        assert.strictEqual(
            Object.hasOwn(first, 'id'),
            true,
            'Blog object should have property "id" precisely'
        )
    })
})
describe('API POST - adding blogs', () => {
    test('you can add blog posts via POST request to api', async ()=>{
        const newPost = {
            title: "A blog post to blog them all",
            author: "Blog McBlogpants",
            url: "https://www.helsinki.fi/",
            likes: 0
        }
        await api
            .post('/api/blogs')
            .send(newPost)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        // blogs count was increased by one on the database
        assert.strictEqual(response.body.length, initialBlogs.length+1)

        // newPost is found with its title from the response and content matches
        const found = response.body.find( blog => blog.title === newPost.title)
        assert.strictEqual(found.url, newPost.url)
        assert.strictEqual(found.author, newPost.author)
        assert.strictEqual(found.likes, 0)
    })
})
// test('a specific note is within the returned notes', async () => {
//   const response = await api.get('/api/notes')

//   const contents = response.body.map(e => e.content)
//   assert(contents.includes('HTML is easy'))
// })

after(async () => {
  await mongoose.connection.close()
})
