import {defineField, defineType} from 'sanity'
import CustomPreview from './CustomPreview'

const contactForm = defineType({
  name: 'contactForm',
  title: 'Contact Form',
  type: 'object',
  fields: [
    defineField({
      name: 'showName',
      title: 'Show Name',
      type: 'boolean',
    }),
    defineField({
      name: 'showEmail',
      title: 'Show Email',
      type: 'boolean',
    }),
    defineField({
      name: 'showPhone',
      title: 'Show Phone',
      type: 'boolean',
    }),
    defineField({
      name: 'showMessage',
      title: 'Show Message',
      type: 'boolean',
    }),
  ],
  components: {preview: CustomPreview},
  preview: {
    select: {
      name: 'showName',
      email: 'showEmail',
      phone: 'showPhone',
      message: 'showMessage',
    },
    prepare(selection) {
      const {name, email, phone, message} = selection
      const showing = `Showing ${name ? 'name, ' : ''}${email ? 'email, ' : ''}${phone ? 'phone, ' : ''}${message ? 'message, ' : ''}`
      return {
        title: 'Contact Form',
        subtitle: showing.substring(0, showing.length - 2),
      }
    },
  },
})

export default contactForm
