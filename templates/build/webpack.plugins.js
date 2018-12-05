/*
    作者：飘落的枫叶
    说明：配置webpack打包插件
    日期：2018.5.8
*/
//配置文件
const config = require('../config/index')
    //路徑
const path = require('path');
// html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清除目录等
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 分离css
const extractTextPlugin = require("extract-text-webpack-plugin");
//静态资源输出
const copyWebpackPlugin = require("copy-webpack-plugin");
//css压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//vue插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//打包文件
const FileManagerPlugin = require('filemanager-webpack-plugin');


//读取文件
var glob = require('globby');
//webpack
const webpack = require('webpack');

var pluginsConfig = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // 调用之前先清除
    new CleanWebpackPlugin(['dist', 'zip'], {
        root: path.resolve(__dirname, "..")
    }),
    //vue插件
    new VueLoaderPlugin(),
    //静态资源输出
    new copyWebpackPlugin([{
        from: path.resolve(__dirname, "../src/assets"),
        to: './assets'
    }]),
    // 分离css插件参数为提取出去的路径
    new extractTextPlugin({
        filename: 'style/[name][hash].css',
    }),
    //css进行压缩
    new OptimizeCssAssetsPlugin({
        //assetNameRegExp: /\.style\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            discardComments: {
                removeAll: true
            }
        },
        canPrint: true
    })
];

(function() {
    const fileList = glob.sync(['./src/*.html']);
    if (fileList && fileList.length > 0) {
        for (var i = 0; i < fileList.length; i++) {
            pluginsConfig.push(
                new HtmlWebpackPlugin({
                    template: fileList[i],
                    filename: fileList[i].match(/([^\/]+)(?=\.)/ig)[0] + '.html',
                    chunks: [fileList[i].match(/([^\/]+)(?=\.)/ig)[0]],
                    hash: false, //引入的文件设置hash值
                })
            );
        }
    }
})();

//自动压缩dist 到zip文件
//环境判断
if (process.env && process.env.NODE_ENV && process.env.NODE_ENV.trim() === "production" && config.build.zipName) {
    // 调用之前先清除
    pluginsConfig.push(new CleanWebpackPlugin(['zip']));
    let _zipfilename = config.build.zipName;
    pluginsConfig.push(new FileManagerPlugin({
        onEnd: {
            //c
            mkdir: ['./zip', './tempzip/' + _zipfilename],
            copy: [{
                source: './dist',
                destination: './tempzip/' + _zipfilename
            }, ],
            archive: [{
                source: './tempzip/',
                destination: './zip/' + _zipfilename + '.zip'
            }],
            delete: [
                './tempzip/'
            ]
        }
    }));
}

module.exports = pluginsConfig;
