'use strict'
const path = require('path')

module.exports = {
    //本地开发调试配置
    dev: {
        //本地访问域名
        host: '127.0.0.1',
        //访问端口
        port: '8080',
        //文件引入前缀，可以改成cdn资源路径
        assetsPublicPath: '/'
    },
    //打包配置
    build: {
        //打包存放的目录
        assetsRoot: path.resolve(__dirname, '../dist'),
        //文件引入前缀，可以改成cdn资源路径
        assetsPublicPath: './',
        //打包后的zip文件名称，为空的时候不打zip
        zipName: 'myzip'
    }
}