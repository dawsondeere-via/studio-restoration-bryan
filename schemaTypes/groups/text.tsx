import {defineField} from 'sanity'

const text = [
  defineField({
    name: 'headline',
    type: 'string',
    group: 'text',
  }),
  defineField({
    name: 'subheadline',
    type: 'string',
    group: 'text',
  }),
  defineField({
    name: 'text',
    type: 'array',
    group: 'text',
    of: [{type: 'block', styles: []}],
  }),
]

export default text
