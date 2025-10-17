import React from 'react';
import { HStack, Button, Text, Box } from 'native-base';

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onMudarPagina: (pagina: number) => void;
}

export function Paginacao({ paginaAtual, totalPaginas, onMudarPagina }: PaginacaoProps) {
  const gerarBotoesPagina = () => {
    const botoes = [];
    const maxBotoes = 5;
    
    let inicio = Math.max(1, paginaAtual - Math.floor(maxBotoes / 2));
    let fim = Math.min(totalPaginas, inicio + maxBotoes - 1);
    
    inicio = Math.max(1, fim - maxBotoes + 1);

    if (paginaAtual > 1) {
      botoes.push(
        <Button
          key="anterior"
          size="sm"
          variant="outline"
          colorScheme="blue"
          onPress={() => onMudarPagina(paginaAtual - 1)}
        >
          ‹
        </Button>
      );
    }

    if (inicio > 1) {
      botoes.push(
        <Button
          key={1}
          size="sm"
          variant="outline"
          colorScheme="blue"
          onPress={() => onMudarPagina(1)}
        >
          1
        </Button>
      );
      if (inicio > 2) {
        botoes.push(
          <Text key="ellipsis1" mx={1} color="gray.500">
            ...
          </Text>
        );
      }
    }

    for (let i = inicio; i <= fim; i++) {
      botoes.push(
        <Button
          key={i}
          size="sm"
          variant={i === paginaAtual ? 'solid' : 'outline'}
          colorScheme="blue"
          onPress={() => onMudarPagina(i)}
        >
          {i}
        </Button>
      );
    }

    if (fim < totalPaginas) {
      if (fim < totalPaginas - 1) {
        botoes.push(
          <Text key="ellipsis2" mx={1} color="gray.500">
            ...
          </Text>
        );
      }
      botoes.push(
        <Button
          key={totalPaginas}
          size="sm"
          variant="outline"
          colorScheme="blue"
          onPress={() => onMudarPagina(totalPaginas)}
        >
          {totalPaginas}
        </Button>
      );
    }

    if (paginaAtual < totalPaginas) {
      botoes.push(
        <Button
          key="proximo"
          size="sm"
          variant="outline"
          colorScheme="blue"
          onPress={() => onMudarPagina(paginaAtual + 1)}
        >
          ›
        </Button>
      );
    }

    return botoes;
  };

  return (
    <Box bg="white" p={3} borderRadius={8} shadow={1}>
      <HStack space={2} justifyContent="center" alignItems="center" flexWrap="wrap">
        {gerarBotoesPagina()}
      </HStack>
      <Text textAlign="center" mt={2} fontSize="sm" color="gray.600">
        Página {paginaAtual} de {totalPaginas}
      </Text>
    </Box>
  );
}