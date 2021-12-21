const koaRouter = require('koa-router');
const db = require('../utils/db');
let router = koaRouter();

router.get('/issueMessage',async (ctx)=>{
    let res;
    let type = ctx.query.type;
    let content = ctx.query.content;
    let date = ctx.query.date;

    const queryWord = `insert into message values('${type}','${content}','${date}')`;
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
        data:'success'
    }
});


module.exports = router;
