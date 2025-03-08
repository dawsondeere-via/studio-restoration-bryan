import {defineField, defineType} from 'sanity'
import CustomPreview from './CustomPreview'

const accordion = defineType({
  name: 'accordion',
  title: 'Accordion',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      of: [{type: 'accordionItem'}],
    }),
  ],
  components: {preview: CustomPreview},
  preview: {
    select: {
      items: 'items',
    },
    prepare(selection) {
      const {items} = selection
      return {
        title: 'Accordion',
        subtitle: `${items.length} items`,
      }
    },
  },
})

export default accordion
