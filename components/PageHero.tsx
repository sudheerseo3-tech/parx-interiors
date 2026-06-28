export default function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: React.ReactNode; subtitle: string }) {
  return (
    <section className="bg-parx-cream pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-parx-red" />
          <span className="text-parx-red text-xs tracking-[0.3em] uppercase">{eyebrow}</span>
        </div>
        <h1 className="font-display font-light text-parx-black mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
          {title}
        </h1>
        <p className="text-parx-gray text-lg max-w-2xl leading-relaxed">{subtitle}</p>
      </div>
    </section>
  )
}
