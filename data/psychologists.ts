export type Psychologist = {
  slug: string;
  order: number;
  schoolSlug: string;
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

export type SchoolEra = {
  slug: string;
  order: number;
  chapterLabel: string;
  name: string;
  periodLabel: string;
  tagline: string;
  summary: string;
  vibe: string;
  cta: string;
  image: string;
  accent: "amber" | "sky";
};

export type DiscoverItem =
  | {
      type: "era";
      order: number;
      eraSlug: string;
    }
  | {
      type: "profile";
      order: number;
      profileSlug: string;
    };

export const schoolEras: SchoolEra[] = [
  {
    slug: "estruturalismo",
    order: 1,
    chapterLabel: "Capítulo 1",
    name: "Estruturalismo",
    periodLabel: "A partir de 1879",
    tagline: "A mente virou objeto de laboratório.",
    summary:
      "Wundt abriu o laboratório experimental em Leipzig e colocou a psicologia em clima de ciência. Titchener levou a missão adiante: decompor a consciência em sensações, imagens e sentimentos.",
    vibe:
      "Se você disser que curtiu o encontro, essa turma provavelmente vai pedir um relatório completo com intensidade, duração, textura emocional e talvez aroma.",
    cta: "Clique aqui para conhecer os estruturalistas",
    image: "/placeholders/eras/estruturalismo-v2.svg",
    accent: "amber",
  },
  {
    slug: "behaviorismo",
    order: 4,
    chapterLabel: "Capítulo 2",
    name: "Behaviorismo",
    periodLabel: "A partir de 1913",
    tagline: "Menos mistério mental, mais comportamento observável.",
    summary:
      "Watson quis banir a introspecção da festa e defender uma psicologia objetiva. Skinner transformou o comportamento em sistema de reforços, consequências e hábitos moldados pelo ambiente.",
    vibe:
      "Se você falar em química, eles talvez aceitem. Mas antes vão querer evidências replicáveis do seu interesse.",
    cta: "Clique aqui para conhecer os behavioristas",
    image: "/placeholders/eras/behaviorismo-v2.svg",
    accent: "sky",
  },
];

export const psychologists: Psychologist[] = [
  {
    slug: "wilhelm-wundt",
    order: 1,
    schoolSlug: "estruturalismo",
    name: "Wilhelm Wundt",
    photos: [
      "/placeholders/wundt/1.jpeg",
      "/placeholders/wundt/2.jpeg",
      "/placeholders/wundt/3.jpeg",
      "/placeholders/wundt/4.jpeg",
      "/placeholders/wundt/5.jpeg",
    ],
    ageLabel: "43 anos",
    role: "Estruturalista raiz & Fundador de Laboratórios",
    distanceLabel: "A 9 km de você",
    sign: "Leão",
    school: "Estruturalismo",
    bio: "Hallo! Sou o Wilhelm, mas pode me chamar de Wundt. Dizem que sou o cara que transformou a psicologia em ciência, basicamente criei o primeiro laboratório de psicologia experimental em 1879, em Leipzig. O que mais gosto é de entender do que a mente humana é feita. Meu hobby é analisar sensações, percepções e sentimentos... tudo com cronômetro e método científico, claro. Sou alemão, organizado e curioso. Se você topar sair comigo, talvez eu peça para você observar seus próprios pensamentos durante o encontro... é só ciência, prometo.",
    likes: [
      "Estrutura da mente.",
      "Experimentos bem controlados.",
      "Medir o tempo de reação das pessoas.",
      "Filosofia, ciência e conversas profundas."
    ],
    dislikes: [
      "Pessoas que confundem psicologia com adivinhação e conversas totalmente sem método."
    ],
    experimentTitle: "Meu experimento favorito",
    experimentBody: "Treinar pessoas para observar e relatar suas próprias experiências mentais quando recebem estímulos simples. Basicamente, descobrir quais são os ingredientes da consciência.",
    lookingFor: "Alguém disposto a explorar a própria mente comigo. Se rolar química, a gente até cria um novo experimento juntos.",
    labPuns: [
      "Se rolar química, a gente até cria um novo experimento juntos.",
      "Posso até usar cronômetro, mas essa sensação que você provocou fugiu do método.",
      "Você não é um estímulo experimental... mas acabou de provocar uma sensação bem interessante na minha consciência."
    ],
    matchMessage: "Você não é um estímulo experimental... mas acabou de provocar uma sensação bem interessante na minha consciência.",
  },
  {
    slug: "edward-bradford-titchener",
    order: 2,
    schoolSlug: "estruturalismo",
    name: "Edward Bradford Titchener",
    photos: [
      "/placeholders/titchener/1.jpeg",
      "/placeholders/titchener/2.jpeg",
      "/placeholders/titchener/3.jpeg",
      "/placeholders/titchener/4.jpeg",
    ],
    ageLabel: "40 anos",
    role: "Analista da Consciência & Discípulo Oficial do Wundt",
    distanceLabel: "A 8 km de você",
    sign: "Capricórnio",
    school: "Estruturalismo",
    bio: "Olá! Sou Titchener, inglês de nascimento, mas atualmente morando nos EUA e espalhando por aí a ideia do meu mestre Wundt. Meu objetivo na vida? Descobrir quais são os elementos básicos da mente. Enquanto algumas pessoas simplesmente sentem as coisas, eu prefiro analisar cada sensação em partes. Um café, por exemplo, não é só café... é temperatura, aroma, sabor, intensidade... tudo devidamente observado. Se você sair comigo, prepare-se: talvez eu peça para descrever exatamente o que você está sentindo, sem dizer apenas gostei. Aqui a gente trabalha com introspecção de verdade.",
    likes: [
      "Especialista em Estruturalismo (entender a estrutura da mente).",
      "Introspecção super detalhada.",
      "Laboratórios, ciência e análises minuciosas.",
      "Café... mas descrito em pelo menos 10 sensações diferentes."
    ],
    dislikes: [
      "Quem acha que café é só café."
    ],
    experimentTitle: "Meu experimento top",
    experimentBody: "Treinar participantes para descrever suas experiências mentais da forma mais detalhada possível, identificando os elementos básicos da consciência: sensações, imagens e sentimentos.",
    lookingFor: "Alguém curioso, observador e disposto a analisar cada momento da vida comigo. Um relacionamento onde possamos dissecar juntos cada emoção... cientificamente, claro.",
    labPuns: [
      "Aqui a gente trabalha com introspecção de verdade.",
      "Se você topar, a gente pode dissecar cada emoção juntos... cientificamente, claro.",
      "Oi! Acho que encontrei um estímulo interessante aqui... vamos ver no que isso dá?"
    ],
    matchMessage: "Oi! Acho que encontrei um estímulo interessante aqui... vamos ver no que isso dá?",
  },
  {
    slug: "john-broadus-watson",
    order: 3,
    schoolSlug: "behaviorismo",
    name: "John Broadus Watson",
    photos: [
      "/placeholders/watson/1.jpeg",
      "/placeholders/watson/2.jpeg",
      "/placeholders/watson/3.jpeg",
      "/placeholders/watson/4.jpeg",
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
    order: 4,
    schoolSlug: "behaviorismo",
    name: "Burrhus Frederic Skinner",
    photos: [
      "/placeholders/skinner/1.jpeg",
      "/placeholders/skinner/2.jpeg",
      "/placeholders/skinner/3.jpeg",
      "/placeholders/skinner/4.jpeg",
    ],
    ageLabel: "55 anos",
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
    matchMessage: "Seu like funcionou como reforço positivo. A probabilidade de eu gostar de você aumentou bastante.",
  },
];

export const discoverItems: DiscoverItem[] = [
  { type: "era", eraSlug: "estruturalismo", order: 1 },
  { type: "profile", profileSlug: "wilhelm-wundt", order: 2 },
  { type: "profile", profileSlug: "edward-bradford-titchener", order: 3 },
  { type: "era", eraSlug: "behaviorismo", order: 4 },
  { type: "profile", profileSlug: "john-broadus-watson", order: 5 },
  { type: "profile", profileSlug: "burrhus-frederic-skinner", order: 6 },
];
