const FetchUtil = require('../data/index');
const Movie = require('../models/movie');
const db = require('../models/db');
const TV = require('../models/tv');
const cartoons = require('../models/cartoon');
const varietys = require('../models/variety');

// 开始抓取数据
exports.start = function (req,res,next) {
    var video=req.body.id
    console.log('开始本轮数据抓取');
    switch (video) {
        case 'movies':
            new FetchMovies(video, function (error, result) {
                if (error) return next(error);
                return res.json({
                    code: 1,
                    mes: result
                });
            });
            break;
        case 'tvs':
            new Fetchtvs(video ,function (error, result) {
                if (error) return next(error);
                return res.json({
                    code: 1,
                    mes: result
                });
            });
            break;
        case 'cartoons':
            new FetchCartoons(video ,function (error, result) {
                if (error) return next(error);

                return res.json({
                    code: 1,
                    mes: result
                });
            });
            break;
        case 'varietys':
            new FetchVarietys(video ,function (error, result) {
                if (error) return next(error);

                return res.json({
                    code: 1,
                    mes: result
                });
            });
            break;
    }

}


/**
 * 抓取电影数据
 * @constructor
 */
function FetchMovies(video,callback) {
    // 调用数据抓取工具
    console.log('开始抓取电影信息')
    FetchUtil.getMoviesOnline(function (err, movies) {
        if (err) return callback(err, null);
        // 保存电影信息到数据库，添加数据之前先删除之前的数据，每次保持数据为最新状态
        db.query('delete from movies',function (err) {
            if (err) return console.log(err);
            let len = 0;
            movies.forEach( movie =>{
                let m = new Movie({
                    title : movie.title,
                    url : movie.url,
                    info : movie.info,
                    logo : movie.logo,
                    score : movie.score,
                    playnum : 0,
                    commentnum : 0,
                    release_time : new Date(),
                    type:movie.type
                })
                len++;
                m.save(function (err) {
                    if (err) console.log(err);
                })
                if (len === movies.length){
                    console.log('本轮抓取全部电影信息成功');
                    // 开始下载图片到本地/抓取其他数据
                    // callback(null, true);
                    FetchUtil.downloadImages(video,function (err,result) {
                        if (err) return console.log(err);
                        console.log('电影信息全部入库成功，本轮抓取结束');
                        // 添加成功之后（开始把数据信息保存到文件中去）
                        callback(null, result);
                    })
                }
            })
        })
    });
}

function Fetchtvs(video,callback) {
    console.log('开始抓取电视剧信息')
    FetchUtil.getTVsOnline(function (err, result) {
        if (err) {
            return console.log(err);
        }
        // 开始插入数据到数据库, 插入到数据库之前，先删除之前的数据信息
        db.query("delete from tvs", function (err) {
            if (err) return console.log(err);
            let index = 0;
            if (result.length > 0) {
                result.forEach(function (element) {
                    let title = element.title;
                    let info = element.info;
                    let url = element.url;
                    let type = element.type;
                    let logo = element.logo;
                    let score = 0
                    let release_time = new Date();
                    let tv = new TV({
                        title,
                        info,
                        url,
                        type,
                        logo,
                        score,
                        release_time,
                        playnum : 0,
                        commentnum : 0,
                    });
                    tv.save(function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        index++;
                        if (index ===result.length ) {
                            console.log('电视剧入库成功');
                            // callback(null, index);
                            FetchUtil.downloadImages(video,function (err,result) {
                                if (err) return console.log(err);
                                console.log('电视剧信息全部下载成功，本轮抓取结束');
                                // 添加成功之后（开始把数据信息保存到文件中去）
                                callback(null, result);
                            })
                        }
                    });
                })
            }
        })
    })
}

function FetchCartoons(video,callback) {
    // 调用数据抓取工具
    console.log('开始抓取动漫信息')
    FetchUtil.getCartoonsOnline(function (err, result) {
        if (err) {
            return console.log(err);
        }
        // 开始插入数据到数据库, 插入到数据库之前，先删除之前的数据信息
        db.query("delete from cartoons", function (err) {
            if (err) return console.log(err);
            let index = 0;
            if (result.length > 0) {
                result.forEach(function (element) {
                    let title = element.title;
                    let info = element.info;
                    let url = element.url;
                    let type = element.type;
                    let logo = element.logo;
                    let score = 0
                    let release_time = new Date();
                    let tv = new cartoons({
                        title,
                        info,
                        url,
                        type,
                        logo,
                        score,
                        release_time,
                        playnum : 0,
                        commentnum : 0,
                    });
                    tv.save(function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        index++;
                        if (index ===result.length ) {
                            console.log('本轮抓取全部动漫信息成功');
                            // callback(null, true);

                            FetchUtil.downloadImages(video,function (err,result) {
                                if (err) return console.log(err);
                                console.log('动漫信息全部入库成功，本轮抓取结束');
                                // 添加成功之后（开始把数据信息保存到文件中去）
                                callback(null, true);

                            })
                        }
                    });
                })
            }
        })
    })
}

function FetchVarietys(video,callback) {
    // 调用数据抓取工具
    console.log('开始抓取综艺信息')
    FetchUtil.getVarietysOnline(function (err, result) {
        if (err) {
            return console.log(err);
        }
        // 开始插入数据到数据库, 插入到数据库之前，先删除之前的数据信息
        db.query("delete from varietys", function (err) {
            if (err) return console.log(err);
            let index = 0;
            if (result.length > 0) {
                result.forEach(function (element) {
                    let title = element.title;
                    let info = element.info;
                    let url = element.url;
                    let type = element.type;
                    let logo = element.logo;
                    let score = 0
                    let release_time = new Date();
                    let tv = new varietys({
                        title,
                        info,
                        url,
                        type,
                        logo,
                        score,
                        release_time,
                        playnum : 0,
                        commentnum : 0,
                    });
                    tv.save(function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        index++;
                        if (index ===result.length ) {
                            console.log('本轮抓取全部综艺信息成功');
                            // callback(null, true);

                            FetchUtil.downloadImages(video,function (err,result) {
                                if (err) return console.log(err);
                                console.log('综艺信息全部入库成功，本轮抓取结束');
                                // 添加成功之后（开始把数据信息保存到文件中去）
                                callback(null, result);

                            })
                        }
                    });
                })
            }
        })
    })
}