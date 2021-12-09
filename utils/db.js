var mysql = require('mysql');

var pool = mysql.createPool({
    host:'120.27.240.160',
    port:'3306',
    user:'root',
    password:'caihaoshuang',
    database:'mapgis'
});


//对数据库进行增删改查的基础
function query(sql,callback){
    pool.getConnection((err,connection)=>{
        connection.query(sql,function(err,rows){
            callback(err,rows);
            connection.release();
        });
    })
}

module.exports = query;