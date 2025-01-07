export default {
    name: 'homepageSlide',
    title: 'Homepage Slideshow',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'image',
        title: 'Slide Image',
        type: 'image',
        options: {
          hotspot: true
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'order',
        title: 'Display Order',
        type: 'number',
        validation: Rule => Rule.required()
      },
      {
        name: 'active',
        title: 'Active',
        type: 'boolean',
        initialValue: true
      }
    ]
  }