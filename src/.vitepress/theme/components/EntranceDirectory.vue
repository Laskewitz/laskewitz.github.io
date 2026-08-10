<script setup lang="ts">
/**
 * The entrance directory. First viewport of the venue.
 *
 * A hanging banner leads — a real room, the name cut across it — then the
 * illuminated NEXT strip, then the halls. One arrival, top to bottom.
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
import type { Hall } from '../../data/types'
import SignRow from './SignRow.vue'
import BannerImage from './BannerImage.vue'

const next = computed(() => upcomingEvents()[0])

/**
 * The strip is the event, not the hall behind it. Sending it to /events/ made
 * it a duplicate of the EVENTS row directly beneath it — two adjacent controls,
 * one destination. It goes to the event's own site now, so the strip means
 * "this one" and the row means "all of them".
 */
const nextHref = computed(
  () => next.value?.website ?? next.value?.tickets ?? '/events/'
)
const nextExternal = computed(() => nextHref.value.startsWith('http'))

/** Newest first out of the loader, so the board's headline is posts[0]. */
const latestPost = computed(() => posts[0])

/**
 * A sign that only says where it goes wastes the walk. Each row carries the
 * fact that would otherwise cost a click, drawn live from the same data the
 * hall behind it renders — so the directory is the record, not a menu.
 *
 * Only Events carries a hall colour. Hall colours are named for subjects in
 * DESIGN.md, so four different ones down this list said nothing and looked
 * like a code to crack. Blue here is the same blue as the strip above it: one
 * system, "the next event" and "every event", said in one colour.
 */
const directory = computed<
  { href: string; label: string; hall?: Hall; note: string }[]
>(() => [
  {
    href: '/events/',
    label: 'Events',
    hall: 'a' as const,
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

    <!-- The illuminated strip sits between the banner and the directory: it
         breaks the page where the photograph ends and the signage begins, and
         puts the one time-sensitive thing above the halls. It leads to the
         event itself; the EVENTS row below leads to the record. -->
    <a
      v-if="next"
      class="next"
      :href="nextHref"
      :target="nextExternal ? '_blank' : undefined"
      :rel="nextExternal ? 'noopener noreferrer' : undefined"
      data-hall="a"
    >
      <span class="next-label wf-label">Next up</span>
      <span class="next-body">
        <span class="next-name wf-sign">{{ next.name }}</span>
        <span class="next-meta">
          {{ formatEventDate(next) }}
          <img v-if="flagSrc(next.country)" class="flag" :src="flagSrc(next.country)" alt="" width="20" height="20" loading="lazy" decoding="async" />
          {{ eventPlace(next) }}
        </span>
      </span>
      <span class="next-arrow" aria-hidden="true">{{ nextExternal ? '↗' : '→' }}</span>
    </a>

    <nav class="directory wf-gutter" aria-label="Main directory">
      <SignRow
        v-for="item in directory"
        :key="item.href"
        :href="item.href"
        :label="item.label"
        :note="item.note"
        :hall="item.hall"
      />
    </nav>
  </div>
</template>

<style scoped>
/* One screen, footer included: the entrance is the whole arrival, so it claims
   the viewport minus the nav above it and the signed-off strip below. */
.entrance {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - var(--vp-nav-height) - var(--wf-footer-h));
  min-height: calc(100dvh - var(--vp-nav-height) - var(--wf-footer-h));
}

/* ── BANNER ────────────────────────────────────────────────────────────── */

/* On a tall screen the photograph takes the slack; on a short or laptop screen
   it yields, so the four signs and the next date stay above the fold instead
   of the arrival pushing itself off its own screen. The floor is what the
   room still reads at once the signs and their notes have taken their room on
   an 800px-tall laptop. */
.entrance :deep(.banner) {
  flex: 1 1 auto;
  min-height: min(52vh, 14rem);
  min-height: min(52dvh, 14rem);
}

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

/* The signs sit on the floor of the entrance. The tail below them was slack
   rather than cadence, and the room above wants it more than the footer does. */
.directory {
  margin-top: auto;
  padding-bottom: var(--wf-gap-m);
}

/* The notes are for the organiser reading on a desktop. On a phone the four
   bare signs and the next date have to hold one screen, and a second line on
   every row is what would break it. */
@media (max-width: 767px) {
  .directory :deep(.note) {
    display: none;
  }
}

/* ── The illuminated strip along the bottom edge ───────────────────────── */

.next {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--wf-gap-m);
  padding: var(--wf-gap-m) var(--wf-gutter);
  background: var(--hall);
  color: var(--on-hall);
  text-decoration: none;
  min-height: var(--wf-tap);
}

/* Text on a hall field is never faded — a dimmed label re-fails the contrast
   check the hall pairs were chosen to pass. */
.next-label {
  color: inherit;
  white-space: nowrap;
}

.next-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

/* The dated fact outranks the standing bio line above it. Both sat at
   --wf-step-1, which left the one thing that changes reading no louder than
   the one thing that never does. */
.next-name {
  font-size: var(--wf-step-2);
  line-height: 1.05;
  overflow-wrap: anywhere;
}

.next-meta {
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step-0);
  line-height: 1.4;
}

/* At the strip's old size the flag was a 15px smudge from desk distance. It
   is a country, so it is read, not decorated with. */
.next-meta .flag {
  width: 1.3em;
  height: 1.3em;
  vertical-align: -0.32em;
}

.next-arrow {
  font-size: var(--wf-step-2);
  line-height: 1;
  transition: transform var(--wf-motion) var(--wf-ease);
}

.next:hover .next-arrow,
.next:focus-visible .next-arrow {
  transform: translateX(4px);
}

/* A short screen is still one arrival. Rather than let the entrance push its
   own footer off the bottom, the venue closes up: the room keeps its floor,
   and the air around the signs is what gives way. Scoped to the entrance, so
   halls and doors elsewhere keep their full spacing. */
@media (max-height: 860px) {
  .entrance :deep(.banner-body) {
    padding-top: var(--wf-gap-s);
    padding-bottom: var(--wf-gap-s);
  }

  .next {
    padding-block: var(--wf-gap-s);
  }

  .directory {
    padding-bottom: var(--wf-gap-s);
  }

  .directory :deep(.sign-row) {
    padding-block: 0.6rem;
  }
}

@media (max-width: 640px) {
  .next {
    grid-template-columns: 1fr auto;
    gap: var(--wf-gap-xs) var(--wf-gap-s);
  }

  .next-label {
    grid-column: 1 / -1;
  }
}
</style>
