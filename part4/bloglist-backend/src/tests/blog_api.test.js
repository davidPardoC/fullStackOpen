const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
]

describe('Blog Api ', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    for (let index = 0; index < initialBlogs.length; index++) {
      let newBlog = new Blog(initialBlogs[index])
      await newBlog.save()
    }
  })

  afterAll(() => {
    mongoose.connection.close()
  })

  test('GET: blogs are returned as JSON and have the length of 2', async () => {
    const response = await api.get('/api/blogs')
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.body.length).toEqual(2)
  })

  test('GET: blogs contain and "id" property', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('POST: new blog is saved into DB', async () => {
    const newBlog = {
      title: 'Test New Blog',
      author: 'Test Author',
      url: 'testUrl.com',
      likes: 6,
    }
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.status).toEqual(201)
    const { body } = await api.get('/api/blogs')
    expect(body.length).toEqual(3)
  })
})
