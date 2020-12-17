const db = require('./db');

/**
 * 电视剧列表的对象信息
 * @param cartoon
 * @constructor
 */
function cartoons(cartoon) {
    this.title = cartoon.title;
    this.info = cartoon.info;
    this.url = cartoon.url;
    this.addtime = cartoon.addtime;
    this.type = cartoon.type
    this.logo = cartoon.logo;
    this.playnum = cartoon.playnum;
    this.commentnum = cartoon.commentnum;
    this.score = cartoon.score;
    this.release = cartoon.release_time;
}


/**
 * 保存抓取的电视剧信息
 * @param callback
 */
cartoons.prototype.save = function (callback) {
    db.query('insert into cartoons values (null, ?, ?, ?, NOW(), ?, ?, ?, ?,?, ?)',
        [this.title,this.info,this.url,this.type,this.logo,this.playnum,this.commentnum,this.score,this.release], function (err, result) {
            if (err) {
                return callback(err, null);
            }
            // 插入完成之后开始进行数据去重
            db.query('delete from cartoons where url  in ' +
                '   (select url from (select url from cartoons group by url having count(url)>1) as tmp1) ' +
                '       and id not in (select id from (select min(id) as id from cartoons group by url having count(url)>1) as temp2)', function (err, result) {
                if (err) {
                    return  callback(err, null);
                }
                callback(null, result);
            });
            callback(null, result);
        });

}


/**
 * 获取当前页面
 * @param params
 * @param callbaack
 */
cartoons.getcartoonsByCurrentPage = function(params, callbaack){
    db.query('select * from cartoons limit ?, ?', [
        params.start, params.pageSize
    ], function (err, result) {
        if (err) {
            callbaack(err, null);
        }
        callbaack(null, result);
    });
}


/**
 * 获取电视剧的数量信息
 * @param callback
 */
cartoons.getcartoonsPageNums = function(callback){
    db.query('select count(*) as pageNum from cartoons', function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result[0]);
    });
}

/**
 * 获取所有的tv对象
 * @param callback
 */
cartoons.getAllcartoons = function (callback) {
    db.query('select * from cartoons', [],
        function (err, result) {
            if (err) {
                return callback(err, null);
            }

            callback(null, result);
        })
}



module.exports = cartoons;