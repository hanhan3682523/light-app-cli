// 导入路由
const http = require('http');
const express = require('express');
const server = express();
const data = require('./data');
server.use('/api', data);
//启动服务
http.createServer(server).listen(9001);
console.log(`Express server start, http://localhost:9001`);