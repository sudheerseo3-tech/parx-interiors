import NavServer from '@/components/NavServer'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import PageHero from '@/components/PageHero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Process',
  description: 'How Parx Interiors works — from free consultation to handover. Transparent 6-step process with fixed pricing and 5-year warranty.',
}

const steps = [
  { n: '01', title: 'Free Consultation', duration: 'Day 1', desc: 'We start with a conversation — either at your site or at our studio. We understand your vision, lifestyle, requirements, and budget. No commitments, no pressure.', details: ['Site visit or studio meeting', 'Understand your lifestyle & needs', 'Initial space assessment', 'Budget discussion & expectations'] },
  { n: '02', title: '3D Design & Quote', duration: 'Days 3-7', desc: 'Our design team creates detailed 3D visualisations of every room. You see exactly how your space will look. Alongside, we provide an itemised quotation — no hidden costs.', details: ['Room-by-room 3D renders', 'Material options & comparisons', 'Itemised transparent quotation', 'Revision rounds included'] },
  { n: '03', title: 'Design Approval & Agreement', duration: 'Day 7-10', desc: 'Once you love the design, we finalise everything and sign the agreement. The price is locked — what we quote is what you pay. First milestone payment (10%) confirms the project.', details: ['Final design lock-in', 'Fixed-price agreement', '10% booking amount', 'Material selection finalised'] },
  { n: '04', title: 'Manufacturing', duration: 'Days 10-40', desc: 'All modular furniture — kitchens, wardrobes, TV units — are manufactured in our own factory. Meanwhile, site preparation (civil, electrical, painting) happens in parallel.', details: ['Factory manufacturing begins', 'Quality checks at every stage', 'Site prep in parallel', '50% payment at manufacturing start'] },
  { n: '05', title: 'Installation & Execution', duration: 'Days 40-55', desc: 'Our installation team brings everything together on-site. Modular units are fitted, false ceilings installed, painting completed, and hardware mounted — all by our own team.', details: ['Modular unit installation', 'False ceiling & lighting', 'Painting & finishing', 'Hardware & accessories fitting'] },
  { n: '06', title: 'Final Walkthrough & Handover', duration: 'Day 55-60', desc: 'We do a detailed walkthrough together. Every detail is checked. Once you are 100% satisfied, we hand over your transformed space with a 5-year workmanship warranty.', details: ['Joint quality inspection', 'Snag list resolution', '5-year warranty card', '40% final payment & handover'] },
]

export default function ProcessPage() {
  return (
    <>
      <NavServer />
      <main>
        <PageHero
          eyebrow="Our Process"
          title={<>From first call to<br /><em className="italic text-parx-red">dream home</em> — in 60 days</>}
          subtitle="A transparent, predictable process with no surprises. Every step is designed to give you confidence and control over your project."
        />

        <section className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-6">
            {steps.map((s, i) => (
              <div key={s.n} className={`grid md:grid-cols-[120px_1fr] gap-8 pb-16 mb-16 ${i < steps.length - 1 ? 'border-b border-parx-border' : ''}`}>
                <div>
                  <span className="text-parx-red font-mono text-sm">{s.n}</span>
                  <div className="mt-2 text-[10px] tracking-[0.2em] text-parx-gray border border-parx-border px-2 py-1 uppercase text-center">{s.duration}</div>
                </div>
                <div>
                  <h2 className="font-display font-light text-parx-black text-2xl md:text-3xl mb-4">{s.title}</h2>
                  <p className="text-parx-gray leading-relaxed mb-6">{s.desc}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {s.details.map(d => (
                      <div key={d} className="flex items-start gap-2">
                        <span className="text-parx-red mt-0.5 flex-shrink-0">✓</span>
                        <span className="text-parx-gray text-sm">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-parx-cream py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="parx-accent-line" />
            <h2 className="font-display font-light text-parx-black text-3xl mb-8">
              Payment <em className="italic text-parx-red">milestones</em>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { pct: '10%', label: 'At Booking', desc: 'Design approval & agreement signing' },
                { pct: '50%', label: 'Manufacturing Start', desc: 'Factory production begins' },
                { pct: '40%', label: 'At Handover', desc: 'After final walkthrough & approval' },
              ].map(p => (
                <div key={p.label} className="bg-white border border-parx-border p-8 text-center hover:border-parx-red transition-colors">
                  <div className="font-display text-4xl text-parx-red font-light mb-2">{p.pct}</div>
                  <div className="text-parx-black text-sm font-medium mb-2">{p.label}</div>
                  <div className="text-parx-gray text-xs">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-parx-red py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-white text-3xl md:text-4xl mb-6">
              Ready to start <em className="italic">your journey?</em>
            </h2>
            <p className="text-white/70 mb-8">Step 1 is free — just a conversation. No commitment.</p>
            <a href="https://wa.me/919177822018?text=Hi%20Parx%20Interiors%2C%20I%20would%20like%20to%20start%20with%20a%20free%20consultation"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white text-parx-red hover:bg-parx-cream px-10 py-4 text-sm tracking-[0.15em] uppercase font-medium transition-all">
              Book Free Consultation →
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
