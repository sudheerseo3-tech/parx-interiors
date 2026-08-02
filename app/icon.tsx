import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          backgroundColor: '#C41E3A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontSize: 18,
            fontWeight: 900,
            fontFamily: 'sans-serif',
            letterSpacing: -1,
          }}
        >
          P
        </span>
      </div>
    ),
    { ...size }
  )
}
