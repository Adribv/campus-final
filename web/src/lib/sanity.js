import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '3ze6osf2', // Replace with your project ID
  dataset: 'production', // or 'development' depending on what you chose
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: '2024-01-05'
})