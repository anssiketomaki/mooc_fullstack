const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const testUsers = [
    {
        username: "koekaniini",
        name: "Niini Koeka",
        passwordHash: "$2b$10$PW6ZuFKJMuVN.bfkimZ1Pu7gwDvaGvv0nxIjvAYK8uHwrYOge4WzO",
    },
    {
        username: "pretester",
        name: "tester pre",
        passwordHash: "$2b$10$PW6ZuFKJMuVN.bfkimZ1Pu7gwDvaGvv0nxIjvAYK8uHwrYOge4WzO",
    },
]

const testUserLoginInfo = {
            username: "koekaniini",
            password: "salainensana",
        }

// NO USER OBJECT
const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
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
        likes: 2,
        __v: 0
    }   
]

beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})
        await Blog.insertMany(initialBlogs) // note: no user object
        await User.insertMany(testUsers)

        // HELPER TO CREATE passwordHash to mongo
        // await api
        //     .post('/api/users')
        //     .send({
        //         username: "koekaniini2",
        //         name: "Niini Koeka2",
        //         password: "salainensana",
        //     })
        //     .expect(201)
})

describe('token receiving and necessity of use', () => {
    test('user gets a token at login', async () => {
        
        const loggedIn = await api
            .post('/api/login')
            .send(testUserLoginInfo)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        assert(loggedIn.body.token, 'A token should be returned upon successful login')
        assert.strictEqual(typeof loggedIn.body.token, 'string')
    })
    test('user cannot add blog no token', async () => {
        const newblog = {
            title: "no token - no blog",
            author: "Blog McBlogpants",
            url: "https://www.helsinki.fi/",
        }
        const saved = await api
            .post('/api/blogs')
            .send(newblog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        assert(saved.body.error, 'Response body should have error field')
        assert(
            saved.body.error.includes('token'),
            'The error message should mention the token'
        )
    })
    test('user cannot add blog without token', async () => {
        const absentToken = {
                Accept: 'application/json',
            }
        
        const newblog = {
            title: "no token - no blog",
            author: "Blog McBlogpants",
            url: "https://www.helsinki.fi/",
        }
        const saved = await api
            .post('/api/blogs')
            .send(newblog)
            .set(absentToken)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        assert(saved.body.error, 'Response body should have error field')
        assert(
            saved.body.error.includes('token'),
            'The error message should mention the token'
        )
    })
    test('user cannot add blog with malformed token', async () => {
        const loginInfo = await api
            .post('/api/login')
            .send(testUserLoginInfo)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const userToken = 'Bearer '+loginInfo.body.token

        const malformed = userToken.slice(0, -2)
        const invalidToken = {
                Accept: 'application/json',
                authorization: malformed
            }
        
        const newblog = {
            title: "no token - no blog",
            author: "Blog McBlogpants",
            url: "https://www.helsinki.fi/",
        }
        const saved = await api
            .post('/api/blogs')
            .send(newblog)
            .set(invalidToken)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        assert(saved.body.error, 'Response body should have error field')
        assert(
            saved.body.error.includes('token'),
            'The error message should mention the token'
        );
        assert(
            saved.body.error.includes('invalid'),
            'The error message should mention "invalid"'
        );
    })

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
        const loginInfo = await api
            .post('/api/login')
            .send(testUserLoginInfo)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const userToken = 'Bearer '+loginInfo.body.token
        const authHeaders = {
                Accept: 'application/json',
                authorization: userToken
            }

        const newPost = {
            title: "A blog post to blog them all",
            author: "Blog McBlogpants",
            url: "https://www.helsinki.fi/",
            likes: 0
        }
        await api
            .post('/api/blogs')
            .send(newPost)
            .set(authHeaders)
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

describe('API POST input parameters', () =>{
    test('Likes default to zero when absent', async () => {
        const loginInfo = await api
            .post('/api/login')
            .send(testUserLoginInfo)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const userToken = 'Bearer '+loginInfo.body.token
        const authHeaders = {
                Accept: 'application/json',
                authorization: userToken
            }

        const absentLikes = {
            title: "Absent likes",
            author: "Blog McBlogpants",
            url: "https://www.helsinki.fi/",
        }
        const saved = await api
            .post('/api/blogs')
            .send(absentLikes)
            .set(authHeaders)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(saved.body.title, "Absent likes")
        assert.strictEqual(saved.body.likes, 0)
    })

    test('Likes default to zero when null', async () => {
        const loginInfo = await api
            .post('/api/login')
            .send(testUserLoginInfo)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const userToken = 'Bearer '+loginInfo.body.token
        const authHeaders = {
                Accept: 'application/json',
                authorization: userToken
            }

        const nullLikes = {
            title: "Null likes",
            author: "Blog McBlogpants",
            url: "https://www.helsinki.fi/",
            likes: null
        }
        const saved = await api
            .post('/api/blogs')
            .send(nullLikes)
            .set(authHeaders)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        assert.strictEqual(saved.body.title, "Null likes")
        assert.strictEqual(saved.body.likes, 0)

    })

    test('Title is required on POST', async () => {
        const loginInfo = await api
            .post('/api/login')
            .send(testUserLoginInfo)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const userToken = 'Bearer '+loginInfo.body.token
        const authHeaders = {
                Accept: 'application/json',
                authorization: userToken
            }

        const noTitle = {
            title: "",
            author: "Blog McBlogpants",
            url: "https://www.helsinki.fi/",
            likes: 0
        }
        const response = await api
            .post('/api/blogs')
            .send(noTitle)
            .set(authHeaders)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        assert(response.body.error, 'Response body should have error field')
        assert(
            response.body.error.includes('title'),
            'The error message should mention the title field'
        );
    })

    test('author is required on POST', async () => {
        const loginInfo = await api
            .post('/api/login')
            .send(testUserLoginInfo)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const userToken = 'Bearer '+loginInfo.body.token
        const authHeaders = {
                Accept: 'application/json',
                authorization: userToken
            }

        const noAuthor = {
            title: "Blog McBlogpants gone missing - last seen by the keyboard",
            author: "",
            url: "https://www.helsinki.fi/",
            likes: 0
        }
        const response = await api
            .post('/api/blogs')
            .send(noAuthor)
            .set(authHeaders)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        assert(response.body.error, 'Response body should have error field')
        assert(
            response.body.error.includes('author'),
            'The error message should mention the author field'
        );
    })

    test('Url is required on POST', async () => {
        const loginInfo = await api
            .post('/api/login')
            .send(testUserLoginInfo)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const userToken = 'Bearer '+loginInfo.body.token
        const authHeaders = {
                Accept: 'application/json',
                authorization: userToken
            }

        const noUrl = {
            title: "the beauty of the absent audience",
            author: "Blog McBlogpants",
            url: "",
            likes: 0
        }
        const response = await api
            .post('/api/blogs')
            .send(noUrl)
            .set(authHeaders)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        assert(response.body.error, 'Response body should have error field')
        assert(
            response.body.error.includes('url'),
            'The error message should mention the url field'
        );
    })
})

describe('API DELETE and UPDATE', () =>{
    test('Blog can be deleted with its "id"', async () => {
        const loginInfo = await api
            .post('/api/login')
            .send(testUserLoginInfo)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const userToken = 'Bearer '+loginInfo.body.token
        const authHeaders = {
                Accept: 'application/json',
                authorization: userToken
            }

        const addToDelete = {
            title: "to the present and back to oblivion",
            author: "Blog McBlogpants",
            url: "https://www.helsinki.fi/",
            likes: 7
        }

        const responseFromPost = await api
            .post('/api/blogs')
            .send(addToDelete)
            .set(authHeaders)
            .expect(201)
        
        const idToDelete = responseFromPost.body.id

        const BlogsAfterAdd = await api.get('/api/blogs')
        // verify db size change
        assert.strictEqual(BlogsAfterAdd.body.length, initialBlogs.length+1)

        await api
            .delete(`/api/blogs/${idToDelete}`)
            .set(authHeaders)
            .expect(204)
        
        const blogsAfterDelete = await api.get('/api/blogs');
        assert.strictEqual(blogsAfterDelete.body.length, initialBlogs.length);
    })

    test('Blog info can be updated with its "id"', async () => {
        const loginInfo = await api
            .post('/api/login')
            .send(testUserLoginInfo)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const userToken = 'Bearer '+loginInfo.body.token
        const authHeaders = {
                Accept: 'application/json',
                authorization: userToken
            }

        const toUpdate = {
            title: "TBA - update real title",
            author: "Secret writer",
            url: "https://www.tuni.fi",
            likes: 0
        }

        const responseFromPost = await api
            .post('/api/blogs')
            .send(toUpdate)
            .set(authHeaders)
            .expect(201)
        
        const idToUpdate = responseFromPost.body.id
        assert.strictEqual(responseFromPost.body.author, toUpdate.author)
        assert.strictEqual(responseFromPost.body.likes, toUpdate.likes)
        
        const updates = {
            title: "Art of using second chances",
            author: "Blog McBlogpants",
            url: "https://www.helsinki.fi",
            likes: 1001
        }
        
        await api
            .put(`/api/blogs/${idToUpdate}`)
            .send(updates)
            .set(authHeaders)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const responseFromUpdate = await api.get(`/api/blogs/${idToUpdate}`)

        assert.strictEqual(responseFromUpdate.body.author, updates.author)
        assert.strictEqual(responseFromUpdate.body.likes, updates.likes)
        assert.strictEqual(responseFromUpdate.body.id, idToUpdate)
    })
})

after(async () => {
  await mongoose.connection.close()
})
