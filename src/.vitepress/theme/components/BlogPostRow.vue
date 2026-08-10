<script setup lang="ts">
/**
 * One post pinned to the notice board. Used by both the current list and the
 * year archive, and it reads the way an event line does: the date holds its own
 * column so a scanning eye runs down one edge, and the tab in the gutter is grey
 * standing still, lit in the row's hall on approach.
 */
import type { Post } from '../../data/posts'
import type { Hall } from '../../data/types'
import { formatPostDate } from '../../data/format'

defineProps<{ post: Post; hall?: Hall }>()
</script>

<template>
  <a class="note" :href="post.url" :data-hall="hall">
    <time class="date" :datetime="post.date">{{ formatPostDate(post.date) }}</time>
    <span class="note-title wf-sign">{{ post.title }}</span>
    <span class="arrow" aria-hidden="true">→</span>
  </a>
</template>

<style scoped>
/* The events board's anatomy: date column, title, arrow, and a 6px tab standing
   in its own gutter. The tab is a pseudo-element rather than a grid cell so it
   survives the phone's collapse to one column without restructuring the row. */
.note {
  position: relative;
  display: grid;
  grid-template-columns: 9rem minmax(0, 1fr) auto;
  align-items: baseline;
  gap: var(--wf-gap-s) var(--wf-gap-m);
  min-height: var(--wf-tap);
  padding: var(--wf-gap-m) 0;
  padding-left: calc(6px + var(--wf-gap-s));
  color: var(--wf-optic);
  text-decoration: none;
}

.note::before {
  content: '';
  position: absolute;
  left: 0;
  top: var(--wf-gap-m);
  bottom: var(--wf-gap-m);
  width: 6px;
  background: var(--wf-marker);
  transition: background var(--wf-motion) var(--wf-ease);
}

.note:hover::before,
.note:focus-visible::before {
  background: var(--hall, var(--wf-marker-live));
}

.date {
  font-variation-settings: 'wdth' 105;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--wf-optic-dim);
}

.note-title {
  font-size: var(--wf-step-1);
  line-height: 1.05;
  overflow-wrap: anywhere;
}

.arrow {
  align-self: center;
  font-size: var(--wf-step-2);
  line-height: 1;
  padding-right: var(--wf-gap-xs);
  transition: transform var(--wf-motion) var(--wf-ease);
}

.note:hover .arrow,
.note:focus-visible .arrow {
  transform: translateX(5px);
}

/* On a phone the date leads its own line rather than holding a column that no
   longer has anything to align to. */
@media (max-width: 640px) {
  .note {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: var(--wf-gap-hair) var(--wf-gap-s);
  }

  .date {
    grid-column: 1 / -1;
  }
}
</style>
