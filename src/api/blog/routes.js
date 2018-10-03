const router = require('koa-router')()
const controller = require('./controller')
router.post('/bloglist', async ctx => {
    const data = ctx.request.body
    await controller.viewlist(ctx, { data })

})
router.post('/uploadBlog', async ctx => {
    const data = ctx.request.body
    await controller.uploadBlog(ctx, { data })

})
module.exports = router.routes()