import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

const LOGO_URL = 'https://cdn.sanity.io/images/dx9xg01d/production/f4d67d044b11fd001140356ae6961798211dd8d7-150x150.jpg'

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          overflow: 'hidden',
          backgroundColor: '#ffffff',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO_URL}
          width={32}
          height={32}
          style={{ objectFit: 'contain' }}
          alt="Parx Interiors"
        />
      </div>
    ),
    { ...size }
  )
}
