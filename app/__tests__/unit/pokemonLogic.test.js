// TESTE UNITÁRIO - usando CommonJS para evitar problemas
const pokemonLogic = require('../../src/utils/pokemonLogic');

// Testes básicos de matemática primeiro
test('soma básica - teste de ambiente', () => {
  expect(1 + 1).toBe(2);
});

test('calcularTotalPaginas - casos básicos', () => {
  expect(pokemonLogic.calcularTotalPaginas(100, 20)).toBe(5);
  expect(pokemonLogic.calcularTotalPaginas(15, 20)).toBe(1);
});

test('calcularOffset - casos básicos', () => {
  expect(pokemonLogic.calcularOffset(1, 20)).toBe(0);
  expect(pokemonLogic.calcularOffset(2, 20)).toBe(20);
});

test('validarTermoBusca - casos básicos', () => {
  expect(pokemonLogic.validarTermoBusca('abc')).toBe(true);
  expect(pokemonLogic.validarTermoBusca('ab')).toBe(false);
});

// Testes mais completos
describe('Lógica da Pokédex', () => {
  const pokemonsTeste = [
    { name: 'pikachu', url: '1' },
    { name: 'charmander', url: '2' },
    { name: 'charizard', url: '3' }
  ];

  test('filtrarPokemon deve funcionar', () => {
    const resultado = pokemonLogic.filtrarPokemon(pokemonsTeste, 'char');
    expect(resultado).toHaveLength(2);
    expect(resultado[0].name).toBe('charmander');
  });

  test('filtrarPokemon retorna vazio para termo curto', () => {
    const resultado = pokemonLogic.filtrarPokemon(pokemonsTeste, 'a');
    expect(resultado).toHaveLength(0);
  });
});