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
router.post('/content', async ctx => {
    const data = ctx.request.body
    await controller.viewContent(ctx, { data })

})
router.post('/edit', async ctx => {
    const data = ctx.request.body
    await controller.editContent(ctx, { data })

})
router.post('/addComment', async ctx => {
    const data = ctx.request.body
    await controller.addComment(ctx, { data })

})
router.post('/toggleHeart', async ctx => {
    const data = ctx.request.body
    await controller.toggleHeart(ctx, { data })

})
module.exports = router.routes()