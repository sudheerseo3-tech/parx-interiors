import { seoConfig } from '../seo.config'

export function organizationSchema() {
  const s = seoConfig
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${s.website}/#organization`,
    name: s.companyName,
    legalName: s.legalName,
    url: s.website,
    logo: {
      '@type': 'ImageObject',
      url: s.logo,
      width: 512,
      height: 512,
    },
    image: s.ogImage,
    description: s.description,
    telephone: s.phone,
    email: s.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.address.street,
      addressLocality: s.address.city,
      addressRegion: s.address.state,
      postalCode: s.address.postalCode,
      addressCountry: s.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: s.phone,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Telugu', 'Hindi'],
    },
    sameAs: Object.values(s.socialLinks).filter(Boolean),
  }
}
