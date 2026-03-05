# Star Wars Explorer

Star Wars Explorer é uma aplicação web desenvolvida com Vite e React que permite explorar o universo de Star Wars utilizando dados da SWAPI (Star Wars API) e da Wikipedia REST API.

A aplicação permite navegar por personagens, planetas, naves, espécies e filmes. Também inclui um sistema de favoritos e um checklist de acompanhamento dos filmes com controle de ordem e progressão.


## Visão Geral

Este projeto foi desenvolvido como aplicação prática de estudo em React, com foco em:

- Arquitetura baseada em componentes
- Gerenciamento de estado global com Context API
- Consumo de APIs externas
- Roteamento com React Router
- Renderização condicional
- Filtros e ordenação de dados
- Persistência de dados com LocalStorage


## Tecnologias Utilizadas

- Vite
- React
- React Router DOM
- Context API
- JavaScript (ES6+)
- SWAPI (https://swapi.dev)
- Wikipedia REST API


## Principais Funcionalidades

### 1. Página Inicial

- Introdução ao universo de Star Wars
- Navegação para a página Explorer


### 2. Página Explorer

Navegação por abas entre:

- Personagens
- Planetas
- Naves
- Espécies
- Filmes

Cada seção possui:

- Campo de busca
- Filtros dinâmicos (gênero, clima, classificação etc.)
- Modal com informações detalhadas
- Botão para adicionar/remover dos favoritos
- Integração com imagem e descrição da Wikipedia (quando disponível)


### 3. Sistema de Favoritos

O usuário pode:

- Adicionar e remover favoritos
- Filtrar favoritos por tipo:
  - Filme
  - Personagem
  - Planeta
  - Espécie
  - Nave
- Manter os favoritos salvos mesmo após atualizar a página

Os favoritos são gerenciados globalmente via Context API.


### 4. Sistema de Ordenação dos Filmes

Os filmes podem ser ordenados por:

- Ordem de Lançamento
- Ordem Cronológica

A ordenação é controlada dinamicamente pelo estado global da aplicação.


### 5. Checklist de Filmes

Os filmes são organizados em três categorias:

- Para Assistir
- Assistindo
- Assistido

Regras de funcionamento:

- Não é possível iniciar um filme sem que o anterior (na ordem selecionada) esteja marcado como assistido.
- O status é controlado separadamente para cada tipo de ordenação.
- A validação da progressão é feita no contexto global.



## Como Rodar o Projeto

### 1. Clonar o repositório

git clone <https://github.com/deniselmatos/sw_explorer>

### 2. Acessar a pasta do projeto

cd nome-do-projeto

### 3. Instalar as dependências

npm install

### 4. Executar o projeto

npm run dev
