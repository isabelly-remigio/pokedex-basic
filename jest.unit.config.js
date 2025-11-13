// Configuração CORRIGIDA para testes unitários
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest', // ✅ AGORA VAI TRANSFORMAR ES6
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(your-es6-modules)/)' // Ignora node_modules, exceto ES6 modules
  ],
  testMatch: [
    '**/__tests__/unit/**/*.test.js'
  ],
  moduleFileExtensions: ['js'],
  roots: ['<rootDir>/app'],
  moduleDirectories: ['node_modules', 'app'],
  collectCoverageFrom: [
    'app/src/utils/**/*.js'
  ],
  coverageDirectory: 'coverage/unit'
};