// Teste de serviços em JavaScript
const { PokemonAPI } = require('../../src/services/api');

// Mock do fetch
global.fetch = jest.fn();

describe('PokemonAPI', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('carregarListaPokemon é uma função', () => {
    expect(typeof PokemonAPI.carregarListaPokemon).toBe('function');
  });

  test('deve fazer chamada API com URL correta', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ count: 100, results: [] })
    };

    fetch.mockResolvedValue(mockResponse);

    await PokemonAPI.carregarListaPokemon(20, 0);

    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
    );
  });
});