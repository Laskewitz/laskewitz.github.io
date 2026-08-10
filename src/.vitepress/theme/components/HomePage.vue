<script setup lang="ts">
/**
 * The entrance directory. First viewport of the venue.
 *
 * A hanging banner leads — a real room, the name cut across it, the record
 * printed on it — then the board of dates already booked, then the directory.
 * One arrival, top to bottom.
 *
 * The entrance deliberately does not hold one screen. Holding the fold meant
 * choosing three of: an immersive photograph, the record, a real next-event
 * block, and four signs. The board is the argument this site exists to make,
 * so it gets the room and the page scrolls.
 */
import { computed } from 'vue'
import {
  countryCount,
  eventCount,
  firstYear,
  upcomingEvents
} from '../../data/events'
import { coSpeakersAtEvent, talkCountByFormat, talksAtEvent } from '../../data/talks'
import type { Track } from '../../data/types'
import { eventPlace, flagSrc, formatEventDate } from '../../data/format'
import { data as posts } from '../posts.data'
import CoSpeakerBadge from './CoSpeakerBadge.vue'
import LinkRow from './LinkRow.vue'
import BannerImage from './BannerImage.vue'

/** Three is the most that still reads as a board rather than a list. */
const soon = computed(() => upcomingEvents().slice(0, 3))

/**
 * The board's lines carry the same tab the events page gives them: grey
 * standing still, lit in the line's track on approach. Blue sits this one out
 * here, the same as the directory below — the nav above already spends it on
 * the page you are standing on.
 */
const TRACK_CYCLE: Track[] = ['e', 'b', 'd', 'c']

function trackFor(index: number): Track {
  return TRACK_CYCLE[index % TRACK_CYCLE.length]
}

/**
 * A workshop is a different promise than a session — hours and hands-on rather
 * than a slot — so the board prints them under their own heading instead of
 * flattening both into one list. The same grouping the events page uses, so a
 * visitor who learns to read the board here can read it there.
 */
function talkGroupsAtEvent(eventSlug: string) {
  const given = talksAtEvent(eventSlug)
  const sessions = given.filter((t) => t.format !== 'workshop')
  const workshops = given.filter((t) => t.format === 'workshop')
  return [
    { label: sessions.length === 1 ? 'Session' : 'Sessions', talks: sessions },
    { label: workshops.length === 1 ? 'Workshop' : 'Workshops', talks: workshops }
  ].filter((group) => group.talks.length)
}

/** Newest first out of the loader, so the board's headline is posts[0]. */
const latestPost = computed(() => posts[0])

/**
 * The rotation reads as its two halves, because a sign that only counts talks
 * hides the difference between an hour on stage and a day at a bench.
 */
