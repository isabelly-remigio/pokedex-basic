// Setup SIMPLIFICADO para componentes - sem React Native problemático

// Mock do React Native - versão SIMPLES
jest.mock('react-native', () => {
  const React = require('react');
  return {
    StyleSheet: {
      create: (styles) => styles,
    },
    View: ({ children, ...props }) => React.createElement('div', props, children),
    Text: ({ children, ...props }) => React.createElement('span', props, children),
    TouchableOpacity: ({ children, onPress, ...props }) => 
      React.createElement('button', { ...props, onClick: onPress }, children),
    FlatList: ({ data, renderItem, ...props }) => 
      React.createElement('div', props, 
        data?.map((item, index) => renderItem({ item, index }))),
    SafeAreaView: ({ children, ...props }) => React.createElement('div', props, children),
    Platform: {
      OS: 'web',
    },
  };
});

// Mock do Expo Router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  }),
}));

// Mock do Native Base - versão SIMPLES
jest.mock('native-base', () => {
  const React = require('react');
  return {
    Box: ({ children, ...props }) => React.createElement('div', props, children),
    Text: ({ children, ...props }) => React.createElement('span', props, children),
    VStack: ({ children, ...props }) => React.createElement('div', props, children),
    HStack: ({ children, ...props }) => React.createElement('div', props, children),
    Input: (props) => React.createElement('input', props),
    Button: ({ children, onPress, ...props }) => 
      React.createElement('button', { ...props, onClick: onPress }, children),
    FlatList: ({ data, renderItem, ...props }) => 
      React.createElement('div', props, 
        data?.map((item, index) => renderItem({ item, index }))),
    Center: ({ children, ...props }) => React.createElement('div', props, children),
  };
});

// Mock global do fetch
global.fetch = jest.fn();

// Mock do Lodash
jest.mock('lodash', () => ({
  debounce: (fn) => {
    const wrapped = (...args) => fn(...args);
    wrapped.cancel = jest.fn();
    return wrapped;
  },
}));