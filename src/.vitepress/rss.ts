import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig } from 'vitepress'

const HOSTNAME = 'https://laskewitz.io'

/**
 * Writes /feed.rss at build time.
 *
 * The notice board has a paper edge: anyone can subscribe without an account,
 * an app, or a newsletter signup.
 */
export async function generateFeed(config: SiteConfig): Promise<void> {
  const feed = new Feed({
    id: HOSTNAME,
    link: HOSTNAME,
    title: 'Daniel Laskewitz — Writing',
    description:
      'Notes on Power Platform, Copilot Studio and building agents, from Daniel Laskewitz.',
    language: 'en-GB',
    image: `${HOSTNAME}/images/logo-white.png`,
    favicon: `${HOSTNAME}/images/icon.png`,
    copyright: `© ${new Date().getFullYear()} Daniel Laskewitz`,
    feedLinks: { rss: `${HOSTNAME}/feed.rss` }
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
      content: html,
      author: [
        {
          name: 'Daniel Laskewitz',
          link: HOSTNAME
        }
      ],
      date: new Date(frontmatter.date ?? Date.now())
    })
  }

  writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2())
}
