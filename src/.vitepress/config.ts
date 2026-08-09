import { defineConfig } from 'vitepress'
import { DIRECTION_CONTRACT } from './contract'
import { addJsonLd } from './jsonld'
import { renderOgCards, transformPageData as addSharingMeta } from './og'
import { generateFeed, rssDevPlugin } from './rss'

/**
 * Surfaces that carry `noindex`: the QR-code resource doors and the legacy
 * redirects. Listing them in the sitemap while asking robots not to index them
 * sends a crawler two contradictory instructions, so they are filtered out
 * here as well as disallowed in robots.txt.
 */
const UNLISTED = /^\/(r|sessions)\//

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
  sitemap: {
    hostname: 'https://laskewitz.io',
    transformItems: (items) => items.filter((item) => !UNLISTED.test(item.url.startsWith('/') ? item.url : `/${item.url}`))
  },

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
      { text: 'Blogs', link: '/blog/' },
      { text: 'About', link: '/about/' }
    ],

    sidebar: false,
    outline: false,
    aside: false,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/laskewitz' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/laskewitz' },
      { icon: 'x', link: 'https://x.com/laskewitz' }
    ],

    footer: {
      message:
        'Personal site. Opinions are mine. <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/feed.xml">RSS</a>',
      copyright: `© ${new Date().getFullYear()} Daniel Laskewitz`
    }
  },

  transformHtml(code) {
    return code.replace('<head>', `<head>\n${DIRECTION_CONTRACT}`)
  },

  transformPageData(pageData) {
    addSharingMeta(pageData)
    addJsonLd(pageData)
  },

  async buildEnd(siteConfig) {
    await generateFeed(siteConfig)
    await renderOgCards(siteConfig)
  }
})
