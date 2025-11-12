import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ListaPokemon from '../../index'; // CORREÇÃO: Import correto

// CORREÇÃO: Mock do caminho correto
jest.mock('../../src/services/api', () => ({
  PokemonAPI: {
    carregarListaPokemon: jest.fn(),
  },
}));

// Mock do Expo Router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  }),
}));

// Mock dos componentes filhos - CORREÇÃO: caminhos corretos
jest.mock('../../src/components/PokemonCard', () => {
  const { Text, TouchableOpacity } = require('react-native');
  return ({ pokemon, onPress }: any) => (
    <TouchableOpacity onPress={() => onPress(pokemon)} testID="pokemon-card">
      <Text>{pokemon.name}</Text>
    </TouchableOpacity>
  );
});

jest.mock('../../src/components/Loading', () => {
  const { Text } = require('react-native');
  return ({ texto }: any) => <Text testID="loading">{texto || 'Carregando...'}</Text>;
});

jest.mock('../../src/components/ErrorMessage', () => {
  const { Text, TouchableOpacity } = require('react-native');
  return ({ mensagem, onTentarNovamente }: any) => (
    <TouchableOpacity onPress={onTentarNovamente} testID="error-message">
      <Text>{mensagem}</Text>
      <Text>Tentar Novamente</Text>
    </TouchableOpacity>
  );
});

describe('ListaPokemon - Componente Principal', () => {
  const mockPokemons = {
    count: 3,
    results: [
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ],
  };

  beforeEach(() => {
    require('../../src/services/api').PokemonAPI.carregarListaPokemon.mockResolvedValue(mockPokemons);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deve exibir barra de pesquisa', () => {
    const { getByPlaceholderText } = render(<ListaPokemon />);
    
    const searchInput = getByPlaceholderText('Digite pelo menos 3 caracteres...');
    expect(searchInput).toBeTruthy();
  });

  test('deve carregar e exibir a lista de Pokémon', async () => {
    const { getByText, findByText } = render(<ListaPokemon />);

    expect(getByText('Carregando...')).toBeTruthy();

    const primeiroPokemon = await findByText('pikachu');
    expect(primeiroPokemon).toBeTruthy();

    const api = require('../../src/services/api').PokemonAPI;
    expect(api.carregarListaPokemon).toHaveBeenCalledWith(20, 0);
  });
});