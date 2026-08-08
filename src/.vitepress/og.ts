import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import type { PageData, SiteConfig } from 'vitepress'
import { talks } from './data/talks'
import type { Hall } from './data/types'

const HOSTNAME = 'https://laskewitz.io'
const WIDTH = 1200
const HEIGHT = 630

/**
 * The hall palette, copied from style.css because a PNG cannot read a custom
 * property. These two lists are checked against each other by the build.
 */
const HALLS: Record<Hall, { field: string; ink: string }> = {
  a: { field: '#1f4bff', ink: '#ffffff' },
  b: { field: '#00c2a8', ink: '#04231f' },
  c: { field: '#d6203a', ink: '#ffffff' },
  d: { field: '#c8ff00', ink: '#101400' },
  e: { field: '#ff6b00', ink: '#1a0a00' }
}

interface Card {
  file: string
  kicker: string
  title: string
  hall: Hall
}

const cards = new Map<string, Card>()

/**
 * The wordmark, inlined so the renderer never reaches for the network.
 *
 * Two variants exist because the mark carries type: white lettering vanishes
 * on the lime and teal halls, dark lettering vanishes on the blue and red
 * ones. The hall's own ink colour already encodes which way round it goes.
 */
const logos = (() => {
  const dir = path.join(import.meta.dirname ?? __dirname, '..', 'public', 'images')
  const read = (file: string) =>
    `data:image/png;base64,${readFileSync(path.join(dir, file)).toString('base64')}`
  return { light: read('logo-white.png'), dark: read('logo-dark.png') }
})()

const fonts = (() => {
  const dir = path.join(import.meta.dirname ?? __dirname, 'assets')
  return [
    { name: 'Archivo', data: readFileSync(path.join(dir, 'archivo-400.ttf')), weight: 400 as const, style: 'normal' as const },
    { name: 'Archivo', data: readFileSync(path.join(dir, 'archivo-800.ttf')), weight: 800 as const, style: 'normal' as const }
  ]
})()

/** `r/mcp/index.md` → `r-mcp`, which is also the card's file name. */
function cardId(relativePath: string): string {
  const clean = relativePath.replace(/\.md$/, '').replace(/\/index$/, '')
  return clean === '' ? 'home' : clean.replace(/\//g, '-')
}

/** `r/mcp/index.md` → `/r/mcp/`, matching cleanUrls. */
function pageUrl(relativePath: string): string {
  const clean = relativePath.replace(/\.md$/, '')
  if (clean === 'index') return `${HOSTNAME}/`
  if (clean.endsWith('/index')) return `${HOSTNAME}/${clean.replace(/\/index$/, '')}/`
  return `${HOSTNAME}/${clean}`
}

/**
 * The small line above the title. It says which part of the venue you are
 * standing in, so a shared link reads as a sign rather than a page title
 * floating on a coloured rectangle.
 */
function kickerFor(relativePath: string): string {
  if (relativePath.startsWith('r/')) return 'Session resources'
  if (relativePath.startsWith('talks/')) return relativePath === 'talks/index.md' ? 'Talks' : 'Talk'
  if (relativePath.startsWith('events/')) return 'Speaking record'
  if (relativePath.startsWith('blog/')) return 'Blog'
  if (relativePath === 'index.md') return 'Principal Cloud Advocate · Microsoft'
  return 'Daniel Laskewitz'
}

/** A talk page and its resource door are the same session, so same colour. */
function hallFor(relativePath: string): Hall {
  const match = /^(?:talks|r)\/([^/]+)\/index\.md$/.exec(relativePath)
  if (match) {
    const talk = talks.find((t) => t.slug === match[1] || t.resourceSlug === match[1])
    if (talk) return talk.hall
  }
  if (relativePath.startsWith('blog/')) return 'c'
  if (relativePath.startsWith('talks/')) return 'b'
  return 'a'
}

/**
 * The resource door already says "session resources" in its kicker, and the
 * events page already says it is the speaking record. Repeating that in the
 * title wastes the largest type on the card.
 */
function trimTitle(title: string): string {
  return title
    .replace(/\s*[—-]\s*session resources$/i, '')
    .replace(/\s*\|\s*Daniel Laskewitz$/i, '')
    .trim()
}

/** Big enough to read on a phone, small enough that the longest title fits. */
function titleSize(title: string): number {
  if (title.length <= 34) return 92
  if (title.length <= 64) return 72
  return 56
}

async function renderCard(card: Card): Promise<Buffer> {
  const { field, ink } = HALLS[card.hall]

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: field,
          color: ink,
          padding: '64px 72px',
          fontFamily: 'Archivo'
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                opacity: 0.85
              },
              children: card.kicker
            }
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: titleSize(card.title),
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: '-0.01em',
                textTransform: 'uppercase'
              },
              children: card.title
            }
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column' },
              children: [
                {
                  type: 'div',
                  props: { style: { display: 'flex', height: 8, background: ink }, children: '' }
                },
                {
                  type: 'img',
                  props: {
                    src: ink === '#ffffff' ? logos.light : logos.dark,
                    width: 191,
                    height: 56,
                    style: { marginTop: 26 }
                  }
                }
              ]
            }
          }
        ]
      }
    },
    { width: WIDTH, height: HEIGHT, fonts }
  )

  return Buffer.from(new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng())
}

/**
 * Fills in the sharing meta for one page and registers its card.
 *
 * VitePress ships no Open Graph tags of its own, so a shared link fell back to
 * the site logo, which is a wide mark being cropped into a square well. Every
 * page now carries its own card, title and description.
 */
export function transformPageData(pageData: PageData) {
  const { relativePath, frontmatter } = pageData
  const title = trimTitle(pageData.title || frontmatter.title || 'Daniel Laskewitz')
  const description = frontmatter.description || ''
  const id = cardId(relativePath)
  const image = `${HOSTNAME}/images/og/${id}.png`

  /* An index page would otherwise print its own name twice, once small and
     once large. The name goes in the slot instead. */
  const kicker = kickerFor(relativePath)
  const same = (a: string, b: string) =>
    a.toLowerCase().replace(/s$/, '') === b.toLowerCase().replace(/s$/, '')
  cards.set(id, {
    file: `${id}.png`,
    kicker: same(kicker, title) ? 'Daniel Laskewitz' : kicker,
    title,
    hall: hallFor(relativePath)
  })

  frontmatter.head ??= []
  const isPost = relativePath.startsWith('blog/posts/')
  frontmatter.head.push(['meta', { property: 'og:type', content: isPost ? 'article' : 'website' }])
  if (isPost && frontmatter.date) {
    frontmatter.head.push([
      'meta',
      { property: 'article:published_time', content: new Date(frontmatter.date).toISOString() }
    ])
  }
  frontmatter.head.push(
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: pageUrl(relativePath) }],
    ['meta', { property: 'og:image', content: image }],
    ['meta', { property: 'og:image:width', content: String(WIDTH) }],
    ['meta', { property: 'og:image:height', content: String(HEIGHT) }],
    ['meta', { property: 'og:image:alt', content: title }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: image }]
  )
}

/** Writes every registered card into the build output. */
export async function renderOgCards(siteConfig: SiteConfig): Promise<void> {
  const dir = path.join(siteConfig.outDir, 'images', 'og')
  mkdirSync(dir, { recursive: true })

  for (const card of cards.values()) {
    writeFileSync(path.join(dir, card.file), await renderCard(card))
  }
}
