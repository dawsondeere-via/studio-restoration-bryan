import {defineField, defineType} from 'sanity'
import {CustomPreview} from '../sanityComponents'
import {colorOptions} from '../constants'

const widthOptions = [
  {title: 'Full width', value: 'full'},
  {title: 'X-Large', value: 'xl'},
  {title: 'Large', value: 'lg'},
  {title: 'Medium', value: 'md'},
  {title: 'Small', value: 'sm'},
  {title: 'X-Small', value: 'xs'},
]

const divider = defineType({
  name: 'divider',
  type: 'object',
  fields: [
    defineField({
      name: 'color',
      type: 'string',
      options: {
        list: colorOptions,
      },
    }),
    defineField({
      name: 'width',
      type: 'string',
      options: {
        list: widthOptions,
      },
    }),
  ],
  components: {preview: CustomPreview},
  preview: {
    select: {
      color: 'color',
    },
    prepare(selection) {
      const {color} = selection
      const colorLabel = colorOptions.find((opt) => opt.value === color)
      return {
        title: 'Divider',
        subtitle: colorLabel ? colorLabel.title : undefined,
      }
    },
  },
})

export default divider
