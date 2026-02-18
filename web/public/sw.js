/* PesaMirror PWA - minimal service worker for installability */
const CACHE = 'pesamirror-v1'

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', () => {
  /* network-first; no cache for now to keep logic simple */
})
