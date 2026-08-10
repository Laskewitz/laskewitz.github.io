<script setup lang="ts">
/**
 * The furniture above a post: a masthead carrying the title, and a rail carrying
 * the date and categories.
 *
 * They are one component because on a wide screen they land in different cells
 * of the same page grid — masthead across the top, rail beside the prose — which
 * `display: contents` on this wrapper makes possible.
 *
 * Categories link back into a filtered board rather than to tag pages of their
 * own. One board that can be narrowed beats a second set of pages to maintain.
 */
import { computed } from 'vue'
import { useData } from 'vitepress'
import { sortCategories } from '../../data/posts'
import { formatPostDate } from '../../data/format'

const { frontmatter } = useData()

const date = computed(() => {
  const raw = frontmatter.value.date
  if (!raw) return null
  return raw instanceof Date ? raw.toISOString() : String(raw)
})

const categories = computed(() => sortCategories(frontmatter.value.categories ?? []))
</script>

<template>
  <div class="post-head">
    <header class="masthead">
      <a class="back" href="/blog/">
        <span class="back-arrow" aria-hidden="true">←</span>
        Blog
      </a>

      <h1 class="title wf-sign">{{ frontmatter.title }}</h1>
    </header>

    <aside class="rail" aria-label="About this post">
      <div class="rail-inner">
        <div v-if="date" class="block">
          <p class="rail-label wf-label">Published</p>
          <time class="date" :datetime="date">{{ formatPostDate(date) }}</time>
        </div>

        <div v-if="categories.length" class="block">
          <p class="rail-label wf-label">Filed under</p>
          <p class="cats">
            <a
              v-for="category in categories"
              :key="category"
              class="cat"
              :href="`/blog/?category=${encodeURIComponent(category)}`"
              >{{ category }}</a
            >
          </p>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.masthead {
  padding-block: var(--wf-gap-l) var(--wf-gap-m);
  border-bottom: 1px solid var(--wf-ink-rule);
}

.back {
  display: inline-flex;
  align-items: center;
  gap: var(--wf-gap-xs);
  min-height: var(--wf-tap);
  color: var(--wf-optic-dim);
  font-variation-settings: 'wdth' 110;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  transition: color var(--wf-motion) var(--wf-ease);
}

.back:hover,
.back:focus-visible {
  color: var(--wf-optic);
}

.back-arrow {
  transition: transform var(--wf-motion) var(--wf-ease);
}

.back:hover .back-arrow,
.back:focus-visible .back-arrow {
  transform: translateX(-4px);
}

/* The title is the one part of a post that runs at venue scale, and it gets the
   full frame to do it in. The measure starts below, with the prose. */
.title {
  max-width: 24ch;
  margin: var(--wf-gap-xs) 0 0;
  font-size: var(--wf-step-3);
  font-weight: 900;
  letter-spacing: -0.025em;
  margin-left: -0.02em;
  text-wrap: balance;
}

.rail {
  padding-top: var(--wf-gap-m);
}

.rail-inner {
  display: flex;
  flex-wrap: wrap;
  gap: var(--wf-gap-m) var(--wf-gap-l);
}

.rail-label {
  margin: 0 0 var(--wf-gap-xs);
}

.date {
  font-variation-settings: 'wdth' 105;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--wf-optic);
}

.cats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--wf-gap-xs);
  margin: 0;
}

.cat {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0 0.7em;
  border: 1px solid var(--wf-ink-rule);
  color: var(--wf-optic-dim);
  font-variation-settings: 'wdth' 105;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background var(--wf-motion) var(--wf-ease),
    color var(--wf-motion) var(--wf-ease),
    border-color var(--wf-motion) var(--wf-ease);
}

.cat:hover,
.cat:focus-visible {
  background: var(--wf-optic);
  border-color: var(--wf-optic);
  color: var(--wf-ink);
}

/* Wide enough for a rail beside the prose. The wrapper dissolves into the page
   grid so the masthead can span it while the rail takes the second column. */
@media (min-width: 82rem) {
  .post-head {
    display: contents;
  }

  .masthead {
    grid-column: 1 / -1;
  }

  .rail {
    grid-column: 2;
    grid-row: 2;
    padding-top: var(--wf-gap-xl);
  }

  .rail-inner {
    position: sticky;
    top: calc(var(--vp-nav-height) + var(--wf-gap-l));
    flex-direction: column;
    gap: var(--wf-gap-l);
  }
}
</style>
