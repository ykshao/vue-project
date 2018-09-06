const fs = require('fs')
const http = require('http')
const https = require('https')
const { resolve } = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const httpProxyMiddleware = require('http-proxy-middleware')
const connectMockMiddleware = require('connect-mock-middleware')
const history = require('connect-history-api-fallback')
const logger = require('./utils/logger')
const host = require('./utils/host')
const { nearRoot } = require('./utils/abs')
const config = require('./config')
const webpackDevMiddleware = require('./middleware/webpackDevMiddleware')
const webpackHotMiddleware = require('./middleware/webpackHotMiddleware')

let server
const empty = Object.create(null)
const app = express()

const resolveDir = function (dir, pathName) {
  return resolve(dir, pathName)
}.bind(empty, __dirname)

if (config.onOff.mock) {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(connectMockMiddleware(nearRoot('mock'), {
    prefix: config.mock.context,
    callback: config.mock.allback
  }))
}

if (config.onOff.proxy) {
  const {context, options} = config.proxy
  app.use(context, httpProxyMiddleware(options))
}

app.use(history())

if (config.onOff.static) {
  const {dirname, virtualPath} = config.static
  app.use(virtualPath, express.static(nearRoot(dirname)))
}

app.use(webpackDevMiddleware)
app.use(webpackHotMiddleware)

if (config.server.https) {
  const options = {
    key: fs.readFileSync(resolveDir('ssl/key.pem')),
    // ca: fs.readFileSync(resolveDir('ssl/csr.pem')),
    cert: fs.readFileSync(resolveDir('ssl/cert.pem'))
  }
  server = https.createServer(options, app)
} else {
  server = http.createServer(app)
}

async function start (wpkCfg) {
  logger.frameInfo();

  const devPort = await config.computed.getDevPort()
  server.listen(devPort, '0.0.0.0', () => {
    logger.info('Server start on: ')
    host.forEach(h => {
      logger.success(`${config.server.https ? 'https' : 'http'}://${h}:${devPort}`)
    })
  })
}

module.exports = function () {
  start().catch(err => {
    logger.error(err.message || err)
  })
}
