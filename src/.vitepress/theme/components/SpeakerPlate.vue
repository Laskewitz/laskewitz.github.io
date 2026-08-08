<script setup lang="ts">
/**
 * SpeakerPlate — the converging-pair billing.
 *
 * Two speaker plates on one baseline that read as a single session block. This
 * is the one place the converging-pair staging is literally true: a shared
 * session really is two people arriving at one stage.
 *
 * The plates are fed from the speaker registry, so a co-speaker is credited
 * everywhere from one entry — including on a resource page whose ?with= list
 * changes per delivery, without the page being edited.
 */
import type { Hall, Speaker } from '../../data/types'

withDefaults(
  defineProps<{
    speakers: Speaker[]
    hall?: Hall
    /** Contact links belong on resource pages, not on a talk placard. */
    withLinks?: boolean
    heading?: string
  }>(),
  { withLinks: false }
)
</script>

<template>
  <section class="plates" :data-hall="hall">
    <p v-if="heading" class="wf-label plates-heading">{{ heading }}</p>

    <div class="rail" :class="{ 'is-shared': speakers.length > 1 }">
      <article v-for="speaker in speakers" :key="speaker.slug" class="plate">
        <h3 class="name wf-sign">{{ speaker.name }}</h3>

        <p v-if="speaker.role" class="role">
          {{ speaker.role }}<span v-if="speaker.company"> · {{ speaker.company }}</span>
        </p>

        <ul v-if="withLinks && speaker.links.length" class="links">
          <li v-for="link in speaker.links" :key="link.href">
            <a :href="link.href" target="_blank" rel="noreferrer">{{ link.label }}</a>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
.plates-heading {
  margin: 0 0 var(--wf-gap-s);
}

.rail {
  display: grid;
  gap: var(--wf-gap-s);
  grid-template-columns: 1fr;
}

/* The shared baseline: two plates sitting on one rule, converging into one
   billed block. */
.rail.is-shared {
  border-top: 3px solid var(--hall, var(--wf-optic));
}

.rail.is-shared .plate {
  padding-top: var(--wf-gap-s);
}

@media (min-width: 700px) {
  .rail.is-shared {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: var(--wf-gap-m);
  }
}

.plate {
  min-width: 0;
}

/* Not every speaker has a role line, so left to itself the second plate pulls
   its contact buttons up and the pair stops reading as one billing. Subgrid
   puts name, role and links on shared rows, so the buttons land on one line
   whatever each plate happens to carry. */
.rail.is-shared {
  grid-template-rows: auto auto auto;
}

.rail.is-shared .plate {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
}

.rail.is-shared .name {
  grid-row: 1;
}

.rail.is-shared .role {
  grid-row: 2;
}

.rail.is-shared .links {
  grid-row: 3;
  align-content: start;
}

.name {
  margin: 0;
  font-size: var(--wf-step-1);
  color: var(--wf-optic);
}

.role {
  margin: 0.35rem 0 0;
  font-size: var(--wf-step--1);
  line-height: 1.45;
  color: var(--wf-optic-dim);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--wf-gap-xs);
  margin: var(--wf-gap-s) 0 0;
  padding: 0;
  list-style: none;
}

.links a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 var(--wf-gap-s);
  border: 1px solid var(--wf-ink-rule);
  color: var(--wf-optic);
  font-variation-settings: 'wdth' 110;
  font-weight: 700;
  font-size: var(--wf-step--1);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background var(--wf-motion) var(--wf-ease);
}

.links a:hover,
.links a:focus-visible {
  background: var(--wf-optic);
  color: var(--wf-ink);
}
</style>
