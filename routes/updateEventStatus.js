const koaRouter = require('koa-router');
const db = require('../utils/db');
let router = koaRouter();

router.get('/updateEventStatus',async (ctx)=>{
    let res;
    let eid = ctx.query.eid;
    const queryWord = `update event set handlestatus=1 where eid='${eid}'`;
    console.log(queryWord);
    try{
        res = await new Promise((resolve,reject)=>{
            db(queryWord,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }catch{
        ctx.body = {
            status:404,
            result:'failed'
        }
    }

    ctx.body = {
        status:200,
        result:'success'
    }
});


module.exports = router;
