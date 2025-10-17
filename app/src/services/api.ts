const BASE_URL = 'https://pokeapi.co/api/v2';

export class PokemonAPI {
  static async carregarListaPokemon(limite: number = 20, offset: number = 0) {
    const resposta = await fetch(
      `${BASE_URL}/pokemon?limit=${limite}&offset=${offset}`
    );
    
    if (!resposta.ok) {
      throw new Error('Erro ao carregar lista de Pokémon');
    }
    
    return await resposta.json();
  }

  static async buscarPokemonPorNome(nome: string) {
    const resposta = await fetch(`${BASE_URL}/pokemon/${nome.toLowerCase()}`);
    
    if (resposta.status === 404) {
      throw new Error('Pokémon não encontrado');
    }
    
    if (!resposta.ok) {
      throw new Error('Erro ao buscar Pokémon');
    }
    
    return await resposta.json();
  }

  static async carregarDetalhesPokemon(url: string) {
    const resposta = await fetch(url);
    
    if (!resposta.ok) {
      throw new Error('Erro ao carregar detalhes do Pokémon');
    }
    
    return await resposta.json();
  }
}