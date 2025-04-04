export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Color code for the category (e.g. #FF0000 for red)',
    },
  ],
}; 