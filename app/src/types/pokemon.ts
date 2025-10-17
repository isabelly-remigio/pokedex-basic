export interface PokemonListagem {
  name: string;
  url: string;
}

export interface PokemonListagemResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListagem[];
}

export interface PokemonTipo {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonHabilidade {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string;
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface PokemonDetalhe {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: PokemonTipo[];
  abilities: PokemonHabilidade[];
  stats: PokemonStat[];
  height: number;  
  weight: number;    
}