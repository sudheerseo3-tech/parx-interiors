export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Project Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['Full Home', 'Kitchen', 'Wardrobe', 'Office', 'Commercial'] } },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'propertyName', title: 'Property/Builder Name', type: 'string' },
    { name: 'bhk', title: 'BHK Size', type: 'string' },
    { name: 'year', title: 'Year Completed', type: 'string' },
    { name: 'description', title: 'Description', type: 'text', rows: 4 },
    { name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } },
    {
      name: 'gallery', title: 'Photo Gallery', type: 'array', of: [
        { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }, { name: 'caption', title: 'Caption', type: 'string' }] },
      ],
    },
    { name: 'videoUrl', title: 'Video Walkthrough URL', type: 'url' },
    { name: 'seoTitle', title: 'SEO Title', type: 'string' },
    { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 },
  ],
}
