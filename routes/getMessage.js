const koaRouter = require('koa-router');
const db = require('../utils/db');
let router = koaRouter();

router.get('/getMessage',async (ctx)=>{
    let res;
    const queryWord = 'select * from message';
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
            errMsg:err
        }
    }

    ctx.body = {
        status:200,
        data:res
    }
});


module.exports = router;
