import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// Sanity CDN — request exact size needed
const LOGO_URL = 'https://cdn.sanity.io/images/dx9xg01d/production/f4d67d044b11fd001140356ae6961798211dd8d7-150x150.jpg?w=32&h=32&fit=crop&auto=format'

export default async function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: 32, height: 32, display: 'flex', background: '#ffffff' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO_URL} width={32} height={32} style={{ objectFit: 'contain' }} alt="" />
      </div>
    ),
    { ...size }
  )
}
