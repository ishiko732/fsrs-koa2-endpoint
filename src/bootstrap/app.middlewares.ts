import cors from './cors'
import Koa from 'koa'
// import bodyParser from 'koa-bodyparser'
import prev from './prev'
import { koaBody } from 'koa-body'

export const useMiddlewares = <T extends Koa>(app: T): T => {
  app.use(cors())
  app.use(koaBody({ multipart: true}))
  app.use(prev())

  return app
}
