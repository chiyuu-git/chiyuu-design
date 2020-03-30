'use strict'
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf'); // 引入公用的config

const path = require('path');
const webpack = require('webpack');

module.exports = merge.smart(baseWebpackConfig, {
  // 模式
  mode: "development",
  // 调试工具
  devtool: 'inline-source-map',
  // 开发服务器
  devServer: {
    contentBase: false,// 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
    historyApiFallback: true,// 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    open:true,// 自动打开浏览器
    compress: true,// 启用gzip压缩
    inline: true,// 设置为true，当源文件改变时会自动刷新页面
    hot: true,// 模块热更新，取决于HotModuleReplacementPlugin
    host: '127.0.0.1',// 设置默认监听域名，如果省略，默认为“localhost”
    port: 8888,// 设置默认监听端口，如果省略，默认为“8080”
    contentBase: './dist',
    proxy: {
      '/api': {
        target: 'http://localhost:6503',
        pathRewrite: {'^/api' : ''},
        changeOrigin:true,
      }
    }
  },
  // 插件
  plugins: [
    new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件
  ],
  optimization: {
    nodeEnv: 'development',
  },
  // 代码模块路径解析的配置
  resolve: {
    // 自动添加模块后缀名
    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
    // 快捷访问
    alias: {
      assets: path.resolve(__dirname, '../src/assets'),
      api: path.resolve(__dirname, '../src/api'),
    }
  },
})