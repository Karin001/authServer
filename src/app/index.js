require("dotenv").config();
const Koa = require('koa')
const router = require('../routing')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-morgan')
const responseTime = require('koa-response-time')
const database = require('../database')
const koaJwt = require('koa-jwt')
const app = new Koa()
app.use(function(ctx, next){
  return next().catch((err) => {
      if (401 == err.status) {
          ctx.status = 401;
          ctx.body = {error: err.originalError ? err.originalError.message : err.message}
      } else {
          throw err;
      }
  })
})
app.use(koaJwt({secret:process.env.JWT_SECRET}).unless({
  path:[/^\/api\/users\/*/]
}))
app.use(responseTime())
app.use(logger('combined'))
app.use(bodyparser())
app.use(router.routes())
app.use(ctx => { ctx.type = 'json' })

exports.start = async () => {
  try {
    await database.connect()
    console.log('Connected to database')
    const port = process.env.PORT
    await app.listen(port)
    console.log(`Connected on port: ${port}`)
  } catch (error) {
    console.log('Something went wrong')
    console.log(error)
  }
}
