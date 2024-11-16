import { TRouter } from '../bootstrap/types'
import tsfsrsRouters from '../controller/ts-fsrs/router'
import browserRouters from '../controller/fsrs-browser/router'
import nodejsRouters from '../controller/fsrs-rs-nodejs/router'
const root = {
  ...tsfsrsRouters,
  ...browserRouters,
  ...nodejsRouters
} satisfies TRouter

export default root
