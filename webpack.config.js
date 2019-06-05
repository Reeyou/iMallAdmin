const path = require('path')
const webpack = require('webpack')
const OpnWebpackPlugin = require("opn-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const os = require('os') // 获取电脑有几个核心
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

const SRC = path.join(__dirname, 'src')

module.exports = {
  mode: 'development',
  // devtool: 'source-map',
  //实现浏览器自动刷新需要添加
  entry: ['webpack-hot-middleware/client?noInfo=true&reload=true', SRC],
  output: {
    path: path.resolve(__dirname, 'dist'), // 路径名
    filename: 'development' ? 'js/[name].js' : 'js/[name].[chunkhash:5].js', // 打包名称
    publicPath: '/',
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    alias: {
      '@': SRC
    },
    extensions: ['.js', '.json', '.less'] // index依次从.js .json .less文件默认加载
  },
  module: {
    rules: [
      {
        test: /(\.js|\jsx)$/,
        loader: 'happypack/loader?id=js',
        exclude: /node_modules/
      },
      {
        test: /\.(eot|\woff|ttf|woff2)$/,
        loader: 'file-loader',
      },
      {
        test: /(\.less|\.css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              //解决antd less文件使用js 错误
              javascriptEnabled: true,
              sourceMap: true
            }
          }
        ] 
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
    ]
  },
  plugins: [
    // 实现浏览器刷新需要添加
    new webpack.HotModuleReplacementPlugin(),
    //自动打开浏览器
    new OpnWebpackPlugin({
      target: "http://localhost:8090"
    }),
    // 编译html文件
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
      inject: true,
      chunksSortMode: "none",
      favicon: path.resolve('favicon.ico'),
      minify: {
          collapseWhitespace: true,
      }
    }),
    //多线程打包
    new HappyPack({
      id: 'js',
      loaders: ['babel-loader'], // loader配置
      threadPool: happyThreadPool, // 共享进程池
      verbose: true // 输出日志
    }),
    //编译进度条
    new ProgressBarWebpackPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    })
  ]
}