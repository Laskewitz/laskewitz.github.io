<script setup lang="ts">
/**
 * BannerImage — the hanging banner.
 *
 * The only way photography is allowed to appear in this world: full-bleed,
 * behind a track-colour tint, never as a portrait in a card. A scrim is laid
 * under the content so cut lettering keeps its contrast over any frame of the
 * photograph — the substrate wins, the picture is the field it sits on.
 *
 * Never used on /r/ doors. The QR path does not wait on a photograph.
 */
import type { Track } from '../../data/types'

withDefaults(
  defineProps<{
    /** Base name under /images/stage/, without width suffix or extension. */
    src: string
    /** Required. Describes the photograph, not the page. */
    alt: string
    track?: Track
    /** How tall the banner stands. */
    height?: 'strip' | 'half' | 'full'
    /**
     * Where the crop is anchored, as a CSS object-position. Every photograph
     * puts the face somewhere different, and a strip crops away most of the
     * frame — so the subject is named per image rather than assumed.
     */
    focus?: string
    /**
     * The same anchor for a phone, where a wide frame is cropped to a third of
     * its width and the desktop anchor can leave the subject on the edge.
     * Defaults to `focus`, so only panoramas need to name it.
     */
    focusNarrow?: string
    /** Banners above the fold load eagerly; everything else waits. */
    priority?: boolean
  }>(),
  { height: 'half', priority: false, focus: 'center 26%' }
)
</script>

<template>
  <section
    class="banner"
    :class="`is-${height}`"
    :data-track="track"
    :style="{
      '--banner-focus': focus,
      '--banner-focus-narrow': focusNarrow ?? focus
    }"
  >
    <img
      class="banner-img"
      :src="`/images/stage/${src}-1600.jpg`"
      :srcset="`/images/stage/${src}-960.jpg 960w, /images/stage/${src}-1600.jpg 1600w, /images/stage/${src}-2400.jpg 2400w`"
      sizes="100vw"
      :alt="alt"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : undefined"
      decoding="async"
    />
    <span class="banner-tint" aria-hidden="true" />
    <span class="banner-scrim" aria-hidden="true" />

    <div class="banner-body wf-gutter">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.banner {
  position: relative;
  display: grid;
  isolation: isolate;
  background: var(--wf-photo-ink);
  overflow: hidden;
}

.is-strip {
  /* A band, not a track: enough to carry a face and the page's name, and no
     more. Capped in rem so a tall desktop doesn't turn it into a hero. */
  min-height: clamp(15rem, 34vh, 23rem);
}

.is-half {
  min-height: 52vh;
}

.is-full {
  min-height: calc(100vh - var(--vp-nav-height));
  min-height: calc(100dvh - var(--vp-nav-height));
}

/* The layers are taken out of flow so the photograph's intrinsic aspect ratio
   cannot dictate how tall the banner stands — the banner sizes to the page. */
.banner-img,
.banner-tint,
.banner-scrim {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.banner-img {
  object-fit: cover;
  object-position: var(--banner-focus);
  z-index: 0;
}

/* A phone crops a wide frame to a fraction of its width, so the anchor that
   frames the subject on a desktop can push them off the edge. The narrow
   anchor is carried as a variable on the banner rather than inline on the
   image, so this rule can win. */
@media (max-width: 47.999rem) {
  .banner-img {
    object-position: var(--banner-focus-narrow);
  }
}

/* The track colour is laid over the photograph, not next to it — the banner
   belongs to its track before it belongs to its subject. */
.banner-tint {
  z-index: 1;
  background: var(--track, var(--wf-track-a));
  mix-blend-mode: color;
  opacity: 0.55;
}

/* Guarantees the contrast floor for anything printed on the banner. The stops
   are fixed, not themed: in light mode a themed stop faded the photograph to
   white while the rest of the gradient stayed dark. */
.banner-scrim {
  z-index: 2;
  background: linear-gradient(
    to top,
    var(--wf-photo-ink) 0%,
    rgba(10, 10, 10, 0.94) 30%,
    rgba(10, 10, 10, 0.72) 62%,
    rgba(10, 10, 10, 0.5) 100%
  );
}

.banner-body {
  position: relative;
  grid-area: 1 / 1;
  z-index: 3;
  align-self: end;
  padding-top: var(--wf-gap-xl);
  padding-bottom: var(--wf-gap-l);
  color: var(--wf-photo-optic);
}

.banner-body:empty {
  display: none;
}

/* On a short screen the headroom above the name is the first thing to give —
   the photograph keeps its presence, the page keeps its footing. */
@media (max-height: 880px) {
  .banner-body {
    padding-top: var(--wf-gap-m);
    padding-bottom: var(--wf-gap-m);
  }
}

/* A strip is too short for a bottom-up scrim: darkening enough to carry the
   lettering would darken the whole photograph with it. So the strip's scrim
   runs across instead — heavy under the words on the left, clearing to the
   right where the subject is, which is what lets the face stay lit. */
@media (min-width: 48rem) {
  .is-strip .banner-scrim {
    background: linear-gradient(
      to right,
      rgba(10, 10, 10, 0.94) 0%,
      rgba(10, 10, 10, 0.86) 28%,
      rgba(10, 10, 10, 0.5) 62%,
      rgba(10, 10, 10, 0.26) 100%
    );
  }
}

/* Narrow enough that the lettering spans the full width, so the horizontal
   clearing would strand the end of a line over bare photograph. */
@media (max-width: 47.999rem) {
  .is-strip .banner-scrim {
    background: linear-gradient(
      to top,
      rgba(10, 10, 10, 0.94) 0%,
      rgba(10, 10, 10, 0.86) 45%,
      rgba(10, 10, 10, 0.6) 100%
    );
  }
}

@media (prefers-reduced-motion: reduce) {
  .banner-img {
    transition: none;
  }
}
</style>
