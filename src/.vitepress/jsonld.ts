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
import { upcomingEvents } from './data/events'
import { eventPlace } from './data/format'
import { speakers } from './data/speakers'
import type { EventRecord } from './data/types'

const HOSTNAME = 'https://laskewitz.io'

const HOST = speakers.laskewitz

/** The one identity every other node points back at. */
const PERSON_ID = `${HOSTNAME}/#person`

function person() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: HOST.name,
    url: HOSTNAME,
    image: `${HOSTNAME}${HOST.photo}`,
    jobTitle: HOST.role,
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
 */
function event(record: EventRecord) {
  return {
    '@type': 'Event',
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

/** The graph for one page, or nothing when the page has nothing to declare. */
function graphFor(pageData: PageData): object[] | null {
  const { relativePath, frontmatter } = pageData

  if (relativePath === 'index.md') {
    return [
      person(),
      {
        '@type': 'WebSite',
        '@id': `${HOSTNAME}/#website`,
        url: HOSTNAME,
        name: 'Daniel Laskewitz',
        publisher: { '@id': PERSON_ID }
      }
    ]
  }

  if (relativePath === 'events/index.md') {
    const upcoming = upcomingEvents()
    if (!upcoming.length) return [person()]
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
      }
    ]
  }

  if (relativePath.startsWith('blog/posts/')) {
    const url = `${HOSTNAME}/${relativePath.replace(/\.md$/, '')}`
    return [
      {
        '@type': 'BlogPosting',
        headline: pageData.title || frontmatter.title,
        description: frontmatter.description ?? '',
        url,
        mainEntityOfPage: url,
        datePublished: frontmatter.date
          ? new Date(frontmatter.date).toISOString()
          : undefined,
        keywords: frontmatter.categories ?? [],
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID }
      },
      person()
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
