import type { WithContext, Service } from 'schema-dts'
import { seoConfig } from '../seo.config'
import { createId, createUrl } from '../helpers/createUrl'
import { createImage } from '../helpers/createImage'
import type { ServiceInput } from '../types/service'

export function serviceSchema(service: ServiceInput): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: createUrl(service.url),
    image: createImage(service.image),
    provider: { '@id': createId('organization') } as any,
    areaServed: { '@type': 'City', name: 'Hyderabad' },
    serviceType: service.name,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      areaServed: 'Hyderabad, Telangana, India',
    },
  }
}

export function allServicesSchema(): WithContext<Service>[] {
  const services: ServiceInput[] = [
    { name: 'Full Home Interiors', description: 'Complete end-to-end home interior design and execution in Hyderabad. Living room, bedroom, kitchen, bathrooms — every room designed and built by our team. 3D visualisation to final handover.', url: '/services/full-home-interiors' },
    { name: 'Modular Kitchen Design', description: 'Custom modular kitchens designed and manufactured in our own Hyderabad factory. L-shaped, U-shaped, island kitchens — every cabinet and fitting precision-built to your exact measurements.', url: '/services/modular-kitchens' },
    { name: 'Wardrobe & Storage Solutions', description: 'Floor-to-ceiling wardrobes, walk-in closets, sliding wardrobes, and smart storage in Hyderabad. Every inch optimised for functionality and style.', url: '/services/wardrobes-storage' },
    { name: 'TV Units & Living Room Interiors', description: 'Custom entertainment walls, media consoles, and display units. Backlit panels, cable management, and modular options for modern living rooms.', url: '/services/tv-units-living' },
    { name: 'False Ceilings & Lighting Design', description: 'Architectural false ceilings with integrated lighting. Gypsum, POP, and wooden options with cove lighting, profile lighting, and ambient LED solutions in Hyderabad.', url: '/services/false-ceilings-lighting' },
    { name: 'Turnkey Interior Solutions', description: 'Complete turnkey interiors for homes and offices in Hyderabad. Civil, electrical, plumbing, painting, furniture — everything under one roof with a single point of contact.', url: '/services/turnkey-interiors' },
  ]
  return services.map(serviceSchema)
}
