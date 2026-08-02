export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',

  groups: [
    { name: 'content',    title: '📝 Content',    default: true },
    { name: 'seo',        title: '🔍 SEO'                      },
    { name: 'social',     title: '📱 Social / OG'              },
    { name: 'conversion', title: '🎯 Conversion'               },
    { name: 'settings',   title: '⚙️ Settings'                 },
  ],

  fields: [
    // ─── CONTENT ─────────────────────────────────────────────────────────────
    {
      name: 'title', title: 'Title', type: 'string',
      group: 'content',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug', title: 'Slug', type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author', title: 'Author', type: 'reference',
      group: 'content',
      to: [{ type: 'teamMember' }],
      description: 'Links to a Team Member. Builds E-E-A-T authority with Google.',
    },
    {
      name: 'category', title: 'Category', type: 'string',
      group: 'content',
      options: { list: ['Kitchens', 'Wardrobes', 'Living Room', 'Bedroom', 'Office', 'Tips', 'Materials', 'Trends'] },
    },
    {
      name: 'excerpt', title: 'Excerpt', type: 'text',
      group: 'content',
      rows: 3,
      description: 'Short summary shown on blog listing and in search results.',
    },
    {
      name: 'featuredImage', title: 'Featured Image', type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    },
    {
      name: 'body', title: 'Body', type: 'array',
      group: 'content',
      of: [
        { type: 'block' },
        {
          type: 'image', options: { hotspot: true },
          fields: [
            { name: 'alt',     title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption',  type: 'string' },
          ],
        },
        { name: 'youtube',   title: 'YouTube Embed',   type: 'object', fields: [{ name: 'url', title: 'YouTube URL',   type: 'url' }] },
        { name: 'instagram', title: 'Instagram Embed', type: 'object', fields: [{ name: 'url', title: 'Instagram URL', type: 'url' }] },
        { name: 'embed',     title: 'Custom Embed',    type: 'object', fields: [{ name: 'url', title: 'Embed URL', type: 'url' }, { name: 'caption', title: 'Caption', type: 'string' }] },
      ],
    },
    {
      name: 'relatedPosts', title: 'Related Posts', type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      validation: (Rule: any) => Rule.max(3),
      description: 'Link up to 3 related posts. Reduces bounce rate and keeps readers on site.',
    },
    {
      name: 'publishedAt', title: 'Published At', type: 'datetime',
      group: 'content',
    },
    {
      name: 'updatedAt', title: 'Last Updated', type: 'datetime',
      group: 'content',
      description: 'Update this when you refresh or revise the post. Signals freshness to Google.',
    },

    // ─── SEO ─────────────────────────────────────────────────────────────────
    {
      name: 'seoTitle', title: 'SEO Title', type: 'string',
      group: 'seo',
      description: 'Ideal length: 50–60 characters. Leave blank to use the post title.',
      validation: (Rule: any) => Rule.max(60).warning('SEO title should be under 60 characters'),
    },
    {
      name: 'seoDescription', title: 'SEO Description', type: 'text',
      group: 'seo',
      rows: 2,
      description: 'Ideal length: 150–160 characters.',
      validation: (Rule: any) => Rule.max(160).warning('Meta description should be under 160 characters'),
    },
    {
      name: 'focusKeyword', title: 'Focus Keyword', type: 'string',
      group: 'seo',
      description: 'Primary keyword this post targets, e.g. "modular kitchen Hyderabad".',
    },
    {
      name: 'canonicalUrl', title: 'Canonical URL', type: 'url',
      group: 'seo',
      description: 'Only fill if cross-posting to Medium, LinkedIn, etc. Tells Google which version is the original.',
    },
    {
      name: 'noIndex', title: 'Hide from Search Engines (no-index)', type: 'boolean',
      group: 'seo',
      initialValue: false,
      description: 'Turn ON to prevent Google from indexing this post (e.g. draft/private content).',
    },

    // ─── SOCIAL / OG ─────────────────────────────────────────────────────────
    {
      name: 'ogTitle', title: 'OG Title (Social Share)', type: 'string',
      group: 'social',
      description: 'Title shown when shared on WhatsApp, Facebook, LinkedIn. Leave blank to use SEO Title.',
    },
    {
      name: 'ogDescription', title: 'OG Description (Social Share)', type: 'text',
      group: 'social',
      rows: 2,
      description: 'Description shown on social shares. Leave blank to use SEO Description.',
    },
    {
      name: 'ogImage', title: 'OG Image (Social Share)', type: 'image',
      group: 'social',
      options: { hotspot: true },
      description: 'Recommended size: 1200×630px. Leave blank to use the Featured Image.',
    },

    // ─── CONVERSION ──────────────────────────────────────────────────────────
    {
      name: 'cta', title: 'Call to Action', type: 'object',
      group: 'conversion',
      description: 'Optional CTA block shown at the end of the post to drive leads.',
      fields: [
        { name: 'heading',     title: 'Heading',     type: 'string', description: 'e.g. "Ready to transform your kitchen?"' },
        { name: 'buttonLabel', title: 'Button Label', type: 'string', description: 'e.g. "Get Free Consultation"' },
        { name: 'buttonUrl',   title: 'Button URL',   type: 'url',    description: 'WhatsApp link or page URL' },
      ],
    },
  ],

  orderings: [
    { title: 'Published Date (newest first)', name: 'publishedAt', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { title: 'Last Updated (newest first)',   name: 'updatedAt',   by: [{ field: 'updatedAt',   direction: 'desc' }] },
  ],

  preview: {
    select: {
      title:    'title',
      subtitle: 'category',
      media:    'featuredImage',
    },
  },
}
