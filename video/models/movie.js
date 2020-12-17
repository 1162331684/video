"use strict";

const db = require('./db');

/**
 * 定义电影实体的类对象
 * @param movie
 * @constructor
 */
function Movie(movie) {
    this.id = movie.id;
    this.title = movie.title;
    this.url = movie.url;
    this.info = movie.info;
    this.logo = movie.logo;
    this.score = movie.score;
    this.playnum = movie.playnum;
    this.commentnum = movie.commentnum;
    this.release_time = movie.release_time;
    this.addtime = movie.addtime;
    this.type = movie.type
}


/**
 * 插入数据到数据库
 * @param callback
 */
Movie.prototype.save = function (callback) {

    db.query('insert into movies values(null, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)', [
        this.title, this.url, this.info, this.logo, this.score, this.playnum, this.commentnum, this.release_time, this.type
    ], function (err, result) {
        if (err) {
            return callback(err, null);
        }

        // 只要用户插入数据成功， 然后就开始进行数据库去重操作
        if (result.insertId > 0) {
            // 如如完毕之后，开始执行数据去重操作
            db.query('delete from movies where url  in ' +
                '   (select url from (select url from movies group by url having count(url)>1) as tmp1) ' +
                '       and id not in (select id from (select min(id) as id from movies group by url having count(url)>1) as temp2)', function (err, result) {
                if (err) {
                    return  callback(err, null);
                }
                callback(null, result);
            });
        }

    })
}
/**
 *
 * @param id
 * @param callback
 */
Movie.deletemovieById = function(id, callback){
    db.query('delete  from movies where id = ?', [id], function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    })
}
/**
 * 获取所有的电影对象
 * @param callback
 */
Movie.getAllMovies = function (callback) {
    db.query('select * from movies', [],
        function (err, result) {
            if (err) {
                return callback(err, null);
            }

            callback(null, result);
        })
}


/**
 * 获取当前的电影详情页面
 * @param params
 * @param callback
 */
Movie.getMoviesByCurrentPage = function (params, callback) {
    db.query('select * from movies limit ?, ?', [
            params.start, params.pageSize],
        function (err, result) {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        })
}
/**
 *
 * @param params
 * @param callback
 */
Movie.gettvsByCurrentPage = function (params, callback) {
    db.query('select * from tvs limit ?, ?', [
            params.start, params.pageSize],
        function (err, result) {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        })
}
/**
 *
 * @param params
 * @param callback
 */
Movie.getcartoonsByCurrentPage = function (params, callback) {
    db.query('select * from cartoons limit ?, ?', [
            params.start, params.pageSize],
        function (err, result) {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        })
}
/**
 *
 * @param params
 * @param callback
 */
Movie.getvarietysByCurrentPage = function (params, callback) {
    db.query('select * from varietys limit ?, ?', [
            params.start, params.pageSize],
        function (err, result) {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        })
}
/**
 * 根据URl地址获取电影的详细信息
 * @param url
 * @param callback
 */
Movie.getMovieByUrl = function (url, callback) {
    db.query('SELECT * FROM movies where url =? union all SELECT * FROM tvs where url =? union all SELECT * FROM cartoons where url =? union all SELECT * FROM varietys where url =?', [url,url,url,url],
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, result);
        })
}


/**
 * 获取所有的页码
 * @param callback
 */
Movie.getMoviePageNums = function (callback) {
    db.query('select count(id) as pageNum from movies',
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, result[0]);
        })
}
Movie.gettvsPageNums = function (callback) {
    db.query('select count(id) as pageNum from tvs',
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, result[0]);
        })
}
Movie.getcartoonsPageNums = function (callback) {
    db.query('select count(id) as pageNum from cartoons',
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, result[0]);
        })
}
Movie.getvarietysPageNums = function (callback) {
    db.query('select count(id) as pageNum from varietys',
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, result[0]);
        })
}


/**
 * 实现电影的模糊查询检索功能
 * @param name
 * @param callback
 */
Movie.getMovieByName = function (name, callback) {
    db.query('select * from movies where title like ?', ['%'+name+'%'],
        function (err, result) {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        })
}

Movie.gettvsByName = function (name, callback) {
    db.query('select * from tvs where title like ?', ['%'+name+'%'],
        function (err, result) {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        })
}
Movie.getcartoonsByName = function (name, callback) {
    db.query('select * from cartoons where title like ?', ['%'+name+'%'],
        function (err, result) {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        })
}
/**
 *
 * @param name
 * @param callback
 */
Movie.getvarietysByName = function (name, callback) {
    db.query('select * from varietys where title like ?', ['%'+name+'%'],
        function (err, result) {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        })
}
/**
 * 修改电影的播放数量信息
 * @param url
 * @param callback
 */
Movie.updatePlayNumsByUrl = function(url, callback){
    db.query('update movies set playnum = playnum +1 where url = ?', [url],
        function (err, result) {
            if (err) {

                return callback(err, null);
            }
            callback(null, result);

        })
}
Movie.updateTVPlayNumsByUrl = function(url, callback){
    db.query('update tvs set playnum=playnum+1 where url = ?', [url],
        function (err, result) {
            if (err) {

                return callback(err, null);
            }
            callback(null, result);

        })
}

Movie.updatecartoonPlayNumsByUrl = function(url, callback){
    db.query('update cartoons set playnum = playnum +1 where url = ?', [url],
        function (err, result) {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        })
}
Movie.updatevarietyPlayNumsByUrl = function(url, callback){
    db.query('update varietys set playnum = playnum +1 where url = ?', [url],
        function (err, result) {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        })
}

/**
 * 随机从数据库中查询一条数据
 * @param callback
 */
Movie.getOneRandomMovie = function(callback){
    db.query('select * from movies order by rand() limit 1',
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, result);
        })
}

/**
 * 随机获取数据
 * @param nums
 * @param callback
 */
Movie.getRandomMovies = function(nums, callback){
    db.query('select * from movies order by rand() limit ?',[nums],
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, result);
        })
}



module.exports = Movie;