import React, { useState } from 'react';
import { Center, VStack, Text, Button } from 'native-base';
//tem que verificar qual o erro 
interface ErrorMessageProps {
  mensagem: string;
  onTentarNovamente?: () => void;
}

export function ErrorMessage({ mensagem, onTentarNovamente }: ErrorMessageProps) {
  const [tentando, setTentando] = useState(false);
  
  const mensagemFormatada = mensagem === 'Failed to fetch' 
    ? 'Erro no servidor' 
    : mensagem;

  const handleTentarNovamente = async () => {
    if (!onTentarNovamente) return;
    
    setTentando(true);
    
    try {
      // Força um pequeno delay para garantir que o estado seja resetado
      await new Promise(resolve => setTimeout(resolve, 100));
      await onTentarNovamente();
    } finally {
      setTentando(false);
    }
  };

  return (
    <Center flex={1} px={4}>
      <VStack space={4} alignItems="center">
        <Text fontSize="lg" textAlign="center" color="red.600">
          {mensagemFormatada}
        </Text>
        
        {onTentarNovamente && (
          <Button 
            onPress={handleTentarNovamente} 
            colorScheme="blue"
            isLoading={tentando}
            isLoadingText="Tentando..."
          >
            Tentar Novamente
          </Button>
        )}
      </VStack>
    </Center>
  );
}