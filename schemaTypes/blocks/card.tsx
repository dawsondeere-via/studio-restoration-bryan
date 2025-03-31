import {defineField, defineType} from 'sanity'
import {CustomPreview} from '../sanityComponents'
import {styles, text} from '../groups'

const card = defineType({
  name: 'card',
  type: 'object',
  groups: [
    {name: 'text', title: 'Text', default: true},
    {name: 'image', title: 'Image'},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    ...text,
    defineField({
      name: 'link',
      description: 'For internal links, be sure to start with a forward slash (ex. /sermons)',
      type: 'string',
      group: 'text',
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'image',
    }),
    defineField({
      name: 'imageAsBackground',
      title: 'Image as Background Image?',
      type: 'boolean',
      group: 'image',
    }),
    ...styles,
  ],
  options: {
    collapsed: false,
    collapsible: true,
  },
  components: {preview: CustomPreview},
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subheadline',
      media: 'image',
    },
  },
})

export default card
