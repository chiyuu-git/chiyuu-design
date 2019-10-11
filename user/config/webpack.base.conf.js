const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口起点
  entry: './src/index.js',
  // 输出
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname,'../node_modules/codemirror')
        ],
        use: ['style-loader','css-loader',],
      },
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader']
      },
      {
        test: /\.jsx?/, // 支持 js 和 jsx
        include: [
          path.resolve(__dirname, '../src'), // src 目录下的才需要经过 babel-loader 处理
        ],
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'public/index.html', // 配置文件模板，也就是入口
      inject: 'body',
    }),
  ],
}