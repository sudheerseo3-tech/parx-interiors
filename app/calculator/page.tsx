'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import PageHero from '@/components/PageHero'

const rooms = [
  'Modular Kitchen',
  'Master Bedroom Wardrobe',
  'Kids Bedroom Wardrobe',
  'TV Unit',
  'Shoe Rack & Foyer',
  'Crockery Unit',
  'Study Table & Bookshelf',
  'Pooja Room',
  'False Ceiling (per room)',
  'Bathroom Vanity',
]

export default function CalculatorPage() {
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [quality, setQuality] = useState<string>('premium')
  const [otherItem, setOtherItem] = useState('')

  const toggleRoom = (room: string) => setSelected(prev => ({ ...prev, [room]: !prev[room] }))

  const selectedItems = Object.entries(selected).filter(([, v]) => v).map(([k]) => k)
  const allItems = otherItem.trim() ? [...selectedItems, `Other: ${otherItem.trim()}`] : selectedItems

  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Cost Calculator"
          title={<>Plan your<br /><em className="italic text-parx-red">interior project</em></>}
          subtitle="Select the rooms you want to furnish and your preferred material quality. We'll provide a detailed quote on WhatsApp."
        />

        <section className="bg-white py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-10">
              <h3 className="text-parx-black text-sm font-medium mb-4">Select Material Quality</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'basic', label: 'Essential' },
                  { key: 'premium', label: 'Premium' },
                  { key: 'luxury', label: 'Luxury' },
                ].map(q => (
                  <button key={q.key}
                    onClick={() => setQuality(q.key)}
                    className={`p-4 border text-left transition-all duration-200 ${quality === q.key ? 'border-parx-red bg-red-50' : 'border-parx-border hover:border-parx-gray'}`}>
                    <div className="text-parx-black text-sm font-medium">{q.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-parx-black text-sm font-medium mb-4">Select Rooms / Items</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {rooms.map(room => (
                  <button key={room}
                    onClick={() => toggleRoom(room)}
                    className={`flex items-center p-4 border transition-all duration-200 ${selected[room] ? 'border-parx-red bg-red-50' : 'border-parx-border hover:border-parx-gray'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${selected[room] ? 'border-parx-red bg-parx-red' : 'border-parx-border'}`}>
                        {selected[room] && <span className="text-white text-xs">✓</span>}
                      </div>
                      <span className="text-parx-black text-sm">{room}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-parx-black text-sm font-medium mb-3">Others</h3>
              <input
                type="text"
                placeholder="Enter any other requirements..."
                value={otherItem}
                onChange={e => setOtherItem(e.target.value)}
                className="w-full bg-parx-light border border-parx-border px-4 py-3 text-parx-black text-sm focus:border-parx-red outline-none transition-colors"
              />
            </div>

            <div className="border-2 border-parx-red p-8 text-center bg-red-50">
              <p className="text-parx-gray text-xs tracking-[0.3em] uppercase mb-4">Your Selection</p>
              {allItems.length > 0 ? (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {allItems.map(item => (
                      <span key={item} className="bg-white border border-parx-border px-3 py-1 text-parx-black text-sm">{item}</span>
                    ))}
                  </div>
                  <p className="text-parx-gray text-sm">Quality: <span className="text-parx-black font-medium capitalize">{quality}</span></p>
                </div>
              ) : (
                <p className="text-parx-gray text-sm mb-6">Select rooms above to get started</p>
              )}
              <p className="text-parx-gray text-xs mb-6">We&apos;ll share a detailed quotation with pricing on WhatsApp.</p>
              <a href={`https://wa.me/919177822018?text=Hi%20Parx%20Interiors!%20I%20need%20a%20quote%20for:%20${encodeURIComponent(allItems.join(', '))}%20(${quality}%20quality)`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-parx-red hover:bg-parx-red-dark text-white px-8 py-4 text-sm tracking-[0.15em] uppercase transition-all duration-300">
                Get Quote on WhatsApp →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
