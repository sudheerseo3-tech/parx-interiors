'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import PageHero from '@/components/PageHero'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', bhk: '', propertyType: '', budget: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = `Hi Parx Interiors!%0A%0AName: ${form.name}%0APhone: ${form.phone}%0ABHK: ${form.bhk}%0AProperty: ${form.propertyType}%0ABudget: ${form.budget}%0AMessage: ${form.message}`
    window.open(`https://wa.me/919177822018?text=${text}`, '_blank')
  }

  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Get In Touch"
          title={<>Let&apos;s talk about<br /><em className="italic text-parx-red">your space</em></>}
          subtitle="Free consultation. No commitment. Just a conversation about transforming your home or office."
        />

        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="font-display font-light text-parx-black text-2xl mb-8">Tell us about your project</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Your Name *" required
                      className="bg-parx-light border border-parx-border px-4 py-3 text-parx-black text-sm focus:border-parx-red outline-none transition-colors"
                      onChange={e => setForm({ ...form, name: e.target.value })} />
                    <input type="tel" placeholder="Phone Number *" required
                      className="bg-parx-light border border-parx-border px-4 py-3 text-parx-black text-sm focus:border-parx-red outline-none transition-colors"
                      onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <input type="email" placeholder="Email Address"
                    className="w-full bg-parx-light border border-parx-border px-4 py-3 text-parx-black text-sm focus:border-parx-red outline-none transition-colors"
                    onChange={e => setForm({ ...form, email: e.target.value })} />
                  <div className="grid grid-cols-2 gap-4">
                    <select className="bg-parx-light border border-parx-border px-4 py-3 text-parx-gray text-sm focus:border-parx-red outline-none transition-colors"
                      onChange={e => setForm({ ...form, bhk: e.target.value })}>
                      <option value="">Select BHK</option>
                      <option>1 BHK</option><option>2 BHK</option><option>3 BHK</option><option>4 BHK</option>
                      <option>4+ BHK / Villa</option><option>Office / Commercial</option>
                    </select>
                    <select className="bg-parx-light border border-parx-border px-4 py-3 text-parx-gray text-sm focus:border-parx-red outline-none transition-colors"
                      onChange={e => setForm({ ...form, propertyType: e.target.value })}>
                      <option value="">Property Type</option>
                      <option>Apartment</option><option>Independent House / Villa</option><option>Office</option><option>Showroom / Retail</option>
                    </select>
                  </div>
                  <select className="w-full bg-parx-light border border-parx-border px-4 py-3 text-parx-gray text-sm focus:border-parx-red outline-none transition-colors"
                    onChange={e => setForm({ ...form, budget: e.target.value })}>
                    <option value="">Estimated Budget</option>
                    <option>Under ₹5 Lakhs</option><option>₹5 - 10 Lakhs</option><option>₹10 - 20 Lakhs</option>
                    <option>₹20 - 50 Lakhs</option><option>₹50 Lakhs - 1 Crore</option><option>₹1 Crore+</option>
                  </select>
                  <textarea placeholder="Tell us about your project..." rows={4}
                    className="w-full bg-parx-light border border-parx-border px-4 py-3 text-parx-black text-sm focus:border-parx-red outline-none transition-colors resize-none"
                    onChange={e => setForm({ ...form, message: e.target.value })} />
                  <button type="submit"
                    className="w-full bg-parx-red hover:bg-parx-red-dark text-white py-4 text-sm tracking-[0.15em] uppercase transition-all duration-300">
                    Send via WhatsApp →
                  </button>
                </form>
              </div>

              <div>
                <h2 className="font-display font-light text-parx-black text-2xl mb-8">Visit our studio</h2>
                <div className="space-y-8">
                  <div className="border-l-2 border-parx-red pl-6">
                    <h3 className="text-parx-black text-sm font-medium mb-2">Address</h3>
                    <p className="text-parx-gray text-sm leading-relaxed">
                      SMR Vinay Iconia, Tower Hamilton — 20th Floor<br />
                      Masjid Banda Main Rd, Sri Maruthi Nagar Colony<br />
                      Kondapur, Hyderabad, Telangana 500084
                    </p>
                  </div>
                  <div className="border-l-2 border-parx-red pl-6">
                    <h3 className="text-parx-black text-sm font-medium mb-2">Phone / WhatsApp</h3>
                    <a href="tel:+919177822018" className="text-parx-gray hover:text-parx-red text-sm transition-colors">+91 91778 22018</a>
                  </div>
                  <div className="border-l-2 border-parx-red pl-6">
                    <h3 className="text-parx-black text-sm font-medium mb-2">Email</h3>
                    <a href="mailto:parxinteriors@gmail.com" className="text-parx-gray hover:text-parx-red text-sm transition-colors">parxinteriors@gmail.com</a>
                  </div>
                  <div className="border-l-2 border-parx-red pl-6">
                    <h3 className="text-parx-black text-sm font-medium mb-2">Business Hours</h3>
                    <p className="text-parx-gray text-sm">Monday – Saturday: 10:30 AM – 7:30 PM</p>
                    <p className="text-parx-gray text-sm">Sunday: By appointment only</p>
                  </div>
                </div>
                <div className="mt-10 aspect-video overflow-hidden border border-parx-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2!2d78.3573!3d17.4611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93ec0bbe2b29%3A0xa997f706e849d662!2sSMR%20Vinay%20Iconia!5e0!3m2!1sen!2sin!4v1"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" title="Parx Interiors Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
