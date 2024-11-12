import { TRouter } from '../../bootstrap/types'
import tsfsrsController from './index'

const routers: TRouter = {
  ['tsfsrs/intro']: {
    method: 'get',
    path: '/intro',
    endpoint: tsfsrsController.intro
  },
  ['tsfsrs/create']: {
    method: 'post',
    path: '/create',
    endpoint: tsfsrsController.create
  },
  ['tsfsrs/retrievability']: {
    method: 'post',
    path: '/retrievability',
    endpoint: tsfsrsController.retrievability
  },
  ['tsfsrs/scheduler']: {
    method: 'post',
    path: '/scheduler',
    endpoint: tsfsrsController.scheduler
  },
  ['tsfsrs/rollback']: {
    method: 'put',
    path: '/scheduler',
    endpoint: tsfsrsController.rollback
  },
  ['tsfsrs/forget']: {
    method: 'delete',
    path: '/scheduler',
    endpoint: tsfsrsController.forget
  },
  ['tsfsrs/rescheduler']: {
    method: 'post',
    path: '/rescheduler',
    endpoint: tsfsrsController.rescheduler
  }
}

export default routers
