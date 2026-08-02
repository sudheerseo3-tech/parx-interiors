import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { localBusinessSchema, breadcrumbSchema } from '@/lib/seo'
import HomeClient from './HomeClient'

const PROJECT_ID = 'dx9xg01d'
const DATASET = 'production'

async function getLogoUrl(): Promise<string | undefined> {
  try {
    const query = encodeURIComponent('*[_type == "siteSettings"][0]{ logo }')
    const res = await fetch(
      `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`,
      { next: { revalidate: 3600 } }
    )
    const data = await res.json()
    const logo = data.result?.logo
    if (!logo?.asset?._ref) return undefined
    const [, id, dimensions, format] = logo.asset._ref.split('-')
    return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}?w=400&auto=format`
  } catch {
    return undefined
  }
}

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

export default async function HomePage() {
  const logoUrl = await getLogoUrl()
  return (
    <>
      <JsonLd schemas={[
        localBusinessSchema(),
        breadcrumbSchema([]),
      ]} />
      <HomeClient logoUrl={logoUrl} />
    </>
  )
}
