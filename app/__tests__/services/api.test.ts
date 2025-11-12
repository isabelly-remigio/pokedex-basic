// CORREÇÃO: Importar do caminho correto
import { PokemonAPI } from '../../src/services/api';

// Mock do fetch global
global.fetch = jest.fn();

describe('PokemonAPI', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test('carregarListaPokemon é uma função', () => {
    expect(typeof PokemonAPI.carregarListaPokemon).toBe('function');
  });

  test('deve fazer chamada API com parâmetros corretos', async () => {
    const mockResponse = {
      count: 100,
      results: [{ name: 'pikachu', url: 'url' }]
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const resultado = await PokemonAPI.carregarListaPokemon(20, 0);

    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
    );
    expect(resultado).toEqual(mockResponse);
  });
});