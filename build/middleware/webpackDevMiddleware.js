const webpackDevMiddleware = require('webpack-dev-middleware')
const options = require('../common/devOptions')
const compiler = require('../common/compiler')

module.exports = webpackDevMiddleware(compiler, options)
