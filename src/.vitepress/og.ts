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
 * The card is a dark room, so the substrate is fixed and the hall no longer
 * floods the frame. Sharing surfaces crop, tint and sit these images next to
 * each other; a black field keeps the set looking like one wall of signs
 * rather than five competing colour swatches.
 */
const SUBSTRATE = '#0a0a0a'
const OPTIC = '#ffffff'

/**
 * The hall palette, copied from style.css because a PNG cannot read a custom
 * property.
 *
 * `rule` is the field colour at full strength, used only for the solid band
 * above the wordmark — a bar is not text and carries no contrast floor.
 * `accent` is the same hall lifted until it clears the substrate, because
 * style.css bans small hall-coloured text on #0A0A0A and it means it: the blue
 * lands at 3.31:1 and the red at 3.89:1 against black. Lifting a and c is what
 * lets the kicker carry hall colour at all. Measured on #0A0A0A:
 * a 7.82 · b 8.75 · c 7.22 · d 16.74 · e 6.93.
 */
const HALLS: Record<Hall, { rule: string; accent: string }> = {
  a: { rule: '#1f4bff', accent: '#7aa0ff' },
  b: { rule: '#00c2a8', accent: '#00c2a8' },
  c: { rule: '#d6203a', accent: '#ff6b7f' },
  d: { rule: '#c8ff00', accent: '#c8ff00' },
  e: { rule: '#ff6b00', accent: '#ff6b00' }
}

interface Card {
  file: string
  kicker: string
  title: string
  hall: Hall
  /** The session's leading emoji, drawn as a mark above the title. */
  emoji?: string
}

const cards = new Map<string, Card>()

/**
 * The wordmark, inlined so the renderer never reaches for the network.
 *
 * Only the white lettering is needed now. The card used to flood the frame
 * with the hall colour, so the mark had to flip to dark type on lime and teal;
 * on a fixed black substrate there is nothing to flip against.
 */
const logo = (() => {
  const dir = path.join(import.meta.dirname ?? __dirname, '..', 'public', 'images')
  return `data:image/png;base64,${readFileSync(path.join(dir, 'logo-white.png')).toString('base64')}`
})()

const fonts = (() => {
  const dir = path.join(import.meta.dirname ?? __dirname, 'assets')
  return [
    { name: 'Archivo', data: readFileSync(path.join(dir, 'archivo-400.ttf')), weight: 400 as const, style: 'normal' as const },
    { name: 'Archivo', data: readFileSync(path.join(dir, 'archivo-800.ttf')), weight: 800 as const, style: 'normal' as const }
  ]
})()

/**
 * Emoji artwork comes from Twemoji (© Twitter, Inc and other contributors,
 * CC-BY 4.0) via the `@twemoji/svg` package, read off disk at build time so
 * the renderer still never reaches for the network.
 *
 * Archivo has no emoji glyphs and satori will not synthesise them, so an
 * emoji left in a text run renders as nothing at all. Each one is resolved to
 * an SVG and drawn as an image instead.
 */
const emojiDir = path.join(
  import.meta.dirname ?? __dirname,
  '..',
  '..',
  'node_modules',
  '@twemoji',
  'svg'
)

/**
 * Twemoji names a file after the emoji's code points, and drops the U+FE0F
 * variation selector that only tells a text renderer to draw in colour. The
 * full sequence is tried first so multi-code-point emoji still resolve.
 */
function emojiDataUri(emoji: string): string | undefined {
  const points = [...emoji].map((c) => c.codePointAt(0)!.toString(16))
  const candidates = [
    points.join('-'),
    points.filter((p) => p !== 'fe0f').join('-')
  ]
  for (const name of candidates) {
    try {
      const svg = readFileSync(path.join(emojiDir, `${name}.svg`)).toString('base64')
      return `data:image/svg+xml;base64,${svg}`
    } catch {
      /* Try the next spelling before giving up on the glyph. */
    }
  }
  return undefined
}

/** The leading emoji of a session title, when it opens with one. */
function leadingEmoji(title: string): string | undefined {
  const match = /^(\p{Extended_Pictographic}\uFE0F?)/u.exec(title)
  return match?.[1]
}

/**
 * The emoji belongs to the session, not to the page title.
 *
 * Page titles stay plain because they are also the browser tab and the
 * `og:title` text, so the mark is looked up from the talk record instead and
 * both the placard and its resource door inherit it.
 */
function emojiFor(relativePath: string): string | undefined {
  const match = /^(?:talks|r)\/([^/]+)\/index\.md$/.exec(relativePath)
  if (!match) return undefined
  const talk = talks.find((t) => t.slug === match[1] || t.resourceSlug === match[1])
  return talk ? leadingEmoji(talk.title) : undefined
}

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
  if (relativePath.startsWith('r/')) return 'Resources'
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
 * The resource door already says "resources" in its kicker, and the
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

/**
 * A title is usually one text run, and stays one so that satori wraps it on
 * word boundaries exactly as before. Only a title carrying an emoji is cut
 * into runs, because each emoji has to become an image to render at all —
 * `Copilot Studio ❤️ MCP` otherwise sets two tofu boxes in 72px type.
 */
function titleChildren(title: string, size: number): unknown {
  if (!/\p{Extended_Pictographic}/u.test(title)) return title

  const parts = title.split(/(\p{Extended_Pictographic}\uFE0F?)/u).filter(Boolean)
  return parts.map((part) => {
    const isEmoji = /^\p{Extended_Pictographic}/u.test(part)
    const uri = isEmoji ? emojiDataUri(part) : undefined
    if (!uri) {
      /* Archivo will set this as tofu, which is worth saying out loud rather
         than shipping a card with two empty boxes in the largest type. */
      if (isEmoji) console.warn(`[og] no Twemoji artwork for ${part}, card will show tofu`)
      return {
        type: 'span',
        props: { style: { display: 'flex' }, children: part }
      }
    }
    return {
      type: 'img',
      props: {
        src: uri,
        width: Math.round(size * 0.78),
        height: Math.round(size * 0.78),
        /* Flex drops the spaces either side of the run, so the gap the title
           was written with has to be put back by hand. */
        style: { margin: '0 0.12em' }
      }
    }
  })
}

async function renderCard(card: Card): Promise<Buffer> {
  const { rule, accent } = HALLS[card.hall]
  const mark = card.emoji ? emojiDataUri(card.emoji) : undefined

  /* The mark is a sign, not punctuation, so it sits on its own line above the
     title rather than inline where a wrapped title would drag it off centre. */
  const titleBlock = [
    ...(mark
      ? [{ type: 'img', props: { src: mark, width: 72, height: 72, style: { marginBottom: 22 } } }]
      : []),
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          fontSize: titleSize(card.title),
          fontWeight: 800,
          lineHeight: 1.02,
          letterSpacing: '-0.01em',
          textTransform: 'uppercase'
        },
        children: titleChildren(card.title, titleSize(card.title))
      }
    }
  ]

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
          background: SUBSTRATE,
          color: OPTIC,
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
                color: accent
              },
              children: card.kicker
            }
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column' },
              children: titleBlock
            }
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column' },
              children: [
                {
                  type: 'div',
                  props: { style: { display: 'flex', height: 8, background: rule }, children: '' }
                },
                {
                  type: 'img',
                  props: {
                    src: logo,
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
    hall: hallFor(relativePath),
    emoji: emojiFor(relativePath)
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
