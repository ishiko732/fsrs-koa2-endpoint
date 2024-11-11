import { TRouter } from '../../bootstrap/types'
import tsfsrsController from './index'

const routers: TRouter = {
  ['tsfsrs/hello']: {
    method: 'get',
    path: '/hello',
    endpoint: tsfsrsController.hello
  }
}

export default routers
