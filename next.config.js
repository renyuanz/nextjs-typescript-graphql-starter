const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-tag/loader' }],
    })

    config.resolve.alias['@'] = path.join(__dirname, 'lib')

    return config
  },
  env: {
    ROOT: __dirname,
  },
})
