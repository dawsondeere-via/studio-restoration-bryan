import {defineField} from 'sanity'
import {colorOptions} from '../constants'

const iconOptions = [{title: 'None', value: 'none'}]
const variantOptions = [
  {title: 'Contained', value: 'contained'},
  {title: 'Outlined', value: 'outlined'},
]

const button = [
  defineField({
    name: 'buttonLabel',
    type: 'string',
    group: 'button',
  }),
  defineField({
    name: 'buttonLink',
    description: 'For internal links, be sure to start with a forward slash (ex. /sermons)',
    type: 'string',
    group: 'button',
  }),
  defineField({
    name: 'buttonColor',
    type: 'string',
    group: 'button',
    options: {
      list: colorOptions,
    },
  }),
  defineField({
    name: 'buttonIcon',
    type: 'string',
    group: 'button',
    options: {
      list: iconOptions,
    },
  }),
  defineField({
    name: 'buttonVariant',
    type: 'string',
    group: 'button',
    options: {
      list: variantOptions,
    },
  }),
]

export default button
