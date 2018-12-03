let fs = require('fs');
let path = require('path');

//服务器模板路径
let _src = path.join(__dirname, 'templates');

//文件夹列表，用于后续创建
let folderList = [];
//文件列表，用于复制
let fileList = [];

/*
    同步读取文件夹下所有的子目录及文件
*/
function readdirSync(filePath) {
    let files = fs.readdirSync(filePath);
    files.forEach(function(filename) {
        let filedir = path.join(filePath, filename);
        //获取文件信息对象Stats，包括文件大小，gid等信息
        let stats = fs.statSync(filedir);
        //是文件
        let isFile = stats.isFile();
        //是文件夹
        let isDir = stats.isDirectory();
        if (isFile) {
            fileList.push(filedir);
        }
        if (isDir) {
            folderList.push(filedir);
            readdirSync(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
        }
    });
}


/*
    创建单个文件夹，返回promise
*/
let mkdir = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(filePath, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/*
    创建多个文件夹
*/
function mkdirList(PATH) {
    let _tempMkdir = [];
    for (let i = 0; i < folderList.length; i++) {
        let _tempsrc = folderList[i].replace(_src, '');
        _tempsrc = PATH + _tempsrc.replace(/\\/g, '/');
        _tempMkdir.push(_tempsrc);
    }
    return Promise.all([_tempMkdir.map(item => { mkdir(item) })]);
}

/*
    创建单个文件
*/
function createFile(fileinfo) {
    return new Promise((resolve, reject) => {
        //读取服务器文件内容
        fs.readFile(fileinfo.server, 'utf-8', (err, data) => {
            // 读取文件失败/错误
            if (err) {
                reject(err);
            } else {
                //写入到本地
                fs.writeFile(fileinfo.local, data, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                })
            }
        });
    });
}

/*
    创建多个文件
*/
function writeFileList(PATH) {
    //本地文件路径
    let _localFile = [];
    for (let i = 0; i < fileList.length; i++) {
        let _tempsrc = fileList[i].replace(_src, '');
        _tempsrc = PATH + _tempsrc.replace(/\\/g, '/');
        _localFile.push({
            server: fileList[i], //服务器路径
            local: _tempsrc //本地路径
        });
    }
    return Promise.all([_localFile.map(item => { createFile(item) })]);
}


/*
    初始化入口
    folderName:项目目录名称，如果用户不输入，默认light-app-cli
*/
let downloadTemplate = async function(folderName) {
    if (!folderName) {
        folderName = 'light-app-cli'
    }
    let PATH = './' + folderName;
    //遍历服务器上的文件夹、文件
    readdirSync(_src);
    try {
        //1、创建根目录
        await mkdir(PATH);
        //2、本地创建文件夹
        await mkdirList(PATH);
        //3、创建文件
        await writeFileList(PATH);
        console.log('脚手架创建完成，开始coding吧');
        console.log('*******************************************');
        console.log('*******************************************');
        console.log('作者：飘落的枫叶，如使用中有任何问题，请反馈到250975141@qq.com');
    } catch (e) {
        console.info('文件夹已存在');
    }
};

module.exports = {
    downloadTemplate
}