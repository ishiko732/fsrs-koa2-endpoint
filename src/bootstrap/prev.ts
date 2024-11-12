import type { Context, Middleware, Next } from 'koa'
import { CURRENT_TIMEZONE } from '../utils/convert'

export default function prev(): Middleware {
  return async function use(ctx: Context, next: Next): Promise<Next> {
    const timezone = ctx.header['x-timezone']
    const { card_id, now: query_now } = ctx.query

    const raw_current_mills = Number(query_now ?? NaN)
    const now = Number.isFinite(raw_current_mills /**seconds timestamp */)
      ? raw_current_mills * 1000
      : new Date().valueOf()

    const data = {
      now,
      card_id: card_id ? String(card_id) : undefined,
      timezone: timezone ? String(timezone) : CURRENT_TIMEZONE
    }
    ctx.state = data
    console.log(`req:${ctx.URL} state:${JSON.stringify(ctx.state)}`)

    ctx.set('x-vercel-region', process.env.VERCEL_REGION || 'unknown')
    ctx.set('x-now', data.now.toString())
    if (data.card_id) {
      ctx.set('x-card-id', data.card_id)
    }
    ctx.set('x-timezone', data.timezone)

    return next()
  }
}

export interface IPrevState {
  now: number
  card_id?: string
  timezone: string
}
