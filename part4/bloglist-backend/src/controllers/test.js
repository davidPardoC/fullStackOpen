const Blog = require('../models/blog')
const User = require('../models/user')

const testRouter = require('express').Router()

testRouter.post('/reset', async (req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  res.json({ message: 'Database reseted' })
})

module.exports = testRouter
