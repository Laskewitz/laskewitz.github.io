<script setup lang="ts">
/** A single talk: the placard, the abstract, and every stage it's been on. */
import { computed } from 'vue'
import { getTalk, formatLabel } from '../../data/talks'
import type { Hall } from '../../data/types'
import { getEvent, isUpcoming, hasStarted } from '../../data/events'
import { eventPlace, flagSrc, formatEventDate } from '../../data/format'
import CoSpeakerBadge from './CoSpeakerBadge.vue'
import LinkRow from './LinkRow.vue'

/* The same rotation the events board runs. The placard's own hall is the talk's
   identity and stays on the placard; the stage lines below are events, and an
   event is read by its own colour here exactly as it is on /events/. Without
   this every line lit in the talk's single hall and the board lost the variety
   that makes it scannable. */
const HALL_CYCLE: Hall[] = ['a', 'e', 'b', 'd', 'c']

function hallFor(index: number): Hall {
  return HALL_CYCLE[index % HALL_CYCLE.length]
}

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
      <p v-if="!deliveries.length" class="section-heading wf-sign" data-hall="c">
        <span class="wf-sticker">Past</span>
      </p>
      <p v-if="!deliveries.length" class="empty">
        Not on a stage yet, or the record hasn't caught up. Ask me about it.
      </p>

      <template v-for="section in stageSections" :key="section.key">
        <h2 class="section-heading wf-sign" :data-hall="section.key === 'booked' ? 'e' : 'c'">
          <span class="wf-sticker">{{ section.heading }}</span>
        </h2>

        <ol class="lines">
          <li
            v-for="({ delivery, event }, i) in section.items"
            :key="event!.slug"
            class="line"
            :data-hall="hallFor(i)"
          >
          <span class="date">{{ formatEventDate(event!) }}</span>

          <span class="stage-body">
            <span class="event-name wf-sign">{{ event!.name }}</span>

            <CoSpeakerBadge
              v-if="delivery.coSpeakers?.length"
              :speakers="delivery.coSpeakers"
            />

            <span class="place">
              <img v-if="flagSrc(event!.country)" class="flag" :src="flagSrc(event!.country)" alt="" width="18" height="18" loading="lazy" decoding="async" />
              {{ eventPlace(event!) }}
            </span>
          </span>

          <span class="stage-links">
            <a
              v-if="talk.resourceSlug && hasStarted(event!)"
              class="stage-link"
              :href="resourceHref(delivery)"
              >Resources</a
            >

            <a
              v-if="event!.slides && hasStarted(event!)"
              class="stage-link"
              :href="event!.slides"
              target="_blank"
              rel="noopener noreferrer"
              >Slides ↗</a
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
              class="stage-link"
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
      <LinkRow
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
   column is capped rather than stretched to the full venue width.
   This is a `:deep` selector, so it outranks a bare class. Anything below that
   wants a narrower reading cap has to name its parent to match, or it silently
   inherits the full 68rem. */
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

.head > .summary {
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

/* The abstract is prose, not signage, so it keeps the reading measure. The
   section cap above opens every block to 68rem through a `:deep` selector, so
   this has to match its specificity or the paragraphs run past 100 characters
   a line on a wide screen. */
.abstract > .prose {
  max-width: var(--wf-measure);
  margin: var(--wf-gap-s) 0 0;
  color: var(--vp-c-text-1);
}

.stages {
  padding-top: var(--wf-gap-xl);
  padding-bottom: var(--wf-gap-xl);
}

.section-heading {
  margin: 0 0 var(--wf-gap-m);
  font-size: var(--wf-step-2);
}

/* A second board under the first needs room to read as its own board. */
.lines + .section-heading {
  margin-top: var(--wf-gap-xl);
}

.stages > .empty {
  max-width: 46ch;
  font-variation-settings: 'wdth' 100;
  color: var(--vp-c-text-2);
}

.lines {
  display: grid;
  gap: 0 var(--wf-gap-l);
  margin: 0 0 var(--wf-gap-m);
  padding: 0;
  list-style: none;
}

/* Two columns from tablet up, the same arrangement the rest of the venue uses.
   A delivery is a date, a stage and two buttons — it does not need the full
   width, and one column left this list twice as long as it had to be. */
@media (min-width: 768px) {
  .lines {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Matches the events directory: no hairline per row, the space does the
   separating. Inside a column the line stacks — date, stage, then the actions —
   rather than holding a date column there is no longer room for. Each line
   carries the venue's tab: grey standing still, lit in the talk's hall on
   approach. */
.line {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--wf-gap-xs);
  padding: calc(var(--wf-gap-s) * 0.9) 0;
  padding-left: calc(6px + var(--wf-gap-s));
}

.line::before {
  content: '';
  position: absolute;
  left: 0;
  top: calc(var(--wf-gap-s) * 0.9);
  bottom: calc(var(--wf-gap-s) * 0.9);
  width: 6px;
  background: var(--wf-marker);
  transition: background var(--wf-motion) var(--wf-ease);
}

.line:hover::before,
.line:focus-within::before {
  background: var(--hall, var(--wf-marker-live));
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
  color: var(--wf-optic);
  font-variation-settings: 'wdth' 110;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  transition: background var(--wf-motion) var(--wf-ease),
    border-color var(--wf-motion) var(--wf-ease),
    color var(--wf-motion) var(--wf-ease);
}

/* One control, one treatment. Tickets used to arrive as a filled hall field and
   Resources as a hall-edged one, which put three different buttons on a row
   where the words already say which is which. They all fill the talk's hall on
   approach now, the same as the boards on the entrance and the events page. */
.stage-link:hover,
.stage-link:focus-visible {
  border-color: var(--hall, var(--wf-optic));
  background: var(--hall, var(--wf-optic));
  color: var(--on-hall, var(--wf-ink));
}

.doors {
  padding-bottom: var(--wf-gap-xl);
}

@media (max-width: 820px) {
  .stage-link {
    margin-top: var(--wf-gap-hair);
  }
}
</style>
