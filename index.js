#! node

//顶部"#! node"很重要，表示node来执行这个文件

let { downloadTemplate } = require('./readfile')
    //创建用户输入的目录名称，如果没有输入则默认light-app
let _userdir = '';
if (process.argv.slice(2)[0]) {
    _userdir = process.argv.slice(2)[0];
}
console.log('脚手架开始创建.....');
//下载模板
downloadTemplate(_userdir);