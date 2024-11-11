import type { Context } from 'koa'

class TSFSRSController {
  hello = async (ctx: Context) => {
    ctx.body = {
      message: 'Hello World'
    }
  }
}

const controller = new TSFSRSController()

export default controller
