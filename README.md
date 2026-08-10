# laskewitz.io

The source for [laskewitz.io](https://laskewitz.io), Daniel Laskewitz's speaker site.
It's a [VitePress](https://vitepress.dev) site with a custom theme, built and deployed
to GitHub Pages by Actions on every push to `main`.

The site exists to do one thing well: hand someone the links promised on stage, in
seconds, on cellular, one-handed, while the room is emptying around them. Everything
else follows from that.

## Running it

Node 22 is what CI uses.

```bash
npm install
npm run dev      # dev server with hot reload
npm run build    # production build into src/.vitepress/dist
npm run preview  # serve the built site
```

## How it's arranged

Content lives in `src/`, and the site's data lives in `src/.vitepress/data/`. The data
files are the part worth understanding, because nearly every page is rendered from them
rather than written by hand.

| File | What it holds |
| --- | --- |
| `talks.ts` | Every talk, its abstract, tags, format, resource links, and each delivery |
| `events.ts` | Every event, with dates, city, website and tickets |
| `speakers.ts` | Daniel and every co-speaker, with their links |
| `posts.ts` | Blog post loading and ordering |
| `format.ts` | Date, place and flag formatting |
| `types.ts` | The shape of all of the above |

Three ideas run through the data model:

**A talk is a recurring object, not an event entry.** Each talk carries a list of
deliveries, and each delivery names its event and the people who were actually on stage
for it. That's why a co-speaker is credited on the outing they did, not on every outing
of that talk.

**Upcoming versus past is derived, never maintained.** Events carry dates; the render
decides which board they belong on. An event moves to the past on its own.

**One fact, one place.** A co-speaker is one entry in `speakers.ts`, and everywhere they
appear reads from it. A talk that covers the same ground as another can point at it with
`resourcesFrom` instead of copying its links, so a correction lands on both doors at once.

### Pages

| Path | Purpose |
| --- | --- |
| `src/talks/<slug>/` | One page per talk, rendering `<TalkPage>` |
| `src/r/<slug>/` | The QR-code resource door for a talk, rendering `<ResourcePage>` |
| `src/blog/posts/` | Blog posts as markdown |
| `src/events/`, `src/index.md` | The events board and the entrance |
| `src/public/` | Fonts, images, slides — served as-is |

Resource doors accept `?with=<slug>,<slug>` so the same door can be billed with whoever
shared the stage that day. `src/sessions/` holds redirects from old URLs that were
printed on slides and can't be broken.

### Feed and cards

The RSS feed is generated in `buildEnd` and written to both `/feed.xml` and `/feed.rss`.
They're the same document. GitHub Pages types `.rss` as `application/rss+xml`, which
browsers download rather than display, so site links point at `/feed.xml` while
`/feed.rss` stays put for anyone already subscribed.

Open Graph cards are generated per page at build time by `og.ts` using Satori, so no
card is ever hand-made or stale. Satori won't synthesise emoji, so each one is drawn as
Twemoji artwork read off disk from `@twemoji/svg`.

## Adding things

**A talk:** add an entry to `talks.ts`, then create `src/talks/<slug>/index.md` with a
`<TalkPage slug="..." />`. If it hands out links, set `resourceSlug` and add
`src/r/<slug>/index.md` with a `<ResourcePage slug="..." />`. Mark it
`format: 'workshop'` if it's a workshop; sessions are the default.

**A delivery:** add `{ eventSlug, coSpeakers }` to the talk's `deliveries`, and the event
to `events.ts` if it isn't there yet. Only record outings that actually happened or are
booked — an empty list is an honest gap.

**A co-speaker:** one entry in `speakers.ts`, keyed by slug. Photos and links are
optional and degrade gracefully.

**A post:** a markdown file in `src/blog/posts/` with `title`, `date` and `description`
in the frontmatter.

## Design

`DESIGN.md` and `PRODUCT.md` hold the design system and the product definition, and
`src/.vitepress/contract.ts` carries the direction contract that ships inside every built
page. Read those before changing how anything looks. The short version: the site is the
venue and every page is a sign. Colour is structural — five "halls" that a talk keeps
everywhere it appears — and hall colour is never used as small text on the substrate.

## Credits

Emoji artwork from [Twemoji](https://github.com/jdecked/twemoji), copyright 2020 Twitter,
Inc and other contributors, licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/).
The graphics are used unmodified. The same notice appears on the site's
[terms page](https://laskewitz.io/terms/), which is where the licence expects readers to
find it.
