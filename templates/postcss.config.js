module.exports = {
    plugins: [
        require('precss'),
        require('autoprefixer'), //给样式添加浏览器前缀
        //px转换成rem
        require('postcss-px2rem')({
            remUnit: 50
        })
    ]
}