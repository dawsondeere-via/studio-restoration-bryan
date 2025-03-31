import {defineField} from 'sanity'

const text = [
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
    name: 'imageAsBackground',
    title: 'Image as Background Image?',
    type: 'boolean',
    group: 'content',
  }),
]

export default text
