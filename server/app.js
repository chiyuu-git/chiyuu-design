const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

const WebSocket = require('ws')
const ws = new WebSocket.Server({port: 8888})

ws.on('open', function open() {
  console.log('ws open');
});

ws.on('close', function close() {
  console.log('ws closed');
});


ws.on('connection', (server,req) => {
    const ip = req.connection.remoteAddress
    const port = req.connection.remotePort
    const clientName = ip + port

    console.log('%s is connected', clientName)
    
    // 发送消息给客户端
    server.send("Welcome " + clientName)
    server.on('message', msg => {
      console.log('received: %s from %s', msg, clientName)
      // 广播消息给所有客户端
      ws.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send( clientName + " -> " + message)
        }
      })
    })
})

module.exports = app
