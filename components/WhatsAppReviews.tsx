'use client'
import { useEffect, useRef, useState } from 'react'

// ─── Conversation data ────────────────────────────────────────────────────────
// from = 'parx'   → RIGHT side, green bubble (our messages on our phone)
// from = 'client' → LEFT side, white bubble (their messages)
// photo slots: 0,1 → Priya R kitchen photos | 2 → Karthik M | 3 → Deepa S
const CONVERSATIONS = [
  {
    contact: { name: 'Priya R.', initials: 'P', bg: '#A8D5BA' },
    messages: [
      { from: 'client', text: 'Priya this side! Moved in yesterday and had to message you immediately 🥹',     time: '10:18 AM' },
      { from: 'client', text: 'Kitchen came out so beautiful honestly. Better than what we imagined 😍',        time: '10:19 AM' },
      { from: 'parx',   text: 'Priya ji!! 🙏🙏 This is the best news. Our team will be so happy to hear this 😊', time: '10:35 AM' },
      { from: 'client', text: 'Already told 3 neighbours about Parx. Two are very serious about starting their interiors 😊', time: '10:38 AM' },
      { from: 'parx',   text: 'This genuinely means a lot to us. Thank you so much Priya ji 🙏',              time: '10:40 AM' },
    ]
  },
  {
    contact: { name: 'Karthik M.', initials: 'K', bg: '#B5C7E8' },
    messages: [
      { from: 'client', text: 'Karthik this side. Handover done today 🙌 Had to message immediately',          time: '3:52 PM' },
      { from: 'client', text: 'Exactly as we planned. Not a single compromise on quality',                      time: '3:53 PM' },
      { from: 'parx',   text: 'Karthik ji!! Congratulations 🎉 This means everything to us. Thank you for trusting Parx 🙏', time: '4:08 PM' },
      { from: 'client', text: 'Quality is top notch bhai. Will definitely refer everyone I know',               time: '4:11 PM' },
    ]
  },
  {
    contact: { name: 'Deepa S.', initials: 'D', bg: '#F4C5A8' },
    messages: [
      { from: 'client', text: 'Deepa here! Moving in today 🥹 Had to message you all right away',              time: '8:44 PM' },
      { from: 'parx',   text: 'Deepa ji!! 🎉🎉 Congratulations! So happy to hear this. Enjoy every moment 🏡', time: '8:59 PM' },
      { from: 'client', text: 'You delivered 10 days early!! Honestly the best decision we made 👏',           time: '9:03 PM' },
      { from: 'client', text: 'My husband was skeptical at first but now he keeps telling people about Parx 😄', time: '9:04 PM' },
    ]
  },
]

