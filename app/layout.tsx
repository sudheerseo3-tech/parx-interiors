import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    default: 'Parx Interiors — Premium Interior Design, Hyderabad',
    template: '%s | Parx Interiors Hyderabad',
  },
  description: 'Parx Interiors — End-to-end interior design studio in Hyderabad. Residential & commercial interiors, modular kitchens, wardrobes. In-house manufacturing. Free consultation.',
  keywords: ['interior designer Hyderabad', 'modular kitchen Hyderabad', 'home interior design Hyderabad', 'office interior Hyderabad', 'Parx Interiors'],
  authors: [{ name: 'Parx Interiors' }],
  creator: 'Parx Interiors',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.parxinteriors.in',
    siteName: 'Parx Interiors',
    title: 'Parx Interiors — Premium Interior Design, Hyderabad',
    description: 'End-to-end interior design with in-house manufacturing. Residential & commercial. Hyderabad.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Parx Interiors Hyderabad' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parx Interiors — Premium Interior Design, Hyderabad',
    description: 'End-to-end interior design with in-house manufacturing. Hyderabad.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.parxinteriors.in' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Local Business Schema for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'InteriorDesigner',
              name: 'Parx Interiors',
              image: 'https://www.parxinteriors.in/logo.png',
              url: 'https://www.parxinteriors.in',
              telephone: '[FILL: phone number]',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '[FILL: street address]',
                addressLocality: 'Hyderabad',
                addressRegion: 'Telangana',
                postalCode: '[FILL: pincode]',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '[FILL]',
                longitude: '[FILL]',
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
                opens: '09:00',
                closes: '19:00',
              },
              priceRange: '₹₹₹',
              servesCuisine: '',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5',
                reviewCount: '1',
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
