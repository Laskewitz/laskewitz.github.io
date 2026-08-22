<script setup lang="ts">
/**
 * The about page.
 *
 * The organiser is the one visitor this venue never served. They arrive on a
 * desktop, having watched a session or read a CFP, and need four things: a way
 * to reach him, what he speaks about, the record behind it, and a bio they can
 * paste into a programme. Everything here is handed over on the page — the
 * point is that nobody has to send an email to get it.
 *
 * There is no form. A static site cannot receive one honestly, and a fake form
 * that opens a mail client is worse than a link that says where it goes.
 */
import { ref } from 'vue'
import { bios, headshots } from '../../data/bio'
import { countryCount, eventCount, firstYear } from '../../data/events'
import { speakers } from '../../data/speakers'
import { talkCount } from '../../data/talks'
import type { Track } from '../../data/types'
import PageBanner from './PageBanner.vue'
import LinkRow from './LinkRow.vue'

/**
 * Every row in a list carries a track, not just the first one — a single lit tab
 * above three grey ones reads as an accident. The tabs stay grey standing still
 * and light their track on approach, so the colour marks the row you are
 * pointing at rather than painting the whole list.
 */
const TRACK_CYCLE: Track[] = ['e', 'a', 'b', 'd', 'c']

function trackFor(index: number): Track {
  return TRACK_CYCLE[index % TRACK_CYCLE.length]
}

const host = speakers.laskewitz

/**
 * What each channel is actually for. A row of five identical social links makes
 * an organiser guess which one gets answered, so the desk says it outright.
 */
const CHANNEL_NOTES: Record<string, string> = {
  LinkedIn: 'The best way to reach me. Messages are open, so send the event and the date.',
  GitHub: 'Code and the demos from my sessions.',
  X: 'Shorter thoughts, and where the conference chatter usually is.',
  YouTube: 'Recorded sessions and walkthroughs.'
}

/** Ordered by what gets answered first, not by the registry's order. */
const CHANNEL_ORDER = ['LinkedIn', 'GitHub', 'X', 'YouTube']

const channels = CHANNEL_ORDER.map((label) =>
  host.links.find((link) => link.label === label)
).filter((link): link is NonNullable<typeof link> => Boolean(link))

const record = [
  { label: 'Events', value: String(eventCount()), href: '/events/' },
  { label: 'Countries', value: String(countryCount()), href: '/events/' },
  { label: 'Talks', value: String(talkCount()), href: '/talks/' }
]

/**
 * The list now goes back as far as he does, so one number covers both the
 * career and the record.
 */
const speakingSince = firstYear()

/**
 * Which bio was last copied, so the button can confirm it worked. An organiser
 * copying three bios in a row needs to know which one is on their clipboard.
 */
const copied = ref<string | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined

async function copy(label: string, text: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = label
    clearTimeout(timer)
    timer = setTimeout(() => (copied.value = null), 2000)
  } catch {
    /* Clipboard refused — the text is on the page and selectable anyway. */
    copied.value = null
  }
}
</script>

<template>
  <div class="desk">
    <!-- The desk leads with a room, like every other track does — a strip, not a
         hero, so the first thing an organiser came for stays near the top.
         Track E tints it, so the photograph belongs to this page rather than to
         the home page it is shared with. -->
    <PageBanner
      title="About"
      src="stage-eppc-2026-lectern"
      alt="Daniel Laskewitz speaking from the lectern at the European Power Platform Conference 2026."
      track="e"
      focus="65% 6%"
    >
      Principal Cloud Advocate at Microsoft. I work on Copilot Studio,
      Copilot Cowork, Scout, GitHub Copilot and Microsoft 365 Copilot. If you
      run an event or a user group, or you have one of my submissions in front
      of you, everything you would normally email me for is on this page.
    </PageBanner>

    <section class="block wf-gutter" aria-labelledby="reach-heading">
      <h2 id="reach-heading" class="block-heading wf-sign" data-track="a">
        <span class="wf-sticker">Reach me</span>
      </h2>

      <nav class="rows" aria-label="Contact channels">
        <LinkRow
          v-for="(channel, i) in channels"
          :key="channel.href"
          :href="channel.href"
          :label="channel.label"
          :note="CHANNEL_NOTES[channel.label]"
          :track="trackFor(i)"
          quiet
          external
        />
      </nav>
    </section>

    <section class="block wf-gutter" aria-labelledby="programme-heading">
      <h2 id="programme-heading" class="block-heading wf-sign" data-track="d">
        <span class="wf-sticker">What I speak about</span>
      </h2>

      <p class="wf-read prose">
        Most of these talks get given more than once, and rewritten in between,
        so the abstract you are reading is the current one. Each talk page lists
        the stages it has been on and who was up there with me.
      </p>

      <dl class="record">
        <div v-for="item in record" :key="item.label">
          <dt class="wf-label">{{ item.label }}</dt>
          <dd class="wf-sign">{{ item.value }}</dd>
        </div>
        <div>
          <dt class="wf-label">Speaking since</dt>
          <dd class="wf-sign">{{ speakingSince }}</dd>
        </div>
      </dl>

      <nav class="rows" aria-label="Programme">
        <LinkRow
          href="/talks/"
          label="The talks"
          note="Abstracts and formats for everything currently in rotation."
          track="b"
          quiet
        />
        <LinkRow
          href="/events/"
          label="The speaking record"
          :note="`Back to ${speakingSince}, plus the dates still ahead.`"
          track="a"
          quiet
        />
      </nav>
    </section>

    <section class="block wf-gutter" aria-labelledby="press-heading">
      <h2 id="press-heading" class="block-heading wf-sign" data-track="b">
        <span class="wf-sticker">Bio and headshots</span>
      </h2>

      <p class="wf-read prose">
        These are written to be pasted straight into a programme or a session
        listing. Pick the length that fits and use it as it is.
      </p>

      <ul class="bios">
        <li v-for="bio in bios" :key="bio.label" class="bio">
          <div class="bio-head">
            <p class="bio-label wf-label">{{ bio.label }}</p>
            <p class="bio-length">{{ bio.length }}</p>

            <button
              type="button"
              class="copy"
              :data-copied="copied === bio.label"
              @click="copy(bio.label, bio.text)"
            >
              {{ copied === bio.label ? 'Copied' : 'Copy' }}
            </button>
          </div>

          <p v-for="(para, i) in bio.text.split('\n\n')" :key="i" class="bio-text wf-read">
            {{ para }}
          </p>
        </li>
      </ul>

      <p class="wf-read prose asset-note">
        One photograph in four sizes, the same crop each time. Take the biggest
        one your programme will take.
      </p>

      <nav class="rows" aria-label="Assets">
        <LinkRow
          v-for="(shot, i) in headshots"
          :key="shot.href"
          :href="shot.href"
          :label="shot.label"
          :note="shot.note"
          :track="trackFor(i)"
          quiet
          external
        />
      </nav>
    </section>
  </div>
