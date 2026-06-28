export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    { name: 'title', title: 'Service Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'image', title: 'Service Image', type: 'image', options: { hotspot: true }, description: 'Upload an interior photo that represents this service.' },
    { name: 'tag', title: 'Category Tag', type: 'string', options: { list: ['Residential', 'Commercial', 'Both'] }, initialValue: 'Residential' },
    { name: 'order', title: 'Display Order', type: 'number', description: '1 = first, 6 = last' },
  ],
  orderings: [{ title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
}
