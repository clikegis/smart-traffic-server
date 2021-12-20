const koaRouter = require('koa-router');
const db = require('../utils/db');
let router = koaRouter();

router.get('/deleteUserInfo',async (ctx)=>{
    let res;
    let id = ctx.query.id;

    const queryWord = `delete from account where id='${id}'`;
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
