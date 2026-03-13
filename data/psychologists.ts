import {
  type LocalizedList,
  type LocalizedText,
  localizedList,
  localizedText,
} from "@/lib/i18n";

export type Psychologist = {
  slug: string;
  order: number;
  schoolSlug: string;
  name: string;
  ageLabel: LocalizedText;
  role: LocalizedText;
  photos: string[];
  iconicPhoto: string;
  distanceLabel: LocalizedText;
  sign: LocalizedText;
  school: LocalizedText;
  bio: LocalizedText;
  likes: LocalizedList;
  dislikes?: LocalizedList;
  experimentTitle: LocalizedText;
  experimentBody: LocalizedText;
  lookingFor: LocalizedText;
  labPuns: LocalizedList;
  matchMessage: LocalizedText;
};

export type SchoolEra = {
  slug: string;
  order: number;
  chapterLabel: LocalizedText;
  name: LocalizedText;
  periodLabel: LocalizedText;
  tagline: LocalizedText;
  summary: LocalizedText;
  vibe: LocalizedText;
  cta: LocalizedText;
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
    chapterLabel: localizedText("Capítulo 1"),
    name: localizedText("Estruturalismo"),
    periodLabel: localizedText("Século XIX (a partir de 1879)"),
    tagline: localizedText("A mente virou objeto de laboratório."),
    summary: localizedText(
      "Wundt abriu o laboratório experimental em Leipzig e colocou a psicologia em clima de ciência. Titchener levou a missão adiante: decompor a consciência em sensações, imagens e sentimentos.",
    ),
    vibe: localizedText(
      "Se esse pessoal marcar um encontro, alguém sai apaixonado e outro sai com uma planilha, três anotações e a frase: agora descreva esse sentimento com mais precisão.",
    ),
    cta: localizedText("Clique aqui para conhecer os estruturalistas"),
    image: "/placeholders/eras/estruturalismo-v2.svg",
    accent: "amber",
  },
  {
    slug: "funcionalismo",
    order: 4,
    chapterLabel: localizedText("Capítulo 2"),
    name: localizedText("Funcionalismo"),
    periodLabel: localizedText("Fim do século XIX (a partir da década de 1890)"),
    tagline: localizedText("Menos estrutura parada, mais mente em movimento."),
    summary: localizedText(
      "O Funcionalismo quis entender para que a mente serve no mundo real. Em vez de dissecar a consciência em peças, a escola passou a observar como pensamentos, hábitos e aprendizagens ajudam na adaptação ao ambiente.",
    ),
    vibe: localizedText(
      "Essa turma olha para uma crise existencial e, em vez de chorar, pergunta: tudo bem, mas isso pelo menos está sendo útil para alguma coisa?",
    ),
    cta: localizedText("Clique aqui para conhecer os funcionalistas"),
    image: "/placeholders/eras/funcionalismo-v1.svg",
    accent: "amber",
  },
  {
    slug: "precursores-do-behaviorismo",
    order: 6,
    chapterLabel: localizedText("Capítulo 3"),
    name: localizedText("Precursores do Behaviorismo"),
    periodLabel: localizedText("Virada do século XIX para o XX (1890-1910)"),
    tagline: localizedText("A aprendizagem começou a preparar o terreno para o behaviorismo."),
    summary: localizedText(
      "Pavlov mostrou como respostas podiam ser condicionadas por associação entre estímulos. Thorndike investigou como consequências fortalecem ou enfraquecem comportamentos. Juntos, ajudaram a abrir caminho para uma psicologia mais focada no comportamento observável.",
    ),
    vibe: localizedText(
      "Aqui começa o momento em que até o cachorro da casa percebe que, se sentar direitinho, ganha atenção, petisco e talvez mais respeito que muita gente.",
    ),
    cta: localizedText("Clique aqui para conhecer os precursores do behaviorismo"),
    image: "/placeholders/eras/behaviorismo-v2.svg",
    accent: "sky",
  },
  {
    slug: "behaviorismo",
    order: 9,
    chapterLabel: localizedText("Capítulo 4"),
    name: localizedText("Behaviorismo"),
    periodLabel: localizedText("Século XX (a partir de 1913)"),
    tagline: localizedText("Menos mistério mental, mais comportamento observável."),
    summary: localizedText(
      "Watson quis banir a introspecção da festa e defender uma psicologia objetiva. Skinner transformou o comportamento em sistema de reforços, consequências e hábitos moldados pelo ambiente.",
    ),
    vibe: localizedText(
      "No behaviorismo, romance só existe depois de pelo menos cinco sinais claros, duas repetições e nenhuma ambiguidade. Em resumo: até para flertar tem protocolo.",
    ),
    cta: localizedText("Clique aqui para conhecer os behavioristas"),
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
    iconicPhoto: "/placeholders/iconic/wilhelm-wundt.jpg",
    ageLabel: localizedText("43 anos"),
    role: localizedText("Estruturalista raiz & Fundador de Laboratórios"),
    distanceLabel: localizedText("A 9 km de você"),
    sign: localizedText("Leão"),
    school: localizedText("Estruturalismo"),
    bio: localizedText("Hallo! Sou o Wilhelm, mas pode me chamar de Wundt. Dizem que sou o cara que transformou a psicologia em ciência, basicamente criei o primeiro laboratório de psicologia experimental em 1879, em Leipzig. O que mais gosto é de entender do que a mente humana é feita. Meu hobby é analisar sensações, percepções e sentimentos... tudo com cronômetro e método científico, claro. Sou alemão, organizado e curioso. Se você topar sair comigo, talvez eu peça para você observar seus próprios pensamentos durante o encontro... é só ciência, prometo."),
    likes: localizedList([
      "Estrutura da mente.",
      "Experimentos bem controlados.",
      "Medir o tempo de reação das pessoas.",
      "Filosofia, ciência e conversas profundas."
    ]),
    dislikes: localizedList([
      "Pessoas que confundem psicologia com adivinhação e conversas totalmente sem método."
    ]),
    experimentTitle: localizedText("Experimento(s)"),
    experimentBody: localizedText("Treinar pessoas para observar e relatar suas próprias experiências mentais quando recebem estímulos simples. Basicamente, descobrir quais são os ingredientes da consciência."),
    lookingFor: localizedText("Alguém disposto a explorar a própria mente comigo. Se rolar química, a gente até cria um novo experimento juntos."),
    labPuns: localizedList([
      "Se rolar química, a gente até cria um novo experimento juntos.",
      "Posso até usar cronômetro, mas essa sensação que você provocou fugiu do método.",
      "Você não é um estímulo experimental... mas acabou de provocar uma sensação bem interessante na minha consciência."
    ]),
    matchMessage: localizedText("Você não é um estímulo experimental... mas acabou de provocar uma sensação bem interessante na minha consciência."),
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
    ],
    iconicPhoto: "/placeholders/iconic/edward-bradford-titchener.jpg",
    ageLabel: localizedText("30 anos"),
    role: localizedText("Analista da Consciência & Discípulo Oficial do Wundt"),
    distanceLabel: localizedText("A 8 km de você"),
    sign: localizedText("Capricórnio"),
    school: localizedText("Estruturalismo"),
    bio: localizedText("Olá! Sou Titchener, inglês de nascimento, mas atualmente morando nos EUA e espalhando por aí a ideia do meu mestre Wundt. Meu objetivo na vida? Descobrir quais são os elementos básicos da mente. Enquanto algumas pessoas simplesmente sentem as coisas, eu prefiro analisar cada sensação em partes. Um café, por exemplo, não é só café... é temperatura, aroma, sabor, intensidade... tudo devidamente observado. Se você sair comigo, prepare-se: talvez eu peça para descrever exatamente o que você está sentindo, sem dizer apenas gostei. Aqui a gente trabalha com introspecção de verdade."),
    likes: localizedList([
      "Especialista em Estruturalismo (entender a estrutura da mente).",
      "Introspecção super detalhada.",
      "Laboratórios, ciência e análises minuciosas.",
      "Café... mas descrito em pelo menos 10 sensações diferentes."
    ]),
    dislikes: localizedList([
      "Quem acha que café é só café."
    ]),
    experimentTitle: localizedText("Experimento(s)"),
    experimentBody: localizedText("Treinar participantes para descrever suas experiências mentais da forma mais detalhada possível, identificando os elementos básicos da consciência: sensações, imagens e sentimentos."),
    lookingFor: localizedText("Alguém curioso, observador e disposto a analisar cada momento da vida comigo. Um relacionamento onde possamos dissecar juntos cada emoção... cientificamente, claro."),
    labPuns: localizedList([
      "Aqui a gente trabalha com introspecção de verdade.",
      "Se você topar, a gente pode dissecar cada emoção juntos... cientificamente, claro.",
      "Oi! Acho que encontrei um estímulo interessante aqui... vamos ver no que isso dá?"
    ]),
    matchMessage: localizedText("Oi! Acho que encontrei um estímulo interessante aqui... vamos ver no que isso dá?"),
  },
  {
    slug: "william-james",
    order: 3,
    schoolSlug: "funcionalismo",
    name: "William James",
    photos: [
      "/placeholders/james/1.jpeg",
      "/placeholders/james/2.jpeg",
      "/placeholders/james/3.jpeg",
    ],
    iconicPhoto: "/placeholders/iconic/william-james.jpg",
    ageLabel: localizedText("38 anos"),
    role: localizedText("Investigador da Consciência em Movimento"),
    distanceLabel: localizedText("A 5 km de você (observando como sua mente funciona)"),
    sign: localizedText("Aquário"),
    school: localizedText("Funcionalismo"),
    bio: localizedText("Cansado de gente que acha que a mente é algo parado e estático? Eu sou um dos pioneiros do Funcionalismo, e pra mim o que importa não é só o que a mente é... mas para que ela serve. Sou fascinado por entender como nossos pensamentos, emoções e comportamentos ajudam a gente a se adaptar ao ambiente. Nasci em Nova York, mas minha mente vive viajando entre filosofia, psicologia e experiências humanas. Se você gosta de refletir sobre a vida e entender como nossas escolhas moldam quem somos, talvez a gente tenha um match bem funcional."),
    likes: localizedList([
      "Amo estudar a consciência como um fluxo contínuo (o famoso fluxo da consciência).",
      "Curto observar como hábitos moldam nosso comportamento.",
      "Acredito que a psicologia precisa estudar a utilidade dos processos mentais.",
    ]),
    experimentTitle: localizedText("Experimento(s)"),
    experimentBody: localizedText("Ajudei a desenvolver a ideia de que a consciência funciona como um fluxo constante, mudando o tempo todo para nos ajudar a lidar com o ambiente. Ou seja: sua mente não é uma foto... é um vídeo em movimento."),
    lookingFor: localizedText("Alguém que entenda que nossos pensamentos existem para nos ajudar a viver melhor e nos adaptar ao mundo."),
    labPuns: localizedList([
      "Gata, meu interesse por você não é estrutural... é funcional.",
      "Você entrou no meu fluxo de consciência e simplesmente não saiu mais.",
      "Se nosso relacionamento funcionar bem, já virou objeto de estudo!",
    ]),
    matchMessage: localizedText("Você entrou no meu fluxo de consciência e, francamente, está difícil pensar em outra coisa."),
  },
  {
    slug: "ivan-pavlov",
    order: 4,
    schoolSlug: "precursores-do-behaviorismo",
    name: "Ivan Pavlov",
    photos: [
      "/placeholders/pavlov/1.jpeg",
      "/placeholders/pavlov/2.jpeg",
      "/placeholders/pavlov/3.jpeg",
    ],
    iconicPhoto: "/placeholders/iconic/ivan-pavlov.jpg",
    ageLabel: localizedText("27 anos"),
    role: localizedText("Treinador de Reflexos e Mestre das Associações"),
    distanceLabel: localizedText("A 3 km de você (ouvindo um sininho)"),
    sign: localizedText("Libra"),
    school: localizedText("Precursores do Behaviorismo"),
    bio: localizedText("Oi! Sou fisiologista, mas acabei ficando famoso mesmo estudando como aprendemos por associação. Descobri que, às vezes, basta um estímulo aparecer junto com outro para criar uma resposta automática. Nasci na Rússia e passei boa parte da minha vida estudando... cachorros que babam. Se você acredita que pequenas experiências podem mudar nossos comportamentos, talvez nosso match seja... condicionado."),
    likes: localizedList([
      "Estudo reflexos e aprendizagem automática.",
      "Sou fã de experimentos bem controlados.",
      "Tenho um carinho especial por cães de laboratório.",
    ]),
    experimentTitle: localizedText("Experimento(s)"),
    experimentBody: localizedText("Descobri o Condicionamento Clássico: meus cães começaram a salivar não só quando viam comida, mas também quando ouviam um sino que eu tocava antes da refeição. Ou seja: um estímulo neutro pode se tornar um estímulo poderoso... se for associado ao certo."),
    lookingFor: localizedText("Alguém que reaja automaticamente quando eu aparecer. Se ao ouvir meu nome seu coração acelerar... pronto, já temos condicionamento."),
    labPuns: localizedList([
      "Toda vez que vejo seu sorriso meu coração reage... acho que fui condicionado.",
      "Se amor fosse estímulo, você seria o incondicionado.",
      "Não sou comida, mas faço você salivar de curiosidade?",
    ]),
    matchMessage: localizedText("Acho que associei seu perfil a uma sensação boa demais para chamar de mero reflexo."),
  },
  {
    slug: "edward-thorndike",
    order: 5,
    schoolSlug: "precursores-do-behaviorismo",
    name: "Edward Thorndike",
    photos: [
      "/placeholders/thorndike/1.jpeg",
      "/placeholders/thorndike/2.jpeg",
      "/placeholders/thorndike/3.jpeg",
    ],
    iconicPhoto: "/placeholders/iconic/edward-thorndike.png",
    ageLabel: localizedText("31 anos"),
    role: localizedText("Especialista em Aprendizagem por Tentativa e Erro"),
    distanceLabel: localizedText("A 7 km de você (testando novas conexões)"),
    sign: localizedText("Virgem"),
    school: localizedText("Precursores do Behaviorismo"),
    bio: localizedText("Sou apaixonado por entender como aprendemos com as consequências das nossas ações. Antes de muita gente falar sobre comportamento, eu já estudava como respostas que trazem bons resultados tendem a se repetir. Nasci nos EUA e passei muito tempo observando gatos tentando sair de caixas-problema. Se você acredita que a vida é um processo de aprender com erros... provavelmente vamos nos dar bem."),
    likes: localizedList([
      "Estudo aprendizagem por tentativa e erro.",
      "Curto observar como o comportamento muda com a experiência.",
      "Gosto de gatos inteligentes que aprendem a abrir portas.",
    ]),
    experimentTitle: localizedText("Experimento(s)"),
    experimentBody: localizedText("Coloquei gatos em caixas-problema onde precisavam puxar uma alavanca para escapar. Com o tempo, eles aprendiam que certas ações levavam à liberdade. Foi assim que formulei a Lei do Efeito: comportamentos seguidos por consequências positivas tendem a se repetir."),
    lookingFor: localizedText("Alguém que entenda que relacionamentos também funcionam assim: boas experiências reforçam a vontade de continuar juntos."),
    labPuns: localizedList([
      "Se nosso encontro for bom, pela Lei do Efeito vamos repetir.",
      "Prometo que nosso match não vai ser tentativa e erro... ou talvez um pouco.",
      "Se você sorrir pra mim, já virou reforço positivo.",
    ]),
    matchMessage: localizedText("Se esse começo der certo, pela Lei do Efeito vou querer repetir a experiência."),
  },
  {
    slug: "john-broadus-watson",
    order: 6,
    schoolSlug: "behaviorismo",
    name: "John Broadus Watson",
    photos: [
      "/placeholders/watson/1.jpeg",
      "/placeholders/watson/2.jpeg",
      "/placeholders/watson/3.jpeg",
      "/placeholders/watson/4.jpeg",
    ],
    iconicPhoto: "/placeholders/iconic/john-broadus-watson.jpg",
    ageLabel: localizedText("35 anos"),
    role: localizedText("Psicólogo e Fiscal de Atitudes"),
    distanceLabel: localizedText("A 2 km de você (tô de olho no seu comportamento)"),
    sign: localizedText("Capricórnio"),
    school: localizedText("Behaviorismo Metodológico"),
    bio: localizedText("Cansado de matches que vivem no mundo da lua? Eu sou o pai do Behaviorismo Metodológico e aqui o papo é objetivo da Ciência Natural: se eu não consigo ver, medir e provar, pra mim nem existe! Rejeito a introspecção e qualquer papo sobre “alma” ou “mente” se você quer que eu adivinhe o que você tá pensando, deu swipe errado. Nasci em Travelers Rest, Carolina do Sul (EUA), mas me mudei de vez pro Brasil porque o ambiente aqui é perfeito pra prever e controlar... digo, pra gente se ajustar um ao outro!"),
    likes: localizedList([
      "Sou do tipo prático: meu negócio é Estímulo e Resposta (S-R).",
      "Gosto de ratos brancos (tenho ótimas histórias, juro!).",
      "Adoro separar o que é hábito do que é hereditariedade."
    ]),
    dislikes: localizedList(["De barulhos metálicos altos enquanto você segura meu pet."]),
    experimentTitle: localizedText("Experimento bombástico"),
    experimentBody: localizedText("Fui o autor do polêmico estudo com o Pequeno Albert. Mostrei ao mundo que as emoções humanas são apenas respostas corporais a estímulos específicos. Basicamente, ensinei um bebê de 11 meses a ter pavor de um rato branco (que ele amava!) apenas fazendo um barulhão de metal assustador toda vez que o bicho aparecia. Se eu condicionei um trauma, imagina o match que eu posso condicionar em você!"),
    lookingFor: localizedText("Alguém observável! Se você não consegue provar que me ama com atos públicos e observáveis consensuais, a gente não tem um match científico."),
    labPuns: localizedList([
      "Gata, me dá 12 bebês e eu te garanto: transformo um deles no seu pretendente perfeito e o resto em advogados para o nosso divórcio!",
      "Não sou o Pequeno Albert, mas você me deixou com um medo terrível... de você me dar ghosting!",
      "Nosso amor não é “mental”, é pura organização motora e fala subvocal!"
    ]),
    matchMessage: localizedText("Você provou seu interesse com comportamento observável. Isso, sim, é um match científico."),
  },
  {
    slug: "burrhus-frederic-skinner",
    order: 7,
    schoolSlug: "behaviorismo",
    name: "Burrhus Frederic Skinner",
    photos: [
      "/placeholders/skinner/1.jpeg",
      "/placeholders/skinner/2.jpeg",
      "/placeholders/skinner/3.jpeg",
      "/placeholders/skinner/4.jpeg",
    ],
    iconicPhoto: "/placeholders/iconic/burrhus-frederic-skinner.jpg",
    ageLabel: localizedText("55 anos"),
    role: localizedText("Engenheiro de Pombos e Sommelier de Consequências"),
    distanceLabel: localizedText("A 10 km de você (num esquema de razão variável)"),
    sign: localizedText("Peixes"),
    school: localizedText("Behaviorismo Radical"),
    bio: localizedText("Oi, pode me chamar de Fred! Sou radical, mas não é porque eu ando de skate, é porque eu vou até a raiz do comportamento! Diferente de certos ex-amigos meus (alô, Watson!), eu não ignoro seus sentimentos; eu só acho que eles são comportamentos encobertos, ou seja, acontecem “sob a pele”. Nasci em Susquehanna Depot, Pensilvânia, (EUA), mas estou passando umas férias no Brasil operando no ambiente local pra ver quais reforços eu encontro por aqui. Vem ser minha gata dentro da minha caixa!"),
    likes: localizedList([
      "Sou fã de Condicionamento Operante: você faz a graça e eu te dou o brinde.",
      "Amo construir coisas: de berços automáticos a máquinas de ensinar (já adianto que meu apê é todo automatizado).",
      "Gosto de pombos persistentes e ratos que sabem usar uma alavanca."
    ]),
    experimentTitle: localizedText("Caixa de Skinner"),
    dislikes: localizedList([
      "Falta de consistência no ambiente e recompensas completamente aleatórias sem propósito.",
    ]),
    experimentBody: localizedText("Sou o pai da famosa Caixa de Skinner. Nela, coloquei ratinhos para aprenderem que suas ações geram resultados: o rato aperta uma alavanca e pimba! Recebe uma pelota de comida. Isso é o que chamo de reforço positivo. Também provei que pombos podem ser persistentes se a recompensa for imprevisível, bicando até 150.000 vezes sem ganhar nada!"),
    lookingFor: localizedText("Uma parceria em que a gente opere junto no ambiente. Procuro um relacionamento em esquema de razão variável: aquele que me mantém viciado porque o beijo (reforçador) vem na hora que eu menos espero!"),
    labPuns: localizedList([
      "Você não é a minha caixa, mas eu passaria o dia todo ali dentro com você recebendo reforço positivo!",
      "Quer entrar na minha caixa? O isolamento acústico é ótimo e a comida sai na hora certa!",
      "Gata, você não é punição negativa, mas o meu interesse por outras entra em extinção quando você chega!"
    ]),
    matchMessage: localizedText("Seu like funcionou como reforço positivo. A probabilidade de eu gostar de você aumentou bastante."),
  },
];

export const discoverItems: DiscoverItem[] = [
  { type: "era", eraSlug: "estruturalismo", order: 1 },
  { type: "profile", profileSlug: "wilhelm-wundt", order: 2 },
  { type: "profile", profileSlug: "edward-bradford-titchener", order: 3 },
  { type: "era", eraSlug: "funcionalismo", order: 4 },
  { type: "profile", profileSlug: "william-james", order: 5 },
  { type: "era", eraSlug: "precursores-do-behaviorismo", order: 6 },
  { type: "profile", profileSlug: "ivan-pavlov", order: 7 },
  { type: "profile", profileSlug: "edward-thorndike", order: 8 },
  { type: "era", eraSlug: "behaviorismo", order: 9 },
  { type: "profile", profileSlug: "john-broadus-watson", order: 10 },
  { type: "profile", profileSlug: "burrhus-frederic-skinner", order: 11 },
];
