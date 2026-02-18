import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const basePath = typeof import.meta.env.BASE_URL === 'string'
    ? import.meta.env.BASE_URL.replace(/\/$/, '') || undefined
    : undefined

  const router = createTanStackRouter({
    routeTree,
    basepath: basePath,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
