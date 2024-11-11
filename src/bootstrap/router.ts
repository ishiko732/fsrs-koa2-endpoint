import { TRouter } from '@bootstrap/types'
import Router from 'koa-router'

export default function routers(root: TRouter): Router {
  const router = new Router()
  for (const name in root) {
    const route = root[name as `${string}/${string}`]
    if (!Array.isArray(route.method)) {
      route.method = [route.method]
    }
    const [prefix, ctx] = name.split('/')
    router.register(`/${prefix}${route.path}`, route.method, route.endpoint, {
      prefix,
      name: ctx
    })
  }

  return router
}
