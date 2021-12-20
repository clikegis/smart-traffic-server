const koaRouter = require('koa-router');
const db = require('../utils/db');
let router = koaRouter();

router.get('/deleteTableData',async (ctx)=>{
    const eid = ctx.query.eid;
    let res;
    const queryWord = `delete from event where eid='${eid}'`;
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
