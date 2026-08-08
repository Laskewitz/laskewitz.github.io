import { defineConfig } from 'vitepress'
import { DIRECTION_CONTRACT } from './contract'
import { renderOgCards, transformPageData } from './og'
import { generateFeed, rssDevPlugin } from './rss'

export default defineConfig({
  title: 'Daniel Laskewitz',
  description:
    'Speaking record, talks, session resources and writing from Daniel Laskewitz.',
  lang: 'en-GB',
  cleanUrls: true,
  /** The room is half-lit and the phone is the light source. Dark is home. */
  appearance: 'dark',
  lastUpdated: false,
  srcExclude: ['**/README.md'],
  sitemap: { hostname: 'https://laskewitz.io' },

  /** The feed is written in buildEnd, so the link checker can't see it yet. */
  ignoreDeadLinks: [/^\/feed\.(rss|xml)$/],

  /** ...and the dev server serves it from memory, so the link works there too. */
  vite: { plugins: [rssDevPlugin()] },

  head: [
    ['link', { rel: 'icon', href: '/images/icon.png' }],
    [
      'link',
      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: '/fonts/archivo-latin.woff2',
        crossorigin: ''
      }
    ],
    [
      'link',
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Daniel Laskewitz — Blog',
        href: 'https://laskewitz.io/feed.xml'
      }
    ],
    ['meta', { name: 'theme-color', content: '#0a0a0a' }],
    ['meta', { property: 'og:site_name', content: 'Daniel Laskewitz' }],
    ['meta', { name: 'twitter:site', content: '@laskewitz' }]
  ],

  themeConfig: {
    logo: { light: '/images/logo-dark.png', dark: '/images/logo-white.png' },
    siteTitle: false,

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Events', link: '/events/' },
      { text: 'Talks', link: '/talks/' },
      { text: 'Blogs', link: '/blog/' }
    ],

    sidebar: false,
    outline: false,
    aside: false,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/laskewitz' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/laskewitz' },
      { icon: 'x', link: 'https://x.com/laskewitz' }
    ],

    search: { provider: 'local' },

    footer: {
      message:
        'Personal site. Opinions are mine. <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/feed.xml">RSS</a>',
      copyright: `© ${new Date().getFullYear()} Daniel Laskewitz`
    }
  },

  transformHtml(code) {
    return code.replace('<head>', `<head>\n${DIRECTION_CONTRACT}`)
  },

  transformPageData,

  async buildEnd(siteConfig) {
    await generateFeed(siteConfig)
    await renderOgCards(siteConfig)
  }
})
