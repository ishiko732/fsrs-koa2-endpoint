import type { Context } from 'koa'
import { project } from '../../services/optimizer/fsrs-browser/constrant'
import { FSRSBrowserService } from '../../services/optimizer/fsrs-browser'
import { INextRequest } from '../../services/optimizer/fsrs-browser/types'
import { readFileSync } from 'node:fs'
import { analyzeCSV } from '../../services/optimizer/collect'

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

  train = async (ctx: Context) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { file } = ctx.request.files as unknown as any
    const text = readFileSync(file.filepath, { encoding: 'utf-8' })

    const result = await analyzeCSV(text)
    const svc = await new FSRSBrowserService().init()
    ctx.body = await svc.train(true, result.fsrs_items)
  }
}

const controller = new FSRSBrowserController()

export default controller
