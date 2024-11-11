import { TRouter } from '@bootstrap/types'
import tsfsrsController from '@controller/ts-fsrs'

const routers: TRouter = {
  ['tsfsrs/hello']: {
    method: 'get',
    path: '/hello',
    endpoint: tsfsrsController.hello
  }
}

export default routers
