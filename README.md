# PsyMatch

PsyMatch é um projeto acadêmico desenvolvido para um trabalho da faculdade de Psicologia. A proposta é apresentar psicólogos históricos como se estivessem em um app de namoro, usando humor, linguagem acessível e elementos de interface inspirados em apps de match para reforçar a aprendizagem.

## Objetivo

O projeto foi construído para:

- transformar nomes importantes da Psicologia em perfis memoráveis
- aproximar conceitos teóricos de um formato popular e reconhecível
- testar um MVP interativo com foco em engajamento, humor e clareza didática
- servir como artefato de apresentação em contexto universitário

## Funcionalidades atuais

- fluxo de descoberta com swipe entre eras históricas e perfis
- cards temáticos para escolas da Psicologia, como Estruturalismo e Behaviorismo
- tela de matches com revisão de perfil completo
- inbox com conversa inicial automática após o match
- persistência local de progresso, matches e mensagens via `localStorage`
- base preparada para internacionalização com infraestrutura de locale
- seletor visual de idioma exibido apenas na home

## Stack

- `Next.js 15` com `App Router`
- `React 19`
- `TypeScript`
- `Tailwind CSS`
- `Framer Motion`
- `localStorage` para persistência local

## Como rodar

```bash
npm install
npm run dev
```

Scripts disponíveis:

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Estrutura

```text
.
├── app
│   ├── discover
│   │   ├── _components
│   │   ├── _lib
│   │   └── page.tsx
│   ├── matches/page.tsx
│   ├── messages
│   │   ├── [slug]/page.tsx
│   │   └── page.tsx
│   ├── home-copy.ts
│   ├── ui-copy.ts
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── era-card.tsx
│   ├── intro-form.tsx
│   ├── language-switcher.tsx
│   ├── match-modal.tsx
│   ├── message-notice.tsx
│   └── profile-card.tsx
├── data
│   └── psychologists.ts
├── lib
│   ├── chats.ts
│   ├── i18n-client.tsx
│   ├── i18n.ts
│   └── storage.ts
└── public
    └── placeholders
```

## Como o projeto está organizado

- `app/` concentra as rotas e o fluxo principal da aplicação
- `app/discover/_components` agrupa blocos visuais específicos da tela de descoberta
- `app/discover/_lib` concentra estado, configuração e cópia da experiência de descoberta
- `components/` guarda componentes reutilizáveis de interface
- `data/` concentra a base editorial dos perfis e das eras
- `lib/` guarda regras de persistência, chat e internacionalização
- `public/placeholders/` armazena imagens e artes usadas pelos cards

## Uso de TypeScript

TypeScript foi adotado para manter o projeto mais previsível e fácil de evoluir. O uso principal hoje está em:

- tipagem do modelo `Psychologist`, `SchoolEra` e `DiscoverItem` em [data/psychologists.ts](/home/igor/Projects/psymatch/data/psychologists.ts)
- tipagem do estado local e dos chats em [lib/storage.ts](/home/igor/Projects/psymatch/lib/storage.ts)
- contratos de componentes via `props`
- proteção contra inconsistências de estado entre `discover`, `matches` e `messages`
- infraestrutura de valores localizados em [lib/i18n.ts](/home/igor/Projects/psymatch/lib/i18n.ts)

## Internacionalização

O projeto já possui base para múltiplos idiomas:

- valores textuais localizados com fallback
- provider reativo de locale no cliente
- cópias separadas por tela para evitar texto solto dentro dos componentes

Neste momento, a interface pública mantém apenas a opção visual de `pt-BR`, mas a estrutura para expansão futura já está preparada.
