import { seoConfig } from '../seo.config'

export function websiteSchema() {
  const s = seoConfig
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${s.website}/#website`,
    name: s.companyName,
    url: s.website,
    description: s.description,
    publisher: {
      '@id': `${s.website}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${s.website}/projects?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-IN',
  }
}
