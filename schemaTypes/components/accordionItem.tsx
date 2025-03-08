import {defineField, defineType} from 'sanity'

const accordionItem = defineType({
  name: 'accordionItem',
  title: 'Accordion Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'text',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'text',
    },
  },
})

export default accordionItem
