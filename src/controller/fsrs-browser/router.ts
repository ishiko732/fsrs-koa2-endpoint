import { TRouter } from '../../bootstrap/types'
import fsrsBrowserController from './index'

const routers: TRouter = {
  ['browser/intro']: {
    method: 'get',
    path: '/intro',
    endpoint: fsrsBrowserController.intro
  },
  ['browser/scheduler']: {
    method: 'post',
    path: '/scheduler',
    endpoint: fsrsBrowserController.scheduler
  },
 
}

export default routers
