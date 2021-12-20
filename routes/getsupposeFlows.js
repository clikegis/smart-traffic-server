const koaRouter = require('koa-router');
const db = require('../utils/db');
let router = koaRouter();

router.get('/getsupposeFlows',async (ctx)=>{
    let res2;    
    const queryWord2 = 'select name,updatetime from road';
    try{
        res2 = await new Promise((resolve,reject)=>{
            db(queryWord2,(err,data)=>{
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

    
    res2 = res2.map(element => {
        let updateTime = element.updatetime;
        var submitDate = updateTime.getFullYear()+'-'+ (updateTime.getMonth() + 1) +'-' +  updateTime.getDate()+' '+ updateTime.getHours() + ':' + updateTime.getMinutes()+':'+updateTime.getSeconds();
        return {
            submitDate,
            name:element.name
        }
    });


    console.log(res2);

    let infoArr = [];
    for (let index = 0; index < res2.length; index++) {
        var response = await new Promise((resolve,reject)=>{
            db(`select avg(flow) from situation where submittime>'${res2[index].submitDate}' and name='${res2[index].name}'`,(err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        });
        infoArr.push(response);
    }

    ctx.body = {
        infoArr
    }
});


module.exports = router;
