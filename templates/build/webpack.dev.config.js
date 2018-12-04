const config = require('../config/index')
const common = require('./webpack.base.conf');
const merge = require('webpack-merge');

module.exports = merge(common, {
    mode: 'development',
    //生成map文件，供调试
    devtool: 'eval-source-map',
    //监听文件更新，在文件发生变化时重新编译,使用 DevServer 时，监听模式默认是开启的。
    watch: true,
    //控制监听模式
    watchOptions: {
        // 不监听的文件或文件夹，支持正则匹配
        ignored: /node_modules/,
        // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高，默认为 300ms 
        aggregateTimeout: 300,
        // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的,默认每秒轮询1000次
        poll: 1000
    },
    //http服务设置
    devServer: {
        //代理
        proxy: {
            '/api': 'http://127.0.0.1:9001',
            changeOrigin: true
        },
        //运行目录
        contentBase: './',
        //一切服务都启用gzip 压缩：
        compress: true,
        //端口号
        port: config.dev.port || '8080',
        //自动打开浏览器
        open: true,
        //模块热替换
        hot: true,
        //页面自动刷新
        inline: true,
        //打开的页面
        openPage: '',
        //host:'0.0.0.0'--别人可以访问
        host: config.dev.host || 'hxj.com',
        //支持https
        // https: true
    }
});