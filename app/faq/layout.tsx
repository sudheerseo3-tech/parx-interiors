import JsonLd from '@/components/JsonLd'
import { faqSchema, breadcrumbSchema } from '@/lib/seo'

const faqItems = [
  { question: 'How much does interior design cost in Hyderabad?', answer: 'It depends on the scope, BHK size, and material quality. A 2BHK typically ranges from ₹3-8 lakhs, a 3BHK from ₹5-15 lakhs. Use our Cost Calculator for an instant estimate, or contact us for a detailed quote.' },
  { question: 'Do you offer EMI or payment plans?', answer: 'Yes, we offer flexible payment milestones — typically 10% at booking, 50% at manufacturing start, and 40% at installation.' },
  { question: 'How long does a full home interior project take?', answer: 'Typically 45-60 days from design approval. Modular kitchens and wardrobes alone can be delivered in 25-35 days since they are factory-manufactured.' },
  { question: 'Do you have your own factory?', answer: 'Yes! We own and operate our own manufacturing facility in Hyderabad. Every modular unit — kitchens, wardrobes, TV units — is built in our factory, not outsourced.' },
  { question: 'What materials do you use?', answer: 'We use BWP/BWR grade plywood, HDHMR boards, and marine plywood. Hardware is from Hettich/Hafele. Countertops include granite, quartz, and Corian options.' },
  { question: 'What is your warranty?', answer: 'We provide a 5-year comprehensive workmanship warranty on all modular furniture. Hardware comes with the manufacturer warranty (typically 10+ years for Hettich/Hafele).' },
  { question: 'Do you handle civil work, painting, electrical, and plumbing?', answer: 'Yes, for full home interior projects we handle everything — civil work, electrical, plumbing, painting, woodwork, and furnishing. One team, one contact, one timeline.' },
  { question: 'Can I see a 3D design before you start?', answer: 'Absolutely. Every project starts with a detailed 3D visualisation so you can see exactly how your space will look before we begin manufacturing or site work.' },
  { question: 'Which areas in Hyderabad do you serve?', answer: 'We serve all of Hyderabad — Kondapur, Gachibowli, Hitech City, Jubilee Hills, Banjara Hills, Manikonda, Kukatpally, Miyapur, and surrounding areas.' },
  { question: 'How is Parx Interiors different from other interior designers?', answer: 'Three key differences: (1) We own our factory — no outsourcing, (2) Fixed pricing — what we quote is what you pay, and (3) Single point of contact from design to handover.' },
]

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schemas={[
        faqSchema(faqItems),
        breadcrumbSchema([{ name: 'FAQ', href: '/faq' }]),
      ]} />
      {children}
    </>
  )
}
