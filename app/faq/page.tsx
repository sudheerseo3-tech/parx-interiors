'use client'
import { useState, useEffect } from 'react'
import NavServer from '@/components/NavServer'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import PageHero from '@/components/PageHero'

const fallbackFaqs = [
  { question: 'How much does interior design cost in Hyderabad?', answer: 'It depends on the scope, BHK size, and material quality. A 2BHK typically ranges from ₹3-8 lakhs, a 3BHK from ₹5-15 lakhs. Use our Cost Calculator for an instant estimate, or contact us for a detailed quote.', category: 'Pricing' },
  { question: 'Do you offer EMI or payment plans?', answer: 'Yes, we offer flexible payment milestones — typically 10% at booking, 50% at manufacturing start, and 40% at installation. We can also help connect you with financing partners.', category: 'Pricing' },
  { question: 'How long does a full home interior project take?', answer: 'Typically 45-60 days from design approval. Modular kitchens and wardrobes alone can be delivered in 25-35 days since they are factory-manufactured.', category: 'Timeline' },
  { question: 'Do you have your own factory?', answer: 'Yes! We own and operate our own manufacturing facility. Every modular unit — kitchens, wardrobes, TV units — is built in our factory, not outsourced to carpenters.', category: 'General' },
  { question: 'What materials do you use?', answer: 'We use BWP/BWR grade plywood, HDHMR boards, and marine plywood depending on your budget. Hardware is from Hettich/Hafele. Countertops include granite, quartz, and Corian options.', category: 'Materials' },
  { question: 'What is your warranty?', answer: 'We provide a 5-year comprehensive workmanship warranty on all modular furniture. Hardware comes with the manufacturer\'s warranty (typically 10+ years for Hettich/Hafele).', category: 'Warranty' },
  { question: 'Do you handle civil work (painting, electrical, plumbing)?', answer: 'Yes, for full home interior projects we handle everything — civil work, electrical, plumbing, painting, woodwork, and furnishing. One team, one contact, one timeline.', category: 'Process' },
  { question: 'Can I see a 3D design before you start?', answer: 'Absolutely. Every project starts with a detailed 3D visualisation so you can see exactly how your space will look before we begin manufacturing or site work.', category: 'Process' },
  { question: 'Which areas in Hyderabad do you serve?', answer: 'We serve all of Hyderabad — Kondapur, Gachibowli, Hitech City, Jubilee Hills, Banjara Hills, Manikonda, Kukatpally, Miyapur, and surrounding areas.', category: 'General' },
  { question: 'Can I visit your factory?', answer: 'Yes, we encourage it! Seeing our factory helps you understand the quality and precision we bring to every project. Call us at +91 91778 22018 to schedule a visit.', category: 'General' },
  { question: 'How is Parx Interiors different from other interior designers?', answer: 'Three key differences: (1) We own our factory — no outsourcing, (2) Fixed pricing — what we quote is what you pay, and (3) Single point of contact from design to handover.', category: 'General' },
  { question: 'Do you provide after-sales service?', answer: 'Yes. Our warranty covers any manufacturing defects. Beyond warranty, we offer maintenance services at nominal charges. We\'re always just a WhatsApp message away.', category: 'Warranty' },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-parx-border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-start justify-between py-6 text-left group">
        <span className="font-display text-lg text-parx-black font-light pr-8 group-hover:text-parx-red transition-colors">{q}</span>
        <span className={`text-parx-red text-xl transition-transform duration-300 flex-shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="pb-6 pr-12">
          <p className="text-parx-gray text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState(fallbackFaqs)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetch(`https://dx9xg01d.api.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent('*[_type == "faq"] | order(order asc) { question, answer, category }')}`)
      .then(r => r.json())
      .then(d => {
        if (d.result && d.result.length > 0) {
          setFaqs(d.result)
        }
      })
      .catch(() => {})
  }, [])

  const cats = ['All', ...Array.from(new Set(faqs.map(f => f.category).filter(Boolean)))]
  const filtered = filter === 'All' ? faqs : faqs.filter(f => f.category === filter)

  return (
    <>
      <NavServer />
      <main>
        <PageHero
          eyebrow="Frequently Asked Questions"
          title={<>Got questions?<br /><em className="italic text-parx-red">We&apos;ve got answers.</em></>}
          subtitle="Everything you need to know about working with Parx Interiors — pricing, process, materials, timelines, and more."
        />

        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-6">
            <div className="flex flex-wrap gap-3 mb-10">
              {cats.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`px-4 py-2 text-sm tracking-wide transition-all duration-200 ${filter === cat ? 'bg-parx-red text-white' : 'border border-parx-border text-parx-gray hover:border-parx-black hover:text-parx-black'}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div>{filtered.map(f => <FAQItem key={f.question} q={f.question} a={f.answer} />)}</div>
          </div>
        </section>

        <section className="bg-parx-cream py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-parx-black text-2xl mb-4">Still have questions?</h2>
            <p className="text-parx-gray text-sm mb-6">We&apos;re happy to help. Reach out on WhatsApp and we&apos;ll respond within minutes.</p>
            <a href="https://wa.me/919177822018?text=Hi%20Parx%20Interiors%2C%20I%20have%20a%20question"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-parx-red hover:bg-parx-red-dark text-white px-8 py-4 text-sm tracking-[0.15em] uppercase transition-all duration-300">
              Ask on WhatsApp →
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
