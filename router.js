"use strict";

const express = require('express');
const app = express();
const router = express.Router();
const config = require('./config');
const fs = require('fs');
const fe=require('./utils/fetch')
const adminController = require('./controllers/admin');
const indexController = require('./controllers/index');
const userController = require('./controllers/user');
const playController = require('./controllers/play');
const commentController = require('./controllers/comment');
const movieController = require('./controllers/movie');
const colmovieController = require('./controllers/moviecol');


// 前台路由控制中心
router.get('/', [indexController.showIndex]);                             // 用户首页信息的展示
router.post('/index/:currentPage', indexController.showIndex);
// 之前在用户注册/登录之前进行检查
router.get('/register', [checkLogin, userController.showRegister]);
router.post('/register', userController.doRegister);                    // 用户注册页面提交
router.get('/login', [checkLogin, userController.showLogin]);           // 用户登录页面
router.post('/login', userController.doLogin);                          // 用户登录
router.get('/logout', userController.doLogout);                         // 用户退出
router.get('/user', [checkNotLogin, userController.showUser]);                           // 显示用户中心
router.post('/user', [checkNotLogin, userController.doUser]);                            // 用户修改信息之后提交数据
router.post('/user/upload', [checkNotLogin, userController.uploadImage]);  // 图片上传

//管理员界面路由路径
router.get('/admin', [adminController.showLogin]);
router.post('/admin', [adminController.doLogin]);
router.post('/admin/getvideo', fe.start);
router.get('/admin/admin', adminController.showAdmin);
router.post('/admin/admin', [adminController.doUser]);
router.get('/admin/userlist', [adminController.showUserList]);
router.post('/admin/userlist', [adminController.doDelete]);
router.get('/admin/movielist/:currentPage', [adminController.showMovieList]);
router.post('/admin/movielist/:currentPage', [adminController.showMovieList]);
router.post('/admin/delet',movieController.deletemovie);
router.post('/admin/comment',commentController.deletecomment);

router.get('/play', playController.showPlay);                           // 电影播放
router.post('/play', playController.doPlay);                            // 播放页面的用户评论
router.get('/play/:url', playController.showPlay);                      // 显示评论
router.get('/play/current/:index', playController.showPlay);             // 实现上一集下一个的效果（随机效果）
router.post('/play/colmovie/:tag', colmovieController.doColMovie);
router.get('/captcha', userController.getCaptcha);                      // 获取验证码
router.get('/comment/:currentPage', commentController.showComment);                 // 用户中心显示评论
router.post('/colmovie/:currentPage', colmovieController.showUserColMovie);                 // 用户中心显示收藏
router.post('/userlog', userController.showUserlogs);                   // 用户中心显示日志
router.get('/search', movieController.showSearchMovie);
router.get('/search/:content', movieController.doSearchMovieOnline);
router.post('/search', movieController.doSearchMovie);
router.post('/hot', movieController.getTodayHotMovies);

// 404 page
router.use(function (req, res, next) {
    return res.render('404');
});

if (config.isDebug) {
    //console.log('is debug')
    app.use(function (err, req, res, next) {
        //console.log(err);
    });
} else {
    app.use(function (err, req, res, next) {
        // error
    })
}


function checkLogin(req, res, next) {
    // 如果用户登录成功的话(已经登录的用户就不能访问注册页面了，直接跳转到用户首页)
    if (req.session.user) {
        // 直接跳转到首页去
        return res.render('index');
    }
    // 如果用户没有登陆的话就继续向下执行， next（）之后就会执行下一个中间件
    next();
}

function checkadminLogin(req, res, next) {
    // 如果用户登录成功的话(已经登录的用户就不能访问注册页面了，直接跳转到用户首页)
    if (req.session.user) {
        // 直接跳转到首页去
        return res.render('admin/admin');
    }
    // 如果用户没有登陆的话就继续向下执行， next（）之后就会执行下一个中间件
    next();
}
function checkNotLogin(req, res, next) {
    // 如果没有登录就直接跳转到首页
    if (!req.session.user) {
        return res.redirect('/');
    }
    // 就执行下一个中间件
    next();
}




module.exports = router;