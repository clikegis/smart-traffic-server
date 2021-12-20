let koaRouter = require('koa-router');
let router = koaRouter();
const db  = require('../utils/db');
const fs = require('fs')

router.post('/addAdmin',async (ctx)=>{
    const {newAccount,newPassword} = ctx.request.body;
    let msg;
    const userNum = await new Promise((resolve,reject)=>{
        fs.readFile('./config/config.json',(err,data)=>{
            if(err){
                console.log(err);
            }
            resolve(JSON.parse(data).userNum);
        });
    });

    const queryWord = `insert into account VALUES(${userNum+1},1,'${newAccount}','${newPassword}',0)`;
    msg = await new Promise((resolve,reject)=>{
        db(queryWord,(err,rows)=>{
            if(err){
                resolve({
                    status:404
                });
            }else{
                fs.writeFileSync('./config/config.json',JSON.stringify({
                    userNum:userNum+1
                }),(err)=>{
                    if(err){
                       console.log(err);
                        return;
                    }
                })
                resolve({
                    status:200
                });
            }
        });
    });
    ctx.body = msg;
});

module.exports = router;
