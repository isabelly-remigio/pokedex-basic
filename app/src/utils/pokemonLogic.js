// Lógica pura da Pokédex - CommonJS para compatibilidade

const calcularTotalPaginas = (totalItens, limite) => {
  return Math.ceil(totalItens / limite);
};

const filtrarPokemon = (pokemons, termo) => {
  if (!termo || termo.length < 3) return [];
  
  return pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(termo.toLowerCase())
  );
};

const calcularOffset = (pagina, limite) => {
  return (pagina - 1) * limite;
};

const validarTermoBusca = (termo) => {
  return termo && termo.length >= 3;
};

const formatarDadosPokemon = (dadosAPI) => {
  if (!dadosAPI || !dadosAPI.results) return [];
  return dadosAPI.results.map(pokemon => ({
    name: pokemon.name,
    url: pokemon.url
  }));
};

// ✅ CommonJS export
module.exports = {
  calcularTotalPaginas,
  filtrarPokemon,
  calcularOffset,
  validarTermoBusca,
  formatarDadosPokemon
};