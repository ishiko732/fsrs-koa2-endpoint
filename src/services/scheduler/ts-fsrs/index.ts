import { createEmptyCard, fsrs, Grade, TypeConvert } from 'ts-fsrs'
import { cardHandler, recordHandler, recordItemHandler } from './handlers'
import { TCard, TRecordLog, TRecordLogItem } from '../types'
import { CURRENT_TIMEZONE } from '../../../utils/convert'
import {
  ICreateRequest,
  IForgetRequest,
  IReschedulerRequest,
  IRetrievabilityRequest,
  IRollbackRequest,
  ISchedulerRequest
} from './types'

export class TSFSRSService {
  create({ now, card_id = '', timezone = CURRENT_TIMEZONE }: ICreateRequest) {
    const handler = cardHandler.bind(null, card_id, timezone)
    const card = createEmptyCard<TCard>(now, handler)

    return card
  }

  retrievability({ data: card, card_id, params, now }: IRetrievabilityRequest) {
    const f = fsrs(params)
    const retrievability = f.get_retrievability(card, now, false)

    return {
      card_id: card_id || undefined,
      retrievability: retrievability,
      retrievability_string: `${(retrievability * 100).toFixed(2)}%`,
      now: now
    }
  }

  scheduler({
    now,
    card_id = '',
    timezone = CURRENT_TIMEZONE,
    params,
    data: card,
    grade
  }: ISchedulerRequest) {
    // repeat the card
    const f = fsrs(params)

    let scheduler: TRecordLog | TRecordLogItem
    if (grade) {
      const handler = recordItemHandler.bind(null, card_id, timezone)
      scheduler = f.next<TRecordLogItem>(
        card,
        now,
        TypeConvert.rating(grade) as Grade,
        handler
      )
    } else {
      const handler = recordHandler.bind(null, card_id, timezone)
      scheduler = f.repeat<TRecordLog>(card, now, handler)
      // rescheduler[grade] = f.next(card, now, TypeConvert.rating(grade) as Grade, recordItemHandler)
    }
    return scheduler
  }

  rollback({ data: item, params, card_id, timezone }: IRollbackRequest) {
    // rollback
    const { card, log } = item
    const f = fsrs(params)

    const handler = cardHandler.bind(null, card_id ?? '', timezone)
    const rollbackItem = f.rollback(card, log, handler)
    return rollbackItem
  }

  forget({
    data: card,
    params,
    card_id,
    timezone,
    reset_count,
    now
  }: IForgetRequest) {
    // forget
    const f = fsrs(params)

    const handler = recordItemHandler.bind(null, card_id ?? '', timezone)
    const forgetItem = f.forget(card, now, reset_count, handler)
    return forgetItem
  }

  rescheduler({
    card_id,
    timezone,
    params,
    data: { current_card, first_card, history, skip_manual, memory_state },
    now
  }: IReschedulerRequest) {
    // reschedule the card
    const f = fsrs(params)

    const handler = recordItemHandler.bind(null, card_id ?? '', timezone)
    const rescheduler = f.reschedule(current_card, history, {
      recordLogHandler: handler,
      reviewsOrderBy: undefined,
      skipManual: skip_manual,
      update_memory_state: memory_state,
      now: now,
      first_card: first_card
    })
    return rescheduler
  }
}
