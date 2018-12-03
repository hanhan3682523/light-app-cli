/*
    作者：飘落的枫叶
    说明：配置webpack打包loader加载器
    日期：2018.6.1
*/
const path = require('path');
const extractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [{
    test: /\.vue$/,
    use: {
        loader: 'vue-loader'
    },
    //加快搜索速度
    exclude: path.resolve(__dirname, 'node_modules'),
}, {
    test: /\.ts$/,
    use: {
        loader: 'ts-loader'
    },
    //加快搜索速度
    exclude: path.resolve(__dirname, 'node_modules'),
}, {
    test: /\.js$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['env', 'react'],
            plugins: ['transform-runtime'],
            cacheDirectory: true
        }
    },
    exclude: /(node_modules|bower_components)/
}, {
    test: /\.css$/,
    use: extractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "postcss-loader"],
        // css中的基础路径
        publicPath: "../"
    })
}, {
    test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 8192, //设置转换成base64的大小
            name: '[name][hash:8].[ext]',
            outputPath: 'image/'
        }
    }],
    //只命中src目录中的文件，加快搜索速度
    include: path.resolve(__dirname, 'src')
}, {
    test: /\.(html)$/,
    use: {
        loader: 'html-loader'
    },
    //只命中src目录中的文件，加快搜索速度
    include: path.resolve(__dirname, 'src')
}, {
    test: /\.less$/,
    use: extractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "postcss-loader", "less-loader"],
        // css中的基础路径
        publicPath: "../"
    }),
    //只命中src目录中的文件，加快搜索速度
    include: path.resolve(__dirname, 'src')
}, {
    test: /\.(scss|sass)$/,
    // 分离的写法
    use: extractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "postcss-loader", "sass-loader"],
        // css中的基础路径
        publicPath: "../"
    }),
    //只命中src目录中的文件，加快搜索速度
    include: path.resolve(__dirname, 'src')
}];