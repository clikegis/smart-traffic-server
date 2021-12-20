const koaRouter = require('koa-router');
const db = require('../utils/db');
let router = koaRouter();

router.get('/updateUserInfo',async (ctx)=>{
    let res;
    let account = ctx.query.account;
    let password = ctx.query.password;
    let id = ctx.query.id;



    const queryWord = `update account set account='${account}',password='${password}' where id=${id}`;
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
            result:res
        }
    }

    if(res){
        ctx.body = {
            status:200,
            result:'success'
        }
    }else{
        ctx.body = {
            status:404,
            result:'账号重复!'
        }
    }
});


module.exports = router;
