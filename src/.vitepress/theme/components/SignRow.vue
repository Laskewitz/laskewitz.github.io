<script setup lang="ts">
/**
 * SignRow — the atom of this world.
 *
 * A full-width directional sign: hall-colour tab, cut label, optional note,
 * terminal arrow. Never shorter than a thumb. Every navigable thing on this
 * site is one of these, which is what makes the QR path fast.
 */
import type { Hall } from '../../data/types'

withDefaults(
  defineProps<{
    href: string
    label: string
    note?: string
    hall?: Hall
    /** External links get a diagonal arrow, internal ones a straight arrow. */
    external?: boolean
    /** Doors are the oversized rows used on resource pages. */
    size?: 'default' | 'door'
  }>(),
  { size: 'default' }
)
</script>

<template>
  <a
    class="sign-row"
    :class="[`is-${size}`, { 'has-hall': !!hall }]"
    :data-hall="hall"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <span class="tab" aria-hidden="true" />

    <span class="body">
      <span class="label wf-sign">{{ label }}</span>
      <span v-if="note" class="note">{{ note }}</span>
    </span>

    <span class="arrow" aria-hidden="true">{{ external ? '↗' : '→' }}</span>
  </a>
</template>

<style scoped>
.sign-row {
  --row-hall: var(--hall, var(--wf-marker-live));

  display: grid;
  /* The field runs the width of the venue; the information does not. On a wide
     screen a 1fr body track threw the arrow against the far wall, a thousand
     pixels from the word it belongs to. The sign now reads as one column and
     the arrow terminates it. */
  grid-template-columns: 6px minmax(0, var(--wf-measure)) auto;
  justify-content: start;
  align-items: center;
  gap: 0 var(--wf-gap-s);
  min-height: var(--wf-tap);
  padding: var(--wf-gap-s) 0;
  color: var(--wf-optic);
  text-decoration: none;
  transition: background var(--wf-motion) var(--wf-ease);
}

.sign-row:hover,
.sign-row:focus-visible {
  background: var(--wf-ink-raised);
}

/* A sign without a hall still has a tab: it is the anatomy of the row, so it
   stays visible as a quiet rule and lights Hall A blue on approach. Only a row
   that genuinely belongs to a hall carries that hall's colour standing still,
   and that hall overrides the blue when live. */
.tab {
  align-self: stretch;
  background: var(--wf-marker);
  transition: background var(--wf-motion) var(--wf-ease);
}

.sign-row.has-hall .tab {
  background: var(--row-hall);
}

.sign-row:hover .tab,
.sign-row:focus-visible .tab {
  background: var(--row-hall);
}

.body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  padding-left: var(--wf-gap-s);
}

.label {
  font-size: var(--wf-step-1);
  overflow-wrap: anywhere;
}

.is-door .label {
  font-size: var(--wf-step-2);
}

/* The row runs the width of the venue; the note under it is a sentence, so it
   stops at the reading measure instead of stretching to the far wall. */
.note {
  max-width: var(--wf-measure);
  font-variation-settings: 'wdth' 100;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
  font-size: var(--wf-step--1);
  color: var(--wf-optic-dim);
  line-height: 1.4;
}

.arrow {
  font-size: var(--wf-step-2);
  line-height: 1;
  padding-right: var(--wf-gap-xs);
  transform: translateX(0);
  transition: transform var(--wf-motion) var(--wf-ease);
}

.sign-row:hover .arrow,
.sign-row:focus-visible .arrow {
  transform: translateX(4px);
}
</style>
