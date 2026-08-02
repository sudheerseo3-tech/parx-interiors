import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Parx Interiors — Premium Interior Designers in Hyderabad'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1a1a1a',
          position: 'relative',
        }}
      >
        {/* Red accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 8, height: '100%', backgroundColor: '#C41E3A' }} />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '60px 80px' }}>
          {/* Eyebrow */}
          <div style={{ fontSize: 16, letterSpacing: 6, color: '#C41E3A', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'sans-serif' }}>
            HYDERABAD · EST. 2011
          </div>

          {/* Logo / Name */}
          <div style={{ fontSize: 72, fontWeight: 300, color: '#ffffff', lineHeight: 1.1, fontFamily: 'Georgia, serif', marginBottom: 24 }}>
            Parx Interiors
          </div>

          {/* Tagline */}
          <div style={{ fontSize: 24, color: '#999999', fontFamily: 'sans-serif', fontWeight: 300, marginBottom: 48, maxWidth: 640 }}>
            Premium interior designers in Hyderabad. Modular kitchens, wardrobes &amp; full home interiors.
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 48 }}>
            {[['250+', 'Projects'], ['14+', 'Years'], ['Own', 'Factory']].map(([num, label]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', borderLeft: '2px solid #C41E3A', paddingLeft: 16 }}>
                <span style={{ fontSize: 28, color: '#ffffff', fontFamily: 'Georgia, serif', fontWeight: 300 }}>{num}</span>
                <span style={{ fontSize: 13, color: '#666666', fontFamily: 'sans-serif', letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 8, right: 0, height: 60, backgroundColor: '#C41E3A', display: 'flex', alignItems: 'center', paddingLeft: 72 }}>
          <span style={{ fontSize: 16, color: '#ffffff', fontFamily: 'sans-serif', letterSpacing: 2 }}>www.parxinteriors.com</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
