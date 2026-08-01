import type { WithContext, BreadcrumbList } from 'schema-dts'
import { seoConfig } from '../seo.config'
import { createUrl } from '../helpers/createUrl'

export interface BreadcrumbItem {
  name: string
  href: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: seoConfig.website,
      },
      ...items.map((item, i) => ({
        '@type': 'ListItem' as const,
        position: i + 2,
        name: item.name,
        item: createUrl(item.href),
      })),
    ],
  }
}
