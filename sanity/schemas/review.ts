export default {
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    { name: 'clientName', title: 'Client Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'location', title: 'Location/Area', type: 'string' },
    { name: 'rating', title: 'Rating (1-5)', type: 'number', validation: (Rule: any) => Rule.min(1).max(5) },
    { name: 'text', title: 'Review Text', type: 'text', rows: 4 },
    { name: 'clientPhoto', title: 'Client Photo', type: 'image', options: { hotspot: true } },
    { name: 'videoUrl', title: 'Video Testimonial URL', type: 'url' },
    { name: 'projectType', title: 'Project Type', type: 'string', options: { list: ['Full Home', 'Kitchen', 'Wardrobe', 'Office'] } },
    { name: 'featured', title: 'Show on Homepage?', type: 'boolean', initialValue: false },
  ],
}
