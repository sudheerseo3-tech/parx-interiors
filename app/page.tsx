import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { localBusinessSchema, breadcrumbSchema } from '@/lib/seo'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'Interior Designers in Hyderabad | Parx Interiors',
  description: 'Looking for premium interior designers in Hyderabad? Parx Interiors creates customized home interiors, modular kitchens and turnkey design solutions. Book a free consultation.',
  alternates: { canonical: 'https://www.parxinteriors.com' },
  openGraph: {
    title: 'Interior Designers in Hyderabad | Parx Interiors',
    description: 'Looking for premium interior designers in Hyderabad? Parx Interiors creates customized home interiors, modular kitchens and turnkey design solutions. Book a free consultation.',
    url: 'https://www.parxinteriors.com',
    images: [{ url: 'https://www.parxinteriors.com/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd schemas={[
        localBusinessSchema(),
        breadcrumbSchema([]),
      ]} />
      <HomeClient />
    </>
  )
}
