/**
 * Wayfinding — the type layer.
 *
 * Halls are the semantic colour roles of the world. A talk is assigned a hall
 * and keeps it everywhere it appears: placard, delivery line, and the full-bleed
 * door of its resource page.
 *
 * A hall is a room, not a talk. There are five, and once the programme grows
 * past five sessions rooms are reused — exactly as a real venue reuses them.
 * Every hall colour is contrast-checked against its on-hall ink in style.css.
 */
export type Hall = 'a' | 'b' | 'c' | 'd' | 'e'

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
  /** ISO 3166-1 alpha-2, or a UK nation code handled by the flag override map. */
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
  title: string
  /** One line, sentence case, used on placards. */
  summary: string
  abstract: string
  hall: Hall
  tags: string[]
  slides?: string
  /** Present when the talk has a QR-code resource door at /r/<slug>. */
  resourceSlug?: string
  /** Co-speakers billed when no ?with= parameter is supplied. */
  defaultCoSpeakers?: string[]
  resources?: ResourceGroup[]
  deliveries: Delivery[]
}
