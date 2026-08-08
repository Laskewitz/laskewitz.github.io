<script setup lang="ts">
/**
 * A moved sign.
 *
 * These URLs are printed on old slides and sitting inside QR codes that people
 * still scan. The meta refresh in the page head does the work; this is what
 * they see if it hasn't fired yet, and it stays tappable either way.
 */
import { onMounted } from 'vue'

const props = defineProps<{ to: string; label: string }>()

onMounted(() => {
  window.location.replace(props.to)
})
</script>

<template>
  <main class="moved">
    <p class="wf-label">This page has moved</p>

    <a class="go" :href="to">
      <span class="go-label wf-sign">{{ label }}</span>
      <span class="go-arrow" aria-hidden="true">→</span>
    </a>

    <p class="fallback">
      Taking you there now. If nothing happens, tap above.
    </p>
  </main>
</template>

<style scoped>
.moved {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding: var(--wf-gap-l) var(--wf-gutter);
  background: var(--wf-ink);
  color: var(--wf-optic);
}

.go {
  display: flex;
  align-items: center;
  gap: var(--wf-gap-s);
  min-height: 72px;
  margin-top: var(--wf-gap-s);
  padding: var(--wf-gap-s) 0;
  border-top: 3px solid var(--wf-hall-d);
  border-bottom: 3px solid var(--wf-hall-d);
  color: inherit;
  text-decoration: none;
}

.go-label {
  flex: 1;
  font-size: var(--wf-step-2);
  overflow-wrap: anywhere;
}

.go-arrow {
  font-size: var(--wf-step-3);
  line-height: 1;
}

.fallback {
  margin: var(--wf-gap-m) 0 0;
  max-width: 34ch;
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step--1);
  color: var(--wf-optic-dim);
}
</style>
