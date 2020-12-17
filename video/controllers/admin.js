"use strict";

const Movie = require('../models/movie');
const moment = require('moment');
const User = require('../models/user');
const utils = require('../utils/utils');
const Userlog = require('../models/userlog');
/**
 *展示管理员登录页面
 * @param req
 * @param res
 * @param next
 */
exports.showLogin = function (req, res, next) {
    res.render('admin/login',{ user: req.session.user});
}

/**
 *管理员登录
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.doLogin = function (req, res, next) {
    // 1. 获取用户输入的参数信息
    let uname = req.body.uname;
    let pwd = req.body.pwd;
    let vcode = req.body.vcode;
    let session_vcode = req.session.captcha;
    let login_time = moment().format('YYYY-MM-DD HH:mm:ss');
    if (!uname || !pwd || !vcode || !session_vcode) {
        return res.json({
            code : -1,
            msg : '请求解析失败'
        });
    }
    // 开始获取用户的默认IP信息
    let ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    // 开始获取用户的地址信息
    let address = '未知地址';
    if (session_vcode && vcode.toLowerCase() !== session_vcode.toLowerCase()) {
        return res.json({
            code: 1001,
            msg: '验证码输入错误'
        });
    }

    let ipInfo = utils.getIPInfo(ip);
    let area = ipInfo.Area && ipInfo.Area.indexOf('本机地址') !== -1 ? ipInfo.Area : '';
    address = `${ipInfo.Country}${area}`;

    // 2. 开始校验（防止用户端禁用js）， 查询比对的实际上是加密过后的数据信息
    // 开始进行数据加密(对用户的密码进行双重加密+加上自己的密匙)
    // pwd = utility.md5(pwd);
    // // 对密码进行再次加密
    // pwd = utility.md5(pwd + req.app.locals.config.secretKey);

    // 3. 开始具体的业务逻辑校验
    // 3.1 用户是否存在（根据用户名查询出来用户记录信息）
    User.getUserByName(uname, function (err, result) {
        // 如果结果不存在的话
        if (!result) {
            // 用户不存在
            return res.json({
                code: 0,
                msg: '该用户不存在'
            });
        }

        // 用户存在的话就开始校验密码是否正确
        if (pwd !== result.pwd) {
            return res.json({
                code: 0,
                msg: '密码错误'
            });
        }
        // 写入数据到session
        req.session.user = result;
        // 获取用户的ID信息
        let user_id = result.id;


        // console.log(login_time, ip, address, user_id);
        // 用户登录成功之后，开始吧用户的登录日志写入到数据库
        let userlog = new Userlog({
            login_time,
            ip,
            address,
            user_id
        });
        // console.log(address, userlog, result);
        // 3.2 密码是否正确,如果密码正确，就直接写入数据到session，跳转到首页
        userlog.save(function (err, result) {
            if (err) {
                return next(err);
            }
            //console.log('用户的登录日志文件已经成功写入到数据库！', result)
        })

        // 跳转到首页
        res.json({
            code: 1,
            msg: 'success'
        });

    });
}

/**
 * 进入网站后台管理页面
 * @param req
 * @param res
 * @param next
 */
exports.showAdmin = function (req, res, next) {
    if (req.session.user) {
        return res.render('admin/admin');
    }
    console.log('错误');
}


/**
 * 展示电影列表详细信息
 * @param req
 * @param res
 * @param next
 */
