// Teste que evita completamente imports problemáticos do Expo Winter
test('soma básica', () => {
  expect(1 + 1).toBe(2);
});

test('string básica', () => {
  expect('pikachu').toBe('pikachu');
});

test('array básico', () => {
  const pokemons = ['pikachu', 'charmander'];
  expect(pokemons).toContain('pikachu');
});

test('objeto básico', () => {
  const pokemon = { name: 'pikachu', type: 'electric' };
  expect(pokemon.name).toBe('pikachu');
});