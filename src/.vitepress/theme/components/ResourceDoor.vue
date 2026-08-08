<script setup lang="ts">
/**
 * The hall door — the surface an attendee reaches by QR code.
 *
 * This is the critical path: a phone at arm's length, in a half-lit room that
 * is emptying, on conference wifi. So it is one saturated field, arrow rows at
 * thumb scale, and nothing else. No nav, no sidebar, no footer.
 *
 * Co-speakers come from ?with=<slug>,<slug>, resolved after mount against the
 * speaker registry. The page renders complete without it — the parameter only
 * changes who is billed, so the same URL and the same QR code serve every
 * delivery of the talk without an edit.
 */
import { computed, onMounted, ref } from 'vue'
import { getTalkByResource } from '../../data/talks'
import { billing } from '../../data/speakers'
import SpeakerPlate from './SpeakerPlate.vue'

const props = defineProps<{ slug: string }>()

const talk = computed(() => getTalkByResource(props.slug))

/** Starts as the talk's default billing; ?with= overrides it after mount. */
const coSpeakerSlugs = ref<string[]>(talk.value?.defaultCoSpeakers ?? [])

onMounted(() => {
  const raw = new URLSearchParams(window.location.search).get('with')
  if (raw === null) return
  coSpeakerSlugs.value = raw.split(',')
})

const speakers = computed(() => billing(coSpeakerSlugs.value))
</script>

<template>
  <main v-if="talk" class="door" :data-hall="talk.hall">
    <header class="masthead">
      <p class="kicker wf-label">Session resources</p>
      <h1 class="title wf-sign">{{ talk.title }}</h1>
    </header>

    <div class="sheet">
      <section
        v-for="group in talk.resources"
        :key="group.title"
        class="group"
        :aria-label="group.title"
      >
        <p class="group-title wf-label">{{ group.title }}</p>

        <ul class="links">
          <li v-for="link in group.links" :key="link.href">
            <a :href="link.href" target="_blank" rel="noreferrer">
              <span class="link-body">
                <span class="link-label wf-sign">{{ link.label }}</span>
                <span v-if="link.note" class="link-note">{{ link.note }}</span>
              </span>
              <span class="link-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </section>

      <section class="contact" aria-label="Contact">
        <SpeakerPlate
          :heading="speakers.length > 1 ? 'Your speakers' : 'Your speaker'"
          :speakers="speakers"
          :hall="talk.hall"
          with-links
        />
      </section>

      <p class="home">
        <a href="/">laskewitz.io</a>
      </p>
    </div>
  </main>
</template>

<style scoped>
/* The door is its own world: full-bleed hall colour, everything on it in the
   contrast-checked on-hall ink. */
.door {
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--hall);
  color: var(--on-hall);
  padding: max(env(safe-area-inset-top), var(--wf-gap-m)) var(--wf-gutter)
    max(env(safe-area-inset-bottom), var(--wf-gap-l));
}

.masthead {
  padding-bottom: var(--wf-gap-m);
  border-bottom: 2px solid currentColor;
}

.kicker {
  margin: 0;
  color: inherit;
}

.title {
  margin: var(--wf-gap-xs) 0 0;
  font-size: var(--wf-step-3);
  font-weight: 900;
  letter-spacing: -0.03em;
  margin-left: -0.03em;
}

.sheet {
  max-width: 44rem;
}

.group {
  padding-top: var(--wf-gap-m);
}

.group-title {
  margin: 0 0 var(--wf-gap-xs);
  color: inherit;
}

.links {
  margin: 0;
  padding: 0;
  list-style: none;
}

.links a {
  display: flex;
  align-items: center;
  gap: var(--wf-gap-s);
  /* Bigger than the standard tap target: this is read one-handed, in a hurry. */
  min-height: 64px;
  padding: var(--wf-gap-s) 0;
  border-bottom: 2px solid currentColor;
  color: inherit;
  text-decoration: none;
}

.link-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.link-label {
  font-size: var(--wf-step-1);
  overflow-wrap: anywhere;
}

.link-note {
  font-variation-settings: 'wdth' 100;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
  font-size: var(--wf-step--1);
  line-height: 1.4;
}

.link-arrow {
  font-size: var(--wf-step-2);
  line-height: 1;
}

.links a:active {
  opacity: 0.6;
}

.contact {
  padding-top: var(--wf-gap-l);
}

/* The billing block inherits the door's ink rather than the site's. */
.contact :deep(.plates-heading),
.contact :deep(.role) {
  color: inherit;
}

.contact :deep(.name) {
  color: inherit;
}

.contact :deep(.rail.is-shared) {
  border-top-color: currentColor;
}

.contact :deep(.links a) {
  min-height: 48px;
  border: 2px solid currentColor;
  color: inherit;
}

.contact :deep(.links a:hover),
.contact :deep(.links a:focus-visible) {
  background: var(--on-hall);
  color: var(--hall);
}

.home {
  margin: var(--wf-gap-xl) 0 0;
  font-variation-settings: 'wdth' 110;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.home a {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

:where(.door) a:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}
</style>
