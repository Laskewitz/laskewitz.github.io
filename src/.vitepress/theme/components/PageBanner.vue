<script setup lang="ts">
/**
 * PageBanner — the sign over a track entrance.
 *
 * The listing pages (events, talks, blogs) each lead with a band of
 * photography carrying the page's name cut across it, the way the home page
 * carries mine. Short on purpose: it names the track and gets out of the way,
 * so the first row of content is still near the top of the screen.
 */
import BannerImage from './BannerImage.vue'
import type { Track } from '../../data/types'

defineProps<{
  title: string
  src: string
  alt: string
  track: Track
  /** Passed through to BannerImage — every photograph frames the face differently. */
  focus?: string
  /** The same anchor for a phone, where the crop turns horizontal. */
  focusNarrow?: string
}>()
</script>

<template>
  <BannerImage
    :src="src"
    :alt="alt"
    :track="track"
    :focus="focus"
    :focus-narrow="focusNarrow"
    height="strip"
    priority
  >
    <h1 class="banner-title wf-sign">{{ title }}</h1>
    <p v-if="$slots.default" class="banner-standfirst"><slot /></p>
  </BannerImage>
</template>

<style scoped>
.banner-title {
  margin: 0;
  font-size: var(--wf-step-4);
  font-weight: 900;
  letter-spacing: -0.03em;
  /* Optical alignment: the glyph's side bearing is pulled back so the letter,
     not its box, lines up with the gutter. */
  margin-left: -0.035em;
  line-height: 0.95;
}

.banner-standfirst {
  max-width: 46ch;
  margin: var(--wf-gap-s) 0 0;
  font-variation-settings: 'wdth' 100;
  font-size: var(--wf-step-0);
  line-height: 1.5;
  /* On a photograph the text field is the scrim, so the on-photo token is the
     only correct colour here. Never --wf-optic. */
  color: var(--wf-photo-optic);
}
</style>
