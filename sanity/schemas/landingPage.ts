export default {
  name: 'landingPage',
  title: 'Landing Pages (Paid Ads)',
  type: 'document',
  icon: () => '🚀',
  groups: [
    { name: 'meta',    title: '① Page Info & SEO' },
    { name: 'hero',    title: '② Hero Section' },
    { name: 'gallery', title: '③ Before & After' },
    { name: 'process', title: '④ Process Steps' },
    { name: 'why',     title: '⑤ Why Choose Parx' },
    { name: 'faq',     title: '⑥ FAQ' },
    { name: 'cta',     title: '⑦ Final CTA & WhatsApp' },
    { name: 'footer',  title: '⑧ Footer & Social Media' },
  ],
  fields: [

    // ─── ① Page Info & SEO ────────────────────────────────────────────────
    {
      name: 'internalTitle',
      title: 'Internal Page Name',
      type: 'string',
      group: 'meta',
      description: 'Only visible in Sanity. E.g. "Prospecting – July 2025" or "Remarketing – Hyderabad"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Page URL Slug',
      type: 'slug',
      group: 'meta',
      description: 'The URL will be: parxinteriors.com/[slug]  →  E.g. slug "hyderabad-home-interiors"',
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
      description: 'Keep under 60 characters.',
      initialValue: 'Premium Interior Design Hyderabad | Parx Interiors',
    },
    {
      name: 'metaDescription',
      title: 'SEO Description (shown in Google)',
      type: 'text',
      rows: 2,
      group: 'meta',
      description: 'Keep under 155 characters.',
      initialValue: 'Free consultation. End-to-end interior design in Hyderabad. Starting from ₹8 Lakhs.',
    },
    {
      name: 'ogImage',
      title: 'Social Share Image (Facebook / WhatsApp preview)',
      type: 'image',
      group: 'meta',
      options: { hotspot: true },
      description: 'Shown when someone shares the link. Recommended: 1200 × 630 px.',
    },
    {
      name: 'favicon',
      title: 'Favicon (browser tab icon)',
      type: 'image',
      group: 'meta',
      options: { hotspot: false },
      description: 'Icon shown in browser tab for this landing page. Recommended: 512 × 512 px PNG with transparent background.',
    },

    // ─── ② Hero Section ───────────────────────────────────────────────────
    {
      name: 'heroImage',
      title: 'Hero Background Photo',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      description: 'Full-screen background image. Recommended: 1920 × 1080 px. Use a premium interior photo.',
      validation: (Rule: any) => Rule.required().error('Hero image is required'),
    },
    {
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      group: 'hero',
      description: 'Main large heading.',
      initialValue: 'Where Function Meets Finesse.',
    },
    {
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 2,
      group: 'hero',
      initialValue: 'Thoughtfully designed interiors for modern homes in Hyderabad.',
    },
    {
      name: 'heroPrimaryCta',
      title: 'Primary CTA Button Text',
      type: 'string',
      group: 'hero',
      initialValue: 'Get Free Consultation',
    },
    {
      name: 'heroSecondaryCta',
      title: 'Secondary CTA Button Text',
      type: 'string',
      group: 'hero',
      initialValue: 'Book Free Consultation',
    },
    {
      name: 'trustPills',
      title: 'Trust Pills (✓ items below buttons)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'hero',
      description: 'Short trust statements. Max 4 recommended.',
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
          { name: 'label', title: 'Room Label', type: 'string', description: 'E.g. "Living Room", "Modular Kitchen"' },
          { name: 'beforeImage', title: 'Before Photo', type: 'image', options: { hotspot: true } },
          { name: 'afterImage',  title: 'After Photo',  type: 'image', options: { hotspot: true } },
        ],
        preview: {
          select: { title: 'label' },
          prepare({ title }: any) {
            return { title: title || 'Untitled Transformation', subtitle: 'Before & After pair' }
          },
        },
      }],
      description: 'Upload before & after photo pairs. Max 6. Both images should be the same room from the same angle.',
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
        fields: [
          { name: 'stepNumber',   title: 'Step Number',      type: 'string', description: 'E.g. "01"' },
          { name: 'title',        title: 'Step Title',       type: 'string' },
          { name: 'description',  title: 'Step Description', type: 'text', rows: 2 },
        ],
        preview: { select: { title: 'title', subtitle: 'stepNumber' } },
      }],
    },

    // ─── ⑤ Why Choose Parx ───────────────────────────────────────────────
    {
      name: 'whyCards',
      title: 'Why Choose Parx — Cards (leave empty to use defaults)',
      type: 'array',
      group: 'why',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon',        title: 'Icon (emoji)', type: 'string' },
          { name: 'title',       title: 'Card Title',   type: 'string' },
          { name: 'description', title: 'Description',  type: 'text', rows: 2 },
        ],
        preview: { select: { title: 'title', subtitle: 'icon' } },
      }],
    },

    // ─── ⑥ FAQ ────────────────────────────────────────────────────────────
    {
      name: 'faqs',
      title: 'FAQ Questions (leave empty to use defaults)',
      type: 'array',
      group: 'faq',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Question', type: 'string', validation: (Rule: any) => Rule.required() },
          { name: 'answer',   title: 'Answer',   type: 'text', rows: 3, validation: (Rule: any) => Rule.required() },
        ],
        preview: { select: { title: 'question' } },
      }],
      validation: (Rule: any) => Rule.max(8),
    },

    // ─── ⑦ Final CTA & WhatsApp ───────────────────────────────────────────
    {
      name: 'finalCtaHeadline',
      title: 'Final CTA Headline',
      type: 'string',
      group: 'cta',
      initialValue: "Let's Design a Home You'll Love for Years to Come.",
    },
    {
      name: 'finalCtaSubtext',
      title: 'Final CTA Supporting Text',
      type: 'text',
      rows: 2,
      group: 'cta',
      initialValue: 'Book a free consultation and start your home transformation with confidence.',
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
      description: 'Include country code. E.g. "+919177822018". All form leads from this page go to this number.',
      initialValue: '+919177822018',
    },

    // ─── ⑧ Footer & Social Media ──────────────────────────────────────────
    {
      name: 'footerLogo',
      title: 'Footer Logo (white/light version)',
      type: 'image',
      group: 'footer',
      options: { hotspot: false },
      description: 'Upload your white logo for the dark footer. If empty, text logo will appear automatically.',
    },
    {
      name: 'footerPhone',
      title: 'Phone Number',
      type: 'string',
      group: 'footer',
      initialValue: '+91 91778 22018',
    },
    {
      name: 'footerEmail',
      title: 'Email Address',
      type: 'string',
      group: 'footer',
      initialValue: 'parxinteriors@gmail.com',
    },
    {
      name: 'footerAddress',
      title: 'Office Address',
      type: 'string',
      group: 'footer',
      initialValue: 'SMR Vinay Iconia, Kondapur, Hyderabad',
    },

    // Social media links
    {
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      group: 'footer',
      description: 'E.g. https://instagram.com/parxinteriors',
    },
    {
      name: 'facebookUrl',
      title: 'Facebook Page URL',
      type: 'url',
      group: 'footer',
    },
    {
      name: 'whatsappSocialUrl',
      title: 'WhatsApp Number (social icon)',
      type: 'string',
      group: 'footer',
      description: 'Number with country code, no + or spaces. E.g. 919177822018',
      initialValue: '919177822018',
    },
    {
      name: 'youtubeUrl',
      title: 'YouTube Channel URL',
      type: 'url',
      group: 'footer',
    },
    {
      name: 'linkedinUrl',
      title: 'LinkedIn Page URL',
      type: 'url',
      group: 'footer',
    },
    {
      name: 'twitterUrl',
      title: 'X (Twitter) URL',
      type: 'url',
      group: 'footer',
    },
    {
      name: 'pinterestUrl',
      title: 'Pinterest URL',
      type: 'url',
      group: 'footer',
      description: 'Great for interior design inspiration boards.',
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
        subtitle: subtitle ? `parxinteriors.com/${subtitle}` : 'No slug set',
      }
    },
  },
}
