const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { env } = require('../config')

const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    sourceMap: env.sourceMap,
    minimize: env.isProd
  }
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: env.sourceMap
  }
}

module.exports = function (loader, isVue) {
  const loaders = [cssLoader, postcssLoader]

  if (loader) {
    loaders.push({
      loader: `${loader}-loader`,
      options: {
        sourceMap: env.sourceMap
      }
    })
  }

  const options = {
    fallback: 'style-loader',
    use: loaders,
    publicPath: '../'
  }

  if (isVue) {
    options.fallback = 'vue-style-loader'
  }

  return ExtractTextPlugin.extract(options)
}
