import Koa from 'koa'
import routers from './router'
import root from '../controller/router'
import { useMiddlewares } from './app.middlewares'

const createServer = (): Koa => {
  const koa: Koa = new Koa()

  useMiddlewares(koa)

  const router = routers(root)
  koa.use(router.routes())
  koa.use(router.allowedMethods())

  return koa
}

export default createServer
