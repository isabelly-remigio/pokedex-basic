// e2e/pokedexFlow.test.js
describe('Fluxo da Pokédex', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('deve buscar um Pokémon', async () => {
    await element(by.type('RCTTextView')).tap();
    await element(by.type('RCTTextView')).typeText('pikachu');
    
    await waitFor(element(by.text('pikachu')))
      .toBeVisible()
      .withTimeout(5000);
  });
});