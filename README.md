# 🎯 Mini Pokédex

Uma aplicação mobile desenvolvida em React Native com Expo que consome a PokeAPI para listar e buscar informações sobre Pokémon.

## 📱 Funcionalidades

- **Listagem de Pokémon** com paginação numérica
- **Busca em tempo real** após 3 caracteres
- **Detalhes completos** de cada Pokémon
- **Interface moderna** e responsiva
- **Tratamento de erros** amigável

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Native Base](https://nativebase.io/)
- [Expo Router](https://docs.expo.dev/routing/introduction/)
- [PokeAPI](https://pokeapi.co/)

## 📦 Estrutura do Projeto

```
mini-pokedex/
├── app/                    # Rotas do Expo Router
│   ├── _layout.tsx        # Layout principal
│   ├── index.tsx          # Tela inicial (lista)
│   └── detalhes/          # Tela de detalhes
│       └── [nome].tsx     # Rota dinâmica
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── PokemonCard.tsx
│   │   ├── Loading.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── Paginacao.tsx
│   ├── types/            # Definições TypeScript
│   │   └── pokemon.ts
│   └── services/         # Serviços da API
│       └── api.ts
└── package.json
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+ instalado
- Expo CLI instalada globalmente (`npm install -g expo-cli`)
- App Expo Go no celular ou emulador

### Instalação e Execução

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd pokedec-basic
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto**
```bash
npx expo start
```

4. **Escaneie o QR Code**
- Abra o app **Expo Go** no seu celular
- Escaneie o QR code que aparecer no terminal
- Ou pressione `a` para abrir no Android Emulator
- Ou pressione `i` para abrir no iOS Simulator

## 📋 Funcionalidades Detalhadas

### 🏠 Tela Principal
- Grid de Pokémon com 5 cards por linha
- Paginação numérica (ex: 1, 2, 3, ...)
- Busca automática após 3 caracteres
- Loading states durante carregamento
- Tratamento de erros de conexão

### 🔍 Sistema de Busca
- **Busca em tempo real**: Ativada automaticamente após 3 caracteres
- **Debounce**: Espera 500ms após a última digitação
- **Filtro local**: Busca nos nomes dos Pokémon
- **Resultados instantâneos**: Mostra na mesma tela
- **Botão limpar**: Volta para lista completa

### 📄 Tela de Detalhes
- Informações completas do Pokémon
- Imagem oficial ou sprite de fallback
- Tipos com cores temáticas
- Habilidades e estatísticas
- Barras de progresso coloridas
- Altura e peso convertidos

## 🎨 Componentes Principais

### PokemonCard
- Exibe imagem, nome e botão de detalhes
- Design limpo e responsivo
- Pressable com feedback visual

### Paginacao
- Navegação numérica entre páginas
- Indicador de página atual/total
- Botões anterior/próximo

### Loading & ErrorMessage
- Estados de carregamento com spinner
- Mensagens de erro amigáveis
- Botão "Tentar Novamente"

## 🔧 Desenvolvimento

### Adicionar Novas Funcionalidades
1. Crie componentes em `src/components/`
2. Defina tipos em `src/types/`
3. Adicione serviços em `src/services/`
4. Crie rotas em `app/`

### Estrutura de Pastas
- `app/`: Rotas e layouts (Expo Router)
- `src/components/`: Componentes reutilizáveis
- `src/types/`: Definições TypeScript
- `src/services/`: Integrações com APIs

## 🌐 API Utilizada

**PokeAPI**: https://pokeapi.co/
- Endpoint de listagem: `/pokemon?limit=20&offset=0`
- Endpoint de detalhes: `/pokemon/{nome-ou-id}`
- Rate limit: Livre para uso educacional

## 📸 Capturas de Tela

*(Adicione screenshots do projeto aqui)*

- Tela inicial com grid de Pokémon
- Tela de detalhes com informações completas
- Sistema de busca em ação

## 📄 Licença

Este projeto é para fins educacionais e utiliza a PokeAPI que é livre para uso.

## 👨‍💻 Autor

Desenvolvido como parte de um mini-projeto para aprendizado de React Native com Expo.

---

