const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cros = require('koa2-cors')
const app = new Koa()
app.use(cros())
app.use(bodyParser())
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const login = require('./routes/login')
const token = require('./routes/token')
const signUp = require('./routes/signUp');
const eventType = require('./routes/eventType');
const addEvent = require('./routes/addEvent');
const getEventNum = require('./routes/getEventNum');
const getTableData = require('./routes/getTableData');
const deleteEvent = require('./routes/deleteEvent');
const updateEventStatus = require('./routes/updateEventStatus');
const getAllEvent = require('./routes/getAllEvent');
const updateEvent = require('./routes/updateEvent');
const addroadStatus = require('./routes/addroadStatus');
const getRoadSituation = require('./routes/getRoadSituation');
const getsupposeFlows = require('./routes/getsupposeFlows');
const getCurrntFlow = require('./routes/getCurrntFlow');
const updateRoadStatus = require('./routes/updateRoadStatus');
const getUserInfo = require('./routes/getUserInfo');
const getAdminInfo = require('./routes/getAdminInfo');
const updateUserInfo = require('./routes/updateUserInfo');
const deleteUserInfo = require('./routes/deleteUserInfo');
const addAdmin = require('./routes/addAdmin');
const outline = require('./routes/outline');
const online = require('./routes/online');
const getUserStatus = require('./routes/getUserStatus');
const changePassword = require('./routes/changePassword');
const getMessage = require('./routes/getMessage');
const issueMessage = require('./routes/issueMessage');


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(login.routes(), login.allowedMethods())
app.use(token.routes(), token.allowedMethods())
app.use(signUp.routes(), signUp.allowedMethods())
app.use(eventType.routes(), eventType.allowedMethods())
app.use(addEvent.routes(), addEvent.allowedMethods())
app.use(getEventNum.routes(), getEventNum.allowedMethods())
app.use(getTableData.routes(), getTableData.allowedMethods())
app.use(deleteEvent.routes(), deleteEvent.allowedMethods())
app.use(updateEventStatus.routes(), updateEventStatus.allowedMethods())
app.use(getAllEvent.routes(), getAllEvent.allowedMethods())
app.use(updateEvent.routes(), updateEvent.allowedMethods())
app.use(addroadStatus.routes(), addroadStatus.allowedMethods())
app.use(getRoadSituation.routes(), getRoadSituation.allowedMethods())
app.use(getsupposeFlows.routes(), getsupposeFlows.allowedMethods())
app.use(getCurrntFlow.routes(), getCurrntFlow.allowedMethods())
app.use(updateRoadStatus.routes(), updateRoadStatus.allowedMethods())
app.use(getUserInfo.routes(), getUserInfo.allowedMethods())
app.use(getAdminInfo.routes(), getAdminInfo.allowedMethods())
app.use(updateUserInfo.routes(), updateUserInfo.allowedMethods())
app.use(deleteUserInfo.routes(), deleteUserInfo.allowedMethods())
app.use(outline.routes(), outline.allowedMethods())
app.use(addAdmin.routes(), addAdmin.allowedMethods())
app.use(online.routes(), online.allowedMethods())
app.use(getUserStatus.routes(), getUserStatus.allowedMethods())
app.use(changePassword.routes(), changePassword.allowedMethods())
app.use(getMessage.routes(), getMessage.allowedMethods())
app.use(issueMessage.routes(), issueMessage.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


app.listen(3000,()=>{
  console.log("3000???????????????......");
})
module.exports = app
