const os = require('os')

const ifaces = os.networkInterfaces()
let host = ['127.0.0.1']

Object.keys(ifaces).some(dev => {
  return ifaces[dev].some(details => {
    if (details.family === 'IPv4' && !details.internal) {
      host.push(details.address)
    }
  })
})

module.exports = host