const talkRotation = (() => {
  const { sessions, workshops } = talkCountByFormat()
  const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`
  if (!workshops) return plural(sessions, 'session')
  if (!sessions) return plural(workshops, 'workshop')
  return `${plural(sessions, 'session')} and ${plural(workshops, 'workshop')}`
})()

/**
 * A sign that only says where it goes wastes the walk. Each row carries the
 * fact that would otherwise cost a click, drawn live from the same data the
 * track behind it renders — so the directory is the record, not a menu.
 *
 * Each row keeps a track in reserve and lights it only on approach, so the
 * colour marks the sign you are pointing at instead of painting the board.
 * Track A blue is left out here: it is the venue's live-marker ink and the
 * navigation above already spends it, so the directory uses the other four.
 */
const directory = computed<
  { href: string; label: string; note: string; track: Track }[]
>(() => [
  {
    track: 'e',
    href: '/events/',
    label: 'Events',
    note: `Every stage since ${firstYear()}, and the dates still ahead.`
  },
  {
    track: 'b',
    href: '/talks/',
    label: 'Talks',
    note: `${talkRotation} in rotation, on agents, low-code and the Power Platform.`
  },
  {
    track: 'd',
    href: '/blog/',
    label: 'Blog',
    note: latestPost.value
      ? `Latest: ${latestPost.value.title}`
      : 'Notes on Copilot Studio, agents and the Power Platform.'
  },
  {
    track: 'c',
    href: '/about/',
    label: 'About',
    note: 'Bios, headshots and the fastest way to reach me.'
  }
])
</script>

<template>
  <div class="entrance">
    <BannerImage
      src="stage-devworld"
      alt="Daniel Laskewitz speaking on stage at DevWorld 2024."
      track="a"
      height="half"
      focus="62% 34%"
      focus-narrow="72% 50%"
      priority
    >
      <h1 class="banner-name wf-sign">Daniel Laskewitz</h1>
      <p class="banner-standfirst">
        Principal Cloud Advocate at Microsoft. Agents, low-code and the Power
        Platform, on stage across Europe and beyond.
      </p>

      <!-- The record is the argument, so it is printed on the room rather than
           left for the organiser to go and count. Three real figures, no
           claims around them. -->
      <p class="record wf-sign">
        <span>{{ eventCount() }} events</span>
        <span>{{ countryCount() }} countries</span>
        <span>since {{ firstYear() }}</span>
      </p>
    </BannerImage>

    <!-- The board speaks the events page's own grammar: date column, name and
         place, then the two things a visitor actually wants. Someone who learns
         to read it here can read it there. -->
    <section class="board wf-gutter" aria-labelledby="board-heading">
      <h2 id="board-heading" class="section-heading wf-sign" data-track="e">
        <span class="wf-sticker">Where I'll be</span>
      </h2>

      <ol class="lines">
        <li v-for="(e, i) in soon" :key="e.slug" class="line" :data-track="trackFor(i)">
          <span class="date">{{ formatEventDate(e) }}</span>
          <span class="name-cell">
            <span class="name wf-sign">{{ e.name }}</span>
            <CoSpeakerBadge :speakers="coSpeakersAtEvent(e.slug)" />
            <span class="place">
              <img
                v-if="flagSrc(e.country)"
                class="flag"
                :src="flagSrc(e.country)"
                alt=""
                width="18"
                height="18"
                loading="lazy"
                decoding="async"
              />
              {{ eventPlace(e) }}
            </span>
          </span>

          <span v-if="talksAtEvent(e.slug).length" class="gave">
            <template v-for="group in talkGroupsAtEvent(e.slug)" :key="group.label">
              <span class="gave-label wf-label">{{ group.label }}</span>
              <ul class="gave-list">
                <li v-for="talk in group.talks" :key="talk.slug">
                  <a :href="`/talks/${talk.slug}`">{{ talk.title }}</a>
                </li>
              </ul>
            </template>
          </span>
          <span class="links">
            <a
              v-if="e.website"
              :href="e.website"
              target="_blank"
              rel="noopener noreferrer"
              >Website ↗</a
            >
            <a
              v-if="e.tickets"
              :href="e.tickets"
              target="_blank"
              rel="noopener noreferrer"
              >Tickets ↗</a
            >
          </span>
        </li>
      </ol>

      <a class="board-all" href="/events/">All events →</a>
    </section>

    <nav class="directory wf-gutter" aria-labelledby="directory-heading">
      <h2 id="directory-heading" class="section-heading wf-sign" data-track="b">
        <span class="wf-sticker">Explore</span>
      </h2>
      <div class="rows">
        <LinkRow
          v-for="item in directory"
          :key="item.href"
          :href="item.href"
          :label="item.label"
          :note="item.note"
          :track="item.track"
          quiet
        />
      </div>
    </nav>
  </div>
</template>

<style scoped>
.entrance {
  display: flex;
  flex-direction: column;
}

/* ── BANNER ────────────────────────────────────────────────────────────── */

.banner-name {
  margin: 0;
  font-size: clamp(2.1rem, 0.9rem + 4.6vw, 4.4rem);
  font-weight: 900;
  letter-spacing: -0.035em;
  line-height: 0.94;
  margin-left: -0.035em;
  text-transform: uppercase;
  word-break: keep-all;
  overflow-wrap: normal;
  hyphens: none;
}

.banner-standfirst {
  /* Wide enough to land in two lines on a desktop. At 46ch it broke to three
     and left "beyond." alone on the last one, and the orphan cost the banner
     a whole line of the room it is printed on. */
  max-width: 58ch;
  margin: var(--wf-gap-s) 0 0;
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step-1);
  line-height: 1.45;
  text-wrap: pretty;
  /* Printed on the photograph, so it does not follow the theme. */
  color: var(--wf-photo-optic);
}

.record {
  display: flex;
  flex-wrap: wrap;
  /* Three cells on a board, spaced apart rather than punctuated. A middot
     between them is orphaned at the end of a line as soon as this wraps on a
     phone; distance separates them at every width. */
  gap: 0.35em 1.4em;
  margin: var(--wf-gap-s) 0 0;
  font-size: var(--wf-step-0);
  /* Printed on the photograph, so it does not follow the theme. */
  color: var(--wf-photo-optic);
}

.section-heading {
  margin: 0 0 var(--wf-gap-m);
  font-size: var(--wf-step-2);
}

/* ── BOARD ─────────────────────────────────────────────────────────────── */

.board {
  padding-block: var(--wf-gap-l);
}

.lines {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* No rules between the dates. Three entries do not need ruling into a table —
   the date column already aligns them and the space does the separating. Each
   line carries the same tab the events page gives it: grey standing still, lit
   in the line's track on approach. */
.line {
  position: relative;
  display: grid;
  grid-template-columns: 9rem 1fr auto;
  gap: var(--wf-gap-m);
  align-items: baseline;
  padding-block: var(--wf-gap-m);
  padding-left: calc(6px + var(--wf-gap-s));
}

.line::before {
  content: '';
  position: absolute;
  left: 0;
  top: var(--wf-gap-m);
  bottom: var(--wf-gap-m);
  width: 6px;
  background: var(--wf-marker);
  transition: background var(--wf-motion) var(--wf-ease);
}

/* Focus-within as well as hover, so a keyboard reaching the buttons inside the
   line lights the same tab a pointer does. */
.line:hover::before,
.line:focus-within::before {
  background: var(--track, var(--wf-marker-live));
}

.date {
  font-variation-settings: 'wdth' 112;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--wf-optic-dim);
}

/* The sessions are the widest thing a line carries, so they get the line
   instead of the name's column: placed on a second row that runs from the
   name to the far edge, they use the width the buttons leave behind rather
   than wrapping early against a wall of empty board. */
.date {
  grid-column: 1;
  grid-row: 1;
}

.name-cell {
  grid-column: 2;
  grid-row: 1;
}

.links {
  grid-column: 3;
  grid-row: 1;
}

.gave {
  grid-column: 2 / -1;
  grid-row: 2;
}

.name-cell {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.name {
  font-size: var(--wf-step-1);
  overflow-wrap: anywhere;
}

.place {
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step--1);
  color: var(--wf-optic-dim);
}

/* Sessions stacked under their own heading, the same as the events page. The
   colour belongs to the line's tab, not to each session: one event is one
   thing, however much happened there. */
.gave {
  display: block;
  margin-top: var(--wf-gap-xs);
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step--1);
  color: var(--wf-optic-dim);
}

.gave-label {
  display: block;
}

/* A second heading under the same event needs air, otherwise the workshop
   label reads as another line of the session list above it. */
.gave-list + .gave-label {
  margin-top: var(--wf-gap-xs);
}

.gave-list {
  margin: 0.35rem 0 0;
  padding: 0;
  list-style: none;
}

/* A title that wraps on a phone should still read as one item, so the two
   lines sit closer to each other than to the next session. */
.gave-list li {
  line-height: 1.35;
}

.gave-list li + li {
  margin-top: 0.6rem;
}

/* A session title is a link on a board read one-handed, so its hit area is
   padded out to a thumb; the negative margins hold the line where it was. */
.gave-list a {
  display: inline-block;
  padding-block: 0.3rem;
  margin-block: -0.3rem;
  padding-inline: 0.35rem;
  margin-inline: -0.35rem;
  color: var(--wf-optic);
  text-decoration: none;
  transition: background var(--wf-motion) var(--wf-ease);
}

.gave-list a:hover,
.gave-list a:focus-visible {
  background: var(--wf-ink-raised);
}

.links {
  display: flex;
  gap: var(--wf-gap-s);
}

/* The same button the events page uses, so a visitor who learns it here reads
   it there: one outlined control per action, filling on approach. Tickets is
   not singled out in a track colour — the line's own tab is what marks it. */
.links a {
  display: inline-flex;
  align-items: center;
  min-height: var(--wf-tap);
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--wf-optic);
  text-decoration: none;
  border: 1px solid var(--wf-ink-rule);
  padding: 0 0.9em;
  white-space: nowrap;
  transition: background var(--wf-motion) var(--wf-ease),
    color var(--wf-motion) var(--wf-ease);
}

/* Fills in the line's own track rather than plain white, so the button and the
   tab at the head of the line light as one thing. The on-track pair carries the
   text, which is what keeps the contrast measured rather than eyeballed. */
.links a:hover,
.links a:focus-visible {
  background: var(--track, var(--wf-optic));
  border-color: var(--track, var(--wf-optic));
  color: var(--on-track, var(--wf-ink));
}

.board-all {
  display: inline-block;
  position: relative;
  margin-top: var(--wf-gap-m);
  font-variation-settings: 'wdth' 112;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: var(--wf-step--1);
  color: var(--wf-optic);
  text-decoration: none;
  border-bottom: 2px solid var(--wf-marker);
  padding-bottom: 2px;
  transition: border-color var(--wf-motion) var(--wf-ease);
}

/* The word is 28px tall and the thumb needs 56. Padding would drag the rule
   away from the letters it belongs to, so the hit area grows behind it
   instead and the marker stays where it was drawn. */
.board-all::before {
  content: '';
  position: absolute;
  inset: -0.9rem 0;
}

/* Brightens to optic white rather than lighting blue: the blue underline was
   the one mark on this board that pointed at a track the link does not lead to. */
.board-all:hover,
.board-all:focus-visible {
  border-bottom-color: var(--wf-optic);
}

/* ── DIRECTORY ─────────────────────────────────────────────────────────── */

.directory {
  padding-top: var(--wf-gap-m);
  padding-bottom: var(--wf-gap-l);
  border-top: 1px solid var(--wf-ink-rule);
}

.rows {
  display: grid;
  gap: 0 var(--wf-gap-l);
}

/* Inside a column the sign owns its own width, so the arrow terminates the
   column instead of hanging a thousand pixels from the word it belongs to. */
.rows :deep(.link-row) {
  grid-template-columns: 6px minmax(0, 1fr) auto;
  justify-content: stretch;
}

@media (min-width: 768px) {
  .rows {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* On a phone the date leads its own line rather than holding a 9rem column
   that no longer has anything to align to. */
@media (max-width: 640px) {
  .line {
    grid-template-columns: 1fr;
    gap: var(--wf-gap-xs);
  }

  /* One column on a phone: the explicit placement above has nothing left to
     align to, so every part goes back to reading in source order. */
  .date,
  .name-cell,
  .links,
  .gave {
    grid-column: 1;
    grid-row: auto;
  }

  .links {
    margin-top: var(--wf-gap-xs);
  }
}
</style>
