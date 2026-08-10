/**
 * The organiser's kit.
 *
 * An organiser asks for the same four things every time: a bio at the length
 * their programme allows, a headshot, what he speaks about, and how to reach
 * him. They live here as data so the contact page hands them over without an
 * email round-trip, and so a rewrite lands in one place.
 *
 * The bios are static prose on purpose. They get pasted into printed
 * programmes and CFP systems, so they must read the same everywhere and not
 * shift under a computed number.
 */

export interface Bio {
  /** What it is for, printed above the text. */
  label: string
  /** Roughly how long, so an organiser can pick without counting. */
  length: string
  text: string
}

export const bios: Bio[] = [
  {
    label: 'One line',
    length: '20 words',
    text:
      'Daniel Laskewitz is a Principal Cloud Advocate at Microsoft. He builds agents with ' +
      'Copilot Studio, GitHub Copilot and Microsoft 365 Copilot.'
  },
  {
    label: 'Short',
    length: '50 words',
    text:
      'Daniel Laskewitz is a Principal Cloud Advocate at Microsoft. Most of his week goes ' +
      'into Copilot Studio, Copilot Cowork, Scout, GitHub Copilot and Microsoft 365 ' +
      'Copilot. The rest of it he spends on stage at conferences and user groups around ' +
      'Europe, where the demos run live and the broken bits stay in.'
  },
  {
    label: 'Long',
    length: '110 words',
    text:
      'Daniel Laskewitz is a Principal Cloud Advocate at Microsoft. Half of his week ' +
      'goes into Copilot Studio, Copilot Cowork, Scout, GitHub Copilot and ' +
      'Microsoft 365 Copilot, usually with something unfinished open on screen. The ' +
      'other half he spends with the people building the same things, in sessions and ' +
      'workshops and in the community, and what they tell him goes back to the product ' +
      'teams.\n\n' +
      'On stage he talks about getting an agent past the demo. Wiring it to real systems ' +
      'with MCP, working out when a plain connector is the better answer, and the part ' +
      'nobody puts in a keynote: making the thing safe to hand to somebody else. He has ' +
      'been speaking since 2015, often with a co-speaker.'
  }
]

/**
 * The headshot an organiser can actually use.
 *
 * One photograph, four sizes. A programme has a minimum and a print deadline,
 * so the sizes are handed over rather than requested: the small one for a
 * session listing, the large one for a printed backdrop. Named with their
 * dimensions because guessing wastes an email.
 */
export interface Headshot {
  href: string
  label: string
  note: string
}

export const headshots: Headshot[] = [
  {
    href: '/images/speakers/laskewitz-2048.jpg',
    label: 'Print headshot',
    note: 'JPEG · 2048 × 2048 · 341 KB'
  },
  {
    href: '/images/speakers/laskewitz-1024.jpg',
    label: 'Large headshot',
    note: 'JPEG · 1024 × 1024 · 101 KB'
  },
  {
    href: '/images/speakers/laskewitz-512.jpg',
    label: 'Web headshot',
    note: 'JPEG · 512 × 512 · 42 KB'
  },
  {
    href: '/images/speakers/laskewitz-256.jpg',
    label: 'Thumbnail headshot',
    note: 'JPEG · 256 × 256 · 15 KB'
  }
]
