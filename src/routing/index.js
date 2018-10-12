const router = require('koa-router')()
const users = require('../api/users/routes')
const blog = require('../api/blog/routes')
const pvuv = require('../api/pv-uv/routes')
router.use('/api/users', users)
router.use('/api/blog', blog)
router.use('/api/util', pvuv)
module.exports = router
