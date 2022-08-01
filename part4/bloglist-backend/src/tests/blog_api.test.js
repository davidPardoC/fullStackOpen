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

  test('POST: should default likes to 0 if property is not defined', async () => {
    const newBlog = {
      title: 'Test New Blog',
      author: 'Test Author',
      url: 'testUrl.com',
    }
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.status).toEqual(201)
    expect(response.body).toMatchObject({
      title: 'Test New Blog',
      author: 'Test Author',
      url: 'testUrl.com',
      likes: 0,
    })
  })

  test('POST: should return 400 on no "url" property on request', async () => {
    const newBlog = {
      title: 'Test New Blog',
      author: 'Test Author',
    }
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.status).toEqual(400)
  })

  test('DELETE: should delete a blog', async () => {
    const { body: blogs } = await api.get('/api/blogs')
    await api.delete(`/api/blogs/${blogs[0].id}`)
    const { body: blogs2 } = await api.get('/api/blogs')
    expect(blogs2.length).toEqual(1)
  })

  test('UPDATE: should update a blog', async () => {
    const { body: blogs } = await api.get('/api/blogs')
    const updatedBlog = {
      title: 'Updated blog',
      author: 'Updated Author',
      url: 'updatedUrl',
      likes: 0,
    }
    const updateResponse = await api
      .put(`/api/blogs/${blogs[0].id}`)
      .send(updatedBlog)

    expect(updateResponse.status).toEqual(200)
    expect(updateResponse.body).toMatchObject(updatedBlog)
  })
})
