import { TRouter } from '../bootstrap/types'
import tsfsrsRouters from '../controller/ts-fsrs/router'

const root = {
  ...tsfsrsRouters
} satisfies TRouter

export default root
