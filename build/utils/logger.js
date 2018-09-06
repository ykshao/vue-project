const chalk = require('chalk')
const format = require('util').format

const prefix = `VUE 前端FE项目框架`
const sep = chalk.gray('>')

const banner = require('../../banner/index')

exports.frameInfo= function () {
  console.info(chalk.yellow(banner.logo()))
}

exports.info = function () {
  const msg = format.apply(format, arguments)
  console.info(chalk.white(prefix), sep, chalk.cyan(msg))
}

exports.success = function () {
  const msg = format.apply(format, arguments)
  console.log(chalk.white(prefix), sep, chalk.green(msg))
}

exports.warning = function () {
  const msg = format.apply(format, arguments)
  console.warn(chalk.white(prefix), sep, chalk.yellow(msg))
}

exports.error = function (message) {
  if (message instanceof Error) message = message.message.trim()
  var msg = format.apply(format, arguments)
  console.error(chalk.red(prefix), sep, chalk.red(msg))
}
