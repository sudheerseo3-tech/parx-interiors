import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import PageHero from '@/components/PageHero'
import { BuilderLogosSection } from '@/components/SanityLogoSliders'
import Link from 'next/link'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo'

const PROJECT_ID = 'dx9xg01d'
const DATASET = 'production'

function imgUrl(image: any, width = 800) {
  if (!image?.asset?._ref) return ''
  const ref = image.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}?w=${width}&auto=format`
}

async function getFounder() {
  try {
    const query = encodeURIComponent('*[_type == "teamMember"] | order(_createdAt asc)[0]{ name, role, bio, photo }')
    const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`, { next: { revalidate: 60 } })
    const data = await res.json()
    return data.result
  } catch {
    return null
  }
}

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Parx Interiors — Founded in 2011 by Mani Teja Achuri. 14+ years of delivering premium interiors across Hyderabad with in-house manufacturing.',
}

export default async function AboutPage() {
  const founder = await getFounder()
  const founderImage = founder?.photo ? imgUrl(founder.photo) : null

  return (
    <>
      <JsonLd schemas={breadcrumbSchema([{ name: 'About', href: '/about' }])} />
      <Nav />
      <main>
        <PageHero
          eyebrow="About Parx Interiors"
          title={<>The story behind<br /><em className="italic text-parx-red">every space we create</em></>}
          subtitle="Since 2011, we've been transforming homes and offices across Hyderabad with a single belief — great interiors are built, not assembled."
        />

        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="aspect-[4/5] bg-parx-light border border-parx-border overflow-hidden">
                  {founderImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={founderImage} alt={founder?.name || 'Mani Teja Achuri'} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-full bg-parx-red flex items-center justify-center mx-auto mb-4">
                          <span className="font-display text-3xl text-white font-light">MT</span>
                        </div>
                        <p className="text-parx-gray text-xs tracking-widest">MANI TEJA ACHURI</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-6 -right-6 bg-parx-red p-6 z-10">
                  <div className="font-display text-4xl text-white font-light">2011</div>
                  <div className="text-white/80 text-xs tracking-wide mt-1">Founded</div>
                </div>
              </div>
              <div>
                <div className="parx-accent-line" />
                <h2 className="font-display font-light text-parx-black text-3xl md:text-4xl mb-6">
                  Meet <em className="italic">Mani Teja Achuri</em>
                </h2>
                <p className="text-parx-gray leading-relaxed mb-4">
                  With a vision to bring factory-precision to interior design, Mani Teja Achuri founded Parx Interiors in 2011. What started as a small design studio in Hyderabad has grown into a full-service interior design company with its own manufacturing facility.
                </p>
                <p className="text-parx-gray leading-relaxed mb-4">
                  Having worked on over 100 projects across premium developments like My Home, SMR Vinay, DSR, Aparna, Sumadhura, and Auro Realty — Mani Teja brings a hands-on approach to every project.
                </p>
                <p className="text-parx-gray leading-relaxed mb-8 italic">
                  &ldquo;Every home tells a story. Our job is to make sure it&apos;s a beautiful one — built to last.&rdquo;
                </p>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { num: '14+', label: 'Years' },
                    { num: '250+', label: 'Projects' },
                    { num: '★', label: 'After-Sales Care' },
                  ].map(s => (
                    <div key={s.label} className="border-l-2 border-parx-red pl-4">
                      <div className="font-display text-2xl text-parx-black font-light">{s.num}</div>
                      <div className="text-parx-gray text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-parx-cream py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-parx-border p-10 hover:border-parx-red transition-colors duration-300">
                <span className="text-parx-red text-xs tracking-[0.3em] uppercase">Our Mission</span>
                <h3 className="font-display font-light text-parx-black text-2xl mt-4 mb-4">
                  Design spaces that families <em className="italic">truly love</em> living in.
                </h3>
                <p className="text-parx-gray text-sm leading-relaxed">
                  We combine thoughtful design with factory-precision manufacturing to create interiors that are beautiful, functional, and built to last. No shortcuts, no compromises.
                </p>
              </div>
              <div className="bg-white border border-parx-border p-10 hover:border-parx-red transition-colors duration-300">
                <span className="text-parx-red text-xs tracking-[0.3em] uppercase">Our Vision</span>
                <h3 className="font-display font-light text-parx-black text-2xl mt-4 mb-4">
                  Make premium interiors <em className="italic">accessible</em> to every homeowner.
                </h3>
                <p className="text-parx-gray text-sm leading-relaxed">
                  By owning our manufacturing process, we eliminate middlemen and deliver high-quality interiors at honest prices. Premium design shouldn&apos;t be a luxury — it should be the standard.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-14">
              <div className="parx-accent-line" />
              <h2 className="font-display font-light text-parx-black text-3xl md:text-4xl">
                Why families choose <em className="italic text-parx-red">Parx</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Own Factory', desc: 'Every piece manufactured in our own facility — no outsourcing, no quality compromise.' },
                { title: 'Fixed Pricing', desc: 'What we quote is what you pay. No hidden charges, no surprise additions.' },
                { title: 'On-Time Delivery', desc: 'Factory-controlled timelines mean your home is ready when promised.' },
                { title: 'After-Sales Care', desc: 'Full support throughout and after project completion. We stay with you long after handover.' },
              ].map((item, i) => (
                <div key={item.title} className="group p-6 border border-parx-border hover:border-parx-red transition-colors duration-300">
                  <span className="text-parx-red font-mono text-sm">0{i + 1}</span>
                  <h3 className="font-display text-xl text-parx-black font-light mt-4 mb-3">{item.title}</h3>
                  <p className="text-parx-gray text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BuilderLogosSection />

        <section className="bg-parx-red py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-white text-3xl md:text-4xl mb-8">
              Let&apos;s create something <em className="italic">beautiful together</em>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="https://wa.me/919177822018?text=Hi%20Parx%20Interiors%2C%20I%20would%20like%20a%20free%20consultation"
                target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-parx-red hover:bg-parx-cream pl-7 pr-2.5 py-2.5 text-[14px] tracking-[0.5px] rounded-full font-medium transition-all duration-300 hover:shadow-lg">
                Start a Conversation
                <span className="w-9 h-9 rounded-full bg-parx-red/10 flex items-center justify-center group-hover:bg-parx-red/20 group-hover:rotate-[-35deg] transition-all duration-300">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </a>
              <Link href="/contact"
                className="group inline-flex items-center gap-3 border border-white/40 hover:border-white text-white pl-7 pr-2.5 py-2.5 text-[14px] tracking-[0.5px] rounded-full transition-all duration-300">
                Visit Our Studio
                <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:rotate-[-35deg] transition-all duration-300">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
