<script setup lang="ts">
/**
 * The filter bar — a search field and one dropdown per facet.
 *
 * Shared by the talks index and the blog board so the two listing surfaces
 * can't drift apart. Selection is OR'd within a facet by the caller; this
 * component only owns the menu behaviour and the look.
 */
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
  /** One dropdown per facet. A facet with no options is not rendered. */
  facets: { name: string; options: string[] }[]
  picked: string[]
  query: string
  shown: number
  total: number
  searchLabel: string
  searchPlaceholder: string
}>()

const emit = defineEmits<{
  'update:picked': [string[]]
  'update:query': [string]
}>()

function toggle(option: string) {
  emit(
    'update:picked',
    props.picked.includes(option)
      ? props.picked.filter((p) => p !== option)
      : [...props.picked, option]
  )
}

function clear() {
  emit('update:picked', [])
  emit('update:query', '')
}

function facetCount(options: string[]) {
  return props.picked.filter((p) => options.includes(p)).length
}

/** Which facet menu is open, if any. Only one at a time, like a real menu bar. */
const openFacet = ref<string | null>(null)

const bar = ref<HTMLElement | null>(null)

function onDocument(e: Event) {
  if (openFacet.value && bar.value && !bar.value.contains(e.target as Node)) {
    openFacet.value = null
  }
}

function onEscape(e: KeyboardEvent) {
  if (e.key === 'Escape') openFacet.value = null
}

onMounted(() => {
  document.addEventListener('click', onDocument)
  document.addEventListener('keydown', onEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocument)
  document.removeEventListener('keydown', onEscape)
})
</script>

<template>
  <div ref="bar" class="filters">
    <input
      :value="query"
      type="search"
      class="search-input"
      :aria-label="searchLabel"
      :placeholder="searchPlaceholder"
      @input="emit('update:query', ($event.target as HTMLInputElement).value)"
    />

    <div v-for="facet in facets.filter((f) => f.options.length)" :key="facet.name" class="menu">
      <button
        type="button"
        class="menu-button"
        :aria-expanded="openFacet === facet.name"
        :data-on="facetCount(facet.options) > 0"
        @click="openFacet = openFacet === facet.name ? null : facet.name"
      >
        {{ facet.name }}
        <span v-if="facetCount(facet.options)" class="badge">{{
          facetCount(facet.options)
        }}</span>
        <span class="caret" aria-hidden="true">▾</span>
      </button>

      <div v-show="openFacet === facet.name" class="menu-panel">
        <button
          v-for="option in facet.options"
          :key="option"
          type="button"
          class="chip"
          :aria-pressed="picked.includes(option)"
          @click="toggle(option)"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <p class="tally" role="status" aria-live="polite">{{ shown }}/{{ total }}</p>

    <button
      v-if="picked.length || query.trim()"
      type="button"
      class="clear"
      @click="clear"
    >
      Clear
    </button>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--wf-gap-xs);
  padding-bottom: var(--wf-gap-m);
  border-bottom: 1px solid var(--wf-ink-rule);
}

.search-input {
  flex: 1 1 14rem;
  min-width: 0;
  max-width: 24rem;
  height: 42px;
  padding: 0 var(--wf-gap-s);
  border: 1px solid var(--wf-ink-rule);
  border-radius: 0;
  background: transparent;
  color: var(--wf-optic);
  font: inherit;
  font-size: var(--wf-step-0);
}

.search-input::placeholder {
  color: var(--wf-optic-dim);
}

.search-input:focus-visible {
  outline: 2px solid var(--wf-optic);
  outline-offset: 2px;
}

.menu {
  position: relative;
}

.menu-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  height: 42px;
  padding: 0 var(--wf-gap-s);
  border: 1px solid var(--wf-ink-rule);
  background: transparent;
  color: var(--wf-optic-dim);
  font-variation-settings: 'wdth' 110;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
}

.menu-button:hover,
.menu-button[aria-expanded='true'],
.menu-button[data-on='true'] {
  color: var(--wf-optic);
  border-color: var(--wf-optic);
}

.menu-button:focus-visible,
.chip:focus-visible,
.clear:focus-visible {
  outline: 2px solid var(--wf-optic);
  outline-offset: 2px;
}

.badge {
  display: inline-grid;
  place-items: center;
  min-width: 1.5em;
  height: 1.5em;
  padding: 0 0.35em;
  background: var(--wf-optic);
  color: var(--wf-ink);
}

.caret {
  font-size: 0.7em;
}

.menu-panel {
  position: absolute;
  z-index: 20;
  top: calc(100% + 4px);
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: max-content;
  max-width: min(22rem, calc(100vw - 2 * var(--wf-gutter)));
  max-height: 60vh;
  overflow-y: auto;
  padding: var(--wf-gap-xs);
  border: 1px solid var(--wf-optic);
  background: var(--wf-ink);
  gap: 2px;
}

.chip {
  padding: 0.6em var(--wf-gap-s);
  border: 0;
  background: transparent;
  color: var(--wf-optic-dim);
  font-variation-settings: 'wdth' 110;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-align: left;
  cursor: pointer;
}

.chip:hover {
  color: var(--wf-optic);
}

.chip[aria-pressed='true'] {
  background: var(--wf-optic);
  color: var(--wf-ink);
}

.tally {
  margin: 0 0 0 auto;
  color: var(--wf-optic-dim);
  font-size: var(--wf-step--1);
  letter-spacing: 0.05em;
  font-variant-numeric: tabular-nums;
}

.clear {
  padding: 0;
  border: 0;
  background: none;
  color: var(--wf-optic);
  font: inherit;
  font-size: var(--wf-step--1);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
</style>
