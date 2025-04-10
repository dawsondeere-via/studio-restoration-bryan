import {defineField, defineType} from 'sanity'
import {CustomPreview} from '../sanityComponents'

const accordion = defineType({
  name: 'accordion',
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
        subtitle: `${items ? items.length : 0} items`,
      }
    },
  },
})

export default accordion
