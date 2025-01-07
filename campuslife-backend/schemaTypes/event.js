export default {
    name: 'event',
    title: 'Events',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Event Title',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'eventImage',
        title: 'Event Image',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'startDate',
        title: 'Start Date',
        type: 'datetime',
        validation: Rule => Rule.required()
      },
      {
        name: 'endDate',
        title: 'End Date',
        type: 'datetime'
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        rows: 4
      },
      {
        name: 'venue',
        title: 'Venue',
        type: 'string'
      },
      {
        name: 'registrationRequired',
        title: 'Registration Required',
        type: 'boolean',
        initialValue: true
      },
      {
        name: 'registrationDeadline',
        title: 'Registration Deadline',
        type: 'datetime',
        validation: Rule => Rule.custom((deadline, context) => {
          if (context.document.registrationRequired && !deadline) {
            return 'Registration deadline is required when registration is enabled'
          }
          return true
        })
      },
      {
        name: 'maxParticipants',
        title: 'Maximum Participants',
        type: 'number'
      },
      {
        name: 'fee',
        title: 'Registration Fee',
        type: 'number',
        initialValue: 0
      },
      {
        name: 'status',
        title: 'Event Status',
        type: 'string',
        options: {
          list: [
            { title: 'Upcoming', value: 'upcoming' },
            { title: 'Ongoing', value: 'ongoing' },
            { title: 'Completed', value: 'completed' },
            { title: 'Cancelled', value: 'cancelled' }
          ]
        },
        initialValue: 'upcoming'
      }
    ]
  }