// ─── Single message bubble ────────────────────────────────────────────────────
// parx  = green, right (our messages on our phone)
// client = white, left
function Bubble({ msg, photos }: { msg: any; photos: string[] }) {
  const isParx = msg.from === 'parx'

  if (msg.type === 'photo') {
    const src = photos[msg.slot] || ''
    return (
      <div className={`flex ${isParx ? 'justify-end' : 'justify-start'} mb-1`}>
        <div className="relative rounded-lg overflow-hidden shadow-sm"
          style={{ width: 160, height: 120, background: '#d0d0d0', maxWidth: '65%' }}>
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt="Project photo" className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
          )}
          <div className="absolute bottom-1 right-2 flex items-center gap-0.5">
            <span className="text-white text-[10px] font-sans drop-shadow">{msg.time}</span>
            {isParx && (
              <svg width="14" height="10" viewBox="0 0 16 11" fill="none" className="drop-shadow">
                <path d="M1 6l3.5 3.5L10 2" stroke="#53BDEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6l3.5 3.5L15 2" stroke="#53BDEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex ${isParx ? 'justify-end' : 'justify-start'} mb-1`}>
      <div className="relative max-w-[72%]">
        {/* Bubble tail */}
        {isParx ? (
          <div className="absolute -right-1.5 top-0 w-0 h-0"
            style={{ borderLeft: '8px solid #DCF8C6', borderBottom: '8px solid transparent' }} />
        ) : (
          <div className="absolute -left-1.5 top-0 w-0 h-0"
            style={{ borderRight: '8px solid #FFFFFF', borderBottom: '8px solid transparent' }} />
        )}
        <div className="rounded-lg px-3 py-2 shadow-sm"
          style={{ background: isParx ? '#DCF8C6' : '#FFFFFF' }}>
          <p className="font-sans text-[13px] leading-[1.4] text-gray-800 mb-1">{msg.text}</p>
          <div className="flex items-center justify-end gap-1">
            <span className="text-[10px] font-sans text-gray-400">{msg.time}</span>
            {isParx && (
              <svg width="14" height="10" viewBox="0 0 16 11" fill="none">
                <path d="M1 6l3.5 3.5L10 2" stroke="#53BDEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6l3.5 3.5L15 2" stroke="#53BDEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Single chat card ─────────────────────────────────────────────────────────
function ChatCard({ conv, photos, visible, delay }: { conv: typeof CONVERSATIONS[0]; photos: string[]; visible: boolean; delay: number }) {
  return (
    <div className="flex-shrink-0 w-72 md:w-80 rounded-2xl overflow-hidden shadow-xl"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        opacity: visible ? 1 : 0,
        transition: `transform 0.6s ease ${delay}ms, opacity 0.6s ease ${delay}ms`,
      }}>

      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-2.5" style={{ background: '#075E54' }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-sans font-bold text-white text-sm"
          style={{ background: conv.contact.bg }}>
          {conv.contact.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-sans font-semibold leading-tight truncate">{conv.contact.name}</p>
          <p className="text-white/60 text-[11px] font-sans">online</p>
        </div>
        <div className="flex items-center gap-4 text-white/70">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.07 1.18 2 2 0 012.07 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
          </svg>
        </div>
      </div>

      {/* Chat area */}
      <div className="px-2 py-3 space-y-0.5 overflow-y-auto" style={{
        background: '#E5DDD5',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8bdb5' fill-opacity='0.25'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        minHeight: 280,
        maxHeight: 360,
      }}>
        {conv.messages.map((msg, i) => (
          <Bubble key={i} msg={msg} photos={photos} />
        ))}
      </div>

      {/* Typing bar */}
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: '#F0F0F0' }}>
        <div className="flex-1 rounded-full bg-white px-4 py-2">
          <p className="text-gray-400 text-xs font-sans">Type a message</p>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#075E54' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438C8.34 21.475 10.11 22 12 22c5.522 0 10-4.477 10-10S17.521 2 12 2z"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function WhatsAppReviews() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-10">

        {/* Heading */}
        <div className="mb-14">
          <div className="parx-accent-line" />
          <h2 className="font-display font-light text-parx-black mb-3" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
            Straight from their{' '}
            <em className="italic" style={{ color: '#D63E73' }}>WhatsApp</em>
          </h2>
          <p className="font-sans text-parx-gray text-sm max-w-md">
            Real messages from homeowners — shared with their permission.
          </p>
        </div>

        {/* Chat cards */}
        <div className="flex gap-5 overflow-x-auto pb-4 md:overflow-visible md:grid md:grid-cols-3"
          style={{ scrollSnapType: 'x mandatory' }}>
          {CONVERSATIONS.map((conv, i) => (
            <div key={i} style={{ scrollSnapAlign: 'start' }}>
              <ChatCard conv={conv} photos={[]} visible={visible} delay={i * 120} />
            </div>
          ))}
        </div>

        <p className="text-center font-sans text-parx-gray/40 text-xs mt-10">
          Names shortened for privacy. Messages shared with homeowner consent.
        </p>
      </div>
    </section>
  )
}
