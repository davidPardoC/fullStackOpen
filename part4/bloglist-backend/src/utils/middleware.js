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

module.exports = { errorHandler, tokenExtractor }
