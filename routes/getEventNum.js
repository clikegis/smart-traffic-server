const koaRouter = require('koa-router');
const db = require('../utils/db');

let router = koaRouter();

router.get('/getEventNum',async (ctx)=>{
    const res = await new Promise((resolve,reject)=>{
        db(`select count(*) from event`,(err,count)=>{
            if(err){
                resolve({
                    status:404,
                    err:err
                });
            }else{
                resolve(count);
            }
        });
    });
    
    ctx.body = {
        status:200,
        count:res[0]['count(*)']
    }
});

module.exports = router;