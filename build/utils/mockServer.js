const vm = require('vm')
const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const Mock = require('mockjs')

module.exports = function (config) {
  const app = new Koa()
  const rule = [].concat(config.prefix).join('|')
  const reg = new RegExp(`^(?:${rule})`)

  app.use(ctx => {
    const pathName = ctx.request.path

    if (!reg.test(pathName)) ctx.throw(404)

    const method = ctx.request.method
    const fileName = pathName.split('/').join('_').slice(1)
    const filePath = path.join(config.path, method.toLowerCase(), fileName + '.js')

    if (!fs.existsSync(filePath)) ctx.throw(404)

    try {
      const data = fs.readFileSync(filePath, 'utf8')
      const sandbox = {
        module: {
          exports: {}
        }
      }

      vm.runInNewContext(data, sandbox)

      const sourceData = sandbox.module.exports(ctx.request)
      const mockData = Mock.mock(sourceData)

      ctx.type = 'json'
      ctx.response.body = JSON.stringify(mockData)
    } catch (err) {
      ctx.throw(500)
    }
  })
  app.listen(config.port, () => {
    console.log(`Snail: Mock服务启动在 http://127.0.0.1:${config.port}`)
  })
}
