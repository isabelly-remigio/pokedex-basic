import React from 'react';
import { Box, Text, Pressable, Image, VStack, Button } from 'native-base';
import { PokemonListagem } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonListagem;
  onPress: (pokemon: PokemonListagem) => void;
  onVerDetalhes: (pokemon: PokemonListagem) => void;
}

export function PokemonCard({ pokemon, onPress, onVerDetalhes }: PokemonCardProps) {
  const numeroPokemon = pokemon.url.split('/').filter(Boolean).pop();
  const nomeFormatado = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${numeroPokemon}.png`;

  return (
    <Pressable onPress={() => onPress(pokemon)} flex={1} minW="20%">
      {({ isPressed }) => (
        <Box
          bg={isPressed ? 'gray.100' : 'white'}
          p={3}
          m={1}
          borderRadius={12}
          shadow={2}
          borderWidth={1}
          borderColor="gray.200"
          alignItems="center"
          minH={120}
        >
          <Image
            source={{ uri: imagem }}
            alt={nomeFormatado}
            size="xs"
            resizeMode="contain"
            mb={2}
          />

          <Text fontSize="xs" fontWeight="bold" color="gray.800" textAlign="center" mb={2}>
            {nomeFormatado}
          </Text>

          {/* Botão Ver Detalhes */}
          <Button
            size="sm"
            colorScheme="blue"
            variant="outline"
            onPress={(e) => {
              e.stopPropagation();
              onVerDetalhes(pokemon);
            }}
            _text={{ fontSize: '2xs', fontWeight: 'bold' }}
            px={2}
            py={1}
            width="100%"
          >
            Detalhes
          </Button>
        </Box>
      )}
    </Pressable>
  );
}