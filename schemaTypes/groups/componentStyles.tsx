import {defineField} from 'sanity'

const spacingOptions = [
  {title: 'Normal', value: 'normal'},
  {title: 'Tight', value: 'tight'},
  {title: 'Extra tight', value: 'extra-tight'},
  {title: 'No spacing', value: 'no-spacing'},
]

const backgroundColorOptions = [
  {title: 'White', value: 'common.white'},
  {title: 'Black', value: 'secondary.black'},
  {title: 'Red', value: 'secondary.main'},
  {title: 'Gold', value: 'secondary.gold'},
  {title: 'Gray', value: 'secondary.gray'},
]

const componentStyles = [
  defineField({
    name: 'backgroundColor',
    type: 'string',
    group: 'style',
    options: {
      list: backgroundColorOptions,
    },
  }),
  defineField({
    name: 'marginTop',
    type: 'string',
    group: 'style',
    description: "The space between this element's top border and the element above it",
    options: {
      list: spacingOptions,
    },
  }),
  defineField({
    name: 'marginBottom',
    type: 'string',
    group: 'style',
    description: "The space between this element's bottom border and the element below it",
    options: {
      list: spacingOptions,
    },
  }),
  defineField({
    name: 'paddingTop',
    type: 'string',
    group: 'style',
    description: "The space between this element's content and its top border",
    options: {
      list: spacingOptions,
    },
  }),
  defineField({
    name: 'paddingBottom',
    type: 'string',
    group: 'style',
    description: "The space between this element's content and its bottom border",
    options: {
      list: spacingOptions,
    },
  }),
]

export default componentStyles
