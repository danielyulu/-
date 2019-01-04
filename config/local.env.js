'use strict'
const merge = require('webpack-merge')
const localEnv = require('./local.env')

module.exports = merge(localEnv, {
  NODE_ENV: '"localhost"'
})
