const express = require('express')
const app = express()
const webpack = require('webpack')
const webpackDevMiddware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../webpack.config.js')
const compiler = webpack(webpackConfig)
const compression = require('compression')

const port = 8090

// webpack编译
app.use(webpackDevMiddware(compiler, {
  lazy: false,
  inline: true,
  stats: "errors-only"//控制台仅显示错误
}))

// 热更新实现浏览器刷新
app.use(webpackHotMiddleware(compiler, {
  log: false,
  heartbeat: 2000,
}))

// 开启Gzip
app.use(compression())

module.exports = {
  app,
  port
}
