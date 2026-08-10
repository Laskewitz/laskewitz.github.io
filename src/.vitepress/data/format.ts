import type { EventRecord } from './types'
import { FLAG_CODES } from './flags'

/**
 * Flags as artwork, not as text.
 *
 * Flag emoji are the one glyph a platform can refuse: Windows renders the bare
 * country letters, and every renderer that does draw a flag draws its own. The
 * SVGs in `public/images/flags` come from Twemoji via `npm run flags`, so the
 * board reads the same on every machine. A country with no artwork — `ZZ` for
 * online — returns nothing rather than a broken image.
 */
export function flagSrc(country: string): string {
  if (!FLAG_CODES.has(country)) return ''
  return `/images/flags/${country.toLowerCase()}.svg`
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

/**
 * Split a date without letting a timezone shift it.
 *
 * Accepts a plain `YYYY-MM-DD` and a full ISO datetime, because post
 * frontmatter round-trips through `toISOString()` on the way to the loader
 * while event dates stay bare.
 */
function parts(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number)
  return { y, m: m - 1, d }
}

/**
 * Dates in the signage register: short, tabular, unambiguous across the ~25
 * countries this record covers, so no 03/04 guessing games.
 */
export function formatEventDate(event: EventRecord): string {
  const s = parts(event.start)
  if (!event.end) return `${s.d} ${MONTHS[s.m]} ${s.y}`

  const e = parts(event.end)
  if (s.y !== e.y) {
    return `${s.d} ${MONTHS[s.m]} ${s.y} - ${e.d} ${MONTHS[e.m]} ${e.y}`
  }
  if (s.m !== e.m) return `${s.d} ${MONTHS[s.m]} - ${e.d} ${MONTHS[e.m]} ${s.y}`
  return `${s.d}-${e.d} ${MONTHS[s.m]} ${s.y}`
}

export function formatPostDate(iso: string): string {
  const p = parts(iso)
  return `${p.d} ${MONTHS[p.m]} ${p.y}`
}

export function eventPlace(event: EventRecord): string {
  if (event.online) return 'Online'
  return `${event.city}, ${event.countryName}`
}

export function eventYear(event: EventRecord): string {
  return event.start.slice(0, 4)
}

