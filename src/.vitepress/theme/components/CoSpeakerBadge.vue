<script setup lang="ts">
/**
 * Shared billing.
 *
 * Reads as a late-addition sticker slapped onto the sign — small, hall-coloured,
 * and applied a degree or two off true. It was only on the talk placard, which
 * meant the entrance and the events board hid the fact that someone else was up
 * there too; the same sticker now goes on every surface that lists a stage.
 */
import { coSpeakerNames } from '../../data/speakers'

defineProps<{ speakers: readonly string[] }>()
</script>

<template>
  <span v-if="coSpeakerNames(speakers)" class="with wf-sign">
    <span class="with-word">With</span>
    <span class="with-name">{{ coSpeakerNames(speakers) }}</span>
  </span>
</template>

<style scoped>
/* Ink stays the measured on-hall pair; opacity would break the contrast law.
   It carries a person's name, so it stays above the 11px functional floor and
   keeps real inset rather than shrinking to fit the rotation. */
.with {
  display: inline-flex;
  align-self: flex-start;
  align-items: baseline;
  gap: 0.42em;
  margin: 0.3em 0 0.15em;
  padding: 0.28em 0.55em;
  background: var(--hall, var(--wf-marker-live));
  color: var(--on-hall, var(--wf-on-hall-a));
  font-size: 0.75rem;
  line-height: 1.25;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  transform: rotate(-1.8deg);
  transform-origin: 0 50%;
}

.with-word {
  font-weight: 400;
  font-variation-settings: 'wdth' 100;
}

.with-name {
  font-weight: 700;
}
</style>
