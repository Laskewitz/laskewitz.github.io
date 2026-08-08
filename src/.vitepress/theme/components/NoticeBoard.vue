<script setup lang="ts">
/**
 * The notice board — posts pinned to a wall. This year's stay up; earlier years
 * fold into a year board the way the events hall does, so the top of the page is
 * always what's current rather than an archive that grows forever.
 */
import { computed, onMounted, ref } from 'vue'
import { data as posts } from '../posts.data'
import { sortCategories } from '../../data/posts'
import HallTile from './HallTile.vue'
import NoticeNote from './NoticeNote.vue'

const categories = computed(() =>
  sortCategories([...new Set(posts.flatMap((p) => p.categories))])
)

const picked = ref<string[]>([])

/**
 * A post's category chips link here with `?category=…`, so arriving from a post
 * lands on the board already narrowed. Read once on mount rather than kept in
 * sync with the URL: the filter is a starting point, not a permalink, and
 * rewriting history on every chip click would bury the back button.
 */
onMounted(() => {
  const wanted = new URLSearchParams(window.location.search).getAll('category')
  const known = wanted.filter((c) => categories.value.includes(c))
  if (known.length) picked.value = known
})

function toggle(category: string) {
  picked.value = picked.value.includes(category)
    ? picked.value.filter((c) => c !== category)
    : [...picked.value, category]
}

function clear() {
  picked.value = []
}

/** Categories are OR'd: picking two widens the board rather than emptying it. */
const shown = computed(() =>
  picked.value.length
    ? posts.filter((p) => p.categories.some((c) => picked.value.includes(c)))
    : posts
)

/**
 * "Current" is this year, resolved when the page renders — no editing needed in
 * January. In 2027 the 2026 posts fold themselves away.
 */
const thisYear = String(new Date().getFullYear())

const current = computed(() => shown.value.filter((p) => p.year >= thisYear))

const archiveByYear = computed(() => {
  const groups = new Map<string, typeof posts>()
  for (const post of shown.value) {
    if (post.year >= thisYear) continue
    if (!groups.has(post.year)) groups.set(post.year, [])
    groups.get(post.year)!.push(post)
  }
  return [...groups.entries()].sort((a, b) => b[0].localeCompare(a[0]))
})

const openYears = ref(new Set<string>())

function toggleYear(year: string) {
  const next = new Set(openYears.value)
  next.has(year) ? next.delete(year) : next.add(year)
  openYears.value = next
}
</script>

<template>
  <div class="board">
    <header class="head wf-gutter">
      <h1 class="title wf-sign">Blog</h1>
    </header>

    <div v-if="categories.length" class="filters wf-gutter">
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        class="chip"
        :aria-pressed="picked.includes(category)"
        @click="toggle(category)"
      >
        {{ category }}
      </button>

      <button v-if="picked.length" type="button" class="clear" @click="clear">Clear</button>

      <p v-if="picked.length" class="tally" role="status" aria-live="polite">
        {{ shown.length }} of {{ posts.length }}
      </p>
    </div>

    <div class="wf-gutter">
      <p v-if="!posts.length" class="empty">
        Nothing pinned up yet. The first post is on its way.
      </p>

      <p v-else-if="!shown.length" class="empty">
        Nothing filed under that yet.
        <button type="button" class="clear is-inline" @click="clear">Show everything</button>
      </p>

      <template v-else>
        <ol v-if="current.length" class="notes">
          <li v-for="post in current" :key="post.url">
            <NoticeNote :post="post" />
          </li>
        </ol>

        <section v-if="archiveByYear.length" class="archive" aria-labelledby="archive-heading">
          <h2 id="archive-heading" class="archive-heading wf-sign">Earlier</h2>

          <div v-for="[year, list] in archiveByYear" :key="year" class="year">
            <button
              class="year-head"
              type="button"
              :aria-expanded="openYears.has(year)"
              @click="toggleYear(year)"
            >
              <HallTile :text="year" variant="outline" />
              <span class="year-count">
                {{ list.length }} {{ list.length === 1 ? 'post' : 'posts' }}
              </span>
              <span class="year-toggle" aria-hidden="true">
                {{ openYears.has(year) ? '−' : '+' }}
              </span>
            </button>

            <ol v-show="openYears.has(year)" class="notes">
              <li v-for="post in list" :key="post.url">
                <NoticeNote :post="post" />
              </li>
            </ol>
          </div>
        </section>
      </template>
    </div>
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

.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--wf-gap-xs);
  padding-bottom: var(--wf-gap-m);
}

.chip {
  min-height: var(--wf-tap);
  padding: 0 var(--wf-gap-s);
  background: none;
  border: 1px solid var(--wf-ink-rule);
  color: var(--wf-optic);
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

.chip:hover,
.chip:focus-visible {
  border-color: var(--wf-optic);
}

.chip[aria-pressed='true'] {
  background: var(--wf-hall-d);
  border-color: var(--wf-hall-d);
  color: var(--wf-on-hall-d);
}

.clear {
  min-height: var(--wf-tap);
  padding: 0 var(--wf-gap-xs);
  background: none;
  border: 0;
  color: var(--wf-optic-dim);
  font-variation-settings: 'wdth' 105;
  font-weight: 600;
  font-size: var(--wf-step--1);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.clear:hover,
.clear:focus-visible {
  color: var(--wf-optic);
}

.clear.is-inline {
  min-height: 0;
}

.tally {
  margin: 0 0 0 auto;
  font-variation-settings: 'wdth' 105;
  font-weight: 600;
  font-size: var(--wf-step--1);
  letter-spacing: 0.06em;
  color: var(--wf-optic-dim);
}

.empty {
  padding-bottom: var(--wf-gap-xl);
  font-variation-settings: 'wdth' 100;
  color: var(--vp-c-text-2);
}

.notes {
  margin: 0;
  padding: 0 0 var(--wf-gap-l);
  list-style: none;
  border-top: 1px solid var(--wf-ink-rule);
}

.archive {
  padding-bottom: var(--wf-gap-xl);
}

.archive-heading {
  margin: 0 0 var(--wf-gap-s);
  font-size: var(--wf-step-1);
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
  color: var(--wf-optic-dim);
}

.year .notes {
  margin-top: var(--wf-gap-xs);
  padding-bottom: 0;
}
</style>
