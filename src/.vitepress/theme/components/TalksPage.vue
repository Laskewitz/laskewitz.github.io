<script setup lang="ts">
/** The placard index — one plate per talk in rotation. */
import { computed, ref } from 'vue'
import { talks, tagsOfKind, formatLabel } from '../../data/talks'
import { getEvent } from '../../data/events'
import FilterBar from './FilterBar.vue'
import PageBanner from './PageBanner.vue'

function deliveryDates(slug: string): string[] {
  const talk = talks.find((t) => t.slug === slug)
  return (talk?.deliveries ?? [])
    .map((d) => getEvent(d.eventSlug))
    .filter(Boolean)
    .map((e) => e!.start)
    .sort()
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

/* Only offered when the programme actually holds both kinds of room; a filter
   that can only ever return everything is noise on the bar. */
const formats = computed(() => {
  const used = new Set(talks.map(formatLabel))
  return used.size > 1 ? ['Session', 'Workshop'].filter((f) => used.has(f)) : []
})

const query = ref('')
const picked = ref<string[]>([])

const facets = computed(() => [
  { name: 'Format', options: formats.value },
  { name: 'Product', options: products },
  { name: 'Topic', options: topics }
])

function clear() {
  query.value = ''
  picked.value = []
}

/**
 * Tags are OR'd within a facet and AND'd across them, so picking two products
 * widens while picking a product and a topic narrows — the behaviour a filter
 * bar is expected to have. Format works the same way, matching the word on the
 * plate rather than a tag. Search covers the words a visitor is likely to
 * remember, including the summary, which the placard itself no longer prints.
 */
const shown = computed(() => {
  const q = query.value.trim().toLowerCase()
  const wanted = (kind: string[]) => picked.value.filter((t) => kind.includes(t))

  return ordered.value.filter((talk) => {
    const wantedFormats = wanted(formats.value)
    if (wantedFormats.length && !wantedFormats.includes(formatLabel(talk))) return false

    for (const facet of [products, topics]) {
      const need = wanted(facet)
      if (need.length && !need.some((t) => talk.tags.includes(t))) return false
    }
    if (!q) return true
    return [talk.title, talk.summary, talk.abstract, formatLabel(talk), ...talk.tags]
      .join(' ')
      .toLowerCase()
      .includes(q)
  })
})
</script>

<template>
  <div class="placards">
    <PageBanner
      title="Talks"
      src="stage-ecs-2024"
      alt="Daniel Laskewitz presenting alongside a co-speaker at the European Collaboration Summit 2024."
      track="b"
      focus="58% 24%"
    >
      These aren't one-offs. Each of these gets given again, at different
      events, sometimes with someone else on stage next to me. They get
      rewritten between events too, so what you get is the current version
      rather than the one from two years ago.
    </PageBanner>

    <FilterBar
      class="wf-gutter bar"
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
        :data-track="talk.track"
      >
        <span class="band" aria-hidden="true" />

        <span class="title-cell">
          <span class="talk-title wf-sign">{{ talk.title }}</span>
          <span class="format" :data-format="talk.format ?? 'session'">{{
            formatLabel(talk)
          }}</span>
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
.bar {
  padding-top: var(--wf-gap-l);
}

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
  text-decoration-color: var(--wf-marker);
  transition: text-decoration-color var(--wf-motion) var(--wf-ease);
  cursor: pointer;
}

.clear:hover,
.clear:focus-visible {
  text-decoration-color: var(--wf-optic);
}

.empty {
  grid-column: 1 / -1;
  padding: var(--wf-gap-xl) 0;
  color: var(--wf-optic-dim);
  font-size: var(--wf-step-0);
}

.grid {
  display: grid;
  gap: 0 var(--wf-gap-l);
  padding-bottom: var(--wf-gap-xl);
}

/* Two columns from tablet up, the same arrangement the directory and the desk
   use. A plate is a title and an arrow, not a paragraph, so a single column on
   a wide screen left half the room empty and made the list twice as long. */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.placard {
  display: grid;
  grid-template-columns: 6px minmax(0, 1fr) auto;
  align-items: start;
  gap: var(--wf-gap-m);
  padding: var(--wf-gap-m) 0;
  color: var(--wf-optic);
  text-decoration: none;
  transition: background var(--wf-motion) var(--wf-ease);
}

.placard:hover,
.placard:focus-visible {
  background: var(--wf-ink-raised);
}

/* Grey standing still, lit in the talk's own track on approach — the same tab
   the signs, the desk and the boards carry. A wall of plates each lit at rest
   read as a paint chart rather than a programme. */
.band {
  align-self: stretch;
  background: var(--wf-marker);
  transition: background var(--wf-motion) var(--wf-ease);
}

.placard:hover .band,
.placard:focus-visible .band {
  background: var(--track, var(--wf-marker-live));
}

.title-cell {
  display: grid;
  gap: var(--wf-gap-xs);
  justify-items: start;
  min-width: 0;
}

/* Two columns halve the room a title has, so the plate steps down one size:
   at the larger step a long title hyphenated across three lines and read as
   a paragraph rather than as a sign. The extra leading is for the same
   reason — sign leading is set for one or two lines, not four. */
.talk-title {
  min-width: 0;
  font-size: var(--wf-step-1);
  line-height: 1.05;
  overflow-wrap: break-word;
  hyphens: auto;
}

/* Every plate says what you are walking into. A session is the norm and stays
   quiet; a workshop is hours and hands-on, so it carries the brighter ink and
   is still the thing the eye catches while scanning. */
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

.arrow {
  align-self: center;
  font-size: var(--wf-step-2);
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
    font-size: var(--wf-step-1);
  }
}
</style>
