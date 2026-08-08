<script setup lang="ts">
/** A single talk: the placard, the abstract, and every stage it's been on. */
import { computed } from 'vue'
import { getTalk } from '../../data/talks'
import { getEvent } from '../../data/events'
import { billing } from '../../data/speakers'
import { eventPlace, flag, formatEventDate } from '../../data/format'
import HallTile from './HallTile.vue'
import SignRow from './SignRow.vue'
import SpeakerPlate from './SpeakerPlate.vue'

const props = defineProps<{ slug: string }>()

const talk = computed(() => getTalk(props.slug))

const deliveries = computed(() =>
  (talk.value?.deliveries ?? [])
    .map((d) => ({ delivery: d, event: getEvent(d.eventSlug) }))
    .filter((d) => d.event)
    .sort((a, b) => b.event!.start.localeCompare(a.event!.start))
)
</script>

<template>
  <article v-if="talk" class="talk" :data-hall="talk.hall">
    <header class="head wf-gutter">
      <a class="back" href="/talks/">← All talks</a>

      <div class="tiles">
        <HallTile :hall="talk.hall" :text="`Hall ${talk.hall}`" />
        <span v-for="tag in talk.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>

      <h1 class="title wf-sign">{{ talk.title }}</h1>
      <p class="summary">{{ talk.summary }}</p>
    </header>

    <section class="abstract wf-gutter">
      <p class="wf-label">Abstract</p>
      <p class="wf-read prose">{{ talk.abstract }}</p>
    </section>

    <section class="stages wf-gutter">
      <h2 class="section-heading wf-sign">
        Where I've given it
        <span class="count">{{ deliveries.length }}</span>
      </h2>

      <p v-if="!deliveries.length" class="empty">
        Not on a stage yet — or the record hasn't caught up. Ask me about it.
      </p>

      <ol v-else class="lines">
        <li v-for="{ delivery, event } in deliveries" :key="event!.slug" class="line">
          <span class="date">{{ formatEventDate(event!) }}</span>

          <span class="stage-body">
            <span class="event-name wf-sign">{{ event!.name }}</span>
            <span class="place">
              <span v-if="flag(event!.country)" aria-hidden="true">{{
                flag(event!.country)
              }}</span>
              {{ eventPlace(event!) }}
            </span>

            <span v-if="delivery.coSpeakers?.length" class="with">
              With
              {{
                billing(delivery.coSpeakers)
                  .filter((s) => s.slug !== 'laskewitz')
                  .map((s) => s.name)
                  .join(' and ')
              }}
            </span>
          </span>

          <a
            v-if="event!.website"
            class="stage-link"
            :href="event!.website"
            target="_blank"
            rel="noreferrer"
            >Site ↗</a
          >
        </li>
      </ol>
    </section>

    <section class="onstage wf-gutter">
      <SpeakerPlate
        heading="On stage"
        :hall="talk.hall"
        :speakers="billing(talk.defaultCoSpeakers)"
      />
    </section>

    <nav v-if="talk.resourceSlug || talk.slides" class="doors wf-gutter">
      <SignRow
        v-if="talk.resourceSlug"
        :href="`/r/${talk.resourceSlug}`"
        label="Session resources"
        note="The page I put on the last slide"
        :hall="talk.hall"
        size="door"
      />
      <SignRow
        v-if="talk.slides"
        :href="talk.slides"
        label="Slides"
        :hall="talk.hall"
        size="door"
        external
      />
    </nav>
  </article>
</template>

<style scoped>
/* A placard is read at arm's length, not scanned across a hall — so the detail
   column is capped rather than stretched to the full venue width. */
.talk :deep(.wf-gutter) > *,
.head > *,
.abstract > *,
.stages > *,
.onstage > *,
.doors > * {
  max-width: 68rem;
}

.head {
  padding-top: var(--wf-gap-l);
  padding-bottom: var(--wf-gap-m);
  border-bottom: 3px solid var(--hall);
}

.back {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-variation-settings: 'wdth' 108;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--wf-optic-dim);
  text-decoration: none;
}

.back:hover,
.back:focus-visible {
  color: var(--wf-optic);
}

.tiles {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--wf-gap-xs);
  margin-top: var(--wf-gap-xs);
}

.tag {
  font-variation-settings: 'wdth' 105;
  font-weight: 600;
  font-size: var(--wf-step--1);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--wf-optic-dim);
}

.title {
  margin: var(--wf-gap-s) 0 0;
  font-size: var(--wf-step-3);
  font-weight: 900;
  letter-spacing: -0.028em;
  margin-left: -0.03em;
}

.summary {
  max-width: 54ch;
  margin: var(--wf-gap-s) 0 0;
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step-1);
  line-height: 1.45;
  color: var(--vp-c-text-2);
}

.abstract {
  padding-top: var(--wf-gap-l);
  padding-bottom: var(--wf-gap-l);
}

.prose {
  margin: var(--wf-gap-s) 0 0;
  color: var(--vp-c-text-1);
}

.stages {
  padding-top: var(--wf-gap-l);
  padding-bottom: var(--wf-gap-l);
  border-top: 1px solid var(--wf-ink-rule);
}

.section-heading {
  display: flex;
  align-items: baseline;
  gap: var(--wf-gap-s);
  margin: 0 0 var(--wf-gap-m);
  font-size: var(--wf-step-2);
}

.count {
  font-variation-settings: 'wdth' 100;
  font-weight: 600;
  font-size: var(--wf-step--1);
  letter-spacing: 0.08em;
  color: var(--wf-optic-dim);
}

.empty {
  max-width: 46ch;
  font-variation-settings: 'wdth' 100;
  color: var(--vp-c-text-2);
}

.lines {
  margin: 0;
  padding: 0;
  list-style: none;
}

.line {
  display: grid;
  grid-template-columns: 13rem 1fr auto;
  align-items: baseline;
  gap: var(--wf-gap-xs) var(--wf-gap-m);
  padding: var(--wf-gap-s) 0;
  border-bottom: 1px solid var(--wf-ink-rule);
}

.date {
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--wf-optic-dim);
  white-space: nowrap;
}

.stage-body {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.event-name {
  font-size: var(--wf-step-1);
  overflow-wrap: anywhere;
}

.place,
.with {
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step--1);
  color: var(--vp-c-text-2);
}

.with {
  color: var(--wf-optic-dim);
}

.stage-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 var(--wf-gap-s);
  border: 1px solid var(--wf-ink-rule);
  color: var(--wf-optic);
  font-variation-settings: 'wdth' 110;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
}

.stage-link:hover,
.stage-link:focus-visible {
  background: var(--wf-optic);
  color: var(--wf-ink);
}

.onstage {
  padding-top: var(--wf-gap-l);
  padding-bottom: var(--wf-gap-l);
  border-top: 1px solid var(--wf-ink-rule);
}

.doors {
  padding-bottom: var(--wf-gap-xl);
  border-top: 1px solid var(--wf-ink-rule);
}

@media (max-width: 820px) {
  .line {
    grid-template-columns: 1fr;
  }

  .stage-link {
    justify-self: start;
    margin-top: var(--wf-gap-hair);
  }
}
</style>
