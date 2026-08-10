<script setup lang="ts">
/**
 * BlogFigure — a screenshot inside a post.
 *
 * Not photography, so it is deliberately not a BannerImage: no hall tint, no
 * scrim, no full bleed. It is a plated exhibit, framed by a 1px rule with a
 * hall-colour tab on the caption, the same tab the sign rows use. The width and
 * height props reserve the box before the file lands so the prose never jumps.
 */
import type { Hall } from '../../data/types'

withDefaults(
  defineProps<{
    src: string
    /** Required: a screenshot with no alt text is furniture, not information. */
    alt: string
    caption?: string
    hall?: Hall
    width?: number
    height?: number
    /** Breaks the figure out of the prose measure to the full column. */
    wide?: boolean
  }>(),
  { width: 1920, height: 1080, wide: false }
)
</script>

<template>
  <figure class="post-figure" :class="{ 'is-wide': wide }" :data-hall="hall">
    <img
      class="plate"
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      loading="lazy"
      decoding="async"
    />

    <figcaption v-if="caption" class="caption">
      <span class="tab" aria-hidden="true" />
      <span class="text">{{ caption }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.post-figure {
  margin: var(--wf-gap-l) 0;
}

.plate {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--wf-ink-rule);
  border-radius: 0;
  background: var(--wf-ink-raised);
}

.caption {
  display: grid;
  grid-template-columns: 6px 1fr;
  gap: 0 var(--wf-gap-s);
  margin-top: var(--wf-gap-s);
}

.tab {
  align-self: stretch;
  background: var(--hall, var(--wf-ink-rule));
}

.text {
  font-size: var(--wf-step--1);
  line-height: 1.4;
  color: var(--wf-optic-dim);
}

/* The prose measure is set for reading, not for a 16:9 UI capture. A wide
   figure is released from it by the post frame and fills its column. */
</style>