exports.showMovieList = function (req, res, next) {
    let pageNow = parseInt(req.params.currentPage) || 1;
    let pageSize = 12;
    let video=req.body.video
    // 获取用户搜索的电影名称
    let sMoviename = req.body.moviename;
switch (video) {
    case "tvs":
        if (sMoviename) {
            Movie.gettvsByName(sMoviename, function (err, result) {
                if (err) {
                    return next(err);
                }
                if (result.length === 0) {
                    return res.json({
                        code: 0,
                        msg: '未找到相关资源'
                    });
                }
                return res.json({
                    code: 1,
                    movies: result,
                    pageNum:1
                });
            })
        }else {
            // undefined 1  0
            //console.log(req.params.currentPage, pageNow, (pageNow - 1) * pageSize);
            let params = {
                start: (pageNow - 1) * pageSize,
                pageSize: pageSize
            }
            // 获取总页码
            Movie.gettvsPageNums(function (err, pageInfo) {
                if (err) {
                    return next(err);
                }

                // 开始正式获取电影列表
                Movie.gettvsByCurrentPage(params, function (err, result) {
                    if (err) {
                        return next(err);
                    }

                    if (result) {
                        // 在这里把时间修改为相对事件
                        result.forEach(function (element) {
                            element.addtime = moment(element.addtime).format('YYYY-MM-DD HH:mm:ss');
                        })
                    }

                    return res.json({
                        code:1,
                        movies: result,
                        pageNum: Math.ceil(pageInfo.pageNum / pageSize)
                    });


                })
            })
        }break;
    case "movies":
        if (sMoviename) {
            Movie.getMovieByName(sMoviename, function (err, result) {
                if (err) {
                    return next(err);
                }
                if (result.length === 0) {
                    return res.json({
                        code: 0,
                        msg: '未找到相关资源'
                    });
                }
                return res.json({
                    code: 1,
                    movies: result
                });
            })
        }else {
            // undefined 1  0
            //console.log(req.params.currentPage, pageNow, (pageNow - 1) * pageSize);
            let params = {
                start: (pageNow - 1) * pageSize,
                pageSize: pageSize
            }

            // 获取总页码
            Movie.getMoviePageNums(function (err, pageInfo) {
                if (err) {
                    return next(err);
                }

                // 开始正式获取电影列表
                Movie.getMoviesByCurrentPage(params, function (err, result) {
                    if (err) {
                        return next(err);
                    }

                    if (result) {
                        // 在这里把时间修改为相对事件
                        result.forEach(function (element) {
                            element.addtime = moment(element.addtime).format('YYYY-MM-DD HH:mm:ss');
                        })
                    }

                    return res.json({
                        code:1,
                        movies: result,
                        pageNum: Math.ceil(pageInfo.pageNum / pageSize)
                    });


                })
            })
        }break;
    case "cartoons":
        if (sMoviename) {
            Movie.getcartoonsByName(sMoviename, function (err, result) {
                if (err) {
                    return next(err);
                }
                if (result.length === 0) {
                    return res.json({
                        code: 0,
                        msg: '未找到相关资源'
                    });
                }
                return res.json({
                    code: 1,
                    movies: result
                });
            })
        }else {
            // undefined 1  0
            //console.log(req.params.currentPage, pageNow, (pageNow - 1) * pageSize);
            let params = {
                start: (pageNow - 1) * pageSize,
                pageSize: pageSize
            }

            // 获取总页码
            Movie.getcartoonsPageNums(function (err, pageInfo) {
                if (err) {
                    return next(err);
                }

                // 开始正式获取电影列表
                Movie.getcartoonsByCurrentPage(params, function (err, result) {
                    if (err) {
                        return next(err);
                    }

                    if (result) {
                        // 在这里把时间修改为相对事件
                        result.forEach(function (element) {
                            element.addtime = moment(element.addtime).format('YYYY-MM-DD HH:mm:ss');
                        })
                    }

                    return res.json({
                        code:1,
                        movies: result,
                        pageNum: Math.ceil(pageInfo.pageNum / pageSize)
                    });


                })
            })
        }break;
    case "varietys":
        if (sMoviename) {
            Movie.getvarietysByName(sMoviename, function (err, result) {
                if (err) {
                    return next(err);
                }
                if (result.length === 0) {
                    return res.json({
                        code: 0,
                        msg: '未找到相关资源'
                    });
                }
                return res.json({
                    code: 1,
                    movies: result
                });
            })
        }else {
            // undefined 1  0
            //console.log(req.params.currentPage, pageNow, (pageNow - 1) * pageSize);
            let params = {
                start: (pageNow - 1) * pageSize,
                pageSize: pageSize
            }

            // 获取总页码
            Movie.getvarietysPageNums(function (err, pageInfo) {
                if (err) {
                    return next(err);
                }

                // 开始正式获取电影列表
                Movie.getvarietysByCurrentPage(params, function (err, result) {
                    if (err) {
                        return next(err);
                    }

                    if (result) {
                        // 在这里把时间修改为相对事件
                        result.forEach(function (element) {
                            element.addtime = moment(element.addtime).format('YYYY-MM-DD HH:mm:ss');
                        })
                    }

                    return res.json({
                        code:1,
                        movies: result,
                        pageNum: Math.ceil(pageInfo.pageNum / pageSize)
                    });


                })
            })
        }break;

}

}



/**
 * 显示会员列表信息
 * @param req
 * @param res
 * @param next
 */
exports.showUserList = function (req, res, next) {
    let username = req.params.username;
    if (username) {
        User.getUserByName(username, function (err, result) {
            if (err) {
                return next(err);
            }
            if (result) {
                return res.json({
                    code : 1,
                    user : result
                })
            }

            res.json({
                code: 0,
                msg: 'error'
            })
        })
    } else {

        User.getAllUsers(function (err, result) {
            if (err) {
                return next(err);
            }
            if (result) {

                return res.json({
                    code: 1,
                    users : result
                })

            }else{
            res.json({
                code: 0,
                msg: 'error'
            })}
        })
    }
}
/**
 *展示用户日志
 * @param req
 * @param res
 * @param next
 */
exports.showUserlogs = function (req, res, next) {
    let id = req.session.user.id;
    // console.log(id);
    Userlog.getUserlogsById(id, function (err, result) {
        if (err) {
            return next(err);
        }
        // 转换日期格式信息
        if (result) {
            // 获取得到的结果数组，修改日期的格式信息
            result.forEach(function (element) {
                element.login_time = moment(element.login_time).format('YYYY-MM-DD HH:mm:ss');
            })

            res.json({
                code: 1,
                userlogs: result
            });
        }
    })
}

/**
 * 执行用户信息的修改
 * @param req
 * @param res
 * @param next
 */
exports.doUser = function (req, res, next) {
    let id = req.body.id;
    let email = req.body.email;
    let phone = req.body.phone;
    let info = req.body.info;

    var user = new User({
        id,
        email,
        phone,
        info
    });

    user.updateinfo(function (err, result) {
        if (err) {
            return next(err);
        }

        // console.log(result);

        // 修改成功， 就会重新渲染
        if (result && result.affectedRows > 0) {
            return res.json({
                code: 1,
                msg: 'success'
            })
        }


        res.json({
            code: 0,
            msg: 'failed'
        });
    });
}


/**
 * 执行删除操作
 * @param req
 * @param res
 * @param next
 */
exports.doDelete = function (req, res, next) {
    var id = req.body.id;

    if (id==1) {
        res.send("不能删除管理员！！！")
        return res.json({
            code: 0,
            msg: 'error'
        });
    }

    User.deleteUserById(id, function (err, result) {
        if (err) {
            return next(err);
        }

        if (result) {
           return  res.redirect('/admin/admin');
            // return res.json({
            //     code: 1,
            //     msg: 'success'
            // });
        }
        res.json({
            code: 0,
            msg: 'failed'
        });
    })
}


