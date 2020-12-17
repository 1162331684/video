const db = require('./db');

/**
 * 电视剧列表的对象信息
 * @param variety
 * @constructor
 */
function varietys(variety) {
    this.title = variety.title;
    this.info = variety.info;
    this.url = variety.url;
    this.addtime = variety.addtime;
    this.type = variety.type
    this.logo = variety.logo;
    this.playnum = variety.playnum;
    this.commentnum = variety.commentnum;
    this.score = variety.score;
    this.release = variety.release_time;
}


/**
 * 保存抓取的电视剧信息
 * @param callback
 */
varietys.prototype.save = function (callback) {
    db.query('insert into varietys values (null, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?)',
        [this.title,this.info,this.url,this.type,this.logo,this.playnum,this.commentnum,this.score,this.release], function (err, result) {
            if (err) {
                return callback(err, null);
            }
            // 插入完成之后开始进行数据去重
            db.query('delete from varietys where url  in ' +
                '   (select url from (select url from varietys group by url having count(url)>1) as tmp1) ' +
                '       and id not in (select id from (select min(id) as id from varietys group by url having count(url)>1) as temp2)', function (err, result) {
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
varietys.getvarietysByCurrentPage = function(params, callbaack){
    db.query('select * from varietys limit ?, ?', [
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
varietys.getvarietysPageNums = function(callback){
    db.query('select count(*) as pageNum from varietys', function (err, result) {
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
varietys.getAllvarietys = function (callback) {
    db.query('select * from varietys', [],
        function (err, result) {
            if (err) {
                return callback(err, null);
            }

            callback(null, result);
        })
}



module.exports = varietys;