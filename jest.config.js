module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/ts-jest'
  },
  testEnvironment: 'node',
  testRegex: '/src/__tests__/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
