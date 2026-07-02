/** @type {import('next').NextConfig} */

// All existing page routes — LP slugs must not clash with these
const RESERVED = ['about','blog','calculator','contact','faq','lp','process','projects','reviews','services']

const nextConfig = {
  async rewrites() {
    return [
      {
        // Any root-level slug that isn't a reserved page → serve from /lp/[slug]
        // e.g. /hyderabad-home-interiors → /lp/hyderabad-home-interiors
        source: '/:slug((?!' + RESERVED.join('|') + ')[a-z0-9-]+)',
        destination: '/lp/:slug',
      },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'www.hafeleindia.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'yt3.googleusercontent.com' },
    ],
  },
}

module.exports = nextConfig
