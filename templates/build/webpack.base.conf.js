const path = require('path');
const config = require('../config/index')
    //插件
const pluginsConfig = require('./webpack.plugins');
//loader
const rulesConfig = require('./webpack.rules');
//读取文件
var glob = require('globby');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

var entryConfig = (function() {
    var _config = {};
    //选择js目录下的文件，不包含common中的js作为入口
    const fileList = glob.sync(['./src/js/*.*']);
    console.info('tag', fileList);
    if (fileList && fileList.length > 0) {
        for (var i = 0; i < fileList.length; i++) {
            _config[fileList[i].match(/([^\/]+)(?=\.)/ig)[0]] = fileList[i];
        }
    }
    return _config;
})();
console.log(entryConfig);

module.exports = {
    //基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
    context: path.resolve(__dirname, "../"),
    //入口
    entry: entryConfig,
    //出口
    output: {
        filename: 'js/[name][hash].js',
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath :
            config.dev.assetsPublicPath
    },
    //配置 Webpack 如何寻找模块所对应的文件
    resolve: {
        //通过别名来把原导入路径映射成一个新的导入路径
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        },
        //当在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在,默认 js、json
        extensions: ['.ts', '.js', '.vue', '.json']
    },
    //loader
    module: {
        rules: rulesConfig
    },
    //插件
    plugins: pluginsConfig
};
