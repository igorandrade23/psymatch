# PsyMatch

PsyMatch e um projeto academico feito para um trabalho da faculdade de Psicologia. A ideia e apresentar psicologos historicos como se estivessem em um app de namoro, usando humor, linguagem acessivel e elementos de interface inspirados em apps de match para reforcar a aprendizagem.

## Objetivo

O projeto foi construido para:

- transformar nomes importantes da Psicologia em perfis memoraveis
- aproximar conceitos teoricos de um formato popular e reconhecivel
- testar um MVP interativo com foco em engajamento, humor e clareza didatica
- servir como artefato de apresentacao para contexto universitario

## Stack

- `Next.js 15` com `App Router`
- `React 19`
- `TypeScript`
- `Tailwind CSS`
- `Framer Motion`
- `localStorage` para persistencia local

## Como rodar

```bash
npm install
npm run dev
```

Scripts disponiveis:

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Estrutura

```text
.
├── app
│   ├── discover/page.tsx
│   ├── matches/page.tsx
│   ├── messages/page.tsx
│   ├── messages/[slug]/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── intro-form.tsx
│   ├── match-modal.tsx
│   ├── message-notice.tsx
│   └── profile-card.tsx
├── data
│   └── psychologists.ts
├── docs
│   ├── decisoes-do-projeto.md
│   └── prd-validacao-mvp.md
└── lib
    ├── chats.ts
    └── storage.ts
```

## Como o projeto esta organizado

- `app/` concentra as rotas e fluxos principais
- `components/` guarda elementos reutilizaveis de interface
- `data/` concentra a base editorial dos perfis
- `lib/` guarda regras de persistencia e sincronizacao de chats
- `docs/` registra PRD, validacoes e decisoes do projeto

## Uso de TypeScript

TypeScript foi adotado para manter o projeto mais previsivel e facil de evoluir. O uso principal hoje esta em:

- tipagem do modelo `Psychologist` em [data/psychologists.ts](/home/igor/Projects/psymatch/data/psychologists.ts)
- tipagem de chats e estado local em [lib/storage.ts](/home/igor/Projects/psymatch/lib/storage.ts)
- contratos de componentes via `props`
- protecao contra inconsistencias de estado entre discover, matches e messages

