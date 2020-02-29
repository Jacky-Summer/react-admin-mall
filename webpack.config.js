const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/app.js'
  },
  resolve: {
    // 设置别名
    alias: {
      'page': path.resolve(__dirname, 'src/page'),// 这样配置后page可以指向 src/page 目录,
      'component': path.resolve(__dirname, 'src/page/component')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader", // 将 JS 字符串生成为 style 节点
            "css-loader", // 将 CSS 转化成 CommonJS 模块
            "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './favicon.ico'
    }),
    new ExtractTextPlugin("css/[name].css"),
    new webpack.optimize.SplitChunksPlugin({
      chunks: "all", // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all
      minSize: 20000, // 引用模块大小最小为20kb
      minChunks: 1, // 引用次数最少为1次
      maxAsyncRequests: 5, // 按需加载最大请求次数为5
      maxInitialRequests: 3, // 初始化加载最大请求次数为3
      name: true // name表示代码的名字，设置为true则表示根据模块和缓存组秘钥自动生成
    })
  ],
  devServer: {
    historyApiFallback: {
      index: '/dist/index.html' // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。
    }
  }
};