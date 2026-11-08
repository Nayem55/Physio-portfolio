import type { MetadataRoute } from 'next'

import { getAllPostSlugs } from '@/lib/cms'
import { navItems, siteUrl } from '@/lib/site'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostSlugs()
  return [
    ...navItems.map((item) => ({ url: `${siteUrl}${item.href === '/' ? '' : item.href}` })),
    ...posts.map((p) => ({ url: `${siteUrl}/blog/${p.slug}`, lastModified: p.updatedAt })),
  ]
}
