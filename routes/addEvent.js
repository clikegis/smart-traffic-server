let router = require('koa-router')();
let db = require('../utils/db')

router.post('/addEvent',async (ctx)=>{
    //获取请求数据
    const eid = ctx.request.body.eid;
    const type = ctx.request.body.type;
    const classnum = ctx.request.body.classnum;
    const date = ctx.request.body.date;
    const place = ctx.request.body.place;
    const carnumber = ctx.request.body.carnumber;
    const driver = ctx.request.body.driver;
    const status = ctx.request.body.status;
    const lon = ctx.request.body.lon;
    const lat = ctx.request.body.lat;

    const res = await new Promise((resolve,reject)=>{
        const queryWord = `insert into event VALUES('${eid}','${type}',${classnum},'${date}','${place}','${carnumber}','${driver}',${status},${lon},${lat},0)`;
        console.log(queryWord);
        db(queryWord,(err,data)=>{
            if(err){
                resolve({
                    status:404,
                    err:err
                });
            }else{
                resolve({
                    status:200,
                    data:data
                });
            }
        });
    });

    ctx.body = {
        res
    };
});

module.exports = router;