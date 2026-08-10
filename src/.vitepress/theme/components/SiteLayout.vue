<script setup lang="ts">
/**
 * The venue's layout. Blog posts are the one markdown surface that gets
 * furniture: a masthead carrying the title, date and categories, and a sign-off
 * carrying the way back. Both hang off the default theme's doc slots, which is
 * what lets a post's markdown stay pure prose and never repeat its own H1.
 */
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import BlogPostHeader from './BlogPostHeader.vue'
import BlogPostFooter from './BlogPostFooter.vue'

const { frontmatter } = useData()

const isPost = computed(() => frontmatter.value.pageClass === 'wf-post')
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <BlogPostHeader v-if="isPost" />
    </template>

    <template #doc-after>
      <BlogPostFooter v-if="isPost" />
    </template>
  </DefaultTheme.Layout>
</template>
