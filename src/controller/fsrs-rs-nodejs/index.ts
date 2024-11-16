import type { Context } from 'koa'
import { project } from '../../services/optimizer/fsrs-rs-nodejs/constrant'

class FSRSNodejsController {
  intro = async (ctx: Context) => {
    ctx.body = project
  }
}

const controller = new FSRSNodejsController()

export default controller
