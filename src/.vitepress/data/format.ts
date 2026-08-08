import type { EventRecord } from './types'

/**
 * Flags from ISO codes. The UK nations have no ISO alpha-2 flag emoji, so they
 * use their subdivision sequences; anything without a real flag returns nothing
 * rather than a placeholder box.
 */
const FLAG_OVERRIDES: Record<string, string> = {
  'GB-SCT': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'GB-WLS': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'GB-ENG': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  ZZ: ''
}

export function flag(country: string): string {
  if (country in FLAG_OVERRIDES) return FLAG_OVERRIDES[country]
  if (!/^[A-Z]{2}$/.test(country)) return ''
  return String.fromCodePoint(
    ...[...country].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  )
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
    return `${s.d} ${MONTHS[s.m]} ${s.y} — ${e.d} ${MONTHS[e.m]} ${e.y}`
  }
  if (s.m !== e.m) return `${s.d} ${MONTHS[s.m]} — ${e.d} ${MONTHS[e.m]} ${s.y}`
  return `${s.d}—${e.d} ${MONTHS[s.m]} ${s.y}`
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

/** Days until an event starts. Negative once it has begun. */
export function daysUntil(event: EventRecord, now: Date = new Date()): number {
  const start = new Date(`${event.start}T00:00:00`).getTime()
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime()
  return Math.round((start - today) / 86_400_000)
}
