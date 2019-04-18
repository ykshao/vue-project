const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { nearRoot, nearSrc } = require('../utils/abs')
const commonPlugin = require('../common/plugin')
const webpackBaseConfig = require('./webpack.config.base')
const { env } = require('../config')

module.exports = merge(webpackBaseConfig, {
  entry: ['babel-polyfill', nearRoot('build/common/publicPath'), nearSrc('main.js')],
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: env.sourceMap,
      compress: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([{
      context: 'assets',
      from: '**/*',
      toType: 'dir'
    }], {
      ignore: [
        'demo.jpg'
      ]
    }),
    new webpack.ProgressPlugin()
  ].concat(commonPlugin),
  devtool: env.sourceMap ? 'source-map' : 'none'
})
