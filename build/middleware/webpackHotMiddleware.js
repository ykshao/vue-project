const webpackHotMiddleware = require('webpack-hot-middleware')
const compiler = require('../common/compiler')

module.exports = webpackHotMiddleware(compiler)
