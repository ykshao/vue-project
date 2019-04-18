const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const { project } = require('./build/config')
const plugins = [ autoprefixer ]

if (project.type === 'wap') {
  plugins.push(pxtorem(project.pxtorem))
}

module.exports = { plugins }
