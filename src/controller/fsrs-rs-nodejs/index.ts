import type { Context } from 'koa'
import { project } from '../../services/optimizer/fsrs-rs-nodejs/constrant'
import { analyzeCSV } from '../../services/optimizer/fsrs-rs-nodejs/collect'
import { readFileSync } from 'node:fs'
import { trainTask } from '../../services/optimizer/fsrs-rs-nodejs/train_task'
class FSRSNodejsController {
  intro = async (ctx: Context) => {
    ctx.body = project
  }
  train = async (ctx: Context) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { file } = ctx.request.files as unknown as any
    const text = readFileSync(file.filepath, { encoding: 'utf-8' })

    const result = await analyzeCSV(text)
    const train = await trainTask(true, result.fsrs_items)
    ctx.body = train
  }
}

const controller = new FSRSNodejsController()

export default controller
