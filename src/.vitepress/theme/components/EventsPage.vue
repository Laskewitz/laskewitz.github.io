<script setup lang="ts">
/**
 * The track directory. Upcoming above the rule, past below, both derived from
 * the date so an event moves itself.
 */
import { computed, ref } from 'vue'
import { pastEvents, upcomingEvents } from '../../data/events'
import { coSpeakersAtEvent, talksAtEvent } from '../../data/talks'
import { eventPlace, eventYear, flagSrc, formatEventDate } from '../../data/format'
import type { Track } from '../../data/types'
import CoSpeakerBadge from './CoSpeakerBadge.vue'
import YearTile from './YearTile.vue'
import PageBanner from './PageBanner.vue'

const past = computed(() => pastEvents())

/**
 * One tab per event, not one per session. An event with four sessions used to
 * print four coloured rules down its side, which made a busy event look like
 * four unrelated things; the colour now belongs to the line you are pointing
 * at. Grey standing still, lit on approach, the same as every other sign.
 */
const TRACK_CYCLE: Track[] = ['a', 'e', 'b', 'd', 'c']

function trackFor(index: number): Track {
  return TRACK_CYCLE[index % TRACK_CYCLE.length]
}

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
  <main class="tracks">
    <PageBanner
      title="Events"
      src="stage-ecs-2023"
      alt="Daniel Laskewitz speaking from the main stage at the European Collaboration Summit 2023."
      track="a"
      focus="49% 30%"
    >
      Every conference, user group and community day I've spoken at, and the
      ones still ahead.
    </PageBanner>

    <section v-if="next" class="spotlight wf-gutter" aria-labelledby="next-heading" data-track="a">
      <h2 id="next-heading" class="spot-heading wf-sign">
        <span class="wf-sticker">Next up</span>
      </h2>

      <h3 class="spot-name wf-sign">{{ next.name }}</h3>

      <CoSpeakerBadge class="spot-with" :speakers="coSpeakersAtEvent(next.slug)" />

      <ul v-if="nextTalks.length" class="spot-talks">
        <li v-for="talk in nextTalks" :key="talk.slug">
          <a :href="`/talks/${talk.slug}`">{{ talk.title }}</a>
        </li>
      </ul>

      <p class="spot-meta">
        {{ formatEventDate(next) }}
        <img v-if="flagSrc(next.country)" class="flag" :src="flagSrc(next.country)" alt="" width="18" height="18" loading="lazy" decoding="async" />
        {{ eventPlace(next) }}
      </p>

      <p class="spot-links">
        <a v-if="next.website" :href="next.website" target="_blank" rel="noopener noreferrer">Website ↗</a>
        <a v-if="next.tickets" :href="next.tickets" target="_blank" rel="noopener noreferrer">Tickets ↗</a>
      </p>
    </section>

    <section class="board wf-gutter" aria-labelledby="upcoming-heading">
      <h2 id="upcoming-heading" class="board-heading wf-sign" data-track="e">
        <span class="wf-sticker">Upcoming</span>
      </h2>

      <p v-if="!upcoming.length" class="empty">
        Nothing else on the board yet. New dates land here as they're confirmed.
      </p>

      <table v-else class="lines">
        <caption class="visually-hidden">Upcoming events</caption>
        <thead class="visually-hidden">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Event</th>
            <th scope="col">Sessions</th>
            <th scope="col">Links</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(event, i) in upcoming"
            :key="event.slug"
            class="line is-upcoming"
            :data-track="trackFor(i)"
          >
            <td class="date-cell">
              <time class="date" :datetime="event.start">{{ formatEventDate(event) }}</time>
            </td>

            <td class="name-cell">
              <h3 class="name wf-sign">{{ event.name }}</h3>
              <CoSpeakerBadge :speakers="coSpeakersAtEvent(event.slug)" />
              <p class="place">
                <img v-if="flagSrc(event.country)" class="flag" :src="flagSrc(event.country)" alt="" width="18" height="18" loading="lazy" decoding="async" />
                {{ eventPlace(event) }}
              </p>
            </td>

            <td class="gave">
              <section v-for="group in talkGroupsAtEvent(event.slug)" :key="group.label" class="talk-group">
                <h4 class="gave-label wf-label">{{ group.label }}</h4>
                <ul class="gave-list">
                  <li v-for="talk in group.talks" :key="talk.slug">
                    <a :href="`/talks/${talk.slug}`">{{ talk.title }}</a>
                  </li>
                </ul>
              </section>
            </td>

            <td class="links-cell">
              <nav class="links" :aria-label="`Links for ${event.name}`">
                <a v-if="event.website" :href="event.website" target="_blank" rel="noopener noreferrer">
                  Website ↗
                </a>
                <a v-if="event.tickets" :href="event.tickets" target="_blank" rel="noopener noreferrer">
                  Tickets ↗
                </a>
              </nav>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="board wf-gutter" aria-labelledby="past-heading">
      <h2 id="past-heading" class="board-heading wf-sign" data-track="c">
        <span class="wf-sticker">Past</span>
      </h2>

      <div v-for="[year, list] in pastByYear" :key="year" class="year">
        <button
          class="year-head"
          type="button"
          :aria-expanded="openYears.has(year)"
          @click="toggleYear(year)"
        >
          <YearTile :text="year" variant="outline" />
          <span class="year-count">{{ list.length }} {{ list.length === 1 ? 'event' : 'events' }}</span>
          <span class="year-toggle" aria-hidden="true">
            {{ openYears.has(year) ? '−' : '+' }}
          </span>
        </button>

        <table v-show="openYears.has(year)" class="lines">
          <caption class="visually-hidden">{{ year }} events</caption>
          <thead class="visually-hidden">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Event</th>
              <th scope="col">Sessions</th>
              <th scope="col">Links</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(event, i) in list"
              :key="event.slug"
              class="line"
              :data-track="trackFor(i)"
            >
              <td class="date-cell">
                <time class="date" :datetime="event.start">{{ formatEventDate(event) }}</time>
              </td>

              <td class="name-cell">
                <h3 class="name wf-sign">{{ event.name }}</h3>
                <CoSpeakerBadge :speakers="coSpeakersAtEvent(event.slug)" />
                <p class="place">
                  <img v-if="flagSrc(event.country)" class="flag" :src="flagSrc(event.country)" alt="" width="18" height="18" loading="lazy" decoding="async" />
                  {{ eventPlace(event) }}
                </p>
              </td>

              <td class="gave">
                <section v-for="group in talkGroupsAtEvent(event.slug)" :key="group.label" class="talk-group">
                  <h4 class="gave-label wf-label">{{ group.label }}</h4>
                  <ul class="gave-list">
                    <li v-for="talk in group.talks" :key="talk.slug">
                      <a :href="`/talks/${talk.slug}`">{{ talk.title }}</a>
                    </li>
                  </ul>
                </section>
              </td>

              <td class="links-cell">
                <nav class="links" :aria-label="`Links for ${event.name}`">
                  <a v-if="event.slides" :href="event.slides" target="_blank" rel="noopener noreferrer">
                    Slides ↗
                  </a>
                  <a v-if="event.website" :href="event.website" target="_blank" rel="noopener noreferrer">
                    Website ↗
                  </a>
                </nav>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* The next date is the one thing on this page still ahead, so it is marked
   rather than shouted: it keeps the track's stickers and sits on the raised
   substrate between two hairlines. The full-bleed colour field out-shouted the
   page's own banner and turned every control on it into reversed type. */
