const router = require('koa-router')()
/* 引入数据库连接 */
const db = require('../utils/db')
/* 引入token */
const {generateToken} = require('../utils/generateToken')

router.get('/login', async (ctx, next) => {
   let account = ctx.query.account;
   let password = ctx.query.password;
   try{
        const token = await verify(account,password);
        const type = await new Promise((resolve,reject)=>{
            db(`select * from account where account='${account}' and password='${password}'`,(err,data)=>{
                resolve(data[0].type);
            })
        });
        ctx.body = {
            token,
            type
        };
   }catch(e){
        ctx.body = {
            errCode:e,
            msg:'用户名或密码不正确',
            request:`${ctx.method} ${ctx.path}`
        };
   }
});

/* 验证用户名密码 */
function verify(account,password){
    return new Promise((resolve,reject)=>{
        db(`select * from account where account='${account}' and password='${password}'`,(err,data)=>{
            if(data.length != 1){
                reject('10001');
            }else{
                resolve(generateToken(data[0].id,data[0].type));
            }
         });
    });
}


module.exports = router;
