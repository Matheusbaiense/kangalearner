import type { UiLang } from "@/lib/i18n";
import type { IconName } from "@/components/icons";

export interface LearnTopic {
  slug: string;
  icon: IconName;
  /** Category key that matches @kanga/core CATEGORIES — used for practice filter link */
  practiceCategory?: string;
  isSpecial?: boolean;
  title: Record<UiLang, string>;
  summary: Record<UiLang, string>;
  keyRules: Record<UiLang, string>[];
  mistakes: Record<UiLang, string>[];
  example: Record<UiLang, string>;
  quickCheck: Record<UiLang, string>[];
  source: Record<UiLang, string>;
}

export const LEARN_TOPICS: LearnTopic[] = [
  /* ── About the Test (special featured card) ────────────────────────── */
  {
    slug: "about-the-test",
    icon: "book",
    isSpecial: true,
    title: {
      en: "About the WA Learner Test",
      pt: "Sobre a prova de learner de WA",
      es: "Sobre el examen learner de WA",
    },
    summary: {
      en: "The WA Learner Licence test is a computer-based test with 30 multiple-choice questions. You need at least 24 correct (80%) to pass. Questions are drawn from road rules, signs, road markings, alcohol laws and safe driving.",
      pt: "A prova de learner de WA é um teste informatizado com 30 questões de múltipla escolha. Você precisa acertar pelo menos 24 (80%) para passar. As questões abordam regras de trânsito, placas, marcações, leis de álcool e segurança.",
      es: "El examen learner de WA es un test informatizado con 30 preguntas de opción múltiple. Necesitas al menos 24 respuestas correctas (80%) para aprobar. Las preguntas abarcan reglas de tránsito, señales, marcas viales, leyes de alcohol y conducción segura.",
    },
    keyRules: [
      {
        en: "The test has 30 multiple-choice questions — you must answer at least 24 correctly (80%) to pass.",
        pt: "A prova tem 30 questões de múltipla escolha — você deve acertar pelo menos 24 (80%) para passar.",
        es: "El examen tiene 30 preguntas de opción múltiple — debes responder al menos 24 correctamente (80%) para aprobar.",
      },
      {
        en: "Questions cover road rules, signs, road markings, alcohol laws, overtaking and safe driving.",
        pt: "As questões abordam regras de trânsito, placas, marcações, leis de álcool, ultrapassagem e segurança.",
        es: "Las preguntas abarcan reglas de tránsito, señales, marcas viales, leyes de alcohol, adelantamiento y conducción segura.",
      },
      {
        en: "Study the Drive Safe Handbook and practise all topics on KangaLearner before sitting the test.",
        pt: "Estude o Drive Safe Handbook e pratique todos os tópicos no KangaLearner antes de fazer a prova.",
        es: "Estudia el Drive Safe Handbook y practica todos los temas en KangaLearner antes de presentar el examen.",
      },
      {
        en: "KangaLearner's Learn section, Practice mode and Mock Test mirror the format and content of the real exam.",
        pt: "A seção Aprender, o modo Praticar e o Simulado do KangaLearner seguem o formato e o conteúdo da prova real.",
        es: "La sección Aprender, el modo Practicar y el Simulacro de KangaLearner siguen el formato y el contenido del examen real.",
      },
    ],
    mistakes: [
      {
        en: "Skipping the Learn section and going straight to practice without understanding the rules first.",
        pt: "Pular a seção Aprender e ir direto para a prática sem entender as regras.",
        es: "Saltarse la sección Aprender e ir directamente a practicar sin entender las reglas.",
      },
      {
        en: "Assuming the passing score is lower than 80% — the cutoff is firm and applies to all learner tests in WA.",
        pt: "Achar que a nota mínima é menor que 80% — o critério de aprovação é fixo e se aplica a todas as provas de learner em WA.",
        es: "Asumir que la puntuación mínima es menor al 80% — el criterio de aprobación es fijo en todos los exámenes learner de WA.",
      },
    ],
    example: {
      en: "The Mock Test in KangaLearner gives you 30 random questions, just like the real test. Aim for 80% or higher consistently before booking your appointment with the Department of Transport.",
      pt: "O Simulado do KangaLearner apresenta 30 questões aleatórias, como na prova real. Tente atingir 80% ou mais de forma consistente antes de agendar seu atendimento no Departamento de Transportes.",
      es: "El Simulacro de KangaLearner presenta 30 preguntas aleatorias, como en el examen real. Apunta a un 80% o más de forma consistente antes de reservar tu cita en el Departamento de Transportes.",
    },
    quickCheck: [
      {
        en: "How many questions does the WA learner test have?",
        pt: "Quantas questões tem a prova de learner de WA?",
        es: "¿Cuántas preguntas tiene el examen learner de WA?",
      },
      {
        en: "What is the minimum score needed to pass?",
        pt: "Qual é a nota mínima para passar?",
        es: "¿Cuál es la puntuación mínima para aprobar?",
      },
      {
        en: "What is the recommended study order on KangaLearner?",
        pt: "Qual é a ordem de estudo recomendada no KangaLearner?",
        es: "¿Cuál es el orden de estudio recomendado en KangaLearner?",
      },
    ],
    source: {
      en: "Department of Transport WA — transport.wa.gov.au/licensing/learner-driver-guide.asp",
      pt: "Departamento de Transportes de WA — transport.wa.gov.au/licensing/learner-driver-guide.asp",
      es: "Departamento de Transportes de WA — transport.wa.gov.au/licensing/learner-driver-guide.asp",
    },
  },

  /* ── Speed Limits ────────────────────────────────────────────────── */
  {
    slug: "speed-limits",
    icon: "speed",
    practiceCategory: "Speed Limits",
    title: {
      en: "Speed Limits",
      pt: "Limites de velocidade",
      es: "Límites de velocidad",
    },
    summary: {
      en: "The speed limit is the legal maximum in ideal conditions, not a target. You must slow down when there is traffic, rain, poor visibility, road works, pedestrians or cyclists.",
      pt: "O limite de velocidade é o máximo legal em condições ideais, não uma meta. Você deve reduzir quando houver trânsito, chuva, baixa visibilidade, obras, pedestres ou ciclistas.",
      es: "El límite de velocidad es el máximo legal en condiciones ideales, no un objetivo. Debe reducir cuando hay tráfico, lluvia, poca visibilidad, obras, peatones o ciclistas.",
    },
    keyRules: [
      {
        en: "Never drive above the posted speed limit.",
        pt: "Nunca dirija acima do limite indicado na placa.",
        es: "Nunca conduzca por encima del límite indicado.",
      },
      {
        en: "In built-up areas without signs, follow the default applicable limit.",
        pt: "Em áreas urbanas sem placas, siga o limite padrão aplicável.",
        es: "En zonas urbanas sin señales, siga el límite predeterminado aplicable.",
      },
      {
        en: "At road works, always follow the temporary speed limit shown on signs.",
        pt: "Em obras, siga sempre o limite temporário mostrado nas placas.",
        es: "En obras, siga siempre el límite temporal indicado en las señales.",
      },
      {
        en: "Slow down when the road, weather, visibility or traffic conditions are not ideal.",
        pt: "Reduza a velocidade quando a via, o clima, a visibilidade ou o tráfego não estiverem ideais.",
        es: "Reduzca cuando la vía, el clima, la visibilidad o el tráfico no sean ideales.",
      },
    ],
    mistakes: [
      {
        en: "Thinking the speed limit is the speed you should aim for.",
        pt: "Achar que o limite de velocidade é a velocidade que você deve atingir.",
        es: "Pensar que el límite de velocidad es la velocidad que debe alcanzar.",
      },
      {
        en: "Keeping the maximum speed during rain, road works or near pedestrians.",
        pt: "Continuar no limite máximo mesmo com chuva, obras ou pedestres por perto.",
        es: "Mantener la velocidad máxima con lluvia, obras o peatones cerca.",
      },
    ],
    example: {
      en: "You are on a 50 km/h road, but it is raining heavily and pedestrians are near a crossing. Even if the limit is 50, it may be safer to drive below that.",
      pt: "Você está em uma via de 50 km/h, mas está chovendo forte e há pedestres perto da faixa. Mesmo que o limite seja 50, talvez seja mais seguro dirigir abaixo disso.",
      es: "Está en una vía de 50 km/h, pero llueve mucho y hay peatones cerca del cruce. Aunque el límite sea 50, puede ser más seguro conducir por debajo.",
    },
    quickCheck: [
      {
        en: "Is the speed limit always the safest speed?",
        pt: "O limite de velocidade é sempre a velocidade mais segura?",
        es: "¿El límite de velocidad siempre es la velocidad más segura?",
      },
      {
        en: "What should you do at road works?",
        pt: "O que você deve fazer em obras na estrada?",
        es: "¿Qué debe hacer en obras en la carretera?",
      },
      {
        en: "Why should you slow down near pedestrians and cyclists?",
        pt: "Por que você deve reduzir perto de pedestres e ciclistas?",
        es: "¿Por qué debe reducir cerca de peatones y ciclistas?",
      },
    ],
    source: {
      en: "Based on the Drive Safe Handbook — sections 1.2 Speed and 3.1 Speed Limits.",
      pt: "Baseado no Drive Safe Handbook — seções 1.2 Speed e 3.1 Speed Limits.",
      es: "Basado en el Drive Safe Handbook — secciones 1.2 Speed y 3.1 Speed Limits.",
    },
  },

  /* ── Road Signs ──────────────────────────────────────────────────── */
  {
    slug: "road-signs",
    icon: "signs",
    practiceCategory: "Road Signs",
    title: {
      en: "Road Signs",
      pt: "Placas de trânsito",
      es: "Señales de tránsito",
    },
    summary: {
      en: "Traffic signs tell you what you must do, what you must not do and what hazards are ahead. Learning sign shapes and colours helps you react faster.",
      pt: "As placas ajudam você a saber o que deve fazer, o que não pode fazer e quais perigos estão à frente. Aprender o formato e a cor das placas ajuda a reagir mais rápido.",
      es: "Las señales indican lo que debe hacer, lo que no puede hacer y qué peligros hay adelante. Aprender formas y colores ayuda a reaccionar más rápido.",
    },
    keyRules: [
      {
        en: "Regulatory signs show rules you must obey.",
        pt: "Placas regulatórias indicam regras que você deve obedecer.",
        es: "Las señales reglamentarias indican reglas que debe obedecer.",
      },
      {
        en: "Warning signs alert you to hazards or changes in the road.",
        pt: "Placas de advertência avisam sobre perigos ou mudanças na via.",
        es: "Las señales de advertencia avisan sobre peligros o cambios en la vía.",
      },
      {
        en: "NO ENTRY means you must not enter that road from that direction.",
        pt: "NO ENTRY significa que você não pode entrar naquela via por aquela direção.",
        es: "NO ENTRY significa que no puede entrar en esa vía desde esa dirección.",
      },
      {
        en: "KEEP LEFT means you must pass to the left of the sign.",
        pt: "KEEP LEFT significa que você deve passar pelo lado esquerdo da placa.",
        es: "KEEP LEFT significa que debe pasar por el lado izquierdo de la señal.",
      },
    ],
    mistakes: [
      {
        en: "Thinking warning signs are optional.",
        pt: "Achar que placas de advertência são opcionais.",
        es: "Pensar que las señales de advertencia son opcionales.",
      },
      {
        en: "Confusing a mandatory direction sign with a suggestion.",
        pt: "Confundir uma placa de direção obrigatória com uma sugestão.",
        es: "Confundir una señal obligatoria con una sugerencia.",
      },
    ],
    example: {
      en: "You see a crossroad warning sign ahead. Even if you have priority, slow down, scan both sides and be ready to react.",
      pt: "Você vê uma placa de cruzamento à frente. Mesmo que tenha preferência, reduza, observe os lados e esteja pronto para reagir.",
      es: "Ve una señal de cruce adelante. Aunque tenga prioridad, reduzca, observe ambos lados y prepárese para reaccionar.",
    },
    quickCheck: [
      {
        en: "What is the difference between a regulatory sign and a warning sign?",
        pt: "Qual a diferença entre uma placa regulatória e uma placa de advertência?",
        es: "¿Cuál es la diferencia entre una señal reglamentaria y una de advertencia?",
      },
      {
        en: "What does NO ENTRY mean?",
        pt: "O que significa NO ENTRY?",
        es: "¿Qué significa NO ENTRY?",
      },
      {
        en: "What should you do when you see a warning sign ahead?",
        pt: "O que você deve fazer ao ver uma placa de perigo à frente?",
        es: "¿Qué debe hacer al ver una señal de advertencia adelante?",
      },
    ],
    source: {
      en: "Based on the Drive Safe Handbook — section 3.8 Traffic Signs.",
      pt: "Baseado no Drive Safe Handbook — seção 3.8 Traffic Signs.",
      es: "Basado en el Drive Safe Handbook — sección 3.8 Traffic Signs.",
    },
  },

  /* ── Traffic Lights ─────────────────────────────────────────────── */
  {
    slug: "traffic-lights",
    icon: "trafficSignal",
    practiceCategory: "Traffic Lights",
    title: {
      en: "Traffic Lights",
      pt: "Semáforos e setas",
      es: "Semáforos y flechas",
    },
    summary: {
      en: "Traffic lights control different movements at intersections. A green arrow may allow only one direction while other movements remain stopped.",
      pt: "Semáforos controlam movimentos diferentes no cruzamento. Uma seta verde pode permitir apenas uma direção, enquanto outros movimentos continuam proibidos.",
      es: "Los semáforos controlan distintos movimientos en las intersecciones. Una flecha verde puede permitir solo una dirección mientras otros movimientos siguen detenidos.",
    },
    keyRules: [
      {
        en: "A red light means stop.",
        pt: "Sinal vermelho significa parar.",
        es: "Una luz roja significa detenerse.",
      },
      {
        en: "A green arrow allows movement only in the direction of the arrow.",
        pt: "Seta verde permite seguir apenas na direção da seta.",
        es: "Una flecha verde permite avanzar solo en la dirección de la flecha.",
      },
      {
        en: "A red arrow means you must not travel in that direction.",
        pt: "Seta vermelha significa que você não pode seguir naquela direção.",
        es: "Una flecha roja significa que no debe avanzar en esa dirección.",
      },
      {
        en: "A police officer directing traffic overrides lights and signs.",
        pt: "Um policial dirigindo o tráfego prevalece sobre semáforos e placas.",
        es: "Un agente dirigiendo el tráfico prevalece sobre semáforos y señales.",
      },
    ],
    mistakes: [
      {
        en: "Thinking a green light always lets you turn without giving way.",
        pt: "Achar que sinal verde sempre dá direito de virar sem dar preferência.",
        es: "Pensar que la luz verde siempre permite girar sin ceder el paso.",
      },
      {
        en: "Ignoring pedestrians when turning at traffic lights.",
        pt: "Ignorar pedestres ao virar em um semáforo.",
        es: "Ignorar peatones al girar en un semáforo.",
      },
    ],
    example: {
      en: "The light is red, but there is a green arrow to the left. You may turn left, but you must not go straight ahead.",
      pt: "O semáforo está vermelho, mas há uma seta verde para a esquerda. Você pode virar à esquerda, mas não pode seguir em frente.",
      es: "El semáforo está rojo, pero hay una flecha verde hacia la izquierda. Puede girar a la izquierda, pero no seguir recto.",
    },
    quickCheck: [
      {
        en: "What does a green arrow with a red light mean?",
        pt: "O que significa uma seta verde com sinal vermelho?",
        es: "¿Qué significa una flecha verde con luz roja?",
      },
      {
        en: "Can you make a U-turn at any traffic light?",
        pt: "Você pode fazer retorno em qualquer semáforo?",
        es: "¿Puede hacer un giro en U en cualquier semáforo?",
      },
      {
        en: "Who overrides whom: a police officer directing traffic or traffic lights?",
        pt: "Quem prevalece: policial dirigindo o tráfego ou semáforo?",
        es: "¿Quién prevalece: un agente dirigiendo el tráfico o el semáforo?",
      },
    ],
    source: {
      en: "Based on the Drive Safe Handbook — section 3.10 Traffic Control Signals.",
      pt: "Baseado no Drive Safe Handbook — seção 3.10 Traffic Control Signals.",
      es: "Basado en el Drive Safe Handbook — sección 3.10 Traffic Control Signals.",
    },
  },

  /* ── Road Markings ──────────────────────────────────────────────── */
  {
    slug: "road-markings",
    icon: "map",
    practiceCategory: "Road Markings",
    title: {
      en: "Road Markings",
      pt: "Linhas e marcações na via",
      es: "Líneas y marcas en la vía",
    },
    summary: {
      en: "Road markings show where you should drive, when you may change lanes, where to stop and which areas must remain clear.",
      pt: "As marcações na pista mostram onde você deve dirigir, quando pode mudar de faixa, onde deve parar e quais áreas devem ficar livres.",
      es: "Las marcas viales indican dónde debe conducir, cuándo puede cambiar de carril, dónde detenerse y qué áreas deben quedar libres.",
    },
    keyRules: [
      {
        en: "A broken line may be crossed when it is safe and legal.",
        pt: "Linha tracejada pode ser cruzada quando for seguro e legal.",
        es: "Una línea discontinua puede cruzarse cuando sea seguro y legal.",
      },
      {
        en: "A continuous line generally means you must not cross it.",
        pt: "Linha contínua geralmente significa que você não deve cruzar.",
        es: "Una línea continua generalmente significa que no debe cruzarla.",
      },
      {
        en: "Stop lines show where you must stop at signs and traffic lights.",
        pt: "Linhas de parada indicam onde você deve parar em sinais e semáforos.",
        es: "Las líneas de detención indican dónde debe detenerse ante señales y semáforos.",
      },
      {
        en: "Painted areas and traffic islands are generally not for driving.",
        pt: "Áreas pintadas e ilhas de trânsito normalmente não devem ser usadas para dirigir.",
        es: "Las áreas pintadas e islas de tráfico generalmente no son para circular.",
      },
    ],
    mistakes: [
      {
        en: "Changing lanes across a continuous line.",
        pt: "Mudar de faixa cruzando linha contínua.",
        es: "Cambiar de carril cruzando una línea continua.",
      },
      {
        en: "Stopping after the stop line.",
        pt: "Parar depois da linha de parada.",
        es: "Detenerse después de la línea de parada.",
      },
    ],
    example: {
      en: "You want to change lanes, but there is a continuous line between lanes. Wait until the marking allows a lane change.",
      pt: "Você quer mudar de faixa, mas há uma linha contínua entre as faixas. Espere até a marcação permitir a mudança.",
      es: "Quiere cambiar de carril, pero hay una línea continua entre carriles. Espere hasta que la marca permita el cambio.",
    },
    quickCheck: [
      {
        en: "When may a broken line be crossed?",
        pt: "Quando uma linha tracejada pode ser cruzada?",
        es: "¿Cuándo se puede cruzar una línea discontinua?",
      },
      {
        en: "What does a continuous line generally mean?",
        pt: "O que uma linha contínua geralmente indica?",
        es: "¿Qué significa generalmente una línea continua?",
      },
      {
        en: "Where must you stop at a STOP sign with a stop line?",
        pt: "Onde você deve parar em um STOP com linha de parada?",
        es: "¿Dónde debe detenerse en un STOP con línea de detención?",
      },
    ],
    source: {
      en: "Based on the Drive Safe Handbook — section 3.9 Road Markings.",
      pt: "Baseado no Drive Safe Handbook — seção 3.9 Road Markings.",
      es: "Basado en el Drive Safe Handbook — sección 3.9 Road Markings.",
    },
  },

  /* ── Parking Rules ──────────────────────────────────────────────── */
  {
    slug: "parking-rules",
    icon: "parking",
    practiceCategory: "Parking Rules",
    title: {
      en: "Parking Rules",
      pt: "Estacionamento",
      es: "Estacionamiento",
    },
    summary: {
      en: "Parking rules protect visibility, access and safety. Parking too close to intersections, crossings, bus stops or hydrants can create danger.",
      pt: "As regras de estacionamento protegem visibilidade, acesso e segurança. Estacionar perto demais de cruzamentos, faixas, pontos de ônibus ou hidrantes pode criar risco.",
      es: "Las reglas de estacionamiento protegen visibilidad, acceso y seguridad. Estacionar demasiado cerca de cruces, pasos, paradas o hidrantes puede crear peligro.",
    },
    keyRules: [
      {
        en: "Do not park on footpaths or areas meant for pedestrians.",
        pt: "Não estacione em calçadas ou áreas destinadas a pedestres.",
        es: "No estacione en aceras o áreas destinadas a peatones.",
      },
      {
        en: "Keep a safe distance from intersections, pedestrian crossings, bus stops and hydrants.",
        pt: "Mantenha distância segura de cruzamentos, faixas de pedestres, pontos de ônibus e hidrantes.",
        es: "Mantenga distancia segura de intersecciones, pasos de peatones, paradas de autobús e hidrantes.",
      },
      {
        en: "Always follow parking, no stopping and clearway signs.",
        pt: "Siga sempre placas de parking, no stopping e clearway.",
        es: "Siga siempre las señales de parking, no stopping y clearway.",
      },
      {
        en: "Park so you do not block visibility or access for other road users.",
        pt: "Estacione de forma que não bloqueie a visão ou passagem de outros usuários.",
        es: "Estacione de forma que no bloquee la visibilidad o el acceso de otros usuarios.",
      },
    ],
    mistakes: [
      {
        en: "Parking too close to an intersection.",
        pt: "Estacionar perto demais de uma interseção.",
        es: "Estacionar demasiado cerca de una intersección.",
      },
      {
        en: "Stopping in a no stopping area thinking it is allowed for a short time.",
        pt: "Parar em local de no stopping achando que é permitido por pouco tempo.",
        es: "Detenerse en un área de no stopping pensando que está permitido por poco tiempo.",
      },
    ],
    example: {
      en: "You find a parking space near a pedestrian crossing. Before parking, check that there is enough distance so you do not block visibility.",
      pt: "Você encontra uma vaga perto de uma faixa de pedestres. Antes de estacionar, verifique se há distância suficiente para não bloquear a visibilidade.",
      es: "Encuentra un lugar cerca de un paso de peatones. Antes de estacionar, verifique que haya suficiente distancia para no bloquear la visibilidad.",
    },
    quickCheck: [
      {
        en: "Why should you not park too close to intersections?",
        pt: "Por que não se deve estacionar perto demais de cruzamentos?",
        es: "¿Por qué no debe estacionar demasiado cerca de intersecciones?",
      },
      {
        en: "Can you park on a footpath?",
        pt: "Você pode estacionar em uma calçada?",
        es: "¿Puede estacionar en una acera?",
      },
      {
        en: "What does a clearway sign mean?",
        pt: "O que uma placa de clearway significa?",
        es: "¿Qué significa una señal de clearway?",
      },
    ],
    source: {
      en: "Based on the Drive Safe Handbook — section 3.18 Parking.",
      pt: "Baseado no Drive Safe Handbook — seção 3.18 Parking.",
      es: "Basado en el Drive Safe Handbook — sección 3.18 Parking.",
    },
  },

  /* ── Give Way Rules ─────────────────────────────────────────────── */
  {
    slug: "give-way-rules",
    icon: "target",
    practiceCategory: "Give Way Rules",
    title: {
      en: "Give Way Rules",
      pt: "Preferência e cruzamentos",
      es: "Reglas de ceder el paso",
    },
    summary: {
      en: "Give way rules prevent conflicts at intersections, turns and places without signals. When in doubt, slow down, scan carefully and proceed only when safe.",
      pt: "As regras de preferência ajudam a evitar conflitos em cruzamentos, conversões e situações sem sinalização. Quando houver dúvida, reduza, observe e só avance quando for seguro.",
      es: "Las reglas de ceder el paso evitan conflictos en intersecciones, giros y zonas sin señales. Ante la duda, reduzca, observe y avance solo cuando sea seguro.",
    },
    keyRules: [
      {
        en: "At uncontrolled intersections, you generally give way to vehicles on your right.",
        pt: "Em cruzamentos sem sinalização, normalmente você deve dar preferência ao veículo à sua direita.",
        es: "En intersecciones sin señalización, generalmente debe ceder el paso a los vehículos a su derecha.",
      },
      {
        en: "At a STOP sign, come to a complete stop before proceeding.",
        pt: "Em um sinal de STOP, pare completamente antes de avançar.",
        es: "Ante una señal de STOP, deténgase completamente antes de avanzar.",
      },
      {
        en: "When turning, give way to pedestrians crossing the road you are entering.",
        pt: "Ao virar, dê preferência a pedestres cruzando a via em que você está entrando.",
        es: "Al girar, ceda el paso a peatones que cruzan la vía a la que entra.",
      },
      {
        en: "When turning right, give way to oncoming traffic going straight ahead.",
        pt: "Ao virar à direita, dê preferência ao tráfego vindo em sentido contrário que segue em frente.",
        es: "Al girar a la derecha, ceda el paso al tráfico de frente que sigue recto.",
      },
    ],
    mistakes: [
      {
        en: "Only slowing down at a STOP sign without stopping completely.",
        pt: "Apenas reduzir no STOP sem parar completamente.",
        es: "Solo reducir ante un STOP sin detenerse completamente.",
      },
      {
        en: "Turning without checking pedestrians on the road you are entering.",
        pt: "Virar sem observar pedestres na via em que você está entrando.",
        es: "Girar sin mirar peatones en la vía a la que está entrando.",
      },
    ],
    example: {
      en: "You want to turn right at an intersection. An oncoming vehicle is going straight ahead. You must wait and give way before turning.",
      pt: "Você quer virar à direita em um cruzamento. Um veículo vindo em sentido contrário segue em frente. Você deve esperar e dar preferência antes de virar.",
      es: "Quiere girar a la derecha en una intersección. Un vehículo de frente sigue recto. Debe esperar y ceder el paso antes de girar.",
    },
    quickCheck: [
      {
        en: "What does a complete stop at a STOP sign mean?",
        pt: "O que significa parar completamente em um sinal de STOP?",
        es: "¿Qué significa detenerse completamente ante una señal de STOP?",
      },
      {
        en: "Who has priority at an uncontrolled intersection?",
        pt: "Quem tem preferência em uma interseção sem sinalização?",
        es: "¿Quién tiene prioridad en una intersección sin señalización?",
      },
      {
        en: "Who must you give way to when turning?",
        pt: "A quem você deve dar preferência ao virar?",
        es: "¿A quién debe ceder el paso al girar?",
      },
    ],
    source: {
      en: "Based on the Drive Safe Handbook — sections on intersections, turning and give way rules.",
      pt: "Baseado no Drive Safe Handbook — seções sobre intersections, turning e give way rules.",
      es: "Basado en el Drive Safe Handbook — secciones sobre intersecciones, giros y ceder el paso.",
    },
  },

  /* ── Roundabouts ────────────────────────────────────────────────── */
  {
    slug: "roundabouts",
    icon: "trendingUp",
    practiceCategory: "Give Way Rules",
    title: {
      en: "Roundabouts",
      pt: "Rotatórias",
      es: "Rotondas",
    },
    summary: {
      en: "At roundabouts, choose the correct lane before entering, give way to traffic already circulating and signal when exiting. Slow down and do not change lanes inside.",
      pt: "Em rotatórias, você escolhe a faixa correta antes de entrar, dá preferência a quem já circula e sinaliza ao sair. Reduza a velocidade e não troque de faixa dentro da rotatória.",
      es: "En rotondas, elija el carril correcto antes de entrar, ceda el paso al tráfico que ya circula y señalice al salir. Reduzca y no cambie de carril dentro.",
    },
    keyRules: [
      {
        en: "Give way to all vehicles already in the roundabout before you enter.",
        pt: "Dê preferência a todos os veículos que já estão na rotatória antes de entrar.",
        es: "Ceda el paso a todos los vehículos que ya están en la rotonda antes de entrar.",
      },
      {
        en: "Signal in good time when exiting at your intended exit.",
        pt: "Sinalize com antecedência ao sair na saída desejada.",
        es: "Señalice con tiempo al salir por su salida prevista.",
      },
      {
        en: "Choose your lane based on whether your exit is ahead, left or right.",
        pt: "Escolha a faixa de acordo com se a sua saída é à esquerda, em frente ou à direita.",
        es: "Elija el carril según si su salida está al frente, a la izquierda o a la derecha.",
      },
      {
        en: "Cyclists and pedestrians near the roundabout still need extra care.",
        pt: "Ciclistas e pedestres próximos à rotatória ainda precisam de atenção extra.",
        es: "Los ciclistas y peatones cerca de la rotonda aún requieren atención extra.",
      },
    ],
    mistakes: [
      {
        en: "Entering without slowing or checking traffic inside.",
        pt: "Entrar sem reduzir ou sem verificar a circulação interna.",
        es: "Entrar sin reducir o sin comprobar el tráfico interior.",
      },
      {
        en: "Stopping unnecessarily inside the roundabout when it is clear.",
        pt: "Parar desnecessariamente dentro da rotatória quando o fluxo está livre.",
        es: "Detenerse innecesariamente dentro de la rotonda cuando está despejado.",
      },
    ],
    example: {
      en: "You will take the second exit. Use the correct lane, slow down, give way to the right, enter when safe and signal as you leave.",
      pt: "Você vai sair na segunda saída. Entra na faixa correta, reduz, cede passagem à direita, entra quando seguro e liga a seta ao sair.",
      es: "Va a tomar la segunda salida. Use el carril correcto, reduzca, ceda el paso a la derecha, entre cuando sea seguro y señalice al salir.",
    },
    quickCheck: [
      {
        en: "Who must you give way to when entering a roundabout?",
        pt: "A quem você deve dar preferência ao entrar na rotatória?",
        es: "¿A quién debe ceder el paso al entrar en una rotonda?",
      },
      {
        en: "When should you signal to exit?",
        pt: "Quando você deve sinalizar ao sair?",
        es: "¿Cuándo debe señalizar al salir?",
      },
      {
        en: "Is it safe to change lanes inside a roundabout?",
        pt: "É seguro mudar de faixa dentro da rotatória?",
        es: "¿Es seguro cambiar de carril dentro de la rotonda?",
      },
    ],
    source: {
      en: "Based on the Drive Safe Handbook (WA). See transport.wa.gov.au/licensing/road-rules-handbook.asp",
      pt: "Baseado no Drive Safe Handbook (WA). transport.wa.gov.au/licensing/road-rules-handbook.asp",
      es: "Basado en el Drive Safe Handbook (WA). Ver transport.wa.gov.au/licensing/road-rules-handbook.asp",
    },
  },

  /* ── Lane Changing ──────────────────────────────────────────────── */
  {
    slug: "lane-changing",
    icon: "arrowRight",
    practiceCategory: "Road Markings",
    title: {
      en: "Lane Changing",
      pt: "Mudança de faixa",
      es: "Cambio de carril",
    },
    summary: {
      en: "Lane changes are safe only after mirrors, head checks and signalling. Continuous lines and areas near intersections often prohibit lane changes.",
      pt: "Mudar de faixa só é seguro após espelhos, verificação do ponto cego e sinalização. Linhas contínuas e áreas próximas a cruzamentos costumam proibir mudanças.",
      es: "El cambio de carril solo es seguro tras espejos, punto ciego y señalización. Las líneas continuas y zonas cerca de cruces suelen prohibirlo.",
    },
    keyRules: [
      {
        en: "Check mirrors and blind spots before each lane change.",
        pt: "Verifique espelhos e ponto cego antes de cada mudança.",
        es: "Revise espejos y punto ciego antes de cada cambio.",
      },
      {
        en: "Signal early and move only when there is a safe gap.",
        pt: "Sinalize com antecedência e só mude quando houver espaço seguro.",
        es: "Señalice con tiempo y mueva solo cuando haya hueco seguro.",
      },
      {
        en: "Do not cross a continuous line where it prohibits changing lanes.",
        pt: "Não cruze linha contínua se isso proibir a mudança.",
        es: "No cruce una línea continua donde prohíba cambiar de carril.",
      },
      {
        en: "In congestion, sudden lane changes increase side-impact risk.",
        pt: "Em congestionamento, mudanças bruscas aumentam risco de colisão lateral.",
        es: "En congestión, los cambios bruscos aumentan el riesgo de impacto lateral.",
      },
    ],
    mistakes: [
      {
        en: "Changing lanes using only the rear mirror, with no head check.",
        pt: "Mudar só olhando o espelho retrovisor, sem ponto cego.",
        es: "Cambiar solo con el retrovisor, sin mirar el punto ciego.",
      },
      {
        en: "Signalling and moving at once, with no time for others to react.",
        pt: "Sinalizar e mover ao mesmo tempo, sem tempo para outros reagirem.",
        es: "Señalizar y moverse a la vez, sin tiempo para que otros reaccionen.",
      },
    ],
    example: {
      en: "You want the right lane to exit. Indicate, shoulder check, see a vehicle in the gap and wait until it passes before moving.",
      pt: "Você quer a faixa da direita para sair. Aciona a seta, verifica pelo ombro, vê um veículo na linha de visão e espera passar antes de mudar.",
      es: "Quiere el carril derecho para salir. Intermitente, mire por encima del hombro, ve un vehículo y espere a que pase antes de moverse.",
    },
    quickCheck: [
      {
        en: "What order: mirror, blind spot or signal first?",
        pt: "Qual a ordem: espelho, ponto cego ou seta primeiro?",
        es: "¿Qué orden: espejo, punto ciego o intermitente primero?",
      },
      {
        en: "When does a continuous line prevent a lane change?",
        pt: "Quando uma linha contínua impede mudança?",
        es: "¿Cuándo una línea continua impide el cambio?",
      },
      {
        en: "Why does the blind spot matter?",
        pt: "Por que o ponto cego importa?",
        es: "¿Por qué importa el punto ciego?",
      },
    ],
    source: {
      en: "Based on the Drive Safe Handbook (WA). transport.wa.gov.au/licensing/road-rules-handbook.asp",
      pt: "Baseado no Drive Safe Handbook (WA). transport.wa.gov.au/licensing/road-rules-handbook.asp",
      es: "Basado en el Drive Safe Handbook (WA). transport.wa.gov.au/licensing/road-rules-handbook.asp",
    },
  },

  /* ── Overtaking ─────────────────────────────────────────────────── */
  {
    slug: "overtaking",
    icon: "chevronRight",
    practiceCategory: "Blind Spot & Overtaking",
    title: {
      en: "Overtaking",
      pt: "Ultrapassagem",
      es: "Adelantamiento",
    },
    summary: {
      en: "Overtake only when centre lines allow, visibility is good and you can return with a safe margin. Respect minimum passing distances for cyclists.",
      pt: "Ultrapasse só quando a linha de centro permitir, a visibilidade for suficiente e houver espaço para voltar com margem segura. Respeite distâncias mínimas para ciclistas.",
      es: "Adelante solo cuando las líneas lo permitan, haya buena visibilidad y pueda volver con margen seguro. Respete distancias mínimas con ciclistas.",
    },
    keyRules: [
      {
        en: "Never overtake where signs or continuous lines prohibit it.",
        pt: "Nunca ultrapasse onde a sinalização ou linha contínua proíbe.",
        es: "Nunca adelante donde las señales o líneas continuas lo prohíban.",
      },
      {
        en: "In WA, keep at least 1 m lateral clearance when passing cyclists on roads up to 60 km/h and 1.5 m above that.",
        pt: "Em WA, mantenha pelo menos 1 m de distância lateral de ciclistas em vias até 60 km/h e 1,5 m acima disso.",
        es: "En WA, mantenga al menos 1 m al adelantar ciclistas hasta 60 km/h y 1,5 m por encima.",
      },
      {
        en: "Do not overtake on bends or crests with reduced visibility.",
        pt: "Não ultrapasse em curvas ou topo de aclive com visibilidade reduzida.",
        es: "No adelante en curvas o cuestas con poca visibilidad.",
      },
      {
        en: "Return to your lane only when you can see the overtaken vehicle safely in your mirror.",
        pt: "Volte à sua faixa só quando puder ver com segurança o veículo ultrapassado no retrovisor.",
        es: "Vuelva a su carril solo cuando vea con seguridad al vehículo adelantado en el espejo.",
      },
    ],
    mistakes: [
      {
        en: "Passing too close to a cyclist.",
        pt: "Apertar demais o ciclista ao passar.",
        es: "Pasar demasiado cerca de un ciclista.",
      },
      {
        en: "Overtaking multiple vehicles in one manoeuvre without planning the exit.",
        pt: "Ultrapassar vários veículos de uma vez sem planejar a saída.",
        es: "Adelantar varios vehículos de golpe sin planificar la salida.",
      },
    ],
    example: {
      en: "You follow a slow car where the line is broken and visibility is clear. Signal, accelerate smoothly, pass and return leaving a safe gap.",
      pt: "Você segue um carro lento em trecho com linha tracejada e visão clara. Sinaliza, acelera com moderação, ultrapassa e retorna deixando distância segura.",
      es: "Sigue un coche lento con línea discontinua y buena visión. Señalice, acelere con suavidad, adelante y vuelva dejando margen.",
    },
    quickCheck: [
      {
        en: "When is overtaking prohibited by a continuous line?",
        pt: "Quando a ultrapassagem é proibida por linha contínua?",
        es: "¿Cuándo el adelantamiento está prohibido por línea continua?",
      },
      {
        en: "Why do cyclists need more lateral space?",
        pt: "Por que ciclistas precisam de mais espaço lateral?",
        es: "¿Por qué los ciclistas necesitan más espacio lateral?",
      },
      {
        en: "What should you check before returning to your lane?",
        pt: "O que verificar antes de voltar à faixa?",
        es: "¿Qué comprobar antes de volver a su carril?",
      },
    ],
    source: {
      en: "Based on the Drive Safe Handbook (WA). transport.wa.gov.au/licensing/road-rules-handbook.asp",
      pt: "Baseado no Drive Safe Handbook (WA). transport.wa.gov.au/licensing/road-rules-handbook.asp",
      es: "Basado en el Drive Safe Handbook (WA). transport.wa.gov.au/licensing/road-rules-handbook.asp",
    },
  },

  /* ── Alcohol & BAC ──────────────────────────────────────────────── */
  {
    slug: "alcohol-bac",
    icon: "warning",
    practiceCategory: "Alcohol & BAC",
    title: {
      en: "Alcohol & BAC",
      pt: "Álcool, drogas e direção",
      es: "Alcohol, drogas y conducción",
    },
    summary: {
      en: "Alcohol and drugs affect judgement, vision, concentration, reaction time and confidence. For novice drivers, the rule is zero BAC.",
      pt: "Álcool e drogas afetam julgamento, visão, concentração, tempo de reação e confiança. Para novice drivers, a regra é zero BAC.",
      es: "El alcohol y las drogas afectan el juicio, la visión, la concentración, el tiempo de reacción y la confianza. Para conductores novatos, la regla es cero BAC.",
    },
    keyRules: [
      {
        en: "Novice drivers are subject to a zero alcohol limit.",
        pt: "Novice drivers estão sujeitos a limite zero de álcool.",
        es: "Los conductores novatos están sujetos a límite cero de alcohol.",
      },
      {
        en: "For other drivers, the general limit is 0.05 BAC.",
        pt: "Para outros motoristas, o limite geral é 0.05 BAC.",
        es: "Para otros conductores, el límite general es 0.05 BAC.",
      },
      {
        en: "Coffee, water or soft drinks do not remove alcohol from your body. Only time does.",
        pt: "Café, água ou refrigerante não eliminam álcool do corpo. Só o tempo faz isso.",
        es: "Café, agua o refrescos no eliminan el alcohol del cuerpo. Solo el tiempo lo hace.",
      },
      {
        en: "Combining alcohol with drugs or medication can greatly increase risk.",
        pt: "Misturar álcool com drogas ou medicamentos pode aumentar muito o risco.",
        es: "Combinar alcohol con drogas o medicamentos puede aumentar mucho el riesgo.",
      },
    ],
    mistakes: [
      {
        en: "Thinking it is fine to drive after only a small amount of alcohol.",
        pt: "Achar que está tudo bem dirigir depois de beber pouco.",
        es: "Pensar que está bien conducir después de beber poco.",
      },
      {
        en: "Believing coffee or a cold shower reduces BAC.",
        pt: "Acreditar que café ou banho frio reduzem o BAC.",
        es: "Creer que el café o una ducha fría reducen el BAC.",
      },
    ],
    example: {
      en: "You drank an hour ago and feel fine. Your BAC may still be rising. If you plan to drive, the safe option is not to drink.",
      pt: "Você bebeu há uma hora e acha que já está bem. O BAC ainda pode estar subindo. Se pretende dirigir, a opção segura é não beber.",
      es: "Bebió hace una hora y se siente bien. Su BAC aún puede estar subiendo. Si va a conducir, la opción segura es no beber.",
    },
    quickCheck: [
      {
        en: "What is the alcohol limit for novice drivers?",
        pt: "Qual é o limite de álcool para novice drivers?",
        es: "¿Cuál es el límite de alcohol para conductores novatos?",
      },
      {
        en: "Does coffee reduce BAC?",
        pt: "Café reduz o BAC?",
        es: "¿El café reduce el BAC?",
      },
      {
        en: "Why does alcohol create false confidence?",
        pt: "Por que álcool dá uma falsa sensação de confiança?",
        es: "¿Por qué el alcohol crea falsa confianza?",
      },
    ],
    source: {
      en: "Based on the Drive Safe Handbook — section 1.3 Alcohol and Drugs.",
      pt: "Baseado no Drive Safe Handbook — seção 1.3 Alcohol and Drugs.",
      es: "Basado en el Drive Safe Handbook — sección 1.3 Alcohol and Drugs.",
    },
  },

  /* ── Road Safety ─────────────────────────────────────────────────── */
  {
    slug: "road-safety",
    icon: "safety",
    practiceCategory: "Road Safety",
    title: {
      en: "Road Safety",
      pt: "Segurança no trânsito",
      es: "Seguridad vial",
    },
    summary: {
      en: "Safe driving requires constant awareness — fatigue, distractions and following distance are among the leading causes of crashes. Small habits make a big difference.",
      pt: "Dirigir com segurança exige atenção constante — fadiga, distrações e distância de seguimento estão entre as principais causas de acidentes.",
      es: "Conducir de forma segura requiere atención constante — la fatiga, las distracciones y la distancia de seguimiento están entre las principales causas de accidentes.",
    },
    keyRules: [
      {
        en: "Never drive while drowsy. If you feel tired, stop and rest. Fatigue affects reaction time as much as alcohol.",
        pt: "Nunca dirija com sono. Se sentir cansaço, pare e descanse. A fadiga compromete o tempo de reação tanto quanto o álcool.",
        es: "Nunca conduzca con sueño. Si se siente cansado, pare y descanse. La fatiga afecta el tiempo de reacción tanto como el alcohol.",
      },
      {
        en: "Mobile phones — including hands-free — can distract attention. Learner drivers must not use any phone while driving in WA.",
        pt: "Celulares — inclusive os viva-voz — podem distrair a atenção. Motoristas novatos não podem usar nenhum celular ao dirigir em WA.",
        es: "Los móviles — incluso manos libres — pueden distraer la atención. Los conductores novatos no pueden usar ningún teléfono mientras conducen en WA.",
      },
      {
        en: "Keep a safe following distance: at least a 3-second gap from the vehicle ahead in dry conditions.",
        pt: "Mantenha distância segura: pelo menos 3 segundos do veículo à frente em condições secas.",
        es: "Mantenga una distancia segura: al menos 3 segundos del vehículo de delante en condiciones secas.",
      },
      {
        en: "Always check mirrors regularly and stay aware of your surroundings, not just what is directly ahead.",
        pt: "Verifique os espelhos regularmente e esteja ciente do ambiente ao redor — não apenas o que está à frente.",
        es: "Revise los espejos regularmente y sea consciente del entorno — no solo lo que tiene delante.",
      },
    ],
    mistakes: [
      {
        en: "Thinking short trips do not require the same level of attention — most crashes happen close to home.",
        pt: "Achar que trajetos curtos não exigem o mesmo nível de atenção — a maioria dos acidentes acontece perto de casa.",
        es: "Creer que los trayectos cortos no requieren el mismo nivel de atención — la mayoría de los accidentes ocurren cerca de casa.",
      },
      {
        en: "Using a phone while stopped at traffic lights — in WA this is illegal for learner drivers.",
        pt: "Usar o celular parado no sinal — em WA, isso é ilegal para motoristas novatos.",
        es: "Usar el teléfono parado en un semáforo — en WA esto es ilegal para conductores novatos.",
      },
    ],
    example: {
      en: "You feel a little tired on the way home. Rather than pushing through, you pull over safely to rest for 15 minutes. This simple decision can prevent a serious crash.",
      pt: "Você sente um pouco de sono no caminho para casa. Em vez de insistir, para com segurança para descansar 15 minutos. Essa decisão pode prevenir um acidente grave.",
      es: "Siente un poco de sueño de camino a casa. En lugar de seguir, para con seguridad para descansar 15 minutos. Esta decisión puede prevenir un accidente grave.",
    },
    quickCheck: [
      {
        en: "How does fatigue affect driving?",
        pt: "Como a fadiga afeta a direção?",
        es: "¿Cómo afecta la fatiga a la conducción?",
      },
      {
        en: "What is the minimum safe following distance in dry conditions?",
        pt: "Qual é a distância mínima de seguimento em condições secas?",
        es: "¿Cuál es la distancia mínima de seguimiento en condiciones secas?",
      },
      {
        en: "Can a learner driver use a hands-free phone in WA?",
        pt: "Um motorista novato pode usar viva-voz em WA?",
        es: "¿Puede un conductor novato usar manos libres en WA?",
      },
    ],
    source: {
      en: "Based on the Drive Safe Handbook (WA) — sections on fatigue, distractions and safe following distances.",
      pt: "Baseado no Drive Safe Handbook (WA) — seções sobre fadiga, distrações e distâncias de seguimento.",
      es: "Basado en el Drive Safe Handbook (WA) — secciones sobre fatiga, distracciones y distancias de seguimiento.",
    },
  },

  /* ── Weather Conditions ─────────────────────────────────────────── */
  {
    slug: "weather-conditions",
    icon: "lightbulb",
    practiceCategory: "Road Safety",
    title: {
      en: "Weather Conditions",
      pt: "Condições climáticas",
      es: "Condiciones climáticas",
    },
    summary: {
      en: "Rain, fog and low light need more following distance, lower speed and correct use of lights. Plan to stop if visibility is very poor.",
      pt: "Chuva, neblina e baixa luz exigem mais distância de seguimento, velocidade menor e uso correto de faróis. Planeje paradas se a visibilidade for muito ruim.",
      es: "Lluvia, niebla y poca luz exigen más distancia, menos velocidad y luces correctas. Planee detenerse si la visibilidad es muy mala.",
    },
    keyRules: [
      {
        en: "Increase the gap to the vehicle ahead on wet roads.",
        pt: "Aumente a distância do veículo da frente em piso molhado.",
        es: "Aumente la distancia con el vehículo de delante en mojado.",
      },
      {
        en: "In dense fog, slow down and use appropriate lights; avoid high beam if it reflects back.",
        pt: "Em neblina densa, reduza e use luzes adequadas; evite luz alta se reflete de volta.",
        es: "En niebla densa, reduzca y use luces adecuadas; evite largas si deslumbran.",
      },
      {
        en: "Aquaplaning: ease off the accelerator smoothly and avoid harsh braking.",
        pt: "Aquaplanagem: solte o acelerador suavemente e evite freadas bruscas.",
        es: "Aquaplaning: suelte el acelerador con suavidad y evite frenar en seco.",
      },
      {
        en: "Clean windscreen and wipers improve visibility — check before you drive.",
        pt: "Para-brisa e limpadores limpos melhoram visibilidade — verifique antes de viajar.",
        es: "Parabrisas y limpiaparabrisas limpios mejoran la visibilidad — revíselos antes.",
      },
    ],
    mistakes: [
      {
        en: "Keeping dry-road speed when it rains.",
        pt: "Manter a mesma velocidade da estrada seca quando chove.",
        es: "Mantener la velocidad de piso seco cuando llueve.",
      },
      {
        en: "Following too closely because 'it is only light rain'.",
        pt: "Seguir muito perto porque 'só é chuva leve'.",
        es: "Ir muy pegado porque 'solo es lluvia ligera'.",
      },
    ],
    example: {
      en: "Heavy rain starts on the freeway. You slow down, widen the gap, use low beam and avoid sudden steering.",
      pt: "Começa a chover forte na rodovia. Você reduz, aumenta a distância, liga os faróis baixos e evita mudanças bruscas de direção.",
      es: "Empieza a llover fuerte. Reduce, aumenta distancia, enciende cortas y evita giros bruscos.",
    },
    quickCheck: [
      {
        en: "Why does a wet road increase braking distance?",
        pt: "Por que o piso molhado aumenta a distância de frenagem?",
        es: "¿Por qué el mojado aumenta la distancia de frenado?",
      },
      {
        en: "What should you do if you feel aquaplaning?",
        pt: "O que fazer se sentir aquaplanagem?",
        es: "¿Qué hacer si nota aquaplaning?",
      },
      {
        en: "Do high beams always help in fog?",
        pt: "Faróis altos ajudam sempre na neblina?",
        es: "¿Las largas siempre ayudan en niebla?",
      },
    ],
    source: {
      en: "Based on the Drive Safe Handbook (WA). transport.wa.gov.au/licensing/road-rules-handbook.asp",
      pt: "Baseado no Drive Safe Handbook (WA). transport.wa.gov.au/licensing/road-rules-handbook.asp",
      es: "Basado en el Drive Safe Handbook (WA). transport.wa.gov.au/licensing/road-rules-handbook.asp",
    },
  },

  /* ── Seatbelts ──────────────────────────────────────────────────── */
  {
    slug: "seatbelts",
    icon: "success",
    practiceCategory: "Road Safety",
    title: {
      en: "Seatbelts",
      pt: "Cintos de segurança",
      es: "Cinturones de seguridad",
    },
    summary: {
      en: "All occupants must wear seatbelts properly adjusted. Children need child restraints appropriate to age and size.",
      pt: "Todos os ocupantes devem usar cinto adequadamente ajustado. Crianças precisam de sistemas de retenção apropriados à idade e tamanho.",
      es: "Todos los ocupantes deben usar el cinturón bien ajustado. Los niños necesitan sistemas de retención adecuados a la edad y talla.",
    },
    keyRules: [
      {
        en: "The driver is responsible for ensuring children wear belts or restraints correctly.",
        pt: "Motorista é responsável por garantir que menores usem cinto ou cadeirinha corretamente.",
        es: "El conductor es responsable de que los menores usen cinturón o sillita correctamente.",
      },
      {
        en: "The belt should cross the shoulder and pelvis, not under the arm or behind the back.",
        pt: "O cinto deve cruzar o ombro e a pelve, não sob o braço ou atrás das costas.",
        es: "El cinturón debe cruzar hombro y pelvis, no bajo el brazo ni detrás de la espalda.",
      },
      {
        en: "Airbags do not replace seatbelts; they work together.",
        pt: "Airbags não substituem cintos; trabalham em conjunto.",
        es: "Los airbags no sustituyen el cinturón; funcionan juntos.",
      },
      {
        en: "Loose items in the cabin can become projectiles in braking or a crash.",
        pt: "Carga solta no habitáculo pode virar projétil em frenagem ou colisão.",
        es: "Objetos sueltos pueden convertirse en proyectiles al frenar o chocar.",
      },
    ],
    mistakes: [
      {
        en: "Wearing only the lap part for 'comfort'.",
        pt: "Colocar apenas o cinto abdominal para 'mais conforto'.",
        es: "Usar solo la banda abdominal por 'comodidad'.",
      },
      {
        en: "Carrying a child on the lap instead of an approved seat.",
        pt: "Transportar criança no colo em vez de assento homologado.",
        es: "Llevar un niño en brazos en lugar de asiento homologado.",
      },
    ],
    example: {
      en: "Before leaving, you check everyone has clicked in and the child seat is firm on ISOFIX or the three-point belt.",
      pt: "Antes de sair, você verifica se todos clicaram o cinto e se a cadeirinha está firme nos ISOFIX/cinto de três pontos.",
      es: "Antes de salir, comprueba que todos abrochen el cinturón y la sillita esté firme en ISOFIX o cinturón de tres puntos.",
    },
    quickCheck: [
      {
        en: "Who is responsible for under-age passengers' seatbelts?",
        pt: "Quem é responsável pelos cintos dos passageiros menores?",
        es: "¿Quién es responsable de los cinturones de menores?",
      },
      {
        en: "Why are loose items dangerous?",
        pt: "Por que objetos soltos são perigosos?",
        es: "¿Por qué los objetos sueltos son peligrosos?",
      },
      {
        en: "Does an airbag replace a seatbelt?",
        pt: "Airbag substitui cinto?",
        es: "¿El airbag sustituye el cinturón?",
      },
    ],
    source: {
      en: "Based on the Drive Safe Handbook (WA). transport.wa.gov.au/licensing/road-rules-handbook.asp",
      pt: "Baseado no Drive Safe Handbook (WA). transport.wa.gov.au/licensing/road-rules-handbook.asp",
      es: "Basado en el Drive Safe Handbook (WA). transport.wa.gov.au/licensing/road-rules-handbook.asp",
    },
  },

  /* ── Demerit Points ─────────────────────────────────────────────── */
  {
    slug: "demerit-points",
    icon: "checklist",
    title: {
      en: "Demerit Points",
      pt: "Sistema de pontos (demerits)",
      es: "Sistema de puntos WA",
    },
    summary: {
      en: "Recorded offences can add demerit points to your WA licence. Too many can lead to suspension or other actions — always check the official guide.",
      pt: "Infrações gravadas podem somar pontos (demerits) na sua licença WA. Acumular demais pode levar a suspensão ou outras medidas — consulte sempre o guia oficial.",
      es: "Las infracciones pueden sumar puntos demerit en su licencia WA. Demasiados pueden llevar a suspensión — consulte la guía oficial.",
    },
    keyRules: [
      {
        en: "Points attach to the licence holder and can affect insurance and permission to drive.",
        pt: "Pontos aplicam-se ao titular da licença e podem afetar seguro e permissão para dirigir.",
        es: "Los puntos van al titular y pueden afectar seguro y permiso para conducir.",
      },
      {
        en: "Novice and professional drivers may have different thresholds or rules.",
        pt: "Novatos e condutores profissionais podem ter limites ou regras diferentes.",
        es: "Novatos y conductores profesionales pueden tener umbrales distintos.",
      },
      {
        en: "Respecting speed and alcohol limits reduces points risk and crashes.",
        pt: "Respeitar limites de velocidade e álcool reduz risco de pontos e colisões.",
        es: "Respetar límites de velocidad y alcohol reduce puntos y siniestros.",
      },
      {
        en: "Use official WA sources only for up-to-date offence and point values.",
        pt: "Use apenas fontes oficiais WA para valores atualizados de infrações e pontos.",
        es: "Use solo fuentes oficiales WA para valores actualizados.",
      },
    ],
    mistakes: [
      {
        en: "Thinking 'just one minor offence' has no cumulative consequence.",
        pt: "Achar que 'só uma infração leve' não tem consequência acumulada.",
        es: "Pensar que 'solo una multa leve' no acumula consecuencias.",
      },
      {
        en: "Confusing other states' rules with WA.",
        pt: "Confundir regras de outros estados com WA.",
        es: "Confundir reglas de otros estados con WA.",
      },
    ],
    example: {
      en: "You receive an infringement notice with points. You check the WA Department of Transport site for your current tally and accumulation period.",
      pt: "Você recebe uma notificação de multa com pontos. Verifica no site do Departamento de Transportes WA quantos pontos já tem e qual o período de acumulação.",
      es: "Recibe una multa con puntos. Consulta en el sitio de Transport WA su saldo y el período de acumulación.",
    },
    quickCheck: [
      {
        en: "Where should you check current points and suspension rules?",
        pt: "Onde verificar pontos atualizados e regras de suspensão?",
        es: "¿Dónde comprobar puntos y suspensiones?",
      },
      {
        en: "Why can several 'small' offences still be serious?",
        pt: "Por que várias infrações 'pequenas' ainda são sérias?",
        es: "¿Por qué varias infracciones 'pequeñas' siguen siendo graves?",
      },
      {
        en: "Do novices have the same point limits as full licence holders?",
        pt: "Novatos têm os mesmos limites de pontos que habilitados plenos?",
        es: "¿Los novatos tienen los mismos límites que los habilitados?",
      },
    ],
    source: {
      en: "Educational summary; official details: transport.wa.gov.au/licensing/improve-your-driving-behaviour.asp",
      pt: "Resumo educativo; valores oficiais: transport.wa.gov.au/licensing/improve-your-driving-behaviour.asp",
      es: "Resumen educativo; detalles oficiales: transport.wa.gov.au/licensing/improve-your-driving-behaviour.asp",
    },
  },
];

export function findTopic(slug: string): LearnTopic | undefined {
  return LEARN_TOPICS.find((t) => t.slug === slug);
}
