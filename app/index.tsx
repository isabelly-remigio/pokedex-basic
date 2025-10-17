import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,VStack, HStack, Input, Button, Text,
  FlatList,Center,} from 'native-base';
import { useRouter } from 'expo-router';
import { PokemonAPI } from './src/services/api';
import { PokemonCard } from './src/components/PokemonCard';
import { Loading } from './src/components/Loading';
import { ErrorMessage } from './src/components/ErrorMessage';
import { Paginacao } from './src/components/Paginacao';
import { PokemonListagem, PokemonListagemResponse, PokemonDetalhe } from './src/types/pokemon';
import { debounce } from 'lodash';

export default function ListaPokemon() {
  const router = useRouter();
  const [listaPokemon, setListaPokemon] = useState<PokemonListagem[]>([]);
  const [resultadosBusca, setResultadosBusca] = useState<PokemonListagem[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [buscando, setBuscando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [textoBusca, setTextoBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [modoBusca, setModoBusca] = useState(false);
  
  const limite = 20;
  const itensPorLinha = 4;

  const calcularTotalPaginas = (totalItens: number) => {
    return Math.ceil(totalItens / limite);
  };

  const carregarPagina = async (pagina: number = 1) => {
    try {
      setCarregando(true);
      setErro(null);
      setModoBusca(false);
      
      const offset = (pagina - 1) * limite;
      const dados: PokemonListagemResponse = await PokemonAPI.carregarListaPokemon(
        limite,
        offset
      );
      
      setListaPokemon(dados.results);
      setPaginaAtual(pagina);
      
      const totalPaginasCalculado = calcularTotalPaginas(dados.count);
      setTotalPaginas(totalPaginasCalculado);
      
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setCarregando(false);
    }
  };

  // Função de busca com debounce - controle na hora da
  //busca, ou seja, evitar sobrecarregar a api
  const buscarPokemon = useCallback(
    debounce(async (termo: string) => {
      if (termo.length < 3) {
        setModoBusca(false);
        setResultadosBusca([]);
        return;
      }

      try {
        setBuscando(true);
        setErro(null);
        
        const dados: PokemonListagemResponse = await PokemonAPI.carregarListaPokemon(1000, 0);
        const resultados = dados.results.filter(pokemon =>
          pokemon.name.toLowerCase().includes(termo.toLowerCase())
        );
        
        setResultadosBusca(resultados);
        setModoBusca(true);
        
      } catch (error) {
        setErro(error instanceof Error ? error.message : 'Erro na busca');
      } finally {
        setBuscando(false);
      }
    }, 500),
    []
  );

  //modo de pesquisa da barra de pesquisa
  useEffect(() => {
    if (textoBusca.trim()) {
      buscarPokemon(textoBusca.trim());
    } else {
      setModoBusca(false);
      setResultadosBusca([]);
    }
  }, [textoBusca, buscarPokemon]);

  const limparBusca = () => {
    setTextoBusca('');
    setModoBusca(false);
    setResultadosBusca([]);
    carregarPagina(1);
  };

  const navegarParaDetalhes = (pokemon: PokemonListagem) => {
    const nomePokemon = pokemon.name;
    router.push(`/detalhes/${nomePokemon}`);
  };

  const mudarPagina = (novaPagina: number) => {
    if (novaPagina >= 1 && novaPagina <= totalPaginas) {
      carregarPagina(novaPagina);
    }
  };

  const dadosParaExibir = modoBusca ? resultadosBusca : listaPokemon;

  useEffect(() => {
    carregarPagina(1);
  }, []);

  if (carregando && listaPokemon.length === 0) {
    return <Loading />;
  }

  if (erro && listaPokemon.length === 0) {
    return (
      <ErrorMessage
        mensagem={erro}
        onTentarNovamente={() => carregarPagina(paginaAtual)}
      />
    );
  }

  return (
    <Box flex={1} bg="gray.50" safeArea>
      <VStack flex={1} p={4} space={4}>
        <Box bg="white" p={4} borderRadius={12} shadow={2}>
          <VStack space={3}>
            <Text fontSize="2xl" fontWeight="bold" color="blue.600" textAlign="center">
              Pokédex
            </Text>
            {/* //barra de pesqusa */}
            <HStack space={2} alignItems="center">
              <Input
                flex={1}
                placeholder="Digite pelo menos 3 caracteres..."
                value={textoBusca}
                onChangeText={setTextoBusca}
                returnKeyType="search"
                size="lg"
              />
              {modoBusca && (
                <Button 
                  onPress={limparBusca} 
                  colorScheme="gray"
                  size="lg"
                >
                  Limpar
                </Button>
              )}
            </HStack>

            {textoBusca.length > 0 && textoBusca.length < 3 && (
              <Text fontSize="sm" color="orange.600" textAlign="center">
                Digite pelo menos 3 caracteres
              </Text>
            )}

            {modoBusca && (
              <Text fontSize="sm" color="blue.600" textAlign="center">
                {resultadosBusca.length} Pokémon(s) encontrado(s) para "{textoBusca}"
              </Text>
            )}
          </VStack>
        </Box>

        {buscando ? (
          <Loading texto="Buscando Pokémon..." />
        ) : erro && modoBusca ? (
          <ErrorMessage
            mensagem={erro}
            onTentarNovamente={() => buscarPokemon(textoBusca)}
          />
        ) : (
          <VStack flex={1} space={4}>
            <Box flex={1} bg="white" borderRadius={12} p={3} shadow={1}>
              {dadosParaExibir.length === 0 && modoBusca ? (
                <Center flex={1}>
                  <Text fontSize="lg" color="gray.500">
                    Nenhum Pokémon encontrado para "{textoBusca}"
                  </Text>
                </Center>
              ) : (
                <FlatList
                  data={dadosParaExibir}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => (
                    <PokemonCard 
                      pokemon={item} 
                      onPress={navegarParaDetalhes}
                      onVerDetalhes={navegarParaDetalhes}
                    />
                  )}
                  numColumns={itensPorLinha}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ 
                    paddingBottom: 10,
                    flexGrow: dadosParaExibir.length === 0 ? 1 : 0 
                  }}
                />
              )}
            </Box>

            {!modoBusca && dadosParaExibir.length > 0 && (
              <Paginacao
                paginaAtual={paginaAtual}
                totalPaginas={totalPaginas}
                onMudarPagina={mudarPagina}
              />
            )}
          </VStack>
        )}
      </VStack>
    </Box>
  );
}