import {defineField, defineType} from 'sanity'
import {CustomPreview} from '../sanityComponents'
import {componentStyles} from '../groups'

const cardGrid = defineType({
  name: 'cardGrid',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    defineField({
      name: 'cards',
      type: 'array',
      group: 'content',
      of: [{type: 'card'}],
    }),
    ...componentStyles,
  ],
  components: {preview: CustomPreview},
  preview: {
    select: {
      cards: 'cards',
    },
    prepare(selection) {
      const {cards} = selection
      return {
        title: 'Card Grid',
        subtitle: `${cards ? cards.length : 0} items`,
      }
    },
  },
})

export default cardGrid
