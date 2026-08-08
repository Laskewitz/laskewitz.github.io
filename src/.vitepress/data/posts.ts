/**
 * Post shape and category rules.
 *
 * These live outside `posts.data.ts` on purpose: VitePress rewrites a `.data.ts`
 * module on the client so it exports only `data`, which means anything else
 * declared there is unimportable from a component.
 */

export interface Post {
  url: string
  title: string
  description: string
  date: string
  year: string
  categories: string[]
  excerpt: string
}

/**
 * Categories are a small closed set, not free tags: they name the beats this
 * blog actually covers. Fixing their order here keeps the filter row from
 * reshuffling every time a post is added. A category a post declares that isn't
 * listed still works — it sorts alphabetically after these, which is the signal
 * to either add it here or rename it.
 */
export const CATEGORY_ORDER = ['Copilot Cowork', 'Plugins', 'MCP']

export function sortCategories(list: string[]): string[] {
  return [...list].sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a)
    const ib = CATEGORY_ORDER.indexOf(b)
    if (ia !== -1 && ib !== -1) return ia - ib
    if (ia !== -1) return -1
    if (ib !== -1) return 1
    return a.localeCompare(b)
  })
}
