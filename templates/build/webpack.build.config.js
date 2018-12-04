const common = require('./webpack.base.conf');
const merge = require('webpack-merge');

module.exports = merge(common, {
    mode: 'production',
    //生成map文件，供调试
    devtool: 'source-map',
});