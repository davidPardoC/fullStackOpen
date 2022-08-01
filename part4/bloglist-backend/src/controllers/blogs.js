const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.url) {
    return response.status(400).send()
  }
  if (!blog.likes) {
    blog.likes = 0
  }
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  await Blog.findByIdAndDelete(id)
  res.sendStatus(204)
})

blogRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req
  const newBlog = await Blog.findByIdAndUpdate(id, body, { new: true })
  res.json(newBlog)
})

module.exports = blogRouter
