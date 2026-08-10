<script setup lang="ts">
/**
 * The entrance directory. First viewport of the venue.
 *
 * A hanging banner leads — a real room, the name cut across it — then the
 * illuminated NEXT strip, then the halls. One arrival, top to bottom.
 */
import { computed } from 'vue'
import { upcomingEvents } from '../../data/events'
import { eventPlace, flagSrc, formatEventDate } from '../../data/format'
import SignRow from './SignRow.vue'
import BannerImage from './BannerImage.vue'

const next = computed(() => upcomingEvents()[0])

const directory = [
  { href: '/events/', label: 'Events', hall: 'a' as const },
  { href: '/talks/', label: 'Talks', hall: 'b' as const },
  { href: '/blog/', label: 'Blog', hall: 'c' as const },
  { href: '/about/', label: 'About', hall: 'e' as const }
]
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
    </BannerImage>

    <!-- The illuminated strip sits between the banner and the directory: it
         breaks the page where the photograph ends and the signage begins, and
         puts the one time-sensitive thing above the halls. -->
    <a v-if="next" class="next" href="/events/" data-hall="a">
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
   of the arrival pushing itself off its own screen. */
.entrance :deep(.banner) {
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

.directory {
  margin-top: auto;
  padding-bottom: var(--wf-gap-l);
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
  .next {
    grid-template-columns: 1fr auto;
    gap: var(--wf-gap-xs) var(--wf-gap-s);
  }

  .next-label {
    grid-column: 1 / -1;
  }
}
</style>
