import type { Context, Middleware, Next } from 'koa'

export default function cors(): Middleware {
  return async function use(context: Context, next: Next): Promise<Next> {
    context.set(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,POST,DELETE,PATCH'
    )
    context.set(
      'Access-Control-Allow-Origin',
      context.request.header.origin || context.request.origin
    )
    context.set('Access-Control-Allow-Headers', ['content-type'])
    context.set('Access-Control-Allow-Credentials', 'true')
    context.set('Content-Type', 'application/json; charset=utf-8')
    return next()
  }
}
