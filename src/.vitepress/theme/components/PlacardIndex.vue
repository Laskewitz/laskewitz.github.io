<script setup lang="ts">
/** The placard index — one plate per talk in rotation. */
import { talks } from '../../data/talks'
import { getEvent } from '../../data/events'
import { eventYear } from '../../data/format'
import HallTile from './HallTile.vue'

function lastGiven(slug: string): string | null {
  const talk = talks.find((t) => t.slug === slug)
  if (!talk?.deliveries.length) return null
  const years = talk.deliveries
    .map((d) => getEvent(d.eventSlug))
    .filter(Boolean)
    .map((e) => eventYear(e!))
    .sort()
  return years.at(-1) ?? null
}
</script>

<template>
  <div class="placards">
    <header class="head wf-gutter">
      <p class="wf-label">Room placards</p>
      <h1 class="title wf-sign">Talks</h1>
      <p class="standfirst">
        These aren't one-offs. Each of these gets given again, at different
        events, sometimes with someone else on stage next to me. If you're
        organising something and one of these fits, get in touch.
      </p>
    </header>

    <div class="grid wf-gutter">
      <a
        v-for="talk in talks"
        :key="talk.slug"
        class="placard"
        :href="`/talks/${talk.slug}`"
        :data-hall="talk.hall"
      >
        <span class="band" aria-hidden="true" />

        <span class="placard-body">
          <span class="tiles">
            <HallTile :hall="talk.hall" :text="`Hall ${talk.hall}`" />
            <span v-if="lastGiven(talk.slug)" class="last">
              Last given {{ lastGiven(talk.slug) }}
            </span>
          </span>

          <span class="talk-title wf-sign">{{ talk.title }}</span>
          <span class="summary">{{ talk.summary }}</span>

          <span class="tags">
            <span v-for="tag in talk.tags" :key="tag" class="tag">{{ tag }}</span>
          </span>
        </span>

        <span class="arrow" aria-hidden="true">→</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.head {
  padding-top: var(--wf-gap-xl);
  padding-bottom: var(--wf-gap-m);
}

.title {
  margin: var(--wf-gap-xs) 0 0;
  font-size: var(--wf-step-4);
  font-weight: 900;
  letter-spacing: -0.03em;
  margin-left: -0.035em;
}

.standfirst {
  max-width: 54ch;
  margin: var(--wf-gap-s) 0 0;
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step-0);
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.grid {
  display: grid;
  gap: 1px;
  padding-bottom: var(--wf-gap-xl);
  border-top: 1px solid var(--wf-ink-rule);
}

.placard {
  display: grid;
  grid-template-columns: 8px 1fr auto;
  align-items: start;
  gap: var(--wf-gap-m);
  padding: var(--wf-gap-m) 0;
  border-bottom: 1px solid var(--wf-ink-rule);
  color: var(--wf-optic);
  text-decoration: none;
  transition: background var(--wf-motion) var(--wf-ease);
}

.placard:hover,
.placard:focus-visible {
  background: var(--wf-ink-raised);
}

.band {
  align-self: stretch;
  background: var(--hall);
}

.placard-body {
  display: flex;
  flex-direction: column;
  gap: var(--wf-gap-xs);
  min-width: 0;
}

.tiles {
  display: flex;
  align-items: center;
  gap: var(--wf-gap-xs);
  flex-wrap: wrap;
}

.last {
  font-variation-settings: 'wdth' 105;
  font-weight: 600;
  font-size: var(--wf-step--1);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--wf-optic-dim);
}

.talk-title {
  font-size: var(--wf-step-2);
  overflow-wrap: break-word;
  hyphens: auto;
}

.summary {
  max-width: 56ch;
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step-0);
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--wf-gap-xs);
  margin-top: var(--wf-gap-hair);
}

.tag {
  font-variation-settings: 'wdth' 105;
  font-weight: 600;
  font-size: var(--wf-step--1);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--wf-optic-dim);
}

.tag + .tag::before {
  content: '·';
  margin-right: var(--wf-gap-xs);
}

.arrow {
  align-self: center;
  font-size: var(--wf-step-3);
  line-height: 1;
  padding-right: var(--wf-gap-xs);
  transition: transform var(--wf-motion) var(--wf-ease);
}

.placard:hover .arrow,
.placard:focus-visible .arrow {
  transform: translateX(5px);
}

@media (max-width: 640px) {
  .placard {
    gap: var(--wf-gap-s);
  }

  .arrow {
    font-size: var(--wf-step-2);
  }
}
</style>
