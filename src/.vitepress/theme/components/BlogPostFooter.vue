<script setup lang="ts">
/**
 * The sign-off under a post: back to the board, and the feed, so the end of a
 * post is a junction rather than a dead end.
 */
</script>

<template>
  <footer class="signoff">
    <a class="button" href="/blog/">
      <span aria-hidden="true">←</span>
      All posts
    </a>
    <a class="button" href="/feed.xml">RSS ↗</a>
  </footer>
</template>

<style scoped>
.signoff {
  display: flex;
  flex-wrap: wrap;
  gap: var(--wf-gap-xs);
  margin-top: var(--wf-gap-l);
  padding-top: var(--wf-gap-m);
  padding-bottom: var(--wf-gap-xl);
  border-top: 1px solid var(--wf-ink-rule);
}

.button {
  display: inline-flex;
  align-items: center;
  gap: var(--wf-gap-xs);
  min-height: var(--wf-tap);
  padding: 0 var(--wf-gap-s);
  border: 1px solid var(--wf-ink-rule);
  color: var(--wf-optic);
  font-variation-settings: 'wdth' 110;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background var(--wf-motion) var(--wf-ease),
    color var(--wf-motion) var(--wf-ease);
}

.button:hover,
.button:focus-visible {
  background: var(--wf-optic);
  color: var(--wf-ink);
}
</style>
