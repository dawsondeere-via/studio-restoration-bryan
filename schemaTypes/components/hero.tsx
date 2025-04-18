import {defineField, defineType} from 'sanity'
import {CustomPreview} from '../sanityComponents'
import {componentStyles} from '../groups'

const hero = defineType({
  name: 'hero',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    defineField({
      name: 'textGroup',
      type: 'textGroup',
      group: 'content',
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'content',
    }),
    defineField({
      name: 'imageOnLeft',
      title: 'Image on Left?',
      type: 'boolean',
      group: 'content',
    }),
    ...componentStyles,
  ],
  components: {preview: CustomPreview},
  preview: {
    select: {
      textGroup: 'textGroup',
      image: 'image',
    },
    prepare(selection) {
      const {textGroup, image} = selection
      return {
        title: textGroup.headline,
        subtitle: textGroup.subheadline,
        media: image,
      }
    },
  },
})

export default hero
