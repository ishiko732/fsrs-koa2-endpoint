import type { Context } from 'koa'
import { project } from '../../services/scheduler/ts-fsrs/constrant'
import { TSFSRSService } from '../../services/scheduler/ts-fsrs'
import { IPrevState } from '../../bootstrap/prev'
import {
  IForgetRequest,
  IReschedulerRequest,
  IRetrievabilityRequest,
  IRollbackRequest,
  ISchedulerRequest
} from '../../services/scheduler/ts-fsrs/types'

class TSFSRSController {
  intro = async (ctx: Context) => {
    ctx.body = project
  }

  create = async (ctx: Context) => {
    const { card_id, now, timezone } = <IPrevState>ctx.state

    const svc = new TSFSRSService()
    const card = svc.create({
      now,
      card_id,
      timezone
    })
    ctx.body = card
  }

  retrievability = async (ctx: Context) => {
    const { card_id, now, timezone } = <IPrevState>ctx.state
    const data = ctx.request.body as Omit<
      IRetrievabilityRequest,
      'card_id' | 'now' | 'timezone'
    >

    const svc = new TSFSRSService()
    const retrievability = svc.retrievability({
      now,
      card_id,
      timezone,
      params: data.params,
      data: data.data
    })
    ctx.body = retrievability
  }

  scheduler = async (ctx: Context) => {
    const { card_id, now, timezone } = <IPrevState>ctx.state
    const data = ctx.request.body as Omit<
      ISchedulerRequest,
      'card_id' | 'now' | 'timezone'
    >
    const svc = new TSFSRSService()
    const scheduler = svc.scheduler({
      now,
      card_id,
      timezone,
      params: data.params,
      data: data.data,
      grade: data.grade
    })
    ctx.body = scheduler
  }

  rollback = async (ctx: Context) => {
    const { card_id, now, timezone } = <IPrevState>ctx.state
    const data = ctx.request.body as Omit<
      IRollbackRequest,
      'card_id' | 'now' | 'timezone'
    >

    const svc = new TSFSRSService()
    const scheduler = svc.rollback({
      now,
      card_id,
      timezone,
      params: data.params,
      data: data.data
    })
    ctx.body = scheduler
  }

  forget = async (ctx: Context) => {
    const { card_id, now, timezone } = <IPrevState>ctx.state
    const data = ctx.request.body as Omit<
      IForgetRequest,
      'card_id' | 'now' | 'timezone'
    >

    const svc = new TSFSRSService()
    const scheduler = svc.forget({
      now,
      card_id,
      timezone,
      params: data.params,
      data: data.data,
      reset_count: data.reset_count
    })
    ctx.body = scheduler
  }

  rescheduler = async (ctx: Context) => {
    const { card_id, now, timezone } = <IPrevState>ctx.state
    const data = ctx.request.body as Omit<
      IReschedulerRequest,
      'card_id' | 'now' | 'timezone'
    >

    const svc = new TSFSRSService()
    const rescheduler = svc.rescheduler({
      now,
      card_id,
      timezone,
      params: data.params,
      data: {
        current_card: data.data?.current_card,
        history: data.data?.history ?? [],
        first_card: data.data?.first_card,
        skip_manual: data.data?.skip_manual ?? false,
        memory_state: data.data?.memory_state ?? false
      }
    })
    ctx.body = rescheduler
  }
}

const controller = new TSFSRSController()

export default controller
