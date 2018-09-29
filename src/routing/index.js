const router = require('koa-router')()
const users = require('../api/users/routes')

router.use('/api/users', users)

module.exports = router
