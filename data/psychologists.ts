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
      "/placeholders/watson/1.jpeg",
      "/placeholders/watson/2.jpeg",
      "/placeholders/watson/3.jpeg",
    ],
    ageLabel: "35 anos",
    role: "Psicólogo e Fiscal de Atitudes",
    distanceLabel: "A 2 km de você (tô de olho no seu comportamento)",
    sign: "Capricórnio",
    school: "Behaviorismo Metodológico",
    bio: "Cansado de matches que vivem no mundo da lua? Eu sou o pai do Behaviorismo Metodológico e aqui o papo é objetivo da Ciência Natural: se eu não consigo ver, medir e provar, pra mim nem existe! Rejeito a introspecção e qualquer papo sobre “alma” ou “mente” se você quer que eu adivinhe o que você tá pensando, deu swipe errado. Nasci em Travelers Rest, Carolina do Sul (EUA), mas me mudei de vez pro Brasil porque o ambiente aqui é perfeito pra prever e controlar... digo, pra gente se ajustar um ao outro!",
    likes: [
      "Sou do tipo prático: meu negócio é Estímulo e Resposta (S-R).",
      "Gosto de ratos brancos (tenho ótimas histórias, juro!).",
      "Adoro separar o que é hábito do que é hereditariedade."
    ],
    dislikes: ["De barulhos metálicos altos enquanto você segura meu pet."],
    experimentTitle: "Experimento bombástico",
    experimentBody: "Fui o autor do polêmico estudo com o Pequeno Albert. Mostrei ao mundo que as emoções humanas são apenas respostas corporais a estímulos específicos. Basicamente, ensinei um bebê de 11 meses a ter pavor de um rato branco (que ele amava!) apenas fazendo um barulhão de metal assustador toda vez que o bicho aparecia. Se eu condicionei um trauma, imagina o match que eu posso condicionar em você!",
    lookingFor: "Alguém observável! Se você não consegue provar que me ama com atos públicos e observáveis consensuais, a gente não tem um match científico.",
    labPuns: [
      "Gata, me dá 12 bebês e eu te garanto: transformo um deles no seu pretendente perfeito e o resto em advogados para o nosso divórcio!",
      "Não sou o Pequeno Albert, mas você me deixou com um medo terrível... de você me dar ghosting!",
      "Nosso amor não é “mental”, é pura organização motora e fala subvocal!"
    ],
    matchMessage: "Você provou seu interesse com comportamento observável. Isso, sim, é um match científico.",
  },
  {
    slug: "burrhus-frederic-skinner",
    order: 2,
    name: "Burrhus Frederic Skinner",
    photos: [
      "/placeholders/skinner/skinner-1.svg",
      "/placeholders/skinner/skinner-2.svg",
      "/placeholders/skinner/skinner-3.svg",
    ],
    ageLabel: "44 anos",
    role: "Engenheiro de Pombos e Sommelier de Consequências",
    distanceLabel: "A 10 km de você (num esquema de razão variável)",
    sign: "Peixes",
    school: "Behaviorismo Radical",
    bio: "Oi, pode me chamar de Fred! Sou radical, mas não é porque eu ando de skate, é porque eu vou até a raiz do comportamento! Diferente de certos ex-amigos meus (alô, Watson!), eu não ignoro seus sentimentos; eu só acho que eles são comportamentos encobertos, ou seja, acontecem “sob a pele”. Nasci em Susquehanna Depot, Pensilvânia, (EUA), mas estou passando umas férias no Brasil operando no ambiente local pra ver quais reforços eu encontro por aqui. Vem ser minha gata dentro da minha caixa!",
    likes: [
      "Sou fã de Condicionamento Operante: você faz a graça e eu te dou o brinde.",
      "Amo construir coisas: de berços automáticos a máquinas de ensinar (já adianto que meu apê é todo automatizado).",
      "Gosto de pombos persistentes e ratos que sabem usar uma alavanca."
    ],
    experimentTitle: "Caixa de Skinner",
    dislikes: [
      "Falta de consistência no ambiente e recompensas completamente aleatórias sem propósito.",
    ],
    experimentBody: "Sou o pai da famosa Caixa de Skinner. Nela, coloquei ratinhos para aprenderem que suas ações geram resultados: o rato aperta uma alavanca e pimba! Recebe uma pelota de comida. Isso é o que chamo de reforço positivo. Também provei que pombos podem ser persistentes se a recompensa for imprevisível, bicando até 150.000 vezes sem ganhar nada!",
    lookingFor: "Uma parceria em que a gente opere junto no ambiente. Procuro um relacionamento em esquema de razão variável: aquele que me mantém viciado porque o beijo (reforçador) vem na hora que eu menos espero!",
    labPuns: [
      "Você não é a minha caixa, mas eu passaria o dia todo ali dentro com você recebendo reforço positivo!",
      "Quer entrar na minha caixa? O isolamento acústico é ótimo e a comida sai na hora certa!",
      "Gata, você não é punição negativa, mas o meu interesse por outras entra em extinção quando você chega!"
    ],
    matchMessage: "Seu like funcionou como reforco positivo. A probabilidade de eu gostar de voce aumentou bastante.",
  },
];
