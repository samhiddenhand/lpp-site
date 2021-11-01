import sanityClient from '@sanity/client'
require('dotenv').config()

export default sanityClient({
  projectId: 'us2eaqpg', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  apiVersion: '2021-05-11',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false // `false` if you want to ensure fresh data
})