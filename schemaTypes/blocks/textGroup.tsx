import {defineType} from 'sanity'
import {CustomPreview} from '../sanityComponents'
import {button, styles, text} from '../groups'

const textGroup = defineType({
  name: 'textGroup',
  type: 'object',
  groups: [
    {name: 'text', title: 'Text', default: true},
    {name: 'style', title: 'Style'},
    {name: 'button', title: 'Button'},
  ],
  fields: [...text, ...styles, ...button],
  options: {
    collapsed: false,
    collapsible: true,
  },
  components: {preview: CustomPreview},
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subheadline',
    },
  },
})

export default textGroup
