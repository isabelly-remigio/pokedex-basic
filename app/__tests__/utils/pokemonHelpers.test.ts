// CORREÇÃO: Importar do caminho correto - apenas 2 níveis acima
import { calcularTotalPaginas, filtrarPokemon, calcularOffset } from '../../src/utils/pokemonHelpers';

test('calcularTotalPaginas funciona corretamente', () => {
  expect(calcularTotalPaginas(100, 20)).toBe(5);
  expect(calcularTotalPaginas(15, 20)).toBe(1);
});

test('filtrarPokemon funciona corretamente', () => {
  const pokemons = [
    { name: 'pikachu' },
    { name: 'charmander' },
    { name: 'charizard' }
  ];
  
  const resultado = filtrarPokemon(pokemons, 'char');
  expect(resultado).toHaveLength(2);
});

test('calcularOffset funciona corretamente', () => {
  expect(calcularOffset(1, 20)).toBe(0);
  expect(calcularOffset(2, 20)).toBe(20);
});