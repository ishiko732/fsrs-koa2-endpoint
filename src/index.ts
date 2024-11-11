import createServer from '@bootstrap/index'
import { config } from 'dotenv'
import type { Server } from 'http'

module.exports = (async (): Promise<Server> => {
  const app = await createServer()
  return app.listen(3000, () => {
    config() // load .env file
    console.log(
      `server listening on ${process.env.PORT || 3000}, in ${
        process.env.NODE_ENV || 'production'
      } mode.`
    )
  })
})()
