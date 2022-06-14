const path = require('path')

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', 'storybook-addon-next'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  babel: {
    presets: ['next/babel'],
    plugins: [['styled-jsx/babel', { plugins: ['@styled-jsx/plugin-sass'] }]],
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, '../components'),
      '@core': path.resolve(__dirname, '../lib/core'),
      '@styles': path.resolve(__dirname, '../styles'),
    }

    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: 'sass-loader',
          options: {
            additionalData: `@import "${path.resolve(__dirname, '../styles/base/base.scss')}";`,
          },
        },
      ],
    })

    return config
  },
  staticDirs: ['../public', '../stories/assets'],
}
