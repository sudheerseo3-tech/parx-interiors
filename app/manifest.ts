import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Parx Interiors',
    short_name: 'Parx Interiors',
    description: 'Premium interior designers in Hyderabad. Modular kitchens, wardrobes & full home interiors.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#C41E3A',
    icons: [
      { src: '/icon', sizes: '32x32',   type: 'image/png', purpose: 'any' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png', purpose: 'any' },
    ],
  }
}
