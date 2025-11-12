module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(|-.*)|@expo(|-.*)|@testing-library|native-base))'
  ],
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1'
  },
  setupFiles: [
    './jest.setup.js'
  ],
  testEnvironment: 'node'
};