import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import PageHero from '@/components/PageHero'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Modular kitchens, custom wardrobes, full home interiors, office interiors, false ceilings — all designed and manufactured in-house by Parx Interiors Hyderabad.',
}

const services = [
  { id: 'modular-kitchens', num: '01', title: 'Modular Kitchens', tag: 'Most Popular', desc: 'Custom-designed modular kitchens manufactured in our own factory. From L-shaped to island kitchens — every cabinet, countertop, and fitting is precision-built to your space.', features: ['Soft-close hinges & channels', 'BWP/BWR grade plywood', 'Granite/Quartz countertops', 'Customised to your exact measurements', 'Factory-finished edge banding', '5-year warranty'] },
  { id: 'wardrobes', num: '02', title: 'Wardrobes & Walk-in Closets', tag: 'Storage Solutions', desc: 'Floor-to-ceiling wardrobes, sliding wardrobes, and walk-in closets designed for the way you actually live. Every inch of space optimised for functionality.', features: ['Sliding & hinged options', 'Built-in organisers & accessories', 'Mirror integration', 'Loft storage solutions', 'Premium laminate finishes', 'Anti-sag construction'] },
  { id: 'full-home', num: '03', title: 'Full Home Interiors', tag: 'End-to-End', desc: 'Complete interior transformation — living room, bedrooms, kitchen, bathrooms, pooja room. One team handles everything from design to handover.', features: ['3D visualisation before execution', 'Civil + woodwork + painting', 'Electrical & plumbing coordination', 'Furniture & decor sourcing', 'Single point of contact', 'Fixed-price contracts'] },
  { id: 'office', num: '04', title: 'Office & Commercial Interiors', tag: 'Commercial', desc: 'Workspaces that impress clients and energise your team. From cabin layouts to reception areas — designed for productivity and brand image.', features: ['Space planning & ergonomics', 'Modular workstations', 'Conference & meeting rooms', 'Reception & lobby design', 'Electrical & networking', 'Fast-track execution'] },
  { id: 'ceilings', num: '05', title: 'False Ceilings & Lighting', tag: 'Finishing Touch', desc: 'Architectural false ceilings with integrated lighting design that transforms the ambience of any room. Gypsum, POP, and wooden options available.', features: ['Cove & profile lighting', 'Gypsum & POP options', 'Wooden ceiling accents', 'LED integration', 'Moisture-resistant for bathrooms', 'Clean, seamless finish'] },
  { id: 'tv-units', num: '06', title: 'TV Units & Entertainment', tag: 'Living Room', desc: 'Custom TV units, entertainment walls, and media consoles designed to be the centrepiece of your living room. Wall-mounted or floor-standing options.', features: ['Cable management built-in', 'Backlit panel options', 'Storage + display shelves', 'Wall-mounted & modular', 'Matching side units', 'Custom sizes'] },
]

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Our Services"
          title={<>Designed, manufactured<br />&amp; installed — <em className="italic text-parx-red">by us</em></>}
          subtitle="Every service is delivered end-to-end by our own team. No subcontracting, no middlemen. From your first consultation to the final walkthrough — one team, one standard."
        />

        <section>
          {services.map((s, i) => (
            <div key={s.id} id={s.id} className={`py-20 ${i % 2 === 0 ? 'bg-white' : 'bg-parx-cream'}`}>
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-parx-red font-mono text-sm">{s.num}</span>
                      <span className="text-[10px] tracking-[0.2em] text-parx-gray border border-parx-border px-2 py-1 uppercase">{s.tag}</span>
                    </div>
                    <h2 className="font-display font-light text-parx-black text-3xl md:text-4xl mb-4">{s.title}</h2>
                    <p className="text-parx-gray leading-relaxed mb-8">{s.desc}</p>
                    <a href={`https://wa.me/919177822018?text=Hi%2C%20I%27m%20interested%20in%20your%20${encodeURIComponent(s.title)}%20service`}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-parx-red hover:bg-parx-red-dark text-white px-6 py-3 text-sm tracking-[0.15em] uppercase transition-all duration-300">
                      Get Quote <span>→</span>
                    </a>
                  </div>
                  <div>
                    <div className="aspect-video bg-parx-light border border-parx-border flex items-center justify-center mb-6">
                      <div className="text-center">
                        <div className="text-3xl mb-2">📷</div>
                        <p className="text-parx-gray text-xs tracking-widest">{s.title.toUpperCase()} PHOTO</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {s.features.map(f => (
                        <div key={f} className="flex items-start gap-2">
                          <span className="text-parx-red mt-0.5">✓</span>
                          <span className="text-parx-gray text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="bg-parx-cream py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="parx-accent-line mx-auto" />
            <h2 className="font-display font-light text-parx-black text-3xl md:text-4xl mb-4">
              From <em className="italic">idea</em> to <em className="italic text-parx-red">move-in</em>
            </h2>
            <p className="text-parx-gray mb-12 max-w-lg mx-auto">Our 6-step process ensures a smooth, transparent journey from consultation to handover.</p>
            <div className="flex flex-wrap justify-center gap-6">
              {['Consult', 'Design', 'Approve', 'Manufacture', 'Install', 'Handover'].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="w-10 h-10 border-2 border-parx-red flex items-center justify-center text-parx-red font-mono text-sm">{i + 1}</div>
                  <span className="text-parx-black text-sm font-medium">{step}</span>
                  {i < 5 && <span className="text-parx-border hidden md:block">→</span>}
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/process" className="text-parx-red hover:text-parx-black text-sm tracking-wide transition-colors inline-flex items-center gap-2">
                See detailed process <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-parx-red py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-white text-3xl md:text-4xl mb-6">
              Not sure what you need?<br /><em className="italic">Let&apos;s figure it out together.</em>
            </h2>
            <a href="https://wa.me/919177822018?text=Hi%20Parx%20Interiors%2C%20I%20need%20help%20choosing%20the%20right%20service"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white text-parx-red hover:bg-parx-cream px-10 py-4 text-sm tracking-[0.15em] uppercase font-medium transition-all">
              Free Consultation →
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
