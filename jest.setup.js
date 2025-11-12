// jest.setup.js - Versão Super Simplificada

// Apenas o essencial
global.fetch = jest.fn();

// Mock mínimo do Expo Router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  }),
}));

// Mock mínimo do Lodash
jest.mock('lodash', () => ({
  debounce: (fn) => fn,
}));