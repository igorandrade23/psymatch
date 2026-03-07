export type Psychologist = {
  slug: string;
  order: number;
  name: string;
  ageLabel: string;
  role: string;
  photos: string[];
  distanceLabel: string;
  sign: string;
  school: string;
  bio: string;
  likes: string[];
  dislikes?: string[];
  experimentTitle: string;
  experimentBody: string;
  lookingFor: string;
  labPuns: string[];
  matchMessage: string;
};

export const psychologists: Psychologist[] = [
  {
    slug: "john-broadus-watson",
    order: 1,
    name: "John Broadus Watson",
    photos: [
      "/placeholders/psych-1.svg",
      "/placeholders/psych-3.svg",
      "/placeholders/psych-2.svg",
    ],
    ageLabel: "35 anos",
    role: "Psicologo e Fiscal de Atitudes",
    distanceLabel: "A 2 km de voce (to de olho no seu comportamento)",
    sign: "Capricornio",
    school: "Behaviorismo Metodologico",
    bio: "Pai do behaviorismo metodologico. Defende que a psicologia deve estudar apenas o que pode ser observado, medido e testado, rejeitando introspeccao, alma e mente como base cientifica.",
    likes: [
      "Estimulo e Resposta (S-R)",
      "Separar habito de hereditariedade",
      "Historias com ratos brancos"
    ],
    dislikes: ["Barulhos metalicos altos perto do pet"],
    experimentTitle: "Pequeno Albert",
    experimentBody: "Watson associou um rato branco a um som metalico assustador para mostrar como uma resposta emocional podia ser condicionada. O estudo ficou famoso e hoje tambem e lembrado por seus problemas eticos.",
    lookingFor: "Alguem observavel, que demonstre afeto por atos consensuais, publicos e mensuraveis.",
    labPuns: [
      "Se eu nao consigo observar seu interesse, ainda nao posso chamar isso de ciencia.",
      "Voce me deixou com medo de ghosting em nivel Pequeno Albert.",
      "Nosso match nao e mental, e puro comportamento observavel."
    ],
    matchMessage: "Voce provou seu interesse com comportamento observavel. Isso, sim, e um match cientifico.",
  },
  {
    slug: "burrhus-frederic-skinner",
    order: 2,
    name: "Burrhus Frederic Skinner",
    photos: [
      "/placeholders/psych-2.svg",
      "/placeholders/psych-1.svg",
      "/placeholders/psych-3.svg",
    ],
    ageLabel: "44 anos",
    role: "Engenheiro de Pombos e Sommelier de Consequencias",
    distanceLabel: "A 10 km de voce (num esquema de razao variavel)",
    sign: "Peixes",
    school: "Behaviorismo Radical",
    bio: "Skinner levou o behaviorismo ate a raiz do comportamento. Para ele, sentimentos e pensamentos existem, mas tambem sao comportamentos, ainda que encobertos. O foco continua sendo a relacao entre acao, ambiente e consequencias.",
    likes: [
      "Condicionamento Operante",
      "Maquinas de ensinar e automacao",
      "Pombos persistentes e ratos que usam alavanca"
    ],
    experimentTitle: "Caixa de Skinner",
    experimentBody: "Skinner mostrou que comportamentos aumentam ou diminuem de acordo com suas consequencias. Ao apertar uma alavanca e receber comida, o rato aprende pela relacao entre resposta e reforco positivo.",
    lookingFor: "Uma parceria em que o reforcador aparece na hora certa e o interesse nunca entra em extincao.",
    labPuns: [
      "Seu like acabou de funcionar como reforco positivo.",
      "Eu passaria o dia na sua caixa, desde que tenha comida e previsao experimental.",
      "Quando voce aparece, meu interesse por outras opcoes entra em extincao."
    ],
    matchMessage: "Seu like funcionou como reforco positivo. A probabilidade de eu gostar de voce aumentou bastante.",
  },
];

