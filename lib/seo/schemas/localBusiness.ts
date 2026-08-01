import type { WithContext, LocalBusiness } from 'schema-dts'
import { seoConfig } from '../seo.config'
import { createAddress } from '../helpers/createAddress'
import { createId, createUrl } from '../helpers/createUrl'

export function localBusinessSchema(): WithContext<LocalBusiness> {
  const s = seoConfig
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': createId('localbusiness'),
    name: s.companyName,
    description: s.description,
    url: createUrl(),
    telephone: s.phone,
    email: s.email,
    logo: s.logo,
    image: s.ogImage,
    priceRange: s.priceRange,
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Bank Transfer, UPI',
    address: createAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: s.geo.latitude,
      longitude: s.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Hyderabad' },
      { '@type': 'AdministrativeArea', name: 'Telangana' },
    ],
    hasMap: `https://www.google.com/maps/search/?api=1&query=${s.geo.latitude},${s.geo.longitude}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: Object.values(s.socialLinks).filter(Boolean) as string[],
    parentOrganization: { '@id': createId('organization') } as any,
  }
}
