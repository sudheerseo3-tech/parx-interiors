import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

const LOGO_URL = 'https://cdn.sanity.io/images/dx9xg01d/production/f4d67d044b11fd001140356ae6961798211dd8d7-150x150.jpg?w=180&h=180&fit=crop&auto=format'

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: 180, height: 180, display: 'flex', background: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO_URL} width={160} height={160} style={{ objectFit: 'contain' }} alt="" />
      </div>
    ),
    { ...size }
  )
}
