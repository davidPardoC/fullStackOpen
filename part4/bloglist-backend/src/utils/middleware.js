const jwt = require('jsonwebtoken')
const logger = require('./logger')
const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message,
    })
  } else if (error.code === 11000) {
    return response.status(429).json({
      error: error.message,
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  }
  logger.error(error.message)
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization) {
    req.token = authorization.split(' ')[1].replace(/'/g, '') || null
  }
  next()
}

const userExtractor = (req, res, next) => {
  req.user = jwt.verify(req.token, process.env.TOKEN_SECRET)
  next()
}

module.exports = { errorHandler, tokenExtractor, userExtractor }
