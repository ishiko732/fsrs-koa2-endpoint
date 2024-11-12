import { FSRSHistory, FSRSParameters, Grade } from 'ts-fsrs'
import { TCard, TRecordLogItem } from '../types'

export interface IRequest<T = string | number> {
  card_id?: T
  timezone: string
  now: number
}

export interface ICreateRequest<T = string | number> extends IRequest<T> {
  now: number
}

export interface IRetrievabilityRequest<T = string | number>
  extends IRequest<T> {
  params?: FSRSParameters
  data: TCard
}

export interface ISchedulerRequest<T = string | number> extends IRequest<T> {
  params?: FSRSParameters
  data: TCard
  grade?: Grade
}

export interface IRollbackRequest<T = string | number> extends IRequest<T> {
  params?: FSRSParameters
  data: TRecordLogItem
}

export interface IForgetRequest<T = string | number> extends IRequest<T> {
  params?: FSRSParameters
  reset_count: boolean
  data: TCard
}

export interface IReschedulerRequest<T = string | number> extends IRequest<T> {
  params?: FSRSParameters
  data: {
    current_card: TCard
    history: FSRSHistory[]
    first_card: TCard
    skip_manual: boolean
    memory_state: boolean
  }
}