.spotlight {
  padding-top: var(--wf-gap-l);
  padding-bottom: var(--wf-gap-l);
  border-top: 1px solid var(--wf-ink-rule);
  border-bottom: 1px solid var(--wf-ink-rule);
  background: var(--wf-ink-raised);
  color: var(--wf-optic);
}

/* The same sticker heading the boards below wear, so the two sections read as
   one system rather than two separate treatments. */
.spot-heading {
  margin: 0 0 var(--wf-gap-m);
  font-size: var(--wf-step-2);
}

.spot-name,
.spot-meta,
.spot-links a {
  color: inherit;
}

.spot-name {
  margin: 0;
  font-size: var(--wf-step-3);
  line-height: 1.05;
  overflow-wrap: anywhere;
}

/* Standing on the substrate now, so the billing is the plain sticker the rest
   of the site uses: track field, measured on-track ink. */
.spot-with {
  background: var(--track);
  color: var(--on-track);
}

.spot-meta {
  margin: var(--wf-gap-s) 0 0;
  font-variation-settings: 'wdth' 105;
  font-weight: 600;
  font-size: var(--wf-step-0);
}

/* The flag follows the date here rather than leading a place column, so it
   needs the word space the markup's line break collapses away — without it the
   artwork reads as punctuation attached to the year. */
.spot-meta .flag {
  margin-left: 0.45em;
}

/* The billing and the sessions are the same kind of object — a late addition
   applied to the sign — so they are the same sticker, stacked. Anything else
   made the co-speaker a graphic and the session a link, when both are just
   things added to this one event. */
.spot-talks {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4em;
  margin: var(--wf-gap-s) 0 0;
  padding: 0;
  list-style: none;
}

/* The same sticker as the billing above it — both stand on the substrate, so
   both take the track as field and the measured pair as ink. */
.spot-talks a {
  display: inline-flex;
  align-items: baseline;
  padding: 0.28em 0.55em;
  background: var(--track);
  color: var(--on-track);
  font-variation-settings: 'wdth' var(--wf-width-sign);
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 1.25;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  text-decoration: none;
  transform: rotate(-1.8deg);
  transform-origin: 0 50%;
}

.spot-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--wf-gap-s);
  margin: var(--wf-gap-m) 0 0;
}

/* The same outlined control the boards below use, and now drawn in the same
   substrate ink, because it no longer stands on a colour field. */
