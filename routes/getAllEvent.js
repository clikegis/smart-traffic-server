let router = require('koa-router')();
const db = require('../utils/db');

router.get('/getAllEvent',async (ctx)=>{
    let res;
    try {
         res = await new Promise((resolve,reject)=>{
            queryWord = 'select * from event';
            db(queryWord,(err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        });
    } catch (error) {
        ctx.body = {
            status:404,
            errMsg:errX
        }
    }
    
    ctx.body = {
        status:200,
        rows:res
    };
});

module.exports = router;