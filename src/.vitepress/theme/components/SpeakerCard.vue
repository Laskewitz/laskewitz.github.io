<script setup lang="ts">
/**
 * SpeakerCard — the converging-pair billing.
 *
 * Two speaker plates on one baseline that read as a single session block. This
 * is the one place the converging-pair staging is literally true: a shared
 * session really is two people arriving at one stage.
 *
 * The plates are fed from the speaker registry, so a co-speaker is credited
 * everywhere from one entry — including on a resource page whose ?with= list
 * changes per delivery, without the page being edited.
 */
import type { Track, Speaker } from '../../data/types'
import SocialIcon from './SocialIcon.vue'

/** Initials stand in when a speaker has no portrait, so the rail never gaps. */
function monogram(name: string): string {
  return name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

withDefaults(
  defineProps<{
    speakers: Speaker[]
    track?: Track
    /** Contact links belong on resource pages, not on a talk placard. */
    withLinks?: boolean
    heading?: string
  }>(),
  { withLinks: false }
)
</script>

<template>
  <section class="plates" :data-track="track">
    <h2 v-if="heading" class="wf-label plates-heading">{{ heading }}</h2>

    <div class="rail" :class="{ 'is-shared': speakers.length > 1 }">
      <article v-for="speaker in speakers" :key="speaker.slug" class="plate">
        <img
          v-if="speaker.photo"
          class="portrait"
          :src="speaker.photo"
          :srcset="
            speaker.photo2x
              ? `${speaker.photo} 1x, ${speaker.photo2x} 2x`
              : undefined
          "
          :alt="speaker.name"
          width="256"
          height="256"
          loading="lazy"
          decoding="async"
        />
        <span v-else class="portrait is-monogram" aria-hidden="true">
          {{ monogram(speaker.name) }}
        </span>

        <h3 class="name wf-sign">{{ speaker.name }}</h3>

        <p v-if="speaker.role" class="role">
          {{ speaker.role }}<span v-if="speaker.company"> · {{ speaker.company }}</span>
        </p>

        <ul v-if="withLinks && speaker.links.length" class="links">
          <li v-for="link in speaker.links" :key="link.href">
            <a
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${speaker.name} on ${link.label}`"
              :title="link.label"
            >
              <SocialIcon :label="link.label" />
            </a>
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
  border-top: 3px solid var(--track, var(--wf-optic));
}

.rail.is-shared .plate {
  padding-top: var(--wf-gap-s);
}

@media (min-width: 700px) {
  .rail.is-shared {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    grid-template-rows: auto auto auto;
    column-gap: var(--wf-gap-m);
    row-gap: 0;
  }

  /* Not every speaker carries a role line. Left alone the shorter plate pulls
     its pictograms up and the pair stops reading as one billing, so the two
     plates share rows. */
  .rail.is-shared .plate {
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
}


/* The portrait carries the block height and the name, role and pictograms
   stack beside it, so a billing is one band rather than three stacked rows.
   A resource page is read on a phone at a conference, where every row the
   audience has to scroll past is a row they might not reach. */
.plate {
  /* Square, and tall enough to run the full height of the name, the role and
     the pictogram row beside it. A portrait shorter than its own text reads as
     a thumbnail that was dropped in rather than part of the billing. */
  --portrait: 112px;
  min-height: var(--portrait);
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-rows: auto auto auto;
  align-content: start;
  column-gap: var(--wf-gap-s);
}

.portrait {
  grid-column: 1;
  grid-row: 1 / -1;
  align-self: start;
  width: var(--portrait);
  height: var(--portrait);
  object-fit: cover;
  border: 1px solid var(--wf-ink-rule);
  background: var(--track, var(--wf-ink-rule));
}

.name,
.role,
.links {
  grid-column: 2;
}

.portrait.is-monogram {
  display: grid;
  place-items: center;
  font-variation-settings: 'wdth' 110;
  font-weight: 800;
  font-size: var(--wf-step-1);
  letter-spacing: 0.02em;
  color: var(--wf-ink);
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
  gap: 0.3rem;
  margin: 0.55rem 0 0;
  padding: 0;
  list-style: none;
}

.links a {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--wf-ink-rule);
  color: var(--wf-optic);
  text-decoration: none;
  transition:
    background var(--wf-motion) var(--wf-ease),
    color var(--wf-motion) var(--wf-ease);
}

.links a:hover,
.links a:focus-visible {
  background: var(--wf-optic);
  color: var(--wf-ink);
}
</style>
