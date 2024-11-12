import cors from './cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import prev from './prev'

export const useMiddlewares = <T extends Koa>(app: T): T => {
  app.use(cors())
  app.use(bodyParser({ jsonLimit: '10mb' }))
  app.use(prev())

  return app
}
