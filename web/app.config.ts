import { defineConfig } from '@tanstack/react-start/config'

export default defineConfig({
  server: {
    // Prerender all routes to static HTML for GitHub Pages (and any CDN/static host)
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
})
