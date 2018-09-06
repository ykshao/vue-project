const { nearRoot } = require('../utils/abs')
const webpackConfig = require('../webpack/webpack.config.dev')

module.exports = {
  publicPath: webpackConfig.publicPath,
  contentBase: nearRoot('dist'),
  noInfo: true,
  historyApiFallback: true,
  stats: {
    colors: true
  },
  lazy: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  }
}
