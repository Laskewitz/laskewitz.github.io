<script setup lang="ts">
/**
 * BannerImage — the hanging banner.
 *
 * The only way photography is allowed to appear in this world: full-bleed,
 * behind a hall-colour tint, never as a portrait in a card. A scrim is laid
 * under the content so cut lettering keeps its contrast over any frame of the
 * photograph — the substrate wins, the picture is the field it sits on.
 *
 * Never used on /r/ doors. The QR path does not wait on a photograph.
 */
import type { Hall } from '../../data/types'

withDefaults(
  defineProps<{
    /** Base name under /images/stage/, without width suffix or extension. */
    src: string
    /** Required. Describes the photograph, not the page. */
    alt: string
    hall?: Hall
    /** How tall the banner stands. */
    height?: 'strip' | 'half' | 'full'
    /** Banners above the fold load eagerly; everything else waits. */
    priority?: boolean
  }>(),
  { height: 'half', priority: false }
)
</script>

<template>
  <section class="banner" :class="`is-${height}`" :data-hall="hall">
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
  background: var(--wf-ink);
  overflow: hidden;
}

.is-strip {
  min-height: 34vh;
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
  object-position: center 80%;
  z-index: 0;
}

/* The hall colour is laid over the photograph, not next to it — the banner
   belongs to its hall before it belongs to its subject. */
.banner-tint {
  z-index: 1;
  background: var(--hall, var(--wf-hall-a));
  mix-blend-mode: color;
  opacity: 0.55;
}

/* Guarantees the contrast floor for anything printed on the banner. */
.banner-scrim {
  z-index: 2;
  background: linear-gradient(
    to top,
    var(--wf-ink) 0%,
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
  color: var(--wf-optic);
}

.banner-body:empty {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  .banner-img {
    transition: none;
  }
}
</style>
