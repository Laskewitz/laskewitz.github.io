import { createContentLoader } from 'vitepress'

export interface Post {
  url: string
  title: string
  description: string
  date: string
  tags: string[]
  excerpt: string
}

declare const data: Post[]
export { data }

export default createContentLoader('blog/posts/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        url,
        title: frontmatter.title ?? 'Untitled',
        description: frontmatter.description ?? '',
        date: frontmatter.date
          ? new Date(frontmatter.date).toISOString()
          : new Date(0).toISOString(),
        tags: frontmatter.tags ?? [],
        excerpt: excerpt ?? ''
      }))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  }
})
