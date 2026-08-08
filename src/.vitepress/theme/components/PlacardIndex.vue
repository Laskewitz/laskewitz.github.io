<script setup lang="ts">
/** The placard index — one plate per talk in rotation. */
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { talks, tagsOfKind } from '../../data/talks'
import { getEvent, isUpcoming } from '../../data/events'
import { eventYear } from '../../data/format'

function deliveryDates(slug: string): string[] {
  const talk = talks.find((t) => t.slug === slug)
  return (talk?.deliveries ?? [])
    .map((d) => getEvent(d.eventSlug))
    .filter(Boolean)
    .map((e) => e!.start)
    .sort()
}

/** Past outings read "Last given"; a talk only booked ahead reads "Next up". */
function stageNote(slug: string): string | null {
  const talk = talks.find((t) => t.slug === slug)
  if (!talk?.deliveries.length) return null
  const events = talk.deliveries.map((d) => getEvent(d.eventSlug)).filter(Boolean)
  const past = events.filter((e) => !isUpcoming(e!)).map((e) => eventYear(e!)).sort()
  if (past.length) return `Last given ${past.at(-1)}`
  const ahead = events.map((e) => eventYear(e!)).sort()
  return ahead.length ? `Next up ${ahead[0]}` : null
}

/**
 * Most recently on a stage first, so the top of the page is the talks currently
 * in rotation. Anything never delivered sorts to the bottom rather than the top,
 * which an empty date string would otherwise do.
 */
const ordered = computed(() =>
  [...talks].sort(
    (a, b) => (deliveryDates(b.slug).at(-1) ?? '').localeCompare(deliveryDates(a.slug).at(-1) ?? '')
  )
)

const products = tagsOfKind('product')
const topics = tagsOfKind('topic')

const query = ref('')
const picked = ref<string[]>([])

function toggle(tag: string) {
  picked.value = picked.value.includes(tag)
    ? picked.value.filter((t) => t !== tag)
    : [...picked.value, tag]
}

function clear() {
  query.value = ''
  picked.value = []
}

const active = computed(() => query.value.trim() !== '' || picked.value.length > 0)

/** Which facet menu is open, if any. Only one at a time, like a real menu bar. */
const openFacet = ref<string | null>(null)

function facetCount(tags: string[]) {
  return picked.value.filter((t) => tags.includes(t)).length
}

const bar = ref<HTMLElement | null>(null)

function onDocument(e: Event) {
  if (openFacet.value && bar.value && !bar.value.contains(e.target as Node)) {
    openFacet.value = null
  }
}

function onEscape(e: KeyboardEvent) {
  if (e.key === 'Escape') openFacet.value = null
}

onMounted(() => {
  document.addEventListener('click', onDocument)
  document.addEventListener('keydown', onEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocument)
  document.removeEventListener('keydown', onEscape)
})

/**
 * Tags are OR'd within a facet and AND'd across them, so picking two products
 * widens while picking a product and a topic narrows — the behaviour a filter
 * bar is expected to have. Search covers the words a visitor is likely to
 * remember, including the summary, which the placard itself no longer prints.
 */
const shown = computed(() => {
  const q = query.value.trim().toLowerCase()
  const wanted = (kind: string[]) => picked.value.filter((t) => kind.includes(t))

  return ordered.value.filter((talk) => {
    for (const facet of [products, topics]) {
      const need = wanted(facet)
      if (need.length && !need.some((t) => talk.tags.includes(t))) return false
    }
    if (!q) return true
    return [talk.title, talk.summary, talk.abstract, ...talk.tags]
      .join(' ')
      .toLowerCase()
      .includes(q)
  })
})
</script>

