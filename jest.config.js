module.exports = {
  roots: ['<rootDir>'],
  modulePaths: ['node_modules', '<rootDir>'],
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': `<rootDir>/__mocks__/fileMock.js`,

    // Handle module aliases
    '@pages/(.*)$': '<rootDir>/pages/$1',
    '@components/(.*)$': '<rootDir>/components/$1',
    '@core/(.*)$': '<rootDir>/lib/core/$1',
    '@hooks/(.*)$': '<rootDir>/hooks/$1',
    '@styles/(.*)$': '<rootDir>/styles/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: [
          [
            'next/babel',
            {
              'styled-jsx': {
                plugins: ['@styled-jsx/plugin-sass'],
              },
            },
          ],
        ],
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  testEnvironment: 'jest-environment-jsdom',
}
