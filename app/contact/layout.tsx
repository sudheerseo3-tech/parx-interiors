import JsonLd from '@/components/JsonLd'
import { localBusinessSchema, breadcrumbSchema } from '@/lib/seo'

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
