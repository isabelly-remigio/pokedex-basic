// Teste MUITO simples para verificar se o Jest funciona
test('teste básico de matemática', () => {
  expect(1 + 1).toBe(2);
});

test('teste básico de string', () => {
  expect('pikachu').toContain('pika');
});