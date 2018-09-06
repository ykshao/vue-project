const fs = require('fs')
const yaml = require('js-yaml')
const portfinder = require('portfinder')
const { nearRoot } = require('./utils/abs')

let doc
const { assign, create } = Object
const cache = create(null)
const isProd = process.env.NODE_ENV === 'production'

portfinder.basePort = 3721

try {
  doc = yaml.safeLoad(fs.readFileSync(nearRoot('snail.yml'), 'utf8'))
} catch (err) {
  throw err
}

function getPort (basePort) {
  return portfinder.getPortPromise()
}

async function getDevPort () {
  if (doc.server.port) return Promise.resolve(doc.server.port)
  if (cache.devPort) return Promise.resolve(cache.devPort)

  const devPort = await getPort()
  cache.devPort = devPort
  return devPort
}

async function getMockPort () {
  if (cache.mockPort) return Promise.resolve(cache.mockPort)
  const mockPort = await getPort()
  cache.mockPort = mockPort
  return mockPort
}

const computed = {
  getDevPort,
  getMockPort
}

const env = assign({}, doc.environment[process.env.NODE_ENV], { isProd })
delete doc.environment

module.exports = assign(
  {},
  doc,
  { computed },
  { env }
)
