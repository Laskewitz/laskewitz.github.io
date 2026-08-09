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
import PageBanner from './PageBanner.vue'

const past = computed(() => pastEvents())

/**
 * A workshop is a different promise than a session — hours and hands-on rather
 * than a slot — so the directory prints them under their own heading instead of
 * flattening both into one "Sessions" list.
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

/**
 * The very next date gets its own spotlight, so the rest of the upcoming list
 * stays a list. It's lifted out rather than repeated: seeing the same event
 * twice in a row would read as a mistake.
 */
const next = computed(() => upcomingEvents()[0])
const upcoming = computed(() => upcomingEvents().slice(1))

/** What I'm actually giving there — the reason the date is worth spotlighting. */
const nextTalks = computed(() => (next.value ? talksAtEvent(next.value.slug) : []))

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
    <PageBanner
      title="Events"
      src="stage-ecs-2023"
      alt="Daniel Laskewitz speaking from the main stage at the European Collaboration Summit 2023."
      hall="a"
      focus="49% 30%"
    >
      Every conference, user group and community day I've spoken at, and the
      ones still ahead.
    </PageBanner>

    <section v-if="next" class="spotlight wf-gutter" aria-labelledby="next-heading" data-hall="a">
      <p id="next-heading" class="spot-label wf-label">Next up</p>

      <h2 class="spot-name wf-sign">{{ next.name }}</h2>

      <p class="spot-meta">
        {{ formatEventDate(next) }}
        <span v-if="flag(next.country)" aria-hidden="true">{{ flag(next.country) }}</span>
        {{ eventPlace(next) }}
      </p>

      <ul v-if="nextTalks.length" class="spot-talks">
        <li v-for="talk in nextTalks" :key="talk.slug">
          <a :href="`/talks/${talk.slug}`">{{ talk.title }}</a>
        </li>
      </ul>

      <p class="spot-links">
        <a v-if="next.website" :href="next.website" target="_blank" rel="noopener noreferrer">Website ↗</a>
        <a v-if="next.tickets" :href="next.tickets" target="_blank" rel="noopener noreferrer">Tickets ↗</a>
      </p>
    </section>

    <section class="board wf-gutter" aria-labelledby="upcoming-heading">
      <h2 id="upcoming-heading" class="board-heading wf-sign">
        Upcoming
        <span class="count">{{ upcoming.length }}</span>
      </h2>

      <p v-if="!upcoming.length" class="empty">
        Nothing else on the board yet. New dates land here as they're confirmed.
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
            <span v-if="talksAtEvent(event.slug).length" class="gave">
              <template v-for="group in talkGroupsAtEvent(event.slug)" :key="group.label">
                <span class="gave-label wf-label">{{ group.label }}</span>
                <ul class="gave-list">
                  <li v-for="talk in group.talks" :key="talk.slug" :data-hall="talk.hall">
                    <a :href="`/talks/${talk.slug}`">{{ talk.title }}</a>
                  </li>
                </ul>
              </template>
            </span>
          </span>

          <span class="links">
            <a v-if="event.website" :href="event.website" target="_blank" rel="noopener noreferrer">
              Website ↗
            </a>
            <a
              v-if="event.tickets"
              class="is-primary"
              :href="event.tickets"
              target="_blank"
              rel="noopener noreferrer"
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
          <span class="year-count">{{ list.length }} {{ list.length === 1 ? 'event' : 'events' }}</span>
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
                <template v-for="group in talkGroupsAtEvent(event.slug)" :key="group.label">
                  <span class="gave-label wf-label">{{ group.label }}</span>
                  <ul class="gave-list">
                    <li v-for="talk in group.talks" :key="talk.slug" :data-hall="talk.hall">
                      <a :href="`/talks/${talk.slug}`">{{ talk.title }}</a>
                    </li>
                  </ul>
                </template>
              </span>
            </span>

            <span class="links">
              <a v-if="event.slides" :href="event.slides" target="_blank" rel="noopener noreferrer">
                Slides ↗
              </a>
              <a v-if="event.website" :href="event.website" target="_blank" rel="noopener noreferrer">
                Website ↗
              </a>
            </span>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>

<style scoped>
.spotlight {
  padding-top: var(--wf-gap-l);
  padding-bottom: var(--wf-gap-l);
  background: var(--hall);
  color: var(--on-hall);
}

/* Everything printed on the hall field inherits the paired colour. Weight,
   not opacity, is what separates the label from the name here. */
.spot-label,
.spot-name,
.spot-meta,
.spot-talks a,
.spot-links a {
  color: inherit;
}

.spot-name {
  margin: var(--wf-gap-xs) 0 0;
  font-size: var(--wf-step-3);
  line-height: 1.05;
  overflow-wrap: anywhere;
}

.spot-meta {
  margin: var(--wf-gap-xs) 0 0;
  font-variation-settings: 'wdth' 105;
  font-weight: 600;
  font-size: var(--wf-step-0);
}

.spot-talks {
  margin: var(--wf-gap-s) 0 0;
  padding: 0;
  list-style: none;
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step-0);
}

.spot-talks li + li {
  margin-top: 2px;
}

.spot-talks a {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.spot-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--wf-gap-m);
  margin: var(--wf-gap-xs) 0 0;
}

.spot-links a {
  min-height: var(--wf-tap);
  display: inline-flex;
  align-items: center;
  font-variation-settings: 'wdth' 110;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.board {
  padding-top: var(--wf-gap-l);
  padding-bottom: var(--wf-gap-l);
}

.board + .board {
  padding-top: var(--wf-gap-xl);
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

/* No rules between rows: the date column already starts every line, so a
   hairline per row just adds noise to a list this long. Separation is carried
   by the space instead. */
.line {
  display: grid;
  grid-template-columns: 13rem 1fr auto;
  align-items: baseline;
  gap: var(--wf-gap-s) var(--wf-gap-m);
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

/* Four sessions run as one comma-separated sentence read as a wall of text at
   a glance. Stacked, each on its own line behind its hall colour, the row
   answers "what did he do here" without being read word by word. */
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

/* A second heading under the same event needs air, otherwise the workshop label
   reads as another line of the session list above it. */
.gave-list + .gave-label {
  margin-top: var(--wf-gap-xs);
}

.gave-list {
  margin: 0.35rem 0 0;
  padding: 0;
  list-style: none;
}

.gave-list li {
  padding-left: var(--wf-gap-s);
  border-left: 3px solid var(--hall, var(--wf-optic-dim));
  /* A title that wraps on a phone should still read as one item, so the two
     lines sit closer to each other than to the next session. */
  line-height: 1.35;
}

.gave-list li + li {
  margin-top: 0.45rem;
}

.gave-list a {
  color: var(--wf-optic);
  text-decoration: none;
}

.gave-list a:hover,
.gave-list a:focus-visible {
  text-decoration: underline;
  text-underline-offset: 3px;
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
