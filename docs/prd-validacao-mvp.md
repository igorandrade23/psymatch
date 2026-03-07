# Validação do MVP PsyMatch vs PRD

**Data:** 07/03/2026  
**Versão avaliada:** MVP PRD enviado na conversa

## Resumo executivo
A implementação atual atende ao núcleo do MVP. A experiência está funcional para: entrada sem autenticação, fluxo cronológico de 2 perfis, ações de like/pass, modal de match imediato, página de matches e persistência local em `localStorage`. 

Há lacunas de maturidade em: cobertura de modo informativo/humorístico, animações do card (apenas modal usa animação), consistência editorial/linguística (acentuação e tom técnico), e algumas decisões de histórico/conteúdo ainda com simplificação forte.

---

## Cobertura por seção do PRD

### 1) Landing
- **Atende**:
  - Página inicial com conceito e CTA.
  - Entrada de nome única (`IntroForm`).
  - Sem login e sem email.
  - Ao iniciar, nome salvo em `localStorage` e redireciona para `/discover`.
- **Arquivo(s):** [components/intro-form.tsx](/home/igor/Projects/psymatch/components/intro-form.tsx), [app/page.tsx](/home/igor/Projects/psymatch/app/page.tsx)

### 2) Descoberta / fluxograma
- **Atende (base):**
  - Renderiza 1 perfil por vez e avança com pass/like.
  - Ordem fixa via array de `psychologists`.
  - Exibe progresso “Perfil X de Y”.
  - Mostra botão de alternar modo de escrita.
- **Observação:** o “modo divertido” alterna apenas o bloco principal entre `bio` e `labPuns[0]` (não altera todo o restante da ficha), então a cobertura completa de conteúdo em ambos os modos é parcial.
- **Arquivo(s):** [app/discover/page.tsx](/home/igor/Projects/psymatch/app/discover/page.tsx), [components/profile-card.tsx](/home/igor/Projects/psymatch/components/profile-card.tsx)

### 3) Card de perfil
- **Atende:**
  - Nome completo, role, idade, distância/joke, signo, escola, bio, interesses (`likes`), experimento, “o que procuro”, pun no lab.
- **Parcial:**
  - Não há seção explícita de “dislikes” renderizada (campo existe no tipo).
  - “Humor sem perder sentido educacional” ainda depende muito da edição do texto.
- **Arquivo(s):** [components/profile-card.tsx](/home/igor/Projects/psymatch/components/profile-card.tsx), [data/psychologists.ts](/home/igor/Projects/psymatch/data/psychologists.ts)

### 4) Like / Pass
- **Atende:**
  - Pass avança sem salvar.
  - Like salva em `likedSlugs` e não duplica.
- **Arquivo(s):** [app/discover/page.tsx](/home/igor/Projects/psymatch/app/discover/page.tsx)

### 5) Match Modal
- **Atende:**
  - Modal abre após like e mostra mensagem do perfil selecionado.
  - Fecha com CTA de continuação.
- **Limitação:**
  - Há animação, mas sem transição de card no swipe.
- **Arquivo(s):** [components/match-modal.tsx](/home/igor/Projects/psymatch/components/match-modal.tsx), [app/discover/page.tsx](/home/igor/Projects/psymatch/app/discover/page.tsx)

### 6) Página de matches
- **Atende:**
  - Lista likes locais, mostra mensagem de match.
  - Estado vazio tratado.
  - Ordem atual da listagem depende do filtro no array original (ordem dos dados).
- **Arquivo(s):** [app/matches/page.tsx](/home/igor/Projects/psymatch/app/matches/page.tsx)

### 7) Persistência local
- **Atende:**
  - Salva `userName`, `currentIndex`, `likedSlugs` em `localStorage`.
  - Recarregamento reabre progresso e matches salvos.
- **Arquivo(s):** [lib/storage.ts](/home/igor/Projects/psymatch/lib/storage.ts), [app/discover/page.tsx](/home/igor/Projects/psymatch/app/discover/page.tsx), [app/matches/page.tsx](/home/igor/Projects/psymatch/app/matches/page.tsx)

### 8) Escopo inicial (2 perfis)
- **Atende:**
  - Apenas Watson e Skinner carregados.
- **Arquivo(s):** [data/psychologists.ts](/home/igor/Projects/psymatch/data/psychologists.ts)

### 9) Requisitos técnicos
- **Atende:**
  - Next.js App Router.
  - TypeScript.
  - Tailwind no estilo.
  - Framer Motion usado.
  - Sem backend.
- **Observação:** armazenamento client-side centralizado de estado; não há store global fora de componente.

---

## Conformidade com requisitos não-funcionais de UX/design
- **Responsividade:** abordada por utilitários Tailwind e layout adaptável.
- **Direção visual “warm/serif” etc:** parcialmente atendida visualmente, mas ainda não totalmente alinhada (tipografia não foi validada no conteúdo do PRD).
- **Micro-animações:** somente modal com entrada/saída animada.
- **Acesso e legibilidade:** boa base, mas há textos sem acentuação e termos não normalizados.

---

## Riscos e lacunas técnicas a corrigir antes de produção
1. **Persistência sem validação de schema:** estado carregado de `localStorage` pode ficar inconsistente (ex.: index inválido). Recomenda-se validação defensiva e clamp do `currentIndex`.
2. **Fluxo de “match” em último item:** quando usuário dá like no último perfil, o índice avança e a mensagem de match é mostrada; validação UX deve manter leitura confortável e não pular visualmente o retorno ao estado “final”.
3. **Cobertura de modo divertido:** ampliar modo “divertido/informativo” para todos os blocos (bio, likes, experimento, etc.), com equivalência didática.
4. **Qualidade editorial:** corrigir gramática/acentuação e revisar termos para precisão histórica + ética (especialmente Little Albert).
5. **Dislikes não utilizado:** campo existe no tipo, mas não é exibido e não há fallback/consumo.
6. **Sem motion no card swipe:** ainda não há animação de transição de perfil/gesto tipo “swipe”.

---

## Conclusão
**Status global: Adequado para MVP fechado** em termos funcionais centrais: o produto cumpre o escopo mínimo anunciado. 

Para avançar para uma versão “PRD-conforme com confiança alta”, recomendo fechar em ordem:
1. normalização editorial + revisão de conteúdo;
2. robustez de estado local;
3. ampliar “modo de tom” para toda a ficha;
4. pequenas melhorias de animação no card.
