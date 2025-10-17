import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Text,
  Image,
  HStack,
  Badge,
  ScrollView,
  Button,
  Center,
  Progress,
} from 'native-base';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Loading } from '../src/components/Loading';
import { ErrorMessage } from '../src/components/ErrorMessage';
import { PokemonDetalhe } from "../src/types/pokemon"
import { PokemonAPI } from '../src/services/api';
export default function DetalhePokemon() {
  const { nome } = useLocalSearchParams();
  const router = useRouter();
  const [pokemonDetalhe, setPokemonDetalhe] = useState<PokemonDetalhe | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // cor baseada no tipo do pokemon
  const obterCorDoTipo = (tipo: string) => {
    const cores: { [key: string]: string } = {
      normal: 'gray',
      fire: 'red',
      water: 'blue',
      electric: 'yellow',
      grass: 'green',
      ice: 'cyan',
      fighting: 'orange',
      poison: 'purple',
      ground: 'amber',
      flying: 'indigo',
      psychic: 'pink',
      bug: 'lime',
      rock: 'warmGray',
      ghost: 'violet',
      dragon: 'orange',
      dark: 'dark',
      steel: 'trueGray',
      fairy: 'pink',
    };
    return cores[tipo] || 'blue';
  };

  const carregarDetalhesPokemon = async () => {
    try {
      setCarregando(true);
      setErro(null);
      
      if (typeof nome !== 'string') {
        throw new Error('Nome do Pokémon inválido');
      }
      
      const dados = await PokemonAPI.buscarPokemonPorNome(nome);
      setPokemonDetalhe(dados);
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro ao carregar detalhes');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (nome) {
      carregarDetalhesPokemon();
    }
  }, [nome]);

  if (carregando) {
    return <Loading texto="Carregando detalhes..." />;
  }

  if (erro || !pokemonDetalhe) {
    return (
      <Center flex={1} bg="gray.50">
        <ErrorMessage
          mensagem={erro || 'Pokémon não encontrado'}
          onTentarNovamente={carregarDetalhesPokemon}
        />
      </Center>
    );
  }

  const imagem =
    pokemonDetalhe.sprites.other['official-artwork'].front_default ||
    pokemonDetalhe.sprites.front_default;

  const nomeFormatado =
    pokemonDetalhe.name.charAt(0).toUpperCase() + pokemonDetalhe.name.slice(1);

  // Tradução dos nomes das estatísticas
  const nomesStats: { [key: string]: string } = {
    'hp': 'HP',
    'attack': 'Ataque',
    'defense': 'Defesa',
    'special-attack': 'Ataque Especial',
    'special-defense': 'Defesa Especial',
    'speed': 'Velocidade'
  };

  return (
    <Box flex={1} bg="gray.100" safeArea>
      <ScrollView flex={1} p={4}>

        <Box bg="white" borderRadius={20} shadow={4} p={6} mb={4}>
          <VStack space={6} alignItems="center">
            

            <VStack space={2} alignItems="center" w="100%">
              <Text fontSize="3xl" fontWeight="bold" color="gray.800" textAlign="center">
                {nomeFormatado}
              </Text>
              <Text fontSize="lg" color="gray.500" fontWeight="medium">
                #{pokemonDetalhe.id.toString().padStart(3, '0')}
              </Text>
            </VStack>


            <Box borderRadius={16} p={4} w="100%" alignItems="center">
              {imagem ? (
                <Image
                  source={{ uri: imagem }}
                  alt={nomeFormatado}
                  size="2xl"
                  resizeMode="contain"
                />
              ) : (
                <Center bg="gray.200" size="2xl" borderRadius={8}>
                  <Text color="gray.500">Sem imagem</Text>
                </Center>
              )}
            </Box>

            <VStack space={3} w="100%">
              <Text fontSize="xl" fontWeight="bold" color="gray.700" textAlign="center">
                Tipos
              </Text>
              <HStack space={2} justifyContent="center" flexWrap="wrap">
                {pokemonDetalhe.types.map((tipo) => (
                  <Badge
                    key={tipo.slot}
                    colorScheme={obterCorDoTipo(tipo.type.name)}
                    variant="solid"
                    borderRadius="full"
                    px={4}
                    py={2}
                    _text={{ fontSize: 'md', fontWeight: 'bold' }}
                  >
                    {tipo.type.name.toUpperCase()}
                  </Badge>
                ))}
              </HStack>
            </VStack>

            <VStack space={3} w="100%">
              <Text fontSize="xl" fontWeight="bold" color="gray.700" textAlign="center">
                Habilidades
              </Text>
              <HStack space={2} justifyContent="center" flexWrap="wrap">
                {pokemonDetalhe.abilities.map((habilidade, index) => (
                  <Badge
                    key={habilidade.ability.name}
                    colorScheme="blue"
                    variant="subtle"
                    borderRadius="full"
                    px={4}
                    py={2}
                    _text={{ fontSize: 'sm', fontWeight: 'medium' }}
                  >
                    {habilidade.ability.name}
                    {habilidade.is_hidden && ' (Oculta)'}
                  </Badge>
                ))}
              </HStack>
            </VStack>

            <VStack space={4} w="100%">
              <Text fontSize="xl" fontWeight="bold" color="gray.700" textAlign="center">
                Estatísticas
              </Text>
              <VStack space={3}>
                {pokemonDetalhe.stats.map((stat) => {
                  const porcentagem = Math.min((stat.base_stat / 255) * 100, 100);
                  const nomeTraduzido = nomesStats[stat.stat.name] || stat.stat.name;
                  
                  return (
                    <VStack key={stat.stat.name} space={2}>
                      <HStack justifyContent="space-between" alignItems="center">
                        <Text fontWeight="medium" color="gray.600" fontSize="md" flex={1}>
                          {nomeTraduzido}
                        </Text>
                        <Text fontWeight="bold" color="gray.800" fontSize="md" minW={10} textAlign="right">
                          {stat.base_stat}
                        </Text>
                      </HStack>
                      <Progress 
                        value={porcentagem} 
                        colorScheme={
                          porcentagem > 70 ? 'green' : 
                          porcentagem > 40 ? 'yellow' : 'red'
                        }
                        bg="gray.200"
                        borderRadius="full"
                        size="lg"
                      />
                    </VStack>
                  );
                })}
              </VStack>
            </VStack>

            <HStack space={6} justifyContent="center" w="100%" pt={4}>
              <VStack alignItems="center" space={1}>
                <Text fontSize="sm" color="gray.500" fontWeight="medium">
                  Altura
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="gray.800">
                  {(pokemonDetalhe.height / 10).toFixed(1)} m
                </Text>
              </VStack>
              
              <VStack alignItems="center" space={1}>
                <Text fontSize="sm" color="gray.500" fontWeight="medium">
                  Peso
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="gray.800">
                  {(pokemonDetalhe.weight / 10).toFixed(1)} kg
                </Text>
              </VStack>
            </HStack>

          </VStack>
        </Box>

        <Button
          onPress={() => router.back()}
          colorScheme="blue"
          size="lg"
          borderRadius={12}
          _text={{ fontSize: 'lg', fontWeight: 'bold' }}
          py={3}
        >
          Voltar
        </Button>
      </ScrollView>
    </Box>
  );
}