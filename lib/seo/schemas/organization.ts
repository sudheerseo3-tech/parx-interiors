import type { WithContext, Organization } from 'schema-dts'
import { seoConfig } from '../seo.config'
import { createAddress } from '../helpers/createAddress'
import { createId, createUrl } from '../helpers/createUrl'

export function organizationSchema(): WithContext<Organization> {
  const s = seoConfig
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': createId('organization'),
    name: s.companyName,
    legalName: s.legalName,
    url: createUrl(),
    logo: {
      '@type': 'ImageObject',
      url: s.logo,
      width: '512',
      height: '512',
    },
    image: s.ogImage,
    description: s.description,
    telephone: s.phone,
    email: s.email,
    address: createAddress(),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: s.phone,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Telugu', 'Hindi'],
    },
    sameAs: Object.values(s.socialLinks).filter(Boolean) as string[],
  }
}
