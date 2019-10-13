const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors');
const session = require('koa-session');
app.keys = ['mt-blog'];
const CONFIG= {
  key: 'koa:sess',
  maxAge: 86400000, // 这个是确定cookie的有效期，默认是一天
  overwrite: true,
  httpOnly: true, // 表示是否可以通过javascript来修改，设成true会更加安全
  signed: true,
  rolling: false, // 这两个都是涉及到cookie有效期的更新策略
  renew: false // 这两个都是涉及到cookie有效期的更新策略
};
const router = require('./routes/index')
require('./mongodb/db');
// error handler
onerror(app)
app.use(session(CONFIG, app))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
app.use(cors())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
router(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
