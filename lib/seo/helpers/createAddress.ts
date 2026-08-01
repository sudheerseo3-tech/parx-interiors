import type { PostalAddress } from 'schema-dts'
import { seoConfig } from '../seo.config'

export function createAddress(): PostalAddress {
  const a = seoConfig.address
  return {
    '@type': 'PostalAddress',
    streetAddress: a.street,
    addressLocality: a.city,
    addressRegion: a.state,
    postalCode: a.postalCode,
    addressCountry: a.country,
  }
}
