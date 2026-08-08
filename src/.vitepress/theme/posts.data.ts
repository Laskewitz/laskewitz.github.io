import { createContentLoader } from 'vitepress'
import { sortCategories, type Post } from '../data/posts'

declare const data: Post[]
export { data }

export default createContentLoader('blog/posts/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter, excerpt }) => {
        const date = frontmatter.date
          ? new Date(frontmatter.date).toISOString()
          : new Date(0).toISOString()

        return {
          url,
          title: frontmatter.title ?? 'Untitled',
          description: frontmatter.description ?? '',
          date,
          year: date.slice(0, 4),
          categories: sortCategories(frontmatter.categories ?? []),
          excerpt: excerpt ?? ''
        }
      })
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  }
})
