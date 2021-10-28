'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'project main' // page title

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    outputDir: 'dist',
    devServer: {
        port: 8001,
        open: true,
        overlay: {
          warnings: false,
          errors: true
        },
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000', // 要访问的后端接口
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config) {
        config
            // https://webpack.js.org/configuration/devtool/#development
            // 通常建议开发时保持 eval 配置，以增加构建速度，当出现需要源码调试排查问题时改为 source-map
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('source-map')
            )
    }
}