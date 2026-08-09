import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig } from 'vitepress'

const HOSTNAME = 'https://laskewitz.io'

/**
 * Rewrites in-post Vue components into plain HTML for the feed.
 *
 * `createContentLoader`'s `render` gives us the markdown output, so a component
 * a post uses is still an unrendered custom element by the time it reaches the
 * feed. A reader can't run Vue, so `<PostFigure … />` would land in someone's
 * inbox as literal markup. Figures are the only component that appears inside
 * post prose; anything else added later needs a case here too.
 */
function componentsToHtml(html: string): string {
  return html.replace(
    /<PostFigure\b([\s\S]*?)\/>/g,
    (_match, attrs: string) => {
      const attr = (name: string) =>
        attrs.match(new RegExp(`${name}="([^"]*)"`))?.[1] ?? ''

      const src = attr('src')
      if (!src) return ''

      const url = src.startsWith('/') ? `${HOSTNAME}${src}` : src
      const alt = attr('alt')
      const caption = attr('caption')

      return (
        `<figure><img src="${url}" alt="${alt}" />` +
        (caption ? `<figcaption>${caption}</figcaption>` : '') +
        `</figure>`
      )
    }
  )
}

/**
 * Builds the RSS XML.
 *
 * The notice board has a paper edge: anyone can subscribe without an account,
 * an app, or a newsletter signup.
 */
export async function buildFeedXml(): Promise<string> {
  const feed = new Feed({
    id: HOSTNAME,
    link: HOSTNAME,
    title: 'Daniel Laskewitz — Blog',
    description:
      'Notes on Power Platform, Copilot Studio and building agents, from Daniel Laskewitz.',
    language: 'en-GB',
    image: `${HOSTNAME}/images/logo-white.png`,
    favicon: `${HOSTNAME}/images/icon.png`,
    copyright: `© ${new Date().getFullYear()} Daniel Laskewitz`,
    feedLinks: { rss: `${HOSTNAME}/feed.xml` }
  })

  const posts = await createContentLoader('blog/posts/*.md', {
    excerpt: true,
    render: true
  }).load()

  posts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date ?? 0) - +new Date(a.frontmatter.date ?? 0)
  )

  for (const { url, excerpt, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title ?? 'Untitled',
      id: `${HOSTNAME}${url}`,
      link: `${HOSTNAME}${url}`,
      description: frontmatter.description ?? excerpt,
      content: componentsToHtml(html ?? ''),
      category: (frontmatter.categories ?? []).map((name: string) => ({ name })),
      author: [
        {
          name: 'Daniel Laskewitz',
          link: HOSTNAME
        }
      ],
      date: new Date(frontmatter.date ?? Date.now())
    })
  }

  return feed.rss2()
}

/** Writes the feed into the build output.
 *
 * Two files, one document. GitHub Pages picks the Content-Type from the file
 * extension, and `.rss` maps to `application/rss+xml`, which browsers download
 * instead of render. `/feed.xml` is served as `application/xml`, so the link a
 * reader clicks actually shows something. `/feed.rss` stays for anyone already
 * subscribed to it.
 */
export async function generateFeed(config: SiteConfig): Promise<void> {
  const xml = await buildFeedXml()
  writeFileSync(path.join(config.outDir, 'feed.xml'), xml)
  writeFileSync(path.join(config.outDir, 'feed.rss'), xml)
}

/**
 * Serves the feed from the dev server.
 *
 * Without this the dev server answers the feed URL with the SPA HTML shell, so
 * the one link a reader is meant to subscribe to looks broken in development.
 */
export function rssDevPlugin() {
  return {
    name: 'wayfinding-rss-dev',
    apply: 'serve' as const,
    configureServer(server: { middlewares: { use: Function } }) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const pathname = req.url?.split('?')[0]
        if (pathname !== '/feed.rss' && pathname !== '/feed.xml') return next()
        try {
          const xml = await buildFeedXml()
          res.setHeader(
            'Content-Type',
            pathname === '/feed.xml'
              ? 'application/xml; charset=utf-8'
              : 'application/rss+xml; charset=utf-8'
          )
          res.end(xml)
        } catch (err) {
          next(err)
        }
      })
    }
  }
}
