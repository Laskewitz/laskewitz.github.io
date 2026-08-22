import { writeFileSync } from 'node:fs'
import path from 'node:path'
import type { SiteConfig } from 'vitepress'
import { events } from './data/events'
import { eventPlace } from './data/format'
import { talksAtEvent } from './data/talks'
import type { EventRecord } from './data/types'

const HOSTNAME = 'https://laskewitz.io'

/** The calendar's own identity, so a subscribed client can tell two feeds apart. */
const PRODID = '-//Daniel Laskewitz//Speaking calendar//EN'

/**
 * Text as iCalendar wants it: commas, semicolons and backslashes carry meaning
 * inside a property value, and a literal newline ends the property, so each has
 * to be spelled out rather than passed through.
 */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

/**
 * RFC 5545 lines are 75 octets wide, and a continuation starts with a space.
 * Folding is counted in bytes rather than characters because an event name can
 * hold an emoji, and splitting one mid-sequence hands the client mojibake.
 */
function fold(line: string): string {
  const bytes = Buffer.from(line, 'utf8')
  if (bytes.length <= 75) return line

  const chunks: string[] = []
  let start = 0
  while (start < bytes.length) {
    const limit = start === 0 ? 75 : 74
    let end = Math.min(start + limit, bytes.length)
    // Never cut inside a multi-byte character: 0b10xxxxxx is a continuation byte.
    while (end < bytes.length && (bytes[end] & 0xc0) === 0x80) end--
    chunks.push(
      (start === 0 ? '' : ' ') + bytes.subarray(start, end).toString('utf8')
    )
    start = end
  }
  return chunks.join('\r\n')
}

/** `YYYY-MM-DD` into the bare `YYYYMMDD` an all-day date property takes. */
function dateValue(iso: string): string {
  return iso.slice(0, 10).replace(/-/g, '')
}

/**
 * The day after the last day.
 *
 * `DTEND` on an all-day event is exclusive, so a conference that ends on the
 * 3rd has to say the 4th or calendars draw it a day short.
 */
function dayAfter(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number)
  const next = new Date(Date.UTC(y, m - 1, d + 1))
  return dateValue(next.toISOString())
}

function timestamp(now: Date): string {
  return `${now.toISOString().slice(0, 19).replace(/[-:]/g, '')}Z`
}

/**
 * What the entry says once it's sitting in someone's week: where it is, what
 * I'm giving there, and where to read more. The talk titles matter most — the
 * event name alone doesn't say whether a day is a stage or a seat.
 */
function description(event: EventRecord): string {
  const lines: string[] = []
  const given = talksAtEvent(event.slug)

  for (const talk of given) {
    lines.push(`${talk.format === 'workshop' ? 'Workshop' : 'Session'}: ${talk.title}`)
  }
  if (given.length) lines.push('')
  if (event.website) lines.push(event.website)
  lines.push(`${HOSTNAME}/events/`)

  return lines.join('\n')
}

/**
 * The line a month view actually shows.
 *
 * A one-off event needs nothing but its name. A recurring one does: the year
 * separates its editions, and for a travelling series the city separates two
 * stops in the same year — four rows reading "Fly With Copilot" are four
 * identical rows, and the city is buried in LOCATION where a grid view never
 * draws it. Both qualifiers are earned rather than always printed, so a name
 * that only ever happens once stays clean.
 */
function summary(event: EventRecord): string {
  const place = event.online ? 'Online' : event.city
  const namesakes = events.filter(
    (other) => other.slug !== event.slug && other.name === event.name
  )
  const travels = namesakes.some(
    (other) => (other.online ? 'Online' : other.city) !== place
  )

  const qualifiers = [
    ...(travels ? [place] : []),
    ...(namesakes.length ? [event.start.slice(0, 4)] : [])
  ]

  return qualifiers.length
    ? `Daniel @ ${event.name} (${qualifiers.join(', ')})`
    : `Daniel @ ${event.name}`
}

function toVevent(event: EventRecord, stamp: string): string[] {
  const lines = [
    'BEGIN:VEVENT',
    `UID:${event.slug}@laskewitz.io`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${dateValue(event.start)}`,
    `DTEND;VALUE=DATE:${dayAfter(event.end ?? event.start)}`,
    `SUMMARY:${escapeText(summary(event))}`,
    `LOCATION:${escapeText(eventPlace(event))}`,
    `DESCRIPTION:${escapeText(description(event))}`,
    'TRANSP:TRANSPARENT'
  ]
  if (event.website) lines.push(`URL:${event.website}`)
  lines.push('END:VEVENT')
  return lines
}

/**
 * Builds the calendar.
 *
 * Subscribe once and the record keeps itself current, because the file is
 * written from `events.ts` on every build. Nothing on the site links to it —
 * it's a private subscription URL, not a published surface. Past
 * events stay in — a calendar that forgets where I've been is a worse record
 * than the page it comes from.
 */
export function buildCalendar(now: Date = new Date()): string {
  const stamp = timestamp(now)

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${PRODID}`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Daniel Laskewitz — Speaking',
    'X-WR-CALDESC:Every event Daniel Laskewitz is speaking at\\, past and upcoming.',
    'X-WR-TIMEZONE:Europe/Amsterdam',
    /** Roughly how often a client may refresh; the build runs nightly anyway. */
    'REFRESH-INTERVAL;VALUE=DURATION:PT12H',
    'X-PUBLISHED-TTL:PT12H'
  ]

  const ordered = [...events].sort((a, b) => a.start.localeCompare(b.start))
  for (const event of ordered) lines.push(...toVevent(event, stamp))

  lines.push('END:VCALENDAR')

  return lines.map(fold).join('\r\n') + '\r\n'
}

/** Writes the calendar into the build output, next to the feed. */
export function generateCalendar(config: SiteConfig): void {
  writeFileSync(path.join(config.outDir, 'events.ics'), buildCalendar())
}

/**
 * Serves the calendar from the dev server, for the same reason the feed is
 * served there: the URL is meant to be handed out, so it should not answer with
 * the SPA shell while it's being worked on.
 */
export function icsDevPlugin() {
  return {
    name: 'wayfinding-ics-dev',
    apply: 'serve' as const,
    configureServer(server: { middlewares: { use: Function } }) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url?.split('?')[0] !== '/events.ics') return next()
        res.setHeader('Content-Type', 'text/calendar; charset=utf-8')
        res.end(buildCalendar())
      })
    }
  }
}
