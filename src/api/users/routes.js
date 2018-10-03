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
router.post('/getJwt',async ctx => {
  const data = ctx.request.body
  await controller.getJwt(ctx, {data})
})
router.post('/reset-password',async ctx => {
  const data = ctx.request.body
  await controller.resetPassword(ctx, {data})
})
router.delete('/logout',async ctx => {
  const data = ctx.request.body
  await controller.logout(ctx, {data})
})
module.exports = router.routes()