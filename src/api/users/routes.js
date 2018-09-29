const router = require('koa-router')()
const controller = require('./controller')
router.post('/login', async ctx => {
  const data = ctx.request.body
  await controller.login(ctx, {data})
  
})

router.post('/signup', async ctx => {
  const data = ctx.request.body
 await controller.signup(ctx, { data })
 console.log('saogo!!!!!!!!!')

})
router.post('/request-password',async ctx => {
  const data = ctx.request.body
  await controller.requestPassword(ctx, {data})
})

module.exports = router.routes()
