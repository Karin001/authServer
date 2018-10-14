const router = require('koa-router')()
const controller = require('./controller')
router.post('/PvUv', async ctx => {
  const data = ctx.request.body
  await controller.addPvUvCnt(ctx, data)
  
})

router.get('/PvUv', async ctx => {
  const name = ctx.query.name
 await controller.getPagePvUv(ctx,  {name} )


})

module.exports = router.routes()