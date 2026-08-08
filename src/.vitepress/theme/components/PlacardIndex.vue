<script setup lang="ts">
/** The placard index — one plate per talk in rotation. */
import { computed, ref } from 'vue'
import { talks, tagsOfKind } from '../../data/talks'
import { getEvent, isUpcoming } from '../../data/events'
import { eventYear } from '../../data/format'
import FilterBar from './FilterBar.vue'

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

const facets = [
  { name: 'Product', options: products },
  { name: 'Topic', options: topics }
]

function clear() {
  query.value = ''
  picked.value = []
}

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

    <FilterBar
      class="wf-gutter"
      v-model:picked="picked"
      v-model:query="query"
      :facets="facets"
      :shown="shown.length"
      :total="ordered.length"
      search-label="Search talks"
      search-placeholder="Search talks…"
    />

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
/* The empty state's own reset link. The bar's Clear lives in FilterBar. */
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
