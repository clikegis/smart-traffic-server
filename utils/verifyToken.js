const jwt = require('jsonwebtoken');
const {secretKey,user,admin,superAdmin} = require('../config/cinfig');
const basicAuth = require('basic-auth')
class Auth{
    get middleware(){
       return async (ctx,next)=>{
           let errMsg = 'token不合法';
           const token = basicAuth(ctx.request);
            if(!token || token.name==='null'){
                ctx.body = {
                    msg:errMsg
                }
                return
            }

            try {
                var decoded = jwt.verify(token.name,secretKey)
            }catch(e){
                if(e.name==='tokenExpiredError'){
                    essMsg = 'token已过期'
                }
                ctx.body = {
                 msg:errMsg
                }
                return
            }    

            const scoped = decoded.scoped;
            if(scoped==2){
                ctx.body = {
                    type:"超级管理员"
                }
            }else if(scoped==1){
                ctx.body = {
                    type:"管理员"
                }
            }else{
                ctx.body = {
                    type:"用户"
                }
            }
       }
    }
}

module.exports = Auth;