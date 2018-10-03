const router = require('koa-router')()
const users = require('../api/users/routes')
const blog = require('../api/blog/routes')
router.use('/api/users', users)
router.use('/api/blog', blog)
module.exports = router
