const koaRouter = require('koa-router');
const db = require('../utils/db');
let router = koaRouter();

router.get('/changePassword',async (ctx)=>{
    let res;
    let oldAccount = ctx.query.oldAccount;
    let oldPassword =  ctx.query.oldPassword;
    let newPassword =  ctx.query.newPassword;

    const queryWord = `update account set password='${newPassword}' where account='${oldAccount}' and password='${oldPassword}'`;
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
        result:res
    }
});


module.exports = router;
