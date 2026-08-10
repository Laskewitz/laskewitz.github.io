<script setup lang="ts">
/**
 * The entrance directory. First viewport of the venue.
 *
 * `variant` selects which object leads the viewport. All three keep the
 * world — signage rows, hall colours, the illuminated NEXT strip — and differ
 * only in what claims the top of the page.
 *
 *   board      the next event, full-bleed, as a departure board
 *   directory  no display lettering at all; the halls lead
 *   record     the count of events as the headline
 *   banner     the hanging banner leads — a real room, the name cut over it
 */
import { computed } from 'vue'
import {
  countryCount,
  eventCount,
  firstYear,
  upcomingEvents
} from '../../data/events'
import { talks } from '../../data/talks'
import { eventPlace, flagSrc, formatEventDate } from '../../data/format'
import SignRow from './SignRow.vue'
import BannerImage from './BannerImage.vue'

withDefaults(
  defineProps<{ variant?: 'board' | 'directory' | 'record' | 'banner' }>(),
  { variant: 'banner' }
)

const next = computed(() => upcomingEvents()[0])

/* The programme runs from the first year on the list, which is now also the
   year he started. The tally counts what is listed, not every talk he ever
   gave, so it says "listed". */
const years = computed(() => `${firstYear()}—${new Date().getFullYear()}`)

const directory = [
  { href: '/events/', label: 'Events', hall: 'a' as const },
  { href: '/talks/', label: 'Talks', hall: 'b' as const },
  { href: '/blog/', label: 'Blogs', hall: 'c' as const },
  { href: '/about/', label: 'About', hall: 'e' as const }
]
</script>

<template>
  <div class="entrance" :class="`is-${variant}`">
    <!-- BOARD: the venue tells you what is on before it tells you whose it is. -->
    <a v-if="variant === 'board' && next" class="board" href="/events/" data-hall="a">
      <span class="board-label wf-label">Next up</span>
      <span class="board-name wf-sign">{{ next.name }}</span>
      <span class="board-meta">
        {{ formatEventDate(next) }}
        <img v-if="flagSrc(next.country)" class="flag" :src="flagSrc(next.country)" alt="" width="18" height="18" loading="lazy" decoding="async" />
        {{ eventPlace(next) }}
      </span>
      <span class="board-arrow" aria-hidden="true">→</span>
    </a>

    <!-- RECORD: the record is the claim, not the name. -->
    <header v-else-if="variant === 'record'" class="marquee wf-gutter">
      <p class="wf-label">Speaking programme · {{ years }}</p>
      <p class="tally wf-sign">
        <span class="tally-figure">{{ eventCount() }}</span>
        <span class="tally-word">events listed</span>
      </p>
      <p class="tally-sub wf-sign">
        {{ countryCount() }} countries · {{ talks.length }} talks
      </p>
    </header>

    <!-- BANNER: a real room leads, and the name is cut across it. -->
    <BannerImage
      v-else-if="variant === 'banner'"
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
    </BannerImage>

    <header
      v-if="variant !== 'banner'"
      class="ident wf-gutter"
      :class="{ 'is-lead': variant === 'directory' }"
    >
      <h1 class="name">Daniel Laskewitz</h1>
      <p class="standfirst">
        Principal Cloud Advocate at Microsoft. I talk about agents,
        low-code and the Power Platform at conferences across Europe and beyond.
        Everything I point people to from a stage lives here.
      </p>

      <dl v-if="variant !== 'record'" class="counts">
        <div>
          <dt class="wf-label">Events</dt>
          <dd class="wf-sign">{{ eventCount() }}</dd>
        </div>
        <div>
          <dt class="wf-label">Countries</dt>
          <dd class="wf-sign">{{ countryCount() }}</dd>
        </div>
        <div>
          <dt class="wf-label">Talks</dt>
          <dd class="wf-sign">{{ talks.length }}</dd>
        </div>
      </dl>
    </header>

    <!-- The illuminated strip sits between the banner and the directory: it
         breaks the page where the photograph ends and the signage begins, and
         puts the one time-sensitive thing above the halls. Not repeated when
         the same event is already leading the page as the board. -->
    <a
      v-if="next && variant !== 'board'"
      class="next"
      href="/events/"
      data-hall="a"
    >
      <span class="next-label wf-label">Next up</span>
      <span class="next-body">
        <span class="next-name wf-sign">{{ next.name }}</span>
        <span class="next-meta">
          {{ formatEventDate(next) }}
          <img v-if="flagSrc(next.country)" class="flag" :src="flagSrc(next.country)" alt="" width="18" height="18" loading="lazy" decoding="async" />
          {{ eventPlace(next) }}
        </span>
      </span>
      <span class="next-arrow" aria-hidden="true">→</span>
    </a>

    <nav class="directory wf-gutter" aria-label="Main directory">
      <SignRow
        v-for="item in directory"
        :key="item.href"
        :href="item.href"
        :label="item.label"
        :hall="item.hall"
        :size="variant === 'directory' ? 'door' : 'default'"
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

