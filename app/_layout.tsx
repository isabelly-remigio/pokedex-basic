import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';

export default function RootLayout() {
  return (
    <NativeBaseProvider>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Pokédex',
            headerStyle: {
              backgroundColor: '#3b82f6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} 
        />
        <Stack.Screen 
          name="detalhes/[nome]" 
          options={{ 
            title: 'Detalhes do Pokémon',
            headerBackTitle: 'Voltar',
            headerStyle: {
              backgroundColor: '#3b82f6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}