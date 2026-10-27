import { COMPANY } from '@/lib/site'

export default function robots() {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${COMPANY.url}/sitemap.xml` }
}