/* ── BOARD ─────────────────────────────────────────────────────────────── */

.board {
  display: grid;
  grid-template-columns: 1fr auto;
  align-content: center;
  gap: var(--wf-gap-xs) var(--wf-gap-m);
  padding: var(--wf-gap-xl) var(--wf-gutter);
  background: var(--hall);
  color: var(--on-hall);
  text-decoration: none;
}

.board-label {
  grid-column: 1 / -1;
  margin: 0;
  color: inherit;
}

.board-name {
  font-size: clamp(2.2rem, 1rem + 5.4vw, 5.5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  margin-left: -0.03em;
  overflow-wrap: anywhere;
}

.board-meta {
  grid-column: 1;
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step-1);
  line-height: 1.4;
}

.board-arrow {
  grid-row: 2 / 4;
  grid-column: 2;
  align-self: center;
  font-size: var(--wf-step-3);
  line-height: 1;
  transition: transform var(--wf-motion) var(--wf-ease);
}

.board:hover .board-arrow,
.board:focus-visible .board-arrow {
  transform: translateX(6px);
}

/* ── RECORD ────────────────────────────────────────────────────────────── */

.marquee {
  padding-top: var(--wf-gap-xl);
}

.tally {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0 var(--wf-gap-s);
  margin: var(--wf-gap-xs) 0 0;
  font-size: min(var(--wf-step-venue), 17vw);
  font-weight: 900;
  letter-spacing: -0.035em;
  line-height: 0.85;
  margin-left: -0.04em;
}

.tally-word {
  font-size: 0.42em;
}

.tally-sub {
  margin: var(--wf-gap-s) 0 0;
  font-size: var(--wf-step-1);
  color: var(--wf-optic-dim);
}

/* ── BANNER ────────────────────────────────────────────────────────────── */

/* Nothing stands between the banner and the directory, so the photograph
   takes all the room down to the first sign. */
/* On a tall screen the photograph takes the slack; on a short or laptop screen
   it yields, so the three signs and the next date stay above the fold instead
   of the arrival pushing itself off its own screen. */
.is-banner :deep(.banner) {
  flex: 1 1 auto;
  min-height: min(52vh, 17rem);
  min-height: min(52dvh, 17rem);
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
  max-width: 46ch;
  margin: var(--wf-gap-s) 0 0;
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step-1);
  line-height: 1.45;
  /* Printed on the photograph, so it does not follow the theme. */
  color: var(--wf-photo-optic);
}

/* ── Identity block ────────────────────────────────────────────────────── */

.ident {
  padding-top: var(--wf-gap-l);
  padding-bottom: var(--wf-gap-l);
}

/* When no display lettering leads the page, the identity line carries it. */
.ident.is-lead {
  padding-top: var(--wf-gap-xl);
}

.name {
  margin: 0;
  font-variation-settings: 'wdth' 112;
  font-weight: 700;
  font-size: var(--wf-step-1);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.ident.is-lead .name {
  font-variation-settings: 'wdth' 118;
  font-weight: 800;
  font-size: var(--wf-step-2);
  letter-spacing: -0.01em;
}

.standfirst {
  max-width: 54ch;
  margin: var(--wf-gap-s) 0 0;
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step-0);
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.counts {
  display: flex;
  flex-wrap: wrap;
  gap: var(--wf-gap-l);
  margin: var(--wf-gap-l) 0 0;
}

.counts div {
  min-width: 0;
}

.counts dt {
  margin: 0;
}

.counts dd {
  margin: 0.15rem 0 0;
  font-size: var(--wf-step-2);
  line-height: 1;
}

.directory {
  margin-top: auto;
  padding-bottom: var(--wf-gap-l);
}

/* In the directory variant the signage IS the page — the rows take the space
   the display lettering gave up rather than leaving a hole above them. */
.is-directory .directory {
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
}

.is-directory .directory :deep(.sign-row) {
  flex: 1 1 0;
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

.next-name {
  font-size: var(--wf-step-1);
  overflow-wrap: anywhere;
}

.next-meta {
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step--1);
  line-height: 1.4;
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

@media (max-width: 640px) {
  .board {
    padding-top: var(--wf-gap-l);
    padding-bottom: var(--wf-gap-l);
  }

  .marquee {
    padding-top: var(--wf-gap-l);
  }

  .counts {
    gap: var(--wf-gap-m);
  }

  .next {
    grid-template-columns: 1fr auto;
    gap: var(--wf-gap-xs) var(--wf-gap-s);
  }

  .next-label {
    grid-column: 1 / -1;
  }
}
</style>
