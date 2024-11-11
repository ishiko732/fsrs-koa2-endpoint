import createServer from './bootstrap/index'
import { config } from 'dotenv'

const app = createServer()
app.listen(3000, () => {
  config() // load .env file
  console.log(
    `server listening on ${process.env.PORT || 3000}, in ${
      process.env.NODE_ENV || 'production'
    } mode.`
  )
})

export default app
