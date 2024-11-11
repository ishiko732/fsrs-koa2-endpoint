import type { Middleware } from 'koa'

type IMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'
interface IRouter {
  method: IMethod | IMethod[]
  path: string
  endpoint: Middleware
}

export type TRouter = Record<`${string}/${string}`, IRouter>
