import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const TITLE = 'Morning Maker Show — yearly stats'
const DESCRIPTION =
  'Yearly impressions for Dan, Sandra and the Morning Maker Show across X, YouTube and LinkedIn, Sep 2025 to Sep 2026.'

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { name: 'theme-color', content: '#7e22ce' },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: '/og.png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'Morning Maker Show — yearly stats' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: '/og.png' },
      { name: 'twitter:creator', content: '@d4m1n' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { rel: 'icon', href: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { rel: 'icon', href: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', href: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
