const { default: mongoose } = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('User Api', () => {
  afterAll(async () => {
    await User.deleteMany({})
    mongoose.connection.close()
  })
  it('POST: should return 400 status code when user is 2 characters', async () => {
    const testPayload = { username: 'te', password: '123' }
    const response = await api.post('/api/users').send(testPayload)
    expect(response.statusCode).toEqual(400)
  })
  it('POST: should return 400 status code when not userName', async () => {
    const testPayload = { password: '123' }
    const response = await api.post('/api/users').send(testPayload)
    expect(response.statusCode).toEqual(400)
  })
  it('POST: should return 429 status code when username is already saved', async () => {
    const testPayload = { username: 'testUser', password: '123' }
    const user = new User(testPayload)
    await user.save()
    const response = await api.post('/api/users').send(testPayload)
    expect(response.statusCode).toEqual(429)
  })
})
