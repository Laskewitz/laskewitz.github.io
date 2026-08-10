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
import { talkCount } from '../../data/talks'
import { eventPlace, flagSrc, formatEventDate } from '../../data/format'
import { data as posts } from '../posts.data'
import SignRow from './SignRow.vue'
import BannerImage from './BannerImage.vue'

/** Three is the most that still reads as a board rather than a list. */
const soon = computed(() => upcomingEvents().slice(0, 3))

/** Newest first out of the loader, so the board's headline is posts[0]. */
const latestPost = computed(() => posts[0])

/**
 * A sign that only says where it goes wastes the walk. Each row carries the
 * fact that would otherwise cost a click, drawn live from the same data the
 * hall behind it renders — so the directory is the record, not a menu.
 *
 * No row carries a hall colour. Events used to, to mark the primary
 * destination, but the board directly above these signs already is events —
 * the colour was pointing at something you had just scrolled past.
 */
const directory = computed(() => [
  {
    href: '/events/',
    label: 'Events',
    note: `Every stage since ${firstYear()}, and the dates still ahead.`
  },
  {
    href: '/talks/',
    label: 'Talks',
    note: `${talkCount()} in rotation, on agents, low-code and the Power Platform.`
  },
  {
    href: '/blog/',
    label: 'Blog',
    note: latestPost.value
      ? `Latest: ${latestPost.value.title}`
      : 'Notes on Copilot Studio, agents and the Power Platform.'
  },
  {
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
      hall="a"
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
      <h2 id="board-heading" class="section-heading wf-sign">Where I'll be</h2>

      <ol class="lines">
        <li v-for="e in soon" :key="e.slug" class="line">
          <span class="date">{{ formatEventDate(e) }}</span>
          <span class="name-cell">
            <span class="name wf-sign">{{ e.name }}</span>
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
              class="is-primary"
              :href="e.tickets"
              target="_blank"
              rel="noopener noreferrer"
              data-hall="d"
              >Tickets ↗</a
            >
          </span>
        </li>
      </ol>

      <a class="board-all" href="/events/">All events →</a>
    </section>

    <nav class="directory wf-gutter" aria-labelledby="directory-heading">
      <h2 id="directory-heading" class="section-heading wf-sign">Explore</h2>
      <div class="rows">
        <SignRow
          v-for="item in directory"
          :key="item.href"
          :href="item.href"
          :label="item.label"
          :note="item.note"
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
   the date column already aligns them and the space does the separating. The
   full board on /events/ earns its rules because it runs to a hundred rows. */
.line {
  display: grid;
  grid-template-columns: 9rem 1fr auto;
  gap: var(--wf-gap-m);
  align-items: baseline;
  padding-block: var(--wf-gap-m);
}

.date {
  font-variation-settings: 'wdth' 112;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--wf-optic-dim);
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

.links {
  display: flex;
  gap: var(--wf-gap-s);
}

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
  border: 1px solid var(--wf-marker);
  padding: 0 0.9em;
  white-space: nowrap;
  transition: border-color var(--wf-motion) var(--wf-ease);
}

.links a:hover,
.links a:focus-visible {
  border-color: var(--wf-marker-live);
}

/* One booking action per line, in the hall reserved for it. */
.links a.is-primary {
  background: var(--hall);
  color: var(--on-hall);
  border-color: var(--hall);
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

.board-all:hover,
.board-all:focus-visible {
  border-bottom-color: var(--wf-marker-live);
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
.rows :deep(.sign-row) {
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

  .links {
    margin-top: var(--wf-gap-xs);
  }
}
</style>
