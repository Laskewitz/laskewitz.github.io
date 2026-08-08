<script setup lang="ts">
/**
 * The hall directory. Upcoming above the rule, past below, both derived from
 * the date so an event moves itself.
 */
import { computed, ref } from 'vue'
import { pastEvents, upcomingEvents } from '../../data/events'
import { talksAtEvent } from '../../data/talks'
import { eventPlace, eventYear, flag, formatEventDate } from '../../data/format'
import HallTile from './HallTile.vue'

const past = computed(() => pastEvents())
const upcoming = computed(() => upcomingEvents())

const pastByYear = computed(() => {
  const groups = new Map<string, typeof past.value>()
  for (const event of past.value) {
    const year = eventYear(event)
    if (!groups.has(year)) groups.set(year, [])
    groups.get(year)!.push(event)
  }
  return [...groups.entries()]
})

const openYears = ref(new Set<string>([pastByYear.value[0]?.[0]].filter(Boolean) as string[]))

function toggleYear(year: string) {
  const next = new Set(openYears.value)
  next.has(year) ? next.delete(year) : next.add(year)
  openYears.value = next
}
</script>

<template>
  <div class="halls">
    <header class="head wf-gutter">
      <h1 class="title wf-sign">Events</h1>
      <p class="standfirst">
        Every conference, user group and community day I've spoken at, and the
        ones still ahead.
      </p>
    </header>

    <section class="board wf-gutter" aria-labelledby="upcoming-heading">
      <h2 id="upcoming-heading" class="board-heading wf-sign">
        Upcoming
        <span class="count">{{ upcoming.length }}</span>
      </h2>

      <p v-if="!upcoming.length" class="empty">
        Nothing on the board right now. New dates land here as they're confirmed.
      </p>

      <ol v-else class="lines">
        <li v-for="event in upcoming" :key="event.slug" class="line is-upcoming">
          <span class="date">{{ formatEventDate(event) }}</span>

          <span class="name-cell">
            <span class="name wf-sign">{{ event.name }}</span>
            <span class="place">
              <span v-if="flag(event.country)" class="flag" aria-hidden="true">{{
                flag(event.country)
              }}</span>
              {{ eventPlace(event) }}
            </span>
          </span>

          <span class="links">
            <a v-if="event.website" :href="event.website" target="_blank" rel="noreferrer">
              Site ↗
            </a>
            <a
              v-if="event.tickets"
              class="is-primary"
              :href="event.tickets"
              target="_blank"
              rel="noreferrer"
              data-hall="d"
            >
              Tickets ↗
            </a>
          </span>
        </li>
      </ol>
    </section>

    <section class="board wf-gutter" aria-labelledby="past-heading">
      <h2 id="past-heading" class="board-heading wf-sign">
        Past
        <span class="count">{{ past.length }}</span>
      </h2>

      <div v-for="[year, list] in pastByYear" :key="year" class="year">
        <button
          class="year-head"
          type="button"
          :aria-expanded="openYears.has(year)"
          @click="toggleYear(year)"
        >
          <HallTile :text="year" variant="outline" />
          <span class="year-count">{{ list.length }} events</span>
          <span class="year-toggle" aria-hidden="true">
            {{ openYears.has(year) ? '−' : '+' }}
          </span>
        </button>

        <ol v-show="openYears.has(year)" class="lines">
          <li v-for="event in list" :key="event.slug" class="line">
            <span class="date">{{ formatEventDate(event) }}</span>

            <span class="name-cell">
              <span class="name wf-sign">{{ event.name }}</span>
              <span class="place">
                <span v-if="flag(event.country)" class="flag" aria-hidden="true">{{
                  flag(event.country)
                }}</span>
                {{ eventPlace(event) }}
              </span>
              <span v-if="talksAtEvent(event.slug).length" class="gave">
                Gave:
                <a
                  v-for="talk in talksAtEvent(event.slug)"
                  :key="talk.slug"
                  :href="`/talks/${talk.slug}`"
                  >{{ talk.title }}</a
                >
              </span>
            </span>

            <span class="links">
              <a v-if="event.slides" :href="event.slides" target="_blank" rel="noreferrer">
                Slides ↗
              </a>
              <a v-if="event.website" :href="event.website" target="_blank" rel="noreferrer">
                Site ↗
              </a>
            </span>
          </li>
        </ol>
      </div>
    </section>
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
  max-width: 52ch;
  margin: var(--wf-gap-s) 0 0;
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step-0);
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.board {
  padding-top: var(--wf-gap-l);
  padding-bottom: var(--wf-gap-l);
}

.board + .board {
  border-top: 1px solid var(--wf-ink-rule);
}

.board-heading {
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
  font-variation-settings: 'wdth' 100;
  color: var(--vp-c-text-2);
  max-width: 46ch;
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
  gap: var(--wf-gap-s) var(--wf-gap-m);
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

.line.is-upcoming .date {
  color: var(--wf-optic);
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
  color: var(--vp-c-text-2);
}

.flag {
  margin-right: 0.35em;
}

.gave {
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step--1);
  color: var(--wf-optic-dim);
}

.gave a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

.gave a + a::before {
  content: ', ';
  color: var(--wf-optic-dim);
  border: 0;
}

.links {
  display: flex;
  gap: var(--wf-gap-xs);
  flex-wrap: wrap;
}

.links a {
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
    color var(--wf-motion) var(--wf-ease);
}

.links a:hover,
.links a:focus-visible {
  background: var(--wf-optic);
  color: var(--wf-ink);
}

.links a.is-primary {
  background: var(--hall);
  border-color: var(--hall);
  color: var(--on-hall);
}

.links a.is-primary:hover,
.links a.is-primary:focus-visible {
  background: var(--wf-optic);
  border-color: var(--wf-optic);
  color: var(--wf-ink);
}

.year + .year {
  margin-top: var(--wf-gap-s);
}

.year-head {
  display: flex;
  align-items: center;
  gap: var(--wf-gap-s);
  width: 100%;
  min-height: var(--wf-tap);
  padding: 0;
  background: none;
  border: 0;
  border-top: 1px solid var(--wf-ink-rule);
  color: var(--wf-optic);
  cursor: pointer;
  text-align: left;
}

.year-count {
  font-variation-settings: 'wdth' 105;
  font-weight: 600;
  font-size: var(--wf-step--1);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--wf-optic-dim);
}

.year-toggle {
  margin-left: auto;
  font-size: var(--wf-step-2);
  line-height: 1;
}

@media (max-width: 820px) {
  .line {
    grid-template-columns: 1fr;
    gap: var(--wf-gap-xs);
  }

  .links {
    margin-top: var(--wf-gap-hair);
  }
}
</style>
