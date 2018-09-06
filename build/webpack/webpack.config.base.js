const { src, nearRoot } = require('../utils/abs')
const use = require('../common/use')
// const { env } = require('../config')

/*
let filename

if (env.isProd) {
  filename = 'js/[name].js'
} else {
  filename = 'js/[name].[hash:7].js'
}
*/

module.exports = {
  output: {
    path: nearRoot('dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash:7].js',
    publicPath: ''
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: use('')
    }, {
      test: /\.less$/,
      use: use('less')
    }, {
      test: /\.styl$/,
      use: use('stylus')
    }, {
      test: /\.js?$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          css: use('', true),
          less: use('less', true),
          stylus: use('stylus', true)
        },
        transformToRequire: {
          audio: 'src',
          video: 'src',
          source: 'src'
        }
      }
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[hash:7].[ext]'
        }
      }]
    }, {
      test: /\.(eot|ttf|woff|woff2?)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'font/[name].[hash:7].[ext]'
        }
      }]
    }, {
      test: /\.(mp3|mp4|ogg|wav)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'av/[name].[hash:7].[ext]'
        }
      }]
    }]
  },
  resolve: {
    extensions: ['.vue', '.js', '.json', '.styl', '.less', '.css'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': src
    }
  },
  performance: {
    hints: false
  }
}
