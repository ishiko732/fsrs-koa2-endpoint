import type { Context } from 'koa'
import { project } from '../../services/optimizer/fsrs-browser/constrant'
import { FSRSBrowserService } from '../../services/optimizer/fsrs-browser'
import { INextRequest } from '../../services/optimizer/fsrs-browser/types'

class FSRSBrowserController {
  intro = async (ctx: Context) => {
    ctx.body = project
  }

  scheduler = async (ctx: Context) => {
    const { d, s, r, ivl } = ctx.request.body as Omit<
      INextRequest,
      'card_id' | 'now' | 'timezone'
    >
    const svc = await new FSRSBrowserService().init()
    const scheduler = svc.state(d, s, r, ivl)
    ctx.body = scheduler
  }
}

const controller = new FSRSBrowserController()

export default controller
