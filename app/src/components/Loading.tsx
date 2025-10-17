import React from 'react';
import { Center, Spinner, Text } from 'native-base';

interface LoadingProps {
  texto?: string;
}

export function Loading({ texto = 'Carregando...' }: LoadingProps) {
  return (
    <Center flex={1}>
      <Spinner size="lg" color="blue.500" />
      <Text mt={2} fontSize="md" color="gray.600">
        {texto}
      </Text>
    </Center>
  );
}