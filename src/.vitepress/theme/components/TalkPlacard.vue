<script setup lang="ts">
/** A single talk: the placard, the abstract, and every stage it's been on. */
import { computed } from 'vue'
import { getTalk, formatLabel } from '../../data/talks'
import { getEvent, isUpcoming, hasStarted } from '../../data/events'
import { billing } from '../../data/speakers'
import { eventPlace, flag, formatEventDate } from '../../data/format'
import SignRow from './SignRow.vue'

const props = defineProps<{ slug: string }>()

const talk = computed(() => getTalk(props.slug))

/* Longer abstracts carry real paragraph breaks; keep them as paragraphs. */
const abstractParas = computed(() =>
  (talk.value?.abstract ?? '').split('\n\n').filter(Boolean)
)

const deliveries = computed(() =>
  (talk.value?.deliveries ?? [])
    .map((d) => ({ delivery: d, event: getEvent(d.eventSlug) }))
    .filter((d) => d.event)
    .sort((a, b) => b.event!.start.localeCompare(a.event!.start))
)

/* An accepted outing that hasn't happened yet is booked, not given, so the two
   get their own boards rather than one list that quietly mixes tenses. */
const booked = computed(() =>
  deliveries.value.filter((d) => isUpcoming(d.event!)).reverse()
)
const given = computed(() => deliveries.value.filter((d) => !isUpcoming(d.event!)))

const stageSections = computed(() =>
  [
    { key: 'booked', heading: 'Coming up', items: booked.value },
    { key: 'given', heading: 'Past', items: given.value }
  ].filter((s) => s.items.length)
)

/**
 * The resource door for one specific outing, billed with the people who were
 * actually on stage for it. `?with=` is always written — including empty for a
 * solo delivery — because omitting it would let the talk's default billing
 * stand and credit a co-speaker who wasn't there.
 */
function resourceHref(delivery: { coSpeakers?: readonly string[] }) {
  const others = (delivery.coSpeakers ?? []).filter((s) => s !== 'laskewitz')
  return `/r/${talk.value!.resourceSlug}/?with=${others.join(',')}`
}
</script>

<template>
  <article v-if="talk" class="talk" :data-hall="talk.hall">
    <header class="head wf-gutter">
      <a class="back" href="/talks/">← All talks</a>

      <div class="tiles">
        <span class="format" :data-format="talk.format ?? 'session'">{{
          formatLabel(talk)
        }}</span>
        <span v-for="tag in talk.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>

      <h1 class="title wf-sign">{{ talk.title }}</h1>
      <p class="summary">{{ talk.summary }}</p>
    </header>

    <section class="abstract wf-gutter">
      <p class="wf-label">Abstract</p>
      <p v-for="(para, i) in abstractParas" :key="i" class="wf-read prose">{{ para }}</p>
    </section>

    <section class="stages wf-gutter">
      <p v-if="!deliveries.length" class="section-heading wf-sign">Past</p>
      <p v-if="!deliveries.length" class="empty">
        Not on a stage yet — or the record hasn't caught up. Ask me about it.
      </p>

      <template v-for="section in stageSections" :key="section.key">
        <h2 class="section-heading wf-sign">
          {{ section.heading }}
          <span class="count">{{ section.items.length }}</span>
        </h2>

        <ol class="lines">
          <li v-for="{ delivery, event } in section.items" :key="event!.slug" class="line">
          <span class="date">{{ formatEventDate(event!) }}</span>

          <span class="stage-body">
            <span class="event-name wf-sign">{{ event!.name }}</span>

            <span v-if="delivery.coSpeakers?.length" class="with wf-sign">
              <span class="with-word">With</span>
              <span class="with-name">{{
                billing(delivery.coSpeakers)
                  .filter((s) => s.slug !== 'laskewitz')
                  .map((s) => s.name)
                  .join(' and ')
              }}</span>
            </span>

            <span class="place">
              <span v-if="flag(event!.country)" aria-hidden="true">{{
                flag(event!.country)
              }}</span>
              {{ eventPlace(event!) }}
            </span>
          </span>

          <span class="stage-links">
            <a
              v-if="talk.resourceSlug && hasStarted(event!)"
              class="stage-link is-resources"
              :href="resourceHref(delivery)"
              >Resources</a
            >

            <a
              v-if="event!.website"
              class="stage-link"
              :href="event!.website"
              target="_blank"
              rel="noopener noreferrer"
              >Website ↗</a
            >

            <a
              v-if="event!.tickets && isUpcoming(event!)"
              class="stage-link is-tickets"
              :href="event!.tickets"
              target="_blank"
              rel="noopener noreferrer"
              >Tickets ↗</a
            >
          </span>
        </li>
        </ol>
      </template>
    </section>

    <nav v-if="talk.slides" class="doors wf-gutter">
      <SignRow
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

