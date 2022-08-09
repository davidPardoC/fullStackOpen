const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const { errorHandler, tokenExtractor } = require('./utils/middleware')
const testRouter = require('./controllers/test')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testRouter)
}

app.use(errorHandler)

module.exports = app
