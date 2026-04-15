import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: '10x — AI skills for systematic UI polish' },
      {
        name: 'description',
        content:
          '10x is a dependency-free skill pack for Claude Code and Codex that improves typography, color, spacing, depth, motion, and responsive quality.',
      },
      { name: 'author', content: 'Farirai Masocha' },
      { name: 'robots', content: 'index, follow' },
      { name: 'theme-color', content: '#f7f8f3' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: '10x' },
      { property: 'og:url', content: 'https://10x.fariraimasocha.co.zw/' },
      { property: 'og:title', content: '10x — AI skills for systematic UI polish' },
      {
        property: 'og:description',
        content:
          '10x is a dependency-free skill pack for Claude Code and Codex that improves typography, color, spacing, depth, motion, and responsive quality.',
      },
      { property: 'og:image', content: 'https://10x.fariraimasocha.co.zw/10x.png' },
      { property: 'og:image:secure_url', content: 'https://10x.fariraimasocha.co.zw/10x.png' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '3024' },
      { property: 'og:image:height', content: '1714' },
      { property: 'og:image:alt', content: '10x — AI skills for systematic UI polish' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@fariraijames' },
      { name: 'twitter:creator', content: '@fariraijames' },
      { name: 'twitter:title', content: '10x — AI skills for systematic UI polish' },
      {
        name: 'twitter:description',
        content:
          '10x is a dependency-free skill pack for Claude Code and Codex that improves typography, color, spacing, depth, motion, and responsive quality.',
      },
      { name: 'twitter:image', content: 'https://10x.fariraimasocha.co.zw/10x.png' },
      { name: 'twitter:image:alt', content: '10x — AI skills for systematic UI polish' },
    ],
    links: [
      { rel: 'canonical', href: 'https://10x.fariraimasocha.co.zw/' },
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/10x/favicon.svg' },
      { rel: 'apple-touch-icon', href: '/10x/apple-touch-icon.png' },
      { rel: 'manifest', href: '/manifest.json' },
    ],
  }),
  shellComponent: RootDocument,
  component: () => <Outlet />,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="noise-overlay" aria-hidden />
        {children}
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            { name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
