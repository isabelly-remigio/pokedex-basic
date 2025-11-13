// Configuração ULTRA-SIMPLES - ignora tudo
module.exports = {
  testEnvironment: 'node', // Ambiente Node puro
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/' // IGNORA TUDO
  ],
  testMatch: [
    '**/__tests__/components/**/*.test.js'
  ],
  setupFiles: [],
  setupFilesAfterEnv: [],
  moduleNameMapper: {}
};