<template>
  <div class="placards">
    <header class="head wf-gutter">
      <h1 class="title wf-sign">Talks</h1>
      <p class="standfirst">
        These aren't one-offs. Each of these gets given again, at different
        events, sometimes with someone else on stage next to me. If you're
        organising something and one of these fits, get in touch.
      </p>
    </header>

    <div ref="bar" class="filters wf-gutter">
      <input
        v-model="query"
        type="search"
        class="search-input"
        aria-label="Search talks"
        placeholder="Search talks…"
      />

      <div
        v-for="facet in [
          { name: 'Product', tags: products },
          { name: 'Topic', tags: topics }
        ]"
        :key="facet.name"
        class="menu"
      >
        <button
          type="button"
          class="menu-button"
          :aria-expanded="openFacet === facet.name"
          :data-on="facetCount(facet.tags) > 0"
          @click="openFacet = openFacet === facet.name ? null : facet.name"
        >
          {{ facet.name }}
          <span v-if="facetCount(facet.tags)" class="badge">{{ facetCount(facet.tags) }}</span>
          <span class="caret" aria-hidden="true">▾</span>
        </button>

        <div v-show="openFacet === facet.name" class="menu-panel">
          <button
            v-for="tag in facet.tags"
            :key="tag"
            type="button"
            class="chip"
            :aria-pressed="picked.includes(tag)"
            @click="toggle(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <p class="tally" role="status" aria-live="polite">{{ shown.length }}/{{ ordered.length }}</p>

      <button v-if="active" type="button" class="clear" @click="clear">Clear</button>
    </div>

    <div class="grid wf-gutter">
      <a
        v-for="talk in shown"
        :key="talk.slug"
        class="placard"
        :href="`/talks/${talk.slug}`"
        :data-hall="talk.hall"
      >
        <span class="band" aria-hidden="true" />

        <span class="placard-body">
          <span class="tiles">
            <span v-if="stageNote(talk.slug)" class="last">
              {{ stageNote(talk.slug) }}
            </span>
          </span>

          <span class="talk-title wf-sign">{{ talk.title }}</span>

          <span class="tags">
            <span v-for="tag in talk.tags" :key="tag" class="tag">{{ tag }}</span>
          </span>
        </span>

        <span class="arrow" aria-hidden="true">→</span>
      </a>

      <p v-if="!shown.length" class="empty">
        Nothing matches that. <button type="button" class="clear" @click="clear">Clear the filters</button>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* One control strip, not a wall of chips: the facets open as overlay menus so
   the filters cost a single row of height and the talks stay above the fold. */
.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--wf-gap-xs);
  padding-bottom: var(--wf-gap-m);
  border-bottom: 1px solid var(--wf-ink-rule);
}

.search-input {
  flex: 1 1 14rem;
  min-width: 0;
  max-width: 24rem;
  height: 42px;
  padding: 0 var(--wf-gap-s);
  border: 1px solid var(--wf-ink-rule);
  border-radius: 0;
  background: transparent;
  color: var(--wf-optic);
  font: inherit;
  font-size: var(--wf-step-0);
}

.search-input::placeholder {
  color: var(--wf-optic-dim);
}

.search-input:focus-visible {
  outline: 2px solid var(--wf-optic);
  outline-offset: 2px;
}

.menu {
  position: relative;
}

.menu-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  height: 42px;
  padding: 0 var(--wf-gap-s);
  border: 1px solid var(--wf-ink-rule);
  background: transparent;
  color: var(--wf-optic-dim);
  font-variation-settings: 'wdth' 110;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
}

.menu-button:hover,
.menu-button[aria-expanded='true'],
.menu-button[data-on='true'] {
  color: var(--wf-optic);
  border-color: var(--wf-optic);
}

.menu-button:focus-visible,
.chip:focus-visible,
.clear:focus-visible {
  outline: 2px solid var(--wf-optic);
  outline-offset: 2px;
}

.badge {
  display: inline-grid;
  place-items: center;
  min-width: 1.5em;
  height: 1.5em;
  padding: 0 0.35em;
  background: var(--wf-optic);
  color: var(--wf-ink);
}

.caret {
  font-size: 0.7em;
}

.menu-panel {
  position: absolute;
  z-index: 20;
  top: calc(100% + 4px);
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: max-content;
  max-width: min(22rem, calc(100vw - 2 * var(--wf-gutter)));
  max-height: 60vh;
  overflow-y: auto;
  padding: var(--wf-gap-xs);
  border: 1px solid var(--wf-optic);
  background: var(--wf-ink);
  gap: 2px;
}

.chip {
  padding: 0.6em var(--wf-gap-s);
  border: 0;
  background: transparent;
  color: var(--wf-optic-dim);
  font-variation-settings: 'wdth' 110;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-align: left;
  cursor: pointer;
}

.chip:hover {
  color: var(--wf-optic);
}

.chip[aria-pressed='true'] {
  background: var(--wf-optic);
  color: var(--wf-ink);
}

.tally {
  margin: 0 0 0 auto;
  color: var(--wf-optic-dim);
  font-size: var(--wf-step--1);
  letter-spacing: 0.05em;
  font-variant-numeric: tabular-nums;
}

.clear {
  padding: 0;
  border: 0;
  background: none;
  color: var(--wf-optic);
  font: inherit;
  font-size: var(--wf-step--1);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.empty {
  padding: var(--wf-gap-xl) 0;
  color: var(--wf-optic-dim);
  font-size: var(--wf-step-0);
}

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
