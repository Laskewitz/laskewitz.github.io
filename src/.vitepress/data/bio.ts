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
    length: '15 words',
    text: 'Daniel Laskewitz is a Principal Cloud Advocate at Microsoft, working on Copilot Studio and the Power Platform.'
  },
  {
    label: 'Short',
    length: '50 words',
    text:
      'Daniel Laskewitz is a Principal Cloud Advocate at Microsoft, where he works on ' +
      'Copilot Studio and the Power Platform. He speaks at conferences and user groups ' +
      'across Europe and beyond about building agents, connecting them to real systems ' +
      'with MCP, and getting low-code solutions into production and keeping them there.'
  },
  {
    label: 'Long',
    length: '100 words',
    text:
      'Daniel Laskewitz is a Principal Cloud Advocate at Microsoft, where he works on ' +
      'Copilot Studio and the Power Platform. He spends his time with the people ' +
      'actually building on the platform — in sessions, in workshops, and in the ' +
      'community — and brings what he hears there back to the product teams.\n\n' +
      'On stage he covers building and shipping agents, the Model Context Protocol and ' +
      'how it differs from connectors, and the unglamorous side of low-code: making ' +
      'solutions maintainable, governable and fit to hand to someone else. He has ' +
      'spoken at conferences and community days across Europe and beyond since 2022, ' +
      'often alongside a co-speaker.'
  }
]

/**
 * The headshot an organiser can actually use. Named with its dimensions
 * because a programme has a minimum and guessing wastes an email.
 */
export const headshot = {
  href: '/images/speakers/laskewitz-256.jpg',
  note: 'JPEG · 256 × 256'
}
