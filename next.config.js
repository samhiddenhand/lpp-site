const withTM = require('next-transpile-modules')(['@react-three/drei', 'react-three-fiber', 'three'])
const withImages = require('next-images')
module.exports = withTM(withImages({
  basePath: '',
  i18n: {
    locales: ['en_US', 'fr'],
    defaultLocale: 'en_US'
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    return config
  }
}))
