<script setup lang="ts">
/**
 * SignRow — the atom of this world.
 *
 * A full-width directional sign: hall-colour tab, cut label, optional meta,
 * terminal arrow. Never shorter than a thumb. Every navigable thing on this
 * site is one of these, which is what makes the QR path fast.
 */
import type { Hall } from '../../data/types'

withDefaults(
  defineProps<{
    href: string
    label: string
    meta?: string
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
    :rel="external ? 'noreferrer' : undefined"
  >
    <span class="tab" aria-hidden="true" />

    <span class="body">
      <span class="label wf-sign">{{ label }}</span>
      <span v-if="note" class="note">{{ note }}</span>
    </span>

    <span v-if="meta" class="meta">{{ meta }}</span>

    <span class="arrow" aria-hidden="true">{{ external ? '↗' : '→' }}</span>
  </a>
</template>

<style scoped>
.sign-row {
  --row-hall: var(--hall, var(--wf-optic));

  display: grid;
  grid-template-columns: 6px 1fr auto auto;
  align-items: center;
  gap: 0 var(--wf-gap-s);
  min-height: var(--wf-tap);
  padding: var(--wf-gap-s) 0;
  border-bottom: 1px solid var(--wf-ink-rule);
  color: var(--wf-optic);
  text-decoration: none;
  transition: background var(--wf-motion) var(--wf-ease);
}

.sign-row:hover,
.sign-row:focus-visible {
  background: var(--wf-ink-raised);
}

.tab {
  align-self: stretch;
  background: var(--row-hall);
  opacity: 0;
  transition: opacity var(--wf-motion) var(--wf-ease);
}

.sign-row.has-hall .tab,
.sign-row:hover .tab,
.sign-row:focus-visible .tab {
  opacity: 1;
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

.note {
  font-variation-settings: 'wdth' 100;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
  font-size: var(--wf-step--1);
  color: var(--wf-optic-dim);
  line-height: 1.4;
}

.meta {
  font-variation-settings: 'wdth' 105;
  font-weight: 600;
  font-size: var(--wf-step--1);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--wf-optic-dim);
  white-space: nowrap;
  padding-right: var(--wf-gap-xs);
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

@media (max-width: 640px) {
  .sign-row {
    grid-template-columns: 6px 1fr auto;
  }

  .meta {
    grid-column: 2;
    grid-row: 2;
    padding-left: var(--wf-gap-s);
    padding-right: 0;
    white-space: normal;
  }

  .arrow {
    grid-column: 3;
    grid-row: 1 / span 2;
  }
}
</style>
