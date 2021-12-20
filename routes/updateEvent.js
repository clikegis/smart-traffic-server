let router = require('koa-router')();
const db = require('../utils/db');

router.get('/updateEvent',async (ctx)=>{
    const eid = ctx.query.eid;
    const status  = ctx.query.status;

    const queryWord = `update event set status='${status}' where eid='${eid}'`;
    console.log(queryWord);

    let res;

    try {
         res = await new Promise((resolve,reject)=>{
            db(queryWord,(err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        });
    } catch (error) {
        ctx.body = {
            status:404,
            errMsg:res
        }
    }

    ctx.body = {
        status:200,
        rows:res
    }
});

module.exports = router;