const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.TOKEN_SECRET)
  if (!decodedToken._id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken._id)
  if (!user) {
    return response.status(404).json({ message: 'Not user found' })
  }
  const blog = new Blog({ ...request.body, user: user._id })
  if (!blog.url) {
    return response.status(400).send()
  }
  if (!blog.likes) {
    blog.likes = 0
  }
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const decodedToken = jwt.verify(req.token, process.env.TOKEN_SECRET)
  const blog = await Blog.findById(id)
  if (blog.user.toString() === decodedToken._id) {
    await Blog.findByIdAndDelete(id)
    return res.sendStatus(204)
  }
  res.sendStatus(403)
})

blogRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req
  const newBlog = await Blog.findByIdAndUpdate(id, body, { new: true })
  res.json(newBlog)
})

module.exports = blogRouter
