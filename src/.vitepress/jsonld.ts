/**
 * Structured data.
 *
 * The signage tells a person where to stand; this tells a machine the same
 * thing. A speaking record is exactly the shape search engines already
 * understand — a Person who performs at Events — so the record is emitted as
 * JSON-LD rather than left as styled markup a crawler has to guess at.
 *
 * Emitted per page from `transformPageData`, so it ships in the static HTML and
 * never depends on the client bundle running.
 */
import type { PageData } from 'vitepress'
import { bios } from './data/bio'
import { getEvent, upcomingEvents } from './data/events'
import { eventPlace } from './data/format'
import { speakers } from './data/speakers'
import { activeTalks, talks } from './data/talks'
import type { EventRecord, Talk } from './data/types'

const HOSTNAME = 'https://laskewitz.io'

const HOST = speakers.laskewitz

/** The one identity every other node points back at. */
const PERSON_ID = `${HOSTNAME}/#person`

const WEBSITE_ID = `${HOSTNAME}/#website`

const LANG = 'en-GB'

function person() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: HOST.name,
    url: HOSTNAME,
    image: `${HOSTNAME}${HOST.photo}`,
    jobTitle: HOST.role,
    /* The one-line bio, which is already written to introduce him cold and is
       the only copy on the site that does that job. */
    description: bios[0]?.text,
    /* What the speaking record is actually about, taken from the talks rather
       than asserted separately, so it cannot drift from the programme. */
    knowsAbout: [...new Set(talks.flatMap((talk) => talk.tags))].sort((a, b) =>
      a.localeCompare(b)
    ),
    worksFor: { '@type': 'Organization', name: HOST.company },
    /* The links a crawler uses to merge this Person with the same person
       elsewhere. The site's own URL is already `url`, so it is not repeated. */
    sameAs: HOST.links
      .filter((link) => link.label !== 'Website')
      .map((link) => link.href)
  }
}

/**
 * One event, in the shape Google's Event result expects.
 *
 * `country` is not always ISO alpha-2 — the UK nations carry subdivision codes
 * — so the printed country name is what goes in the address.
 *
 * The `@id` is stable across pages on purpose: the same conference is
 * described on the events board and again on the placard of every talk given
 * there, and a crawler should merge those into one event rather than three
 * near-identical ones.
 */
function event(record: EventRecord, workFeatured?: string) {
  return {
    '@type': 'Event',
    '@id': `${HOSTNAME}/events/#${record.slug}`,
    name: record.name,
    startDate: record.start,
    endDate: record.end ?? record.start,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: record.online
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: record.online
      ? { '@type': 'VirtualLocation', url: record.website ?? HOSTNAME }
      : {
          '@type': 'Place',
          name: eventPlace(record),
          address: {
            '@type': 'PostalAddress',
            addressLocality: record.city,
            addressCountry: record.countryName
          }
        },
    performer: { '@id': PERSON_ID },
    organizer: record.website
      ? { '@type': 'Organization', name: record.name, url: record.website }
      : undefined,
    ...(workFeatured ? { workFeatured: { '@id': workFeatured } } : {}),
    ...(record.website ? { url: record.website } : {}),
    ...(record.tickets
      ? {
          offers: {
            '@type': 'Offer',
            url: record.tickets,
            availability: 'https://schema.org/InStock'
          }
        }
      : {})
  }
}

/** `talks/mcp/index.md` → `https://laskewitz.io/talks/mcp/`, matching cleanUrls. */
function pageUrl(relativePath: string): string {
  const clean = relativePath.replace(/\.md$/, '')
  if (clean === 'index') return `${HOSTNAME}/`
  if (clean.endsWith('/index')) return `${HOSTNAME}/${clean.replace(/\/index$/, '')}/`
  return `${HOSTNAME}/${clean}`
}

/**
 * A title without its leading session emoji.
 *
 * Structured data is read back as a search result, and the placard's emoji is
 * wayfinding inside the venue — it earns its place on the page and the sharing
 * card, not in a result heading on someone else's site.
 */
function plainTitle(title: string): string {
  return title.replace(/^\p{Extended_Pictographic}\uFE0F?\s*/u, '').trim()
}

/**
 * The trail back to the front door.
 *
 * The site's own chrome has no breadcrumb — the nav is four words and the
 * rooms are one level deep — but a search result still prints one, and left
 * to itself it prints a URL. This names each step in words instead.
 */
function breadcrumb(trail: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: step.url
    }))
  }
}

/**
 * A talk as a thing in its own right.
 *
 * A talk is not a page and not an event: it is a work that gets performed,
 * sometimes a dozen times in a year. Saying so lets the deliveries below point
 * at one work rather than each describing a separate unnamed session.
 *
 * The name is the plain one, for the same reason the page title is plain: this
 * string is read back as a search result heading, and a session's emoji is
 * signage for the room rather than part of what the talk is called.
 */
function talkWork(talk: Talk) {
  const url = `${HOSTNAME}/talks/${talk.slug}/`
  const name = plainTitle(talk.title)
  return {
    '@type': 'CreativeWork',
    '@id': `${url}#talk`,
    name,
    headline: name,
    description: talk.summary,
    abstract: talk.abstract,
    url,
    inLanguage: LANG,
    keywords: talk.tags,
    author: { '@id': PERSON_ID },
    creator: { '@id': PERSON_ID },
    learningResourceType: talk.format === 'workshop' ? 'Workshop' : 'Conference session',
    isPartOf: { '@id': WEBSITE_ID },
    ...(talk.slides ? { associatedMedia: { '@type': 'MediaObject', url: talk.slides } } : {})
  }
}

