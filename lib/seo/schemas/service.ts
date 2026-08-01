import { seoConfig } from '../seo.config'

export interface ServiceInput {
  name: string
  description: string
  url: string
  image?: string
}

export function serviceSchema(service: ServiceInput) {
  const s = seoConfig
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: `${s.website}${service.url}`,
    image: service.image || s.ogImage,
    provider: {
      '@id': `${s.website}/#organization`,
    },
    areaServed: {
      '@type': 'City',
      name: 'Hyderabad',
    },
    serviceType: service.name,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      areaServed: 'Hyderabad, Telangana, India',
    },
  }
}

// Pre-built schemas for all Parx services
export function allServicesSchema() {
  const services: ServiceInput[] = [
    {
      name: 'Full Home Interiors',
      description: 'Complete end-to-end home interior design and execution. Living room, bedroom, kitchen, bathrooms — every room designed and built by our team. From 3D visualisation to final handover.',
      url: '/services/full-home-interiors',
    },
    {
      name: 'Modular Kitchen Design',
      description: 'Custom modular kitchens designed and manufactured in our own factory. L-shaped, U-shaped, island kitchens — every cabinet and fitting precision-built to your exact measurements.',
      url: '/services/modular-kitchens',
    },
    {
      name: 'Wardrobe & Storage Solutions',
      description: 'Floor-to-ceiling wardrobes, walk-in closets, sliding wardrobes, and smart storage. Every inch optimised for functionality and style.',
      url: '/services/wardrobes-storage',
    },
    {
      name: 'TV Units & Living Room Interiors',
      description: 'Custom entertainment walls, media consoles, and display units. Backlit panels, cable management, and modular options designed for modern living rooms.',
      url: '/services/tv-units-living',
    },
    {
      name: 'False Ceilings & Lighting',
      description: 'Architectural false ceilings with integrated lighting. Gypsum, POP, and wooden options with cove lighting, profile lighting, and ambient LED solutions.',
      url: '/services/false-ceilings-lighting',
    },
    {
      name: 'Turnkey Interior Solutions',
      description: 'Complete turnkey interiors for homes and offices. Civil, electrical, plumbing, painting, furniture — everything under one roof with a single point of contact.',
      url: '/services/turnkey-interiors',
    },
  ]
  return services.map(serviceSchema)
}
