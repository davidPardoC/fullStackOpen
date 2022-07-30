const config = require('./src/utils/config')
const logger = require('./src/utils/logger')
const app = require('./src/app')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
