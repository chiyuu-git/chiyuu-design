const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')

module.exports = merge.smart(baseConfig, {
  module: {
    rules: [
    ],
  }
})