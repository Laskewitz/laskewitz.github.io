<script setup lang="ts">
/**
 * LinkRow — the atom of this world.
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
    /**
     * A quiet row keeps its tab grey standing still and only lights its hall
     * colour on approach. A list where every tab is lit at rest is a paint
     * chart; lighting on hover makes the colour mean "this one".
     */
    quiet?: boolean
    /** Doors are the oversized rows used on resource pages. */
    size?: 'default' | 'door'
  }>(),
  { size: 'default' }
)
</script>

<template>
  <a
    class="link-row"
    :class="[`is-${size}`, { 'has-hall': !!hall && !quiet }]"
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
.link-row {
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

.link-row:hover,
.link-row:focus-visible {
  background: var(--wf-ink-raised);
}

/* A sign without a lit hall still has a tab: it is the anatomy of the row, so
   it stays visible as a quiet rule and lights its hall on approach. A row given
   a hall outright carries that colour standing still; a quiet row keeps the
   hall in reserve and only lights it under the pointer. */
.tab {
  align-self: stretch;
  background: var(--wf-marker);
  transition: background var(--wf-motion) var(--wf-ease);
}

.link-row.has-hall .tab {
  background: var(--row-hall);
}

.link-row:hover .tab,
.link-row:focus-visible .tab {
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

.link-row:hover .arrow,
.link-row:focus-visible .arrow {
  transform: translateX(4px);
}
</style>
