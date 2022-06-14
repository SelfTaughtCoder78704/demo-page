const routes = require('./routes.json')

module.exports = {
  reactStrictMode: true,
  trailingSlash: process.env.NODE_ENV === 'production',
  exportPathMap: async function () {
    return routes
  },
  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        defaultLoaders.babel,
        {
          loader: require('styled-jsx/webpack').loader,
          options: {
            type: 'global',
          },
        },
        'sass-loader',
      ],
    })

    return config
  },
}
