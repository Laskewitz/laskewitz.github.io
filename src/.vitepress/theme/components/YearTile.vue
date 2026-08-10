<script setup lang="ts">
/**
 * YearTile — a hall-letter tile. The venue's smallest identifying mark.
 * Used for years in the directory and for a talk's hall on a placard.
 */
import type { Hall } from '../../data/types'

defineProps<{
  hall?: Hall
  text: string
  /** Outline tiles are quiet; solid tiles claim the surface. */
  variant?: 'solid' | 'outline'
}>()
</script>

<template>
  <span
    class="hall-tile wf-sign"
    :class="variant === 'outline' ? 'is-outline' : 'is-solid'"
    :data-hall="hall"
  >
    {{ text }}
  </span>
</template>

<style scoped>
.hall-tile {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.4em;
  padding: 0.32em 0.6em;
  font-size: var(--wf-step--1);
  letter-spacing: 0.06em;
  line-height: 1;
  white-space: nowrap;
}

.is-solid {
  background: var(--hall, var(--wf-optic));
  color: var(--on-hall, var(--wf-ink));
}

.is-outline {
  border: 1px solid var(--hall, var(--wf-ink-rule));
  color: var(--wf-optic);
}
</style>
