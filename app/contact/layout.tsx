import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { localBusinessSchema, breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Contact Parx Interiors | Interior Designers Hyderabad',
  description: 'Contact Parx Interiors to discuss your home interior project in Hyderabad. Book a free consultation for customized interior design solutions.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schemas={[
        localBusinessSchema(),
        breadcrumbSchema([{ name: 'Contact', href: '/contact' }]),
      ]} />
      {children}
    </>
  )
}
