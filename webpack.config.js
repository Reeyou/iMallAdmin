const path = require('path')
const webpack = require('webpack')
const OpnWebpackPlugin = require("opn-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const os = require('os') // 获取电脑有几个核心
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const SRC = path.join(__dirname, 'src')

module.exports = {
  mode: 'development',
  // devtool: 'source-map',
  //实现浏览器自动刷新需要添加
  entry: ['webpack-hot-middleware/client?noInfo=true&reload=true', "./src/index"],
  output: {
    path: path.resolve(__dirname, 'dist'), // 路径名
    filename: 'development' ? 'js/[name].js' : 'js/[name].[chunkhash:5].js', // 打包名称
    publicPath: '/',
  },
  resolve: {
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
        test: /\.less$/,
        loader: 'happypack/loader?id=styles',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
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
      // favicon: path.resolve('favicon.ico'),
      minify: {
          collapseWhitespace: true,
      }
    }),
    new HappyPack({
      id: 'js',
      loaders: ['babel-loader'], // loader配置
      threadPool: happyThreadPool, // 共享进程池
      verbose: true // 输出日志
    }),
    new HappyPack({
      id: 'styles',
      loaders: ['style-loader', 'css-loader', 'less-loader'],
      threads: 4,
      verbose: true
    }),
  ]
}