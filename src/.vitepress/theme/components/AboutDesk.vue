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
import { bios, headshot } from '../../data/bio'
import { countryCount, eventCount, firstYear } from '../../data/events'
import { speakers } from '../../data/speakers'
import { talks } from '../../data/talks'
import SignRow from './SignRow.vue'

const host = speakers.laskewitz

/**
 * What each channel is actually for. A row of five identical social links makes
 * an organiser guess which one gets answered, so the desk says it outright.
 */
const CHANNEL_NOTES: Record<string, string> = {
  LinkedIn: 'The best way to reach me. Messages are open — say which event and which date.',
  GitHub: 'Code, samples and the demos from my sessions.',
  X: 'Shorter thoughts, and where conference chatter tends to happen.',
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
  { label: 'Talks', value: String(talks.length), href: '/talks/' }
]

const since = firstYear()

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
    <!-- The page is a colour field, not a photograph: the four stage banners
         each already name a hall, and this is the one surface where the visitor
         came to transact rather than to look. -->
    <header class="masthead wf-gutter" data-hall="e">
      <h1 class="title wf-sign">About</h1>
      <p class="standfirst">
        Principal Cloud Advocate at Microsoft, speaking about agents, low-code
        and the Power Platform. Booking a speaker, running a CFP, or want a
        session at your user group? Everything you need is on this page.
      </p>
    </header>

    <section class="block wf-gutter" aria-labelledby="reach-heading">
      <h2 id="reach-heading" class="block-heading wf-sign">Reach me</h2>

      <nav class="rows" aria-label="Contact channels">
        <SignRow
          v-for="(channel, i) in channels"
          :key="channel.href"
          :href="channel.href"
          :label="channel.label"
          :note="CHANNEL_NOTES[channel.label]"
          :hall="i === 0 ? 'e' : undefined"
          external
        />
      </nav>
    </section>

    <section class="block wf-gutter" aria-labelledby="programme-heading">
      <h2 id="programme-heading" class="block-heading wf-sign">
        What I speak about
      </h2>

      <p class="wf-read prose">
        Talks are recurring, not one-offs — each one gets given at several
        events and rewritten in between, so the abstract you read is the current
        version. Every talk page lists every stage it has been on and who was on
        it with me.
      </p>

      <dl class="record">
        <div v-for="item in record" :key="item.label">
          <dt class="wf-label">{{ item.label }}</dt>
          <dd class="wf-sign">{{ item.value }}</dd>
        </div>
        <div>
          <dt class="wf-label">Speaking since</dt>
          <dd class="wf-sign">{{ since }}</dd>
        </div>
      </dl>

      <nav class="rows" aria-label="Programme">
        <SignRow
          href="/talks/"
          label="The talks"
          note="Abstracts, formats and tags for everything currently in rotation."
          hall="b"
        />
        <SignRow
          href="/events/"
          label="The speaking record"
          :note="`Every event since ${since}, and the dates still ahead.`"
          hall="a"
        />
      </nav>
    </section>

    <section class="block wf-gutter" aria-labelledby="press-heading">
      <h2 id="press-heading" class="block-heading wf-sign">Bio and headshot</h2>

      <p class="wf-read prose">
        Written to be pasted straight into a programme or a session listing.
        Pick the length that fits and use it as it is.
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

      <nav class="rows" aria-label="Assets">
        <SignRow
          :href="headshot.href"
          label="Headshot"
          :note="headshot.note"
          hall="d"
          external
        />
      </nav>
    </section>
  </div>
</template>

<style scoped>
/* ── The page itself ───────────────────────────────────────────────────── */

.masthead {
  padding-top: var(--wf-gap-xl);
  padding-bottom: var(--wf-gap-l);
  background: var(--hall);
  color: var(--on-hall);
}

/* Everything printed on the field inherits the contrast-checked pair. Weight
   and scale separate the lines here, never opacity. */
.title {
  margin: 0;
  font-size: var(--wf-step-4);
  font-weight: 900;
  letter-spacing: -0.03em;
  /* Optical alignment: the letter meets the gutter, not its box. */
  margin-left: -0.035em;
  line-height: 0.95;
}

.standfirst {
  max-width: 46ch;
  margin: var(--wf-gap-s) 0 0;
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step-1);
  line-height: 1.45;
  color: inherit;
}

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

.rows {
  border-top: 1px solid var(--wf-ink-rule);
}

.rows :deep(.sign-row) {
  border-bottom: 1px solid var(--wf-ink-rule);
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

/* Confirmation is a field flip, not a tick that needs decoding. The lime hall
   carries its own checked ink. */
.copy[data-copied='true'] {
  background: var(--wf-hall-d);
  border-color: var(--wf-hall-d);
  color: var(--wf-on-hall-d);
}

.bio-text {
  margin: 0;
  color: var(--vp-c-text-2);
}

.bio-text + .bio-text {
  margin-top: var(--wf-gap-s);
}

@media (max-width: 640px) {
  .masthead {
    padding-top: var(--wf-gap-l);
  }

  .record {
    gap: var(--wf-gap-m);
  }
}
</style>
