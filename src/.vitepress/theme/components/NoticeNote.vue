<script setup lang="ts">
/** One post pinned to the notice board. Used by both the current list and the year archive. */
import type { Post } from '../../data/posts'
import { formatPostDate } from '../../data/format'

defineProps<{ post: Post }>()
</script>

<template>
  <a class="note" :href="post.url">
    <span class="tab" aria-hidden="true" />

    <span class="note-body">
      <time class="date" :datetime="post.date">{{ formatPostDate(post.date) }}</time>
      <span class="note-title wf-sign">{{ post.title }}</span>
    </span>

    <span class="arrow" aria-hidden="true">→</span>
  </a>
</template>

<style scoped>
.note {
  display: grid;
  grid-template-columns: 6px 1fr auto;
  align-items: center;
  gap: var(--wf-gap-s);
  min-height: var(--wf-tap);
  padding: var(--wf-gap-m) 0;
  border-bottom: 1px solid var(--wf-ink-rule);
  color: var(--wf-optic);
  text-decoration: none;
  transition: background var(--wf-motion) var(--wf-ease);
}

.note:hover,
.note:focus-visible {
  background: var(--wf-ink-raised);
}

.tab {
  align-self: stretch;
  background: var(--wf-hall-d);
}

.note-body {
  display: flex;
  flex-direction: column;
  gap: var(--wf-gap-hair);
  min-width: 0;
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
  font-size: var(--wf-step-2);
  overflow-wrap: anywhere;
}

.arrow {
  font-size: var(--wf-step-3);
  line-height: 1;
  padding-right: var(--wf-gap-xs);
  transition: transform var(--wf-motion) var(--wf-ease);
}

.note:hover .arrow,
.note:focus-visible .arrow {
  transform: translateX(5px);
}
</style>
