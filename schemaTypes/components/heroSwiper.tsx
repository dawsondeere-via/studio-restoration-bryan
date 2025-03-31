import {defineField, defineType} from 'sanity'
import {CustomPreview} from '../sanityComponents'
import {componentStyles} from '../groups'

const heroSwiper = defineType({
  name: 'heroSwiper',
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
      name: 'images',
      type: 'array',
      group: 'content',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'imagesOnLeft',
      title: 'Images on Left?',
      type: 'boolean',
      group: 'content',
    }),
    ...componentStyles,
  ],
  components: {preview: CustomPreview},
  preview: {
    select: {
      textGroup: 'textGroup',
      images: 'images',
    },
    prepare(selection) {
      const {textGroup, images} = selection
      return {
        title: textGroup.headline,
        subtitle: textGroup.subheadline,
        media: images?.length > 0 ? images[0] : undefined,
      }
    },
  },
})

export default heroSwiper
