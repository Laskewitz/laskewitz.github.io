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
    photo: '/images/speakers/laskewitz-256.jpg',
    photo2x: '/images/speakers/laskewitz-512.jpg',
    links: [
      { label: 'Website', href: 'https://laskewitz.io' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/laskewitz' },
      { label: 'GitHub', href: 'https://github.com/laskewitz' },
      { label: 'X', href: 'https://x.com/laskewitz' },
      { label: 'YouTube', href: 'https://youtube.com/daniellaskewitz' }
    ]
  },
  miguelverweij: {
    slug: 'miguelverweij',
    name: 'Miguel Verweij',
    role: 'Founder',
    company: 'Powerbouwer',
    photo: '/images/speakers/miguelverweij-256.jpg',
    links: [
      { label: 'Website', href: 'https://www.powerbouwer.com' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/miguel-verweij/' },
      { label: 'GitHub', href: 'https://github.com/miguelverweij' },
      { label: 'X', href: 'https://x.com/MiguelVerweij' }
    ]
  },
  joegriffin: {
    slug: 'joegriffin',
    name: 'Joe Griffin',
    role: 'CEO',
    company: 'proMX UK',
    photo: '/images/speakers/joegriffin-256.jpg',
    links: [
      { label: 'Website', href: 'https://crmchap.co.uk' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/joejgriffin/' },
      { label: 'X', href: 'https://x.com/joejgriffin' }
    ]
  },
  appieschot: {
    slug: 'appieschot',
    name: 'Albert-Jan Schot',
    role: 'CTO',
    company: 'Blis Digital',
    photo: '/images/speakers/appieschot-256.jpg',
    links: [
      { label: 'Website', href: 'https://www.cloudappie.nl/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/albertjanschot/' },
      { label: 'GitHub', href: 'https://github.com/appieschot' },
      { label: 'X', href: 'https://x.com/appieschot' }
    ]
  },
  mnecker: {
    slug: 'mnecker',
    name: 'Mats Necker',
    role: 'CEO',
    company: 'Dhino',
    photo: '/images/speakers/mnecker-256.jpg',
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
    photo: '/images/speakers/aprildunnam-256.jpg',
    links: [
      { label: 'Website', href: 'https://aprildunnam.com/' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/aprildunnam' },
      { label: 'GitHub', href: 'https://github.com/aprildunnam' },
      { label: 'X', href: 'https://x.com/aprildunnam' },
      { label: 'YouTube', href: 'https://youtube.com/@aprildunnam' }
    ]
  },
  agniusbartninkas: {
    slug: 'agniusbartninkas',
    name: 'Agnius Bartninkas',
    role: 'CEO',
    company: 'Herexis',
    photo: '/images/speakers/agniusbartninkas-256.jpg',
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
    photo: '/images/speakers/cathrinebruvold-256.jpg',
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
    photo: '/images/speakers/carlcookson-256.jpg',
    links: [
      { label: 'Website', href: 'https://linked365.blog' },
      { label: 'GitHub', href: 'https://github.com/LinkeD365' }
    ]
  },
  garrytrinder: {
    slug: 'garrytrinder',
    name: 'Garry Trinder',
    role: 'Senior Cloud Advocate',
    company: 'Microsoft',
    photo: '/images/speakers/garrytrinder-256.jpg',
    links: [
      { label: 'Website', href: 'https://garrytrinder.github.io' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gtrinder' },
      { label: 'GitHub', href: 'https://github.com/garrytrinder' }
    ]
  },
  melissahale: {
    slug: 'melissahale',
    name: 'Melissa Hale',
    role: 'Power Platform Consultant',
    company: 'Kerv',
    photo: '/images/speakers/melissahale-256.jpg',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/melissa-stephanie-hale/' },
      { label: 'GitHub', href: 'https://github.com/Mello245' }
    ]
  },
  nathanhelgren: {
    slug: 'nathanhelgren',
    name: 'Nathan Helgren',
    role: 'Principal Program Manager',
    company: 'Microsoft',
    links: []
  },
  kentweare: {
    slug: 'kentweare',
    name: 'Kent Weare',
    role: 'Principal Product Manager',
    company: 'Microsoft',
    links: []
  },
  rohithchetla: {
    slug: 'rohithchetla',
    name: 'Rohith Chetla',
    role: 'Product Manager II',
    company: 'Microsoft',
    links: []
  }
}

export const HOST_SLUG = 'laskewitz'

/**
 * Resolve slugs to speakers, dropping anything unknown.
 *
 * A mistyped QR parameter must never leave an attendee staring at an error, so
 * unrecognised slugs are silently skipped.
 */
function resolveSpeakers(slugs: readonly string[]): Speaker[] {
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

/**
 * Everyone on stage besides the host, written the way it would be said:
 * "Kent", "Kent and Rohith", "Nathan, Kent and Rohith".
 */
export function coSpeakerNames(coSpeakerSlugs: readonly string[] = []): string {
  const names = billing(coSpeakerSlugs)
    .filter((s) => s.slug !== HOST_SLUG)
    .map((s) => s.name)

  if (names.length < 2) return names[0] ?? ''
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}