.spot-links a {
  min-height: var(--wf-tap);
  display: inline-flex;
  align-items: center;
  padding-inline: var(--wf-gap-s);
  border: 1px solid var(--wf-ink-rule);
  font-variation-settings: 'wdth' 110;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    background var(--wf-motion) var(--wf-ease),
    color var(--wf-motion) var(--wf-ease);
}

.spot-links a:hover,
.spot-links a:focus-visible {
  background: var(--track);
  border-color: var(--track);
  color: var(--on-track);
}

.board {
  padding-top: var(--wf-gap-l);
  padding-bottom: var(--wf-gap-l);
}

.board + .board {
  padding-top: var(--wf-gap-xl);
}

.board-heading {
  margin: 0 0 var(--wf-gap-m);
  font-size: var(--wf-step-2);
}

.empty {
  font-variation-settings: 'wdth' 100;
  color: var(--vp-c-text-2);
  max-width: 46ch;
}

.lines {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  border-collapse: collapse;
}

.lines tbody {
  display: block;
}

/* No rules between rows: the date column already starts every line, so a
   hairline per row just adds noise to a list this long. Separation is carried
   by the space instead. Each line carries a tab in its own gutter, the same
   anatomy the signs elsewhere use — grey standing still so the board stays
   quiet, lit in the event's track on approach. */
.line {
  position: relative;
  display: grid;
  grid-template-columns: 13rem 1fr auto;
  align-items: baseline;
  gap: var(--wf-gap-s) var(--wf-gap-m);
  padding: calc(var(--wf-gap-s) * 0.9) 0;
  padding-left: calc(6px + var(--wf-gap-s));
}

.line > td {
  padding: 0;
  border: 0;
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

/* Focus-within as well as hover: a keyboard reaching the session links inside
   the line should light the same tab a pointer does. */
.line:hover::before,
.line:focus-within::before {
  background: var(--track, var(--wf-marker-live));
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

/* The sessions are the widest thing a line carries, so they get the line
   instead of the name's column: placed on a second row that runs from the
   name to the far edge, they use the width the buttons leave behind rather
   than wrapping early against a wall of empty board. */
.date-cell {
  grid-column: 1;
  grid-row: 1;
}

.name-cell {
  grid-column: 2;
  grid-row: 1;
}

.links-cell {
  grid-column: 3;
  grid-row: 1;
}

.gave {
  grid-column: 2 / -1;
  grid-row: 2;
}

.name-cell {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.name {
  margin: 0;
  font-size: var(--wf-step-1);
  overflow-wrap: anywhere;
}

.place {
  margin: 0;
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step--1);
  color: var(--vp-c-text-2);
}

/* Four sessions run as one comma-separated sentence read as a wall of text at
   a glance. Stacked, each on its own line, the row answers "what did he do
   here" without being read word by word. The colour lives on the event's tab,
   not on each session: one event is one thing, however much happened there. */
.gave {
  display: block;
  margin-top: var(--wf-gap-xs);
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step--1);
  color: var(--wf-optic-dim);
}

.gave-label {
  display: block;
  margin: 0;
}

/* A second heading under the same event needs air, otherwise the workshop label
   reads as another line of the session list above it. */
.talk-group + .talk-group {
  margin-top: var(--wf-gap-xs);
}

.gave-list {
  margin: 0.35rem 0 0;
  padding: 0;
  list-style: none;
}

.gave-list li {
  /* A title that wraps on a phone should still read as one item, so the two
     lines sit closer to each other than to the next session. */
  line-height: 1.35;
}

.gave-list li + li {
  margin-top: 0.6rem;
}

/* A session title is a link on a board read one-handed, so its hit area is
   padded out to a thumb; the negative margin holds the line where it was, and
   the gap above is what keeps two stacked targets from meeting. */
.gave-list a {
  display: inline-block;
  padding-block: 0.3rem;
  margin-block: -0.3rem;
  padding-inline: 0.35rem;
  margin-inline: -0.35rem;
  color: var(--wf-optic);
  text-decoration: none;
  transition: background var(--wf-motion) var(--wf-ease);
}

/* No underline: a rule under a title that already sits in a list of titles is
   noise, and track-coloured text fails on this substrate. The field lifting
   under the words is what the rest of the venue does on approach. */
.gave-list a:hover,
.gave-list a:focus-visible {
  background: var(--wf-ink-raised);
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

/* Fills in the line's own track rather than plain white, so the button and the
   tab at the head of the line light as one thing. The on-track pair carries the
   text, which is what keeps the contrast measured rather than eyeballed. */
.links a:hover,
.links a:focus-visible {
  background: var(--track, var(--wf-optic));
  border-color: var(--track, var(--wf-optic));
  color: var(--on-track, var(--wf-ink));
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

  /* One column on a phone: the explicit placement above has nothing left to
     align to, so every part goes back to reading in source order. */
  .date-cell,
  .name-cell,
  .links-cell,
  .gave {
    grid-column: 1;
    grid-row: auto;
  }

  .links {
    margin-top: var(--wf-gap-hair);
  }
}
</style>
