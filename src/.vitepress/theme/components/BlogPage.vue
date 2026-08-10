<script setup lang="ts">
/**
 * The notice board — posts pinned to a wall. This year's stay up; earlier years
 * fold into a year board the way the events hall does, so the top of the page is
 * always what's current rather than an archive that grows forever.
 */
import { computed, onMounted, ref } from 'vue'
import { data as posts } from '../posts.data'
import type { Hall } from '../../data/types'
import { sortCategories } from '../../data/posts'
import FilterBar from './FilterBar.vue'
import PageBanner from './PageBanner.vue'
import YearTile from './YearTile.vue'
import BlogPostRow from './BlogPostRow.vue'

/* The same five-hall rotation the events board runs, so a reader who learned
   the colours there reads them here. The colour is the row's identity on
   approach, not a claim about the post's subject. */
const HALL_CYCLE: Hall[] = ['a', 'e', 'b', 'd', 'c']

function hallFor(index: number): Hall {
  return HALL_CYCLE[index % HALL_CYCLE.length]
}

const categories = computed(() =>
  sortCategories([...new Set(posts.flatMap((p) => p.categories))])
)

const picked = ref<string[]>([])
const query = ref('')

const facets = computed(() => [{ name: 'Category', options: categories.value }])

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

function clear() {
  picked.value = []
  query.value = ''
}

/**
 * Categories are OR'd: picking two widens the board rather than emptying it.
 * Search still covers the description even though the board no longer prints
 * it, because it's the sentence a visitor is most likely to half-remember.
 */
const shown = computed(() => {
  const q = query.value.trim().toLowerCase()

  return posts.filter((post) => {
    if (picked.value.length && !post.categories.some((c) => picked.value.includes(c))) {
      return false
    }
    if (!q) return true
    return [post.title, post.description, ...post.categories]
      .join(' ')
      .toLowerCase()
      .includes(q)
  })
})

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
    <PageBanner
      title="Blog"
      src="stage-resco"
      alt="Daniel Laskewitz on stage at Resco Next 2024 in Vienna."
      hall="c"
      focus="45% 7%"
    />

    <FilterBar
      v-if="categories.length"
      class="wf-gutter bar"
      v-model:picked="picked"
      v-model:query="query"
      :facets="facets"
      :shown="shown.length"
      :total="posts.length"
      search-label="Search posts"
      search-placeholder="Search posts…"
    />

    <div class="wf-gutter">
      <p v-if="!posts.length" class="empty">
        Nothing pinned up yet. The first post is on its way.
      </p>

      <p v-else-if="!shown.length" class="empty">
        Nothing matches that.
        <button type="button" class="clear" @click="clear">Clear the filters</button>
      </p>

      <template v-else>
        <ol v-if="current.length" class="notes">
          <li v-for="(post, i) in current" :key="post.url">
            <BlogPostRow :post="post" :hall="hallFor(i)" />
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
              <YearTile :text="year" variant="outline" />
              <span class="year-count">
                {{ list.length }} {{ list.length === 1 ? 'post' : 'posts' }}
              </span>
              <span class="year-toggle" aria-hidden="true">
                {{ openYears.has(year) ? '−' : '+' }}
              </span>
            </button>

            <ol v-show="openYears.has(year)" class="notes">
              <li v-for="(post, i) in list" :key="post.url">
                <BlogPostRow :post="post" :hall="hallFor(i)" />
              </li>
            </ol>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<style scoped>
.bar {
  padding-top: var(--wf-gap-l);
}

.clear {
  min-height: 0;
  padding: 0;
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
  text-decoration-color: var(--wf-marker);
  transition: text-decoration-color var(--wf-motion) var(--wf-ease);
  cursor: pointer;
}

.clear:hover,
.clear:focus-visible {
  color: var(--wf-optic);
  text-decoration-color: var(--wf-optic);
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
