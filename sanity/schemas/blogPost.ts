export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['Kitchens', 'Wardrobes', 'Living Room', 'Bedroom', 'Office', 'Tips', 'Materials', 'Trends'] } },
    { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 },
    { name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } },
    {
      name: 'body', title: 'Body', type: 'array', of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }, { name: 'caption', title: 'Caption', type: 'string' }] },
        { name: 'youtube', title: 'YouTube Embed', type: 'object', fields: [{ name: 'url', title: 'YouTube URL', type: 'url' }] },
        { name: 'instagram', title: 'Instagram Embed', type: 'object', fields: [{ name: 'url', title: 'Instagram URL', type: 'url' }] },
        { name: 'embed', title: 'Custom Embed', type: 'object', fields: [{ name: 'url', title: 'Embed URL', type: 'url' }, { name: 'caption', title: 'Caption', type: 'string' }] },
      ],
    },
    { name: 'seoTitle', title: 'SEO Title', type: 'string' },
    { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
  ],
  orderings: [{ title: 'Published Date', name: 'publishedAt', by: [{ field: 'publishedAt', direction: 'desc' }] }],
}
