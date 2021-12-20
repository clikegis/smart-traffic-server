const koaRouter = require('koa-router');
const db = require('../utils/db');
let router = koaRouter();

router.get('/online',async (ctx)=>{
    let res;
    let account = ctx.query.account;

    const queryWord = `update account set status=1 where account='${account}'`;
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
