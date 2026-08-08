import type { Speaker } from './types'

/**
 * The speaker index.
 *
 * One fact, one place. Everywhere a person appears — a session placard, a talk
 * delivery, the billing on a resource page — reads from here. Adding a
 * co-speaker is one entry, never an edit to a page.
 */
export const speakers: Record<string, Speaker> = {
  laskewitz: {
    slug: 'laskewitz',
    name: 'Daniel Laskewitz',
    role: 'Principal Cloud Advocate',
    company: 'Microsoft',
    links: [
      { label: 'Website', href: 'https://laskewitz.io' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/laskewitz' },
      { label: 'GitHub', href: 'https://github.com/laskewitz' },
      { label: 'X', href: 'https://x.com/laskewitz' },
      { label: 'YouTube', href: 'https://youtube.com/daniellaskewitz' }
    ]
  },
  appieschot: {
    slug: 'appieschot',
    name: 'Albert-Jan Schot',
    role: 'CTO',
    company: 'Blis Digital',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/albertjanschot/' },
      { label: 'GitHub', href: 'https://github.com/appieschot' }
    ]
  },
  mnecker: {
    slug: 'mnecker',
    name: 'Mats Necker',
    role: 'CEO',
    company: 'Dhino',
    links: [
      { label: 'Website', href: 'https://dhino.io/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/matsnecker/' },
      { label: 'GitHub', href: 'https://github.com/mnecker' }
    ]
  },
  aprildunnam: {
    slug: 'aprildunnam',
    name: 'April Dunnam',
    role: 'Principal Cloud Advocate',
    company: 'Microsoft',
    links: [
      { label: 'LinkedIn', href: 'https://linkedin.com/in/aprildunnam' },
      { label: 'GitHub', href: 'https://github.com/aprildunnam' },
      { label: 'YouTube', href: 'https://youtube.com/@aprildunnam' }
    ]
  },
  agniusbartninkas: {
    slug: 'agniusbartninkas',
    name: 'Agnius Bartninkas',
    role: 'CEO',
    company: 'Herexis',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/agnius-bartninkas/' },
      { label: 'GitHub', href: 'https://github.com/AgniusBartninkas' }
    ]
  },
  cathrinebruvold: {
    slug: 'cathrinebruvold',
    name: 'Cathrine Bruvold',
    role: 'Head of Power Platform',
    company: 'Point Taken',
    links: [
      { label: 'Website', href: 'https://cathrinebruvold.com' },
      { label: 'GitHub', href: 'https://github.com/cathrinebruvold' }
    ]
  },
  carlcookson: {
    slug: 'carlcookson',
    name: 'Carl Cookson',
    role: 'Consultant / Owner',
    company: 'LinkeD365 Consulting',
    links: [
      { label: 'Website', href: 'https://linked365.blog' },
      { label: 'GitHub', href: 'https://github.com/LinkeD365' }
    ]
  }
}

export const HOST_SLUG = 'laskewitz'

export function getSpeaker(slug: string): Speaker | undefined {
  return speakers[slug]
}

/**
 * Resolve slugs to speakers, dropping anything unknown.
 *
 * A mistyped QR parameter must never leave an attendee staring at an error, so
 * unrecognised slugs are silently skipped.
 */
export function resolveSpeakers(slugs: readonly string[]): Speaker[] {
  const seen = new Set<string>()
  const resolved: Speaker[] = []

  for (const slug of slugs) {
    const key = slug.trim().toLowerCase()
    if (!key || seen.has(key)) continue
    const speaker = speakers[key]
    if (!speaker) continue
    seen.add(key)
    resolved.push(speaker)
  }

  return resolved
}

/** The host is billed first, then everyone else in the order supplied. */
export function billing(coSpeakerSlugs: readonly string[] = []): Speaker[] {
  const others = resolveSpeakers(coSpeakerSlugs).filter((s) => s.slug !== HOST_SLUG)
  return [speakers[HOST_SLUG], ...others]
}
