/* 验证token的有效性 */
const Auth = require('../utils/verifyToken')
const router = require('koa-router')()

router.post('/token', new Auth().middleware, async (ctx) => {
})

module.exports = router
