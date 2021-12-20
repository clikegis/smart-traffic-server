let router = require('koa-router')();
const db = require('../utils/db');

router.post('/insertStation',async (ctx)=>{
    const name  = ctx.request.body.name;
    const information = ctx.request.body.information;
    const account = ctx.request.body.account;
    const submittime = ctx.request.body.submittime;
    const flow = ctx.request.body.flow;

    const queryWord = `insert into situation values('${name}','${information}','${account}','${submittime}','${flow}')`;
    console.log(queryWord);

    let res;

    try {
         res = await new Promise((resolve,reject)=>{
            db(queryWord,(err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        });
    } catch (error) {
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