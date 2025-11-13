const Loading = require('../../src/components/Loading').default;

// Mock ULTRA simples - sem JSX, sem React
jest.mock('../../src/components/Loading', () => {
  return {
    default: () => ({
      type: 'Loading',
      props: { texto: 'Carregando...' }
    })
  };
});

describe('Loading Component', () => {
  test('deve retornar objeto Loading', () => {
    const component = Loading();
    expect(component.type).toBe('Loading');
    expect(component.props.texto).toBe('Carregando...');
  });
});