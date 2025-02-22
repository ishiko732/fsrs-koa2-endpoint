import { TRouter } from '../../bootstrap/types'
import fsrsNodejsController from './'

const routers: TRouter = {
  ['nodejs/intro']: {
    method: 'get',
    path: '/intro',
    endpoint: fsrsNodejsController.intro
  },
  ['nodejs/train']: {
    method: 'post',
    path: '/train',
    endpoint: fsrsNodejsController.train
  }
}

export default routers
