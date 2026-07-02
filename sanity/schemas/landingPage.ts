export default {
  name: 'landingPage',
  title: 'Landing Pages (Paid Ads)',
  type: 'document',
  icon: () => '🚀',
  groups: [
    { name: 'meta',      title: '① Page Info & SEO' },
    { name: 'hero',      title: '② Hero Section' },
    { name: 'gallery',   title: '③ Before & After' },
    { name: 'process',   title: '④ Process Steps' },
    { name: 'why',       title: '⑤ Why Choose Parx' },
    { name: 'faq',       title: '⑥ FAQ' },
    { name: 'cta',       title: '⑦ Final CTA' },
  ],
  fields: [
    // ─── ① Page Info & SEO ────────────────────────────────────────────────
    {
      name: 'internalTitle',
      title: 'Internal Page Name',
      type: 'string',
      group: 'meta',
      description: 'Only visible in Sanity. E.g. "Prospecting - July 2025" or "Remarketing - Hyderabad"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Page URL Slug',
      type: 'slug',
      group: 'meta',
      description: 'The URL will be: parxinteriors.com/lp/[slug]  →  E.g. slug "new" = /lp/new',
      options: { source: 'internalTitle', maxLength: 60 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'isActive',
      title: 'Page Active?',
      type: 'boolean',
      group: 'meta',
      description: 'Turn off to hide the page without deleting it.',
      initialValue: true,
    },
    {
      name: 'metaTitle',
      title: 'SEO Title (browser tab & Google)',
      type: 'string',
      group: 'meta',
      description: 'Keep under 60 characters. E.g. "Premium Interior Design Hyderabad | Parx Interiors"',
    },
    {
      name: 'metaDescription',
      title: 'SEO Description (shown in Google)',
      type: 'text',
      rows: 2,
      group: 'meta',
      description: 'Keep under 155 characters. E.g. "Free consultation. End-to-end interior design in Hyderabad."',
    },
    {
      name: 'ogImage',
      title: 'Social Share Image (Facebook / WhatsApp preview)',
      type: 'image',
      group: 'meta',
      options: { hotspot: true },
      description: 'Shown when someone shares the link. Recommended: 1200 × 630 px.',
    },

    // ─── ② Hero Section ───────────────────────────────────────────────────
    {
      name: 'heroImage',
      title: 'Hero Background Photo',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      description: 'Full-screen background image. Recommended: 1920 × 1080 px minimum. Use a premium interior photo.',
      validation: (Rule: any) => Rule.required().error('Hero image is required'),
    },
    {
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      group: 'hero',
      description: 'Main large heading. E.g. "Where Function Meets Finesse."',
      initialValue: 'Where Function Meets Finesse.',
    },
    {
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 2,
      group: 'hero',
      description: 'Supporting text below the headline.',
      initialValue: 'Thoughtfully designed interiors for modern homes in Hyderabad.',
    },
    {
      name: 'heroPrimaryCta',
      title: 'Primary CTA Button Text',
      type: 'string',
      group: 'hero',
      description: 'Main call-to-action. E.g. "Estimate Your Interior Budget"',
      initialValue: 'Estimate Your Interior Budget',
    },
    {
      name: 'heroSecondaryCta',
      title: 'Secondary CTA Button Text',
      type: 'string',
      group: 'hero',
      description: 'E.g. "Book Free Consultation"',
      initialValue: 'Book Free Consultation',
    },
    {
      name: 'trustPills',
      title: 'Trust Pills (✓ items below buttons)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'hero',
      description: 'Short trust statements. Max 4 recommended. E.g. "Free Consultation", "3D Design"',
      initialValue: ['Free Consultation', '3D Design Included', 'Transparent Pricing', 'Professional Installation'],
    },

    // ─── ③ Before & After Gallery ─────────────────────────────────────────
    {
      name: 'beforeAfterPairs',
      title: 'Before & After Transformations',
      type: 'array',
      group: 'gallery',
      of: [{
        type: 'object',
        title: 'Transformation',
        fields: [
          {
            name: 'label',
            title: 'Room Label',
            type: 'string',
            description: 'E.g. "Living Room", "Modular Kitchen", "Master Bedroom Wardrobe"',
          },
          {
            name: 'beforeImage',
            title: 'Before Photo',
            type: 'image',
            options: { hotspot: true },
            description: 'The "before" state. Try to match the angle/crop with the After photo.',
          },
          {
            name: 'afterImage',
            title: 'After Photo',
            type: 'image',
            options: { hotspot: true },
            description: 'The "after" state showing the completed interior.',
          },
        ],
        preview: {
          select: { title: 'label' },
          prepare({ title }: any) {
            return { title: title || 'Untitled Transformation', subtitle: 'Before & After pair' }
          },
        },
      }],
      description: 'Upload before & after photo pairs. Upload up to 6 transformations. Both images should be the same room from the same angle.',
      validation: (Rule: any) => Rule.max(6),
    },

    // ─── ④ Process Steps ──────────────────────────────────────────────────
    {
      name: 'processSteps',
      title: 'Process Steps (leave empty to use defaults)',
      type: 'array',
      group: 'process',
      of: [{
        type: 'object',
        title: 'Step',
        fields: [
          { name: 'stepNumber', title: 'Step Number', type: 'string', description: 'E.g. "01"' },
          { name: 'title', title: 'Step Title', type: 'string', description: 'E.g. "Consultation"' },
          { name: 'description', title: 'Step Description (1-2 sentences)', type: 'text', rows: 2 },
        ],
        preview: {
          select: { title: 'title', subtitle: 'stepNumber' },
        },
      }],
      description: 'The 6-step journey. If you leave this empty, default steps will be used automatically.',
    },

    // ─── ⑤ Why Choose Parx ───────────────────────────────────────────────
    {
      name: 'whyCards',
      title: 'Why Choose Parx — Cards (leave empty to use defaults)',
      type: 'array',
      group: 'why',
      of: [{
        type: 'object',
        title: 'USP Card',
        fields: [
          { name: 'icon', title: 'Icon (emoji)', type: 'string', description: 'E.g. 🏭 or ✓' },
          { name: 'title', title: 'Card Title', type: 'string' },
          { name: 'description', title: 'Card Description (1-2 sentences)', type: 'text', rows: 2 },
        ],
        preview: {
          select: { title: 'title', subtitle: 'icon' },
        },
      }],
      description: 'USP cards. Leave empty to use the 6 default cards automatically.',
    },

    // ─── ⑥ FAQ ────────────────────────────────────────────────────────────
    {
      name: 'faqs',
      title: 'FAQ Questions (leave empty to use defaults)',
      type: 'array',
      group: 'faq',
      of: [{
        type: 'object',
        title: 'FAQ',
        fields: [
          {
            name: 'question',
            title: 'Question',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'answer',
            title: 'Answer',
            type: 'text',
            rows: 3,
            validation: (Rule: any) => Rule.required(),
          },
        ],
        preview: {
          select: { title: 'question' },
        },
      }],
      description: 'Up to 8 FAQs. Leave empty to use default questions automatically.',
      validation: (Rule: any) => Rule.max(8),
    },

    // ─── ⑦ Final CTA ──────────────────────────────────────────────────────
    {
      name: 'finalCtaHeadline',
      title: 'Final CTA Headline',
      type: 'string',
      group: 'cta',
      description: 'E.g. "Let\'s Design a Home You\'ll Love for Years to Come."',
      initialValue: "Let's Design a Home You'll Love for Years to Come.",
    },
    {
      name: 'finalCtaSubtext',
      title: 'Final CTA Supporting Text',
      type: 'text',
      rows: 2,
      group: 'cta',
      initialValue: 'Book a free consultation with our interior design experts and start your home transformation with confidence.',
    },
    {
      name: 'finalCtaButton',
      title: 'Final CTA Button Text',
      type: 'string',
      group: 'cta',
      initialValue: 'Book Free Consultation',
    },
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Number for Leads',
      type: 'string',
      group: 'cta',
      description: 'Include country code. E.g. "+919177822018". Leads from this page will go directly to this number.',
      initialValue: '+919177822018',
    },
  ],
  orderings: [
    { title: 'Newest First', name: 'createdDesc', by: [{ field: '_createdAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'internalTitle', subtitle: 'slug.current', active: 'isActive' },
    prepare({ title, subtitle, active }: any) {
      return {
        title: `${active === false ? '⏸ ' : '✅ '}${title || 'Untitled LP'}`,
        subtitle: subtitle ? `/lp/${subtitle}` : 'No slug set',
      }
    },
  },
}
