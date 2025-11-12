// __tests__/PokemonCard.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PokemonCard } from '../src/components/PokemonCard';

const mockPokemon = {
  name: 'pikachu',
  url: 'https://pokeapi.co/api/v2/pokemon/25/'
};

test('PokemonCard renderiza corretamente e responde a pressionamentos', () => {
  const mockOnPress = jest.fn();
  
  const { getByText } = render(
    <PokemonCard pokemon={mockPokemon} onPress={mockOnPress} />
  );

  // Verifica se o nome do Pokémon aparece
  expect(getByText('pikachu')).toBeTruthy();
  
  // Simula o pressionamento do card
  fireEvent.press(getByText('pikachu'));
  
  // Verifica se a função foi chamada
  expect(mockOnPress).toHaveBeenCalledWith(mockPokemon);
});