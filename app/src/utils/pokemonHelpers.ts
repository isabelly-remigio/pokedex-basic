export const calcularTotalPaginas = (totalItens: number, limite: number): number => {
  return Math.ceil(totalItens / limite);
};

export const filtrarPokemon = (pokemons: any[], termo: string): any[] => {
  if (!termo || termo.length < 3) return [];
  
  return pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(termo.toLowerCase())
  );
};

export const calcularOffset = (pagina: number, limite: number): number => {
  return (pagina - 1) * limite;
};