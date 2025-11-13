// // Configuração para React 18
// module.exports = {
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: [
//     '@testing-library/jest-native/extend-expect',
//     './jest.components.setup.js'
//   ],
//   transform: {
//     '^.+\\.[jt]sx?$': 'babel-jest',
//   },
//   transformIgnorePatterns: [
//     '/node_modules/(?!(react-native|@expo|expo|@testing-library)/)'
//   ],
//   testMatch: [
//     '**/__tests__/components/**/*.test.js'
//   ],
//   moduleFileExtensions: ['js', 'jsx'],
//   roots: ['<rootDir>/app'],
//   moduleNameMapper: {
//     '^react-native$': 'react-native-web',
//     '^@/(.*)$': '<rootDir>/app/$1'
//   },
//   setupFiles: [],
//   globals: {
//     __DEV__: true,
//   }
// };