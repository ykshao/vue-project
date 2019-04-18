const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const empty = require('is-empty')
const { nearRoot, nearSrc } = require('../utils/abs')
const { env, project } = require('../config')
const win = require(nearRoot('mock/window'))

module.exports = [
  new HtmlWebpackPlugin({
    path: nearRoot('dist'),
    filename: 'index.html',
    template: nearSrc('template/index.ejs'),
    favicon: nearSrc('images/favicon.ico'),
    title: 'begin-vue',
    window: empty(win) ? null : win,
    inject: false,
    minify: {
      removeComments: env.isProd
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module) {
      return module.context && module.context.indexOf('node_modules') !== -1
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  }),
  new webpack.ProvidePlugin({
  }),
  new ExtractTextPlugin({
    filename: 'css/style.css',
    disable: !env.isProd,
    allChunks: true
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    },
    '__isWap': project.type === 'wap'
  }),
  new webpack.optimize.ModuleConcatenationPlugin()
]
