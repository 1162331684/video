"use strict";

const path = require('path');

module.exports = {
    isDebug : false,                                                       
    secretKey : 'video',
    pageSize : 5,                                                           // 每页显示内容数量
    uploadDir : path.join(__dirname, 'www', 'uploads'),                    
    avatarDir : path.join(__dirname, 'www', 'uploads', 'avatar'),           // 用户的图像目录
    movieDir : path.join(__dirname, 'www', 'uploads', 'movie'),
    tvDir : path.join(__dirname, 'www', 'uploads', 'tv'),
    movieurl : 'http://vip.iqiyi.com/hot.html?cid=1',                       // 电影地址，
    // parseUrl : 'http://jx.598110.com/v/x1.php?url='
    // http://jx.598110.com/?url=
    // http://vip.jlsprh.com/?url=
    // http://jx.du2.cc/?url=
    // https://jiexi.bm6ig.cn/?url=
    // http://jsap.attakids.com/?url=
    // http://jqaaa.com/jx.php?url=
    // parseUrl : 'http://www.administrator5.com/admin.php?url='
     parseUrl :'https://jiexi.bm6ig.cn/?url=',
    movielist : [] ,
    tvlist : [],
    userlist : 0,
    host : 'localhost',
    port: 80,
    database : 'video',
    user : 'root',
    password : 'root'
}