</template>

<style scoped>
/* ── The page itself ───────────────────────────────────────────────────── */

/* ── Blocks ────────────────────────────────────────────────────────────── */

.block {
  padding-top: var(--wf-gap-xl);
}

.block:last-child {
  padding-bottom: var(--wf-gap-xxl);
}

.block-heading {
  margin: 0 0 var(--wf-gap-m);
  font-size: var(--wf-step-2);
}

.prose {
  margin: 0 0 var(--wf-gap-l);
  color: var(--vp-c-text-2);
}

/* The rows carry their own track tabs, so they no longer need rules between
   them — the tab is the separator. */
.rows {
  display: grid;
  gap: 0 var(--wf-gap-l);
  margin-top: var(--wf-gap-xs);
}

/* Inside a column the sign owns its own width, so the arrow terminates the
   column instead of hanging a thousand pixels from the word it belongs to.
   The same arrangement the entrance directory uses. */
.rows :deep(.link-row) {
  grid-template-columns: 6px minmax(0, 1fr) auto;
  justify-content: stretch;
}

/* Two columns from tablet up, so the lists fill the venue rather than running
   down one side of it. */
@media (min-width: 768px) {
  .rows {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Sits directly above the asset rows, so it closes up against them rather
   than floating at prose distance. */
.asset-note {
  margin-bottom: var(--wf-gap-m);
}

/* ── The record ────────────────────────────────────────────────────────── */

.record {
  display: flex;
  flex-wrap: wrap;
  gap: var(--wf-gap-l);
  margin: 0 0 var(--wf-gap-l);
}

.record dt {
  margin: 0;
}

.record dd {
  margin: 0.15rem 0 0;
  font-size: var(--wf-step-2);
  line-height: 1;
}

/* ── Bios ──────────────────────────────────────────────────────────────── */

.bios {
  margin: 0 0 var(--wf-gap-l);
  padding: 0;
  list-style: none;
}

.bio {
  padding: var(--wf-gap-m) 0;
  border-top: 1px solid var(--wf-ink-rule);
}

.bio:last-child {
  border-bottom: 1px solid var(--wf-ink-rule);
}

.bio-head {
  display: flex;
  align-items: center;
  gap: var(--wf-gap-s);
  margin-bottom: var(--wf-gap-xs);
}

.bio-label {
  margin: 0;
  color: var(--wf-optic);
}

.bio-length {
  margin: 0;
  font-variation-settings: 'wdth' 105;
  font-size: var(--wf-step--1);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--wf-optic-dim);
}

/* A cut edge, like every other control in the venue — no pill, no radius. */
.copy {
  margin-left: auto;
  min-height: 44px;
  padding: 0 var(--wf-gap-s);
  border: 1px solid var(--wf-ink-rule);
  background: transparent;
  color: var(--wf-optic);
  font: inherit;
  font-variation-settings: 'wdth' 110;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background var(--wf-motion) var(--wf-ease),
    color var(--wf-motion) var(--wf-ease),
    border-color var(--wf-motion) var(--wf-ease);
}

.copy:hover,
.copy:focus-visible {
  background: var(--wf-optic);
  border-color: var(--wf-optic);
  color: var(--wf-ink);
}

/* Confirmation is a field flip, not a tick that needs decoding. The lime track
   carries its own checked ink. */
.copy[data-copied='true'] {
  background: var(--wf-track-d);
  border-color: var(--wf-track-d);
  color: var(--wf-on-track-d);
}

.bio-text {
  margin: 0;
  color: var(--vp-c-text-2);
}

.bio-text + .bio-text {
  margin-top: var(--wf-gap-s);
}

@media (max-width: 640px) {
  .record {
    gap: var(--wf-gap-m);
  }
}
</style>