/* A session is the norm and stays quiet; a workshop is hours and hands-on, so
   it carries the brighter ink. */
.format {
  padding: 2px 8px;
  border: 1px solid var(--wf-ink-rule);
  font-variation-settings: 'wdth' 112;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--wf-optic-dim);
}

.format[data-format='workshop'] {
  border-color: var(--wf-optic);
  color: var(--wf-optic);
}

.title {
  margin: var(--wf-gap-s) 0 0;
  font-size: var(--wf-step-3);
  font-weight: 900;
  letter-spacing: -0.028em;
  margin-left: -0.03em;
  /* Long single words (MAINTAINABILITY,) must hyphenate, never snap mid-word. */
  overflow-wrap: break-word;
  hyphens: auto;
}

/* At phone width the display step is wider than the longest word in the
   programme. Step down so signage still reads as one cut line. */
@media (max-width: 480px) {
  .title {
    font-size: clamp(1.7rem, 1.05rem + 3.4vw, 2.1rem);
  }
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
  padding-top: var(--wf-gap-xl);
  padding-bottom: var(--wf-gap-xl);
}

.section-heading {
  display: flex;
  align-items: baseline;
  gap: var(--wf-gap-s);
  margin: 0 0 var(--wf-gap-m);
  font-size: var(--wf-step-2);
}

/* A second board under the first needs room to read as its own board. */
.lines + .section-heading {
  margin-top: var(--wf-gap-xl);
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

/* Matches the events directory: no hairline per row, the date column and the
   space do the separating. */
.line {
  display: grid;
  grid-template-columns: 13rem 1fr auto;
  align-items: baseline;
  gap: var(--wf-gap-xs) var(--wf-gap-m);
  padding: calc(var(--wf-gap-s) * 0.9) 0;
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

.place {
  align-self: flex-start;
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step--1);
  line-height: 1.3;
  color: var(--wf-optic-dim);
}

/* Shared billing reads as a late-addition sticker slapped onto the placard —
   small, hall-coloured, and applied a degree or two off true. It always sits on
   its own line between the event and the city so it lands in the same place on
   every row; hanging it beside the title made it jump around as names wrapped.
   Ink stays the measured on-hall pair; opacity would break the contrast law. */
.with {
  display: inline-flex;
  align-self: flex-start;
  align-items: baseline;
  gap: 0.42em;
  margin: 0.3em 0 0.15em;
  padding: 0.18em 0.5em;
  background: var(--hall);
  color: var(--on-hall);
  font-size: 0.68rem;
  line-height: 1.25;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  transform: rotate(-1.8deg);
  transform-origin: 0 50%;
  box-shadow: 1px 2px 0 rgb(0 0 0 / 0.28);
}

.with-word {
  font-weight: 400;
  font-variation-settings: 'wdth' 100;
}

.with-name {
  font-weight: 700;
}

.stage-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--wf-gap-xs);
  justify-content: flex-start;
}

.stage-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 var(--wf-gap-s);
  border: 1px solid var(--wf-ink-rule);
  color: var(--wf-optic-dim);
  font-variation-settings: 'wdth' 110;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
}

/* The handout is what an attendee came back for, so it outranks the venue link. */
.stage-link.is-resources {
  border-color: var(--hall);
  color: var(--wf-optic);
}

/* A seat you can still buy is the only action left on an upcoming outing. */
.stage-link.is-tickets {
  border-color: var(--hall);
  background: var(--hall);
  color: var(--on-hall);
}

.stage-link:hover,
.stage-link:focus-visible {
  background: var(--wf-optic);
  color: var(--wf-ink);
}

.stage-link.is-resources:hover,
.stage-link.is-resources:focus-visible {
  background: var(--hall);
  color: var(--on-hall);
}

.doors {
  padding-bottom: var(--wf-gap-xl);
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
