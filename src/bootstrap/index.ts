import Koa from 'koa'
import routers from '@bootstrap/router'
import root from '@controller/router'
import { useMiddlewares } from '@bootstrap/app.middlewares'

const createServer = async (): Promise<Koa> => {
  const koa: Koa = new Koa()

  useMiddlewares(koa)

  const router = routers(root)
  koa.use(router.routes())
  koa.use(router.allowedMethods())

  return koa
}

export default createServer
