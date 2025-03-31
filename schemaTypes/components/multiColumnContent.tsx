import {defineField, defineType} from 'sanity'
import {CustomPreview} from '../sanityComponents'
import {componentStyles} from '../groups'

const multiColumnContent = defineType({
  name: 'multiColumnContent',
  title: 'Multi-Column Content',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      group: 'content',
      of: [{type: 'sectionSimple'}],
    }),
    ...componentStyles,
  ],
  components: {preview: CustomPreview},
  preview: {
    select: {
      items: 'items',
    },
    prepare(selection) {
      const {items} = selection
      return {
        title: 'Multi-Column Content',
        subtitle: `${items ? items.length : 0} items`,
      }
    },
  },
})

export default multiColumnContent
