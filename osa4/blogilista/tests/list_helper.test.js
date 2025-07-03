const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
        {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
        }
    ]
    const listWithManyBlogs = [
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

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('when list has multiple blogs the sum of likes is correct', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        assert.strictEqual(result, 36)
    })
})

describe('most liked', () => {
    test('most liked is found from list of one', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        assert.strictEqual(result.likes, 5)
    })
    
    test('most liked blog is found out of many blogs', () => {
        const result = listHelper.favoriteBlog(listWithManyBlogs)
        assert.strictEqual(result.likes, 12)
    })
})

describe('author activity', () => {
    test('find most active author from list of one', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        assert.strictEqual(result.author, 'Edsger W. Dijkstra')
    })
    
    test('find most active author from list of many', () => {
        const result = listHelper.mostBlogs(listWithManyBlogs)
        assert.strictEqual(result.author, "Robert C. Martin")
    })
})