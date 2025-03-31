import {defineField} from 'sanity'

const fontOptions = [
  {title: 'Arno Pro', value: 'ArnoPro'},
  {title: 'Adobe Garamond Pro', value: 'AdobeGaramondPro'},
  {title: 'Sarah Script', value: 'SarahScript'},
]

const fontColorOptions = [
  {title: 'Black', value: 'common.black'},
  {title: 'White', value: 'common.white'},
  {title: 'Red', value: 'secondary.main'},
]

const variantOptions = [
  {title: 'h1', value: 'h1'},
  {title: 'h2', value: 'h2'},
  {title: 'h3', value: 'h3'},
  {title: 'h4', value: 'h4'},
  {title: 'h5', value: 'h5'},
  {title: 'h6', value: 'h6'},
  {title: 'body1', value: 'body1'},
  {title: 'body2', value: 'body2'},
]

const styles = [
  defineField({
    name: 'fontColor',
    type: 'string',
    group: 'style',
    options: {
      list: fontColorOptions,
    },
  }),
  defineField({
    name: 'headlineFont',
    type: 'string',
    group: 'style',
    options: {
      list: fontOptions,
    },
  }),
  defineField({
    name: 'headlineVariant',
    type: 'string',
    group: 'style',
    options: {
      list: variantOptions,
    },
  }),
  defineField({
    name: 'subheadlineFont',
    type: 'string',
    group: 'style',
    options: {
      list: fontOptions,
    },
  }),
  defineField({
    name: 'subheadlineVariant',
    type: 'string',
    group: 'style',
    options: {
      list: variantOptions,
    },
  }),
  defineField({
    name: 'textFont',
    type: 'string',
    group: 'style',
    options: {
      list: fontOptions,
    },
  }),
  defineField({
    name: 'textVariant',
    type: 'string',
    group: 'style',
    options: {
      list: variantOptions,
    },
  }),
]

export default styles
