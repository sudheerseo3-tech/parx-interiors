import { MetadataRoute } from 'next'

const BASE = 'https://www.parxinteriors.com'

export default function robots(): MetadataRoute.Robots {
  return {
    // Single wildcard rule — allows ALL crawlers including Googlebot, Bingbot,
    // GPTBot, ClaudeBot, Google-Extended, PerplexityBot, OAI-SearchBot, Applebot.
    // Google's official guidance: don't add per-bot rules unless you need
    // different behavior per bot. One rule covers everything cleanly.
    rules: {
      userAgent: '*',
      allow: '/',
      // Block only technical/internal routes that should never be indexed.
      // /api/       — server-side API endpoints, not human-readable pages
      // /admin/     — admin panel (if any)
      // /dashboard/ — private dashboards
      // /_next/     — Next.js build chunks, not crawlable content
      disallow: ['/api/', '/admin/', '/dashboard/', '/_next/'],
    },

    // Sitemap declaration helps all crawlers discover pages faster.
    sitemap: `${BASE}/sitemap.xml`,
  }
}
