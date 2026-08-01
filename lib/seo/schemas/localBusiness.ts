import { seoConfig } from '../seo.config'

export function localBusinessSchema() {
  const s = seoConfig
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'InteriorDesigner'],
    '@id': `${s.website}/#localbusiness`,
    name: s.companyName,
    description: s.description,
    url: s.website,
    telephone: s.phone,
    email: s.email,
    logo: s.logo,
    image: s.ogImage,
    priceRange: s.priceRange,
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Bank Transfer, UPI',
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.address.street,
      addressLocality: s.address.city,
      addressRegion: s.address.state,
      postalCode: s.address.postalCode,
      addressCountry: s.address.country,
    },
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
      { '@type': 'State', name: 'Telangana' },
    ],
    hasMap: `https://www.google.com/maps/search/?api=1&query=${s.geo.latitude},${s.geo.longitude}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: Object.values(s.socialLinks).filter(Boolean),
    parentOrganization: {
      '@id': `${s.website}/#organization`,
    },
  }
}
