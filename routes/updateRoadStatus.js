const koaRouter = require('koa-router');
const db = require('../utils/db');
let router = koaRouter();

router.get('/updateRoadStatus',async (ctx)=>{
    let res;
    let name = ctx.query.name;
    let flow = ctx.query.flow;
    let updatetime = ctx.query.updatetime;

    const queryWord = `update road set flow=${flow},updatetime='${updatetime}' where name='${name}'`;
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
