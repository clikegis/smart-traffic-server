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

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


app.listen(3000,()=>{
  console.log("3000端口监听中......");
})
module.exports = app
