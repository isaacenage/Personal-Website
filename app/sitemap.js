import { getAllPosts } from '@/lib/blog'
import { COMPANY } from '@/lib/site'

const PAGES = ['', 'services', 'work', 'pricing', 'about', 'insights', 'contact', 'privacy', 'terms']

export default function sitemap() {
  return [
    ...PAGES.map((p) => ({ url: `${COMPANY.url}/${p ? `${p}/` : ''}` })),
    ...getAllPosts().map((post) => ({
      url: `${COMPANY.url}/insights/${post.slug}/`,
      lastModified: post.date,
    })),
  ]
}
