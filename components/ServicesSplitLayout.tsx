'use client'

interface Service {
  _id: string
  title: string
  description: string
  tag?: string
  imageUrl?: string
}

export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Section header */}
        <div className="mb-10 md:mb-14">
          <div className="parx-accent-line" />
          <h2 className="font-display font-light text-parx-black text-3xl md:text-4xl">
            What we <em className="italic text-parx-red">design & build</em>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {services.map((s, i) => (
            <div key={s._id} className="group relative overflow-hidden cursor-pointer">
              {/* Image */}
              <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-parx-light">
                {s.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={s.imageUrl}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-parx-light">
                    <span className="text-parx-border text-4xl">📷</span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-parx-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Number badge */}
                <div className="absolute top-3 left-3 w-7 h-7 bg-parx-red flex items-center justify-center">
                  <span className="text-white font-mono text-[10px]">{String(i + 1).padStart(2, '0')}</span>
                </div>

                {/* Tag badge */}
                {s.tag && (
                  <div className="absolute top-3 right-3 bg-white/90 px-2 py-0.5">
                    <span className="text-parx-black text-[9px] tracking-[0.15em] uppercase font-medium">{s.tag}</span>
                  </div>
                )}

                {/* Hover description */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                  <p className="text-white/90 text-xs leading-relaxed line-clamp-3">{s.description}</p>
                </div>
              </div>

              {/* Title */}
              <div className="pt-3 pb-1">
                <h3 className="font-display font-light text-parx-black text-lg md:text-xl group-hover:text-parx-red transition-colors duration-300">
                  {s.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
