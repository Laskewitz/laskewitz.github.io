<script setup lang="ts">
/**
 * The notice board — posts pinned to a wall, opening into the reading measure.
 */
import { data as posts } from '../posts.data'
import { formatPostDate } from '../../data/format'
</script>

<template>
  <div class="board">
    <header class="head wf-gutter">
      <h1 class="title wf-sign">Writing</h1>
      <p class="standfirst">
        Notes on the things I build and talk about. No newsletter, no signup —
        <a href="/feed.rss">the RSS feed</a> is the whole subscription.
      </p>
    </header>

    <div class="wf-gutter">
      <p v-if="!posts.length" class="empty">
        Nothing pinned up yet. The first post is on its way.
      </p>

      <ol v-else class="notes">
        <li v-for="post in posts" :key="post.url">
          <a class="note" :href="post.url">
            <span class="tab" aria-hidden="true" />

            <span class="note-body">
              <time class="date" :datetime="post.date">{{
                formatPostDate(post.date)
              }}</time>
              <span class="note-title wf-sign">{{ post.title }}</span>
              <span v-if="post.description" class="note-desc">{{
                post.description
              }}</span>
              <span v-if="post.tags.length" class="tags">
                <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
              </span>
            </span>

            <span class="arrow" aria-hidden="true">→</span>
          </a>
        </li>
      </ol>
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

.standfirst {
  max-width: 50ch;
  margin: var(--wf-gap-s) 0 0;
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step-0);
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.standfirst a {
  color: var(--wf-optic);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.empty {
  padding-bottom: var(--wf-gap-xl);
  font-variation-settings: 'wdth' 100;
  color: var(--vp-c-text-2);
}

.notes {
  margin: 0;
  padding: 0 0 var(--wf-gap-xl);
  list-style: none;
  border-top: 1px solid var(--wf-ink-rule);
}

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

.note-desc {
  max-width: 60ch;
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step-0);
  line-height: 1.55;
  color: var(--vp-c-text-2);
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
