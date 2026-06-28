export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    { name: 'question', title: 'Question', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (Rule: any) => Rule.required() },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['General', 'Pricing', 'Process', 'Materials', 'Warranty', 'Timeline'] } },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
  orderings: [{ title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
}
