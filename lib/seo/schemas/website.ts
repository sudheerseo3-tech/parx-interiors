import type { WithContext, WebSite } from 'schema-dts'
import { seoConfig } from '../seo.config'
import { createId, createUrl } from '../helpers/createUrl'

export function websiteSchema(): WithContext<WebSite> {
  const s = seoConfig
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': createId('website'),
    name: s.companyName,
    url: createUrl(),
    description: s.description,
    publisher: { '@id': createId('organization') } as any,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: createUrl('/projects?q={search_term_string}'),
      },
      'query-input': 'required name=search_term_string',
    } as any,
    inLanguage: 'en-IN',
  }
}
