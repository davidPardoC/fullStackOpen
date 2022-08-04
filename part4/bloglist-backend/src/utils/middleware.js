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
  }
  logger.error(error.message)
  next(error)
}

module.exports = { errorHandler }
