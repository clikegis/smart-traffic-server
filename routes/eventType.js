const koaRouter = require('koa-router');
const db = require('../utils/db');

const router = koaRouter();

router.get('/eventType',async (ctx)=>{
    let res;
    try{
        res = await new Promise((resolve,reject)=>{
            db(`select DISTINCT type from event where type LIKE '%${ctx.query.queryString}%'`,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }catch(e){
        ctx.body = {
            status:404,
            err:res
        }
        return;
    }

    ctx.body = {
        status:200,
        data:res
    }

});

module.exports = router;