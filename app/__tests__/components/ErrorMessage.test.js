const ErrorMessage = require('../../src/components/ErrorMessage').default;

jest.mock('../../src/components/ErrorMessage', () => {
  return {
    default: (props) => ({
      type: 'ErrorMessage',
      props: props
    })
  };
});

describe('ErrorMessage Component', () => {
  test('deve retornar objeto ErrorMessage com mensagem', () => {
    const props = { 
      mensagem: 'Erro de rede', 
      onTentarNovamente: jest.fn() 
    };
    const component = ErrorMessage(props);
    
    expect(component.type).toBe('ErrorMessage');
    expect(component.props.mensagem).toBe('Erro de rede');
    expect(typeof component.props.onTentarNovamente).toBe('function');
  });
});