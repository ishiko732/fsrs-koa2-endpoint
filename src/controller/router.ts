import { TRouter } from '../bootstrap/types'
import tsfsrsRouters from '../controller/ts-fsrs/router'
import browserRouters from '../controller/fsrs-browser/router'

const root = {
  ...tsfsrsRouters,
  ...browserRouters
} satisfies TRouter

export default root
