import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import JsonLd from '@/components/JsonLd'
import { organizationSchema, websiteSchema } from '@/lib/seo'

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
        {/* Global structured data — present on every page */}
        <JsonLd schemas={[
          organizationSchema(),
          websiteSchema(),
        ]} />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KC6JXWMN" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} /></noscript>
        {children}
        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KC6JXWMN');` }}
        />
      </body>
    </html>
  )
}
