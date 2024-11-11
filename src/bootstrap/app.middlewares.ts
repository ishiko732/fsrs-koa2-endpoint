import cors from '@bootstrap/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

export const useMiddlewares = <T extends Koa>(app: T): T => {
  app.use(cors())
  app.use(bodyParser({ jsonLimit: '10mb' }))

  return app
}
