import { IRequest } from '../../scheduler/ts-fsrs/types'

export interface INextRequest<T = string | number> extends IRequest<T> {
  s: number
  d: number
  r: number
  ivl: number
}