/** The graph for one page, or nothing when the page has nothing to declare. */
function graphFor(pageData: PageData): object[] | null {
  const { relativePath, frontmatter } = pageData

  if (relativePath === 'index.md') {
    return [
      person(),
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: HOSTNAME,
        name: 'Daniel Laskewitz',
        description: frontmatter.description ?? '',
        inLanguage: LANG,
        publisher: { '@id': PERSON_ID }
      }
    ]
  }

  if (relativePath === 'about/index.md') {
    return [
      person(),
      {
        '@type': 'ProfilePage',
        '@id': `${HOSTNAME}/about/#page`,
        url: `${HOSTNAME}/about/`,
        name: 'About Daniel Laskewitz',
        description: frontmatter.description ?? '',
        inLanguage: LANG,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
        about: { '@id': PERSON_ID }
      },
      breadcrumb([
        { name: 'Home', url: `${HOSTNAME}/` },
        { name: 'About', url: `${HOSTNAME}/about/` }
      ])
    ]
  }

  if (relativePath === 'events/index.md') {
    const upcoming = upcomingEvents()
    const trail = breadcrumb([
      { name: 'Home', url: `${HOSTNAME}/` },
      { name: 'Events', url: `${HOSTNAME}/events/` }
    ])
    if (!upcoming.length) return [person(), trail]
    return [
      person(),
      {
        '@type': 'ItemList',
        name: 'Upcoming speaking engagements',
        itemListElement: upcoming.map((record, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: event(record)
        }))
      },
      trail
    ]
  }

  if (relativePath === 'talks/index.md') {
    return [
      person(),
      {
        '@type': 'CollectionPage',
        '@id': `${HOSTNAME}/talks/#page`,
        url: `${HOSTNAME}/talks/`,
        name: 'Talks',
        description: frontmatter.description ?? '',
        inLanguage: LANG,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID }
      },
      {
        '@type': 'ItemList',
        name: 'Talks by Daniel Laskewitz',
        /* The list mirrors the visible index, so a retired talk is not advertised
           as bookable while keeping its own page. */
        itemListElement: activeTalks.map((talk, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: plainTitle(talk.title),
          url: `${HOSTNAME}/talks/${talk.slug}/`
        }))
      },
      breadcrumb([
        { name: 'Home', url: `${HOSTNAME}/` },
        { name: 'Talks', url: `${HOSTNAME}/talks/` }
      ])
    ]
  }

  const talkMatch = /^talks\/([^/]+)\/index\.md$/.exec(relativePath)
  if (talkMatch) {
    const talk = talks.find((t) => t.slug === talkMatch[1])
    if (!talk) return null
    const work = talkWork(talk)

    /* Only the outings still ahead are emitted as events. A conference that
       finished two years ago is part of the record a reader wants and not
       something a search engine should offer anyone a ticket to. */
    const booked = talk.deliveries
      .map((delivery) => getEvent(delivery.eventSlug))
      .filter((record): record is EventRecord => Boolean(record))
      .filter((record) => new Date(record.end ?? record.start) >= new Date())
      .map((record) => event(record, work['@id']))

    return [
      person(),
      work,
      ...booked,
      breadcrumb([
        { name: 'Home', url: `${HOSTNAME}/` },
        { name: 'Talks', url: `${HOSTNAME}/talks/` },
        { name: plainTitle(talk.title), url: `${HOSTNAME}/talks/${talk.slug}/` }
      ])
    ]
  }

  if (relativePath === 'blog/index.md') {
    return [
      person(),
      {
        '@type': 'Blog',
        '@id': `${HOSTNAME}/blog/#blog`,
        url: `${HOSTNAME}/blog/`,
        name: 'Daniel Laskewitz — Blog',
        description: frontmatter.description ?? '',
        inLanguage: LANG,
        isPartOf: { '@id': WEBSITE_ID },
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID }
      },
      breadcrumb([
        { name: 'Home', url: `${HOSTNAME}/` },
        { name: 'Blog', url: `${HOSTNAME}/blog/` }
      ])
    ]
  }

  if (relativePath.startsWith('blog/posts/')) {
    const url = pageUrl(relativePath)
    const title = pageData.title || frontmatter.title
    const published = frontmatter.date ? new Date(frontmatter.date).toISOString() : undefined
    return [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#post`,
        headline: title,
        name: title,
        description: frontmatter.description ?? '',
        url,
        mainEntityOfPage: url,
        /* Google's article result wants an image and there has been one all
           along — the same card the page hands a sharing surface. */
        image: `${HOSTNAME}/images/og/${relativePath.replace(/\.md$/, '').replace(/\//g, '-')}.png`,
        inLanguage: LANG,
        datePublished: published,
        /* Nothing tracks edits per post, so the publish date is the honest
           answer rather than today's build stamp. */
        dateModified: published,
        keywords: frontmatter.categories ?? [],
        articleSection: frontmatter.categories ?? [],
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        isPartOf: { '@id': `${HOSTNAME}/blog/#blog` }
      },
      person(),
      breadcrumb([
        { name: 'Home', url: `${HOSTNAME}/` },
        { name: 'Blog', url: `${HOSTNAME}/blog/` },
        { name: title, url }
      ])
    ]
  }

  return null
}

/**
 * Adds the page's JSON-LD block to its head.
 *
 * The graph is emitted as a single `@graph` document rather than several
 * scripts, so the nodes can reference one another by `@id` and a crawler reads
 * one identity instead of several near-duplicates.
 */
export function addJsonLd(pageData: PageData): void {
  const graph = graphFor(pageData)
  if (!graph) return

  pageData.frontmatter.head ??= []
  pageData.frontmatter.head.push([
    'script',
    { type: 'application/ld+json' },
    JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  ])
}
