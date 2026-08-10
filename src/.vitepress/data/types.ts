/**
 * Wayfinding — the type layer.
 *
 * Tracks are the semantic colour roles of the world. A talk is assigned a track
 * and keeps it everywhere it appears: placard, delivery line, and the full-bleed
 * door of its resource page.
 *
 * A track is a room, not a talk. There are five, and once the programme grows
 * past five sessions the rooms are reused — exactly as a real venue reuses them.
 * Every track colour is contrast-checked against its on-track ink in style.css.
 */
export type Track = 'a' | 'b' | 'c' | 'd' | 'e'

export interface SpeakerLink {
  label: string
  href: string
}

export interface Speaker {
  slug: string
  name: string
  role?: string
  company?: string
  photo?: string
  /**
   * A 2× version of the same crop, when one exists. The plate paints the
   * portrait at 112px, so a 256px file is already soft on a retina screen and
   * visibly broken at 3×.
   */
  photo2x?: string
  links: SpeakerLink[]
}

export interface EventRecord {
  slug: string
  name: string
  /** ISO date, first day. */
  start: string
  /** ISO date, last day. Omitted for single-day events. */
  end?: string
  city: string
  /** ISO 3166-1 alpha-2, `GB-ENG`/`GB-SCT`/`GB-WLS`, or `ZZ` for online. */
  country: string
  countryName: string
  website?: string
  tickets?: string
  /** A published deck for this specific outing. */
  slides?: string
  /** Online-only events have no physical city. */
  online?: boolean
}

export interface Delivery {
  eventSlug: string
  /** Speaker slugs sharing the stage, excluding the host. */
  coSpeakers?: string[]
}

export interface ResourceLink {
  label: string
  href: string
  note?: string
}

export interface ResourceGroup {
  title: string
  links: ResourceLink[]
}

export interface Talk {
  slug: string
  /**
   * Whether the talk is still on offer. Retired talks stay in the data so the
   * events they were given at keep their record, but they leave the placard
   * index — a programme should only advertise what can still be booked.
   */
  active: boolean
  title: string
  /** One line, sentence case, used on placards. */
  summary: string
  abstract: string
  track: Track
  /**
   * How the room is run. Every talk carries its format so the plate says what
   * you are walking into; a workshop is hours and hands-on rather than a
   * breakout, so it is marked more strongly than a session.
   */
  format?: 'session' | 'workshop'
  tags: string[]
  slides?: string
  /** Present when the talk has a QR-code resource door at /r/<slug>. */
  resourceSlug?: string
  /** Co-speakers billed when no ?with= parameter is supplied. */
  defaultCoSpeakers?: string[]
  resources?: ResourceGroup[]
  /**
   * Slug of another talk whose resource groups this talk hands out. Two talks
   * that cover the same ground point an audience at the same links, and the
   * links belong in one place so a correction lands on both doors at once.
   * The referring talk keeps its own door, title and co-speaker billing.
   */
  resourcesFrom?: string
  deliveries: Delivery[]
}
