import { getAllPosts } from '@/lib/blog'
import { COMPANY, SECTIONS } from '@/lib/site'

const PAGES = [...SECTIONS.flatMap((s) => s.pages.map((p) => p.href)), '/privacy', '/terms']

export default function sitemap() {
  return [
    ...PAGES.map((p) => ({ url: `${COMPANY.url}${p === '/' ? '/' : `${p}/`}` })),
    ...getAllPosts().map((post) => ({
      url: `${COMPANY.url}/insights/${post.slug}/`,
      lastModified: post.date,
    })),
  ]
}
