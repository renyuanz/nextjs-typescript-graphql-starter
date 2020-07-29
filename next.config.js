const path = require('path')

module.exports = {
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
}
