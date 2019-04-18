const webpack = require('webpack')
const logger = require('./utils/logger')
const webpackConfig = require('./webpack/webpack.config.prod')

module.exports = function () {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      if (err.details) {
        return logger.error(err.details)
      }
      return logger.error(err.stack || err.message || err)
    }
    if (stats.hasErrors()) {
      const info = stats.toJson()
      return logger.error(info.errors)
    }
    logger.success('Done.')
  })
}
