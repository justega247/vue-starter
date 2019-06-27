const base = require('./webpack.base.config')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = Object.assign({}, base, {
  plugins: (base.plugins || []).concat([
    new webpack.optimize.CommonsChunkPlugin({ // added for production optimization
      name: 'vendor',
      filename: 'assets/js/[name].js'
    })
  ])
})

config.module.rules.filter(x => { return x.loader === 'vue-loader' })
  .forEach(x => x.options.extractCSS = true) // eslint-disable-line

config.plugins.push(
  new ExtractTextPlugin('assets/styles.css')
)

// production related
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}

module.exports = config
