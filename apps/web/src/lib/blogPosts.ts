import type { UiLang } from "@/lib/i18n";
import type { IconName } from "@/components/icons";
import type { AuStateCode } from "@kanga/core";

export type BlogBlock =
  | { type: "paragraph"; text: Record<UiLang, string> }
  | { type: "heading"; text: Record<UiLang, string> }
  | { type: "list"; items: Record<UiLang, string>[] };

export interface BlogPost {
  slug: string;
  icon: IconName;
  /** Which state this post is about. Blog coverage only exists for states with a live question bank. */
  state: AuStateCode;
  /**
   * Whether this post is live on the site. Draft posts (state not yet launched
   * with a question bank) stay in the codebase but are excluded from the blog
   * index, sitemap, llms.txt and direct URL access until flipped to true.
   */
  published: boolean;
  /** ISO date, used for display and sitemap lastModified. */
  publishedAt: string;
  readingMinutes: number;
  title: Record<UiLang, string>;
  excerpt: Record<UiLang, string>;
  body: BlogBlock[];
  sourceLabel: Record<UiLang, string>;
  sourceUrl: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "driving-in-wa-guide-for-newcomers",
    icon: "safety",
    state: "WA",
    published: true,
    publishedAt: "2026-08-11",
    readingMinutes: 8,
    title: {
      en: "Driving in Western Australia: the official safety guide, explained",
      pt: "Dirigir na Western Australia: o guia oficial de segurança, explicado",
      es: "Conducir en Western Australia: la guía oficial de seguridad, explicada"
    },
    excerpt: {
      en: "The WA government publishes a driving guide for newcomers in 12 languages, but not in Portuguese or Spanish. Here is what it says, translated and explained.",
      pt: "O governo de WA publica um guia de direção para quem chega de fora em 12 idiomas, mas não em português. Veja o que ele diz, traduzido e explicado.",
      es: "El gobierno de WA publica una guía de conducción para recién llegados en 12 idiomas, pero no en español. Esto es lo que dice, traducido y explicado."
    },
    sourceLabel: {
      en: "Road Safety Commission of Western Australia, Guide to Driving on WA Roads",
      pt: "Road Safety Commission of Western Australia, Guide to Driving on WA Roads",
      es: "Road Safety Commission of Western Australia, Guide to Driving on WA Roads"
    },
    sourceUrl: "https://www.wa.gov.au/government/publications/guide-driving-wa-roads-multilingual",
    body: [
      {
        type: "paragraph",
        text: {
          en: "The Road Safety Commission of Western Australia publishes an official Guide to Driving on WA Roads for people who are new to the state. It is available in 12 languages, including Arabic, Mandarin, Vietnamese and Japanese. Portuguese and Spanish are not on that list. New South Wales does offer its Road User Handbook in Spanish, but not in Portuguese either. So if Portuguese is your first language, no Australian state currently publishes an official driving safety guide for you. This post closes that gap for Western Australia, based directly on the official guide.",
          pt: "A Road Safety Commission of Western Australia publica um guia oficial, o Guide to Driving on WA Roads, para quem é novo no estado. Ele está disponível em 12 idiomas, incluindo árabe, mandarim, vietnamita e japonês. Português e espanhol não estão nessa lista. A New South Wales até oferece o Road User Handbook em espanhol, mas também não em português. Ou seja, se o português é a sua língua materna, nenhum estado australiano publica hoje um guia oficial de segurança na direção para você. Este post preenche essa lacuna para a Western Australia, com base direta no guia oficial.",
          es: "La Road Safety Commission of Western Australia publica una guía oficial, la Guide to Driving on WA Roads, para quienes son nuevos en el estado. Está disponible en 12 idiomas, incluidos árabe, mandarín, vietnamita y japonés. El portugués y el español no están en esa lista. New South Wales sí ofrece su Road User Handbook en español, pero tampoco en portugués. Es decir, si el español es tu idioma, hasta ahora ningún estado australiano publica una guía oficial de seguridad al conducir para ti en tu idioma. Este artículo llena ese vacío para Western Australia, basado directamente en la guía oficial."
        }
      },
      {
        type: "heading",
        text: {
          en: "Which side of the road",
          pt: "De que lado dirigir",
          es: "Por qué lado se conduce"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "In Australia, every vehicle drives on the left side of the road, and the driver sits on the right side of the car. If you learned to drive in a country that drives on the right, this is the single biggest habit to unlearn. The official guide suggests taping a note to your dashboard as a reminder in your first weeks, and to take extra care at intersections and when turning, since that is where old habits tend to slip back in. On a multi lane road with a speed limit of 90 km/h or more, stay in the left lane unless you are overtaking, the left lane is a bus or cycle lane, or you need to avoid an obstruction.",
          pt: "Na Austrália, todos os veículos andam pelo lado esquerdo da via, e o motorista fica do lado direito do carro. Se você aprendeu a dirigir em um país que anda pela direita, esse é o maior hábito a desaprender. O guia oficial sugere colar um lembrete no painel nas primeiras semanas, e redobrar a atenção em cruzamentos e conversões, que é onde o hábito antigo mais volta sem você perceber. Em vias com mais de uma faixa e limite de 90 km/h ou mais, mantenha-se na faixa da esquerda, a não ser que esteja ultrapassando, a faixa da esquerda seja de ônibus ou bicicleta, ou você precise desviar de um obstáculo.",
          es: "En Australia, todos los vehículos circulan por el lado izquierdo de la vía, y el conductor va sentado del lado derecho del auto. Si aprendiste a conducir en un país donde se maneja por la derecha, este es el hábito más grande que hay que desaprender. La guía oficial sugiere pegar una nota en el tablero como recordatorio durante las primeras semanas, y prestar más atención en las intersecciones y al girar, que es donde el hábito antiguo suele volver sin darte cuenta. En vías de más de un carril con límite de 90 km/h o más, mantente en el carril izquierdo, salvo que estés adelantando, el carril izquierdo sea de bus o bicicleta, o necesites evitar un obstáculo."
        }
      },
      {
        type: "heading",
        text: {
          en: "Alcohol, drugs and mobile phones: zero tolerance for learners",
          pt: "Álcool, drogas e celular: tolerância zero para learners",
          es: "Alcohol, drogas y celular: tolerancia cero para learners"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Learner and provisional drivers must have zero blood alcohol content. There is no small amount that is allowed.",
            pt: "Motoristas learner e provisional precisam ter zero de álcool no sangue. Não existe uma quantidade pequena permitida.",
            es: "Los conductores learner y provisional deben tener cero alcohol en sangre. No existe una cantidad pequeña permitida."
          },
          {
            en: "Using a mobile phone while driving is not allowed for any driver, including holding it, texting or using it as a GPS unless it is fixed in a mount.",
            pt: "Usar o celular ao dirigir não é permitido para nenhum motorista, incluindo segurar o aparelho, digitar mensagens ou usá-lo como GPS a não ser que esteja fixo em um suporte.",
            es: "Usar el celular mientras se conduce no está permitido para ningún conductor, incluido sostenerlo, escribir mensajes o usarlo como GPS salvo que esté fijo en un soporte."
          },
          {
            en: "Seatbelts are compulsory for the driver and every passenger, every trip, no matter how short.",
            pt: "O cinto de segurança é obrigatório para o motorista e todos os passageiros, em todo trajeto, por mais curto que seja.",
            es: "El cinturón de seguridad es obligatorio para el conductor y todos los pasajeros, en cada viaje, sin importar cuán corto sea."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Roundabouts, merging and giving way",
          pt: "Rotatórias, fusão de faixas e ceder passagem",
          es: "Rotondas, fusión de carriles y ceder el paso"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Roundabouts are common in Western Australia and confuse a lot of newcomers. Always give way to traffic already on the roundabout, coming from your right. Use your indicator to signal your exit, not your entry. When two lanes merge into one, the general rule is to let one vehicle from each lane go alternately, sometimes called a zip merge, rather than one lane cutting in front of the other. U-turns are only allowed where there is a clear view of traffic in both directions and no sign prohibiting it.",
          pt: "Rotatórias são muito comuns na Western Australia e costumam confundir quem chegou agora. Sempre dê passagem para quem já está na rotatória, vindo da sua direita. Use a seta para sinalizar a saída, não a entrada. Quando duas faixas se juntam em uma, a regra geral é alternar um veículo de cada faixa, o chamado zip merge, em vez de uma faixa simplesmente cortar a frente da outra. Retornos só são permitidos onde há visão clara do trânsito nos dois sentidos e nenhuma placa proibindo.",
          es: "Las rotondas son muy comunes en Western Australia y suelen confundir a quien recién llega. Siempre cede el paso a quien ya está en la rotonda, viniendo desde tu derecha. Usa el intermitente para señalar la salida, no la entrada. Cuando dos carriles se unen en uno, la regla general es alternar un vehículo de cada carril, lo que se conoce como zip merge, en vez de que un carril simplemente se adelante al otro. Los giros en U solo están permitidos donde hay visión clara del tránsito en ambos sentidos y ninguna señal que lo prohíba."
        }
      },
      {
        type: "heading",
        text: {
          en: "Sharing the road",
          pt: "Dividindo a via com outros",
          es: "Compartir la vía"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Bicycle riders: leave at least one metre of space when passing at speeds up to 60 km/h, and 1.5 metres above that. You may cross a continuous centre line to overtake a cyclist safely.",
            pt: "Ciclistas: deixe pelo menos um metro de distância ao ultrapassar em vias de até 60 km/h, e 1,5 metro acima disso. Você pode cruzar uma linha contínua central para ultrapassar um ciclista com segurança.",
            es: "Ciclistas: deja al menos un metro de distancia al adelantar en vías de hasta 60 km/h, y 1,5 metros por encima de eso. Puedes cruzar una línea continua central para adelantar a un ciclista de forma segura."
          },
          {
            en: "Pedestrians always have priority at marked crossings and when you are turning across a footpath.",
            pt: "Pedestres sempre têm prioridade em faixas de pedestre e quando você está convertendo cruzando uma calçada.",
            es: "Los peatones siempre tienen prioridad en los cruces peatonales y cuando estás girando y cruzas una vereda."
          },
          {
            en: "Emergency vehicles with lights or sirens on must be given way to. If it is safe, move to the left and slow down or stop.",
            pt: "Veículos de emergência com luzes ou sirene ligadas têm prioridade absoluta. Se for seguro, mova-se para a esquerda e diminua a velocidade ou pare.",
            es: "A los vehículos de emergencia con luces o sirena encendidas hay que cederles el paso. Si es seguro, muévete a la izquierda y reduce la velocidad o detente."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Driving outside the city: what changes",
          pt: "Dirigindo fora da cidade: o que muda",
          es: "Conducir fuera de la ciudad: qué cambia"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Western Australia is bigger than the whole of Western Europe, and the distances between towns are usually longer than they look on a map. The official guide dedicates a full section to regional and remote driving, because the risks there are different from the city.",
          pt: "A Western Australia é maior que toda a Europa Ocidental junta, e as distâncias entre cidades costumam ser bem maiores do que parecem no mapa. O guia oficial dedica uma seção inteira à direção em áreas regionais e remotas, porque os riscos ali são diferentes dos da cidade.",
          es: "Western Australia es más grande que toda Europa Occidental junta, y las distancias entre pueblos suelen ser mucho más largas de lo que parecen en el mapa. La guía oficial dedica una sección completa a la conducción en zonas regionales y remotas, porque los riesgos ahí son distintos a los de la ciudad."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Fatigue: plan rest stops on long drives, and swap drivers if you feel drowsy. Fatigue is treated as seriously as drink driving.",
            pt: "Fadiga: planeje paradas para descanso em viagens longas, e revezem no volante se sentir sono. A fadiga é tratada com a mesma seriedade que dirigir alcoolizado.",
            es: "Fatiga: planifica paradas de descanso en viajes largos, y cambia de conductor si sientes sueño. La fatiga se trata con la misma seriedad que conducir bajo los efectos del alcohol."
          },
          {
            en: "Wildlife: kangaroos, cattle and emus can appear on the road with no warning, especially around dawn and dusk. Slow down in signed areas at those times.",
            pt: "Animais: cangurus, gado e emas podem aparecer na pista sem aviso, especialmente ao amanhecer e ao entardecer. Reduza a velocidade em áreas sinalizadas nesses horários.",
            es: "Fauna: canguros, ganado y emús pueden aparecer en la vía sin aviso, especialmente al amanecer y al atardecer. Reduce la velocidad en áreas señalizadas en esos horarios."
          },
          {
            en: "Road trains: these multi trailer trucks can be up to 53.5 metres long. Only overtake on a straight, clear stretch with plenty of visibility, and expect the overtake to take longer than you think.",
            pt: "Road trains: esses caminhões com vários reboques podem chegar a 53,5 metros de comprimento. Só ultrapasse em um trecho reto, livre e com boa visibilidade, e espere que a ultrapassagem demore mais do que você imagina.",
            es: "Road trains: estos camiones con varios remolques pueden llegar a 53,5 metros de largo. Adelanta solo en un tramo recto, despejado y con buena visibilidad, y espera que el adelantamiento tarde más de lo que crees."
          },
          {
            en: "Gravel roads: reduce your speed, keep a firm but relaxed grip on the wheel, and avoid sudden braking or steering.",
            pt: "Estradas de cascalho: reduza a velocidade, mantenha as mãos firmes mas relaxadas no volante, e evite frear ou virar bruscamente.",
            es: "Caminos de ripio: reduce la velocidad, mantén las manos firmes pero relajadas en el volante, y evita frenar o girar bruscamente."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Where this information comes from",
          pt: "De onde vem essa informação",
          es: "De dónde viene esta información"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Everything above is adapted from the official Guide to Driving on WA Roads, published by the Road Safety Commission of Western Australia. It is not a substitute for the Drive Safe Handbook, which is the actual study material for the WA learner theory test. Use this post to understand real driving conditions, and use KangaLearner's Learn section and practice questions to prepare for the test itself.",
          pt: "Tudo acima é uma adaptação do guia oficial Guide to Driving on WA Roads, publicado pela Road Safety Commission of Western Australia. Isso não substitui o Drive Safe Handbook, que é o material de estudo oficial para a prova teórica de learner de WA. Use este post para entender as condições reais de direção, e use a seção Aprender e as perguntas de prática do KangaLearner para se preparar para a prova em si.",
          es: "Todo lo anterior es una adaptación de la guía oficial Guide to Driving on WA Roads, publicada por la Road Safety Commission of Western Australia. Esto no reemplaza el Drive Safe Handbook, que es el material de estudio oficial para el examen teórico de learner de WA. Usa este artículo para entender las condiciones reales de manejo, y usa la sección Aprender y las preguntas de práctica de KangaLearner para prepararte para el examen en sí."
        }
      }
    ]
  },
  {
    slug: "wa-learner-theory-test-booking-guide",
    icon: "checklist",
    state: "WA",
    published: true,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "How to book and pass the WA learner theory test",
      pt: "Como marcar e passar na prova teórica de learner de WA",
      es: "Cómo reservar y aprobar el examen teórico de learner de WA"
    },
    excerpt: {
      en: "A step by step guide to the WA Computerised Theory Test: the DoTDirect account, proof of identity, fees and what happens on the day.",
      pt: "Um guia passo a passo da prova teórica computadorizada de WA: conta DoTDirect, documentos de identidade, taxas e o que acontece no dia.",
      es: "Una guía paso a paso del examen teórico computarizado de WA: cuenta DoTDirect, documentos de identidad, tarifas y que pasa el día del examen."
    },
    sourceLabel: {
      en: "Transport WA, Take your theory test",
      pt: "Transport WA, Take your theory test",
      es: "Transport WA, Take your theory test"
    },
    sourceUrl:
      "https://www.transport.wa.gov.au/licensing/drivers-licence/get-a-licence/car/take-theory-test",
    body: [
      {
        type: "paragraph",
        text: {
          en: "In Western Australia the learner theory test is called the Computerised Theory Test, or CTT. It is 30 multiple choice questions, and you need at least 24 correct to pass. A pass is valid for 5 years. This post walks through the official process to book and sit it, based on Transport WA's own pages.",
          pt: "Na Western Australia, a prova teórica de learner se chama Computerised Theory Test, ou CTT. São 30 questões de múltipla escolha, e você precisa acertar pelo menos 24 para passar. A aprovação vale por 5 anos. Este post mostra o processo oficial pra marcar e fazer a prova, com base nas páginas da própria Transport WA.",
          es: "En Western Australia, el examen teórico de learner se llama Computerised Theory Test, o CTT. Son 30 preguntas de opción múltiple, y necesitas al menos 24 correctas para aprobar. La aprobación es válida por 5 años. Este post muestra el proceso oficial para reservar y presentar el examen, basado en las páginas de la propia Transport WA."
        }
      },
      {
        type: "heading",
        text: {
          en: "Set up a DoTDirect account first",
          pt: "Crie uma conta DoTDirect primeiro",
          es: "Crea primero una cuenta DoTDirect"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "DoTDirect is Transport WA's online portal for managing licences and registrations. You can register online with an email address plus an existing WA licence or vehicle registration number, in person at a service centre with ID, or by phone on 13 11 56. Every login needs a one-time SMS code. You will use DoTDirect later to book your practical driving assessment, but the theory test itself is usually booked differently, see below.",
          pt: "O DoTDirect é o portal online da Transport WA pra gerenciar licenças e registros. Você pode se cadastrar online com um email mais um número de licença ou registro de veículo de WA, presencialmente num centro de atendimento com documento, ou por telefone no 13 11 56. Todo login pede um código por SMS de uso único. Você vai usar o DoTDirect depois pra marcar sua avaliação prática de direção, mas a prova teórica normalmente é marcada de outro jeito, veja abaixo.",
          es: "DoTDirect es el portal en línea de Transport WA para gestionar licencias y registros. Puedes registrarte en línea con un correo más un número de licencia o registro de vehículo de WA, en persona en un centro de atención con identificación, o por teléfono al 13 11 56. Cada inicio de sesión pide un código por SMS de un solo uso. Vas a usar DoTDirect más adelante para reservar tu evaluación práctica de manejo, pero el examen teórico normalmente se reserva de otra forma, mira abajo."
        }
      },
      {
        type: "heading",
        text: {
          en: "Proof of identity",
          pt: "Comprovação de identidade",
          es: "Comprobación de identidad"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "First time applicants need 5 original documents, no photocopies, covering different categories: something that establishes your identity in Australia (such as your visa together with your overseas passport, or an ImmiCard), something that links the document to you (like your current overseas passport), and documents that show your presence in the community and your residential address, such as a bank statement, a letter from your employer, or written correspondence from your education institution less than 12 months old. If you are newly arrived without a Medicare card or Australian bank history yet, a combination of your passport, visa, and a letter from your university or college can work, but confirm the exact combination with Transport WA (13 11 56) before your appointment, since identity rules are strict and get checked carefully.",
          pt: "Quem está aplicando pela primeira vez precisa de 5 documentos originais, sem cópias, cobrindo categorias diferentes: algo que comprove sua identidade na Austrália (como seu visto junto com seu passaporte estrangeiro, ou um ImmiCard), algo que ligue o documento a você (como seu passaporte estrangeiro atual), e documentos que mostrem sua presença na comunidade e seu endereço residencial, como um extrato bancário, uma carta do empregador, ou correspondência da sua instituição de ensino com menos de 12 meses. Se você chegou recentemente e ainda não tem cartão Medicare ou histórico bancário na Austrália, uma combinação de passaporte, visto e carta da universidade ou faculdade costuma funcionar, mas confirme a combinação exata com a Transport WA (13 11 56) antes do seu atendimento, porque as regras de identidade são rigorosas e conferidas com cuidado.",
          es: "Quien aplica por primera vez necesita 5 documentos originales, sin fotocopias, cubriendo categorías distintas: algo que establezca tu identidad en Australia (como tu visa junto con tu pasaporte extranjero, o un ImmiCard), algo que vincule el documento a ti (como tu pasaporte extranjero actual), y documentos que muestren tu presencia en la comunidad y tu dirección residencial, como un extracto bancario, una carta del empleador, o correspondencia de tu institución educativa de menos de 12 meses. Si llegaste recientemente y aún no tienes tarjeta Medicare ni historial bancario en Australia, una combinación de pasaporte, visa y carta de tu universidad o instituto suele funcionar, pero confirma la combinación exacta con Transport WA (13 11 56) antes de tu cita, porque las reglas de identidad son estrictas y se revisan con cuidado."
        }
      },
      {
        type: "heading",
        text: {
          en: "Booking the test",
          pt: "Marcando a prova",
          es: "Reservando el examen"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "You can sit the CTT the same day you apply for your learner's permit at a Driver and Vehicle Services centre. Booking policy varies by location: some metropolitan centres accept walk-ins with no appointment, others require a booking. Check the specific service centre's page on transport.wa.gov.au before you go, so you do not make a wasted trip. During the test you cannot use a phone or refer to the Drive Safe Handbook.",
          pt: "Você pode fazer a CTT no mesmo dia em que aplica pra sua licença de aprendiz, num centro de Driver and Vehicle Services. A política de agendamento varia por local: alguns centros metropolitanos aceitam sem hora marcada, outros exigem agendamento. Confira a página do centro específico em transport.wa.gov.au antes de ir, pra não fazer uma viagem a toa. Durante a prova você não pode usar celular nem consultar o Drive Safe Handbook.",
          es: "Puedes presentar el CTT el mismo día en que solicitas tu permiso de aprendiz, en un centro de Driver and Vehicle Services. La política de reserva varía según el lugar: algunos centros metropolitanos aceptan sin cita previa, otros exigen reserva. Revisa la página del centro específico en transport.wa.gov.au antes de ir, para no hacer un viaje en vano. Durante el examen no puedes usar el celular ni consultar el Drive Safe Handbook."
        }
      },
      {
        type: "heading",
        text: {
          en: "Fees",
          pt: "Taxas",
          es: "Tarifas"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Learner's permit application (includes your first practical driving assessment): $150.80",
            pt: "Aplicação da licença de aprendiz (inclui sua primeira avaliação prática de direção): $150.80",
            es: "Solicitud del permiso de aprendiz (incluye tu primera evaluación práctica de manejo): $150.80"
          },
          {
            en: "Theory test: $22.40, resit if you fail: $19.20",
            pt: "Prova teórica: $22.40, refazer se você reprovar: $19.20",
            es: "Examen teórico: $22.40, repetir si repruebas: $19.20"
          },
          {
            en: "Printed logbook: $10.70, the digital Learn&Log version has no fee",
            pt: "Caderneta impressa: $10.70, a versão digital Learn&Log não tem custo",
            es: "Libreta impresa: $10.70, la versión digital Learn&Log no tiene costo"
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "These figures are current at the time of writing but government fees are reviewed periodically, so confirm the exact amount on transport.wa.gov.au before you pay.",
          pt: "Esses valores são atuais no momento em que este post foi escrito, mas taxas do governo são revisadas periodicamente, então confirme o valor exato em transport.wa.gov.au antes de pagar.",
          es: "Estos valores están vigentes al momento de escribir este post, pero las tarifas del gobierno se revisan periodicamente, así que confirma el monto exacto en transport.wa.gov.au antes de pagar."
        }
      },
      {
        type: "heading",
        text: {
          en: "If you do not pass",
          pt: "Se você não passar",
          es: "Si no apruebas"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "You cannot retake the CTT on the same day. You will need to come back on a different day, bring your identity documents again, and pay the resit fee. There is one shortcut: learners who completed the Keys4Life road safety program through school can skip the CTT entirely by presenting their Keys4Life certificate when applying for their learner's permit.",
          pt: "Você não pode refazer a CTT no mesmo dia. Vai precisar voltar em outro dia, levar seus documentos de identidade de novo, e pagar a taxa de refazer. Existe um atalho: quem completou o programa Keys4Life de segurança no trânsito na escola pode pular a CTT inteira, apresentando o certificado do Keys4Life ao aplicar pra licença de aprendiz.",
          es: "No puedes repetir el CTT el mismo día. Tendrás que volver otro día, llevar tus documentos de identidad de nuevo, y pagar la tarifa de repetición. Hay un atajo: quien completó el programa Keys4Life de seguridad vial en la escuela puede saltarse el CTT por completo, presentando su certificado de Keys4Life al solicitar el permiso de aprendiz."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Use KangaLearner's Learn section and practice questions to prepare for the content of the test, and check transport.wa.gov.au or call 13 11 56 to confirm booking policy, fees and identity requirements before your appointment.",
          pt: "Use a seção Aprender e as perguntas de prática do KangaLearner pra se preparar pro conteúdo da prova, e confira transport.wa.gov.au ou ligue pra 13 11 56 pra confirmar política de agendamento, taxas e exigências de identidade antes do seu atendimento.",
          es: "Usa la sección Aprender y las preguntas de práctica de KangaLearner para prepararte para el contenido del examen, y revisa transport.wa.gov.au o llama al 13 11 56 para confirmar la política de reservas, tarifas y requisitos de identidad antes de tu cita."
        }
      }
    ]
  },
  {
    slug: "wa-overseas-licence-conversion",
    icon: "checklist",
    state: "WA",
    published: true,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "Converting your overseas driving licence in Western Australia",
      pt: "Convertendo sua carteira de motorista estrangeira na Western Australia",
      es: "Convirtiendo tu licencia de conducir extranjera en Western Australia"
    },
    excerpt: {
      en: "Who actually needs to convert their overseas licence in WA, who does not, and the documents and steps involved either way.",
      pt: "Quem realmente precisa converter a carteira estrangeira em WA, quem não precisa, e os documentos e passos envolvidos.",
      es: "Quién realmente necesita convertir su licencia extranjera en WA, quién no, y los documentos y pasos involucrados."
    },
    sourceLabel: {
      en: "Transport WA, Moving from overseas",
      pt: "Transport WA, Moving from overseas",
      es: "Transport WA, Moving from overseas"
    },
    sourceUrl:
      "https://www.transport.wa.gov.au/licensing/drivers-licence/visit-move-wa/moving-from-overseas",
    body: [
      {
        type: "paragraph",
        text: {
          en: "The rules are different depending on your visa status, and a lot of people assume they need to convert their licence when they actually do not, at least not yet.",
          pt: "As regras são diferentes dependendo do seu status de visto, e muita gente acha que precisa converter a carteira quando na verdade não precisa, pelo menos não ainda.",
          es: "Las reglas son distintas según tu estado migratorio, y mucha gente cree que necesita convertir su licencia cuando en realidad no, al menos no todavía."
        }
      },
      {
        type: "heading",
        text: {
          en: "Do you even need to convert it",
          pt: "Você realmente precisa converter",
          es: "Realmente necesitas convertirla"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Temporary visa holders, including international students: you can keep driving on your current, valid overseas licence for as long as your visa lasts. You do not need to transfer it to a WA licence at all.",
            pt: "Quem tem visto temporário, incluindo estudantes internacionais: você pode continuar dirigindo com sua carteira estrangeira válida enquanto seu visto durar. Você não precisa transferir pra uma carteira de WA.",
            es: "Titulares de visa temporal, incluidos estudiantes internacionales: puedes seguir conduciendo con tu licencia extranjera vigente mientras dure tu visa. No necesitas transferirla a una licencia de WA."
          },
          {
            en: "Permanent residents and citizens: you can drive on your overseas licence for up to 3 months after arriving, then you must apply to transfer it.",
            pt: "Residentes permanentes e cidadãos: você pode dirigir com a carteira estrangeira por até 3 meses após chegar, depois precisa aplicar pra transferência.",
            es: "Residentes permanentes y ciudadanos: puedes conducir con tu licencia extranjera hasta 3 meses después de llegar, luego debes solicitar la transferencia."
          },
          {
            en: "If a temporary visa holder later becomes a permanent resident, the 3 month clock starts from that point, not from their original arrival date.",
            pt: "Se quem tem visto temporário se torna residente permanente depois, o prazo de 3 meses começa a contar a partir desse momento, não da data de chegada original.",
            es: "Si un titular de visa temporal se convierte después en residente permanente, el plazo de 3 meses empieza a contar desde ese momento, no desde la fecha de llegada original."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Recognised country or not, and why it matters",
          pt: "País reconhecido ou não, e por que isso importa",
          es: "País reconocido o no, y por que importa"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Since 1 November 2025, WA sorts overseas licences into recognised country and non recognised country. A recognised country is one with a driver training and licensing system judged broadly equivalent to Australia's, examples given by Transport WA include Ireland, Singapore, New Zealand, the UK and Malta. If your licence is from a recognised country you skip the theory test and the practical driving test entirely, you only need an eyesight test and a medical declaration. If it is from a non recognised country, you need to pass both a computerised theory test and a Practical Driving Assessment. The exact, current list of recognised countries changes, so check it directly on transport.wa.gov.au rather than trusting an old list, since 16 countries lost their previous recognised status in this November 2025 change if they had not already transferred.",
          pt: "Desde 1 de novembro de 2025, a WA divide as carteiras estrangeiras entre país reconhecido e país não reconhecido. País reconhecido é aquele com um sistema de treinamento e licenciamento julgado amplamente equivalente ao da Austrália, exemplos citados pela Transport WA incluem Irlanda, Singapura, Nova Zelândia, Reino Unido e Malta. Se sua carteira é de um país reconhecido, você pula a prova teórica e a prova prática inteiramente, só precisa de um teste de visão e uma declaração médica. Se for de um país não reconhecido, você precisa passar tanto numa prova teórica computadorizada quanto numa Avaliação Prática de Direção. A lista exata e atual de países reconhecidos muda, então confira direto em transport.wa.gov.au em vez de confiar numa lista antiga, já que 16 países perderam o status de reconhecido anterior nessa mudança de novembro de 2025 se ainda não tinham transferido.",
          es: "Desde el 1 de noviembre de 2025, WA clasifica las licencias extranjeras entre país reconocido y país no reconocido. Un país reconocido es aquel con un sistema de formación y licenciamiento considerado ampliamente equivalente al de Australia, ejemplos citados por Transport WA incluyen Irlanda, Singapur, Nueva Zelanda, Reino Unido y Malta. Si tu licencia es de un país reconocido, te saltas el examen teórico y el examen práctico por completo, solo necesitas un examen de vista y una declaración médica. Si es de un país no reconocido, necesitas aprobar tanto un examen teórico computarizado como una Evaluación Práctica de Manejo. La lista exacta y actual de países reconocidos cambia, así que revisala directamente en transport.wa.gov.au en vez de confiar en una lista antigua, ya que 16 países perdieron su estado reconocido anterior en este cambio de noviembre de 2025 si aún no habían transferido."
        }
      },
      {
        type: "heading",
        text: {
          en: "Documents you will need",
          pt: "Documentos que você vai precisar",
          es: "Documentos que vas a necesitar"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "A completed Driver's Licence Application form (DLA1), available on transport.wa.gov.au.",
            pt: "Formulário de Aplicação de Carteira de Motorista preenchido (DLA1), disponível em transport.wa.gov.au.",
            es: "Formulario de Solicitud de Licencia de Conducir completado (DLA1), disponible en transport.wa.gov.au."
          },
          {
            en: "Your original overseas licence, not a photocopy, and generally not expired for more than 12 months.",
            pt: "Sua carteira estrangeira original, não uma cópia, e geralmente não vencida há mais de 12 meses.",
            es: "Tu licencia extranjera original, no una fotocopia, y por lo general no vencida hace más de 12 meses."
          },
          {
            en: "An English translation if your licence is not in English, done by a NAATI certified translator, a tertiary qualified translator, or the Department of Home Affairs' free translating service. You only need to submit a photo or scan of your licence for translation, not the original document.",
            pt: "Uma tradução pro inglês se sua carteira não estiver em inglês, feita por um tradutor certificado pela NAATI, um tradutor com qualificação superior, ou o serviço gratuito de tradução do Department of Home Affairs. Você só precisa enviar uma foto ou digitalização da sua carteira pra tradução, não o documento original.",
            es: "Una traducción al inglés si tu licencia no está en inglés, hecha por un traductor certificado por NAATI, un traductor con calificación universitaria, o el servicio gratuito de traducción del Department of Home Affairs. Solo necesitas enviar una foto o escaneo de tu licencia para traducción, no el documento original."
          },
          {
            en: "Proof of identity: 5 original documents in total, including your visa with your overseas passport, proof of your address such as a utility bill or an official letter less than 6 months old, and at least one document with your signature.",
            pt: "Comprovação de identidade: 5 documentos originais no total, incluindo seu visto com seu passaporte estrangeiro, comprovante de endereço como uma conta de serviço ou carta oficial com menos de 6 meses, e pelo menos um documento com sua assinatura.",
            es: "Comprobación de identidad: 5 documentos originales en total, incluyendo tu visa con tu pasaporte extranjero, comprobante de domicilio como una factura de servicios o carta oficial de menos de 6 meses, y al menos un documento con tu firma."
          },
          {
            en: "A letter of verification if your licence was issued by Bangladesh, Bhutan, India, Indonesia or Iraq.",
            pt: "Uma carta de verificação se sua carteira foi emitida por Bangladesh, Butão, India, Indonesia ou Iraque.",
            es: "Una carta de verificación si tu licencia fue emitida por Bangladesh, Bután, India, Indonesia o Irak."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Fees and where to go",
          pt: "Taxas e onde ir",
          es: "Tarifas y donde ir"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "For a recognised country transfer, the application fee is currently $63.50. For a non recognised country transfer, which includes the driving test, it is currently $150.80. Both are done in person at a Driver and Vehicle Services centre or regional agent, and the practical driving assessment is booked online through DoTDirect. If you need to cancel or reschedule, do it more than 48 hours ahead or you will be charged again, and arriving more than 15 minutes late forfeits your booking. Confirm the exact current fees on transport.wa.gov.au before you go, since government fees change periodically.",
          pt: "Pra transferência de país reconhecido, a taxa de aplicação atual é $63.50. Pra transferência de país não reconhecido, que inclui a prova de direção, é atualmente $150.80. As duas são feitas presencialmente num centro de Driver and Vehicle Services ou agente regional, e a avaliação prática de direção é marcada online pelo DoTDirect. Se precisar cancelar ou remarcar, faça com mais de 48 horas de antecedência ou vai ser cobrado de novo, e chegar mais de 15 minutos atrasado perde o horário. Confirme as taxas exatas atuais em transport.wa.gov.au antes de ir, já que taxas do governo mudam periodicamente.",
          es: "Para una transferencia de país reconocido, la tarifa de solicitud actual es $63.50. Para una transferencia de país no reconocido, que incluye el examen de manejo, es actualmente $150.80. Ambas se hacen en persona en un centro de Driver and Vehicle Services o agente regional, y la evaluación práctica de manejo se reserva en línea a través de DoTDirect. Si necesitas cancelar o reprogramar, hazlo con más de 48 horas de anticipación o te cobrarán de nuevo, y llegar más de 15 minutos tarde te hace perder el turno. Confirma las tarifas exactas actuales en transport.wa.gov.au antes de ir, ya que las tarifas del gobierno cambian periodicamente."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "If you are on a student visa and not converting your licence, you still need to know WA's road rules well, since your overseas licence does not come with local knowledge. Use KangaLearner's Learn section to study those rules regardless of which licence you are driving on.",
          pt: "Se você está com visto de estudante e não vai converter a carteira, ainda assim precisa conhecer bem as regras de trânsito de WA, já que sua carteira estrangeira não vem com conhecimento local. Use a seção Aprender do KangaLearner pra estudar essas regras, independente de qual carteira você está usando pra dirigir.",
          es: "Si tienes visa de estudiante y no vas a convertir tu licencia, igual necesitas conocer bien las reglas de tránsito de WA, ya que tu licencia extranjera no viene con conocimiento local. Usa la sección Aprender de KangaLearner para estudiar esas reglas, sin importar con que licencia estes conduciendo."
        }
      }
    ]
  },
  {
    slug: "driving-in-nsw-guide-for-newcomers",
    icon: "safety",
    state: "NSW",
    published: true,
    publishedAt: "2026-08-11",
    readingMinutes: 8,
    title: {
      en: "Driving in New South Wales: the official guide, explained",
      pt: "Dirigir na New South Wales: o guia oficial, explicado",
      es: "Conducir en New South Wales: la guía oficial, explicada"
    },
    excerpt: {
      en: "NSW publishes its Road User Handbook in 8 languages, including Spanish, but not Portuguese. Here is what newcomers need to know, translated and explained.",
      pt: "A NSW publica o Road User Handbook em 8 idiomas, incluindo espanhol, mas não português. Veja o que quem chega precisa saber, traduzido e explicado.",
      es: "NSW publica su Road User Handbook en 8 idiomas, incluido español, pero no portugués. Esto es lo que los recién llegados necesitan saber, traducido y explicado."
    },
    sourceLabel: {
      en: "Transport for NSW, Road User Handbook",
      pt: "Transport for NSW, Road User Handbook",
      es: "Transport for NSW, Road User Handbook"
    },
    sourceUrl:
      "https://www.nsw.gov.au/driving-boating-and-transport/roads-safety-and-rules/safety-updates-for-nsw-road-users/road-user-handbook",
    body: [
      {
        type: "paragraph",
        text: {
          en: "Transport for NSW publishes the Road User Handbook, the official road rules reference for the state, in 8 community languages: Arabic, Simplified Chinese, Traditional Chinese, Farsi, Korean, Spanish, Thai and Vietnamese. Portuguese is not among them, and the handbook itself notes that it is meant to be informative for overseas visitors learning to drive in NSW, not only for local learners. This post pulls out the parts that matter most for someone new to the state.",
          pt: "A Transport for NSW publica o Road User Handbook, a referência oficial de regras de trânsito do estado, em 8 idiomas de comunidade: árabe, chinês simplificado, chinês tradicional, farsi, coreano, espanhol, tailandês e vietnamita. Português não está entre eles, e o próprio manual diz que serve também pra visitantes estrangeiros aprendendo a dirigir na NSW, não só pra learners locais. Este post traz as partes que mais importam pra quem é novo no estado.",
          es: "Transport for NSW publica el Road User Handbook, la referencia oficial de reglas de tránsito del estado, en 8 idiomas comunitarios: árabe, chino simplificado, chino tradicional, farsi, coreano, español, tailandés y vietnamita. El portugués no está entre ellos, y el propio manual dice que también sirve para visitantes extranjeros que aprenden a conducir en NSW, no solo para learners locales. Este post trae las partes que más importan para quien es nuevo en el estado."
        }
      },
      {
        type: "heading",
        text: {
          en: "Speed limits you need to know",
          pt: "Limites de velocidade que você precisa saber",
          es: "Límites de velocidad que necesitas saber"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Default urban speed limit: 50 km/h on any built up road without a posted speed sign.",
            pt: "Limite urbano padrão: 50 km/h em qualquer via urbana sem placa de velocidade indicada.",
            es: "Límite urbano por defecto: 50 km/h en cualquier vía urbana sin señal de velocidad indicada."
          },
          {
            en: "School zones: 40 km/h, usually 8:00 to 9:30am and 2:30 to 4:00pm on school days, a few High Pedestrian Activity Area zones are 30 km/h instead. Some zones have different times shown on the sign itself, so always check the posted sign.",
            pt: "Zonas escolares: 40 km/h, geralmente das 8h às 9h30 e das 14h30 às 16h em dias letivos, algumas zonas de alta atividade de pedestres são 30 km/h. Algumas zonas têm horários diferentes indicados na própria placa, então sempre confira a placa.",
            es: "Zonas escolares: 40 km/h, generalmente de 8:00 a 9:30am y de 2:30 a 4:00pm en días de clases, algunas zonas de alta actividad peatonal son 30 km/h. Algunas zonas tienen horarios distintos indicados en la propia señal, así que siempre revisa la señal."
          },
          {
            en: "As a visiting overseas licence holder, you must follow the posted NSW limit, or the limit that applies to your licence back home, whichever is lower.",
            pt: "Como visitante com carteira estrangeira, você deve seguir o limite indicado da NSW, ou o limite que vale pra sua carteira no seu país, o que for menor.",
            es: "Como visitante con licencia extranjera, debes seguir el límite indicado de NSW, o el límite que aplica a tu licencia en tu país, el que sea menor."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Mobile phones and alcohol: stricter rules for learners and P platers",
          pt: "Celular e álcool: regras mais rígidas para learners e P platers",
          es: "Celular y alcohol: reglas más estrictas para learners y P platers"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Learner and provisional (P1 and P2) drivers in NSW cannot use a mobile phone at all while driving, not even hands free or mounted in a cradle. Full licence holders get a cradle exemption, learners and P platers do not. The only exceptions are showing a digital licence to police, or using the phone for wallet functions while the car is stationary off the road. Alcohol is zero tolerance for learner, P1 and P2 drivers, no small amount is allowed, and note that a heavy night out can still leave you over that limit the next morning.",
          pt: "Motoristas learner e provisional (P1 e P2) na NSW não podem usar celular de jeito nenhum enquanto dirigem, nem viva voz nem em suporte no carro. Motoristas com carteira completa têm isenção pra suporte, learners e P platers não. As únicas exceções são mostrar a carteira digital pra polícia, ou usar funções de carteira digital com o carro parado fora da via. Álcool é tolerância zero pra motoristas learner, P1 e P2, nenhuma quantidade pequena é permitida, e uma noitada pode deixar você acima desse limite ainda na manhã seguinte.",
          es: "Los conductores learner y provisional (P1 y P2) en NSW no pueden usar el celular en absoluto mientras conducen, ni siquiera manos libres o montado en el auto. Los conductores con licencia completa tienen exención para el soporte, learners y P platers no. Las únicas excepciones son mostrar la licencia digital a la policía, o usar funciones de billetera digital con el auto detenido fuera de la vía. El alcohol es tolerancia cero para conductores learner, P1 y P2, no se permite ninguna cantidad pequeña, y una noche de fiesta puede dejarte por encima de ese límite todavía a la mañana siguiente."
        }
      },
      {
        type: "heading",
        text: {
          en: "A roundabout rule that surprises newcomers",
          pt: "Uma regra de rotatória que surpreende quem chega",
          es: "Una regla de rotonda que sorprende a los recién llegados"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "At a roundabout, give way to vehicles already on it, indicate through your turn, and cancel your indicator right after exiting. What surprises a lot of people: in NSW there is no legal requirement to give way to pedestrians when turning at a roundabout, unless there is a marked pedestrian crossing there. You still need to drive carefully enough to avoid hitting anyone, but the strict give way obligation you might expect from other countries does not automatically apply. Cyclists on multi lane roundabouts are entitled to use the left lane even when turning right, and are entitled to the full lane.",
          pt: "Numa rotatória, de passagem pra quem já está nela, sinalize durante a curva, e desligue a seta logo após sair. O que surpreende muita gente: na NSW não existe obrigação legal de dar passagem pra pedestres ao converter numa rotatória, a não ser que exista uma faixa de pedestre marcada ali. Você ainda precisa dirigir com cuidado suficiente pra não atropelar ninguém, mas a obrigação estrita de ceder passagem que você esperaria de outros países não se aplica automaticamente. Ciclistas em rotatórias com várias faixas têm direito de usar a faixa da esquerda mesmo virando a direita, e têm direito a faixa inteira.",
          es: "En una rotonda, cede el paso a quienes ya están en ella, indica durante el giro, y apaga el intermitente justo después de salir. Lo que sorprende a mucha gente: en NSW no existe obligación legal de ceder el paso a peatones al girar en una rotonda, a menos que haya un cruce peatonal marcado ahí. Igual necesitas conducir con suficiente cuidado para no atropellar a nadie, pero la obligación estricta de ceder el paso que esperarías de otros países no se aplica automáticamente. Los ciclistas en rotondas de varios carriles tienen derecho a usar el carril izquierdo incluso al girar a la derecha, y tienen derecho al carril completo."
        }
      },
      {
        type: "heading",
        text: {
          en: "Country driving: fatigue and wildlife",
          pt: "Direção no interior: fadiga e animais",
          es: "Conducir en zonas rurales: fatiga y fauna"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "NSW's own road safety campaign, Towards Zero, reports that most road deaths in the state happen on country roads, and speed, fatigue, drugs and alcohol are the main factors. A microsleep of just 4 seconds at 100 km/h covers 111 metres with nobody in control of the car, so plan rest breaks or swap drivers on long trips. On wildlife: kangaroos, wombats, emus and stray livestock are common on country roads, especially at dawn and dusk. The official advice is clear: never swerve to avoid an animal, it is safer to brake in a controlled way than to lose control of the car trying to dodge it.",
          pt: "A própria campanha de segurança no trânsito da NSW, Towards Zero, informa que a maioria das mortes no trânsito do estado acontece em estradas do interior, e velocidade, fadiga, drogas e álcool são os principais fatores. Um microsono de apenas 4 segundos a 100 km/h percorre 111 metros sem ninguém no controle do carro, então planeje paradas pra descanso ou revezem no volante em viagens longas. Sobre animais: cangurus, wombats, emas e gado solto são comuns em estradas do interior, especialmente ao amanhecer e ao entardecer. A orientação oficial é clara: nunca desvie bruscamente pra evitar um animal, é mais seguro frear de forma controlada do que perder o controle do carro tentando desviar.",
          es: "La propia campaña de seguridad vial de NSW, Towards Zero, informa que la mayoría de las muertes viales del estado ocurren en carreteras rurales, y la velocidad, la fatiga, las drogas y el alcohol son los principales factores. Un microsueño de solo 4 segundos a 100 km/h recorre 111 metros sin nadie en control del auto, así que planifica pausas de descanso o cambia de conductor en viajes largos. Sobre la fauna: canguros, wombats, emus y ganado suelto son comunes en carreteras rurales, especialmente al amanecer y al atardecer. La recomendación oficial es clara: nunca gires bruscamente para evitar un animal, es más seguro frenar de forma controlada que perder el control del auto tratando de esquivarlo."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This post covers what the official Road User Handbook says about real driving conditions in NSW. To prepare for the Driver Knowledge Test itself, use KangaLearner's Learn section and NSW practice questions.",
          pt: "Este post cobre o que o Road User Handbook oficial diz sobre condições reais de direção na NSW. Pra se preparar pro Driver Knowledge Test em si, use a seção Aprender e as perguntas de prática de NSW do KangaLearner.",
          es: "Este post cubre lo que dice el Road User Handbook oficial sobre las condiciones reales de manejo en NSW. Para prepararte para el Driver Knowledge Test en sí, usa la sección Aprender y las preguntas de práctica de NSW de KangaLearner."
        }
      }
    ]
  },
  {
    slug: "nsw-driver-knowledge-test-guide",
    icon: "checklist",
    state: "NSW",
    published: true,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "How the NSW Driver Knowledge Test works",
      pt: "Como funciona o Driver Knowledge Test de NSW",
      es: "Cómo funciona el Driver Knowledge Test de NSW"
    },
    excerpt: {
      en: "Online or in person, MyServiceNSW account, fees and languages offered: everything official about booking and sitting the NSW learner test.",
      pt: "Online ou presencial, conta MyServiceNSW, taxas e idiomas oferecidos: tudo o que é oficial sobre marcar e fazer a prova de learner da NSW.",
      es: "En línea o en persona, cuenta MyServiceNSW, tarifas e idiomas ofrecidos: todo lo oficial sobre reservar y presentar el examen de learner de NSW."
    },
    sourceLabel: {
      en: "Service NSW, Driver Knowledge Test",
      pt: "Service NSW, Driver Knowledge Test",
      es: "Service NSW, Driver Knowledge Test"
    },
    sourceUrl: "https://www.service.nsw.gov.au/transaction/driver-knowledge-test-online",
    body: [
      {
        type: "paragraph",
        text: {
          en: "The Driver Knowledge Test, or DKT, is NSW's learner theory test. Unlike some other states, NSW gives you two ways to sit it: online at home, or in person at a service centre. This post covers the official process for both.",
          pt: "O Driver Knowledge Test, ou DKT, é a prova teórica de learner da NSW. Diferente de outros estados, a NSW oferece dois jeitos de fazer a prova: online em casa, ou presencialmente num centro de atendimento. Este post cobre o processo oficial dos dois.",
          es: "El Driver Knowledge Test, o DKT, es el examen teórico de learner de NSW. A diferencia de otros estados, NSW ofrece dos formas de presentarlo: en línea desde casa, o en persona en un centro de atención. Este post cubre el proceso oficial de ambos."
        }
      },
      {
        type: "heading",
        text: {
          en: "You need a MyServiceNSW account",
          pt: "Você precisa de uma conta MyServiceNSW",
          es: "Necesitas una cuenta MyServiceNSW"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Both paths require a MyServiceNSW account, which you can create during enrolment. It is used to identify yourself to NSW government services online, manage your details, and later check demerit points and fines.",
          pt: "Os dois caminhos exigem uma conta MyServiceNSW, que você pode criar durante a inscrição. Ela serve pra se identificar nos serviços do governo da NSW online, gerenciar seus dados, e depois conferir pontos e multas.",
          es: "Ambos caminos requieren una cuenta MyServiceNSW, que puedes crear durante la inscripción. Se usa para identificarte ante los servicios del gobierno de NSW en línea, gestionar tus datos, y después revisar puntos de demérito y multas."
        }
      },
      {
        type: "heading",
        text: {
          en: "DKT online vs DKT in person",
          pt: "DKT online vs DKT presencial",
          es: "DKT en línea vs DKT en persona"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "DKT online: a self paced course of 3 interactive modules, taking around 4 to 6 hours in total, followed by a final test you must complete alone and in one sitting. No appointment needed. You can enrol from age 15 years and 11 months, though you can only apply for your learner licence once you turn 16.",
            pt: "DKT online: um curso no seu ritmo com 3 módulos interativos, levando cerca de 4 a 6 horas no total, seguido de uma prova final que você precisa fazer sozinho e numa sentada só. Não precisa marcar horário. Você pode se inscrever a partir dos 15 anos e 11 meses, mas só pode aplicar pra licença de aprendiz ao completar 16.",
            es: "DKT en línea: un curso a tu ritmo con 3 módulos interactivos, que toma entre 4 y 6 horas en total, seguido de un examen final que debes completar solo y de una sola vez. No necesita cita previa. Puedes inscribirte desde los 15 años y 11 meses, aunque solo puedes solicitar tu licencia de aprendiz al cumplir 16."
          },
          {
            en: "DKT in person: a multiple choice computer test at a service centre, booked online in advance. You need a completed licence application, proof of identity documents, and corrective eyewear if you need it.",
            pt: "DKT presencial: uma prova de múltipla escolha no computador num centro de atendimento, marcada online com antecedência. Você precisa de uma aplicação de licença preenchida, documentos de identidade, e óculos corretivos se precisar.",
            es: "DKT en persona: un examen de opción múltiple en computadora en un centro de atención, reservado en línea con anticipación. Necesitas una solicitud de licencia completada, documentos de identidad, y lentes correctivos si los necesitas."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Fees",
          pt: "Taxas",
          es: "Tarifas"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "The DKT fee is $58 either way, though for the online version you only pay it once you pass and apply for your licence, not up front. The learner licence application itself is a separate $32 fee. These figures are current at the time of writing, confirm the exact amount on the NSW fees page before you pay since government fees are reviewed periodically.",
          pt: "A taxa do DKT é $58 nos dois formatos, mas na versão online você só paga depois de passar e aplicar pra licença, não antes. A aplicação da licença de aprendiz em si é uma taxa separada de $32. Esses valores são atuais no momento em que este post foi escrito, confirme o valor exato na página de taxas da NSW antes de pagar já que taxas do governo são revisadas periodicamente.",
          es: "La tarifa del DKT es $58 en ambos formatos, aunque en la versión en línea solo pagas después de aprobar y solicitar tu licencia, no por adelantado. La solicitud de la licencia de aprendiz en sí tiene una tarifa separada de $32. Estos valores están vigentes al momento de escribir este post, confirma el monto exacto en la página de tarifas de NSW antes de pagar ya que las tarifas del gobierno se revisan periodicamente."
        }
      },
      {
        type: "heading",
        text: {
          en: "Languages offered",
          pt: "Idiomas oferecidos",
          es: "Idiomas ofrecidos"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "DKT online is offered in English, Simplified Chinese, Arabic, Spanish, Vietnamese and Korean. DKT in person adds even more options at the service centre: Greek, Turkish, Croatian and Serbian on top of the online list, and an interpreter can be arranged for other languages. Portuguese is not one of the test's own languages, which is exactly why understanding the actual rules in Portuguese, not just memorising English test answers, matters so much.",
          pt: "O DKT online é oferecido em inglês, chinês simplificado, árabe, espanhol, vietnamita e coreano. O DKT presencial adiciona ainda mais opções no centro de atendimento: grego, turco, croata e sérvio além da lista online, e um intérprete pode ser providenciado pra outros idiomas. Português não é um dos idiomas da prova em si, o que é exatamente por que entender as regras de verdade em português, e não só decorar respostas em inglês, importa tanto.",
          es: "El DKT en línea se ofrece en inglés, chino simplificado, árabe, español, vietnamita y coreano. El DKT en persona agrega aún más opciones en el centro de atención: griego, turco, croata y serbio además de la lista en línea, y se puede coordinar un intérprete para otros idiomas. El portugués no es uno de los idiomas del examen en sí, que es exactamente por que entender las reglas de verdad en portugués, y no solo memorizar respuestas en inglés, importa tanto."
        }
      },
      {
        type: "heading",
        text: {
          en: "If you fail",
          pt: "Se você reprovar",
          es: "Si repruebas"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "For DKT online, if you fail the final test you can retake it after a 12 hour wait. For DKT in person, the official pages do not publish a specific cooldown period, ask the service centre directly when you book. Either way, once you pass and apply for your licence in person, you will also do an eyesight test and get your photo taken, and you get a receipt valid for 2 months while your physical licence card is mailed to you.",
          pt: "No DKT online, se você reprovar na prova final, pode refazer depois de esperar 12 horas. No DKT presencial, as páginas oficiais não publicam um prazo específico, pergunte direto no centro de atendimento ao marcar. De qualquer forma, quando você passar e aplicar pra licença presencialmente, também vai fazer um teste de visão e tirar foto, e recebe um recibo válido por 2 meses enquanto o cartão físico é enviado pelo correio.",
          es: "En el DKT en línea, si repruebas el examen final, puedes repetirlo después de esperar 12 horas. En el DKT en persona, las páginas oficiales no publican un plazo específico, pregunta directamente en el centro de atención al reservar. De cualquier forma, cuando apruebes y solicites tu licencia en persona, también harás un examen de vista y te tomarán una foto, y recibes un comprobante válido por 2 meses mientras te envían la tarjeta física por correo."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Use KangaLearner's NSW practice questions and mock test to prepare for the actual content, whichever format you choose to sit it in.",
          pt: "Use as perguntas de prática e o simulado de NSW do KangaLearner pra se preparar pro conteúdo em si, qualquer que seja o formato que você escolher pra fazer a prova.",
          es: "Usa las preguntas de práctica y el simulacro de NSW de KangaLearner para prepararte para el contenido real, sea cual sea el formato que elijas para presentar el examen."
        }
      }
    ]
  },
  {
    slug: "driving-in-vic-guide-for-newcomers",
    icon: "safety",
    state: "VIC",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "Driving in Victoria: the official guide, explained",
      pt: "Dirigir em Victoria: o guia oficial, explicado",
      es: "Conducir en Victoria: la guía oficial, explicada"
    },
    excerpt: {
      en: "Victoria's official learner handbook is translated into 4 languages, but not Portuguese or Spanish. Here is what newcomers need to know, translated and explained.",
      pt: "O manual oficial de learner de Victoria é traduzido para 4 idiomas, mas não para português ou espanhol. Veja o que quem chega precisa saber, traduzido e explicado.",
      es: "El manual oficial de learner de Victoria está traducido a 4 idiomas, pero no al español ni al portugués. Esto es lo que los recién llegados necesitan saber, traducido y explicado."
    },
    sourceLabel: {
      en: "Transport Victoria, Tourists driving in Victoria",
      pt: "Transport Victoria, Tourists driving in Victoria",
      es: "Transport Victoria, Tourists driving in Victoria"
    },
    sourceUrl: "https://transport.vic.gov.au/road-rules-and-safety/tourists-driving-in-victoria",
    body: [
      {
        type: "paragraph",
        text: {
          en: "Transport Victoria publishes The Road to Solo Driving, the state's official learner handbook, in English plus 4 community languages: Arabic, Simplified Chinese, Turkish and Vietnamese. Portuguese and Spanish are not on that list. Western Australia's guide is missing both of those languages too, and New South Wales covers Spanish but not Portuguese, so if either language is your first one, no Australian state currently publishes an official driving handbook for you in it. This post closes that gap for Victoria, based directly on Transport Victoria's own guidance for newcomers.",
          pt: "A Transport Victoria publica o manual oficial de learner do estado, o The Road to Solo Driving, em inglês mais 4 idiomas de comunidade: árabe, chinês simplificado, turco e vietnamita. Português e espanhol não estão nessa lista. O guia da Western Australia também não tem esses dois idiomas, e a New South Wales cobre espanhol mas não português, ou seja, se um desses é a sua língua materna, nenhum estado australiano publica hoje um manual oficial de direção para você nela. Este post preenche essa lacuna para Victoria, com base direta na orientação da própria Transport Victoria para quem chega de fora.",
          es: "Transport Victoria publica The Road to Solo Driving, el manual oficial de learner del estado, en inglés más 4 idiomas comunitarios: árabe, chino simplificado, turco y vietnamita. El portugués y el español no están en esa lista. La guía de Western Australia tampoco tiene esos dos idiomas, y New South Wales cubre español pero no portugués, así que si cualquiera de esos dos es tu idioma, hasta ahora ningún estado australiano publica un manual oficial de manejo para ti en él. Este artículo llena ese vacío para Victoria, basado directamente en la orientación de la propia Transport Victoria para quien recién llega."
        }
      },
      {
        type: "heading",
        text: {
          en: "Speed limits: built-up areas, country roads and school zones",
          pt: "Limites de velocidade: áreas urbanas, estradas rurais e zonas escolares",
          es: "Límites de velocidad: áreas urbanas, carreteras rurales y zonas escolares"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Built-up areas: 50 km/h is the default limit on any street without a posted speed sign.",
            pt: "Áreas urbanas: 50 km/h é o limite padrão em qualquer rua sem placa de velocidade indicada.",
            es: "Áreas urbanas: 50 km/h es el límite por defecto en cualquier calle sin señal de velocidad indicada."
          },
          {
            en: "Country roads: 100 km/h is the default limit outside built-up areas without a posted speed sign.",
            pt: "Estradas rurais: 100 km/h é o limite padrão fora das áreas urbanas, sem placa de velocidade indicada.",
            es: "Carreteras rurales: 100 km/h es el límite por defecto fuera de las áreas urbanas, sin señal de velocidad indicada."
          },
          {
            en: "School zones: typically 40 km/h during signed times on school days, always check the times shown on the sign itself.",
            pt: "Zonas escolares: normalmente 40 km/h nos horários indicados em dias letivos, sempre confira os horários na própria placa.",
            es: "Zonas escolares: normalmente 40 km/h en los horarios indicados en días de clases, siempre revisa los horarios en la propia señal."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Mobile phones and alcohol: zero tolerance for learners and P platers",
          pt: "Celular e álcool: tolerância zero para learners e P platers",
          es: "Celular y alcohol: tolerancia cero para learners y P platers"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Learner, P1 and P2 drivers cannot operate a mobile phone at all while driving, this includes phone calls, texting and using it as a GPS, even mounted in a cradle. Fully licensed drivers get more relaxed rules, including a mounted device set up before the car starts moving, but that exemption does not extend to learners or P platers.",
            pt: "Motoristas learner, P1 e P2 não podem usar o celular de jeito nenhum enquanto dirigem, isso inclui ligações, mensagens de texto e usá-lo como GPS, mesmo fixo em um suporte. Motoristas com carteira completa têm regras mais flexíveis, incluindo um aparelho fixo em suporte configurado antes do carro começar a andar, mas essa exceção não vale para learners ou P platers.",
            es: "Los conductores learner, P1 y P2 no pueden usar el celular en absoluto mientras conducen, esto incluye llamadas, mensajes de texto y usarlo como GPS, incluso montado en un soporte. Los conductores con licencia completa tienen reglas más flexibles, incluido un dispositivo montado y configurado antes de que el auto empiece a moverse, pero esa excepción no aplica a los learners ni a los P platers."
          },
          {
            en: "Blood alcohol content must be zero for learner, P1 and P2 drivers, no small amount is allowed. The limit only rises to below 0.05 once you hold a full licence.",
            pt: "O nível de álcool no sangue precisa ser zero para motoristas learner, P1 e P2, nenhuma quantidade pequena é permitida. O limite só sobe para abaixo de 0,05 quando você tem a carteira completa.",
            es: "El nivel de alcohol en sangre debe ser cero para conductores learner, P1 y P2, no se permite ninguna cantidad pequeña. El límite solo sube a menos de 0,05 cuando tienes la licencia completa."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Roundabouts: give way to trams too",
          pt: "Rotatórias: dê passagem também para os bondes",
          es: "Rotondas: cede el paso también a los tranvías"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "At a roundabout, give way to vehicles already on it, coming from your right, the same rule as everywhere else in Australia. Victoria adds one more: give way to trams that are already on the roundabout or approaching it, since a tram cannot swerve or stop as quickly as a car. There is no legal requirement to give way to pedestrians when turning at a roundabout, unless there is a marked pedestrian crossing there, so still drive carefully enough to avoid anyone stepping out.",
          pt: "Numa rotatória, dê passagem para quem já está nela, vindo da sua direita, a mesma regra do resto da Austrália. Victoria acrescenta mais uma: dê passagem também para os bondes que já estão na rotatória ou se aproximando dela, já que um bonde não consegue desviar ou frear tão rápido quanto um carro. Não existe obrigação legal de dar passagem para pedestres ao converter numa rotatória, a não ser que haja uma faixa de pedestre marcada ali, então dirija com cuidado suficiente para não pegar ninguém de surpresa.",
          es: "En una rotonda, cede el paso a quienes ya están en ella, viniendo desde tu derecha, la misma regla que en el resto de Australia. Victoria agrega una más: cede el paso también a los tranvías que ya están en la rotonda o se están acercando, ya que un tranvía no puede esquivar ni frenar tan rápido como un auto. No existe obligación legal de ceder el paso a los peatones al girar en una rotonda, a menos que haya un cruce peatonal marcado ahí, así que igual conduce con suficiente cuidado para no sorprender a nadie."
        }
      },
      {
        type: "heading",
        text: {
          en: "Hook turns: a Melbourne quirk you will not expect",
          pt: "Hook turns: uma peculiaridade de Melbourne que você não vai esperar",
          es: "Hook turns: una peculiaridad de Melbourne que no esperarás"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "In central Melbourne, some intersections use what is called a hook turn to turn right. Instead of moving into the right lane like you would anywhere else, you move into the left lane, wait there with your indicator on, and only complete the turn once the lights for the road you are entering turn green. It feels backwards the first time you see it, but it exists so a car turning right does not block a tram running down the middle of the road behind it. These intersections are marked with a sign, so watch for it in the city and give yourself extra time to read it on your first few drives through the CBD.",
          pt: "No centro de Melbourne, alguns cruzamentos usam o chamado hook turn para virar à direita. Em vez de ir para a faixa da direita como em qualquer outro lugar, você vai para a faixa da esquerda, espera ali com a seta ligada, e só completa a curva quando o sinal da via que você vai entrar ficar verde. Parece ao contrário na primeira vez que você vê, mas existe para que um carro virando à direita não bloqueie um bonde que passa no meio da via atrás dele. Esses cruzamentos são sinalizados com uma placa, então preste atenção no centro e reserve um tempo extra para entender nas primeiras vezes que passar pelo CBD.",
          es: "En el centro de Melbourne, algunas intersecciones usan lo que se llama un hook turn para girar a la derecha. En vez de moverte al carril derecho como en cualquier otro lugar, te mueves al carril izquierdo, esperas ahí con el intermitente puesto, y completas el giro solo cuando el semáforo de la vía a la que vas a entrar se pone en verde. Se siente al revés la primera vez que lo ves, pero existe para que un auto que gira a la derecha no bloquee a un tranvía que pasa por el medio de la vía detrás de él. Estas intersecciones están señalizadas con un cartel, así que presta atención en el centro y date tiempo extra para entenderlo las primeras veces que cruces el CBD."
        }
      },
      {
        type: "heading",
        text: {
          en: "Regional driving: fatigue and wildlife",
          pt: "Direção no interior: fadiga e animais",
          es: "Conducir en zonas rurales: fatiga y fauna"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Outside Melbourne, plan for fatigue and wildlife the same way you would anywhere else in the country. On a long drive, take a break of 15 to 30 minutes at least every 2 hours, and if you start feeling drowsy, even a 15 to 20 minute powernap can make a real difference. Native animals are most active around dawn and dusk, some may have young in their pouch, so slow down in signed areas at those times. If you do hit an animal, contact Wildlife Victoria rather than just driving on.",
          pt: "Fora de Melbourne, planeje-se para fadiga e animais do mesmo jeito que em qualquer outro lugar do país. Numa viagem longa, faça uma pausa de 15 a 30 minutos pelo menos a cada 2 horas, e se começar a sentir sono, até uma soneca de 15 a 20 minutos já faz diferença de verdade. Os animais nativos ficam mais ativos ao amanhecer e ao entardecer, alguns podem estar com filhotes na bolsa, então reduza a velocidade em áreas sinalizadas nesses horários. Se você atropelar um animal, contate a Wildlife Victoria em vez de simplesmente seguir viagem.",
          es: "Fuera de Melbourne, planifica la fatiga y la fauna igual que en cualquier otro lugar del país. En un viaje largo, toma un descanso de 15 a 30 minutos al menos cada 2 horas, y si empiezas a sentir sueño, hasta una siesta corta de 15 a 20 minutos puede marcar una diferencia real. Los animales nativos están más activos al amanecer y al atardecer, algunos pueden tener crías en la bolsa, así que reduce la velocidad en áreas señalizadas en esos horarios. Si llegas a atropellar a un animal, contacta a Wildlife Victoria en vez de simplemente seguir manejando."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This post covers what Transport Victoria's own guidance says about real driving conditions in the state. To prepare for the actual test content, use KangaLearner's Learn section and VIC practice questions.",
          pt: "Este post cobre o que a orientação oficial da Transport Victoria diz sobre as condições reais de direção no estado. Para se preparar para o conteúdo da prova em si, use a seção Aprender e as perguntas de prática de VIC do KangaLearner.",
          es: "Este post cubre lo que dice la guía oficial de Transport Victoria sobre las condiciones reales de manejo en el estado. Para prepararte para el contenido real del examen, usa la sección Aprender y las preguntas de práctica de VIC de KangaLearner."
        }
      }
    ]
  },
  {
    slug: "driving-in-sa-guide-for-newcomers",
    icon: "safety",
    state: "SA",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "Driving in South Australia: the official guide, explained",
      pt: "Dirigir na South Australia: o guia oficial, explicado",
      es: "Conducir en South Australia: la guía oficial, explicada"
    },
    excerpt: {
      en: "SA's My Licence offers official driving content in Spanish, one of the only states to do so, but not in Portuguese. Here is what newcomers need to know, translated and explained.",
      pt: "O My Licence da SA oferece conteúdo oficial de direção em espanhol, um dos únicos estados a fazer isso, mas não em português. Veja o que quem chega precisa saber, traduzido e explicado.",
      es: "My Licence de SA ofrece contenido oficial de manejo en español, uno de los únicos estados que lo hace, pero no en portugués. Esto es lo que los recién llegados necesitan saber, traducido y explicado."
    },
    sourceLabel: {
      en: "My Licence South Australia, International drivers",
      pt: "My Licence South Australia, International drivers",
      es: "My Licence South Australia, International drivers"
    },
    sourceUrl: "https://www.mylicence.sa.gov.au/my-car-licence/international-drivers",
    body: [
      {
        type: "paragraph",
        text: {
          en: "The Department for Infrastructure and Transport publishes The Driver's Handbook, the official road rules reference for South Australia, through the My Licence website. My Licence also runs a dedicated section for international drivers, with road rules and safety tips translated into French, German, Italian, Spanish, Chinese, Arabic and Dari, alongside English. That makes SA one of only two states found so far, alongside New South Wales, to offer any official driving safety content in Spanish. Portuguese is a different story: it is not on that list, and no Australian state currently publishes an official driving safety guide in Portuguese. This post translates and explains what SA's own official resources say, so Portuguese speaking newcomers get the same starting point.",
          pt: "O Department for Infrastructure and Transport publica o The Driver's Handbook, a referência oficial de regras de trânsito da South Australia, no site My Licence. O My Licence também tem uma seção dedicada a motoristas internacionais, com regras de trânsito e dicas de segurança traduzidas pra francês, alemão, italiano, espanhol, chinês, árabe e dari, além do inglês. Isso faz da SA um dos únicos dois estados encontrados até agora, junto com a New South Wales, a oferecer algum conteúdo oficial de segurança na direção em espanhol. Português é outra história: não está nessa lista, e nenhum estado australiano publica hoje um guia oficial de segurança na direção em português. Este post traduz e explica o que os próprios recursos oficiais da SA dizem, pra que quem fala português também tenha o mesmo ponto de partida.",
          es: "El Department for Infrastructure and Transport publica The Driver's Handbook, la referencia oficial de reglas de tránsito de South Australia, en el sitio My Licence. My Licence también tiene una sección dedicada a conductores internacionales, con reglas de tránsito y consejos de seguridad traducidos al francés, alemán, italiano, español, chino, árabe y dari, además del inglés. Eso convierte a SA en uno de los únicos dos estados encontrados hasta ahora, junto con New South Wales, en ofrecer algún contenido oficial de seguridad vial en español. El portugués es otra historia: no está en esa lista, y ningún estado australiano publica hoy una guía oficial de seguridad vial en portugués. Este artículo traduce y explica lo que dicen los propios recursos oficiales de SA, para que quienes hablan portugués también tengan el mismo punto de partida."
        }
      },
      {
        type: "heading",
        text: {
          en: "Speed limits: a trap for learners and P platers",
          pt: "Limites de velocidade: uma armadilha pra learners e P platers",
          es: "Límites de velocidad: una trampa para learners y P platers"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Built-up areas: the default speed limit is 50 km/h wherever there is no sign showing a different limit. Some built-up roads are signed higher, up to 60 or 80 km/h, and some residential zones or the approach to wombat pedestrian crossings are signed down to 40 km/h.",
            pt: "Áreas urbanizadas: o limite padrão é 50 km/h em qualquer via sem placa indicando um limite diferente. Algumas vias urbanizadas têm limite maior sinalizado, até 60 ou 80 km/h, e algumas zonas residenciais ou a aproximação de faixas de pedestre elevadas (wombat crossings) têm limite reduzido pra 40 km/h.",
            es: "Áreas urbanizadas: el límite por defecto es 50 km/h en cualquier vía sin señal que indique un límite distinto. Algunas vías urbanizadas tienen un límite mayor señalizado, hasta 60 u 80 km/h, y algunas zonas residenciales o los accesos a cruces peatonales elevados (wombat crossings) tienen el límite reducido a 40 km/h."
          },
          {
            en: "Outside built-up areas: the default speed limit is 100 km/h. Some open roads are signed up to 110 km/h, but that higher limit is for full licence holders only, learner and P1/P2 provisional drivers must not exceed 100 km/h even where a sign allows 110 km/h.",
            pt: "Fora das áreas urbanizadas: o limite padrão é 100 km/h. Algumas estradas abertas têm sinalização de até 110 km/h, mas esse limite maior vale só pra quem tem carteira definitiva, learners e motoristas provisórios P1/P2 não podem passar de 100 km/h, mesmo onde a placa permite 110 km/h.",
            es: "Fuera de las áreas urbanizadas: el límite por defecto es 100 km/h. Algunos caminos abiertos tienen señalización de hasta 110 km/h, pero ese límite mayor es solo para quienes tienen licencia plena, los conductores learner y provisionales P1/P2 no deben superar los 100 km/h, incluso donde la señal permita 110 km/h."
          },
          {
            en: "If a road has no speed sign at all, use your surroundings as a guide: street lights, houses or closely spaced buildings alongside the road mean the limit is 50 km/h, and their absence means the default of 100 km/h applies.",
            pt: "Se uma via não tem nenhuma placa de velocidade, use os arredores como referência: postes de iluminação, casas ou construções próximas umas das outras ao longo da via indicam que o limite é 50 km/h, e a ausência delas indica que vale o padrão de 100 km/h.",
            es: "Si un camino no tiene ninguna señal de velocidad, usa el entorno como guía: si hay luces de calle, casas o construcciones cercanas entre sí junto al camino, el límite es 50 km/h, y si no las hay, se aplica el límite por defecto de 100 km/h."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Alcohol: zero tolerance beyond a full licence",
          pt: "Álcool: tolerância zero além da carteira definitiva",
          es: "Alcohol: tolerancia cero más allá de la licencia plena"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "If you hold a learner, P1, P2 or probationary licence in SA, you must stick to a zero Blood Alcohol Concentration (BAC), meaning no alcohol at all before driving. The same zero BAC applies to drivers of buses, taxis, heavy vehicles and vehicles carrying dangerous goods. Full, unconditional licence holders, including the qualified supervising driver sitting next to a learner, must keep their BAC under 0.05. Remember that a heavy night of drinking can leave you over that limit well into the next day, since only time brings your BAC back down.",
          pt: "Se você tem carteira learner, P1, P2 ou probationary na SA, precisa manter a Concentração de Álcool no Sangue (BAC) em zero, ou seja, nada de álcool antes de dirigir. A mesma tolerância zero vale pra motoristas de ônibus, táxi, veículos pesados e veículos que transportam cargas perigosas. Motoristas com carteira definitiva e sem restrições, incluindo o supervisor qualificado sentado ao lado de um learner, precisam manter o BAC abaixo de 0,05. Lembre-se de que uma noite pesada de bebida pode deixar você acima desse limite até bem entrada a manhã seguinte, já que só o tempo reduz o BAC.",
          es: "Si tienes licencia learner, P1, P2 o probationary en SA, debes mantener una Concentración de Alcohol en Sangre (BAC) de cero, es decir, nada de alcohol antes de conducir. La misma tolerancia cero aplica a los conductores de autobuses, taxis, vehículos pesados y vehículos que transportan mercancías peligrosas. Los titulares de licencia plena, sin restricciones, incluido el supervisor calificado sentado junto a un learner, deben mantener su BAC por debajo de 0,05. Recuerda que una noche pesada de tragos puede dejarte por encima de ese límite hasta bien entrada la mañana siguiente, ya que solo el tiempo hace bajar el BAC."
        }
      },
      {
        type: "heading",
        text: {
          en: "Roundabouts",
          pt: "Rotatórias",
          es: "Rotondas"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "At a roundabout, always give way to any vehicle already on it, and keep to the left of the centre island as you go around. On a single lane roundabout, signal left as you approach if you plan to exit before halfway round, or signal right if you plan to exit after halfway round. On multi lane roundabouts, watch out for cyclists: they are entitled to stop in the left lane while giving way to vehicles exiting from the roundabout, and drivers routinely miss them there.",
          pt: "Numa rotatória, sempre dê passagem pra qualquer veículo que já esteja nela, e mantenha-se à esquerda da ilha central enquanto contorna. Numa rotatória de uma faixa só, sinalize à esquerda ao se aproximar se pretende sair antes da metade do caminho, ou sinalize à direita se pretende sair depois da metade. Em rotatórias com várias faixas, cuidado com os ciclistas: eles têm o direito de parar na faixa da esquerda enquanto dão passagem pra veículos saindo da rotatória, e motoristas costumam não perceber isso.",
          es: "En una rotonda, siempre cede el paso a cualquier vehículo que ya esté circulando en ella, y mantente a la izquierda de la isla central mientras la rodeas. En una rotonda de un solo carril, indica a la izquierda al acercarte si piensas salir antes de la mitad del recorrido, o indica a la derecha si piensas salir después de la mitad. En rotondas de varios carriles, cuidado con los ciclistas: tienen derecho a detenerse en el carril izquierdo mientras ceden el paso a los vehículos que salen de la rotonda, y los conductores suelen no verlos ahí."
        }
      },
      {
        type: "heading",
        text: {
          en: "Fatigue and wildlife on country roads",
          pt: "Fadiga e animais silvestres nas estradas do interior",
          es: "Fatiga y fauna silvestre en las carreteras rurales"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "SA's own road safety advice singles out fatigue as more likely to cause a crash on country roads, where long trips and hours of continuous driving are common. Going without sleep for more than 17 hours affects your driving about as much as a BAC of 0.05, and going without sleep for 24 hours is about the same as a BAC of 0.10, twice the legal limit. A microsleep lasting just 4 seconds at 100 km/h covers 111 metres with nobody in control of the car. The advice is to get 7 to 8 hours of sleep before a long drive, take a 15 minute break at least every two hours, and share the driving where you can. On unsealed country and outback roads, the official guidance is simply to keep an eye out for wildlife, since animals do not obey road rules.",
          pt: "As próprias orientações de segurança da SA apontam a fadiga como mais provável de causar acidentes nas estradas do interior, onde viagens longas e horas de direção contínua são comuns. Ficar mais de 17 horas sem dormir afeta sua direção quase tanto quanto um BAC de 0,05, e ficar 24 horas sem dormir equivale a um BAC de 0,10, o dobro do limite legal. Um microssono de apenas 4 segundos a 100 km/h faz o carro percorrer 111 metros sem ninguém no controle. A orientação é dormir de 7 a 8 horas antes de uma viagem longa, fazer uma pausa de 15 minutos pelo menos a cada duas horas, e revezar no volante sempre que possível. Em estradas rurais e do interior sem pavimentação, a orientação oficial é simplesmente ficar atento a animais silvestres, já que eles não seguem as regras de trânsito.",
          es: "Los propios consejos de seguridad vial de SA señalan que la fatiga tiene más probabilidades de causar accidentes en las carreteras rurales, donde los viajes largos y las horas de manejo continuo son comunes. Pasar más de 17 horas sin dormir afecta tu manejo casi tanto como un BAC de 0,05, y pasar 24 horas sin dormir equivale a un BAC de 0,10, el doble del límite legal. Un microsueño de apenas 4 segundos a 100 km/h hace que el auto recorra 111 metros sin nadie al control. La recomendación es dormir de 7 a 8 horas antes de un viaje largo, tomar una pausa de 15 minutos al menos cada dos horas, y turnarse para conducir siempre que sea posible. En caminos rurales y del interior sin pavimentar, la indicación oficial es simplemente estar atento a la fauna silvestre, ya que los animales no siguen las reglas de tránsito."
        }
      },
      {
        type: "heading",
        text: {
          en: "Driving on the left, and the documents you need",
          pt: "Dirigir pela esquerda, e os documentos que você precisa",
          es: "Conducir por la izquierda, y los documentos que necesitas"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "In Australia, every vehicle drives on the left side of the road, which is the biggest habit to unlearn if you learned to drive somewhere that drives on the right. My Licence suggests printing the Drive on Left in Australia card and keeping it visible in the car during your first weeks, and Service SA centres, tourism outlets and hire car providers can give you one too. If you are driving on an overseas or interstate licence, you must carry it at all times, and if it is not written in English, you must also carry an International Driving Permit or an English translation.",
          pt: "Na Austrália, todo veículo anda pelo lado esquerdo da via, e esse é o maior hábito a desaprender se você aprendeu a dirigir num lugar que anda pela direita. O My Licence sugere imprimir o cartão Drive on Left in Australia e deixá-lo visível no carro nas primeiras semanas, e centros do Service SA, pontos de turismo e locadoras de veículos também podem te dar um. Se você está dirigindo com uma carteira estrangeira ou de outro estado australiano, precisa levá-la sempre com você, e se ela não estiver escrita em inglês, também precisa levar um International Driving Permit ou uma tradução pro inglês.",
          es: "En Australia, todos los vehículos circulan por el lado izquierdo de la vía, y ese es el hábito más grande que hay que desaprender si aprendiste a conducir en un lugar donde se maneja por la derecha. My Licence sugiere imprimir la tarjeta Drive on Left in Australia y mantenerla visible en el auto durante tus primeras semanas, y los centros de Service SA, los puntos de turismo y las empresas de alquiler de autos también pueden darte una. Si conduces con una licencia extranjera o de otro estado australiano, debes llevarla contigo en todo momento, y si no está escrita en inglés, también debes llevar un International Driving Permit o una traducción al inglés."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This post covers what South Australia's own official resources say about the road rules and everyday driving conditions in the state. Use KangaLearner's Learn section and SA practice questions to prepare.",
          pt: "Este post cobre o que os próprios recursos oficiais da SA dizem sobre as regras de trânsito e as condições reais de direção no estado. Use a seção Aprender e as perguntas de prática de SA do KangaLearner pra se preparar.",
          es: "Este artículo cubre lo que dicen los propios recursos oficiales de SA sobre las reglas de tránsito y las condiciones reales de manejo en el estado. Usa la sección Aprender y las preguntas de práctica de SA de KangaLearner para prepararte."
        }
      }
    ]
  },
  {
    slug: "driving-in-qld-guide-for-newcomers",
    icon: "safety",
    state: "QLD",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 8,
    title: {
      en: "Driving in Queensland: the official guide, explained",
      pt: "Dirigir na Queensland: o guia oficial, explicado",
      es: "Conducir en Queensland: la guía oficial, explicada"
    },
    excerpt: {
      en: "The Queensland government publishes a driving page for newcomers in 7 languages, but not in Portuguese or Spanish. Here is what it says, translated and explained.",
      pt: "O governo da Queensland publica uma página de orientação para quem chega de fora em 7 idiomas, mas não em português. Veja o que ela diz, traduzido e explicado.",
      es: "El gobierno de Queensland publica una página de orientación para recién llegados en 7 idiomas, pero no en español. Esto es lo que dice, traducido y explicado."
    },
    sourceLabel: {
      en: "Queensland Government, Driving in Queensland (StreetSmarts)",
      pt: "Queensland Government, Driving in Queensland (StreetSmarts)",
      es: "Queensland Government, Driving in Queensland (StreetSmarts)"
    },
    sourceUrl: "https://streetsmarts.initiatives.qld.gov.au/initiatives/driving-in-queensland/",
    body: [
      {
        type: "paragraph",
        text: {
          en: "Queensland's official road safety initiative, StreetSmarts, runs a page called Driving in Queensland aimed at people who are new to the state, opening with a simple \"Welcome to Queensland!\" It confirms you can drive on Queensland roads with a valid overseas licence, and reminds newcomers that Australians drive on the left side of the road, suggesting you ask your passengers to remind you of that every time you set off. The page's factsheets are available in 7 languages: Hindi, Punjabi, Korean, Japanese, Indonesian, Chinese (Traditional) and Chinese (Simplified). Portuguese and Spanish are not among them. So if either of those is your first language, no Australian state currently publishes an official driving safety guide for you. This post closes that gap for Queensland, based directly on the official page.",
          pt: "A StreetSmarts, iniciativa oficial de segurança no trânsito da Queensland, mantém uma página chamada Driving in Queensland voltada para quem é novo no estado, com uma recepção calorosa logo na abertura. Ela confirma que você pode dirigir nas vias da Queensland com uma carteira de motorista estrangeira válida, e lembra quem chega de fora que os australianos dirigem pelo lado esquerdo da via, sugerindo que você peça aos passageiros para te lembrarem disso sempre que for dirigir. Os informativos da página estão disponíveis em 7 idiomas: hindi, panjabi, coreano, japonês, indonésio, chinês (tradicional) e chinês (simplificado). Português e espanhol não estão entre eles. Ou seja, se um desses é a sua língua materna, nenhum estado australiano publica hoje um guia oficial de segurança na direção para você. Este post preenche essa lacuna para a Queensland, com base direta na página oficial.",
          es: "La iniciativa oficial de seguridad vial de Queensland, StreetSmarts, tiene una página llamada Driving in Queensland pensada para quienes son nuevos en el estado, con una bienvenida cálida desde el comienzo. Confirma que puedes conducir por las vías de Queensland con una licencia extranjera vigente, y les recuerda a los recién llegados que en Australia se conduce por el lado izquierdo de la vía, sugiriendo que le pidas a tus acompañantes que te lo recuerden cada vez que salgas a manejar. Los materiales informativos de la página están disponibles en 7 idiomas: hindi, panyabí, coreano, japonés, indonesio, chino (tradicional) y chino (simplificado). El portugués y el español no están entre ellos. Es decir, si alguno de esos es tu idioma, hasta ahora ningún estado australiano publica una guía oficial de seguridad al conducir para ti en tu idioma. Este artículo llena ese vacío para Queensland, basado directamente en la página oficial."
        }
      },
      {
        type: "heading",
        text: {
          en: "Speed limits you need to know",
          pt: "Limites de velocidade que você precisa saber",
          es: "Límites de velocidad que necesitas saber"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Built-up areas (towns and cities): the default speed limit is 50 km/h unless a sign says otherwise.",
            pt: "Áreas urbanas (cidades e vilas): o limite padrão de velocidade é 50 km/h, a não ser que uma placa diga outra coisa.",
            es: "Zonas urbanas (ciudades y pueblos): el límite de velocidad por defecto es 50 km/h, a menos que una señal indique otra cosa."
          },
          {
            en: "Outside built-up areas: the default is 100 km/h. Some roads are signed for up to 110 km/h, but only where that higher limit is specifically posted.",
            pt: "Fora das áreas urbanas: o padrão é 100 km/h. Algumas vias têm sinalização de até 110 km/h, mas só onde esse limite mais alto está especificamente indicado.",
            es: "Fuera de las zonas urbanas: el límite por defecto es 100 km/h. Algunas vías tienen señalización de hasta 110 km/h, pero solo donde ese límite más alto está específicamente indicado."
          },
          {
            en: "School zones: 40 km/h on roads normally signed 50 to 70 km/h, and 60 km/h on roads normally signed 80 km/h or higher. These usually apply from around 7 to 9am and 2 to 4pm on school days, but flashing lights mark zones with non-standard active times, so always check the times signed on site.",
            pt: "Zonas escolares: 40 km/h em vias normalmente sinalizadas entre 50 e 70 km/h, e 60 km/h em vias normalmente sinalizadas com 80 km/h ou mais. Costumam valer das 7h às 9h e das 14h às 16h em dias letivos, mas luzes piscando indicam zonas com horários fora do padrão, então sempre confira o horário indicado no local.",
            es: "Zonas escolares: 40 km/h en vías normalmente señalizadas entre 50 y 70 km/h, y 60 km/h en vías normalmente señalizadas con 80 km/h o más. Suelen aplicar entre las 7 y las 9am y entre las 2 y las 4pm en días de clases, pero las luces intermitentes indican zonas con horarios fuera de lo estándar, así que siempre revisa el horario señalizado en el lugar."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Mobile phones and alcohol: stricter rules for learners and P platers",
          pt: "Celular e álcool: regras mais rígidas para learners e P platers",
          es: "Celular y alcohol: reglas más estrictas para learners y P platers"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Learner and P1 licence holders under 25 cannot use any function of a mobile phone while driving at all, not even hands-free or Bluetooth.",
            pt: "Motoristas com licença learner ou P1 com menos de 25 anos não podem usar nenhuma função do celular enquanto dirigem, nem viva-voz nem Bluetooth.",
            es: "Los conductores con licencia learner o P1 menores de 25 años no pueden usar ninguna función del celular mientras conducen, ni siquiera manos libres o Bluetooth."
          },
          {
            en: "Every driver, on any licence, is banned from holding a phone or resting it on their body while driving, even if the phone is switched off. P2 and open (full) licence holders may still use hands-free functions through Bluetooth or a mounted cradle.",
            pt: "Todo motorista, em qualquer categoria de licença, é proibido de segurar o celular ou apoiá-lo no corpo enquanto dirige, mesmo que o aparelho esteja desligado. Motoristas com licença P2 ou plena (open) ainda podem usar funções de viva-voz por Bluetooth ou suporte fixado no veículo.",
            es: "A todo conductor, sin importar la categoría de su licencia, se le prohíbe sostener el celular o apoyarlo sobre el cuerpo mientras conduce, incluso si el teléfono está apagado. Los titulares de licencia P2 o plena (open) todavía pueden usar funciones de manos libres por Bluetooth o un soporte fijo en el vehículo."
          },
          {
            en: "BAC (blood alcohol concentration): learner and provisional (P1 and P2) licence holders must be at exactly zero, regardless of age.",
            pt: "Concentração de álcool no sangue: motoristas com licença learner e provisional (P1 e P2) precisam estar em exatamente zero, independentemente da idade.",
            es: "Concentración de alcohol en sangre: los conductores con licencia learner y provisional (P1 y P2) deben estar en exactamente cero, sin importar la edad."
          },
          {
            en: "Open licence holders must stay below 0.05. But regardless of your licence class, the limit is always zero if you are driving a truck, bus, taxi, rideshare vehicle, tow truck, or a vehicle carrying dangerous goods.",
            pt: "Motoristas com licença plena (open) precisam ficar abaixo de 0,05. Mas, independentemente da categoria da sua licença, o limite é sempre zero se você estiver dirigindo caminhão, ônibus, táxi, veículo de aplicativo, guincho, ou veículo transportando produtos perigosos.",
            es: "Los titulares de licencia plena (open) deben mantenerse por debajo de 0.05. Pero sin importar la categoría de tu licencia, el límite siempre es cero si conduces un camión, autobús, taxi, vehículo de transporte por aplicación, grúa, o un vehículo que transporta mercancías peligrosas."
          },
          {
            en: "New motorcycle (RE) licence holders must stay at zero BAC for their first 12 months, even if they already hold an open car licence.",
            pt: "Quem tem uma licença nova de motocicleta (RE) precisa ficar em zero de álcool nos primeiros 12 meses, mesmo já tendo uma licença plena de carro.",
            es: "Quienes tienen una licencia nueva de motocicleta (RE) deben mantenerse en cero de alcohol durante los primeros 12 meses, aunque ya tengan una licencia plena de auto."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "The roundabout rule newcomers get wrong",
          pt: "A regra de rotatória que costuma confundir quem chega de fora",
          es: "La regla de la rotonda que suele confundir a los recién llegados"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "A lot of newcomers assume the rule at a roundabout is to give way to traffic approaching from the right. Queensland's official guidance for newcomers corrects this directly: that is not correct. What actually matters is whether a vehicle is already on the roundabout, not which direction it came from. Give way to every vehicle already travelling around the roundabout before you enter, no matter which side it entered from.",
          pt: "Muita gente que chega de fora acha que a regra da rotatória é dar passagem para o trânsito vindo da direita. A orientação oficial da Queensland para quem chega de fora corrige isso diretamente: isso não está correto. O que importa de verdade é se o veículo já está na rotatória, não de que direção ele veio. Dê passagem para todo veículo que já estiver circulando na rotatória antes de você entrar, não importa de que lado ele entrou.",
          es: "Mucha gente recién llegada supone que la regla en una rotonda es ceder el paso al tránsito que viene por la derecha. La orientación oficial de Queensland para recién llegados corrige esto directamente: eso no es correcto. Lo que realmente importa es si el vehículo ya está en la rotonda, no de qué dirección viene. Cede el paso a todo vehículo que ya esté circulando por la rotonda antes de entrar, sin importar de qué lado haya entrado."
        }
      },
      {
        type: "heading",
        text: {
          en: "Regional driving in Queensland: fatigue and wildlife",
          pt: "Direção no interior da Queensland: fadiga e animais",
          es: "Conducir en zonas rurales de Queensland: fatiga y fauna"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "On longer trips outside the cities, take a break at least every 2 hours, and share the driving with someone else if you can. Watch for animals grazing along the roadside, especially kangaroos, emus, koalas, wombats, sheep and cattle, which can move onto the road without warning.",
          pt: "Em viagens mais longas fora das cidades, faça uma parada pelo menos a cada 2 horas, e revezem no volante se puderem. Fique atento a animais pastando à beira da via, especialmente cangurus, emas, coalas, wombats, ovelhas e gado, que podem entrar na pista sem aviso.",
          es: "En viajes más largos fuera de las ciudades, haz una pausa al menos cada 2 horas, y cambia de conductor si es posible. Presta atención a los animales pastando al costado de la vía, especialmente canguros, emús, koalas, wombats, ovejas y ganado, que pueden entrar a la carretera sin aviso."
        }
      },
      {
        type: "heading",
        text: {
          en: "Getting your learner licence: PrepL or the written test",
          pt: "Tirando sua licença de aprendiz: PrepL ou a prova escrita",
          es: "Cómo obtener tu licencia de aprendiz: PrepL o el examen escrito"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Queensland gives learners a genuine choice in how they qualify for a car (class C) learner licence. You can enrol in PrepL, an official online learning and assessment program that takes around 4 to 6 hours and gives you 12 months of access, from age 15 years and 11 months, though you still need to turn 16 before you can actually apply for your learner licence. Passing PrepL's final assessment can replace the traditional written test. If you do not pass on your first attempt, you wait 24 hours and try again at no extra cost. The alternative is the traditional written test: 30 multiple-choice questions, a pass mark of 90% (27 out of 30), sat in person at a Transport and Motoring customer service centre, with only one attempt allowed per day. Either way, if you are under 25 you will need 100 hours of supervised driving logged before you can sit your practical driving test.",
          pt: "A Queensland dá aos aprendizes uma escolha de verdade em como se qualificar para uma licença de aprendiz de carro (categoria C). Você pode se inscrever no PrepL, um programa oficial de aprendizado e avaliação online que leva de 4 a 6 horas e dá 12 meses de acesso, a partir dos 15 anos e 11 meses, embora ainda precise completar 16 anos para poder aplicar de fato para sua licença de aprendiz. Passar na avaliação final do PrepL pode substituir a prova escrita tradicional. Se você não passar na primeira tentativa, espera 24 horas e tenta de novo sem custo extra. A alternativa é a prova escrita tradicional: 30 questões de múltipla escolha, nota mínima de 90% (27 de 30), feita presencialmente num centro de atendimento da Transport and Motoring, com apenas uma tentativa permitida por dia. De qualquer forma, se você tem menos de 25 anos, vai precisar registrar 100 horas de direção supervisionada antes de poder fazer a prova prática.",
          es: "Queensland les da a los aprendices una opción real de cómo calificar para una licencia de aprendiz de auto (categoría C). Puedes inscribirte en PrepL, un programa oficial de aprendizaje y evaluación en línea que toma entre 4 y 6 horas y da 12 meses de acceso, desde los 15 años y 11 meses, aunque todavía necesitas cumplir 16 para poder solicitar tu licencia de aprendiz. Aprobar la evaluación final de PrepL puede reemplazar el examen escrito tradicional. Si no apruebas en tu primer intento, esperas 24 horas y lo intentas de nuevo sin costo adicional. La alternativa es el examen escrito tradicional: 30 preguntas de opción múltiple, con un puntaje mínimo de aprobación del 90% (27 de 30), presentado en persona en un centro de atención de Transport and Motoring, con un solo intento permitido por día. De cualquier forma, si tienes menos de 25 años, vas a necesitar registrar 100 horas de manejo supervisado antes de poder presentar tu examen práctico."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Learner licence application (3-year issue): $80.15",
            pt: "Aplicação da licença de aprendiz (validade de 3 anos): $80.15",
            es: "Solicitud de la licencia de aprendiz (vigencia de 3 años): $80.15"
          },
          {
            en: "Written road rules test: $29.70",
            pt: "Prova escrita de regras de trânsito: $29.70",
            es: "Examen escrito de reglas de tránsito: $29.70"
          },
          {
            en: "Practical driving test: $69.40",
            pt: "Prova prática de direção: $69.40",
            es: "Examen práctico de manejo: $69.40"
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "These fees reflect a 1 July 2026 update from Transport and Main Roads. Government fees are reviewed periodically, so confirm the current amount before you pay.",
          pt: "Esses valores refletem uma atualização de 1º de julho de 2026 da Transport and Main Roads. Taxas do governo são revisadas periodicamente, então confirme o valor atual antes de pagar.",
          es: "Estos valores reflejan una actualización del 1 de julio de 2026 de Transport and Main Roads. Las tarifas del gobierno se revisan periodicamente, así que confirma el monto actual antes de pagar."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This post is based on Queensland's official Driving in Queensland page from StreetSmarts, and on published Transport and Main Roads fee information. Use KangaLearner's Learn section and QLD practice questions to prepare for your learner licence test.",
          pt: "Este post é baseado na página oficial Driving in Queensland, da StreetSmarts, e em informações de taxas publicadas pela Transport and Main Roads. Use a seção Aprender e as perguntas de prática de QLD do KangaLearner para se preparar para a prova de licença de aprendiz.",
          es: "Este artículo está basado en la página oficial Driving in Queensland, de StreetSmarts, y en información de tarifas publicada por Transport and Main Roads. Usa la sección Aprender y las preguntas de práctica de QLD de KangaLearner para prepararte para el examen de licencia de aprendiz."
        }
      }
    ]
  },
  {
    slug: "vic-learner-theory-test-guide",
    icon: "checklist",
    state: "VIC",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "How to book and pass Victoria's Learner Permit Test",
      pt: "Como marcar e passar no Learner Permit Test de Victoria",
      es: "Cómo reservar y aprobar el Learner Permit Test de Victoria"
    },
    excerpt: {
      en: "Online or in person, the myVicRoads account, the 32 question test, fees and what happens if you fail: everything official about booking and sitting Victoria's Learner Permit Test.",
      pt: "Online ou presencial, a conta myVicRoads, a prova de 32 questões, taxas e o que acontece se você reprovar: tudo o que é oficial sobre marcar e fazer o Learner Permit Test de Victoria.",
      es: "En línea o en persona, la cuenta myVicRoads, el examen de 32 preguntas, tarifas y qué pasa si repruebas: todo lo oficial sobre reservar y presentar el Learner Permit Test de Victoria."
    },
    sourceLabel: {
      en: "VicRoads, Learner Permit Test",
      pt: "VicRoads, Learner Permit Test",
      es: "VicRoads, Learner Permit Test"
    },
    sourceUrl: "https://www.vicroads.vic.gov.au/ls-and-ps/getting-your-ls/learner-permit-test",
    body: [
      {
        type: "paragraph",
        text: {
          en: "In Victoria the learner theory test is officially called the Learner Permit Test. It is 32 multiple choice questions, with a pass mark of 78%, which works out to at least 25 correct answers. Once issued, your learner permit is valid for 10 years or until you get your probationary licence, your Ps, whichever comes first. This post walks through the official process to book and sit the test, based on VicRoads' own pages.",
          pt: "Em Victoria, a prova teórica de learner é chamada oficialmente de Learner Permit Test. São 32 questões de múltipla escolha, com nota de corte de 78%, o que equivale a acertar pelo menos 25 questões. Uma vez emitida, sua licença de aprendiz vale por 10 anos ou até você conseguir sua licença provisória, a P, o que vier primeiro. Este post mostra o processo oficial para marcar e fazer a prova, com base nas páginas da própria VicRoads.",
          es: "En Victoria, el examen teórico de learner se llama oficialmente Learner Permit Test. Son 32 preguntas de opción múltiple, con un puntaje mínimo de aprobación del 78%, lo que equivale a acertar al menos 25 preguntas. Una vez emitida, tu licencia de aprendiz es válida por 10 años o hasta que obtengas tu licencia provisional, tu P, lo que ocurra primero. Este post repasa el proceso oficial para reservar y presentar el examen, basado en las propias páginas de VicRoads."
        }
      },
      {
        type: "heading",
        text: {
          en: "You need a myVicRoads account",
          pt: "Você precisa de uma conta myVicRoads",
          es: "Necesitas una cuenta myVicRoads"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Set up a myVicRoads account before you start. It is how you enrol in the online course, apply for your learner permit once you pass, and later manage your digital licence, demerit points and vehicle registration. You can create one directly on the VicRoads website.",
          pt: "Crie uma conta myVicRoads antes de começar. É por ela que você se inscreve no curso online, aplica pra sua licença de aprendiz depois de passar, e depois gerencia sua licença digital, pontos de demérito e registro do veículo. Você pode criar uma direto no site da VicRoads.",
          es: "Crea una cuenta myVicRoads antes de empezar. Es a través de ella que te inscribes en el curso en línea, solicitas tu licencia de aprendiz después de aprobar, y luego gestionas tu licencia digital, puntos de demérito y registro del vehículo. Puedes crear una directamente en el sitio web de VicRoads."
        }
      },
      {
        type: "heading",
        text: {
          en: "Online course or in-person test",
          pt: "Curso online ou prova presencial",
          es: "Curso en línea o examen presencial"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Online: an interactive course covering road rules and safe driving, taking about 4 to 6 hours in total including the final test, done through your myVicRoads account. You do not need any prior knowledge to start, you have 12 months to finish once you enrol, and you can repeat the course itself as many times as you like before attempting the test. Your first attempt at the test is free, further attempts cost a fee. The online course is currently available in English only. You can enrol from age 15 years and 11 months, though your permit is only issued once you turn 16.",
            pt: "Online: um curso interativo sobre regras de trânsito e direção segura, levando cerca de 4 a 6 horas no total incluindo a prova final, feito pela sua conta myVicRoads. Você não precisa de nenhum conhecimento prévio para começar, tem 12 meses para terminar depois de se inscrever, e pode refazer o curso quantas vezes quiser antes de tentar a prova. Sua primeira tentativa na prova é gratuita, tentativas seguintes têm uma taxa. O curso online está disponível atualmente só em inglês. Você pode se inscrever a partir dos 15 anos e 11 meses, mas sua licença só é emitida ao completar 16.",
            es: "En línea: un curso interactivo sobre las reglas de tránsito y la conducción segura, que toma entre 4 y 6 horas en total incluyendo el examen final, hecho a través de tu cuenta myVicRoads. No necesitas ningún conocimiento previo para empezar, tienes 12 meses para terminarlo después de inscribirte, y puedes repetir el curso las veces que quieras antes de intentar el examen. Tu primer intento del examen es gratuito, los intentos siguientes tienen un costo. El curso en línea está disponible actualmente solo en inglés. Puedes inscribirte desde los 15 años y 11 meses, aunque tu permiso solo se emite al cumplir 16."
          },
          {
            en: "In person: a computer based test only, at a VicRoads Customer Service Centre, with your test and your Ls application completed in the same appointment. This route exists if you want to sit the test in another language, do not have access to a computer or the internet, have a hearing or vision impairment, or simply prefer it in person. You need to book an appointment in advance, study beforehand since there is no course included, and bring all your required application documents with you. Allow 45 minutes for the appointment, and expect a possible wait.",
            pt: "Presencial: só a prova, feita no computador, num VicRoads Customer Service Centre, com a prova e a aplicação da sua Ls feitas no mesmo atendimento. Esse caminho existe se você quer fazer a prova em outro idioma, não tem acesso a computador ou internet, tem alguma deficiência auditiva ou visual, ou simplesmente prefere fazer presencialmente. Você precisa marcar um horário com antecedência, estudar antes já que não tem curso incluso, e levar todos os documentos exigidos pra aplicação. Reserve 45 minutos pro atendimento, e conte com uma possível espera.",
            es: "En persona: solo el examen, hecho en computadora, en un VicRoads Customer Service Centre, con el examen y tu solicitud de la Ls completados en la misma cita. Este camino existe si quieres presentar el examen en otro idioma, no tienes acceso a computadora o internet, tienes alguna discapacidad auditiva o visual, o simplemente prefieres hacerlo en persona. Necesitas reservar una cita con anticipación, estudiar de antemano ya que no incluye curso, y llevar todos los documentos que exige la solicitud. Reserva 45 minutos para la cita, y cuenta con una posible espera."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Test format: 32 questions, 78% to pass",
          pt: "Formato da prova: 32 questões, 78% para passar",
          es: "Formato del examen: 32 preguntas, 78% para aprobar"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Whichever way you sit it, the Learner Permit Test itself is 32 multiple choice questions with a 78% pass mark, and the questions are drawn from all four chapters of the Road to Solo Driving Handbook, so studying only part of it leaves real gaps. VicRoads also publishes a free practice test built the same way, 32 randomly generated questions with the same 78% pass mark, and wrong answers link back to the exact chapter that covers them.",
          pt: "Seja qual for o caminho que você escolher, o Learner Permit Test em si tem 32 questões de múltipla escolha com nota de corte de 78%, e as questões vêm dos quatro capítulos do Road to Solo Driving Handbook, então estudar só parte dele deixa lacunas de verdade. A VicRoads também publica uma prova de prática gratuita montada do mesmo jeito, 32 questões geradas aleatoriamente com a mesma nota de corte de 78%, e respostas erradas levam direto ao capítulo que cobre aquele assunto.",
          es: "Sea cual sea el camino que elijas, el examen en sí tiene 32 preguntas de opción múltiple con un 78% de aprobación, y las preguntas salen de los cuatro capítulos del Road to Solo Driving Handbook, así que estudiar solo una parte deja huecos reales. VicRoads también publica un examen de práctica gratuito armado de la misma forma, 32 preguntas generadas al azar con el mismo 78% de aprobación, y las respuestas incorrectas te llevan directo al capítulo que cubre ese tema."
        }
      },
      {
        type: "heading",
        text: {
          en: "Documents and the eyesight test",
          pt: "Documentos e o teste de visão",
          es: "Documentos y el examen de la vista"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "If you passed online, you do not need an appointment for this next part, just visit your nearest VicRoads Customer Service Centre with the QR code you were emailed after finishing the course. Either way, bring one Category A document proving who you are, an original passport or a full Australian birth certificate, plus one Category B document showing you use that identity in the community, such as a Medicare card or a bank card, and proof of your Victorian address if it is not already shown on those documents. At the counter, staff check your application and identity documents, test your eyesight (bring your glasses or contact lenses if you wear them), and take your photo and signature. You leave with a temporary learner permit while the physical card is posted to you, or you can load a digital version onto the myVicRoads app within a day or two.",
          pt: "Se você passou online, não precisa de horário marcado pra essa próxima etapa, é só visitar o VicRoads Customer Service Centre mais próximo com o QR code que te mandaram por email ao terminar o curso. De qualquer forma, leve um documento Categoria A que comprove quem você é, um passaporte original ou uma certidão de nascimento australiana completa, mais um documento Categoria B que mostre que você usa essa identidade na comunidade, como um cartão Medicare ou um cartão de banco, e comprovante do seu endereço em Victoria se ele não estiver nesses documentos. No balcão, a equipe confere sua aplicação e seus documentos de identidade, testa sua visão (leve seus óculos ou lentes de contato se você usa), e tira sua foto e assinatura. Você sai com uma licença de aprendiz temporária enquanto o cartão físico é enviado pelo correio, ou pode carregar uma versão digital no app myVicRoads em um ou dois dias.",
          es: "Si aprobaste en línea, no necesitas cita para esta siguiente parte, solo tienes que visitar el VicRoads Customer Service Centre más cercano con el código QR que te enviaron por correo al terminar el curso. De cualquier forma, lleva un documento de Categoría A que compruebe quién eres, un pasaporte original o un certificado de nacimiento australiano completo, más un documento de Categoría B que muestre que usas esa identidad en la comunidad, como una tarjeta Medicare o una tarjeta bancaria, y comprobante de tu domicilio en Victoria si no aparece ya en esos documentos. En el mostrador, el personal revisa tu solicitud y tus documentos de identidad, examina tu vista (lleva tus lentes o lentes de contacto si usas), y te toma la foto y la firma. Sales con un permiso de aprendiz temporal mientras te envían la tarjeta física por correo, o puedes cargar una versión digital en la app myVicRoads en uno o dos días."
        }
      },
      {
        type: "heading",
        text: {
          en: "Fees",
          pt: "Taxas",
          es: "Tarifas"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Learner Permit Test online: your first attempt is free, further attempts cost $28.70.",
            pt: "Learner Permit Test online: sua primeira tentativa é gratuita, tentativas seguintes custam $28.70.",
            es: "Learner Permit Test en línea: tu primer intento es gratuito, los intentos siguientes cuestan $28.70."
          },
          {
            en: "Learner Permit Test in person: $28.70 for the test plus a $22.10 appointment fee, a total of $50.80.",
            pt: "Learner Permit Test presencial: $28.70 pela prova mais uma taxa de $22.10 de atendimento, um total de $50.80.",
            es: "Learner Permit Test en persona: $28.70 por el examen más una tarifa de $22.10 por la cita, un total de $50.80."
          },
          {
            en: "Getting your learner permit issued: currently free, waived under the Motorist Package and Safe Driver Discount. If you need to change your in-person appointment you pay the $22.10 appointment fee again, and if you cancel it you pay both the appointment fee and a new test fee to rebook.",
            pt: "Emissão da sua licença de aprendiz: atualmente gratuita, isenta pelo Motorist Package and Safe Driver Discount. Se você precisar remarcar seu atendimento presencial, paga a taxa de $22.10 de novo, e se cancelar, paga tanto a taxa de atendimento quanto uma nova taxa de prova pra remarcar.",
            es: "Emisión de tu licencia de aprendiz: actualmente gratuita, exenta bajo el Motorist Package and Safe Driver Discount. Si necesitas reprogramar tu cita presencial, pagas la tarifa de $22.10 de nuevo, y si la cancelas, pagas tanto la tarifa de la cita como una nueva tarifa de examen para reprogramar."
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "These figures are current at the time of writing, but government fees are reviewed periodically, so confirm the exact amount on vicroads.vic.gov.au before you pay.",
          pt: "Esses valores são atuais no momento em que este post foi escrito, mas taxas do governo são revisadas periodicamente, então confirme o valor exato em vicroads.vic.gov.au antes de pagar.",
          es: "Estos valores están vigentes al momento de escribir este post, pero las tarifas del gobierno se revisan periodicamente, así que confirma el monto exacto en vicroads.vic.gov.au antes de pagar."
        }
      },
      {
        type: "heading",
        text: {
          en: "Languages offered",
          pt: "Idiomas oferecidos",
          es: "Idiomas ofrecidos"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "The online course and test are available in English only. The in-person test opens up 13 languages instead: Albanian, Arabic, Cambodian, Mandarin Chinese, Macedonian, Persian, Russian, Serbian, Sinhalese, Somali, Spanish, Turkish and Vietnamese, and if yours is not on that list you can book an interpreter at your nearest VicRoads Customer Service Centre. Spanish speakers can sit the actual test in Spanish this way. Portuguese is not one of the 13, so a Portuguese speaking newcomer needs English, an interpreter, or a lot of patience with the free online course, which is English only regardless of which path you take.",
          pt: "O curso e a prova online estão disponíveis só em inglês. A prova presencial abre 13 idiomas: albanês, árabe, cambojano, mandarim, macedônio, persa, russo, sérvio, cingalês, somali, espanhol, turco e vietnamita, e se o seu não estiver nessa lista você pode marcar um intérprete no VicRoads Customer Service Centre mais próximo. Quem fala espanhol pode fazer a prova em si em espanhol por esse caminho. Português não é um dos 13, então quem fala português precisa de inglês, de um intérprete, ou de bastante paciência com o curso online gratuito, que é só em inglês de qualquer jeito.",
          es: "El curso y el examen en línea están disponibles solo en inglés. El examen en persona abre 13 idiomas en cambio: albanés, árabe, camboyano, mandarín, macedonio, persa, ruso, serbio, cingalés, somalí, español, turco y vietnamita, y si el tuyo no está en esa lista puedes reservar un intérprete en el VicRoads Customer Service Centre más cercano. Quienes hablan español pueden presentar el examen real en español por esta vía. El portugués no es uno de los 13, así que quien habla portugués necesita inglés, un intérprete, o mucha paciencia con el curso en línea gratuito, que es solo en inglés de cualquier forma."
        }
      },
      {
        type: "heading",
        text: {
          en: "If you fail",
          pt: "Se você reprovar",
          es: "Si repruebas"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "If you fail, you can try again, but you will need to pay a fee, whether you are retaking it online or in person. There is one exception: if you fail the in-person test at a VicRoads Customer Service Centre, you get one more attempt at the online version for free. Either way, take the extra attempt as a signal to go back through the parts of the Road to Solo Driving Handbook you got wrong, rather than just repeating the same questions.",
          pt: "Se você reprovar, pode tentar de novo, mas vai precisar pagar uma taxa, seja refazendo online ou presencialmente. Existe uma exceção: se você reprovar na prova presencial num VicRoads Customer Service Centre, ganha mais uma tentativa na versão online de graça. De qualquer forma, use essa tentativa extra como sinal pra revisar as partes do Road to Solo Driving Handbook que você errou, em vez de simplesmente repetir as mesmas questões.",
          es: "Si repruebas, puedes volver a intentarlo, pero vas a tener que pagar una tarifa, ya sea que lo repitas en línea o en persona. Hay una excepción: si repruebas el examen en persona en un VicRoads Customer Service Centre, obtienes un intento más en la versión en línea de forma gratuita. De cualquier forma, aprovecha ese intento extra para repasar las partes del Road to Solo Driving Handbook que fallaste, en vez de simplemente repetir las mismas preguntas."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Use KangaLearner's Learn section and VIC practice questions to prepare for the actual content of the test, and check vicroads.vic.gov.au or your myVicRoads account to confirm booking, fees and language options before your appointment.",
          pt: "Use a seção Aprender e as perguntas de prática de VIC do KangaLearner pra se preparar pro conteúdo real da prova, e confira vicroads.vic.gov.au ou sua conta myVicRoads pra confirmar agendamento, taxas e opções de idioma antes do seu atendimento.",
          es: "Usa la sección Aprender y las preguntas de práctica de VIC de KangaLearner para prepararte para el contenido real del examen, y revisa vicroads.vic.gov.au o tu cuenta myVicRoads para confirmar la reserva, las tarifas y las opciones de idioma antes de tu cita."
        }
      }
    ]
  },
  {
    slug: "vic-overseas-licence-conversion-guide",
    icon: "checklist",
    state: "VIC",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "Converting your overseas driving licence in Victoria",
      pt: "Convertendo sua carteira de motorista estrangeira em Victoria",
      es: "Convirtiendo tu licencia de conducir extranjera en Victoria"
    },
    excerpt: {
      en: "Victoria's overseas licence rule is not based on your visa, it is based on how long you actually live in the state. Here is who must convert, who does not, and the recognised country list that decides whether you sit a test.",
      pt: "A regra de carteira estrangeira de Victoria não é baseada no seu visto, é baseada em quanto tempo você realmente mora no estado. Veja quem precisa converter, quem não precisa, e a lista de países reconhecidos que decide se você faz prova.",
      es: "La regla de licencia extranjera de Victoria no se basa en tu visa, se basa en cuánto tiempo realmente vives en el estado. Aquí está quién debe convertir, quién no, y la lista de países reconocidos que decide si rindes un examen."
    },
    sourceLabel: {
      en: "VicRoads, Convert overseas licence",
      pt: "VicRoads, Convert overseas licence",
      es: "VicRoads, Convert overseas licence"
    },
    sourceUrl:
      "https://www.vicroads.vic.gov.au/licences/convert-your-licence/convert-overseas-licence",
    body: [
      {
        type: "paragraph",
        text: {
          en: "Victoria's rule for converting an overseas driving licence works differently from what you might expect if you have already read about other states. It is not based on your visa type at all. It is based purely on how long you actually live in Victoria. That single difference changes who needs to convert and when, so it is worth understanding before you assume the rules from another state apply here too.",
          pt: "A regra de Victoria para converter uma carteira de motorista estrangeira funciona diferente do que você pode esperar se já leu sobre outros estados. Ela não é baseada no tipo do seu visto, de jeito nenhum. É baseada puramente em quanto tempo você realmente mora em Victoria. Essa única diferença muda quem precisa converter e quando, então vale a pena entender antes de supor que as regras de outro estado também valem aqui.",
          es: "La regla de Victoria para convertir una licencia de conducir extranjera funciona distinto de lo que podrías esperar si ya leíste sobre otros estados. No se basa para nada en el tipo de tu visa. Se basa puramente en cuánto tiempo realmente vives en Victoria. Esa única diferencia cambia quién necesita convertir y cuándo, así que vale la pena entenderla antes de suponer que las reglas de otro estado también aplican aquí."
        }
      },
      {
        type: "heading",
        text: {
          en: "Time decides if you need to convert, not your visa",
          pt: "O tempo decide se você precisa converter, não o seu visto",
          es: "El tiempo decide si necesitas convertir, no tu visa"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Under 6 months living in Victoria: you can drive on your current, valid overseas licence, as long as it is for the type of vehicle you are driving. If it is not in English, you must also carry an English translation or an International Driving Permit in English.",
            pt: "Menos de 6 meses morando em Victoria: você pode dirigir com sua carteira estrangeira atual e válida, desde que seja do tipo de veículo que você está dirigindo. Se ela não estiver em inglês, você também precisa levar uma tradução para o inglês ou um International Driving Permit em inglês.",
            es: "Menos de 6 meses viviendo en Victoria: puedes conducir con tu licencia extranjera actual y vigente, siempre que sea del tipo de vehículo que estás conduciendo. Si no está en inglés, también debes llevar una traducción al inglés o un International Driving Permit en inglés."
          },
          {
            en: "6 months or more living in Victoria: you must convert to a Victorian licence, and this applies no matter what visa you hold. Unlike some other states, Victoria does not carve out an exception for temporary visa holders or international students, the only thing that counts is how long you actually live in the state.",
            pt: "6 meses ou mais morando em Victoria: você precisa converter para uma carteira de Victoria, e isso vale não importa qual visto você tenha. Diferente de outros estados, Victoria não isenta quem tem visto temporário ou estudantes internacionais dessa regra, o que conta é só quanto tempo você realmente mora no estado.",
            es: "6 meses o más viviendo en Victoria: debes convertir tu licencia a una de Victoria, y esto aplica sin importar qué visa tengas. A diferencia de otros estados, Victoria no exime a quienes tienen visa temporal ni a estudiantes internacionales de esta regla, lo único que cuenta es cuánto tiempo realmente vives en el estado."
          },
          {
            en: "The 6-month clock starts from the day you start living in Victoria, even if you leave the state and come back. It does not reset.",
            pt: "A contagem de 6 meses começa no dia em que você começa a morar em Victoria, mesmo que você saia do estado e volte. Ela não reinicia.",
            es: "El plazo de 6 meses comienza el día en que empiezas a vivir en Victoria, incluso si sales del estado y vuelves. No se reinicia."
          },
          {
            en: "You cannot use your overseas licence in Victoria at all, regardless of the 6-month window, if you have been disqualified or suspended from driving or from getting a licence in any country, if you have failed a driving test in Victoria, or if you already hold an Australian licence or permit from another state or territory, including for trucks or motorcycles. And once you do get a Victorian licence, it becomes an offence to keep using your overseas one to drive.",
            pt: "Você não pode usar sua carteira estrangeira em Victoria de jeito nenhum, independente da janela de 6 meses, se você já foi desqualificado ou suspenso de dirigir ou de tirar uma carteira em qualquer país, se você já reprovou numa prova de direção em Victoria, ou se você já tem uma carteira ou permissão australiana de outro estado ou território, incluindo para caminhões ou motos. E assim que você tiver uma carteira de Victoria, passa a ser uma infração continuar usando a sua carteira estrangeira para dirigir.",
            es: "No puedes usar tu licencia extranjera en Victoria de ninguna manera, sin importar la ventana de 6 meses, si te han descalificado o suspendido de conducir o de obtener una licencia en cualquier país, si ya reprobaste un examen de manejo en Victoria, o si ya tienes una licencia o permiso australiano de otro estado o territorio, incluyendo para camiones o motos. Y en cuanto tengas una licencia de Victoria, se convierte en una infracción seguir usando tu licencia extranjera para conducir."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Recognised country or not, and how the outcome differs",
          pt: "País reconhecido ou não, e como o resultado muda",
          es: "País reconocido o no, y cómo cambia el resultado"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "VicRoads sorts every country into a recognition category, and that category decides almost everything about your conversion. If your overseas licence comes from a recognised country, you can generally convert without sitting any theory or practical test at all, you just need to bring your documents, pass an eyesight test, and pay the appointment fee. VicRoads' own list currently gives full recognition to countries including the United Kingdom, the United States, Canada, Ireland, Germany, France, Italy, Japan, Singapore and several other European countries, and New Zealand sits in its own separate recognised category. If your licence is from a country not on that list, for example China, India, the Philippines, Vietnam, Brazil or Hong Kong, you fall into the non-recognised category and must pass a Road Law Knowledge Test, a Hazard Perception Test and a practical Drive Test before VicRoads issues you a Victorian licence. Your overseas licence may also be sent off to be checked for authenticity. The full, current list only exists in VicRoads' own online requirements checker, since it changes over time, so always confirm your specific country there rather than trusting an old list.",
          pt: "A VicRoads classifica cada país numa categoria de reconhecimento, e essa categoria decide quase tudo sobre a sua conversão. Se sua carteira estrangeira é de um país reconhecido, você geralmente pode converter sem fazer nenhuma prova teórica ou prática, só precisa levar seus documentos, passar num teste de visão, e pagar a taxa do atendimento. A própria lista da VicRoads atualmente dá reconhecimento total a países como Reino Unido, Estados Unidos, Canadá, Irlanda, Alemanha, França, Itália, Japão, Singapura e vários outros países europeus, e a Nova Zelândia fica numa categoria de reconhecimento separada, só dela. Se sua carteira é de um país que não está nessa lista, por exemplo China, Índia, Filipinas, Vietnã, Brasil ou Hong Kong, você entra na categoria não reconhecida e precisa passar numa Road Law Knowledge Test, numa Hazard Perception Test e num Drive Test antes que a VicRoads emita sua carteira de Victoria. Sua carteira estrangeira também pode ser enviada para verificação de autenticidade. A lista completa e atual só existe na própria ferramenta online de verificação de requisitos da VicRoads, já que ela muda com o tempo, então sempre confirme o seu país específico lá em vez de confiar numa lista antiga.",
          es: "VicRoads clasifica cada país en una categoría de reconocimiento, y esa categoría decide casi todo sobre tu conversión. Si tu licencia extranjera es de un país reconocido, generalmente puedes convertirla sin rendir ningún examen teórico ni práctico, solo necesitas llevar tus documentos, pasar un examen de vista, y pagar la tarifa de la cita. La propia lista de VicRoads actualmente da reconocimiento total a países como el Reino Unido, Estados Unidos, Canadá, Irlanda, Alemania, Francia, Italia, Japón, Singapur y varios otros países europeos, y Nueva Zelanda tiene su propia categoría de reconocimiento aparte. Si tu licencia es de un país que no está en esa lista, por ejemplo China, India, Filipinas, Vietnam, Brasil o Hong Kong, entras en la categoría no reconocida y debes aprobar un Road Law Knowledge Test, un Hazard Perception Test y un Drive Test antes de que VicRoads te emita tu licencia de Victoria. Tu licencia extranjera también puede ser enviada a verificación de autenticidad. La lista completa y actual solo existe en la propia herramienta en línea de verificación de requisitos de VicRoads, ya que cambia con el tiempo, así que confirma siempre tu país específico ahí en vez de confiar en una lista vieja."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Even within a recognised country, the date your licence was first issued can matter. VicRoads notes that licences from the Isle of Man are only recognised if first issued on or after 1 April 1991, and licences from Malta only if first issued on or after 2 January 2004.",
            pt: "Mesmo dentro de um país reconhecido, a data em que sua carteira foi emitida pela primeira vez pode importar. A VicRoads registra que carteiras da Ilha de Man só são reconhecidas se emitidas pela primeira vez em ou após 1º de abril de 1991, e carteiras de Malta só se emitidas pela primeira vez em ou após 2 de janeiro de 2004.",
            es: "Incluso dentro de un país reconocido, la fecha en que se emitió tu licencia por primera vez puede importar. VicRoads señala que las licencias de la Isla de Man solo se reconocen si se emitieron por primera vez el 1 de abril de 1991 o después, y las licencias de Malta solo si se emitieron por primera vez el 2 de enero de 2004 o después."
          },
          {
            en: "Age and experience affect the outcome too. VicRoads notes that if you got your original licence before you turned 21 and have held it for less than 4 years, the type of Victorian licence you receive may differ from a standard recognised-country conversion, so do not assume you will automatically get a full licence.",
            pt: "Idade e experiência também afetam o resultado. A VicRoads avisa que, se você tirou sua carteira original antes de completar 21 anos e a tem há menos de 4 anos, o tipo de carteira de Victoria que você recebe pode ser diferente de uma conversão padrão de país reconhecido, então não presuma que vai receber automaticamente uma carteira completa.",
            es: "La edad y la experiencia también afectan el resultado. VicRoads advierte que si obtuviste tu licencia original antes de cumplir 21 años y la tienes hace menos de 4 años, el tipo de licencia de Victoria que recibas puede ser distinto de una conversión estándar de país reconocido, así que no supongas que vas a recibir automáticamente una licencia completa."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Documents you will need",
          pt: "Documentos que você vai precisar",
          es: "Documentos que vas a necesitar"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "A completed Licence or Learner Permit Application form, available on vicroads.vic.gov.au.",
            pt: "Um formulário de Aplicação de Carteira ou Permissão de Aprendiz preenchido, disponível em vicroads.vic.gov.au.",
            es: "Un formulario de Solicitud de Licencia o Permiso de Aprendiz completado, disponible en vicroads.vic.gov.au."
          },
          {
            en: "Original evidence of identity, plus proof that you live in Victoria such as a bank statement, utility bill or rental agreement. If you cannot provide proof of address, someone can sign the Victorian residence declaration on the application form instead.",
            pt: "Comprovação de identidade original, mais prova de que você mora em Victoria, como um extrato bancário, uma conta de serviço ou um contrato de aluguel. Se você não conseguir comprovar o endereço, alguém pode assinar a declaração de residência em Victoria no próprio formulário de aplicação.",
            es: "Comprobación de identidad original, más prueba de que vives en Victoria, como un extracto bancario, una factura de servicios o un contrato de alquiler. Si no puedes comprobar tu domicilio, alguien puede firmar la declaración de residencia en Victoria en el propio formulario de solicitud."
          },
          {
            en: "Your original overseas licence. If you no longer have it, VicRoads accepts a letter from your country's driver licensing authority, or from your country's consulate or embassy in Australia, confirming your licence details instead.",
            pt: "Sua carteira estrangeira original. Se você não tem mais ela, a VicRoads aceita uma carta da autoridade de licenciamento do seu país, ou do consulado ou embaixada do seu país na Austrália, confirmando os dados da sua carteira em vez disso.",
            es: "Tu licencia extranjera original. Si ya no la tienes, VicRoads acepta una carta de la autoridad de licencias de tu país, o del consulado o embajada de tu país en Australia, confirmando los datos de tu licencia en su lugar."
          },
          {
            en: "A NAATI-approved English translation of your licence, or a current International Driving Permit, only if your original licence is not in English.",
            pt: "Uma tradução para o inglês aprovada pela NAATI, ou um International Driving Permit válido, só se sua carteira original não estiver em inglês.",
            es: "Una traducción al inglés aprobada por NAATI, o un International Driving Permit vigente, solo si tu licencia original no está en inglés."
          },
          {
            en: "Glasses or contact lenses if you need them for the eyesight test, and any relevant medical reports if you take medication or have a condition that could affect your driving.",
            pt: "Óculos ou lentes de contato se você precisar deles para o teste de visão, e quaisquer relatórios médicos relevantes se você toma algum remédio ou tem uma condição que possa afetar sua direção.",
            es: "Anteojos o lentes de contacto si los necesitas para el examen de vista, y cualquier informe médico relevante si tomas algún medicamento o tienes una condición que pueda afectar tu manejo."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Fees and where to go",
          pt: "Taxas e onde ir",
          es: "Tarifas y dónde ir"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Converting an overseas licence to a Victorian one currently costs a $22.10 appointment fee, which covers verifying your licence. Depending on your specific licence and circumstances, you may also need to pay an additional reissue fee for the physical card. If you are in the non-recognised category, the Road Law Knowledge, Hazard Perception and Drive Tests are booked and paid for separately from this appointment. Everything is done in person at a VicRoads Customer Service Centre, after you use VicRoads' online requirements checker to confirm what applies to you and make your booking. These figures are current at the time of writing, but government fees are reviewed periodically, so confirm the exact amount on vicroads.vic.gov.au before you go.",
          pt: "Converter uma carteira estrangeira para uma carteira de Victoria custa atualmente uma taxa de atendimento de $22.10, que cobre a verificação da sua carteira. Dependendo da sua carteira específica e da sua situação, você também pode precisar pagar uma taxa adicional de reemissão pelo cartão físico. Se você está na categoria não reconhecida, a Road Law Knowledge Test, a Hazard Perception Test e a Drive Test são marcadas e pagas separadamente desse atendimento. Tudo é feito presencialmente num VicRoads Customer Service Centre, depois de você usar a ferramenta online de verificação de requisitos da VicRoads para confirmar o que vale para o seu caso e fazer sua marcação. Esses valores são atuais no momento em que este post foi escrito, mas taxas do governo são revisadas periodicamente, então confirme o valor exato em vicroads.vic.gov.au antes de ir.",
          es: "Convertir una licencia extranjera a una licencia de Victoria actualmente cuesta una tarifa de cita de $22.10, que cubre la verificación de tu licencia. Dependiendo de tu licencia específica y tu situación, también podrías necesitar pagar una tarifa adicional de reemisión por la tarjeta física. Si estás en la categoría no reconocida, el Road Law Knowledge Test, el Hazard Perception Test y el Drive Test se reservan y se pagan por separado de esta cita. Todo se hace en persona en un VicRoads Customer Service Centre, después de que uses la herramienta en línea de verificación de requisitos de VicRoads para confirmar qué aplica a tu caso y hacer tu reserva. Estos valores están vigentes al momento de escribir este post, pero las tarifas del gobierno se revisan periódicamente, así que confirma el monto exacto en vicroads.vic.gov.au antes de ir."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Whether your country is recognised or not, understanding Victoria's actual road rules matters just as much as the paperwork, since a licence conversion does not teach you hook turns, tram give-way rules or how Victorian roundabouts work in practice. Use KangaLearner's Learn section and VIC practice questions to prepare for what the test and Victorian roads actually expect from you.",
          pt: "Seja seu país reconhecido ou não, entender as regras de trânsito de verdade de Victoria importa tanto quanto a papelada, já que uma conversão de carteira não ensina hook turns, as regras de ceder passagem para bondes ou como as rotatórias de Victoria funcionam na prática. Use a seção Aprender e as perguntas de prática de VIC do KangaLearner para se preparar para o que a prova e as ruas de Victoria realmente esperam de você.",
          es: "Sea tu país reconocido o no, entender las reglas de tránsito reales de Victoria importa tanto como el papeleo, ya que una conversión de licencia no te enseña los hook turns, las reglas de ceder el paso a los tranvías ni cómo funcionan las rotondas de Victoria en la práctica. Usa la sección Aprender y las preguntas de práctica de VIC de KangaLearner para prepararte para lo que el examen y las calles de Victoria realmente esperan de ti."
        }
      }
    ]
  },
  {
    slug: "vic-p-plate-rules-guide",
    icon: "safety",
    state: "VIC",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 8,
    title: {
      en: "Victoria's P1 and P2 probationary licence rules, explained",
      pt: "As regras da licença provisória P1 e P2 em Victoria, explicadas",
      es: "Las reglas de la licencia provisional P1 y P2 en Victoria, explicadas"
    },
    excerpt: {
      en: "How long you stay on P1 versus P2, how many passengers you can carry, phone rules, speed limits and which cars are banned for P1 and P2 drivers in Victoria.",
      pt: "Quanto tempo você fica no P1 e no P2, quantos passageiros pode levar, regras de celular, limites de velocidade e quais carros são proibidos para motoristas P1 e P2 em Victoria.",
      es: "Cuánto tiempo estás en P1 y en P2, cuántos pasajeros puedes llevar, las reglas de celular, los límites de velocidad y qué autos están prohibidos para conductores P1 y P2 en Victoria."
    },
    sourceLabel: {
      en: "Transport Victoria, Learner and probationary driver road rules",
      pt: "Transport Victoria, Learner and probationary driver road rules",
      es: "Transport Victoria, Learner and probationary driver road rules"
    },
    sourceUrl:
      "https://transport.vic.gov.au/road-and-active-transport/road-rules-and-safety/learner-and-probationary-driver-road-rules",
    body: [
      {
        type: "paragraph",
        text: {
          en: "Getting a full Victorian driver's licence is not a single step. Almost every new driver moves through a learner permit, then one or two stages of probationary licence called P1 and P2, before the restrictions come off completely. A lot of general advice about P plates online is written with Australian teenagers in mind, but the rules work differently for many newcomers, since your age when you actually apply for your probationary licence changes how long you spend on each stage. This post goes deep on P1 and P2 specifically: how long each one lasts, how many passengers you can carry, the mobile phone rules, whether Victoria sets a special speed limit for probationary drivers, and which vehicles you are not allowed to drive yet. Everything below comes from Transport Victoria and VicRoads.",
          pt: "Tirar a carteira de motorista completa em Victoria não é um passo único. Quase todo motorista novo passa por uma licença de aprendiz (learner permit), depois um ou dois estágios de licença provisória chamados P1 e P2, antes das restrições acabarem de vez. Muito conselho geral sobre P plates na internet é escrito pensando em adolescentes australianos, mas as regras funcionam diferente para muita gente que chega de fora, já que a sua idade no momento em que você de fato aplica pra licença provisória muda quanto tempo você passa em cada estágio. Este post vai fundo especificamente no P1 e no P2: quanto tempo cada um dura, quantos passageiros você pode levar, as regras de celular, se Victoria tem um limite de velocidade especial para motoristas provisórios, e quais veículos você ainda não pode dirigir. Tudo abaixo vem da Transport Victoria e da VicRoads.",
          es: "Sacar la licencia de conducir completa en Victoria no es un solo paso. Casi todo conductor nuevo pasa por un permiso de aprendiz (learner permit), luego una o dos etapas de licencia provisional llamadas P1 y P2, antes de que las restricciones desaparezcan por completo. Mucho consejo general sobre P plates en internet está escrito pensando en adolescentes australianos, pero las reglas funcionan distinto para mucha gente que recién llega, ya que tu edad en el momento en que realmente solicitas la licencia provisional cambia cuánto tiempo pasas en cada etapa. Este post va a fondo específicamente en el P1 y el P2: cuánto tiempo dura cada uno, cuántos pasajeros puedes llevar, las reglas de celular, si Victoria tiene un límite de velocidad especial para conductores provisionales, y qué vehículos todavía no puedes conducir. Todo lo de abajo viene de Transport Victoria y de VicRoads."
        }
      },
      {
        type: "heading",
        text: {
          en: "How long you stay on P1 and P2",
          pt: "Quanto tempo você fica no P1 e no P2",
          es: "Cuánto tiempo estás en P1 y en P2"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Your age when you actually get your probationary licence decides which path you are on, not just how well you drive. Before you can even apply, you need to be at least 18 years old and have held your car learner permit for a minimum continuous period that gets shorter as you get older.",
          pt: "A sua idade no momento em que você realmente recebe a licença provisória decide qual caminho você segue, não só o quanto você dirige bem. Antes mesmo de poder aplicar, você precisa ter pelo menos 18 anos e ter tido a licença de aprendiz (learner permit) por um período mínimo contínuo que fica mais curto quanto mais velho você é.",
          es: "Tu edad en el momento en que realmente recibes la licencia provisional decide qué camino sigues, no solo qué tan bien manejas. Antes de poder siquiera solicitarla, necesitas tener al menos 18 años y haber tenido el permiso de aprendiz (learner permit) por un período mínimo continuo que se hace más corto según tu edad."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Under 21: hold your learner permit for at least 12 months, then you get a 4 year probationary licence, 12 months on P1 (red plates) followed by 3 years on P2 (green plates).",
            pt: "Menos de 21 anos: fique com a licença de aprendiz por pelo menos 12 meses, depois você recebe uma licença provisória de 4 anos, 12 meses no P1 (placa vermelha) seguidos de 3 anos no P2 (placa verde).",
            es: "Menos de 21 años: mantén tu permiso de aprendiz por al menos 12 meses, luego recibes una licencia provisional de 4 años, 12 meses en P1 (placa roja) seguidos de 3 años en P2 (placa verde)."
          },
          {
            en: "21 to under 25: hold your learner permit for at least 6 months, then you go straight to a P2 licence (green plates) for 3 years. There is no P1 stage at all.",
            pt: "De 21 a menos de 25 anos: fique com a licença de aprendiz por pelo menos 6 meses, depois você vai direto pra uma licença P2 (placa verde) por 3 anos. Não existe estágio de P1 nesse caso.",
            es: "De 21 a menos de 25 años: mantén tu permiso de aprendiz por al menos 6 meses, luego pasas directo a una licencia P2 (placa verde) por 3 años. No existe la etapa P1 en este caso."
          },
          {
            en: "25 or older: hold your learner permit for at least 3 months, then you go straight to a P2 licence (green plates) for 3 years, the same as the 21 to 24 bracket.",
            pt: "25 anos ou mais: fique com a licença de aprendiz por pelo menos 3 meses, depois você vai direto pra uma licença P2 (placa verde) por 3 anos, igual à faixa de 21 a 24.",
            es: "25 años o más: mantén tu permiso de aprendiz por al menos 3 meses, luego pasas directo a una licencia P2 (placa verde) por 3 años, igual que en la franja de 21 a 24."
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "If you are under 21 and move from P1 to P2, you do not sit another test to do it. The Hazard Perception Test and the practical drive test both happen once, before your first probationary licence is issued, not again between P1 and P2.",
          pt: "Se você tem menos de 21 anos e passa do P1 pro P2, não precisa fazer outra prova pra isso. O Hazard Perception Test e a prova prática de direção acontecem uma vez só, antes da sua primeira licença provisória ser emitida, não de novo entre o P1 e o P2.",
          es: "Si tienes menos de 21 años y pasas de P1 a P2, no presentas otro examen para eso. El Hazard Perception Test y el examen práctico de manejo ocurren una sola vez, antes de que te den tu primera licencia provisional, no de nuevo entre P1 y P2."
        }
      },
      {
        type: "heading",
        text: {
          en: "The peer passenger restriction on P1",
          pt: "A restrição de passageiros no P1",
          es: "La restricción de pasajeros en P1"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "On P1 (red plates), you cannot carry more than one passenger aged at least 16 but under 22 at a time. Transport Victoria calls this a peer passenger.",
            pt: "No P1 (placa vermelha), você não pode levar mais de um passageiro que tenha entre 16 e menos de 22 anos por vez. A Transport Victoria chama isso de peer passenger.",
            es: "En P1 (placa roja), no puedes llevar más de un pasajero que tenga entre 16 y menos de 22 años a la vez. Transport Victoria llama a esto peer passenger."
          },
          {
            en: "Your spouse or domestic partner, and your siblings or step siblings, do not count as peer passengers. You can carry them without needing any exemption.",
            pt: "Seu cônjuge ou parceiro, e seus irmãos ou meio-irmãos, não contam como peer passenger. Você pode levar essas pessoas sem precisar de nenhuma isenção.",
            es: "Tu cónyuge o pareja, y tus hermanos o medios hermanos, no cuentan como peer passenger. Puedes llevarlos sin necesitar ninguna excepción."
          },
          {
            en: "This restriction applies to P1 only. It does not apply to P2, and it never applies at all if you go straight to P2 because you were 21 or older when you got your probationary licence.",
            pt: "Essa restrição vale só para o P1. Ela não vale para o P2, e nunca chega a valer se você vai direto pro P2 porque tinha 21 anos ou mais quando recebeu sua licença provisória.",
            es: "Esta restricción aplica solo a P1. No aplica a P2, y nunca llega a aplicar si pasas directo a P2 porque tenías 21 años o más cuando recibiste tu licencia provisional."
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "Transport Victoria is direct about why this rule exists: P plate drivers are four times more likely to be involved in a fatal crash when carrying more than one passenger, and the risk is highest late at night, between 10pm and 6am. There is no legal curfew for P platers in Victoria, but the official advice is to avoid driving during the hours you would normally be asleep, or if you have not slept in the past 18 hours.",
          pt: "A Transport Victoria é direta sobre por que essa regra existe: os P platers têm quatro vezes mais chance de se envolver em um acidente fatal quando levam mais de um passageiro, e o risco é maior tarde da noite, entre 22h e 6h. Não existe toque de recolher legal para P platers em Victoria, mas a orientação oficial é evitar dirigir nos horários em que você normalmente estaria dormindo, ou se você não dormiu nas últimas 18 horas.",
          es: "Transport Victoria es directa sobre por qué existe esta regla: los P platers tienen cuatro veces más probabilidades de estar en un accidente fatal cuando llevan más de un pasajero, y el riesgo es más alto tarde en la noche, entre las 10pm y las 6am. No hay toque de queda legal para los P platers en Victoria, pero la recomendación oficial es evitar manejar en las horas en que normalmente estarías dormido, o si no has dormido en las últimas 18 horas."
        }
      },
      {
        type: "heading",
        text: {
          en: "Speed limits: no special cap for P1 or P2",
          pt: "Limite de velocidade: sem limite especial para P1 ou P2",
          es: "Límite de velocidad: sin límite especial para P1 o P2"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Some Australian states cap the maximum speed a probationary driver can travel at, regardless of the posted limit. Victoria does not do this. Transport Victoria's own list of restrictions for both P1 and P2 does not include a reduced speed limit, so once you are on P plates in Victoria you drive at the same posted speed limit as a fully licensed driver. That does not mean speeding is treated lightly, a clean record on P plates is what unlocks Victoria's free licence scheme, covered further down.",
          pt: "Alguns estados australianos limitam a velocidade máxima que um motorista provisório pode atingir, independente do limite indicado na placa. Victoria não faz isso. A própria lista de restrições da Transport Victoria para P1 e P2 não inclui um limite de velocidade reduzido, então uma vez que você está com placa P em Victoria, você dirige no mesmo limite indicado que vale para um motorista com carteira completa. Isso não quer dizer que excesso de velocidade é levado na brincadeira, um histórico limpo com placa P é o que libera o esquema de licença gratuita de Victoria, tratado mais adiante.",
          es: "Algunos estados australianos limitan la velocidad máxima a la que puede ir un conductor provisional, sin importar el límite indicado en el cartel. Victoria no hace esto. La propia lista de restricciones de Transport Victoria para P1 y P2 no incluye un límite de velocidad reducido, así que una vez que tienes placa P en Victoria, manejas al mismo límite indicado que un conductor con licencia completa. Eso no significa que el exceso de velocidad se tome a la ligera, un historial limpio con placa P es lo que desbloquea el esquema de licencia gratuita de Victoria, que se explica más adelante."
        }
      },
      {
        type: "heading",
        text: {
          en: "Mobile phones and devices: zero use on P1 and P2",
          pt: "Celular e dispositivos: zero uso no P1 e no P2",
          es: "Celular y dispositivos: cero uso en P1 y en P2"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Since 31 March 2023, Victoria has applied one strict rule to every learner, P1 and P2 driver: you cannot operate a portable, wearable, mounted or built in device in any way while driving. That covers phone calls, text messages, navigation apps and controlling music, and it applies whether the phone is in your hand, mounted in a cradle, or connected hands free. Fully licensed drivers get more flexibility with mounted devices. Learners and probationary drivers at either stage do not, and the rule is identical for P1 and P2, it does not loosen when you move from red to green plates.",
          pt: "Desde 31 de março de 2023, Victoria aplica uma regra rígida pra todo motorista learner, P1 e P2: você não pode operar um dispositivo portátil, vestível, montado ou embutido de jeito nenhum enquanto dirige. Isso cobre ligações, mensagens de texto, aplicativos de navegação e controle de música, e vale se o celular está na sua mão, montado em um suporte, ou conectado por bluetooth. Motoristas com carteira completa têm mais flexibilidade com dispositivos montados. Learners e motoristas provisórios em qualquer estágio não têm, e a regra é idêntica para P1 e P2, ela não afrouxa quando você passa da placa vermelha pra verde.",
          es: "Desde el 31 de marzo de 2023, Victoria aplica una regla estricta a todo conductor learner, P1 y P2: no puedes operar un dispositivo portátil, vestible, montado o integrado de ninguna manera mientras manejas. Esto cubre llamadas, mensajes de texto, aplicaciones de navegación y controlar la música, y aplica sin importar si el celular está en tu mano, montado en un soporte, o conectado por bluetooth. Los conductores con licencia completa tienen más flexibilidad con dispositivos montados. Los learners y conductores provisionales en cualquier etapa no la tienen, y la regla es idéntica para P1 y P2, no se afloja cuando pasas de placa roja a verde."
        }
      },
      {
        type: "heading",
        text: {
          en: "High powered vehicles: what you cannot drive on P1 or P2",
          pt: "Veículos de alta potência: o que você não pode dirigir no P1 ou P2",
          es: "Vehículos de alta potencia: qué no puedes conducir en P1 o P2"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Both P1 and P2 drivers are restricted from driving what Victoria calls a probationary prohibited vehicle. A vehicle counts as prohibited if it has a banned rating in the official probationary vehicle database, a power to mass ratio of more than 130 kilowatts per tonne, or an engine that was modified to increase performance after it left the factory. The restriction is the same for P1 and P2, it does not relax when you move to green plates. Before buying or borrowing a car, check the specific model in VicRoads' probationary vehicle database rather than guessing from the number of cylinders or the badge on the back.",
          pt: "Motoristas P1 e P2 são restritos de dirigir o que Victoria chama de veículo proibido para provisórios. Um veículo conta como proibido se tiver classificação de banido no banco de dados oficial de veículos para provisórios, uma relação de potência por massa de mais de 130 quilowatts por tonelada, ou um motor que foi modificado para aumentar o desempenho depois de sair de fábrica. A restrição é a mesma para P1 e P2, ela não afrouxa quando você passa pra placa verde. Antes de comprar ou pegar um carro emprestado, confira o modelo específico no banco de dados de veículos para provisórios da VicRoads, em vez de tentar adivinhar pelo número de cilindros ou pelo nome no porta-malas.",
          es: "Tanto los conductores P1 como P2 tienen restringido conducir lo que Victoria llama un vehículo prohibido para provisionales. Un vehículo cuenta como prohibido si tiene una clasificación de baneado en la base de datos oficial de vehículos para provisionales, una relación de potencia a masa de más de 130 kilovatios por tonelada, o un motor que fue modificado para aumentar el rendimiento después de salir de fábrica. La restricción es la misma para P1 y P2, no se relaja cuando pasas a placa verde. Antes de comprar o pedir prestado un auto, revisa el modelo específico en la base de datos de vehículos para provisionales de VicRoads, en vez de adivinar por el número de cilindros o el logo de atrás."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "A supervising driver with a full licence is sitting beside you.",
            pt: "Um motorista supervisor com carteira completa está sentado ao seu lado.",
            es: "Un conductor supervisor con licencia completa está sentado a tu lado."
          },
          {
            en: "You are driving the vehicle for your job at your employer's request, or for a business you run under an active ABN.",
            pt: "Você está dirigindo o veículo pro seu trabalho, a pedido do seu empregador, ou pra um negócio que você administra com um ABN ativo.",
            es: "Estás manejando el vehículo para tu trabajo, a pedido de tu empleador, o para un negocio que administras con un ABN activo."
          },
          {
            en: "You are learning to drive a heavy vehicle with a full licence holder sitting beside you.",
            pt: "Você está aprendendo a dirigir um veículo pesado com um motorista de carteira completa sentado ao seu lado.",
            es: "Estás aprendiendo a manejar un vehículo pesado con un conductor con licencia completa sentado a tu lado."
          },
          {
            en: "VicRoads has granted you a written exemption, applied for in advance with supporting documents, for education, employment or another serious hardship reason.",
            pt: "A VicRoads te concedeu uma isenção por escrito, pedida com antecedência e com documentos que comprovem a situação, por motivo de educação, emprego ou outra dificuldade séria.",
            es: "VicRoads te otorgó una excepción por escrito, solicitada con anticipación y con documentos que comprueben la situación, por motivo de educación, empleo u otra dificultad grave."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "The reward for a clean record",
          pt: "A recompensa por um histórico limpo",
          es: "La recompensa por un historial limpio"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Victoria is one of the few states that pays new drivers back for a clean record. If you finish your probationary period with no traffic related offences at all, and you will be under 25 when your probationary licence expires, VicRoads may offer you a free three year licence renewal when you move to your full licence, instead of the usual renewal fee. Check the free licence scheme on transport.vic.gov.au for the full eligibility list, since it covers a long list of offence categories, not just speeding or drink driving.",
          pt: "Victoria é um dos poucos estados que recompensa quem tem um histórico limpo. Se você termina o seu período provisório sem nenhuma infração de trânsito, e você vai ter menos de 25 anos quando sua licença provisória vencer, a VicRoads pode te oferecer uma renovação de licença gratuita de três anos quando você passar pra carteira completa, em vez da taxa de renovação normal. Confira o esquema de licença gratuita em transport.vic.gov.au pra ver a lista completa de critérios, já que ela cobre uma lista longa de categorias de infração, não só excesso de velocidade ou dirigir alcoolizado.",
          es: "Victoria es uno de los pocos estados que recompensa a los conductores nuevos por tener un historial limpio. Si terminas tu período provisional sin ninguna infracción de tránsito, y vas a tener menos de 25 años cuando venza tu licencia provisional, VicRoads puede ofrecerte una renovación de licencia gratuita de tres años cuando pases a tu licencia completa, en vez de la tarifa de renovación habitual. Revisa el esquema de licencia gratuita en transport.vic.gov.au para ver la lista completa de criterios, ya que cubre una larga lista de categorías de infracción, no solo exceso de velocidad o manejar alcoholizado."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "None of this replaces knowing Victoria's actual road rules for the test itself. Use KangaLearner's Learn section and VIC practice questions to prepare for the content of the test, and check transport.vic.gov.au or contact VicRoads directly to confirm any figure on this page before you rely on it, since road rules and thresholds like the 130 kilowatt per tonne limit are reviewed periodically.",
          pt: "Nada disso substitui conhecer as regras de trânsito de verdade de Victoria para a prova em si. Use a seção Aprender e as perguntas de prática de VIC do KangaLearner para se preparar para o conteúdo da prova, e confira transport.vic.gov.au ou contate a VicRoads diretamente para confirmar qualquer número desta página antes de confiar nele, já que regras de trânsito e limites como o de 130 quilowatts por tonelada são revisados periodicamente.",
          es: "Nada de esto reemplaza conocer las reglas de tránsito reales de Victoria para el examen en sí. Usa la sección Aprender y las preguntas de práctica de VIC de KangaLearner para prepararte para el contenido del examen, y revisa transport.vic.gov.au o contacta a VicRoads directamente para confirmar cualquier número de esta página antes de confiar en él, ya que las reglas de tránsito y límites como el de 130 kilovatios por tonelada se revisan periódicamente."
        }
      }
    ]
  },
  {
    slug: "vic-roundabouts-give-way-guide",
    icon: "safety",
    state: "VIC",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 6,
    title: {
      en: "Roundabouts in Victoria: give way, lane choice and cyclists explained",
      pt: "Rotatórias em Victoria: ceder passagem, escolha de faixa e ciclistas explicados",
      es: "Rotondas en Victoria: ceder el paso, elección de carril y ciclistas explicados"
    },
    excerpt: {
      en: "Victoria's official guidance covers the basics of roundabouts, already summarised in our overview. This post goes further: how to pick a lane on a multi-lane roundabout, exactly when to indicate, where cyclists are legally allowed to ride, and the mistakes newcomers make most often.",
      pt: "A orientação oficial de Victoria cobre o básico das rotatórias, já resumido no nosso guia geral. Este post vai além: como escolher a faixa numa rotatória de várias faixas, exatamente quando usar a seta, onde os ciclistas têm o direito de andar, e os erros que quem chega de fora mais comete.",
      es: "La orientación oficial de Victoria cubre lo básico de las rotondas, ya resumido en nuestra guía general. Este artículo va más allá: cómo elegir el carril en una rotonda de varios carriles, exactamente cuándo usar el intermitente, dónde los ciclistas tienen derecho a circular, y los errores que los recién llegados cometen con más frecuencia."
    },
    sourceLabel: {
      en: "Transport Victoria, Roundabouts",
      pt: "Transport Victoria, Roundabouts",
      es: "Transport Victoria, Roundabouts"
    },
    sourceUrl:
      "https://transport.vic.gov.au/road-and-active-transport/road-rules-and-safety/roundabouts",
    body: [
      {
        type: "paragraph",
        text: {
          en: "KangaLearner's guide to driving in Victoria already covers the basics of roundabouts: give way to vehicles already on them, give way to trams too, and there is no legal duty to give way to pedestrians unless there is a marked crossing. This post goes deeper into roundabouts specifically, based on Transport Victoria's own Roundabouts page and its learner driver resources. It covers what that overview does not: how to choose a lane on a multi-lane roundabout, exactly when to indicate and when not to, where cyclists are legally allowed to ride, and the mistakes newcomers make most often once they are actually navigating one.",
          pt: "O guia do KangaLearner sobre dirigir em Victoria já cobre o básico das rotatórias: dar passagem para quem já está nelas, dar passagem também para os bondes, e que não existe obrigação legal de dar passagem para pedestres a não ser que haja uma faixa de pedestre marcada. Este post vai mais fundo especificamente nas rotatórias, com base na própria página Roundabouts da Transport Victoria e em seus recursos para aprendizes. Ele cobre o que aquele resumo não cobre: como escolher a faixa numa rotatória de várias faixas, exatamente quando usar a seta e quando não usar, onde os ciclistas têm o direito de andar, e os erros que quem chega de fora mais comete na hora de atravessar uma de verdade.",
          es: "La guía de KangaLearner sobre conducir en Victoria ya cubre lo básico de las rotondas: ceder el paso a los vehículos que ya están en ellas, ceder el paso también a los tranvías, y que no existe obligación legal de ceder el paso a los peatones a menos que haya un cruce peatonal marcado. Este artículo va más a fondo específicamente en las rotondas, basado en la propia página Roundabouts de Transport Victoria y en sus recursos para conductores principiantes. Cubre lo que ese resumen no cubre: cómo elegir el carril en una rotonda de varios carriles, exactamente cuándo usar el intermitente y cuándo no, dónde los ciclistas tienen derecho a circular, y los errores que los recién llegados cometen con más frecuencia al cruzar una de verdad."
        }
      },
      {
        type: "heading",
        text: {
          en: "Give way to what is already there, not just to the right",
          pt: "Dê passagem para quem já está lá, não só para a direita",
          es: "Cede el paso a quien ya está ahí, no solo a la derecha"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "The rule at a Victorian roundabout is to give way to any vehicle already in the roundabout, no matter where it came from. It usually feels like give way to the right, because Australian roundabouts flow clockwise and most vehicles you need to give way to will be approaching from your right. But that is a side effect of the layout, not the actual rule. At a roundabout with three, four or five entry points, a vehicle can already be circulating in front of you after entering from an arm that is not directly to your right, and you still have to give way to it. Judge every vehicle already on the roundabout on its own merits, instead of only checking your right shoulder.",
          pt: "A regra numa rotatória de Victoria é dar passagem para qualquer veículo que já esteja na rotatória, não importa de onde ele veio. Costuma parecer que é só dar passagem pra direita, porque as rotatórias australianas giram no sentido horário e a maioria dos veículos aos quais você precisa dar passagem estará vindo da sua direita. Mas isso é um efeito colateral do formato, não a regra em si. Numa rotatória com três, quatro ou cinco entradas, um veículo pode já estar circulando na sua frente depois de ter entrado por um braço que não fica direto à sua direita, e você ainda precisa dar passagem pra ele. Avalie cada veículo que já está na rotatória por conta própria, em vez de só olhar por cima do ombro direito.",
          es: "La regla en una rotonda de Victoria es ceder el paso a cualquier vehículo que ya esté en la rotonda, sin importar de dónde haya venido. Suele sentirse como ceder el paso a la derecha, porque las rotondas australianas giran en sentido horario y la mayoría de los vehículos a los que debes ceder el paso vendrán desde tu derecha. Pero eso es un efecto secundario del diseño, no la regla real. En una rotonda con tres, cuatro o cinco entradas, un vehículo puede estar circulando ya frente a ti después de haber entrado por un brazo que no queda directamente a tu derecha, y aun así debes cederle el paso. Evalúa cada vehículo que ya esté en la rotonda por separado, en lugar de mirar solo por encima de tu hombro derecho."
        }
      },
      {
        type: "heading",
        text: {
          en: "Choosing the right lane on a multi-lane roundabout",
          pt: "Escolhendo a faixa certa numa rotatória de várias faixas",
          es: "Cómo elegir el carril correcto en una rotonda de varios carriles"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Turning left: approach in the left lane and stay in it all the way around. Indicate left as you approach, and keep indicating left until you have fully exited.",
            pt: "Virando à esquerda: aproxime-se pela faixa da esquerda e fique nela até completar a curva. Sinalize à esquerda ao se aproximar, e mantenha a seta ligada até sair completamente.",
            es: "Girar a la izquierda: acércate por el carril izquierdo y quédate en él durante todo el recorrido. Indica a la izquierda al acercarte, y mantén el intermitente puesto hasta salir por completo."
          },
          {
            en: "Turning right: approach in the right lane and stay in it all the way around. Indicate right as you approach, and if you can, switch to the left indicator just before your exit. Keep indicating until you have fully exited.",
            pt: "Virando à direita: aproxime-se pela faixa da direita e fique nela até completar a curva. Sinalize à direita ao se aproximar, e se conseguir, troque para a seta da esquerda pouco antes da sua saída. Mantenha a seta ligada até sair completamente.",
            es: "Girar a la derecha: acércate por el carril derecho y quédate en él durante todo el recorrido. Indica a la derecha al acercarte, y si puedes, cambia al intermitente izquierdo justo antes de tu salida. Mantén el intermitente puesto hasta salir por completo."
          },
          {
            en: "Going straight ahead: you can approach from either lane, unless road markings show one lane is for turning left or right only. Stay in the same lane all the way through. Do not indicate as you approach, but if you can, signal left just before your exit.",
            pt: "Seguindo em frente: você pode se aproximar por qualquer uma das faixas, a não ser que a sinalização no chão mostre que uma faixa é só para virar à esquerda ou à direita. Fique na mesma faixa do início ao fim. Não sinalize ao se aproximar, mas, se conseguir, ligue a seta da esquerda pouco antes da sua saída.",
            es: "Seguir de frente: puedes acercarte por cualquiera de los carriles, a menos que las marcas en el pavimento muestren que un carril es solo para girar a la izquierda o a la derecha. Quédate en el mismo carril de principio a fin. No indiques al acercarte, pero si puedes, activa el intermitente izquierdo justo antes de tu salida."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "The exit signal almost everyone forgets",
          pt: "A seta de saída que quase todo mundo esquece",
          es: "El intermitente de salida que casi todos olvidan"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Two of the three lane rules above end with the same instruction: signal left just before you leave, if you can. This is the step most newcomers skip entirely, since a lot of countries do not require it, or only expect it on a normal street corner, not partway around a circular intersection. Skipping it does not just cost you marks on a driving test, it also removes the one clue that tells a driver waiting to enter, or a tram approaching behind you, that you are actually about to leave rather than continuing around. Build the habit of checking your exit early: as you pass the exit before yours, flick the indicator to the left and hold it until you are clear of the roundabout.",
          pt: "Duas das três regras de faixa acima terminam com a mesma instrução: sinalize à esquerda pouco antes de sair, se conseguir. Essa é a etapa que quem chega de fora mais pula, já que muitos países não exigem isso, ou só esperam isso numa esquina normal, não no meio de um cruzamento circular. Pular esse passo não custa só pontos numa prova de direção, também tira a única pista que avisa um motorista esperando para entrar, ou um bonde se aproximando atrás de você, que você está mesmo prestes a sair, e não continuando a dar a volta. Crie o hábito de já se preparar pra sua saída com antecedência: ao passar pela saída antes da sua, ligue a seta da esquerda e mantenha até estar livre da rotatória.",
          es: "Dos de las tres reglas de carril de arriba terminan con la misma instrucción: indica a la izquierda justo antes de salir, si puedes. Este es el paso que más se saltan los recién llegados, ya que muchos países no lo exigen, o solo lo esperan en una esquina normal, no a mitad de una intersección circular. Saltarte este paso no solo te cuesta puntos en un examen de manejo, también le quita a un conductor que espera para entrar, o a un tranvía que se acerca detrás de ti, la única señal de que en verdad estás por salir y no siguiendo la vuelta. Crea el hábito de prepararte para tu salida con anticipación: al pasar la salida antes de la tuya, activa el intermitente izquierdo y mantenlo hasta quedar libre de la rotonda."
        }
      },
      {
        type: "heading",
        text: {
          en: "Cyclists have their own rules in a multi-lane roundabout",
          pt: "Ciclistas têm regras próprias numa rotatória de várias faixas",
          es: "Los ciclistas tienen sus propias reglas en una rotonda de varios carriles"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "A cyclist is legally allowed to stay in the left lane of a multi-lane roundabout for the entire trip through it, even when they are going straight ahead or turning right, which is exactly where the car rules above would put you in the right lane instead. The same applies to electric scooter riders. The trade-off is that the cyclist must give way to any vehicle exiting the roundabout as they pass each exit point on their way around. If the roundabout has a marked bike lane, cyclists must use it unless it is not practical to do so.",
          pt: "Um ciclista tem o direito legal de ficar na faixa da esquerda durante toda a passagem por uma rotatória de várias faixas, mesmo indo em frente ou virando à direita, exatamente onde as regras de carro acima colocariam você na faixa da direita. O mesmo vale para quem anda de patinete elétrico. A contrapartida é que o ciclista precisa dar passagem para qualquer veículo saindo da rotatória, a cada saída que ele passa no caminho. Se a rotatória tiver uma faixa de bicicleta marcada, os ciclistas precisam usá-la, a não ser que não seja viável.",
          es: "Un ciclista tiene derecho legal a quedarse en el carril izquierdo durante todo el trayecto por una rotonda de varios carriles, incluso yendo de frente o girando a la derecha, justo donde las reglas para autos de arriba te pondrían en el carril derecho. Lo mismo aplica a quien anda en scooter eléctrico. La contrapartida es que el ciclista debe ceder el paso a cualquier vehículo que salga de la rotonda, en cada salida por la que pasa en su recorrido. Si la rotonda tiene un carril para bicicletas marcado, los ciclistas deben usarlo, a menos que no sea práctico hacerlo."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Do not assume a cyclist sitting in the left lane is about to turn left. They may be going straight ahead or even turning right from that lane, and are entitled to be there.",
            pt: "Não presuma que um ciclista na faixa da esquerda está prestes a virar à esquerda. Ele pode estar indo em frente ou até virando à direita a partir dessa faixa, e tem o direito de estar ali.",
            es: "No supongas que un ciclista en el carril izquierdo está a punto de girar a la izquierda. Puede estar yendo de frente o incluso girando a la derecha desde ese carril, y tiene derecho a estar ahí."
          },
          {
            en: "Victoria's own learner driver resources warn that bike riders and motorcyclists can be hard to see inside a roundabout. A shoulder check before you exit matters more here than at a regular intersection.",
            pt: "Os próprios recursos para aprendizes de Victoria avisam que ciclistas e motociclistas podem ser difíceis de enxergar dentro de uma rotatória. Um olhar por cima do ombro antes de sair importa mais aqui do que num cruzamento comum.",
            es: "Los propios recursos para conductores principiantes de Victoria advierten que los ciclistas y motociclistas pueden ser difíciles de ver dentro de una rotonda. Mirar por encima del hombro antes de salir importa más aquí que en una intersección común."
          },
          {
            en: "The same minimum passing distance applies inside a roundabout as anywhere else: at least 1 metre at speeds up to 60 km/h, and 1.5 metres above that. A roundabout tightens your available space, it does not cancel this rule.",
            pt: "A mesma distância mínima de ultrapassagem vale dentro de uma rotatória como em qualquer outro lugar: pelo menos 1 metro em velocidades de até 60 km/h, e 1,5 metro acima disso. Uma rotatória reduz o espaço disponível, ela não cancela essa regra.",
            es: "La misma distancia mínima de adelantamiento aplica dentro de una rotonda como en cualquier otro lugar: al menos 1 metro a velocidades de hasta 60 km/h, y 1,5 metros por encima de eso. Una rotonda reduce el espacio disponible, no cancela esta regla."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Mistakes that show up again and again",
          pt: "Erros que aparecem repetidas vezes",
          es: "Errores que aparecen una y otra vez"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Reading every roundabout as give way to the right and missing a vehicle that entered from a different arm and is now circulating in front of you.",
            pt: "Interpretar toda rotatória como dar passagem pra direita e não perceber um veículo que entrou por outro braço e já está circulando na sua frente.",
            es: "Interpretar cada rotonda como ceder el paso a la derecha y no notar un vehículo que entró por otro brazo y ya está circulando frente a ti."
          },
          {
            en: "Entering in the wrong lane for your exit, then trying to cross lanes once you are already inside the roundabout.",
            pt: "Entrar na faixa errada pra sua saída, e tentar cruzar de faixa já dentro da rotatória.",
            es: "Entrar en el carril equivocado para tu salida, y tratar de cambiar de carril ya dentro de la rotonda."
          },
          {
            en: "Forgetting the left indicator before exiting, especially after turning right or going straight ahead, where it is easy to assume the job is already done.",
            pt: "Esquecer a seta da esquerda antes de sair, principalmente depois de virar à direita ou seguir em frente, quando é fácil achar que a sinalização já terminou.",
            es: "Olvidar el intermitente izquierdo antes de salir, sobre todo después de girar a la derecha o seguir de frente, cuando es fácil pensar que la señalización ya terminó."
          },
          {
            en: "Assuming a cyclist holding the left lane through a multi-lane roundabout must be turning left, when they may legally be going straight ahead or turning right from there.",
            pt: "Presumir que um ciclista mantendo a faixa da esquerda numa rotatória de várias faixas precisa estar virando à esquerda, quando ele pode legalmente estar indo em frente ou virando à direita a partir dali.",
            es: "Suponer que un ciclista que mantiene el carril izquierdo en una rotonda de varios carriles tiene que estar girando a la izquierda, cuando legalmente puede estar yendo de frente o girando a la derecha desde ahí."
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "This post is based on Transport Victoria's own Roundabouts page and the roundabout guidance published on mylearners.vic.gov.au, the state's official learner driver resource. Use KangaLearner's Learn section and VIC practice questions to prepare for the actual test content.",
          pt: "Este post é baseado na própria página Roundabouts da Transport Victoria e na orientação sobre rotatórias publicada em mylearners.vic.gov.au, o recurso oficial do estado para aprendizes. Use a seção Aprender e as perguntas de prática de VIC do KangaLearner para se preparar para o conteúdo da prova em si.",
          es: "Este artículo está basado en la propia página Roundabouts de Transport Victoria y en la orientación sobre rotondas publicada en mylearners.vic.gov.au, el recurso oficial del estado para conductores principiantes. Usa la sección Aprender y las preguntas de práctica de VIC de KangaLearner para prepararte para el contenido real del examen."
        }
      }
    ]
  },
  {
    slug: "vic-school-zones-speed-limits-guide",
    icon: "safety",
    state: "VIC",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "School zones and speed limits in Victoria: how the rules actually work",
      pt: "Zonas escolares e limites de velocidade em Victoria: como as regras funcionam de verdade",
      es: "Zonas escolares y límites de velocidad en Victoria: cómo funcionan realmente las reglas"
    },
    excerpt: {
      en: "Victoria runs ten different speed zones, not just two. Here is exactly how school zone times work, how to work out the limit when there is no sign, and what happens if a camera catches you speeding.",
      pt: "Victoria tem dez zonas de velocidade diferentes, não só duas. Veja exatamente como funcionam os horários de zona escolar, como descobrir o limite quando não há placa, e o que acontece se uma câmera flagrar você acima da velocidade.",
      es: "Victoria tiene diez zonas de velocidad distintas, no solo dos. Esto es exactamente cómo funcionan los horarios de zona escolar, cómo calcular el límite cuando no hay señal, y qué pasa si una cámara te registra por exceso de velocidad."
    },
    sourceLabel: {
      en: "Transport Victoria, School zones",
      pt: "Transport Victoria, School zones",
      es: "Transport Victoria, School zones"
    },
    sourceUrl:
      "https://transport.vic.gov.au/road-and-active-transport/road-rules-and-safety/school-zones",
    body: [
      {
        type: "paragraph",
        text: {
          en: "Victoria's speed limits are not simply 50 km/h in the city and 100 km/h in the country. The state actually runs ten different speed zones, school zones come in three different speed tiers depending on the road, and the rule for working out the limit on an unsigned road is written into law with a precise technical test, not a guess. This post goes deep into all of it: the full speed zone system, how to legally work out the limit when there is no sign, exactly how school zone times work, and what happens if a camera catches you speeding.",
          pt: "Os limites de velocidade de Victoria não são simplesmente 50 km/h na cidade e 100 km/h no interior. O estado na verdade tem dez zonas de velocidade diferentes, as zonas escolares vêm em três faixas de velocidade diferentes dependendo da via, e a regra para descobrir o limite numa via sem placa está escrita na lei com um teste técnico preciso, não um chute. Este post vai fundo em tudo isso: o sistema completo de zonas de velocidade, como descobrir legalmente o limite quando não há placa, exatamente como funcionam os horários de zona escolar, e o que acontece se uma câmera flagrar você acima da velocidade.",
          es: "Los límites de velocidad de Victoria no son simplemente 50 km/h en la ciudad y 100 km/h en el campo. El estado en realidad tiene diez zonas de velocidad distintas, las zonas escolares vienen en tres niveles de velocidad diferentes según la vía, y la regla para calcular el límite en una vía sin señal está escrita en la ley con una prueba técnica precisa, no una suposición. Este artículo profundiza en todo esto: el sistema completo de zonas de velocidad, cómo calcular legalmente el límite cuando no hay señal, exactamente cómo funcionan los horarios de zona escolar, y qué pasa si una cámara te registra por exceso de velocidad."
        }
      },
      {
        type: "heading",
        text: {
          en: "Victoria's full speed zone system",
          pt: "O sistema completo de zonas de velocidade de Victoria",
          es: "El sistema completo de zonas de velocidad de Victoria"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "10 km/h and 20 km/h: shared zones, car parks and similar spaces where people on foot and vehicles mix directly.",
            pt: "10 km/h e 20 km/h: zonas compartilhadas, estacionamentos e espaços parecidos onde pedestres e veículos se misturam diretamente.",
            es: "10 km/h y 20 km/h: zonas compartidas, estacionamientos y espacios similares donde los peatones y los vehículos se mezclan directamente."
          },
          {
            en: "30 km/h: streets with heavy pedestrian and cyclist activity, including some school zones and high pedestrian activity areas.",
            pt: "30 km/h: ruas com bastante movimento de pedestres e ciclistas, incluindo algumas zonas escolares e áreas de alta atividade de pedestres.",
            es: "30 km/h: calles con mucha actividad de peatones y ciclistas, incluyendo algunas zonas escolares y áreas de alta actividad peatonal."
          },
          {
            en: "40 km/h: activity centres, shopping precincts, school zones, and local streets in built-up areas.",
            pt: "40 km/h: centros de atividade, áreas de comércio, zonas escolares, e ruas locais em áreas urbanizadas.",
            es: "40 km/h: centros de actividad, zonas comerciales, zonas escolares, y calles locales en áreas urbanizadas."
          },
          {
            en: "50 km/h: the default for built-up area streets, plus busier urban roads with direct property access, parking or trams.",
            pt: "50 km/h: o padrão para ruas de áreas urbanizadas, além de vias urbanas mais movimentadas com acesso direto a propriedades, estacionamento ou bondes.",
            es: "50 km/h: el valor por defecto para calles de áreas urbanizadas, además de vías urbanas más transitadas con acceso directo a propiedades, estacionamiento o tranvías."
          },
          {
            en: "60 to 80 km/h: higher movement arterial roads, both urban and rural, depending on crash history and how many access points they have.",
            pt: "60 a 80 km/h: vias arteriais de maior movimento, tanto urbanas quanto rurais, dependendo do histórico de acidentes e de quantos pontos de acesso elas têm.",
            es: "60 a 80 km/h: vías arteriales de mayor movimiento, tanto urbanas como rurales, según el historial de accidentes y cuántos puntos de acceso tienen."
          },
          {
            en: "100 km/h: the default for country roads, plus freeways and highways with no elevated crash risk.",
            pt: "100 km/h: o padrão para estradas rurais, além de rodovias e autoestradas sem risco elevado de acidentes.",
            es: "100 km/h: el valor por defecto para caminos rurales, además de autopistas y carreteras sin riesgo elevado de accidentes."
          },
          {
            en: "110 km/h: the highest standard speed zone in Victoria, used only on freeways and tollways outside built-up areas built for higher speeds.",
            pt: "110 km/h: a zona de velocidade padrão mais alta de Victoria, usada só em rodovias e vias com pedágio fora de áreas urbanizadas, construídas para velocidades mais altas.",
            es: "110 km/h: la zona de velocidad estándar más alta de Victoria, usada solo en autopistas y vías con peaje fuera de áreas urbanizadas, construidas para velocidades más altas."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Working out the limit when there is no sign",
          pt: "Como descobrir o limite quando não há placa",
          es: "Cómo calcular el límite cuando no hay señal"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Victoria's road rules do not leave the unsigned case to guesswork. If there is no speed limit sign and the road is not a speed-limited or shared zone, the default limit applies: 50 km/h in a built-up area, 100 km/h everywhere else. The law also defines exactly what counts as built-up, so you do not have to rely on a feeling. An area counts as built-up if, for at least 500 metres of that road, or the whole road if it is shorter, either the buildings next to the road are spaced no more than 100 metres apart, or the street lights are spaced no more than 100 metres apart. In practice, if you are driving through a suburb, town or city street with houses, shops or street lighting close together, treat it as 50 km/h unless a sign says otherwise. Once the buildings and street lights thin out, you have left the built-up area, and the country default of 100 km/h applies instead, again unless a sign says otherwise.",
          pt: "As regras de trânsito de Victoria não deixam o caso sem placa no chute. Se não há placa de limite de velocidade e a via não é uma zona de velocidade limitada ou zona compartilhada, vale o limite padrão: 50 km/h em área urbanizada, 100 km/h em qualquer outro lugar. A lei também define exatamente o que conta como área urbanizada, então você não precisa confiar só na impressão. Uma área conta como urbanizada se, por pelo menos 500 metros dessa via, ou a via inteira se ela for mais curta que isso, as construções ao lado da via ficam a no máximo 100 metros umas das outras, ou a iluminação pública fica a no máximo 100 metros de distância. Na prática, se você está passando por um subúrbio, cidade ou rua urbana com casas, lojas ou iluminação pública próximas umas das outras, trate como 50 km/h a não ser que uma placa diga outra coisa. Quando as construções e a iluminação pública ficam mais espaçadas, você saiu da área urbanizada, e passa a valer o padrão de 100 km/h do interior, de novo a não ser que uma placa diga outra coisa.",
          es: "Las reglas de tránsito de Victoria no dejan el caso sin señal a la suerte. Si no hay señal de límite de velocidad y la vía no es una zona de velocidad limitada ni una zona compartida, se aplica el límite por defecto: 50 km/h en un área urbanizada, 100 km/h en cualquier otro lugar. La ley también define exactamente qué cuenta como área urbanizada, así que no tienes que confiar solo en una impresión. Un área cuenta como urbanizada si, durante al menos 500 metros de esa vía, o toda la vía si es más corta que eso, los edificios junto a la vía están separados por no más de 100 metros entre sí, o el alumbrado público está separado por no más de 100 metros. En la práctica, si estás pasando por un suburbio, pueblo o calle de ciudad con casas, tiendas o alumbrado público cercanos entre sí, trátalo como 50 km/h a menos que una señal diga lo contrario. Cuando los edificios y el alumbrado público se vuelven más espaciados, saliste del área urbanizada, y pasa a aplicar el valor por defecto de 100 km/h del campo, de nuevo a menos que una señal diga lo contrario."
        }
      },
      {
        type: "heading",
        text: {
          en: "School zones: how the times actually work",
          pt: "Zonas escolares: como os horários funcionam de verdade",
          es: "Zonas escolares: cómo funcionan realmente los horarios"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "A school zone is not always the 40 km/h you might expect. The signed limit depends on the road: 30 km/h applies in active-travel precincts and some local streets next to a school with limited safety infrastructure, 40 km/h applies on arterial roads and local streets next to a school and wherever children cross the road, and 60 km/h applies on rural roads with no school or pedestrian crossing, where the ordinary speed limit is already 80 km/h or higher. The actual limit and the times it applies are always shown on the sign itself, so check it rather than assuming, and watch for the advance warning sign before you reach the zone, it gives you room to slow down before the reduced limit actually starts.",
          pt: "Uma zona escolar nem sempre é 40 km/h como você pode esperar. O limite indicado na placa depende da via: 30 km/h vale em áreas de deslocamento ativo e algumas ruas locais perto de uma escola com infraestrutura de segurança limitada, 40 km/h vale em vias arteriais e ruas locais perto de uma escola e em qualquer lugar onde crianças atravessam a via, e 60 km/h vale em estradas rurais sem travessia escolar ou de pedestres, onde o limite normal já é de 80 km/h ou mais. O limite exato e os horários em que ele vale sempre aparecem na própria placa, então confira em vez de supor, e fique atento à placa de aviso antecipado antes de chegar na zona, ela dá espaço para você reduzir a velocidade antes do limite reduzido realmente começar.",
          es: "Una zona escolar no siempre es 40 km/h como podrías esperar. El límite señalizado depende de la vía: 30 km/h aplica en zonas de desplazamiento activo y algunas calles locales cerca de una escuela con infraestructura de seguridad limitada, 40 km/h aplica en vías arteriales y calles locales cerca de una escuela y en cualquier lugar donde los niños cruzan la vía, y 60 km/h aplica en caminos rurales sin cruce escolar ni peatonal, donde el límite normal ya es de 80 km/h o más. El límite exacto y los horarios en que aplica siempre aparecen en la propia señal, así que revísala en vez de suponer, y presta atención a la señal de advertencia anticipada antes de llegar a la zona, te da espacio para reducir la velocidad antes de que el límite reducido realmente comience."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Time-based zones: these operate on weekdays during Victorian school terms, from 8am to 9.30am and from 2.30pm to 4pm, and they switch off on public holidays and during school holidays.",
            pt: "Zonas com horário definido: funcionam em dias de semana durante os períodos letivos de Victoria, das 8h às 9h30 e das 14h30 às 16h, e ficam desligadas em feriados e nas férias escolares.",
            es: "Zonas con horario definido: funcionan los días de semana durante los períodos lectivos de Victoria, de 8:00 a 9:30am y de 2:30 a 4:00pm, y no se aplican en feriados ni durante las vacaciones escolares."
          },
          {
            en: "Permanent zones: the signed limit applies at all times, not just during school zone hours.",
            pt: "Zonas permanentes: o limite indicado na placa vale o tempo todo, não só nos horários de zona escolar.",
            es: "Zonas permanentes: el límite señalizado se aplica todo el tiempo, no solo durante los horarios de zona escolar."
          },
          {
            en: "Variable electronic signs: used on busier roads, the displayed limit changes with the time of day and traffic conditions, and whatever number is shown at that moment is the limit you must follow.",
            pt: "Placas eletrônicas variáveis: usadas em vias mais movimentadas, o limite exibido muda de acordo com o horário e as condições do trânsito, e o número mostrado naquele momento é o limite que você precisa seguir.",
            es: "Señales electrónicas variables: usadas en vías más transitadas, el límite mostrado cambia según la hora y las condiciones del tránsito, y el número que aparece en ese momento es el límite que debes seguir."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "If you are caught speeding",
          pt: "Se você for flagrado no excesso de velocidade",
          es: "Si te registran por exceso de velocidad"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Victoria enforces speed limits, including inside school zones, with a mix of fixed and mobile cameras as part of its road safety camera program. The fine depends on how far over the actual posted or default limit you were: Victoria's published fine table does not list a separate, higher penalty just for speeding in a school zone. But because a school zone limit is often 30 or 40 km/h, driving only a little faster than you would on an ordinary street can already put you well into a higher fine band.",
          pt: "Victoria fiscaliza os limites de velocidade, inclusive dentro de zonas escolares, com uma combinação de câmeras fixas e móveis, como parte do programa de câmeras de segurança viária do estado. A multa depende de quantos km/h você estava acima do limite indicado ou padrão: a tabela de multas publicada pela Victoria não traz uma penalidade separada e mais alta só por excesso de velocidade em zona escolar. Mas como o limite de uma zona escolar costuma ser 30 ou 40 km/h, dirigir só um pouco mais rápido do que você dirigiria numa rua comum já pode te colocar numa faixa de multa bem mais alta.",
          es: "Victoria hace cumplir los límites de velocidad, incluso dentro de las zonas escolares, con una combinación de cámaras fijas y móviles como parte de su programa de cámaras de seguridad vial. La multa depende de cuántos km/h estabas por encima del límite señalizado o por defecto: la tabla de multas publicada por Victoria no incluye una penalidad aparte y más alta solo por exceso de velocidad en una zona escolar. Pero como el límite de una zona escolar suele ser de 30 o 40 km/h, conducir solo un poco más rápido de lo que conducirías en una calle común ya puede ponerte en una categoría de multa mucho más alta."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Less than 10 km/h over the limit: $261, plus 1 demerit point.",
            pt: "Menos de 10 km/h acima do limite: $261, mais 1 ponto de demérito.",
            es: "Menos de 10 km/h por encima del límite: $261, más 1 punto de demérito."
          },
          {
            en: "10 to 24 km/h over the limit: $418, plus 3 demerit points.",
            pt: "De 10 a 24 km/h acima do limite: $418, mais 3 pontos de demérito.",
            es: "De 10 a 24 km/h por encima del límite: $418, más 3 puntos de demérito."
          },
          {
            en: "25 to 29 km/h over the limit: $575, plus an automatic 3 month licence suspension.",
            pt: "De 25 a 29 km/h acima do limite: $575, mais suspensão automática da licença por 3 meses.",
            es: "De 25 a 29 km/h por encima del límite: $575, más suspensión automática de la licencia por 3 meses."
          },
          {
            en: "45 km/h or more over the limit: $1,046, plus an automatic 12 month licence suspension.",
            pt: "45 km/h ou mais acima do limite: $1,046, mais suspensão automática da licença por 12 meses.",
            es: "45 km/h o más por encima del límite: $1,046, más suspensión automática de la licencia por 12 meses."
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "Demerit points range from 1 to 10 depending on the offence and stay on your record for 3 years. These figures are current at the time of writing, Victoria reviews fine amounts every year on 1 July, so confirm the exact current numbers on vic.gov.au before you rely on them.",
          pt: "Os pontos de demérito variam de 1 a 10 dependendo da infração e ficam no seu registro por 3 anos. Esses valores são atuais no momento em que este post foi escrito, a Victoria revisa os valores das multas todo ano em 1º de julho, então confirme os números exatos e atuais em vic.gov.au antes de confiar neles.",
          es: "Los puntos de demérito van de 1 a 10 según la infracción y permanecen en tu registro durante 3 años. Estas cifras están vigentes al momento de escribir este artículo, Victoria revisa los montos de las multas cada año el 1 de julio, así que confirma los números exactos y actuales en vic.gov.au antes de confiar en ellos."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This post explains Victoria's speed limit and school zone rules in more depth than the general newcomer guide, based on Transport Victoria's published guidance and Victoria's road rules. To prepare for the actual test content, use KangaLearner's Learn section and VIC practice questions.",
          pt: "Este post explica as regras de limite de velocidade e zona escolar de Victoria com mais profundidade do que o guia geral para quem chega de fora, com base na orientação publicada pela Transport Victoria e nas regras de trânsito do estado. Para se preparar para o conteúdo da prova em si, use a seção Aprender e as perguntas de prática de VIC do KangaLearner.",
          es: "Este artículo explica las reglas de límites de velocidad y zonas escolares de Victoria con más profundidad que la guía general para recién llegados, basado en la orientación publicada por Transport Victoria y en las reglas de tránsito del estado. Para prepararte para el contenido real del examen, usa la sección Aprender y las preguntas de práctica de VIC de KangaLearner."
        }
      }
    ]
  },
  {
    slug: "vic-mobile-phones-driving-guide",
    icon: "safety",
    state: "VIC",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "Mobile phones and technology while driving in Victoria: the rules by licence stage",
      pt: "Celular e tecnologia ao dirigir em Victoria: as regras por etapa da licença",
      es: "Celular y tecnología al conducir en Victoria: las reglas por etapa de licencia"
    },
    excerpt: {
      en: "Victoria's phone laws cover far more than texting: mounted cradles, smartwatches, dashboard screens and even resting a phone on your leg at a red light. Here is exactly what learners, P1, P2 and full licence holders can and cannot do, based on Transport Victoria's own rules.",
      pt: "As leis de celular de Victoria cobrem muito mais que mensagens de texto: suportes fixos, smartwatches, telas do painel e até apoiar o celular na perna no sinal vermelho. Veja exatamente o que learners, P1, P2 e motoristas com carteira completa podem e não podem fazer, com base nas regras da própria Transport Victoria.",
      es: "Las leyes sobre el celular en Victoria cubren mucho más que los mensajes de texto: soportes fijos, smartwatches, pantallas del tablero e incluso apoyar el celular en la pierna en el semáforo en rojo. Esto es exactamente lo que learners, P1, P2 y conductores con licencia plena pueden y no pueden hacer, basado en las reglas de la propia Transport Victoria."
    },
    sourceLabel: {
      en: "Transport Victoria, Mobile phones and devices",
      pt: "Transport Victoria, Mobile phones and devices",
      es: "Transport Victoria, Mobile phones and devices"
    },
    sourceUrl:
      "https://transport.vic.gov.au/road-and-active-transport/road-rules-and-safety/mobile-phones-and-devices",
    body: [
      {
        type: "paragraph",
        text: {
          en: "Phone use while driving is not just a call and texting rule in Victoria. Transport Victoria runs a detailed set of road rules covering portable devices, mounted cradles, wearables like smartwatches, and even the touchscreen built into your dashboard, with different limits depending on which licence you hold. This post is a deep dive into exactly what you can and cannot do with a device behind the wheel, based directly on Transport Victoria's own Mobile phones and devices pages.",
          pt: "Usar o celular ao dirigir não é só uma regra sobre ligação e mensagem de texto em Victoria. A Transport Victoria mantém um conjunto detalhado de regras de trânsito que cobre aparelhos portáteis, suportes fixados no veículo, vestíveis como smartwatches, e até a tela integrada ao painel do carro, com limites diferentes dependendo de qual licença você tem. Este post é um mergulho profundo no que você pode e não pode fazer com um aparelho ao volante, com base direta nas páginas da própria Transport Victoria sobre celulares e aparelhos.",
          es: "Usar el celular mientras conduces no es solo una regla sobre llamadas y mensajes de texto en Victoria. Transport Victoria mantiene un conjunto detallado de reglas de tránsito que cubre dispositivos portátiles, soportes fijados al vehículo, dispositivos vestibles como los relojes inteligentes, e incluso la pantalla integrada al tablero del auto, con límites distintos según la licencia que tengas. Este artículo es una inmersión profunda en lo que puedes y no puedes hacer con un dispositivo al volante, basado directamente en las páginas de la propia Transport Victoria sobre celulares y dispositivos."
        }
      },
      {
        type: "heading",
        text: {
          en: "Learner, P1 and P2: a complete ban, no exceptions",
          pt: "Learner, P1 e P2: proibição total, sem exceções",
          es: "Learner, P1 y P2: prohibición total, sin excepciones"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "If you hold a learner permit, a P1 or P2 licence, or a restricted 'E' motorcycle licence, you cannot use a mobile phone or any portable, wearable or mounted device at all while driving, for any function. This is stricter than what a lot of newcomers expect: it rules out hands-free calls, voice controlled navigation, and even a phone properly mounted in a cradle, not just holding the phone in your hand. The only legal way to use a device is to pull over and park first. The restriction also applies while you are stopped but not parked, such as at a red light or in banked up traffic, so a red light does not create an exception.",
          pt: "Se você tem uma permissão de learner, uma licença P1 ou P2, ou uma licença de motocicleta restrita 'E', você não pode usar celular nem nenhum aparelho portátil, vestível ou fixado no veículo enquanto dirige, para nenhuma função. Isso é mais rígido do que muita gente que chega de fora espera: a regra proíbe ligação em viva voz, navegação por comando de voz, e até um celular corretamente fixado num suporte, não é só sobre segurar o aparelho na mão. A única forma legal de usar um aparelho é parar e estacionar antes. A restrição também vale enquanto você está parado mas não estacionado, como num sinal vermelho ou preso no trânsito, então o sinal vermelho não cria uma exceção.",
          es: "Si tienes un permiso de learner, una licencia P1 o P2, o una licencia de motocicleta restringida 'E', no puedes usar el celular ni ningún dispositivo portátil, vestible o fijado al vehículo mientras conduces, para ninguna función. Esto es más estricto de lo que mucha gente recién llegada espera: la regla descarta las llamadas manos libres, la navegación por comando de voz, e incluso un celular correctamente fijado en un soporte, no se trata solo de sostener el aparato en la mano. La única forma legal de usar un dispositivo es detenerte y estacionar primero. La restricción también aplica mientras estás detenido pero no estacionado, como en un semáforo en rojo o atrapado en el tráfico, así que un semáforo en rojo no crea una excepción."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "A $627 fine and 4 demerit points for a first offence, current at the time of writing since these amounts are reviewed periodically.",
            pt: "Uma multa de $627 e 4 pontos de demérito na primeira infração, valores atuais no momento em que este post foi escrito, já que são revisados periodicamente.",
            es: "Una multa de $627 y 4 puntos de demérito por una primera infracción, valores vigentes al momento de escribir este artículo, ya que se revisan periódicamente."
          },
          {
            en: "Probationary (P1 and P2) drivers lose their licence at 5 demerit points within any 12 month period, or 12 points within 3 years, so a single phone offence uses up most of that allowance at once.",
            pt: "Motoristas provisórios (P1 e P2) perdem a licença ao chegar a 5 pontos de demérito em qualquer período de 12 meses, ou 12 pontos em 3 anos, então uma única infração de celular já consome quase todo esse limite de uma vez.",
            es: "Los conductores provisionales (P1 y P2) pierden la licencia al llegar a 5 puntos de demérito en cualquier período de 12 meses, o 12 puntos en 3 años, así que una sola infracción de celular consume casi todo ese límite de una vez."
          },
          {
            en: "The same ban applies to riders on a learner permit or a restricted 'E' motorcycle licence, with no exception for motorcyclists.",
            pt: "A mesma proibição vale para quem anda de moto com permissão de learner ou licença de moto restrita 'E', sem exceção para motociclistas.",
            es: "La misma prohibición aplica a quienes andan en moto con permiso de learner o licencia de moto restringida 'E', sin excepción para motociclistas."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "What counts as 'using' a phone",
          pt: "O que conta como 'usar' o celular",
          es: "Qué cuenta como 'usar' el celular"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Victoria defines 'driving' broadly, and it defines phone use broadly too. Legally, driving includes moments when your car is stopped but not parked, like at traffic lights or in banked up traffic, so the phone needs to be put away before you set off, not just while the wheels are turning. 'Using' the phone goes far beyond talking or typing, and covers most of what people instinctively reach for a phone to do.",
          pt: "Victoria define 'dirigir' de forma ampla, e define o uso do celular de forma ampla também. Legalmente, dirigir inclui os momentos em que o carro está parado mas não estacionado, como num sinal vermelho ou preso no trânsito, então o celular precisa ficar guardado antes de você sair, não só enquanto as rodas estão girando. 'Usar' o celular vai muito além de falar ou digitar, e cobre a maior parte do que as pessoas instintivamente pegam o celular para fazer.",
          es: "Victoria define 'conducir' de forma amplia, y también define el uso del celular de forma amplia. Legalmente, conducir incluye los momentos en que el auto está detenido pero no estacionado, como en un semáforo en rojo o atrapado en el tráfico, así que el celular debe quedar guardado antes de salir, no solo mientras las ruedas están girando. 'Usar' el celular va mucho más allá de hablar o escribir, y cubre la mayor parte de lo que la gente instintivamente busca hacer con el celular."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Holding the phone in your hand, even switched off, or resting it on your lap, your leg, or any other part of your body or clothes, unless it is in a pocket or an attached pouch.",
            pt: "Segurar o celular na mão, mesmo desligado, ou apoiá-lo no colo, na perna, ou em qualquer outra parte do corpo ou da roupa, a não ser que esteja no bolso ou numa bolsinha presa à roupa.",
            es: "Sostener el celular en la mano, incluso apagado, o apoyarlo en el regazo, la pierna, o cualquier otra parte del cuerpo o la ropa, a menos que esté en un bolsillo o en una bolsa sujeta a la ropa."
          },
          {
            en: "Touching the phone for any reason: unlocking it, plugging in a charger, or turning it on or off.",
            pt: "Tocar no celular por qualquer motivo: desbloquear, conectar um carregador, ou ligar e desligar o aparelho.",
            es: "Tocar el celular por cualquier motivo: desbloquearlo, conectar un cargador, o encenderlo o apagarlo."
          },
          {
            en: "Looking at or sending a text message, email or photo, or scrolling through social media or a music app.",
            pt: "Olhar ou enviar mensagem de texto, email ou foto, ou rolar a tela nas redes sociais ou num aplicativo de música.",
            es: "Mirar o enviar un mensaje de texto, correo o foto, o desplazarte por redes sociales o una aplicación de música."
          },
          {
            en: "Making or taking a video call, even if the phone is mounted, and even while stopped at a red light.",
            pt: "Fazer ou receber uma videochamada, mesmo com o celular fixado num suporte, e mesmo parado num sinal vermelho.",
            es: "Hacer o recibir una videollamada, incluso con el celular fijado en un soporte, e incluso detenido en un semáforo en rojo."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Mounted phones and cradles: an exception only for full licence holders",
          pt: "Celular no suporte: uma exceção só para quem tem carteira completa",
          es: "Celular en el soporte: una excepción solo para licencia plena"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Full licence holders get meaningfully more freedom, but only once the phone is properly mounted. For a phone or tablet to count as 'mounted' under Victorian law, it has to be secured to the vehicle in a holder that is commercially designed and manufactured for that purpose, which rules out propping it against the dashboard or wedging it in a cup holder. Once it is mounted, you can touch it briefly to start, accept or reject a call, play or stream audio, adjust the volume, or start a navigation function. You still cannot enter text, scroll, view images, or take a video call on it, mounted or not, and you cannot touch it for any other reason once you are driving, not even stopped at a light. It has to be set up, with your route or your playlist ready, before you start moving.",
          pt: "Motoristas com carteira completa têm bem mais liberdade, mas só depois que o celular está corretamente fixado. Para um celular ou tablet contar como 'fixado' pela lei de Victoria, ele precisa estar preso ao veículo num suporte comercialmente projetado e fabricado para essa finalidade, o que descarta apoiar o aparelho no painel ou encaixá-lo num porta-copos. Uma vez fixado, você pode tocá-lo rapidamente para iniciar, aceitar ou rejeitar uma ligação, tocar ou transmitir áudio, ajustar o volume, ou iniciar uma função de navegação. Você ainda não pode digitar texto, rolar a tela, ver imagens, ou fazer videochamada nele, fixado ou não, e não pode tocá-lo por nenhum outro motivo enquanto estiver dirigindo, nem parado num sinal. Ele precisa estar configurado, com sua rota ou sua playlist prontas, antes de você começar a andar.",
          es: "Los conductores con licencia plena tienen bastante más libertad, pero solo una vez que el celular está correctamente fijado. Para que un celular o tablet cuente como 'fijado' según la ley de Victoria, debe estar asegurado al vehículo en un soporte diseñado y fabricado comercialmente para ese fin, lo que descarta apoyarlo contra el tablero o encajarlo en un portavasos. Una vez fijado, puedes tocarlo brevemente para iniciar, aceptar o rechazar una llamada, reproducir o transmitir audio, ajustar el volumen, o iniciar una función de navegación. Aun así no puedes escribir texto, desplazarte por la pantalla, ver imágenes, o hacer una videollamada en él, esté fijado o no, y no puedes tocarlo por ningún otro motivo mientras conduces, ni siquiera detenido en un semáforo. Tiene que estar configurado, con tu ruta o tu lista de reproducción listas, antes de que empieces a moverte."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Allowed with a brief touch: starting, accepting or rejecting a call, playing or streaming audio, adjusting the volume, and using a navigation function.",
            pt: "Permitido com um toque rápido: iniciar, aceitar ou rejeitar uma ligação, tocar ou transmitir áudio, ajustar o volume, e usar uma função de navegação.",
            es: "Permitido con un toque breve: iniciar, aceptar o rechazar una llamada, reproducir o transmitir audio, ajustar el volumen, y usar una función de navegación."
          },
          {
            en: "Never allowed on a mounted device: entering text, scrolling, viewing images or photos, or taking a video call.",
            pt: "Nunca permitido num aparelho fixado: digitar texto, rolar a tela, ver imagens ou fotos, ou fazer videochamada.",
            es: "Nunca permitido en un dispositivo fijado: escribir texto, desplazarse por la pantalla, ver imágenes o fotos, o hacer una videollamada."
          },
          {
            en: "The cradle exception never extends to learners, P1 or P2 drivers, mounted or not, hands-free or not.",
            pt: "A exceção do suporte nunca se aplica a learners e motoristas P1 ou P2, fixado ou não, viva voz ou não.",
            es: "La excepción del soporte nunca aplica a learners y conductores P1 o P2, fijado o no, manos libres o no."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Wearables, dashboard screens and other technology",
          pt: "Vestíveis, telas do painel e outras tecnologias",
          es: "Dispositivos vestibles, pantallas del tablero y otras tecnologías"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "The same kind of restrictions extend well beyond phones. A smartwatch, smart glasses, or a wearable head-up display counts as a wearable device, and if you hold a full licence you can only use one hands-free, through voice control, to start or end a call, play audio, or adjust the volume. You cannot touch it beyond the incidental contact of wearing it, and you cannot use it to navigate. Your car's own built-in touchscreen, for maps, media or climate control, is treated much like a mounted phone: a brief touch for audio, navigation or climate functions is fine, but entering text, scrolling, or watching video on it is not, even for full licence holders.",
          pt: "O mesmo tipo de restrição vai muito além dos celulares. Um smartwatch, óculos inteligentes, ou um head-up display vestível conta como aparelho vestível, e se você tem carteira completa, só pode usá-lo em modo viva voz, por comando de voz, para iniciar ou encerrar uma ligação, tocar áudio, ou ajustar o volume. Você não pode tocá-lo além do contato incidental de estar usando o aparelho, e não pode usá-lo para navegação. A própria tela integrada do seu carro, para mapas, mídia ou controle de climatização, é tratada de forma parecida com um celular fixado: um toque rápido para funções de áudio, navegação ou climatização é permitido, mas digitar texto, rolar a tela, ou assistir vídeo nela não é, mesmo para quem tem carteira completa.",
          es: "El mismo tipo de restricción va mucho más allá de los celulares. Un smartwatch, unos lentes inteligentes, o un head-up display vestible cuenta como dispositivo vestible, y si tienes licencia plena, solo puedes usarlo con manos libres, por comando de voz, para iniciar o terminar una llamada, reproducir audio, o ajustar el volumen. No puedes tocarlo más allá del contacto incidental de llevarlo puesto, y no puedes usarlo para navegar. La pantalla integrada de tu propio auto, para mapas, contenido multimedia o control de climatización, se trata de forma parecida a un celular fijado: un toque breve para funciones de audio, navegación o climatización está permitido, pero escribir texto, desplazarte por la pantalla, o ver video en ella no lo está, incluso para quienes tienen licencia plena."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "CB radios and other two way radios are not covered by these rules at all, and can be used normally.",
            pt: "Rádios CB e outros rádios bidirecionais não são cobertos por essas regras, e podem ser usados normalmente.",
            es: "Los radios CB y otros radios bidireccionales no están cubiertos por estas reglas en absoluto, y se pueden usar con normalidad."
          },
          {
            en: "You can connect your phone to your car's Bluetooth or wireless system before you start driving, then put it out of sight and reach for the trip.",
            pt: "Você pode conectar o celular ao Bluetooth ou sistema sem fio do carro antes de começar a dirigir, e depois deixá-lo fora de vista e de alcance durante o trajeto.",
            es: "Puedes conectar tu celular al Bluetooth o al sistema inalámbrico del auto antes de empezar a conducir, y luego dejarlo fuera de la vista y del alcance durante el trayecto."
          },
          {
            en: "You can use your phone or another portable device to pay at a drive-through.",
            pt: "Você pode usar o celular ou outro aparelho portátil para pagar num drive-through.",
            es: "Puedes usar tu celular u otro dispositivo portátil para pagar en un drive-through."
          },
          {
            en: "Rideshare, taxi, delivery, freight and bus drivers get a narrow work exception, letting them briefly touch a device to accept or reject a job or check pickup and delivery details, but not to scroll or type, they still have to pull over and park for that.",
            pt: "Motoristas de aplicativo, táxi, entrega, frete e ônibus têm uma exceção de trabalho bem restrita, que permite tocar rapidamente num aparelho para aceitar ou recusar uma corrida ou conferir detalhes de retirada e entrega, mas não para rolar a tela ou digitar, para isso ainda é preciso parar e estacionar.",
            es: "Los conductores de aplicaciones de transporte, taxi, delivery, carga y autobuses tienen una excepción laboral bastante limitada, que les permite tocar brevemente un dispositivo para aceptar o rechazar un viaje o revisar detalles de recogida y entrega, pero no para desplazarse por la pantalla o escribir, para eso todavía es necesario detenerse y estacionar."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "How Victoria actually catches you",
          pt: "Como a Victoria realmente flagra você",
          es: "Cómo te descubre Victoria en la práctica"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Victoria also runs dedicated distracted driver detection cameras, so phone use is not only caught by an officer who happens to see you. Each camera takes two images of every passing vehicle: one at a shallow, forward facing angle to catch a phone held to your ear, and one angled steeply down to catch a phone resting on your lap or being touched. Artificial intelligence reviews the images first, and any flagged as a possible offence are then checked by a person before a fine is issued. In the July to September 2025 quarter alone, these cameras recorded 5,160 drivers using a portable device, out of 15,700 total offences that also included seatbelt breaches.",
          pt: "Victoria também tem câmeras dedicadas de detecção de motoristas distraídos, então o uso do celular não é flagrado só por um policial que passa e vê você. Cada câmera tira duas imagens de cada veículo que passa: uma num ângulo raso, voltado para frente, para flagrar um celular encostado na orelha, e outra num ângulo bem inclinado para baixo, para flagrar um celular apoiado no colo ou sendo tocado. Uma inteligência artificial revisa as imagens primeiro, e qualquer uma marcada como possível infração é depois conferida por uma pessoa antes de a multa ser emitida. Só no trimestre de julho a setembro de 2025, essas câmeras registraram 5.160 motoristas usando um aparelho portátil, de um total de 15.700 infrações, que também incluíram infrações de cinto de segurança.",
          es: "Victoria también tiene cámaras dedicadas de detección de conductores distraídos, así que el uso del celular no solo se detecta cuando un oficial pasa y te ve. Cada cámara toma dos imágenes de cada vehículo que pasa: una en un ángulo bajo, orientada hacia adelante, para detectar un celular pegado a la oreja, y otra en un ángulo muy inclinado hacia abajo, para detectar un celular apoyado en el regazo o siendo tocado. Una inteligencia artificial revisa las imágenes primero, y cualquiera marcada como posible infracción luego es verificada por una persona antes de emitir la multa. Solo en el trimestre de julio a septiembre de 2025, estas cámaras registraron 5.160 conductores usando un dispositivo portátil, de un total de 15.700 infracciones, que también incluyeron infracciones de cinturón de seguridad."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This post is based directly on Transport Victoria's own Mobile phones and devices pages, and on the current fine and camera enforcement figures published on vic.gov.au, current at the time of writing since penalty amounts are reviewed periodically. Use KangaLearner's Learn section and VIC practice questions to prepare for the actual test content.",
          pt: "Este post é baseado diretamente nas páginas da própria Transport Victoria sobre celulares e aparelhos, e nos valores atuais de multa e fiscalização por câmera publicados em vic.gov.au, atuais no momento em que este post foi escrito, já que os valores de multa são revisados periodicamente. Use a seção Aprender e as perguntas de prática de VIC do KangaLearner para se preparar para o conteúdo real da prova.",
          es: "Este artículo está basado directamente en las páginas de la propia Transport Victoria sobre celulares y dispositivos, y en los valores actuales de multa y fiscalización por cámara publicados en vic.gov.au, vigentes al momento de escribir este artículo, ya que los montos de las multas se revisan periódicamente. Usa la sección Aprender y las preguntas de práctica de VIC de KangaLearner para prepararte para el contenido real del examen."
        }
      }
    ]
  },
  {
    slug: "vic-alcohol-drug-driving-guide",
    icon: "safety",
    state: "VIC",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 8,
    title: {
      en: "Alcohol and drugs behind the wheel in Victoria: BAC limits and roadside testing, explained",
      pt: "Álcool e drogas ao volante em Victoria: limites de BAC e testes na estrada, explicados",
      es: "Alcohol y drogas al volante en Victoria: límites de BAC y controles en la carretera, explicados"
    },
    excerpt: {
      en: "Zero BAC is not just for learners in Victoria. A deep dive into blood alcohol limits by licence type, how roadside drug testing actually works, and what happens if you are caught.",
      pt: "BAC zero não é só para learners em Victoria. Um mergulho profundo nos limites de álcool no sangue por tipo de licença, como funciona de verdade o teste de drogas na estrada, e o que acontece se você for pego.",
      es: "El BAC cero no es solo para los learners en Victoria. Una inmersión profunda en los límites de alcohol en sangre por tipo de licencia, cómo funciona en realidad la prueba de drogas en la carretera, y qué pasa si te atrapan."
    },
    sourceLabel: {
      en: "Transport Victoria, Alcohol, drugs and driving",
      pt: "Transport Victoria, Alcohol, drugs and driving",
      es: "Transport Victoria, Alcohol, drugs and driving"
    },
    sourceUrl:
      "https://transport.vic.gov.au/road-and-active-transport/road-rules-and-safety/alcohol-drugs-and-driving",
    body: [
      {
        type: "paragraph",
        text: {
          en: "Victoria treats alcohol and drugs very differently once you look past the basic zero tolerance rule for learners. Blood alcohol limits change depending on the type of licence you hold, roadside drug testing works on a completely different method than a breathalyser, and refusing to cooperate with police is often treated more seriously than failing the test itself. This post is a deep dive into how those rules actually work, based directly on Transport Victoria's own pages. It is written to inform, not as legal advice, since real cases depend on the specific facts and the decision of the courts.",
          pt: "Victoria trata álcool e drogas de formas bem diferentes quando você olha além da regra básica de tolerância zero para learners. Os limites de álcool no sangue mudam de acordo com o tipo de licença que você tem, o teste de drogas na estrada funciona num método completamente diferente do bafômetro, e recusar cooperar com a polícia costuma ser tratado com mais seriedade do que reprovar no próprio teste. Este post é um mergulho profundo em como essas regras realmente funcionam, com base direta nas páginas da própria Transport Victoria. Ele é escrito para informar, não como aconselhamento jurídico, já que casos reais dependem dos fatos específicos e da decisão dos tribunais.",
          es: "Victoria trata el alcohol y las drogas de forma muy distinta cuando miras más allá de la regla básica de tolerancia cero para los learners. Los límites de alcohol en sangre cambian según el tipo de licencia que tengas, la prueba de drogas en la carretera funciona con un método completamente distinto al del alcoholímetro, y negarte a cooperar con la policía suele tratarse con más seriedad que reprobar la prueba en sí. Este artículo es una inmersión profunda en cómo funcionan realmente estas reglas, basado directamente en las páginas de la propia Transport Victoria. Está escrito para informar, no como asesoría legal, ya que los casos reales dependen de los hechos específicos y de la decisión de los tribunales."
        }
      },
      {
        type: "heading",
        text: {
          en: "Blood alcohol limits by licence type",
          pt: "Limites de álcool no sangue por tipo de licença",
          es: "Límites de alcohol en sangre por tipo de licencia"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Full, unrestricted licence holders, meaning no alcohol interlock or 'Z' condition on the licence: BAC must stay below 0.05. A reading of exactly 0.05 already counts as an offence, it is not a rounding allowance.",
            pt: "Motoristas com carteira completa e sem restrições, ou seja, sem a condição de interlock (o dispositivo bloqueador por álcool) nem a condição 'Z' na licença: o BAC precisa ficar abaixo de 0,05. Um resultado de exatamente 0,05 já conta como infração, não é uma margem de arredondamento.",
            es: "Conductores con licencia completa y sin restricciones, es decir, sin la condición de interlock (el dispositivo bloqueador por alcohol) ni la condición 'Z' en la licencia: el BAC debe mantenerse por debajo de 0,05. Un resultado de exactamente 0,05 ya se considera una infracción, no es un margen de redondeo."
          },
          {
            en: "Learner drivers, car and motorcycle, including interstate learner permit holders driving in Victoria, plus P1 and P2 probationary drivers: 0.00. No small amount is allowed.",
            pt: "Motoristas learner, carro e moto, incluindo learners de outros estados dirigindo em Victoria, mais motoristas provisórios P1 e P2: 0,00. Nenhuma quantidade pequena é permitida.",
            es: "Conductores learner, auto y moto, incluidos los learners de otros estados que conducen en Victoria, más conductores provisionales P1 y P2: 0,00. No se permite ninguna cantidad pequeña."
          },
          {
            en: "Restricted motorcycle riders on the 'E' condition, the LAMS (Learner Approved Motorcycle Scheme) restriction that also bans carrying a pillion passenger: 0.00.",
            pt: "Motociclistas com a restrição 'E', a condição do LAMS (Learner Approved Motorcycle Scheme) que também proíbe levar garupa: 0,00.",
            es: "Motociclistas con la restricción 'E', la condición del LAMS (Learner Approved Motorcycle Scheme) que también prohíbe llevar acompañante: 0,00."
          },
          {
            en: "Driving instructors, bus drivers, and taxi or other commercial passenger vehicle drivers: 0.00.",
            pt: "Instrutores de direção, motoristas de ônibus, e motoristas de táxi ou outros veículos de passageiros comerciais: 0,00.",
            es: "Instructores de manejo, conductores de autobús, y conductores de taxi u otros vehículos de pasajeros comerciales: 0,00."
          },
          {
            en: "Drivers of any rigid or articulated heavy vehicle over 4.5 tonnes gross vehicle mass: 0.00.",
            pt: "Motoristas de qualquer veículo pesado rígido ou articulado com mais de 4,5 toneladas de massa bruta do veículo: 0,00.",
            es: "Conductores de cualquier vehículo pesado rígido o articulado de más de 4,5 toneladas de masa bruta del vehículo: 0,00."
          },
          {
            en: "Anyone whose licence carries a 'Z' or 'I' condition, usually added after a prior drink or drug driving offence: 0.00, for as long as the condition remains on the licence, generally at least 3 years after the offence.",
            pt: "Qualquer pessoa com a condição 'Z' ou 'I' na licença, normalmente adicionada depois de uma infração anterior por álcool ou drogas: 0,00, enquanto a condição estiver na licença, geralmente por pelo menos 3 anos após a infração.",
            es: "Cualquier persona con la condición 'Z' o 'I' en la licencia, normalmente agregada después de una infracción anterior por alcohol o drogas: 0,00, mientras la condición permanezca en la licencia, generalmente por al menos 3 años después de la infracción."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "How random breath testing actually works",
          pt: "Como funciona de verdade o teste aleatório de bafômetro",
          es: "Cómo funciona en realidad la prueba aleatoria de alcoholemia"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Victoria Police run random breath testing at fixed roadside stations, sometimes called a booze bus, and through mobile patrols, with no need for a specific reason to stop you first. These checks apply on private property as well as public roads, so a driveway or a car park is not a loophole. Refusing to stop, refusing to provide a breath or blood sample, or refusing to cooperate with the test is its own offence, and it is generally treated more seriously than actually failing the test. A cheap coin operated or consumer breathalyser can give you a rough idea, but Transport Victoria is explicit that these devices can be inaccurate and are not accepted as evidence, so do not use one to decide whether you are safe to drive.",
          pt: "A Victoria Police faz testes aleatórios de bafômetro em pontos fixos na estrada, às vezes chamados de booze bus, e também em patrulhas móveis, sem precisar de um motivo específico para parar você primeiro. Essas verificações valem tanto em propriedade privada quanto em vias públicas, então uma garagem ou um estacionamento não é uma brecha. Recusar parar, recusar dar uma amostra de sopro ou sangue, ou recusar cooperar com o teste é uma infração à parte, e costuma ser tratada com mais seriedade do que realmente reprovar no teste. Um bafômetro barato de moeda ou de uso pessoal pode dar uma ideia aproximada, mas a Transport Victoria é clara ao dizer que esses aparelhos podem ser imprecisos e não são aceitos como prova, então não use um deles para decidir se você está em condição de dirigir.",
          es: "La Victoria Police realiza pruebas aleatorias de alcoholemia en puntos fijos de la carretera, a veces llamados booze bus, y también en patrullas móviles, sin necesidad de un motivo específico para detenerte primero. Estos controles aplican tanto en propiedad privada como en vías públicas, así que una entrada de auto o un estacionamiento no es una laguna legal. Negarte a detenerte, negarte a dar una muestra de aliento o sangre, o negarte a cooperar con la prueba es una infracción aparte, y suele tratarse con más seriedad que reprobar la prueba en sí. Un alcoholímetro barato de moneda o de uso personal puede darte una idea aproximada, pero Transport Victoria es clara al decir que estos aparatos pueden ser imprecisos y no se aceptan como prueba, así que no uses uno para decidir si estás en condiciones de conducir."
        }
      },
      {
        type: "heading",
        text: {
          en: "Roadside drug testing works completely differently",
          pt: "O teste de drogas na estrada funciona de um jeito bem diferente",
          es: "La prueba de drogas en la carretera funciona de forma muy distinta"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Alcohol testing measures how impaired you are right now, but the standard roadside drug test does not work that way. Victoria Police collect a small saliva sample at a random drug testing station or during a mobile patrol, and if the initial screen picks up a trace of a drug, that sample goes to a laboratory for confirmation, which can detect more than one drug type at once. A confirmed positive lab result leads to a drug driving charge on its own, regardless of whether you actually felt impaired at the time. Separately, if your behaviour, balance or coordination raise concern during a stop, police can run a physical impairment assessment and then require a blood or urine sample, which leads to a different and more serious charge, driving while impaired by a drug. It is an offence either way to refuse to stop at a testing station, refuse to provide a sample, or refuse to take part in the assessment. The tricky part for newcomers: some drugs, cannabis especially, can still show up in saliva days after you used them, long after any high or impairment has worn off, and how long depends on the drug, the dose, how often you use it and your own body.",
          pt: "O teste de álcool mede o quanto você está afetado naquele exato momento, mas o teste de drogas padrão na estrada não funciona assim. A Victoria Police coleta uma pequena amostra de saliva num posto de teste aleatório de drogas ou durante uma patrulha móvel, e se a triagem inicial detectar traços de alguma droga, essa amostra vai para um laboratório para confirmação, que consegue detectar mais de um tipo de droga ao mesmo tempo. Um resultado positivo confirmado em laboratório já leva a uma acusação de dirigir sob efeito de drogas por si só, independente de você ter sentido ou não algum efeito na hora. Separadamente, se seu comportamento, equilíbrio ou coordenação motora levantarem alguma preocupação durante uma abordagem, a polícia pode fazer uma avaliação física de comprometimento e depois exigir uma amostra de sangue ou urina, o que leva a uma acusação diferente e mais grave, dirigir sob efeito de droga com comprometimento comprovado. É uma infração dos dois jeitos recusar parar num posto de teste, recusar dar uma amostra, ou recusar participar da avaliação. A parte complicada para quem chega de fora: algumas drogas, principalmente a maconha, ainda podem aparecer na saliva dias depois do uso, bem depois de qualquer efeito ou comprometimento ter passado, e por quanto tempo depende da droga, da dose, da frequência de uso e do seu próprio corpo.",
          es: "La prueba de alcohol mide cuánto estás afectado en ese momento exacto, pero la prueba de drogas estándar en la carretera no funciona así. La Victoria Police recolecta una pequeña muestra de saliva en un puesto de prueba aleatoria de drogas o durante una patrulla móvil, y si el análisis inicial detecta rastros de alguna droga, esa muestra va a un laboratorio para confirmación, que puede detectar más de un tipo de droga a la vez. Un resultado positivo confirmado en laboratorio ya lleva a un cargo por conducir bajo el efecto de drogas por sí solo, sin importar si sentiste o no algún efecto en el momento. Por separado, si tu comportamiento, equilibrio o coordinación motora generan preocupación durante un control, la policía puede hacer una evaluación física de deterioro y luego exigir una muestra de sangre u orina, lo que lleva a un cargo distinto y más grave, conducir bajo el efecto de una droga con deterioro comprobado. Es una infracción de las dos formas negarte a detenerte en un puesto de prueba, negarte a dar una muestra, o negarte a participar en la evaluación. La parte complicada para quien recién llega: algunas drogas, sobre todo la marihuana, todavía pueden aparecer en la saliva días después del consumo, mucho después de que cualquier efecto o deterioro haya pasado, y cuánto tiempo depende de la droga, la dosis, la frecuencia de uso y tu propio cuerpo."
        }
      },
      {
        type: "heading",
        text: {
          en: "Cannabis and other drugs: zero tolerance, not a threshold",
          pt: "Maconha e outras drogas: tolerância zero, não um limite",
          es: "Marihuana y otras drogas: tolerancia cero, no un umbral"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This is the biggest difference from alcohol: there is no equivalent to the 0.05 threshold for illegal drugs. If you have any detectable amount of an illicit drug such as THC (the main psychoactive compound in cannabis), methamphetamine or MDMA in your system while driving, that is an offence on its own, even for a fully licensed driver with no other restrictions, and even if you do not feel impaired. Medicinal cannabis complicates this: since 1 March 2025, a Magistrate has discretion over whether to cancel the licence of someone who tests positive for THC while holding a valid medicinal cannabis prescription, but that discretion only applies to the licence cancellation decision. Driving with any detectable THC in your system is still illegal regardless of a prescription, and fines and other penalties can still apply.",
          pt: "Essa é a maior diferença em relação ao álcool: não existe um equivalente ao limite de 0,05 para drogas ilícitas. Se você tiver qualquer quantidade detectável de uma droga ilícita como THC (o principal composto psicoativo da maconha), metanfetamina ou MDMA no seu organismo enquanto dirige, isso já é uma infração por si só, mesmo para um motorista com carteira completa sem nenhuma outra restrição, e mesmo que você não sinta nenhum efeito. A maconha medicinal complica um pouco isso: desde 1º de março de 2025, um magistrado tem a discricionariedade de decidir se cancela ou não a licença de alguém que testar positivo para THC enquanto tem uma receita válida de maconha medicinal, mas essa discricionariedade vale só para a decisão de cancelamento da licença. Dirigir com qualquer THC detectável no organismo continua ilegal independente de receita, e multas e outras penalidades ainda podem se aplicar.",
          es: "Esta es la mayor diferencia con el alcohol: no existe un equivalente al límite de 0,05 para las drogas ilícitas. Si tienes cualquier cantidad detectable de una droga ilícita como el THC (el principal compuesto psicoactivo de la marihuana), metanfetamina o MDMA en tu organismo mientras conduces, eso ya es una infracción en sí misma, incluso para un conductor con licencia completa sin ninguna otra restricción, e incluso si no sientes ningún efecto. La marihuana medicinal complica un poco esto: desde el 1 de marzo de 2025, un magistrado tiene la discreción de decidir si cancela o no la licencia de alguien que da positivo por THC mientras tiene una receta válida de marihuana medicinal, pero esa discreción aplica solo a la decisión de cancelación de la licencia. Conducir con cualquier THC detectable en el organismo sigue siendo ilegal sin importar la receta, y las multas y otras penalidades todavía pueden aplicarse."
        }
      },
      {
        type: "heading",
        text: {
          en: "What happens if you are caught",
          pt: "O que acontece se você for pego",
          es: "Qué pasa si te atrapan"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "For drink driving, expect heavy fines, a licence loss of at least 3 months and usually 6 or more, a compulsory behaviour change program, and a mandatory alcohol interlock once you get your licence back, alongside a 'Z' condition requiring zero BAC for at least 3 years. A first offence BAC reading of 0.10 or higher lets police impound your car for 30 days on the spot, and any repeat offence carries the same 30 day impoundment. The Magistrates' Court can disqualify you from driving for up to 5 years in serious or repeat cases.",
            pt: "Para quem é pego dirigindo alcoolizado, espere multas pesadas, perda da licença de pelo menos 3 meses e geralmente 6 ou mais, um programa obrigatório de mudança de comportamento, e um interlock obrigatório quando a licença for devolvida, junto com a condição 'Z' exigindo BAC zero por pelo menos 3 anos. Um resultado de BAC de 0,10 ou mais numa primeira ocorrência já permite que a polícia apreenda o carro na hora por 30 dias, e qualquer reincidência também tem os mesmos 30 dias de apreensão. O Magistrates' Court pode desqualificar a pessoa de dirigir por até 5 anos em casos graves ou de reincidência.",
            es: "Para quien es sorprendido conduciendo alcoholizado, hay que esperar multas altas, pérdida de la licencia de al menos 3 meses y generalmente 6 o más, un programa obligatorio de cambio de comportamiento, y un interlock obligatorio cuando te devuelvan la licencia, junto con la condición 'Z' que exige BAC cero por al menos 3 años. Un resultado de BAC de 0,10 o más en una primera ocurrencia ya permite que la policía incaute el auto en el momento por 30 días, y cualquier reincidencia también tiene la misma incautación de 30 días. El Magistrates' Court puede inhabilitar a la persona para conducir hasta por 5 años en casos graves o de reincidencia."
          },
          {
            en: "For drug driving, fines are set in 'penalty units', a legal unit Victoria uses instead of a fixed dollar figure, since the dollar value is reviewed periodically. Failing the roadside saliva screen starts with an infringement notice for a first offence, 3 penalty units and a 6 month licence suspension, which only turns into a full cancellation if you do not finish a behaviour change program within 3 months. Taken to court instead, or repeated, the fine rises fast: up to 12 penalty units for a first court matter, up to 60 for a second offence, and up to 120 for a third or later offence, each with a licence cancellation of at least 12 months.",
            pt: "Para dirigir sob efeito de drogas, as multas são definidas em 'unidades de penalidade' (penalty units), uma unidade legal que Victoria usa em vez de um valor fixo em dólares, já que o valor em dólares é revisado periodicamente. Reprovar no teste de saliva na estrada começa com uma notificação de infração numa primeira ocorrência, 3 unidades de penalidade e 6 meses de suspensão da licença, que só vira cancelamento total se a pessoa não terminar um programa de mudança de comportamento em até 3 meses. Se for a julgamento, ou se acontecer de novo, a multa sobe rápido: até 12 unidades de penalidade numa primeira ocorrência julgada em tribunal, até 60 numa segunda ocorrência, e até 120 numa terceira ocorrência ou mais, cada uma com cancelamento de licença de pelo menos 12 meses.",
            es: "Para conducir bajo el efecto de drogas, las multas se fijan en 'unidades de penalización' (penalty units), una unidad legal que Victoria usa en vez de un monto fijo en dólares, ya que el valor en dólares se revisa periódicamente. Reprobar la prueba de saliva en la carretera comienza con una notificación de infracción en una primera ocurrencia, 3 unidades de penalización y 6 meses de suspensión de la licencia, que solo se convierte en cancelación total si la persona no termina un programa de cambio de comportamiento en 3 meses. Si va a juicio, o si vuelve a ocurrir, la multa sube rápido: hasta 12 unidades de penalización en una primera ocurrencia juzgada en tribunal, hasta 60 en una segunda ocurrencia, y hasta 120 en una tercera ocurrencia o más, cada una con cancelación de licencia de al menos 12 meses."
          },
          {
            en: "If police run a full impairment assessment instead, meaning they suspect you are actually affected rather than just testing for presence, a first offence already goes to court: up to 12 penalty units and at least 12 months off the road. A second offence can mean up to 120 penalty units or 12 months in prison, and a third or later offence up to 180 penalty units or 18 months in prison, both with at least 2 years off the road.",
            pt: "Se a polícia fizer uma avaliação completa de comprometimento em vez disso, ou seja, se suspeitar que a pessoa está de fato afetada e não só testando a presença da substância, uma primeira ocorrência já vai direto a julgamento: até 12 unidades de penalidade e pelo menos 12 meses sem poder dirigir. Uma segunda ocorrência pode significar até 120 unidades de penalidade ou 12 meses de prisão, e uma terceira ocorrência ou mais até 180 unidades de penalidade ou 18 meses de prisão, ambas com pelo menos 2 anos sem poder dirigir.",
            es: "Si la policía hace una evaluación completa de deterioro en vez de eso, es decir, si sospecha que la persona realmente está afectada y no solo está probando la presencia de la sustancia, una primera ocurrencia ya va directo a juicio: hasta 12 unidades de penalización y al menos 12 meses sin poder conducir. Una segunda ocurrencia puede significar hasta 120 unidades de penalización o 12 meses de prisión, y una tercera ocurrencia o más hasta 180 unidades de penalización o 18 meses de prisión, ambas con al menos 2 años sin poder conducir."
          },
          {
            en: "Being caught with both alcohol and drugs in your system at once carries harsher penalties than either offence alone, including a licence disqualification of at least 12 months. If you hold an interstate or overseas licence, or no licence at all, and are charged with a serious drink or drug driving offence in Victoria, you can be immediately barred from getting a Victorian licence until your case is decided in court.",
            pt: "Ser flagrado com álcool e drogas no organismo ao mesmo tempo tem penalidades mais duras do que qualquer uma das duas infrações sozinha, incluindo desqualificação da licença por pelo menos 12 meses. Se a pessoa tem uma licença de outro estado ou de outro país, ou nenhuma licença, e é acusada de uma infração grave de álcool ou drogas em Victoria, pode ficar impedida na hora de conseguir uma licença de Victoria até o caso ser decidido em tribunal.",
            es: "Que te descubran con alcohol y drogas en el organismo al mismo tiempo tiene penas más duras que cualquiera de las dos infracciones por separado, incluyendo una inhabilitación de la licencia de al menos 12 meses. Si tienes una licencia de otro estado o de otro país, o ninguna licencia, y te acusan de una infracción grave de alcohol o drogas en Victoria, puedes quedar impedido de inmediato para obtener una licencia de Victoria hasta que tu caso se decida en tribunal."
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "This post explains how Victoria enforces its alcohol and drug driving rules, based on Transport Victoria's own published guidance and the Road Safety Act 1986. It is general information, not legal advice, and exact fine amounts change as penalty unit values are updated, so confirm current figures on transport.vic.gov.au if you need them for a real situation. To prepare for the actual test content, use KangaLearner's Learn section and VIC practice questions.",
          pt: "Este post explica como Victoria fiscaliza suas regras de álcool e drogas na direção, com base na própria orientação publicada pela Transport Victoria e no Road Safety Act 1986. É uma informação geral, não aconselhamento jurídico, e os valores exatos das multas mudam conforme o valor da unidade de penalidade é atualizado, então confirme os valores atuais em transport.vic.gov.au se precisar deles para uma situação real. Para se preparar para o conteúdo da prova em si, use a seção Aprender e as perguntas de prática de VIC do KangaLearner.",
          es: "Este artículo explica cómo Victoria fiscaliza sus reglas de alcohol y drogas al conducir, basado en la propia guía publicada por Transport Victoria y en el Road Safety Act 1986. Es información general, no asesoría legal, y los montos exactos de las multas cambian a medida que se actualiza el valor de la unidad de penalización, así que confirma las cifras actuales en transport.vic.gov.au si las necesitas para una situación real. Para prepararte para el contenido real del examen, usa la sección Aprender y las preguntas de práctica de VIC de KangaLearner."
        }
      }
    ]
  },
  {
    slug: "vic-regional-remote-driving-guide",
    icon: "safety",
    state: "VIC",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "Driving in regional and remote Victoria: the risks the city does not have",
      pt: "Dirigir na Victoria regional e remota: os riscos que a cidade não tem",
      es: "Conducir en la Victoria regional y remota: los riesgos que la ciudad no tiene"
    },
    excerpt: {
      en: "Fatigue causes up to a fifth of all crashes in Victoria, and a 2025 parliamentary inquiry found real gaps in how the state handles wildlife collisions. A closer look at fatigue, wildlife, unsealed roads, trip planning and mobile blackspots for regional and remote Victoria.",
      pt: "A fadiga causa até um quinto de todos os acidentes em Victoria, e uma investigação parlamentar de 2025 encontrou lacunas reais em como o estado lida com colisões com animais. Um olhar mais profundo sobre fadiga, fauna, estradas sem pavimentação, planejamento de viagem e falhas de cobertura de celular na Victoria regional e remota.",
      es: "La fatiga causa hasta una quinta parte de todos los accidentes en Victoria, y una investigación parlamentaria de 2025 encontró vacíos reales en cómo el estado maneja las colisiones con animales. Una mirada más profunda a la fatiga, la fauna, los caminos sin pavimentar, la planificación de viajes y las fallas de cobertura celular en la Victoria regional y remota."
    },
    sourceLabel: {
      en: "Transport Victoria, Fatigue and driving",
      pt: "Transport Victoria, Fatigue and driving",
      es: "Transport Victoria, Fatigue and driving"
    },
    sourceUrl:
      "https://transport.vic.gov.au/road-and-active-transport/road-rules-and-safety/fatigue-and-driving",
    body: [
      {
        type: "paragraph",
        text: {
          en: "Victoria's built up area covers a small share of the state. Once you drive past Melbourne's outer suburbs, the risks change: long straight roads, native animals crossing at dusk, gravel surfaces, and stretches with no mobile signal at all. KangaLearner's overview guide to driving in Victoria covers the everyday rules, like hook turns and giving way to trams. This post goes further, into what Transport Victoria, a 2025 Parliament of Victoria inquiry and other official sources say specifically about fatigue, wildlife, unsealed roads, trip planning and mobile coverage gaps once you are outside the capital.",
          pt: "A área urbanizada de Victoria cobre uma fração pequena do estado. Assim que você passa dos subúrbios externos de Melbourne, os riscos mudam: estradas longas e retas, animais nativos atravessando ao entardecer, superfícies de cascalho, e trechos sem sinal de celular nenhum. O guia geral do KangaLearner sobre dirigir em Victoria cobre as regras do dia a dia, como os hook turns e dar passagem para bondes. Este post vai além, no que a Transport Victoria, uma investigação do Parlamento de Victoria de 2025 e outras fontes oficiais dizem especificamente sobre fadiga, animais, estradas sem pavimentação, planejamento de viagem e falhas de cobertura de celular assim que você sai da capital.",
          es: "El área urbanizada de Victoria cubre una fracción pequeña del estado. Apenas pasas los suburbios exteriores de Melbourne, los riesgos cambian: caminos largos y rectos, animales nativos que cruzan al atardecer, superficies de ripio, y tramos sin señal de celular en absoluto. La guía general de KangaLearner sobre conducir en Victoria cubre las reglas del día a día, como los hook turns y ceder el paso a los tranvías. Este artículo va más allá, en lo que Transport Victoria, una investigación del Parlamento de Victoria de 2025 y otras fuentes oficiales dicen específicamente sobre la fatiga, la fauna, los caminos sin pavimentar, la planificación de viajes y las fallas de cobertura celular una vez que sales de la capital."
        }
      },
      {
        type: "heading",
        text: {
          en: "Fatigue: why it is treated like drink driving",
          pt: "Fadiga: por que é tratada como dirigir alcoolizado",
          es: "Fatiga: por qué se trata como conducir alcoholizado"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Transport Victoria states that driver fatigue, or drowsy driving, contributes to up to 20 per cent of all road crashes in the state. The comparison the department uses to make that concrete: driving on less than 5 hours of sleep affects you about the same way driving at a blood alcohol concentration of 0.05 does. Fatigue can build up from not getting enough sleep, being awake for more than 16 hours, driving during hours you would normally be asleep, or an undiagnosed sleep disorder such as sleep apnoea.",
          pt: "A Transport Victoria afirma que a fadiga do motorista, ou dirigir sonolento, contribui para até 20 por cento de todos os acidentes de trânsito no estado. A comparação que o departamento usa para tornar isso concreto: dirigir com menos de 5 horas de sono afeta você de um jeito parecido com dirigir com uma concentração de álcool no sangue de 0,05. A fadiga pode se acumular por não dormir o suficiente, ficar acordado por mais de 16 horas, dirigir em horários em que você normalmente estaria dormindo, ou por um distúrbio do sono não diagnosticado, como a apneia do sono.",
          es: "Transport Victoria afirma que la fatiga del conductor, o conducir somnoliento, contribuye hasta en un 20 por ciento de todos los accidentes viales del estado. La comparación que usa el departamento para hacerlo concreto: conducir con menos de 5 horas de sueño te afecta de una manera parecida a conducir con una concentración de alcohol en sangre de 0,05. La fatiga puede acumularse por no dormir lo suficiente, estar despierto por más de 16 horas, conducir en horarios en que normalmente estarías durmiendo, o por un trastorno del sueño no diagnosticado, como la apnea del sueño."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Your mind wandering or losing focus on the road",
            pt: "Sua mente divagando ou perdendo o foco na estrada",
            es: "Tu mente divagando o perdiendo el enfoque en el camino"
          },
          {
            en: "Heavy or slow eyes, or your vision going blurry",
            pt: "Olhos pesados ou lentos, ou a visão ficando embaçada",
            es: "Ojos pesados o lentos, o la vista poniéndose borrosa"
          },
          {
            en: "Constant yawning, or your head starting to nod",
            pt: "Bocejos constantes, ou a cabeça começando a cair de sono",
            es: "Bostezos constantes, o la cabeza empezando a caer de sueño"
          },
          {
            en: "Trouble remembering the last few kilometres you drove, or daydreaming",
            pt: "Dificuldade para lembrar dos últimos quilômetros que você dirigiu, ou devaneios",
            es: "Dificultad para recordar los últimos kilómetros que manejaste, o quedarte pensando en otra cosa"
          },
          {
            en: "Drifting out of your lane without noticing, or reacting slowly at lights and intersections",
            pt: "Sair da própria faixa sem perceber, ou demorar para reagir em sinais e cruzamentos",
            es: "Salirte del carril sin darte cuenta, o tardar en reaccionar en semáforos y cruces"
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "For long trips, Transport Victoria recommends driving no more than 8 hours within any 24 hour period, taking a break of at least 15 to 30 minutes every 2 hours or less, and getting out of the car to stretch each time instead of just sitting there. A 15 to 20 minute powernap can temporarily reduce the effects of fatigue for 1 to 2 hours, but it is a stopgap, not a fix, only real sleep resets it. Plan your stops before you leave using Transport Victoria's rest area map, and avoid starting a long drive after a full day of work, or overnight between 10pm and 6am, when your body expects to be asleep.",
          pt: "Para viagens longas, a Transport Victoria recomenda dirigir no máximo 8 horas dentro de qualquer período de 24 horas, fazer uma pausa de pelo menos 15 a 30 minutos a cada 2 horas ou menos, e sair do carro para se alongar a cada vez, em vez de só ficar sentado. Uma soneca de 15 a 20 minutos pode reduzir temporariamente os efeitos da fadiga por 1 a 2 horas, mas é um paliativo, não uma solução, só o sono de verdade reinicia o corpo. Planeje suas paradas antes de sair usando o mapa de áreas de descanso da Transport Victoria, e evite começar uma viagem longa depois de um dia inteiro de trabalho, ou durante a madrugada entre 22h e 6h, quando seu corpo espera estar dormindo.",
          es: "Para viajes largos, Transport Victoria recomienda conducir no más de 8 horas dentro de cualquier período de 24 horas, tomar un descanso de al menos 15 a 30 minutos cada 2 horas o menos, y salir del auto para estirarte cada vez, en vez de quedarte sentado. Una siesta corta de 15 a 20 minutos puede reducir temporalmente los efectos de la fatiga por 1 a 2 horas, pero es un paliativo, no una solución, solo el sueño de verdad reinicia el cuerpo. Planifica tus paradas antes de salir usando el mapa de áreas de descanso de Transport Victoria, y evita empezar un viaje largo después de un día entero de trabajo, o durante la madrugada entre las 10pm y las 6am, cuando tu cuerpo espera estar durmiendo."
        }
      },
      {
        type: "heading",
        text: {
          en: "Wildlife: what the numbers actually show",
          pt: "Animais na pista: o que os números realmente mostram",
          es: "Fauna en la vía: lo que los números realmente muestran"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "A Parliament of Victoria inquiry into wildlife roadstrike, reporting in November 2025, examined 5 years of Victoria Police data to 31 December 2024. In that period, striking or swerving to avoid a wild animal was a contributing factor in around 20 road deaths, about 1.7 per cent of everyone killed on Victorian roads, and in 921 injury collisions. Kangaroos or wallabies were involved in 68 per cent of those injury collisions, and 74 per cent happened on roads with an 80 km/h or higher speed limit. Most collisions happen at dawn or dusk, when animals are most active, and the inquiry's own finding is that driving slower reduces how severe a collision turns out to be.",
          pt: "Uma investigação do Parlamento de Victoria sobre colisões com animais na pista, divulgada em novembro de 2025, analisou 5 anos de dados da Victoria Police até 31 de dezembro de 2024. Nesse período, atropelar ou desviar bruscamente de um animal selvagem foi um fator contribuinte em cerca de 20 mortes no trânsito, cerca de 1,7 por cento de todas as pessoas mortas nas estradas de Victoria, e em 921 colisões com feridos. Cangurus ou wallabies estiveram envolvidos em 68 por cento dessas colisões com feridos, e 74 por cento aconteceram em vias com limite de velocidade de 80 km/h ou mais. A maioria das colisões acontece ao amanhecer ou ao entardecer, quando os animais estão mais ativos, e a própria conclusão da investigação é que dirigir mais devagar reduz a gravidade da colisão.",
          es: "Una investigación del Parlamento de Victoria sobre choques con animales en la vía, publicada en noviembre de 2025, analizó 5 años de datos de la Victoria Police hasta el 31 de diciembre de 2024. En ese período, atropellar o desviarse bruscamente para evitar un animal silvestre fue un factor contribuyente en alrededor de 20 muertes viales, cerca del 1,7 por ciento de todas las personas que murieron en las carreteras de Victoria, y en 921 choques con heridos. Canguros o wallabies estuvieron involucrados en el 68 por ciento de esos choques con heridos, y el 74 por ciento ocurrió en vías con un límite de velocidad de 80 km/h o más. La mayoría de los choques ocurre al amanecer o al atardecer, cuando los animales están más activos, y el propio hallazgo de la investigación es que conducir más despacio reduce la gravedad del choque."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "One gap the inquiry flagged directly: there is currently no official emergency response service for non-native wildlife such as deer. Wildlife Victoria, the volunteer-backed rescue service the state relies on, can only respond to native species, so deer strikes are not captured in its data and the real number is higher than what gets reported. The state's own Deer Control Program says deer are already affecting public safety as their population grows, particularly in peri-urban and eastern parts of Victoria. Worth knowing if you drive those areas: an adult Sambar deer, one of the species found in Victoria, can weigh up to 350 kilograms, several times heavier than a kangaroo, so a collision carries a lot more force.",
          pt: "Uma lacuna que a investigação apontou diretamente: atualmente não existe um serviço oficial de resposta a emergências para fauna não nativa, como o cervo. A Wildlife Victoria, o serviço de resgate apoiado por voluntários em que o estado se baseia, só consegue atender espécies nativas, então atropelamentos de cervos não entram nos dados dela e o número real é maior do que o relatado. O próprio Programa de Controle de Cervos do estado diz que os cervos já estão afetando a segurança pública conforme a população deles cresce, principalmente em áreas periurbanas e no leste de Victoria. Vale saber se você dirige nessas áreas: um cervo sambar adulto, uma das espécies encontradas em Victoria, pode pesar até 350 quilogramas, várias vezes mais pesado que um canguru, então uma colisão carrega bem mais força.",
          es: "Un vacío que la investigación señaló directamente: actualmente no existe un servicio oficial de respuesta a emergencias para fauna no nativa, como el ciervo. Wildlife Victoria, el servicio de rescate sostenido por voluntarios en el que se apoya el estado, solo puede responder a especies nativas, así que los choques con ciervos no quedan en sus datos y el número real es más alto de lo que se reporta. El propio Programa de Control de Ciervos del estado dice que los ciervos ya están afectando la seguridad pública a medida que crece su población, sobre todo en zonas periurbanas y en el este de Victoria. Vale la pena saberlo si conduces por esas zonas: un ciervo sambar adulto, una de las especies presentes en Victoria, puede pesar hasta 350 kilogramos, varias veces más pesado que un canguro, así que un choque lleva mucha más fuerza."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "If an animal appears on the road, the official advice is to brake in a controlled way and reduce speed, not to swerve violently, since swerving hard is more likely to roll your vehicle than a straight line braking stop is. If you hit a native animal, contact Wildlife Victoria rather than driving on.",
          pt: "Se um animal aparecer na pista, a orientação oficial é frear de forma controlada e reduzir a velocidade, e não desviar bruscamente, já que desviar com força tem mais chance de capotar seu veículo do que uma freada em linha reta. Se você atropelar um animal nativo, contate a Wildlife Victoria em vez de simplesmente seguir viagem.",
          es: "Si un animal aparece en la vía, la recomendación oficial es frenar de forma controlada y reducir la velocidad, no girar bruscamente, ya que girar con fuerza tiene más probabilidades de volcar tu vehículo que una frenada en línea recta. Si atropellas a un animal nativo, contacta a Wildlife Victoria en vez de simplemente seguir manejando."
        }
      },
      {
        type: "heading",
        text: {
          en: "Unsealed and gravel roads",
          pt: "Estradas sem pavimentação e de cascalho",
          es: "Caminos sin pavimentar y de ripio"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Reduce your speed and increase your following distance, loose gravel and potholes make it easier to lose control than on a sealed road",
            pt: "Reduza a velocidade e aumente a distância do carro da frente, cascalho solto e buracos facilitam a perda de controle em relação a uma estrada pavimentada",
            es: "Reduce la velocidad y aumenta la distancia con el auto de adelante, la grava suelta y los baches hacen que sea más fácil perder el control que en un camino pavimentado"
          },
          {
            en: "Dust thrown up by an oncoming vehicle can hide a real hazard behind it, another car, a dip, or a bend",
            pt: "A poeira levantada por um veículo que vem no sentido contrário pode esconder um perigo de verdade atrás dela, outro carro, uma depressão na pista, ou uma curva",
            es: "El polvo que levanta un vehículo que viene de frente puede ocultar un peligro real detrás de él, otro auto, un pozo en el camino, o una curva"
          },
          {
            en: "Unsealed surfaces get slippery when wet, and corrugated sections shake the wheel in your hands, steer and brake gently rather than sharply",
            pt: "Superfícies sem pavimentação ficam escorregadias quando molhadas, e trechos corrugados sacodem o volante nas suas mãos, dirija e freie com suavidade em vez de bruscamente",
            es: "Las superficies sin pavimentar se ponen resbaladizas cuando están mojadas, y los tramos con corrugación sacuden el volante en tus manos, dirige y frena con suavidad en vez de bruscamente"
          },
          {
            en: "Mud thrown onto your windscreen can cut your visibility with no warning",
            pt: "Lama jogada no para-brisa pode cortar sua visibilidade sem aviso nenhum",
            es: "El barro que salpica el parabrisas puede cortar tu visibilidad sin ningún aviso"
          },
          {
            en: "Avoid overtaking on a gravel or dirt road unless you can see the road ahead is clear and the surface is safe for it, a passing vehicle can throw gravel hard enough to crack a windscreen or chip paint",
            pt: "Evite ultrapassar em estrada de cascalho ou terra a não ser que você veja que a pista à frente está livre e a superfície é segura para isso, um veículo cruzando pode jogar cascalho com força suficiente para rachar um para-brisa ou lascar a pintura",
            es: "Evita adelantar en un camino de ripio o tierra a menos que veas que el camino de adelante está despejado y la superficie es segura para hacerlo, un vehículo que pasa puede lanzar piedras con fuerza suficiente para rajar un parabrisas o dañar la pintura"
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Planning your trip before you leave sealed roads",
          pt: "Planejando sua viagem antes de sair do asfalto",
          es: "Planificando tu viaje antes de dejar el asfalto"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Transport Victoria's own learner handbook recommends checking your fuel, oil, water and tyre pressure, including the spare, before a long journey, and carrying a high visibility vest, safety markers and a torch in the car. If you are heading off the main highways, take extra food, water, fuel and a spare tyre, since remote parts of Victoria can have long stretches with no towns or services at all. Work out realistically how many kilometres you can cover in a day rather than planning back-to-back long drives, and if you are leaving sealed roads or major highways, tell someone, family, a friend, or local police, your planned route and when you expect to arrive.",
          pt: "O próprio manual de learner da Transport Victoria recomenda conferir combustível, óleo, água e a pressão dos pneus, incluindo o estepe, antes de uma viagem longa, e levar no carro um colete refletivo, sinalizadores de segurança e uma lanterna. Se você vai sair das rodovias principais, leve comida, água, combustível e um pneu sobressalente extras, já que trechos remotos de Victoria podem ter longos trechos sem nenhuma cidade ou serviço por perto. Calcule de forma realista quantos quilômetros você consegue percorrer em um dia, em vez de planejar viagens longas uma atrás da outra, e se você vai sair do asfalto ou das rodovias principais, avise alguém, a família, um amigo, ou a polícia local, sobre a sua rota planejada e quando espera chegar.",
          es: "El propio manual de learner de Transport Victoria recomienda revisar combustible, aceite, agua y la presión de los neumáticos, incluida la de repuesto, antes de un viaje largo, y llevar en el auto un chaleco reflectante, señalizadores de seguridad y una linterna. Si vas a salir de las rutas principales, lleva comida, agua, combustible y un neumático de repuesto extra, ya que zonas remotas de Victoria pueden tener tramos largos sin ningún pueblo ni servicio cerca. Calcula de forma realista cuántos kilómetros puedes recorrer en un día en vez de planificar viajes largos uno detrás de otro, y si vas a dejar el asfalto o las rutas principales, avísale a alguien, tu familia, un amigo, o la policía local, tu ruta planeada y cuándo esperas llegar."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "VicTraffic (traffic.transport.vic.gov.au): real time road closures, bushfire activity and other disruptions, with alerts you can set for a route",
            pt: "VicTraffic (traffic.transport.vic.gov.au): fechamentos de vias em tempo real, atividade de incêndios florestais e outras interrupções, com alertas que você pode configurar para uma rota",
            es: "VicTraffic (traffic.transport.vic.gov.au): cierres de vías en tiempo real, actividad de incendios forestales y otras interrupciones, con alertas que puedes configurar para una ruta"
          },
          {
            en: "VicEmergency (emergency.vic.gov.au, or the VicEmergency app): official warnings for fire, flood, storm and other emergencies, set a Watch Zone for the area you are driving through, or call the VicEmergency Hotline on 1800 226 226, which can also arrange translated information through the Translating and Interpreting Service on 131 450",
            pt: "VicEmergency (emergency.vic.gov.au, ou o aplicativo VicEmergency): avisos oficiais de incêndio, enchente, tempestade e outras emergências, configure uma Watch Zone para a área por onde você vai passar, ou ligue para a VicEmergency Hotline no 1800 226 226, que também pode providenciar informações traduzidas através do Translating and Interpreting Service no 131 450",
            es: "VicEmergency (emergency.vic.gov.au, o la aplicación VicEmergency): avisos oficiales de incendio, inundación, tormenta y otras emergencias, configura una Watch Zone para la zona por la que vas a pasar, o llama a la VicEmergency Hotline al 1800 226 226, que también puede coordinar información traducida a través del Translating and Interpreting Service al 131 450"
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Mobile coverage gaps",
          pt: "Falhas na cobertura de celular",
          es: "Fallas en la cobertura celular"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Large parts of regional and remote Victoria sit outside reliable mobile coverage, particularly away from the highway corridors. The federal Mobile Black Spot Program has funded more than 1,400 new mobile base stations across regional and remote Australia since it began, and recent funding rounds specifically target areas prone to bushfires, storms and floods, but coverage gaps still exist, especially on minor roads and inside national parks.",
          pt: "Boa parte da Victoria regional e remota fica fora de uma cobertura de celular confiável, principalmente longe dos corredores das rodovias principais. O Mobile Black Spot Program, um programa federal, já financiou mais de 1.400 novas antenas de celular em áreas regionais e remotas da Austrália desde que começou, e as rodadas de financiamento mais recentes têm como alvo especificamente áreas propensas a incêndios florestais, tempestades e enchentes, mas ainda existem falhas de cobertura, principalmente em estradas secundárias e dentro de parques nacionais.",
          es: "Buena parte de la Victoria regional y remota queda fuera de una cobertura celular confiable, sobre todo lejos de los corredores de las rutas principales. El Mobile Black Spot Program, un programa federal, ya financió más de 1.400 nuevas antenas de celular en zonas regionales y remotas de Australia desde que comenzó, y las rondas de financiamiento más recientes apuntan específicamente a zonas propensas a incendios forestales, tormentas e inundaciones, pero todavía existen fallas de cobertura, sobre todo en caminos secundarios y dentro de parques nacionales."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Download offline maps before you leave mobile coverage, and remember that calling Triple Zero (000) still needs an actual signal, no app can create one out of nothing. The free Emergency+ app can show your GPS coordinates and a what3words address for your exact location, and what3words works without a data connection, so you can note your location before you lose signal and read it out once you do get through. This is exactly why telling someone your planned route before you leave matters as much as anything you pack in the car.",
          pt: "Baixe mapas offline antes de sair da área de cobertura, e lembre-se de que ligar para o Triple Zero (000) ainda precisa de sinal de verdade, nenhum aplicativo cria sinal do nada. O aplicativo gratuito Emergency+ pode mostrar suas coordenadas de GPS e um endereço what3words para a sua localização exata, e o what3words funciona sem conexão de dados, então você pode anotar sua localização antes de perder o sinal e ler em voz alta assim que conseguir completar a ligação. É exatamente por isso que avisar alguém sobre a sua rota planejada antes de sair importa tanto quanto qualquer coisa que você leve no carro.",
          es: "Descarga mapas sin conexión antes de salir de la cobertura, y recuerda que llamar al Triple Zero (000) igual necesita una señal real, ninguna aplicación puede crear una señal de la nada. La aplicación gratuita Emergency+ puede mostrar tus coordenadas GPS y una dirección what3words para tu ubicación exacta, y what3words funciona sin conexión de datos, así que puedes anotar tu ubicación antes de perder la señal y leerla en voz alta apenas logres comunicarte. Por eso avisarle a alguien tu ruta planeada antes de salir importa tanto como cualquier cosa que lleves en el auto."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This post draws on Transport Victoria, a 2025 Parliament of Victoria inquiry into wildlife roadstrike, Emergency Management Victoria and other official sources on driving conditions outside the capital, not on the actual test content. Use KangaLearner's Learn section and VIC practice questions to prepare for that.",
          pt: "Este post se baseia na Transport Victoria, em uma investigação do Parlamento de Victoria de 2025 sobre colisões com animais na pista, na Emergency Management Victoria e em outras fontes oficiais sobre as condições reais de direção fora da capital, e não no conteúdo da prova em si. Use a seção Aprender e as perguntas de prática de VIC do KangaLearner para se preparar para isso.",
          es: "Este artículo se basa en Transport Victoria, una investigación del Parlamento de Victoria de 2025 sobre choques con animales en la vía, Emergency Management Victoria y otras fuentes oficiales sobre las condiciones reales de manejo fuera de la capital, no en el contenido del examen en sí. Usa la sección Aprender y las preguntas de práctica de VIC de KangaLearner para prepararte para eso."
        }
      }
    ]
  },
  {
    slug: "vic-motorcycle-learner-licence-guide",
    icon: "checklist",
    state: "VIC",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "How Victoria's motorcycle learner permit actually works",
      pt: "Como funciona a licença de aprendiz de moto em Victoria",
      es: "Cómo funciona el permiso de aprendiz de moto en Victoria"
    },
    excerpt: {
      en: "Victoria's motorcycle learner permit is nothing like the car process: a compulsory two-day course, no logbook, and its own approved helmet standards. Here is how it actually works.",
      pt: "A licença de aprendiz de moto em Victoria não se parece em nada com o processo do carro: curso obrigatório de dois dias, sem caderneta, e padrões próprios de capacete aprovado. Veja como funciona de verdade.",
      es: "El permiso de aprendiz de moto en Victoria no se parece en nada al proceso del auto: curso obligatorio de dos días, sin libreta, y estándares propios de casco aprobado. Esto es cómo funciona de verdad."
    },
    sourceLabel: {
      en: "Transport Victoria, Get your motorcycle Ls",
      pt: "Transport Victoria, Get your motorcycle Ls",
      es: "Transport Victoria, Get your motorcycle Ls"
    },
    sourceUrl:
      "https://transport.vic.gov.au/road-and-active-transport/registration-and-licensing/licences/motorcycle-licence/get-your-motorcycle-ls",
    body: [
      {
        type: "paragraph",
        text: {
          en: "Victoria treats motorcycles as a completely separate licensing track from cars, not just a different test. This post is only about the motorcycle learner licence: how to get it, what changes once you are riding on your Ls, and the approved helmet standards you need to know before you buy one. It does not repeat the general Victorian road rules already covered elsewhere on this blog. Everything below is based on Transport Victoria's own motorcycle licensing pages and Victoria's actual road rules.",
          pt: "A Victoria trata motocicletas como uma trilha de licenciamento completamente separada dos carros, não é só uma prova diferente. Este post é só sobre a licença de aprendiz de moto: como conseguir, o que muda quando você já está andando com a sua L, e os padrões de capacete aprovados que você precisa conhecer antes de comprar um. Ele não repete as regras gerais de trânsito de Victoria já cobertas em outro post deste blog. Tudo abaixo é baseado nas próprias páginas de licenciamento de motociclistas da Transport Victoria e nas regras de trânsito reais do estado.",
          es: "Victoria trata las motocicletas como un camino de licenciamiento completamente separado del de los autos, no es solo un examen distinto. Este artículo es solo sobre el permiso de aprendiz de moto: cómo conseguirlo, qué cambia cuando ya estás circulando con tu L, y los estándares de casco aprobados que necesitas conocer antes de comprar uno. No repite las reglas generales de tránsito de Victoria que ya se cubrieron en otro artículo de este blog. Todo lo de abajo está basado en las propias páginas de licenciamiento de motociclistas de Transport Victoria y en las reglas de tránsito reales del estado."
        }
      },
      {
        type: "heading",
        text: {
          en: "Getting your motorcycle Ls looks nothing like getting your car Ls",
          pt: "Conseguir sua L de moto não se parece em nada com conseguir sua L de carro",
          es: "Conseguir tu L de moto no se parece en nada a conseguir tu L de auto"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "In Victoria, you can apply for a car learner permit at 16, and after passing a knowledge test you drive supervised by a full licence holder while logging 120 hours in a logbook. Motorcycles work differently at every step. You must be at least 18 to apply for a motorcycle learner permit, and there is no requirement to already hold a car licence first. To actually get your motorcycle Ls, you do not sit a standalone knowledge test at a service centre. You book and complete a compulsory two-day course with a VicRoads-accredited training and assessing provider, and passing that course is what gets you your permit. There is also no logbook and no supervising rider once you are on your Ls, because a motorcycle learner is never allowed to carry a pillion passenger, so every ride from day one is solo.",
          pt: "Em Victoria, você pode aplicar para a licença de aprendiz de carro aos 16 anos, e depois de passar numa prova de conhecimentos você dirige supervisionado por alguém com carteira definitiva enquanto registra 120 horas numa caderneta. Com moto, tudo funciona diferente, em cada etapa. Você precisa ter pelo menos 18 anos para aplicar para a licença de aprendiz de moto, e não existe exigência de já ter uma carteira de carro antes. Para conseguir sua licença de aprendiz de moto de verdade, você não faz uma prova de conhecimentos isolada num centro de atendimento. Você marca e completa um curso obrigatório de dois dias com um provedor de treinamento e avaliação credenciado pela VicRoads, e passar nesse curso é o que te dá a sua licença. Também não existe caderneta nem motorista supervisor depois que você está com sua L, porque um aprendiz de moto nunca pode levar um passageiro na garupa, então todo trajeto desde o primeiro dia é sozinho.",
          es: "En Victoria, puedes solicitar el permiso de aprendiz de auto a los 16 años, y después de aprobar un examen de conocimientos conduces supervisado por alguien con licencia plena mientras registras 120 horas en una libreta. Con la moto todo funciona distinto, en cada paso. Necesitas tener al menos 18 años para solicitar el permiso de aprendiz de moto, y no hay ningún requisito de tener ya una licencia de auto antes. Para conseguir tu permiso de aprendiz de moto de verdad, no rindes un examen de conocimientos aislado en un centro de atención. Reservas y completas un curso obligatorio de dos días con un proveedor de entrenamiento y evaluación acreditado por VicRoads, y aprobar ese curso es lo que te da tu permiso. Tampoco hay libreta ni conductor supervisor una vez que tienes tu L, porque a un aprendiz de moto nunca se le permite llevar un pasajero en el asiento trasero, así que cada viaje desde el primer día es en solitario."
        }
      },
      {
        type: "heading",
        text: {
          en: "Stage one: the compulsory two-day learner course",
          pt: "Etapa um: o curso obrigatório de dois dias pra virar aprendiz",
          es: "Etapa uno: el curso obligatorio de dos días para ser aprendiz"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "To be eligible you must be 18 or older, a Victorian resident, medically fit to ride, and not disqualified or under a Fines Victoria licence sanction. If a medical condition or medication could affect your riding, you need to provide medical reports before you can book.",
            pt: "Para ser elegível você precisa ter 18 anos ou mais, morar em Victoria, estar apto fisicamente para pilotar, e não estar desqualificado nem sob uma sanção de licença da Fines Victoria. Se uma condição médica ou medicamento puder afetar sua pilotagem, você precisa apresentar relatórios médicos antes de poder marcar.",
            es: "Para ser elegible debes tener 18 años o más, vivir en Victoria, estar en condiciones médicas para andar en moto, y no estar descalificado ni bajo una sanción de licencia de Fines Victoria. Si una condición médica o un medicamento pudiera afectar tu manejo, necesitas presentar informes médicos antes de poder reservar."
          },
          {
            en: "The course runs the same way at every accredited training centre in the state, over two days. It includes an eyesight test, a paper-based motorcycle knowledge test of 32 multiple-choice questions where you need 25 correct to pass (78%), and progressive coaching followed by an on-road and an off-road practical assessment on day two.",
            pt: "O curso funciona do mesmo jeito em todos os centros de treinamento credenciados do estado, ao longo de dois dias. Ele inclui um teste de visão, uma prova de conhecimentos de moto em papel com 32 questões de múltipla escolha, onde você precisa acertar 25 pra passar (78%), e treinamento progressivo, seguido de uma avaliação prática na rua e outra em área fechada, no segundo dia.",
            es: "El curso funciona igual en todos los centros de entrenamiento acreditados del estado, a lo largo de dos días. Incluye un examen de vista, un examen de conocimientos de moto en papel con 32 preguntas de opción múltiple, donde necesitas acertar 25 para aprobar (78%), y entrenamiento progresivo, seguido de una evaluación práctica en la calle y otra en un área cerrada, el segundo día."
          },
          {
            en: "The course fee is set by whichever accredited provider you book with, so it varies and is not a fixed government price. Separately, the government's own learner permit issue fee is currently waived under Victoria's Motorist Package and Safe Driver Discount, so you are mainly paying the provider for the course itself.",
            pt: "A taxa do curso é definida pelo provedor credenciado que você escolher, então ela varia e não é um valor fixo do governo. Separadamente, a própria taxa de emissão da licença de aprendiz está isenta atualmente pelo Motorist Package and Safe Driver Discount de Victoria, então você paga principalmente pelo curso em si.",
            es: "La tarifa del curso la fija el proveedor acreditado que elijas, así que varía y no es un monto fijo del gobierno. Aparte, la propia tarifa de emisión del permiso de aprendiz está exenta actualmente por el Motorist Package and Safe Driver Discount de Victoria, así que pagas principalmente por el curso en sí."
          },
          {
            en: "Pass the course and you are issued a Victorian motorcycle learner permit valid for 15 months. Your provider collects the fee and hands you a receipt to carry until your plastic card arrives by post. If you already have a digital driver licence, you can use that in the meantime instead.",
            pt: "Se você passar no curso, recebe a licença de aprendiz de moto de Victoria, válida por 15 meses. O provedor cobra a taxa e te entrega um recibo pra carregar até o cartão físico chegar pelo correio. Se você já tem carteira digital, pode usá-la nesse meio tempo.",
            es: "Si apruebas el curso, te dan el permiso de aprendiz de moto de Victoria, válido por 15 meses. El proveedor cobra la tarifa y te entrega un comprobante para llevar contigo hasta que llegue tu tarjeta física por correo. Si ya tienes licencia digital, puedes usarla mientras tanto."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "What changes once you are riding on your Ls",
          pt: "O que muda quando você já está andando com a sua L",
          es: "Qué cambia cuando ya estás circulando con tu L"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Ride with your headlight on at all times, and wear an approved high-visibility vest or jacket that is properly fastened and carries a compliance label, such as AS/NZS 4602.1:2011 or an equivalent recognised international standard.",
            pt: "Pilote com o farol aceso o tempo todo, e use um colete ou jaqueta de alta visibilidade aprovado, bem fechado e preso, com uma etiqueta de conformidade, como a AS/NZS 4602.1:2011 ou um padrão internacional reconhecido equivalente.",
            es: "Anda con la luz delantera encendida todo el tiempo, y usa un chaleco o chaqueta de alta visibilidad aprobado, bien cerrado y ajustado, con una etiqueta de conformidad, como la AS/NZS 4602.1:2011 o un estándar internacional reconocido equivalente."
          },
          {
            en: "Display your L plate on the rear of the motorcycle so it is clearly visible from 20 metres away, at all times while riding.",
            pt: "Exiba a placa L na traseira da moto, de forma que fique claramente visível a 20 metros de distância, o tempo todo enquanto estiver pilotando.",
            es: "Muestra la placa L en la parte trasera de la moto, de forma que se vea claramente desde 20 metros de distancia, todo el tiempo mientras conduces."
          },
          {
            en: "You can only ride a motorcycle on Victoria's Learner Approved Motorcycle Scheme (LAMS) list. A bike is excluded if its engine capacity is over 660cc, its power-to-weight ratio is over 150 kilowatts per tonne, or it has been modified for more power by anyone other than the manufacturer.",
            pt: "Você só pode pilotar uma moto que esteja na lista do Learner Approved Motorcycle Scheme (LAMS) de Victoria. Uma moto fica de fora se a cilindrada do motor passar de 660cc, se a relação peso-potência passar de 150 quilowatts por tonelada, ou se o motor tiver sido modificado para ficar mais potente por qualquer pessoa que não seja o fabricante.",
            es: "Solo puedes andar en una moto que esté en la lista del Learner Approved Motorcycle Scheme (LAMS) de Victoria. Una moto queda excluida si la cilindrada del motor supera los 660cc, si la relación peso potencia supera los 150 kilovatios por tonelada, o si el motor fue modificado para ganar más potencia por alguien que no sea el fabricante."
          },
          {
            en: "You can never carry a pillion passenger, must keep a zero blood alcohol concentration, and cannot tow a trailer or another vehicle.",
            pt: "Você nunca pode levar passageiro na garupa, precisa manter zero de álcool no sangue, e não pode rebocar trailer nem outro veículo.",
            es: "Nunca puedes llevar pasajero en el asiento trasero, debes mantener cero alcohol en sangre, y no puedes remolcar un remolque ni otro vehículo."
          },
          {
            en: "Lane filtering, moving between slow or stopped traffic at up to 30 km/h, is legal in Victoria for licensed riders but not for learners. Lane splitting between moving traffic is illegal for everyone, at any licence stage.",
            pt: "Filtragem entre faixas, ou seja, passar por trânsito lento ou parado a até 30 km/h, é legal em Victoria para quem já tem carteira, mas não para aprendizes. Passar entre faixas com o trânsito em movimento é ilegal para todo mundo, em qualquer estágio da licença.",
            es: "El filtrado entre carriles, es decir, pasar entre tránsito lento o detenido a hasta 30 km/h, es legal en Victoria para quienes ya tienen licencia, pero no para aprendices. Pasar entre carriles con el tránsito en movimiento es ilegal para todos, en cualquier etapa de la licencia."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Stage two: earning your full motorcycle licence",
          pt: "Etapa dois: conquistando sua licença completa de moto",
          es: "Etapa dos: cómo ganar tu licencia completa de moto"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "You cannot sit the motorcycle licence test the moment you get your Ls. You need to have held an Australian motorcycle learner permit for at least three months, unless you have previously held an Australian or overseas motorcycle licence. On the day, you retake the eyesight test and sit a computer-based hazard perception test, which is waived if you already hold a driver's licence. Many riders also need to complete what Transport Victoria calls a check ride first, a half-day coaching session covering an off-road review of your braking, steering and low-speed control, plus an on-road coaching ride, done at least one month before the licence test. This is waived only if you are converting an interstate or overseas motorcycle licence. The final test itself checks specific manoeuvres, including a controlled stop, a sharp left turn, a slow ride, a change of path, a safe path through a curve and a quick stop, plus on-road observation, safe speed choice and lane position.",
          pt: "Você não pode fazer a prova da licença de moto assim que recebe sua L. É preciso ter tido uma licença de aprendiz de moto australiana por pelo menos três meses, a não ser que você já tenha tido uma licença de moto australiana ou estrangeira antes. No dia, você refaz o teste de visão e faz uma prova de percepção de risco no computador, que é dispensada se você já tiver carteira de motorista. Muitos motociclistas também precisam completar antes o que a Transport Victoria chama de check ride, uma sessão de coaching de meio período que inclui uma revisão fora da pista da sua frenagem, direção e controle em baixa velocidade, mais um trajeto de coaching na rua, feito pelo menos um mês antes da prova da licença. Isso só é dispensado se você estiver convertendo uma licença de moto de outro estado australiano ou estrangeira. A prova final em si avalia manobras específicas, incluindo uma parada controlada, uma curva fechada à esquerda, um trajeto lento, uma mudança de trajetória, uma curva segura e uma parada rápida, além de observação na rua, escolha de velocidade segura e posicionamento na faixa.",
          es: "No puedes rendir el examen de la licencia de moto apenas recibes tu L. Necesitas haber tenido un permiso de aprendiz de moto australiano durante al menos tres meses, a menos que ya hayas tenido antes una licencia de moto australiana o extranjera. Ese día, vuelves a rendir el examen de vista y rindes un examen de percepción de riesgos por computadora, que se exime si ya tienes licencia de conducir. Muchos motociclistas también necesitan completar antes lo que Transport Victoria llama un check ride, una sesión de coaching de medio día que incluye una revisión fuera de la pista de tu frenado, dirección y control a baja velocidad, más un recorrido de coaching por la calle, hecho al menos un mes antes del examen de la licencia. Esto se exime solo si estás convirtiendo una licencia de moto de otro estado australiano o extranjera. El examen final en sí evalúa maniobras específicas, incluyendo una parada controlada, un giro cerrado a la izquierda, un recorrido lento, un cambio de trayectoria, una curva segura y una parada rápida, además de observación en la calle, elección de velocidad segura y posición en el carril."
        }
      },
      {
        type: "heading",
        text: {
          en: "Approved helmet standards",
          pt: "Padrões de capacete aprovados",
          es: "Estándares de casco aprobados"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Victoria's road rules only recognise a motorcycle helmet as approved if it meets one of three standards: the older AS 1698-1988, the current AS/NZS 1698:2006, or United Nations ECE Regulation 22. Check for a compliance sticker or marking inside the helmet before you buy, since a helmet without one is not legal to ride in even if it looks the part. Beyond the helmet, Transport Victoria only recommends, rather than requires, a full-face design plus a protective jacket, pants, gloves and boots, and points riders to MotoCAP, an independent program that rates protective gear for impact protection, abrasion resistance and comfort so you can compare products before buying.",
          pt: "As regras de trânsito de Victoria só reconhecem um capacete de moto como aprovado se ele atender a um de três padrões: o mais antigo, AS 1698-1988, o atual AS/NZS 1698:2006, ou o Regulamento 22 da ONU (UN ECE Regulation 22). Confira se há um selo ou marcação de conformidade dentro do capacete antes de comprar, já que um capacete sem isso não é legal pra pilotar, mesmo que pareça adequado. Além do capacete, a Transport Victoria só recomenda, sem exigir, um modelo integral, mais jaqueta, calça, luvas e botas de proteção, e indica o MotoCAP, um programa independente que avalia equipamentos de proteção quanto a impacto, resistência à abrasão e conforto, pra você comparar produtos antes de comprar.",
          es: "Las reglas de tránsito de Victoria solo reconocen un casco de moto como aprobado si cumple con uno de tres estándares: el más antiguo, AS 1698-1988, el actual AS/NZS 1698:2006, o el Reglamento 22 de la ONU (UN ECE Regulation 22). Revisa que haya una etiqueta o marca de cumplimiento dentro del casco antes de comprar, ya que un casco sin eso no es legal para andar, aunque parezca adecuado. Más allá del casco, Transport Victoria solo recomienda, sin exigir, un diseño integral, además de chaqueta, pantalón, guantes y botas de protección, y remite a los motociclistas a MotoCAP, un programa independiente que califica el equipo de protección según impacto, resistencia a la abrasión y comodidad, para que puedas comparar productos antes de comprar."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This post covers what Transport Victoria's own motorcycle licensing pages and Victoria's road rules say about getting your motorcycle Ls. The Victorian Rider Handbook remains the official study material for the motorcycle knowledge test itself. Use KangaLearner's Learn section and VIC practice questions to prepare for what the test actually asks.",
          pt: "Este post cobre o que as próprias páginas de licenciamento de motociclistas da Transport Victoria e as regras de trânsito de Victoria dizem sobre como conseguir sua licença de aprendiz de moto. O Victorian Rider Handbook continua sendo o material de estudo oficial para a prova de conhecimentos de moto em si. Use a seção Aprender e as perguntas de prática de VIC do KangaLearner pra se preparar pro que a prova realmente pergunta.",
          es: "Este artículo cubre lo que dicen las propias páginas de licenciamiento de motociclistas de Transport Victoria y las reglas de tránsito de Victoria sobre cómo conseguir tu permiso de aprendiz de moto. El Victorian Rider Handbook sigue siendo el material de estudio oficial para el examen de conocimientos de moto en sí. Usa la sección Aprender y las preguntas de práctica de VIC de KangaLearner para prepararte para lo que el examen realmente pregunta."
        }
      }
    ]
  },
  {
    slug: "vic-common-driving-mistakes-guide",
    icon: "safety",
    state: "VIC",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 8,
    title: {
      en: "Common driving mistakes in Victoria: what the road rules actually say",
      pt: "Erros comuns ao dirigir em Victoria: o que as regras de trânsito realmente dizem",
      es: "Errores comunes al conducir en Victoria: lo que realmente dicen las reglas de tránsito"
    },
    excerpt: {
      en: "Give way rules that are not just about who is on the right, indicators that do not create right of way, and lane lines that allow less than most people assume. Here are the road rule myths that trip up newcomers in Victoria, based on Transport Victoria's own pages.",
      pt: "Regras de dar passagem que não são só sobre quem está à direita, seta que não cria prioridade nenhuma, e linhas de faixa que permitem menos do que a maioria pensa. Veja os mitos de trânsito que mais confundem quem chega em Victoria, com base nas próprias páginas da Transport Victoria.",
      es: "Reglas de ceder el paso que no son solo sobre quién está a la derecha, el intermitente que no crea prioridad, y líneas de carril que permiten menos de lo que la mayoría cree. Estos son los mitos de tránsito que más confunden a los recién llegados en Victoria, basados en las propias páginas de Transport Victoria."
    },
    sourceLabel: {
      en: "Transport Victoria, Road rules and safety",
      pt: "Transport Victoria, Road rules and safety",
      es: "Transport Victoria, Road rules and safety"
    },
    sourceUrl: "https://transport.vic.gov.au/road-and-active-transport/road-rules-and-safety",
    body: [
      {
        type: "paragraph",
        text: {
          en: "If you already read our general guide to driving in Victoria, this post goes deeper into a specific problem: the road rules that catch newcomers out most, not because they are careless, but because the real rule is more specific than the version everyone repeats, or works differently from wherever they learned to drive. Every rule below comes directly from Transport Victoria's own road rules and safety pages, so you can check each one against the source yourself.",
          pt: "Se você já leu nosso guia geral sobre dirigir em Victoria, este post vai mais fundo num problema específico: as regras de trânsito que mais pegam quem chega de fora, não porque as pessoas são desatentas, mas porque a regra real é mais específica do que a versão que todo mundo repete, ou funciona diferente de onde essa pessoa aprendeu a dirigir. Cada regra abaixo vem direto das próprias páginas de regras de trânsito e segurança da Transport Victoria, então você pode conferir cada uma na fonte.",
          es: "Si ya leíste nuestra guía general sobre conducir en Victoria, este artículo va más profundo en un problema específico: las reglas de tránsito que más confunden a los recién llegados, no porque sean descuidados, sino porque la regla real es más específica que la versión que todo el mundo repite, o funciona distinto de donde esa persona aprendió a manejar. Cada regla de abajo viene directamente de las propias páginas de reglas de tránsito y seguridad de Transport Victoria, así que puedes revisar cada una en la fuente."
        }
      },
      {
        type: "heading",
        text: {
          en: "Give way is not just about who is on the right",
          pt: "Dar passagem não é só sobre quem está à direita",
          es: "Ceder el paso no es solo cuestión de quién está a la derecha"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "At an intersection with a 'stop' or 'give way' sign or line, give way to any vehicle in, entering or approaching the intersection. The exceptions are a vehicle making a U-turn, a vehicle turning left using a slip lane, and an oncoming vehicle turning right that is also facing its own 'stop' or 'give way' sign.",
            pt: "Num cruzamento com placa ou linha de pare ou dê passagem, dê passagem para qualquer veículo que esteja no cruzamento, entrando nele ou se aproximando dele. As exceções são um veículo fazendo retorno, um veículo virando à esquerda por uma pista de conversão separada (a chamada slip lane), e um veículo vindo de frente virando à direita que também está numa placa de pare ou dê passagem.",
            es: "En un cruce con señal o línea de pare o ceda el paso, cede el paso a cualquier vehículo que esté en el cruce, entrando a él o acercándose a él. Las excepciones son un vehículo haciendo un giro en U, un vehículo girando a la izquierda por un carril de giro separado (slip lane), y un vehículo que viene de frente girando a la derecha y que también está frente a una señal de pare o ceda el paso."
          },
          {
            en: "At an intersection with no traffic lights, signs or lines at all, give way to any vehicle entering or approaching from your right. If you are turning right, you also give way to oncoming vehicles going straight ahead or turning left. You do not need to give way to a car using a slip lane.",
            pt: "Num cruzamento sem semáforo, placa ou linha nenhuma, dê passagem para qualquer veículo entrando ou se aproximando pela sua direita. Se você estiver virando à direita, também dê passagem para os veículos que vêm de frente indo reto ou virando à esquerda. Você não precisa dar passagem para um carro que está usando uma slip lane.",
            es: "En un cruce sin semáforos, señales ni líneas de ningún tipo, cede el paso a cualquier vehículo que entre o se acerque desde tu derecha. Si estás girando a la derecha, también cedes el paso a los vehículos que vienen de frente yendo derecho o girando a la izquierda. No necesitas ceder el paso a un auto que esté usando una slip lane."
          },
          {
            en: "At a T-intersection, forget left and right altogether. You give way to every vehicle travelling on the continuing road, the one you are turning into, no matter which way you are turning. Treating a T-intersection like a normal give-way-to-the-right situation is an easy mistake to make.",
            pt: "Num cruzamento em T, esqueça esquerda e direita. Você dá passagem para todos os veículos que estão na via principal, aquela em que você está entrando, não importa para que lado você esteja virando. Tratar um cruzamento em T como se fosse a regra normal de dar passagem para quem vem da direita é um erro fácil de cometer.",
            es: "En un cruce en T, olvídate de izquierda y derecha. Cedes el paso a todos los vehículos que circulan por la vía a la que te estás incorporando, sin importar hacia qué lado estés girando. Tratar un cruce en T como si fuera la regla normal de ceder el paso a quien viene por la derecha es un error fácil de cometer."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "U-turns are legal by default, and you give way to everyone",
          pt: "Retornos são legais por padrão, e você dá passagem para todo mundo",
          es: "Los giros en U son legales por defecto, y cedes el paso a todos"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Victoria's default is the opposite of some other Australian states, where a U-turn is only allowed if a sign specifically permits it. In Victoria you can U-turn unless there is a single or double continuous line down the centre of the road, a 'no right-hand turn' sign, or a 'no U-turn' sign. When you do U-turn, you must give way to every other vehicle and pedestrian, including one turning left from a slip lane or side street that is itself facing a 'give way' or 'stop' sign. Being mid U-turn never puts you ahead of anyone.",
          pt: "O padrão de Victoria é o oposto do que outros estados australianos usam, onde um retorno só é permitido se uma placa autorizar especificamente. Em Victoria, você pode fazer retorno a não ser que haja uma linha contínua simples ou dupla no meio da via, uma placa de proibido virar à direita, ou uma placa de proibido retorno. Ao fazer o retorno, você precisa dar passagem para todos os outros veículos e pedestres, incluindo um veículo virando à esquerda numa slip lane ou numa rua lateral que esteja ele mesmo numa placa de dê passagem ou pare. Estar no meio de um retorno nunca coloca você à frente de ninguém.",
          es: "El estándar de Victoria es lo opuesto al de otros estados australianos, donde un giro en U solo está permitido si una señal lo autoriza específicamente. En Victoria puedes hacer un giro en U a menos que haya una línea continua simple o doble en el centro de la vía, una señal de prohibido girar a la derecha, o una señal de prohibido girar en U. Al hacer el giro en U, debes ceder el paso a todos los demás vehículos y peatones, incluido uno girando a la izquierda desde una slip lane o una calle lateral que esté a su vez frente a una señal de ceda el paso o pare. Estar a mitad de un giro en U nunca te pone por delante de nadie."
        }
      },
      {
        type: "heading",
        text: {
          en: "Your indicator does not give you the right of way",
          pt: "Sua seta não te dá prioridade nenhuma",
          es: "El intermitente no te da prioridad"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Indicating shows your intention, it does not create a right of way. Turning left across a bike lane, you must give way to a cyclist travelling straight ahead before you start the turn, even with your indicator on. Turning at any intersection or driveway, you must give way to pedestrians crossing the road you are turning into. The same logic applies off the main road: entering or leaving a road from a driveway, the side of the road, a gap in a median strip, or nearby land, you give way to all vehicles and all pedestrians, not just the ones you notice first.",
          pt: "Usar a seta mostra sua intenção, ela não cria prioridade nenhuma. Ao virar à esquerda cruzando uma ciclofaixa, você precisa dar passagem para um ciclista indo reto antes de começar a conversão, mesmo com a seta ligada. Ao virar em qualquer cruzamento ou entrada de garagem, você precisa dar passagem para os pedestres que estão atravessando a via para a qual você está virando. A mesma lógica vale fora da via principal: ao entrar ou sair de uma via por uma garagem, pela lateral da via, por uma abertura no canteiro central, ou por um terreno vizinho, você dá passagem para todos os veículos e todos os pedestres, não só para os que você percebe primeiro.",
          es: "Poner el intermitente muestra tu intención, no crea ningún derecho de paso. Al girar a la izquierda cruzando un carril para bicicletas, debes ceder el paso a un ciclista que va derecho antes de empezar el giro, incluso con el intermitente puesto. Al girar en cualquier cruce o entrada de garaje, debes ceder el paso a los peatones que están cruzando la vía a la que te estás incorporando. La misma lógica aplica fuera de la vía principal: al entrar o salir de una vía por un garaje, por el costado de la vía, por una abertura en la mediana, o por un terreno vecino, cedes el paso a todos los vehículos y a todos los peatones, no solo a los que notas primero."
        }
      },
      {
        type: "heading",
        text: {
          en: "Lane lines allow less than most people assume",
          pt: "As linhas de faixa permitem menos do que a maioria pensa",
          es: "Las líneas de carril permiten menos de lo que la mayoría cree"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Double continuous lines can only be crossed to get around something actually blocking the road. That exception specifically excludes other vehicles travelling slowly or stopped in traffic, so a queue or a jam does not give you permission to cross, even briefly.",
            pt: "Linhas contínuas duplas só podem ser cruzadas para desviar de algo que esteja realmente bloqueando a via. Essa exceção exclui especificamente outros veículos andando devagar ou parados no trânsito, então uma fila ou um engarrafamento não te dá permissão para cruzar, nem que seja rapidinho.",
            es: "Las líneas continuas dobles solo se pueden cruzar para esquivar algo que realmente esté bloqueando la vía. Esa excepción excluye específicamente a otros vehículos que van despacio o están detenidos en el tránsito, así que una fila o un embotellamiento no te da permiso para cruzar, ni siquiera un momento."
          },
          {
            en: "A single continuous line, or a broken line on the right of a continuous one, lets you cross to enter or leave the road, or to overtake a bicycle rider when you have a clear view and it is safe. It does not let you overtake another vehicle or make a U-turn.",
            pt: "Uma linha contínua simples, ou uma linha tracejada à direita de uma contínua, permite cruzar para entrar ou sair da via, ou para ultrapassar um ciclista quando você tem visão livre e é seguro. Ela não permite ultrapassar outro veículo nem fazer retorno.",
            es: "Una línea continua simple, o una línea discontinua a la derecha de una continua, te permite cruzar para entrar o salir de la vía, o para adelantar a un ciclista cuando tienes buena visibilidad y es seguro. No te permite adelantar a otro vehículo ni hacer un giro en U."
          },
          {
            en: "Overtaking on the left is the exception everywhere, not a normal option. On a multi-lane road with no marked lanes, you can only pass a vehicle on its left if that vehicle is turning right or is not moving.",
            pt: "Ultrapassar pela esquerda é a exceção em todo lugar, não é uma opção normal. Numa via com mais de uma faixa sem faixas demarcadas, você só pode ultrapassar um veículo pela esquerda se ele estiver virando à direita ou parado.",
            es: "Adelantar por la izquierda es la excepción en todas partes, no una opción normal. En una vía de más de un carril sin carriles marcados, solo puedes pasar a un vehículo por la izquierda si ese vehículo está girando a la derecha o no se está moviendo."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Two rules that catch almost everyone off guard",
          pt: "Duas regras que pegam quase todo mundo de surpresa",
          es: "Dos reglas que sorprenden a casi todo el mundo"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "In a built-up area, you must give way to a bus that is signalling to pull out from the kerb and displaying a 'Give Way To Buses' sign. It is easy to drive past expecting the bus to wait for a gap, but the rule puts the obligation on you.",
            pt: "Numa área urbana, você precisa dar passagem para um ônibus que está sinalizando para sair do meio-fio e exibindo uma placa chamada 'Give Way To Buses' (dê passagem para ônibus). É fácil passar direto esperando que o ônibus espere uma brecha, mas a regra coloca a obrigação em você.",
            es: "En una zona urbana, debes ceder el paso a un bus que está señalizando para salir del borde de la acera y muestra una señal llamada 'Give Way To Buses' (ceda el paso a los buses). Es fácil pasar de largo esperando que el bus espere un espacio, pero la regla pone la obligación en ti."
          },
          {
            en: "Changing lanes and zip merging follow different rules. Where lane markings are still visible, you give way to any vehicle already in the lane you are moving into. Where two lines of traffic merge into one with no lines marked on the road at all, called zip merging, you instead give way to whichever vehicle has any part of its vehicle ahead of yours, regardless of which side it is on.",
            pt: "Trocar de faixa e fazer zip merge seguem regras diferentes. Onde as marcações de faixa ainda estão visíveis, você dá passagem para qualquer veículo que já esteja na faixa para a qual você está indo. Onde duas linhas de tráfego se juntam em uma só, sem nenhuma linha marcada na via, o chamado zip merge, você dá passagem para o veículo que tiver qualquer parte dele à frente do seu, não importa de que lado ele esteja.",
            es: "Cambiar de carril y hacer zip merge siguen reglas distintas. Donde las líneas del carril todavía se ven, cedes el paso a cualquier vehículo que ya esté en el carril al que te estás pasando. Donde dos filas de tráfico se juntan en una sola, sin ninguna línea marcada en la vía, lo que se conoce como zip merge, cedes el paso a cualquier vehículo que tenga cualquier parte de su auto por delante del tuyo, sin importar de qué lado esté."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "The right lane is not free just because you are at the speed limit",
          pt: "A faixa da direita não está liberada só porque você está no limite de velocidade",
          es: "El carril derecho no está libre solo porque vas al límite de velocidad"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "On any multi-lane road with a speed limit over 80 km/h, you must keep out of the right lane unless you are overtaking, turning right, or all lanes are congested. Driving in the right lane at exactly the speed limit still breaks this rule if none of those apply, since it is about lane position, not speed.",
          pt: "Em qualquer via com mais de uma faixa e limite de velocidade acima de 80 km/h, você precisa ficar fora da faixa da direita a não ser que esteja ultrapassando, virando à direita, ou que todas as faixas estejam congestionadas. Dirigir na faixa da direita exatamente no limite de velocidade ainda quebra essa regra se nenhuma dessas condições se aplicar, porque a regra é sobre a posição na faixa, não sobre a velocidade.",
          es: "En cualquier vía de más de un carril con un límite de velocidad superior a 80 km/h, debes mantenerte fuera del carril derecho a menos que estés adelantando, girando a la derecha, o que todos los carriles estén congestionados. Manejar por el carril derecho justo al límite de velocidad igual infringe esta regla si ninguna de esas condiciones se cumple, porque la regla es sobre la posición en el carril, no sobre la velocidad."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "None of this replaces Transport Victoria's own pages, which get updated and cover more situations than one post can. Treat it as a checklist of the mistakes worth double-checking before you drive, and use KangaLearner's Learn section and VIC practice questions to prepare for the actual test content.",
          pt: "Nada disso substitui as próprias páginas da Transport Victoria, que são atualizadas e cobrem mais situações do que um post consegue. Use isso como uma lista de conferência dos erros que vale a pena checar antes de dirigir, e use a seção Aprender e as perguntas de prática de VIC do KangaLearner para se preparar para o conteúdo real da prova.",
          es: "Nada de esto reemplaza las propias páginas de Transport Victoria, que se actualizan y cubren más situaciones de las que un artículo puede abarcar. Úsalo como una lista de errores que vale la pena revisar antes de manejar, y usa la sección Aprender y las preguntas de práctica de VIC de KangaLearner para prepararte para el contenido real del examen."
        }
      }
    ]
  },
  {
    slug: "qld-learner-theory-test-guide",
    icon: "checklist",
    state: "QLD",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 8,
    title: {
      en: "How to book and pass the QLD learner theory test",
      pt: "Como marcar e passar na prova teórica de learner de QLD",
      es: "Cómo reservar y aprobar el examen teórico de learner de QLD"
    },
    excerpt: {
      en: "PrepL online or the written test in person: the official process to book and pass Queensland's learner theory test, proof of identity, fees and what happens if you fail.",
      pt: "PrepL online ou a prova escrita presencial: o processo oficial para marcar e passar na prova teórica de learner da Queensland, comprovação de identidade, taxas e o que acontece se você reprovar.",
      es: "PrepL en línea o el examen escrito en persona: el proceso oficial para reservar y aprobar el examen teórico de learner de Queensland, comprobación de identidad, tarifas y qué pasa si repruebas."
    },
    sourceLabel: {
      en: "Queensland Government, Driver tests: written and online",
      pt: "Queensland Government, Driver tests: written and online",
      es: "Queensland Government, Driver tests: written and online"
    },
    sourceUrl: "https://www.qld.gov.au/transport/licensing/getting/tests",
    body: [
      {
        type: "paragraph",
        text: {
          en: "In Queensland, getting your car learner licence does not mean sitting one fixed theory test. You choose between PrepL, an interactive online course you complete on your own device, or the traditional written road rules test in person at a service centre. Both end in the same learner licence. This post walks through the official process for each, based on the Queensland Government's own pages, plus the identity documents you need, the fees, and what actually happens if you do not pass.",
          pt: "Na Queensland, tirar a sua licença de aprendiz de carro não significa fazer uma única prova teórica fixa. Você escolhe entre o PrepL, um curso interativo online que você faz no seu próprio dispositivo, ou a tradicional prova escrita de regras de trânsito, feita presencialmente num centro de atendimento. As duas opções levam à mesma licença de aprendiz. Este post mostra o processo oficial de cada uma, com base nas próprias páginas do governo da Queensland, além dos documentos de identidade que você precisa, as taxas, e o que realmente acontece se você não passar.",
          es: "En Queensland, sacar tu licencia de aprendiz de auto no significa presentar un único examen teórico fijo. Puedes elegir entre PrepL, un curso interactivo en línea que completas en tu propio dispositivo, o el tradicional examen escrito de reglas de tránsito, presentado en persona en un centro de atención. Las dos opciones llevan a la misma licencia de aprendiz. Este artículo repasa el proceso oficial de cada una, basado en las propias páginas del gobierno de Queensland, además de los documentos de identidad que necesitas, las tarifas, y qué pasa realmente si no apruebas."
        }
      },
      {
        type: "heading",
        text: {
          en: "Two ways to qualify: PrepL or the written test",
          pt: "Duas formas de se qualificar: PrepL ou a prova escrita",
          es: "Dos formas de calificar: PrepL o el examen escrito"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "PrepL: an interactive online course covering three sections, driving attitude, signs and rules, and sharing the road, taking around 4 to 6 hours in total. You unlock each section as you progress, then sit a final test of 30 questions with a pass mark of 90% (27 out of 30). You can enrol from age 15 years and 11 months, though you can only apply for your learner licence once you turn 16. Access lasts 12 months from enrolment.",
            pt: "PrepL: um curso interativo online dividido em três seções, atitude ao dirigir, sinais e regras, e como dividir a via, levando cerca de 4 a 6 horas no total. Você desbloqueia cada seção conforme avança, e depois faz uma prova final de 30 questões, com nota mínima de 90% (27 de 30). Você pode se inscrever a partir dos 15 anos e 11 meses, mas só pode aplicar pra sua licença de aprendiz ao completar 16. O acesso dura 12 meses a partir da inscrição.",
            es: "PrepL: un curso interactivo en línea dividido en tres secciones, actitud al conducir, señales y reglas, y cómo compartir la vía, que toma entre 4 y 6 horas en total. Vas desbloqueando cada sección a medida que avanzas, y luego presentas un examen final de 30 preguntas, con un puntaje mínimo de aprobación del 90% (27 de 30). Puedes inscribirte desde los 15 años y 11 meses, aunque solo puedes solicitar tu licencia de aprendiz al cumplir 16. El acceso dura 12 meses desde la inscripción."
          },
          {
            en: "Written road rules test: the same format, 30 questions and a pass mark of 90% (27 out of 30), but sat in person at a transport and motoring customer service centre, with no online enrolment and no take home study period built in. You bring your own proof of identity and pay the test fee on the day.",
            pt: "Prova escrita de regras de trânsito: o mesmo formato, 30 questões e nota mínima de 90% (27 de 30), mas feita presencialmente num centro de atendimento da Transport and Main Roads, sem inscrição online e sem período de estudo em casa. Você leva seus próprios documentos de identidade e paga a taxa da prova no dia.",
            es: "Examen escrito de reglas de tránsito: el mismo formato, 30 preguntas y un puntaje mínimo de aprobación del 90% (27 de 30), pero presentado en persona en un centro de atención de Transport and Main Roads, sin inscripción en línea ni período de estudio en casa. Llevas tus propios documentos de identidad y pagas la tarifa del examen ese mismo día."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Booking the test",
          pt: "Marcando a prova",
          es: "Reservando el examen"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Unlike the practical driving test, which you book online through the Queensland Government's booking system, the written road rules test has no online booking system at all. You simply attend in person: at a Transport and Main Roads customer service centre, at a participating QGAP (Queensland Government Agent Program) office, or, in rural and remote areas, at a licence issuing police station. At a Transport and Main Roads centre you no longer need a paper application form, it is done digitally on the spot, but QGAP offices and police stations still require you to complete a paper Driver Licence Application (form F3000) beforehand. Since processes and wait times vary by location, call 13 23 80 or check your nearest centre's page on qld.gov.au before you go.",
          pt: "Diferente da prova prática de direção, que você marca online pelo sistema de agendamento do governo da Queensland, a prova escrita de regras de trânsito não tem sistema de agendamento online nenhum. Você simplesmente comparece pessoalmente: num centro de atendimento da Transport and Main Roads, num escritório QGAP (Queensland Government Agent Program) credenciado, ou, em áreas rurais e remotas, numa delegacia de polícia que emite licenças. Num centro da Transport and Main Roads você não precisa mais de formulário em papel, tudo é feito digitalmente na hora, mas escritórios QGAP e delegacias ainda exigem que você preencha um Driver Licence Application (formulário F3000) em papel antes. Como os processos e os tempos de espera variam por local, ligue para 13 23 80 ou confira a página do centro mais próximo em qld.gov.au antes de ir.",
          es: "A diferencia del examen práctico de manejo, que reservas en línea a través del sistema de reservas del gobierno de Queensland, el examen escrito de reglas de tránsito no tiene ningún sistema de reserva en línea. Simplemente te presentas en persona: en un centro de atención de Transport and Main Roads, en una oficina QGAP (Queensland Government Agent Program) participante, o, en zonas rurales y remotas, en una comisaría que emite licencias. En un centro de Transport and Main Roads ya no necesitas un formulario en papel, todo se hace de forma digital en el momento, pero las oficinas QGAP y las comisarías todavía exigen que completes una Solicitud de Licencia de Conducir en papel (formulario F3000) de antemano. Como los procesos y los tiempos de espera varían según el lugar, llama al 13 23 80 o revisa la página de tu centro más cercano en qld.gov.au antes de ir."
        }
      },
      {
        type: "heading",
        text: {
          en: "Proof of identity",
          pt: "Comprovação de identidade",
          es: "Comprobación de identidad"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "First time applicants need a combination of original documents, never photocopies or certified copies: either 1 Category A document plus 2 Category B documents, or 2 Category A documents plus 1 Category B document. Category A proves your legal name and date of birth, an Australian or foreign passport (current, or expired less than 2 years), an Australian citizenship certificate, or a Department of Home Affairs ImmiCard all qualify. Category B proves your name is used in the community, options include a current Medicare card, a current student ID with your photo, or a debit or credit card with your name printed or embossed on it. Since an overseas passport will not show a Queensland address, you will also need to prove your residential address, for example with a current electricity, gas, internet or phone account in your name.",
          pt: "Quem está aplicando pela primeira vez precisa de uma combinação de documentos originais, nunca cópias ou cópias autenticadas: ou 1 documento da Categoria A mais 2 documentos da Categoria B, ou 2 documentos da Categoria A mais 1 documento da Categoria B. A Categoria A comprova seu nome legal e data de nascimento, um passaporte australiano ou estrangeiro (válido ou vencido há menos de 2 anos), um certificado de cidadania australiana, ou um ImmiCard do Department of Home Affairs contam. A Categoria B comprova que seu nome é usado na comunidade, as opções incluem um cartão Medicare atual, uma carteira de estudante atual com sua foto, ou um cartão de débito ou crédito com seu nome impresso ou em relevo. Como um passaporte estrangeiro não mostra um endereço da Queensland, você também vai precisar comprovar seu endereço residencial, por exemplo com uma conta atual de eletricidade, gás, internet ou telefone no seu nome.",
          es: "Quien aplica por primera vez necesita una combinación de documentos originales, nunca fotocopias ni copias certificadas: ya sea 1 documento de Categoría A más 2 documentos de Categoría B, o 2 documentos de Categoría A más 1 documento de Categoría B. La Categoría A comprueba tu nombre legal y fecha de nacimiento, un pasaporte australiano o extranjero (vigente o vencido hace menos de 2 años), un certificado de ciudadanía australiana, o una ImmiCard del Department of Home Affairs, todos califican. La Categoría B comprueba que tu nombre se usa en la comunidad, las opciones incluyen una tarjeta Medicare vigente, una identificación de estudiante vigente con tu foto, o una tarjeta de débito o crédito con tu nombre impreso o en relieve. Como un pasaporte extranjero no muestra una dirección de Queensland, también vas a necesitar comprobar tu dirección residencial, por ejemplo con una factura vigente de electricidad, gas, internet o teléfono a tu nombre."
        }
      },
      {
        type: "heading",
        text: {
          en: "Test format and pass mark",
          pt: "Formato da prova e nota de aprovação",
          es: "Formato del examen y puntaje de aprobación"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Both the written test and PrepL's final assessment use the same format: 30 multiple choice questions, with a pass mark of 90% (27 out of 30). Within that overall score you must also clear two sub-section thresholds: at least 9 out of 10 questions on giving way, and at least 18 out of 20 on general road rules and driver licence requirements. Missing either sub-section threshold fails the whole test, even if your total score would otherwise be enough. A pass is valid for 5 years.",
          pt: "Tanto a prova escrita quanto a avaliação final do PrepL usam o mesmo formato: 30 questões de múltipla escolha, com nota mínima de 90% (27 de 30). Dentro dessa nota geral, você também precisa atingir duas notas mínimas por seção: pelo menos 9 de 10 questões sobre ceder passagem, e pelo menos 18 de 20 sobre regras de trânsito e exigências de licenciamento em geral. Não atingir a nota mínima de uma das seções reprova a prova inteira, mesmo que sua nota total fosse suficiente. A aprovação vale por 5 anos.",
          es: "Tanto el examen escrito como la evaluación final de PrepL usan el mismo formato: 30 preguntas de opción múltiple, con un puntaje mínimo de aprobación del 90% (27 de 30). Dentro de ese puntaje general, también debes alcanzar dos puntajes mínimos por sección: al menos 9 de 10 preguntas sobre ceder el paso, y al menos 18 de 20 sobre reglas de tránsito generales y requisitos de licencia de conducir. No alcanzar el mínimo de alguna de las secciones reprueba el examen completo, aunque tu puntaje total hubiera sido suficiente. La aprobación es válida por 5 años."
        }
      },
      {
        type: "heading",
        text: {
          en: "Fees",
          pt: "Taxas",
          es: "Tarifas"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Learner licence application, issued for 3 years: $80.15",
            pt: "Aplicação da licença de aprendiz, com validade de 3 anos: $80.15",
            es: "Solicitud de la licencia de aprendiz, con vigencia de 3 años: $80.15"
          },
          {
            en: "Written road rules test or PrepL, same fee either way: $29.70",
            pt: "Prova escrita de regras de trânsito ou PrepL, mesma taxa nos dois casos: $29.70",
            es: "Examen escrito de reglas de tránsito o PrepL, misma tarifa en ambos casos: $29.70"
          },
          {
            en: "Practical driving test, which you sit later to move from learner to provisional: $69.40",
            pt: "Prova prática de direção, que você faz depois para passar de aprendiz para provisional: $69.40",
            es: "Examen práctico de manejo, que presentas más adelante para pasar de aprendiz a provisional: $69.40"
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "These fees took effect on 1 July 2026 under Transport and Main Roads' fee schedule. Government fees are reviewed periodically, so confirm the current amount on qld.gov.au before you pay.",
          pt: "Esses valores entraram em vigor em 1º de julho de 2026, na tabela de taxas da Transport and Main Roads. Taxas do governo são revisadas periodicamente, então confirme o valor atual em qld.gov.au antes de pagar.",
          es: "Estos valores entraron en vigencia el 1 de julio de 2026, según la tabla de tarifas de Transport and Main Roads. Las tarifas del gobierno se revisan periódicamente, así que confirma el monto actual en qld.gov.au antes de pagar."
        }
      },
      {
        type: "heading",
        text: {
          en: "What language is the test in",
          pt: "Em que idioma é a prova",
          es: "En qué idioma está el examen"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "The written test and PrepL are conducted in English, and none of the official pages list another language option for either. The one confirmed language service is for the practical driving test that comes later: Transport and Main Roads offers a free NAATI accredited interpreter if you call 13 23 80 at least a week before your test date, though availability depends on your location. Nothing on the official pages extends that same interpreter service to the written road rules test itself, so if English is a barrier for you, call 13 23 80 before you book to ask what support your local centre can actually offer.",
          pt: "A prova escrita e o PrepL são feitos em inglês, e nenhuma das páginas oficiais lista outra opção de idioma para nenhum dos dois. O único serviço de idioma confirmado é para a prova prática de direção, que vem depois: a Transport and Main Roads oferece um intérprete credenciado pela NAATI de graça, se você ligar para 13 23 80 pelo menos uma semana antes da data da sua prova, embora a disponibilidade dependa da sua região. Nada nas páginas oficiais estende esse mesmo serviço de intérprete para a prova escrita de regras de trânsito em si, então, se o inglês é uma barreira para você, ligue para 13 23 80 antes de marcar pra perguntar que apoio o seu centro local pode realmente oferecer.",
          es: "El examen escrito y PrepL se hacen en inglés, y ninguna de las páginas oficiales indica otra opción de idioma para ninguno de los dos. El único servicio de idioma confirmado es para el examen práctico de manejo, que viene después: Transport and Main Roads ofrece un intérprete acreditado por NAATI de forma gratuita, si llamas al 13 23 80 al menos una semana antes de la fecha de tu examen, aunque la disponibilidad depende de tu zona. Nada en las páginas oficiales extiende ese mismo servicio de intérprete al examen escrito de reglas de tránsito en sí, así que, si el inglés es una barrera para ti, llama al 13 23 80 antes de reservar para preguntar qué apoyo puede ofrecer realmente tu centro local."
        }
      },
      {
        type: "heading",
        text: {
          en: "If you do not pass",
          pt: "Se você não passar",
          es: "Si no apruebas"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "The two paths fail differently. On the written test, you can only sit once per day, if you do not pass you wait until the next working day and pay the full test fee again, $29.70 each time. On PrepL, a failed final assessment only costs you a 24 hour wait, with no extra fee, since your original payment covers 12 months of access and unlimited attempts within that window. If you are retaking the written test repeatedly, working through PrepL instead may end up cheaper overall.",
          pt: "As duas opções reprovam de jeitos diferentes. Na prova escrita, você só pode fazer uma vez por dia, e se não passar, espera até o próximo dia útil e paga a taxa da prova inteira de novo, $29.70 cada vez. No PrepL, reprovar na avaliação final custa só uma espera de 24 horas, sem taxa extra, já que o pagamento original cobre 12 meses de acesso e tentativas ilimitadas dentro desse prazo. Se você está refazendo a prova escrita várias vezes, seguir pelo PrepL pode acabar saindo mais barato no total.",
          es: "Las dos rutas fallan de forma distinta. En el examen escrito, solo puedes presentarlo una vez por día, si repruebas esperas hasta el próximo día hábil y pagas la tarifa completa del examen de nuevo, $29.70 cada vez. En PrepL, reprobar la evaluación final solo te cuesta una espera de 24 horas, sin tarifa extra, ya que tu pago original cubre 12 meses de acceso e intentos ilimitados dentro de ese plazo. Si estás repitiendo el examen escrito varias veces, avanzar por PrepL en cambio puede terminar saliendo más barato en total."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This post covers the official process for Queensland's learner theory test, PrepL and the written road rules test alike. Use KangaLearner's Learn section and QLD practice questions to prepare for the actual content, and confirm booking details, fees and identity requirements with qld.gov.au or 13 23 80 before your appointment.",
          pt: "Este post cobre o processo oficial da prova teórica de learner da Queensland, tanto o PrepL quanto a prova escrita de regras de trânsito. Use a seção Aprender e as perguntas de prática de QLD do KangaLearner para se preparar pro conteúdo em si, e confirme detalhes de agendamento, taxas e exigências de identidade em qld.gov.au ou pelo 13 23 80 antes do seu atendimento.",
          es: "Este artículo cubre el proceso oficial del examen teórico de learner de Queensland, tanto PrepL como el examen escrito de reglas de tránsito. Usa la sección Aprender y las preguntas de práctica de QLD de KangaLearner para prepararte para el contenido real, y confirma los detalles de reserva, tarifas y requisitos de identidad en qld.gov.au o al 13 23 80 antes de tu cita."
        }
      }
    ]
  },
  {
    slug: "qld-overseas-licence-conversion-guide",
    icon: "checklist",
    state: "QLD",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 8,
    title: {
      en: "Converting your overseas driving licence in Queensland",
      pt: "Convertendo sua carteira de motorista estrangeira na Queensland",
      es: "Convirtiendo tu licencia de conducir extranjera en Queensland"
    },
    excerpt: {
      en: "Who actually needs to convert their overseas licence in Queensland, who does not, and the documents, fees and steps involved either way.",
      pt: "Quem realmente precisa converter a carteira estrangeira em Queensland, quem não precisa, e os documentos, taxas e passos envolvidos.",
      es: "Quién realmente necesita convertir su licencia extranjera en Queensland, quién no, y los documentos, tarifas y pasos involucrados."
    },
    sourceLabel: {
      en: "Queensland Government, Transferring to a Queensland licence",
      pt: "Queensland Government, Transferring to a Queensland licence",
      es: "Queensland Government, Transferring to a Queensland licence"
    },
    sourceUrl: "https://www.qld.gov.au/transport/licensing/driver-licensing/overseas/transfer",
    body: [
      {
        type: "paragraph",
        text: {
          en: "Queensland's rules turn on two separate things: your visa status decides whether you need to convert at all, and the country that issued your licence decides how hard that conversion is, anywhere from a same-day paperwork swap to sitting both a written test and a practical driving test. Getting either one wrong means either driving illegally without realising it, or turning up to a service centre with the wrong documents and the wrong expectations.",
          pt: "As regras da Queensland giram em torno de duas coisas separadas: seu status de visto decide se você precisa converter a carteira, e o país que emitiu sua carteira decide o quão difícil essa conversão vai ser, desde uma simples troca de papelada no mesmo dia até fazer uma prova escrita e uma prova prática de direção. Errar em qualquer uma dessas duas coisas significa dirigir ilegalmente sem perceber, ou chegar num centro de atendimento com os documentos errados e a expectativa errada.",
          es: "Las reglas de Queensland giran en torno a dos cosas separadas: tu estado migratorio decide si necesitas convertir tu licencia, y el país que emitió tu licencia decide qué tan difícil será esa conversión, desde un simple cambio de papeleo el mismo día hasta rendir un examen escrito y un examen práctico de manejo. Equivocarte en cualquiera de las dos cosas significa manejar ilegalmente sin darte cuenta, o llegar a un centro de atención con los documentos equivocados y las expectativas equivocadas."
        }
      },
      {
        type: "heading",
        text: {
          en: "Do you even need to convert it",
          pt: "Você realmente precisa converter",
          es: "Realmente necesitas convertirla"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Tourists and temporary visa holders, including international students: Queensland only requires a licence transfer from Australian citizens and people who hold a resident visa (a permanent or special category visa), which by definition excludes temporary, business and guardian visas. So on a student or other temporary visa, you can keep driving on your valid overseas licence, for vehicles within what a Queensland class C licence covers, generally cars and light vehicles up to 4.5 tonnes with seating for up to 12 people.",
            pt: "Turistas e quem tem visto temporário, incluindo estudantes internacionais: a Queensland só exige transferência de carteira de cidadãos australianos e de quem tem visto de residente (visto permanente ou de categoria especial), o que por definição exclui vistos temporários, de negócios e de guardião. Ou seja, com visto de estudante ou outro visto temporário, você pode continuar dirigindo com sua carteira estrangeira válida, para veículos dentro do que uma carteira categoria C da Queensland cobre, geralmente carros e veículos leves de até 4,5 toneladas com capacidade para até 12 pessoas.",
            es: "Turistas y titulares de visa temporal, incluidos estudiantes internacionales: Queensland solo exige transferencia de licencia a ciudadanos australianos y a quienes tienen visa de residente (visa permanente o de categoría especial), lo cual por definición excluye visas temporales, de negocios y de tutor. Es decir, con visa de estudiante u otra visa temporal, puedes seguir conduciendo con tu licencia extranjera vigente, para vehículos dentro de lo que cubre una licencia categoría C de Queensland, generalmente autos y vehículos livianos de hasta 4,5 toneladas con capacidad para hasta 12 personas."
          },
          {
            en: "Permanent residents and Australian citizens: you can drive on your overseas licence for up to 3 months after you start living in Queensland, then you are required to transfer it to a Queensland licence.",
            pt: "Residentes permanentes e cidadãos australianos: você pode dirigir com a carteira estrangeira por até 3 meses depois que começar a morar na Queensland, depois disso é obrigatório transferir para uma carteira da Queensland.",
            es: "Residentes permanentes y ciudadanos australianos: puedes conducir con tu licencia extranjera hasta 3 meses después de empezar a vivir en Queensland, después de eso es obligatorio transferirla a una licencia de Queensland."
          },
          {
            en: "The 3 month clock runs from whichever happens later: the date you started living in Queensland, or the date you were granted your resident visa. So if you arrive on a temporary visa and later become a permanent resident, the clock only starts counting from the day your resident visa was granted.",
            pt: "O prazo de 3 meses conta a partir do que acontecer depois: a data em que você começou a morar na Queensland, ou a data em que recebeu o visto de residente. Ou seja, se você chega com um visto temporário e depois se torna residente permanente, o prazo só começa a contar a partir do dia em que o visto de residente foi concedido.",
            es: "El plazo de 3 meses corre desde lo que ocurra después: la fecha en que empezaste a vivir en Queensland, o la fecha en que te otorgaron la visa de residente. Es decir, si llegas con una visa temporal y después te conviertes en residente permanente, el plazo solo empieza a contar desde el día en que se otorgó la visa de residente."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Recognised country or not, and why it matters",
          pt: "País reconhecido ou não, e por que isso importa",
          es: "País reconocido o no, y por qué importa"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Queensland sorts overseas licences into recognised and non-recognised countries, and which one yours falls into changes the entire process. The recognised list includes Canada, France, Germany, Ireland, Italy, Japan, Singapore, the United Kingdom and the United States, among others, plus Malta and the Isle of Man for licences issued after specific dates. New Zealand is covered under its own separate arrangement. If you hold, or have held within the last 5 years, a car or motorcycle licence equivalent to a Queensland class C, RE or R licence from a recognised country, you skip the road rules test and the practical driving test entirely. Even from a recognised country, heavy vehicle classes still require a road rules test, though the practical test is waived. If your licence is from any other country, you need to pass both a written road rules test and a practical driving test before you get a Queensland licence. The recognised list changes over time, so check it directly on qld.gov.au rather than relying on an old copy, including this one.",
          pt: "A Queensland separa as carteiras estrangeiras entre país reconhecido e país não reconhecido, e isso muda o processo inteiro. A lista de reconhecidos inclui Canadá, França, Alemanha, Irlanda, Itália, Japão, Singapura, Reino Unido e Estados Unidos, entre outros, além de Malta e a Ilha de Man para carteiras emitidas depois de datas específicas. A Nova Zelândia é tratada num acordo separado próprio. Se você tem, ou teve nos últimos 5 anos, uma carteira de carro ou moto equivalente à categoria C, RE ou R da Queensland, de um país reconhecido, você pula a prova teórica e a prova prática de direção inteiramente. Mesmo de um país reconhecido, categorias de veículo pesado ainda exigem prova teórica, embora a prova prática seja dispensada. Se sua carteira for de qualquer outro país, você precisa passar tanto na prova teórica escrita quanto na prova prática de direção antes de conseguir uma carteira da Queensland. A lista de reconhecidos muda com o tempo, então confira direto em qld.gov.au em vez de confiar numa cópia antiga, incluindo esta aqui.",
          es: "Queensland separa las licencias extranjeras entre país reconocido y país no reconocido, y eso cambia todo el proceso. La lista de reconocidos incluye Canadá, Francia, Alemania, Irlanda, Italia, Japón, Singapur, el Reino Unido y los Estados Unidos, entre otros, además de Malta y la Isla de Man para licencias emitidas después de fechas específicas. Nueva Zelanda se trata bajo su propio acuerdo separado. Si tienes, o has tenido en los últimos 5 años, una licencia de auto o moto equivalente a una categoría C, RE o R de Queensland, de un país reconocido, te saltas el examen teórico y el examen práctico de manejo por completo. Incluso desde un país reconocido, las categorías de vehículo pesado igual requieren un examen teórico, aunque el examen práctico queda exento. Si tu licencia es de cualquier otro país, necesitas aprobar tanto el examen teórico escrito como el examen práctico de manejo antes de conseguir una licencia de Queensland. La lista de reconocidos cambia con el tiempo, así que revísala directamente en qld.gov.au en vez de confiar en una copia vieja, incluyendo esta."
        }
      },
      {
        type: "heading",
        text: {
          en: "What happens if you fail the practical test",
          pt: "O que acontece se você reprovar na prova prática",
          es: "Qué pasa si repruebas el examen práctico"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This is the part that catches a lot of non-recognised country applicants off guard. If you fail your practical driving test in Queensland, your authority to drive on your overseas licence is withdrawn immediately, not just for that test, for good. You will not be able to keep driving on your overseas licence at all while you prepare to resit, so plan your study and practice accordingly before you book the test rather than treating it as a low-stakes first attempt.",
          pt: "Essa é a parte que pega muita gente de países não reconhecidos de surpresa. Se você reprovar na prova prática de direção na Queensland, sua autorização pra dirigir com a carteira estrangeira é cancelada imediatamente, não só pra aquela prova, de vez. Você não vai poder continuar dirigindo com a carteira estrangeira enquanto se prepara pra refazer a prova, então planeje seus estudos e sua prática antes de marcar a prova, em vez de tratar a primeira tentativa como algo de baixo risco.",
          es: "Esta es la parte que agarra desprevenidos a muchos solicitantes de países no reconocidos. Si repruebas tu examen práctico de manejo en Queensland, tu autorización para conducir con la licencia extranjera queda cancelada de inmediato, no solo para ese examen, sino para siempre. No vas a poder seguir conduciendo con tu licencia extranjera mientras te preparas para repetir el examen, así que planifica tu estudio y tu práctica antes de reservar el examen, en vez de tratar el primer intento como algo de bajo riesgo."
        }
      },
      {
        type: "heading",
        text: {
          en: "Documents you will need",
          pt: "Documentos que você vai precisar",
          es: "Documentos que vas a necesitar"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Your original overseas licence. Photocopies and certified copies are not accepted, it has to be the original document.",
            pt: "Sua carteira estrangeira original. Fotocópias e cópias autenticadas não são aceitas, tem que ser o documento original.",
            es: "Tu licencia extranjera original. Las fotocopias y copias certificadas no se aceptan, tiene que ser el documento original."
          },
          {
            en: "A recognised English translation if your licence is not in English, from an approved NAATI translator. Carry this translation with you whenever you drive, alongside your original licence.",
            pt: "Uma tradução pro inglês reconhecida se sua carteira não estiver em inglês, feita por um tradutor aprovado pela NAATI. Ande com essa tradução sempre que for dirigir, junto com sua carteira original.",
            es: "Una traducción al inglés reconocida si tu licencia no está en inglés, hecha por un traductor aprobado por NAATI. Lleva esta traducción contigo cada vez que conduzcas, junto con tu licencia original."
          },
          {
            en: "Original evidence of identity documents, including proof of your residential address in Queensland.",
            pt: "Documentos originais de comprovação de identidade, incluindo comprovante do seu endereço residencial na Queensland.",
            es: "Documentos originales de comprobación de identidad, incluyendo comprobante de tu domicilio en Queensland."
          },
          {
            en: "A medical fitness to drive declaration. You may need a medical certificate from a doctor if you have a health condition that could affect safe driving.",
            pt: "Uma declaração de aptidão médica para dirigir. Você pode precisar de um atestado médico se tiver alguma condição de saúde que possa afetar a direção segura.",
            es: "Una declaración de aptitud médica para conducir. Puede que necesites un certificado médico si tienes alguna condición de salud que pueda afectar la conducción segura."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Fees and where to go",
          pt: "Taxas e onde ir",
          es: "Tarifas y dónde ir"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "If you are exempt from testing because your licence is from a recognised country, you pay only the standard Queensland licence fee for the class and term you choose, currently $80.15 for a 3 year learner licence, or between $94.65 and $212.00 for a provisional or open licence depending on the term length. If you are not exempt, you pay those same licence fees plus the road rules test ($29.70) and the practical driving test ($69.40). You apply in person at a transport and motoring customer service centre, a Queensland Government Agent Program (QGAP) office, or a licence-issuing police station in rural and remote areas. These figures are current at the time of writing but government fees are reviewed periodically, so confirm the exact amount on qld.gov.au before you pay.",
          pt: "Se você está isento da prova porque sua carteira é de um país reconhecido, você paga só a taxa padrão de licença da Queensland pra categoria e prazo que escolher, atualmente $80.15 pra uma licença de aprendiz de 3 anos, ou entre $94.65 e $212.00 pra uma licença provisional ou plena dependendo do prazo. Se você não é isento, paga essas mesmas taxas de licença mais a prova teórica ($29.70) e a prova prática de direção ($69.40). Você aplica presencialmente num centro de atendimento de transport and motoring, num escritório do Queensland Government Agent Program (QGAP), ou numa delegacia de polícia emissora de licenças em áreas rurais e remotas. Esses valores são atuais no momento em que este post foi escrito, mas taxas do governo são revisadas periodicamente, então confirme o valor exato em qld.gov.au antes de pagar.",
          es: "Si estás exento del examen porque tu licencia es de un país reconocido, pagas solo la tarifa estándar de licencia de Queensland para la categoría y el plazo que elijas, actualmente $80.15 por una licencia de aprendiz de 3 años, o entre $94.65 y $212.00 por una licencia provisional o plena dependiendo del plazo. Si no estás exento, pagas esas mismas tarifas de licencia más el examen teórico ($29.70) y el examen práctico de manejo ($69.40). Solicitas en persona en un centro de atención de transport and motoring, una oficina del Queensland Government Agent Program (QGAP), o una estación de policía emisora de licencias en zonas rurales y remotas. Estos valores están vigentes al momento de escribir este post, pero las tarifas del gobierno se revisan periódicamente, así que confirma el monto exacto en qld.gov.au antes de pagar."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "If you are on a temporary visa and not converting your licence, you still need to know Queensland's road rules well, since your overseas licence does not come with local knowledge built in. Use KangaLearner's Learn section and QLD practice questions to study those rules regardless of which licence you are driving on.",
          pt: "Se você está com visto temporário e não vai converter a carteira, ainda assim precisa conhecer bem as regras de trânsito da Queensland, já que sua carteira estrangeira não vem com o conhecimento local embutido. Use a seção Aprender e as perguntas de prática de QLD do KangaLearner para estudar essas regras, independente de qual carteira você está usando pra dirigir.",
          es: "Si tienes visa temporal y no vas a convertir tu licencia, igual necesitas conocer bien las reglas de tránsito de Queensland, ya que tu licencia extranjera no viene con el conocimiento local incorporado. Usa la sección Aprender y las preguntas de práctica de QLD de KangaLearner para estudiar esas reglas, sin importar con qué licencia estés conduciendo."
        }
      }
    ]
  },
  {
    slug: "qld-p-plate-rules-guide",
    icon: "safety",
    state: "QLD",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "Queensland P1 and P2 rules: passengers, phones, speed and high-powered cars",
      pt: "Regras do P1 e P2 na Queensland: passageiros, celular, velocidade e carros de alta potência",
      es: "Reglas de P1 y P2 en Queensland: pasajeros, celular, velocidad y autos de alta potencia"
    },
    excerpt: {
      en: "P1 and P2 are not the same licence with a different colour plate. Here is exactly how long each stage lasts, when passenger limits apply, what changes with your phone, and which cars you cannot drive yet.",
      pt: "P1 e P2 não são a mesma licença só com uma placa de cor diferente. Veja exatamente quanto tempo cada etapa dura, quando o limite de passageiros vale, o que muda com o celular, e quais carros você ainda não pode dirigir.",
      es: "P1 y P2 no son la misma licencia con una placa de otro color. Esto es exactamente cuánto dura cada etapa, cuándo aplica el límite de pasajeros, qué cambia con el celular, y qué autos todavía no puedes conducir."
    },
    sourceLabel: {
      en: "Queensland Government (Transport and Main Roads), Provisional licence restrictions",
      pt: "Queensland Government (Transport and Main Roads), Provisional licence restrictions",
      es: "Queensland Government (Transport and Main Roads), Provisional licence restrictions"
    },
    sourceUrl:
      "https://www.qld.gov.au/transport/licensing/driver-licensing/applying/provisional/restrictions",
    body: [
      {
        type: "paragraph",
        text: {
          en: "P1 and P2 are not just two different colours of plate. They come with different rules for how long you have to display them, who can ride with you, what you can do with your phone, and which cars you are even allowed to drive. Transport and Main Roads spreads all of this across several official pages, but rarely puts it in one place for someone who is new to the system. This post pulls together exactly what changes between your red P1 plates and your green P2 plates, based directly on Transport and Main Roads' own provisional licence pages on qld.gov.au.",
          pt: "P1 e P2 não são só duas cores diferentes de placa. Eles vêm com regras diferentes sobre quanto tempo você precisa exibi-las, quem pode andar com você no carro, o que você pode fazer com o celular, e quais carros você ainda nem pode dirigir. A Transport and Main Roads espalha tudo isso em várias páginas oficiais, mas raramente reúne isso num só lugar para quem é novo no sistema. Este post reúne exatamente o que muda entre as suas placas P1 vermelhas e as suas placas P2 verdes, com base direta nas páginas oficiais de licença provisória da Transport and Main Roads em qld.gov.au.",
          es: "P1 y P2 no son solo dos colores distintos de placa. Vienen con reglas distintas sobre cuánto tiempo debes exhibirlas, quién puede viajar contigo en el auto, qué puedes hacer con el celular, y qué autos todavía no puedes conducir. Transport and Main Roads reparte todo esto en varias páginas oficiales, pero rara vez lo reúne en un solo lugar para quien es nuevo en el sistema. Este artículo reúne exactamente lo que cambia entre tus placas P1 rojas y tus placas P2 verdes, basado directamente en las páginas oficiales de licencia provisional de Transport and Main Roads en qld.gov.au."
        }
      },
      {
        type: "heading",
        text: {
          en: "How long you stay on P1 before moving to P2",
          pt: "Quanto tempo você fica no P1 antes de passar para o P2",
          es: "Cuánto tiempo te quedas en P1 antes de pasar a P2"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "To get a P1 licence in the first place, you need to have held your learner licence for at least 1 year, be at least 17 years old, have logged 100 hours of supervised driving in your learner logbook, and pass both the hazard perception test and the practical driving test. Once you have your red P1 plates, you need to hold that licence for at least 1 year, and be at least 18 years old, before you become eligible to move up to a P2 licence. If you are 25 or older when you first pass your practical driving test, Queensland skips the P1 stage for you entirely and issues a P2 licence straight away.",
          pt: "Para conseguir a licença P1 antes de mais nada, você precisa ter tido a licença learner por pelo menos 1 ano, ter pelo menos 17 anos, ter registrado 100 horas de direção supervisionada na sua caderneta de learner, e passar tanto no teste de percepção de risco quanto na prova prática de direção. Depois de conseguir suas placas P1 vermelhas, você precisa manter essa licença por pelo menos 1 ano, e ter pelo menos 18 anos, antes de se tornar elegível para passar para uma licença P2. Se você tiver 25 anos ou mais quando passar na prova prática de direção pela primeira vez, a Queensland pula a etapa P1 inteiramente e emite uma licença P2 direto.",
          es: "Para conseguir la licencia P1 antes que nada, necesitas haber tenido la licencia learner durante al menos 1 año, tener al menos 17 años, haber registrado 100 horas de manejo supervisado en tu libreta de learner, y aprobar tanto el examen de percepción de riesgo como el examen práctico de manejo. Una vez que tengas tus placas P1 rojas, necesitas mantener esa licencia durante al menos 1 año, y tener al menos 18 años, antes de ser elegible para pasar a una licencia P2. Si tienes 25 años o más cuando apruebes el examen práctico de manejo por primera vez, Queensland se salta la etapa P1 por completo y te emite una licencia P2 directamente."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "P2 has its own minimum on top of that: at least 2 years on the green plates, and you cannot apply for an open licence until you are at least 20 years old. Starting later does not shorten that P2 minimum either, even a driver who skips straight to P2 at 25 still needs to hold it for 2 years before applying to go open, since the 2 year rule is not tied to your age.",
          pt: "O P2 tem seu próprio mínimo além disso: pelo menos 2 anos com a placa verde, e você não pode aplicar para uma licença plena (open) antes de completar 20 anos. Começar mais tarde não reduz esse mínimo do P2, mesmo quem pula direto para o P2 aos 25 anos ainda precisa manter a licença por 2 anos antes de poder aplicar para a licença plena, já que a regra dos 2 anos não está ligada à sua idade.",
          es: "El P2 tiene su propio mínimo además de eso: al menos 2 años con la placa verde, y no puedes solicitar una licencia plena (open) hasta cumplir los 20 años. Empezar más tarde tampoco reduce ese mínimo del P2, incluso quien pasa directo a P2 a los 25 años igual necesita mantener la licencia durante 2 años antes de poder solicitar la licencia plena, ya que la regla de los 2 años no está ligada a tu edad."
        }
      },
      {
        type: "heading",
        text: {
          en: "Mobile phones: a stricter rule on P1 than on P2",
          pt: "Celular: uma regra mais rígida no P1 do que no P2",
          es: "Celular: una regla más estricta en P1 que en P2"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "If you are on P1 and under 25, the ban is total, and it goes further than most people expect. It is not just hands-free kits, Bluetooth and wireless headsets that are out. Even with your phone left untouched in a pocket or pouch, you cannot look at it, touch it, or talk to it, and a passenger cannot put a call on loudspeaker for you either.",
            pt: "Se você está no P1 e tem menos de 25 anos, a proibição é total, e vai além do que a maioria imagina. Não é só kit viva-voz, Bluetooth e fone sem fio que ficam de fora. Mesmo com o celular parado no bolso ou numa bolsa, você não pode olhar para ele, tocar nele, ou falar com ele, e nem um passageiro pode colocar uma ligação no alto-falante para você.",
            es: "Si estás en P1 y tienes menos de 25 años, la prohibición es total, y va más allá de lo que la mayoría imagina. No se trata solo de los kits de manos libres, Bluetooth y auriculares inalámbricos, esos ya quedan fuera. Incluso con el celular quieto en el bolsillo o en una funda, no puedes mirarlo, tocarlo, ni hablarle, y ni siquiera un pasajero puede poner una llamada en altavoz para ti."
          },
          {
            en: "Once you are either on P1 and 25 or older, or anywhere on P2 no matter your age, hands-free use opens up: a cradle mounted in the car, voice-activated navigation, accepting a call hands-free. You can even operate it by voice alone while it stays in your pocket or pouch, as long as you never pick it up.",
            pt: "Quando você está no P1 com 25 anos ou mais, ou em qualquer momento do P2 independente da idade, o uso viva-voz se abre: suporte fixado no carro, navegação por comando de voz, aceitar uma ligação em viva-voz. Você pode até operar só por comando de voz enquanto o celular fica no bolso ou numa bolsa, desde que você nunca pegue nele.",
            es: "Cuando estás en P1 con 25 años o más, o en cualquier momento del P2 sin importar la edad, el uso en manos libres se abre: soporte fijado en el auto, navegación por comando de voz, aceptar una llamada en manos libres. Incluso puedes operarlo solo por comando de voz mientras se queda en el bolsillo o en una funda, siempre que nunca lo agarres."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Passenger limits only apply to P1, and only late at night",
          pt: "O limite de passageiros só vale para o P1, e só à noite",
          es: "El límite de pasajeros solo aplica a P1, y solo de noche"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Queensland places no passenger limit on P2 drivers at all. The restriction exists only for P1 licence holders under 25, and only between 11pm and 5am: in that window, you can carry no more than 1 passenger under the age of 21 who is not immediate family. For this rule, immediate family means a sibling, your own child, your spouse, a stepparent, a guardian, or an approved carer. Outside those hours, a P1 driver can carry as many passengers as there are seatbelts for.",
          pt: "A Queensland não impõe nenhum limite de passageiros para motoristas P2. A restrição existe só para motoristas com licença P1 com menos de 25 anos, e só entre as 23h e as 5h: nessa janela, você pode levar no máximo 1 passageiro com menos de 21 anos que não seja família direta. Para essa regra, família direta significa irmão ou irmã, seu próprio filho, cônjuge, padrasto ou madrasta, tutor legal, ou cuidador aprovado. Fora desse horário, um motorista P1 pode levar quantos passageiros houver cintos de segurança.",
          es: "Queensland no impone ningún límite de pasajeros para conductores P2. La restricción existe solo para conductores con licencia P1 menores de 25 años, y solo entre las 11pm y las 5am: en esa ventana, puedes llevar como máximo 1 pasajero menor de 21 años que no sea familiar directo. Para esta regla, familiar directo significa hermano o hermana, tu propio hijo, cónyuge, padrastro o madrastra, tutor legal, o cuidador aprobado. Fuera de ese horario, un conductor P1 puede llevar tantos pasajeros como cinturones de seguridad haya."
        }
      },
      {
        type: "heading",
        text: {
          en: "No P-plate speed limit, but a curfew for speeding",
          pt: "Sem limite de velocidade para P platers, mas toque de recolher para quem é pego no excesso",
          es: "Sin límite de velocidad para P platers, pero toque de queda para quien excede el límite"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Queensland does not set a separate, lower speed limit for P1 or P2 drivers, you follow the same posted limits as any open licence holder. But speeding carries a consequence beyond the usual fine and demerit points while you are on your Ps. If you are under 25 and your P1 or P2 licence gets suspended for a high speed offence, or you build up enough demerit points to trigger a suspension or a good driving behaviour period, Queensland applies a late night driving restriction: no driving at all between 11pm and 5am, for a full year. An exemption is available if you can show you need to drive for work and refusing would cause you severe hardship, and Transport and Main Roads processes those applications within 28 working days.",
          pt: "A Queensland não define um limite de velocidade separado e menor para motoristas P1 ou P2, você segue os mesmos limites sinalizados que qualquer motorista com licença plena. Mas exceder a velocidade traz uma consequência além da multa e dos pontos de demérito de sempre enquanto você está nas suas Ps. Se você tem menos de 25 anos e sua licença P1 ou P2 é suspensa por uma infração de alta velocidade, ou você acumula pontos de demérito suficientes para gerar uma suspensão ou um período de boa conduta na direção, a Queensland aplica uma restrição de condução noturna: nada de dirigir entre as 23h e as 5h, por um ano inteiro. Existe isenção se você conseguir mostrar que precisa dirigir para trabalhar e que recusar causaria dificuldade severa, e a Transport and Main Roads processa esses pedidos em até 28 dias úteis.",
          es: "Queensland no establece un límite de velocidad separado y más bajo para conductores P1 o P2, sigues los mismos límites señalizados que cualquier conductor con licencia plena. Pero exceder la velocidad trae una consecuencia más allá de la multa y los puntos de demérito de siempre mientras estás en tus Ps. Si tienes menos de 25 años y tu licencia P1 o P2 se suspende por una infracción de alta velocidad, o acumulas suficientes puntos de demérito como para generar una suspensión o un período de buena conducta al conducir, Queensland aplica una restricción de conducción nocturna: nada de conducir entre las 11pm y las 5am, durante un año completo. Existe una exención si puedes demostrar que necesitas conducir por trabajo y que negarla causaría dificultades severas, y Transport and Main Roads procesa esas solicitudes en un plazo de 28 días hábiles."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Both P1 and P2 drivers face the same lower threshold for demerit points: build up 4 or more points in any 12 month period and you have to choose between a licence suspension and a good driving behaviour period.",
          pt: "Motoristas P1 e P2 enfrentam o mesmo limite mais baixo de pontos de demérito: acumule 4 pontos ou mais em qualquer período de 12 meses e você vai ter que escolher entre uma suspensão da licença e um período de boa conduta na direção.",
          es: "Los conductores P1 y P2 enfrentan el mismo límite más bajo de puntos de demérito: acumula 4 puntos o más en cualquier período de 12 meses y tendrás que elegir entre una suspensión de la licencia y un período de buena conducta al conducir."
        }
      },
      {
        type: "heading",
        text: {
          en: "High-powered vehicle restrictions: what you cannot drive yet",
          pt: "Restrições de veículos de alta potência: o que você ainda não pode dirigir",
          es: "Restricciones de vehículos de alta potencia: lo que todavía no puedes conducir"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Both P1 and P2 licence holders under 25 are banned from driving a high-powered vehicle, and the definition depends on when the car was built. For a car manufactured on or after 1 January 2010, it counts as high-powered if its power-to-weight ratio is more than 130kW/t, worked out by dividing the car's maximum power in kilowatts by its tare weight in tonnes. For a car manufactured before 1 January 2010, it counts as high-powered if it has 8 or more cylinders, a turbocharged or supercharged engine that is not diesel, or a rotary engine over 1146cc.",
          pt: "Motoristas com licença P1 e P2 com menos de 25 anos são proibidos de dirigir um veículo de alta potência, e a definição depende de quando o carro foi fabricado. Para um carro fabricado em ou após 1 de janeiro de 2010, ele conta como de alta potência se a relação potência-peso for maior que 130kW/t, calculada dividindo a potência máxima do carro em kW pela tara (peso do veículo vazio) em toneladas. Para um carro fabricado antes de 1 de janeiro de 2010, ele conta como de alta potência se tiver 8 cilindros ou mais, um motor turbo ou com compressor mecânico que não seja a diesel, ou um motor rotativo acima de 1146cc.",
          es: "Los conductores con licencia P1 y P2 menores de 25 años tienen prohibido conducir un vehículo de alta potencia, y la definición depende de cuándo se fabricó el auto. Para un auto fabricado en o después del 1 de enero de 2010, cuenta como de alta potencia si su relación potencia-peso es mayor a 130kW/t, calculada dividiendo la potencia máxima del auto en kW por su tara (peso del vehículo vacío) en toneladas. Para un auto fabricado antes del 1 de enero de 2010, cuenta como de alta potencia si tiene 8 cilindros o más, un motor turbo o con compresor mecánico que no sea diésel, o un motor rotativo de más de 1146cc."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "If a high-powered car is genuinely the only vehicle reasonably available to you, you can apply for a certificate of exemption, as long as you already owned that specific car before the relevant cut-off date: 1 January 2014 for a car built from 2010 onward, or 30 June 2007 for an older car.",
            pt: "Se um carro de alta potência for realmente o único veículo razoavelmente disponível para você, é possível pedir um certificado de isenção, desde que você já fosse dono daquele carro específico antes da data limite correspondente: 1 de janeiro de 2014 para um carro fabricado a partir de 2010, ou 30 de junho de 2007 para um carro mais antigo.",
            es: "Si un auto de alta potencia es realmente el único vehículo razonablemente disponible para ti, puedes solicitar un certificado de exención, siempre que ya fueras dueño de ese auto específico antes de la fecha límite correspondiente: el 1 de enero de 2014 para un auto fabricado desde 2010 en adelante, o el 30 de junio de 2007 para un auto más antiguo."
          },
          {
            en: "A separate exemption exists for an older, pre-2010 car with a turbocharged or supercharged non-diesel engine, as long as its power-to-weight ratio is no more than 125kW/t. Queensland calls this a moderately-powered vehicle.",
            pt: "Existe uma isenção separada para um carro mais antigo, de antes de 2010, com motor turbo ou com compressor mecânico que não seja a diesel, desde que a relação potência-peso não passe de 125kW/t. A Queensland chama isso de veículo de potência moderada.",
            es: "Existe una exención separada para un auto más antiguo, de antes de 2010, con motor turbo o con compresor mecánico que no sea diésel, siempre que su relación potencia-peso no supere los 125kW/t. Queensland llama a esto vehículo de potencia moderada."
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "This post covers what Transport and Main Roads' own provisional licence pages say about P1 and P2 conditions specifically. Rules like these get updated, so always check qld.gov.au before you rely on a number here. Use KangaLearner's Learn section, and KangaLearner's QLD practice questions, to get ready for your test.",
          pt: "Este post cobre o que as próprias páginas de licença provisória da Transport and Main Roads dizem especificamente sobre as condições do P1 e do P2. Regras como essas são atualizadas de vez em quando, então sempre confira em qld.gov.au antes de confiar em um número mencionado aqui. Use a seção Aprender do KangaLearner, e as perguntas de prática de QLD do KangaLearner, para se preparar para sua prova.",
          es: "Este artículo cubre lo que dicen específicamente las propias páginas de licencia provisional de Transport and Main Roads sobre las condiciones de P1 y P2. Reglas como estas se actualizan de vez en cuando, así que siempre revisa en qld.gov.au antes de confiar en un número mencionado aquí. Usa la sección Aprender de KangaLearner, y las preguntas de práctica de QLD de KangaLearner, para prepararte para tu examen."
        }
      }
    ]
  },
  {
    slug: "qld-roundabouts-give-way-guide",
    icon: "safety",
    state: "QLD",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 9,
    title: {
      en: "Multi-lane roundabouts in Queensland: lanes, indicators and give way rules",
      pt: "Rotatórias com várias faixas na Queensland: faixas, seta e regras de ceder passagem",
      es: "Rotondas de varios carriles en Queensland: carriles, intermitente y reglas de ceder el paso"
    },
    excerpt: {
      en: "Beyond the basic give way rule: how to choose a lane, when to indicate, how cyclists move through multi-lane roundabouts, and the mistakes that catch newcomers out in Queensland.",
      pt: "Além da regra básica de ceder passagem: como escolher a faixa, quando usar a seta, como os ciclistas se movem em rotatórias com várias faixas, e os erros que mais pegam quem chega de fora na Queensland.",
      es: "Más allá de la regla básica de ceder el paso: cómo elegir el carril, cuándo usar el intermitente, cómo se mueven los ciclistas en rotondas de varios carriles, y los errores que más sorprenden a los recién llegados en Queensland."
    },
    sourceLabel: {
      en: "Queensland Government, Roundabouts (Transport and Main Roads road rules)",
      pt: "Queensland Government, Roundabouts (Transport and Main Roads road rules)",
      es: "Queensland Government, Roundabouts (Transport and Main Roads road rules)"
    },
    sourceUrl: "https://www.qld.gov.au/transport/safety/rules/road/roundabouts",
    body: [
      {
        type: "paragraph",
        text: {
          en: "Our Queensland driving guide for newcomers already covers the basic roundabout rule: give way to whoever is already on the roundabout, not to whoever is on your right. That single rule surprises a lot of people, but it is only the starting point. Roundabouts in Queensland get more complicated once a second lane, a cyclist, or a truck that needs more room than you expect gets involved. This post goes deeper into the details that trip up newcomers most: which lane to choose, when to indicate and when to switch it, how cyclists are allowed to move through a roundabout, and the give way rules that apply once you are already inside one.",
          pt: "Nosso guia de direção da Queensland para quem chega de fora já cobre a regra básica de rotatória: ceder passagem para quem já está na rotatória, não para quem vem da sua direita. Essa regra sozinha já surpreende muita gente, mas é só o começo. As rotatórias na Queensland ficam mais complicadas quando entra em cena uma segunda faixa, um ciclista, ou um caminhão que precisa de mais espaço do que você imagina. Este post aprofunda os detalhes que mais confundem quem chega de fora: qual faixa escolher, quando usar a seta e quando trocar de lado, como os ciclistas têm permissão de se mover numa rotatória, e as regras de ceder passagem que valem depois que você já está dentro dela.",
          es: "Nuestra guía de manejo de Queensland para recién llegados ya cubre la regla básica de la rotonda: ceder el paso a quien ya está en la rotonda, no a quien viene por tu derecha. Esa sola regla ya sorprende a mucha gente, pero es solo el comienzo. Las rotondas en Queensland se complican más cuando entra en juego un segundo carril, un ciclista, o un camión que necesita más espacio del que imaginas. Este artículo profundiza en los detalles que más confunden a quien recién llega: qué carril elegir, cuándo usar el intermitente y cuándo cambiarlo de lado, cómo se les permite a los ciclistas moverse dentro de una rotonda, y las reglas de ceder el paso que aplican una vez que ya estás dentro de ella."
        }
      },
      {
        type: "heading",
        text: {
          en: "Choosing the right lane before you enter",
          pt: "Escolhendo a faixa certa antes de entrar",
          es: "Eligiendo el carril correcto antes de entrar"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "At a multi-lane roundabout, which lane you should be in depends on where you are headed, and you should choose that lane before you reach the roundabout by reading the signs, lane markings and arrows on approach. Turning left, use the left lane. Turning right or making a U-turn, use the right lane, unless road markings specifically show that the left lane is also allowed to turn right. Going straight ahead, you can use either lane. Pick your lane early and commit to it. Changing lanes at the last second, once you are already committed to the roundabout, is exactly the kind of move that causes a crash or a serious fault on a driving test.",
          pt: "Numa rotatória com mais de uma faixa, qual faixa você deve usar depende de para onde você está indo, e você deve escolher essa faixa antes de chegar na rotatória, lendo as placas, as marcações no chão e as setas de sinalização na aproximação. Para virar à esquerda, use a faixa da esquerda. Para virar à direita ou fazer um retorno, use a faixa da direita, a não ser que a sinalização no chão mostre especificamente que a faixa da esquerda também permite virar à direita. Para seguir em frente, você pode usar qualquer uma das duas faixas. Escolha sua faixa cedo e mantenha-se nela. Trocar de faixa de última hora, já dentro da rotatória, é exatamente o tipo de manobra que causa acidente ou reprovação numa prova prática de direção.",
          es: "En una rotonda de varios carriles, el carril que debes usar depende de hacia dónde vas, y debes elegirlo antes de llegar a la rotonda, leyendo las señales, las marcas en el pavimento y las flechas de la aproximación. Para girar a la izquierda, usa el carril izquierdo. Para girar a la derecha o hacer un giro en U, usa el carril derecho, a menos que la señalización en el pavimento muestre específicamente que el carril izquierdo también permite girar a la derecha. Para seguir derecho, puedes usar cualquiera de los dos carriles. Elige tu carril temprano y mantente en él. Cambiar de carril en el último segundo, ya dentro de la rotonda, es exactamente el tipo de maniobra que causa un choque o una falla grave en un examen práctico de manejo."
        }
      },
      {
        type: "heading",
        text: {
          en: "Indicating correctly through a roundabout",
          pt: "Usando a seta corretamente na rotatória",
          es: "Cómo usar el intermitente correctamente en la rotonda"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Turning left: indicate left as you approach and enter the roundabout, keep it on all the way to your exit, then cancel it once you have left the roundabout.",
            pt: "Virando à esquerda: sinalize com a seta esquerda ao se aproximar e entrar na rotatória, mantenha ligada até a sua saída, e desligue assim que sair da rotatória.",
            es: "Girando a la izquierda: indica con el intermitente izquierdo al acercarte y entrar a la rotonda, mantenlo encendido hasta tu salida, y apágalo apenas salgas de la rotonda."
          },
          {
            en: "Turning right or making a U-turn: indicate right as you approach and enter the roundabout, keep the right indicator on while you go around, then switch to the left indicator before you reach your exit, and cancel it after you leave.",
            pt: "Virando à direita ou fazendo um retorno: sinalize com a seta direita ao se aproximar e entrar na rotatória. Mantenha a seta direita ligada enquanto você contorna, depois troque para a seta esquerda antes de chegar na sua saída, e desligue depois de sair.",
            es: "Girando a la derecha o haciendo un giro en U: indica con el intermitente derecho al acercarte y entrar a la rotonda. Mantén el intermitente derecho encendido mientras la recorres, luego cambia al intermitente izquierdo antes de llegar a tu salida, y apágalo después de salir."
          },
          {
            en: "Going straight ahead: you do not need to indicate on entry, this is the movement most newcomers get wrong because they assume no turn means no signal at all. You still need to indicate left just before your exit, then cancel it once you are off the roundabout.",
            pt: "Seguindo em frente: você não precisa sinalizar ao entrar, esse é o movimento que mais gente de fora erra, porque acha que não virar significa não precisar de seta nenhuma. Ainda assim você precisa sinalizar com a seta esquerda pouco antes da sua saída, e desligar assim que sair da rotatória.",
            es: "Siguiendo derecho: no necesitas indicar al entrar, este es el movimiento que más confunde a los recién llegados, porque suponen que no girar significa no necesitar ningún intermitente. Aun así necesitas indicar con el intermitente izquierdo justo antes de tu salida, y apagarlo apenas salgas de la rotonda."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Giving way once you are already on the roundabout",
          pt: "Cedendo passagem depois que você já está na rotatória",
          es: "Cediendo el paso una vez que ya estás en la rotonda"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "The basic entry rule, give way to whoever is already on the roundabout, is not the only give way rule that applies. If you need to change lanes while you are still going around a multi-lane roundabout, for example because you picked the wrong lane on entry, you must indicate the lane change and give way to any vehicle already in the lane you are moving into. Do not just drift across. Treat a lane change inside a roundabout with the same care as a lane change on any other multi-lane road, except that everyone involved is also turning at the same time.",
          pt: "A regra básica de entrada, ceder passagem para quem já está na rotatória, não é a única regra de ceder passagem que vale. Se você precisar trocar de faixa enquanto ainda está contornando uma rotatória com mais de uma faixa, por exemplo porque escolheu a faixa errada na entrada, você precisa sinalizar a troca de faixa e ceder passagem para qualquer veículo que já esteja na faixa para onde você está indo. Não fique simplesmente deslizando de uma faixa para outra. Trate uma troca de faixa dentro de uma rotatória com o mesmo cuidado de uma troca de faixa em qualquer outra via com várias faixas, só que com todo mundo virando ao mesmo tempo também.",
          es: "La regla básica de entrada, ceder el paso a quien ya está en la rotonda, no es la única regla de ceder el paso que aplica. Si necesitas cambiar de carril mientras todavía estás recorriendo una rotonda de varios carriles, por ejemplo porque elegiste el carril equivocado al entrar, debes indicar el cambio de carril y ceder el paso a cualquier vehículo que ya esté en el carril hacia el que te estás moviendo. No te deslices de un carril a otro sin más. Trata un cambio de carril dentro de una rotonda con el mismo cuidado que un cambio de carril en cualquier otra vía de varios carriles, solo que con todos girando al mismo tiempo también."
        }
      },
      {
        type: "heading",
        text: {
          en: "Cyclists at roundabouts",
          pt: "Ciclistas nas rotatórias",
          es: "Ciclistas en las rotondas"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Cyclists are treated as vehicles on Queensland roads, with rights and responsibilities that do not disappear at a roundabout, and their positioning can look unexpected if you are not used to it. On a single-lane roundabout, a cyclist is allowed to take up the whole lane, the same way a car does, rather than hugging the edge. On a multi-lane roundabout, a cyclist turning right may use either the right lane, like a car would, or the left lane. If a cyclist turns right from the left lane, they must give way to any vehicle that is already in the right lane and wants to exit there. As a driver, remember the reverse of that too: once a cyclist is already on the roundabout, in whichever lane, you give way to them entering just as you would to a car, and you should not assume a cyclist sitting in the left lane is only going straight or turning left.",
          pt: "Ciclistas são tratados como veículos nas vias da Queensland, com direitos e responsabilidades que não desaparecem numa rotatória, e o posicionamento deles pode parecer inesperado se você não estiver acostumado. Numa rotatória de uma faixa só, o ciclista tem o direito de ocupar a faixa inteira, do mesmo jeito que um carro, em vez de ficar colado na beirada. Numa rotatória com mais de uma faixa, um ciclista virando à direita pode usar a faixa da direita, como um carro faria, ou a faixa da esquerda. Se o ciclista virar à direita saindo da faixa da esquerda, ele precisa ceder passagem para qualquer veículo que já esteja na faixa da direita e queira sair ali. Como motorista, lembre também do contrário: uma vez que o ciclista já está na rotatória, em qualquer uma das faixas, você cede passagem para ele ao entrar, do mesmo jeito que cederia para um carro, e não deve presumir que um ciclista na faixa da esquerda vai necessariamente seguir em frente ou virar à esquerda.",
          es: "Los ciclistas son tratados como vehículos en las vías de Queensland, con derechos y responsabilidades que no desaparecen en una rotonda, y su posición puede parecer inesperada si no estás acostumbrado. En una rotonda de un solo carril, el ciclista tiene derecho a ocupar el carril completo, igual que un auto, en vez de pegarse al borde. En una rotonda de varios carriles, un ciclista que gira a la derecha puede usar el carril derecho, como lo haría un auto, o el carril izquierdo. Si el ciclista gira a la derecha desde el carril izquierdo, debe ceder el paso a cualquier vehículo que ya esté en el carril derecho y quiera salir ahí. Como conductor, recuerda también lo contrario: una vez que el ciclista ya está en la rotonda, en cualquiera de los carriles, tú le cedes el paso al entrar, igual que le cederías a un auto, y no debes suponer que un ciclista en el carril izquierdo necesariamente va a seguir derecho o girar a la izquierda."
        }
      },
      {
        type: "heading",
        text: {
          en: "Mistakes newcomers most often make at Queensland roundabouts",
          pt: "Erros que quem chega de fora mais comete nas rotatórias da Queensland",
          es: "Errores que los recién llegados más cometen en las rotondas de Queensland"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Picking a lane too late, or changing lanes once you are already going around the roundabout, without indicating and giving way to the traffic already in that lane.",
            pt: "Escolher a faixa tarde demais, ou trocar de faixa já contornando a rotatória, sem sinalizar e sem ceder passagem para quem já está naquela faixa.",
            es: "Elegir el carril demasiado tarde, o cambiar de carril mientras ya estás recorriendo la rotonda, sin indicar y sin ceder el paso a quien ya está en ese carril."
          },
          {
            en: "Forgetting to indicate left on exit when you are going straight through, since it does not feel like a real turn. It is still required.",
            pt: "Esquecer de sinalizar com a seta esquerda na saída quando está seguindo em frente, porque não parece uma virada de verdade. Mesmo assim é obrigatório.",
            es: "Olvidar indicar con el intermitente izquierdo al salir cuando vas derecho, porque no se siente como un giro real. Igual es obligatorio."
          },
          {
            en: "Assuming a pedestrian near the roundabout must always be given way. According to Transport and Main Roads guidance on roundabouts, the road rules do not automatically require a driver to give way to a pedestrian crossing near a roundabout unless there is a marked, priority crossing there. That is not permission to drive through without watching for people, it just means a Queensland roundabout does not work like a marked pedestrian crossing.",
            pt: "Presumir que um pedestre perto da rotatória sempre tem que receber passagem. Segundo a orientação da Transport and Main Roads sobre rotatórias, as regras de trânsito não exigem automaticamente que o motorista ceda passagem para um pedestre atravessando perto de uma rotatória, a não ser que exista ali uma faixa de pedestre demarcada e com prioridade. Isso não é permissão para passar sem prestar atenção nas pessoas, só significa que uma rotatória na Queensland não funciona como uma faixa de pedestre demarcada.",
            es: "Suponer que un peatón cerca de la rotonda siempre debe recibir el paso. Según la orientación de Transport and Main Roads sobre rotondas, las reglas de tránsito no exigen automáticamente que el conductor ceda el paso a un peatón que cruza cerca de una rotonda, a menos que haya ahí un cruce peatonal marcado y con prioridad. Esto no es permiso para pasar sin prestar atención a la gente, solo significa que una rotonda en Queensland no funciona como un cruce peatonal marcado."
          },
          {
            en: "Cutting off a truck or bus at a roundabout. A heavy vehicle displaying a DO NOT OVERTAKE TURNING VEHICLE sign is legally allowed to take up more than one lane to get around, so when you see one indicating, give it the extra space rather than trying to squeeze past.",
            pt: "Fechar um caminhão ou ônibus numa rotatória. Um veículo pesado com a placa DO NOT OVERTAKE TURNING VEHICLE (não ultrapasse o veículo que está virando) tem permissão legal de ocupar mais de uma faixa para contornar a rotatória, então quando você vir um sinalizando, dê o espaço extra em vez de tentar passar apertado.",
            es: "Cerrarle el paso a un camión o autobús en una rotonda. Un vehículo pesado con el cartel DO NOT OVERTAKE TURNING VEHICLE (no adelantar al vehículo que está girando) tiene permiso legal para ocupar más de un carril al recorrer la rotonda, así que cuando veas uno indicando, dale el espacio extra en vez de intentar pasar apretado."
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "This post is based on Queensland's official road rules for roundabouts, published by the Department of Transport and Main Roads, together with its guidance on bicycle riders and on sharing the road with heavy vehicles. It goes further than our general Queensland driving guide on this one topic, but it does not replace it. Use KangaLearner's Learn section and QLD practice questions to prepare for the actual test.",
          pt: "Este post é baseado nas regras oficiais de trânsito da Queensland para rotatórias, publicadas pelo Department of Transport and Main Roads, junto com a orientação deles sobre ciclistas e sobre dividir a via com veículos pesados. Ele vai além do nosso guia geral de direção na Queensland nesse tema específico, mas não substitui esse guia. Use a seção Aprender e as perguntas de prática de QLD do KangaLearner para se preparar para a prova de verdade.",
          es: "Este artículo está basado en las reglas oficiales de tránsito de Queensland para rotondas, publicadas por el Department of Transport and Main Roads, junto con su orientación sobre ciclistas y sobre compartir la vía con vehículos pesados. Va más allá de nuestra guía general de manejo en Queensland en este tema específico, pero no la reemplaza. Usa la sección Aprender y las preguntas de práctica de QLD de KangaLearner para prepararte para el examen de verdad."
        }
      }
    ]
  },
  {
    slug: "qld-school-zones-speed-limits-guide",
    icon: "safety",
    state: "QLD",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 8,
    title: {
      en: "Queensland school zones and speed limits: how the rules actually work",
      pt: "Zonas escolares e limites de velocidade na Queensland: como as regras funcionam de verdade",
      es: "Zonas escolares y límites de velocidad en Queensland: cómo funcionan realmente las reglas"
    },
    excerpt: {
      en: "Every school zone has 2 possible speed limits, not just 1, and its hours are set sign by sign, not state-wide. Here is exactly how Queensland's speed limits and school zones work, including what to do when there is no sign at all.",
      pt: "Toda zona escolar tem 2 limites de velocidade possíveis, não só 1, e o horário é definido placa por placa, não pelo estado inteiro. Veja exatamente como funcionam os limites de velocidade e as zonas escolares na Queensland, incluindo o que fazer quando não há placa nenhuma.",
      es: "Cada zona escolar tiene 2 límites de velocidad posibles, no solo 1, y el horario se define señal por señal, no para todo el estado. Esto es exactamente cómo funcionan los límites de velocidad y las zonas escolares en Queensland, incluyendo qué hacer cuando no hay ninguna señal."
    },
    sourceLabel: {
      en: "Queensland Government, School zone speed limits and signs",
      pt: "Queensland Government, School zone speed limits and signs",
      es: "Queensland Government, School zone speed limits and signs"
    },
    sourceUrl:
      "https://www.qld.gov.au/transport/safety/rules/schools/school-zone-speed-limits-and-signs",
    body: [
      {
        type: "paragraph",
        text: {
          en: "School zones cause more confusion for newcomers than almost any other Queensland road rule. Our general guide to driving in Queensland already covers the basics: 50 km/h in town, 100 km/h in the country, slow down near a school. This post goes much further into just this one topic. It walks through exactly how Queensland sets its default speed limits, how a school zone's operating hours are actually decided and signed, what the law says you should do on a road with no speed sign at all, and how Queensland actually enforces all of it, based on Queensland's road rules and the Department of Transport and Main Roads' own published guidance.",
          pt: "Zonas escolares confundem quem chega de fora mais do que quase qualquer outra regra de trânsito da Queensland. Nosso guia geral de direção na Queensland já cobre o básico: 50 km/h na cidade, 100 km/h no interior, reduza perto de uma escola. Este post vai muito além só nesse tema. Ele mostra exatamente como a Queensland define seus limites de velocidade padrão, como o horário de funcionamento de uma zona escolar é realmente decidido e sinalizado, o que a lei diz que você deve fazer numa via sem nenhuma placa de velocidade, e como a Queensland de fato fiscaliza tudo isso, com base nas regras de trânsito da Queensland e nas próprias páginas publicadas pelo Department of Transport and Main Roads.",
          es: "Las zonas escolares confunden a los recién llegados más que casi cualquier otra regla de tránsito de Queensland. Nuestra guía general para conducir en Queensland ya cubre lo básico: 50 km/h en la ciudad, 100 km/h en el campo, reduce la velocidad cerca de una escuela. Este artículo va mucho más allá, solo en este tema. Recorre exactamente cómo Queensland define sus límites de velocidad por defecto, cómo se decide y señaliza realmente el horario de funcionamiento de una zona escolar, qué dice la ley que debes hacer en una vía sin ninguna señal de velocidad, y cómo Queensland fiscaliza todo esto en la práctica, basado en las reglas de tránsito de Queensland y en las propias páginas publicadas por el Department of Transport and Main Roads."
        }
      },
      {
        type: "heading",
        text: {
          en: "Queensland's default speed limits, road type by road type",
          pt: "Os limites de velocidade padrão da Queensland, tipo de via por tipo de via",
          es: "Los límites de velocidad por defecto de Queensland, tipo de vía por tipo de vía"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Built-up areas (towns and suburbs): the default is 50 km/h under Queensland's Road Rules, whether or not a sign says so. Most ordinary suburban streets never get a 50 km/h sign, because the law does not require one there.",
            pt: "Áreas urbanizadas (cidades e subúrbios): o padrão é 50 km/h pelas Road Rules da Queensland, tenha placa dizendo isso ou não. A maioria das ruas comuns de subúrbio nunca recebe uma placa de 50 km/h, porque a lei não exige uma ali.",
            es: "Áreas urbanizadas (ciudades y suburbios): el límite por defecto es 50 km/h según las Road Rules de Queensland, haya o no una señal que lo diga. La mayoría de las calles comunes de un suburbio nunca reciben una señal de 50 km/h, porque la ley no exige una ahí."
          },
          {
            en: "Outside built-up areas: the default is 100 km/h. A higher limit, up to 110 km/h, only applies where a sign specifically posts it, generally on higher-standard roads.",
            pt: "Fora das áreas urbanizadas: o padrão é 100 km/h. Um limite maior, até 110 km/h, só vale onde uma placa indica isso especificamente, geralmente em vias de padrão mais alto.",
            es: "Fuera de las áreas urbanizadas: el límite por defecto es 100 km/h. Un límite mayor, hasta 110 km/h, solo aplica donde una señal lo indica específicamente, generalmente en vías de un estándar más alto."
          },
          {
            en: "Roads carrying through traffic inside a town or suburb: usually signed higher than the 50 km/h default, 60 km/h or more, and that higher limit is always shown on a sign, never assumed.",
            pt: "Vias que carregam tráfego de passagem dentro de uma cidade ou subúrbio: normalmente sinalizadas acima do padrão de 50 km/h, 60 km/h ou mais, e esse limite maior sempre aparece numa placa, nunca é presumido.",
            es: "Vías que llevan tránsito de paso dentro de una ciudad o suburbio: normalmente señalizadas por encima del límite por defecto de 50 km/h, 60 km/h o más, y ese límite mayor siempre aparece en una señal, nunca se presume."
          },
          {
            en: "Heavy vehicles: trucks over 12 tonnes and buses over 5 tonnes must not exceed 100 km/h, even on a stretch signed for 110 km/h.",
            pt: "Veículos pesados: caminhões acima de 12 toneladas e ônibus acima de 5 toneladas não podem passar de 100 km/h, mesmo num trecho sinalizado para 110 km/h.",
            es: "Vehículos pesados: los camiones de más de 12 toneladas y los autobuses de más de 5 toneladas no pueden superar los 100 km/h, ni siquiera en un tramo señalizado para 110 km/h."
          },
          {
            en: "School zones: either 40 km/h or 60 km/h during the zone's signed operating hours, which one depends on the road, covered in full detail below.",
            pt: "Zonas escolares: 40 km/h ou 60 km/h durante o horário de funcionamento indicado na placa da zona, dependendo da via, coberto em detalhes mais abaixo.",
            es: "Zonas escolares: 40 km/h o 60 km/h durante el horario de funcionamiento indicado en la señal de la zona, según la vía, explicado en detalle más abajo."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Working out the limit when there is no sign",
          pt: "Como descobrir o limite quando não há placa nenhuma",
          es: "Cómo saber el límite cuando no hay ninguna señal"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "In some countries, an unsigned road means there is no fixed limit, or at least an unclear one. Queensland does not work that way. The Road Rules set a default for every road in the state: 50 km/h if the road is in a built-up area, 100 km/h if it is not. A built-up area, in practice, is a street with continuous development alongside it, houses, shops, driveways, street lighting, rather than open paddocks or bush. That is part of why the government does not bother posting most suburban streets at 50 km/h: the law already assumes it. The practical rule for a newcomer is simple. If you are driving through a suburb or town with development on both sides and no sign says otherwise, treat it as 50 km/h. Once the development thins out and you are on the open road, 100 km/h is the default, and anything faster only applies where a sign specifically allows it. A sign does appear whenever the limit changes from that default, at the start and end of a school zone, or at the start of a higher-speed stretch, so a missing sign almost always means the default for that type of road, not a road with no limit at all.",
          pt: "Em alguns países, uma via sem placa significa que não há limite fixo, ou pelo menos um limite pouco claro. Na Queensland não funciona assim. As Road Rules definem um padrão para toda via do estado: 50 km/h se a via está numa área urbanizada, 100 km/h se não está. Na prática, uma área urbanizada é uma rua com ocupação contínua ao longo dela, casas, comércio, entradas de garagem, iluminação pública, e não campos abertos ou mato. É parte do motivo pelo qual o governo não se preocupa em sinalizar a maioria das ruas de subúrbio com placa de 50 km/h: a lei já presume isso. A regra prática para quem chega de fora é simples. Se você está dirigindo por um subúrbio ou cidade com ocupação dos dois lados e nenhuma placa diz o contrário, trate como 50 km/h. Quando a ocupação diminui e você está numa estrada aberta, 100 km/h é o padrão, e qualquer velocidade maior só vale onde uma placa permite especificamente. Uma placa sempre aparece quando o limite muda desse padrão, no início e no fim de uma zona escolar, ou no início de um trecho de velocidade maior, então a ausência de placa quase sempre significa o padrão daquele tipo de via, não uma via sem limite nenhum.",
          es: "En algunos países, una vía sin señal significa que no hay un límite fijo, o al menos uno poco claro. Queensland no funciona así. Las Road Rules fijan un límite por defecto para toda vía del estado: 50 km/h si la vía está en un área urbanizada, 100 km/h si no lo está. En la práctica, un área urbanizada es una calle con ocupación continua a los costados, casas, comercios, entradas de garaje, alumbrado público, en vez de campos abiertos o monte. Esa es parte de la razón por la que el gobierno no se molesta en señalizar la mayoría de las calles de un suburbio con 50 km/h: la ley ya lo da por hecho. La regla práctica para un recién llegado es simple. Si conduces por un suburbio o una ciudad con ocupación a ambos lados y ninguna señal dice lo contrario, trátalo como 50 km/h. Cuando la ocupación disminuye y estás en camino abierto, 100 km/h es el límite por defecto, y cualquier velocidad mayor solo aplica donde una señal lo permite específicamente. Una señal siempre aparece cuando el límite cambia respecto de ese valor por defecto, al inicio y al final de una zona escolar, o al comienzo de un tramo de mayor velocidad, así que la ausencia de señal casi siempre significa el límite por defecto de ese tipo de vía, no una vía sin límite alguno."
        }
      },
      {
        type: "heading",
        text: {
          en: "The two speed limits inside a school zone",
          pt: "Os dois limites de velocidade dentro de uma zona escolar",
          es: "Los dos límites de velocidad dentro de una zona escolar"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Most newcomers assume every school zone is 40 km/h. It is not that simple. On a road normally signed at 50, 60 or 70 km/h, the school zone limit drops to 40 km/h. On a road normally signed at 80 km/h or higher, meaning it usually carries faster through traffic, the school zone limit is 60 km/h instead. The number posted on the school zone sign itself always tells you which one applies to that particular zone, so read the sign rather than assuming 40 km/h everywhere.",
          pt: "A maioria de quem chega de fora acha que toda zona escolar é 40 km/h. Não é tão simples assim. Numa via normalmente sinalizada a 50, 60 ou 70 km/h, o limite da zona escolar cai para 40 km/h. Numa via normalmente sinalizada a 80 km/h ou mais, o que geralmente indica um tráfego de passagem mais rápido, o limite da zona escolar é 60 km/h em vez disso. O número indicado na própria placa da zona escolar sempre diz qual dos dois vale naquela zona específica, então leia a placa em vez de presumir 40 km/h em todo lugar.",
          es: "La mayoría de los recién llegados suponen que toda zona escolar es de 40 km/h. No es tan simple. En una vía normalmente señalizada a 50, 60 o 70 km/h, el límite de la zona escolar baja a 40 km/h. En una vía normalmente señalizada a 80 km/h o más, lo que suele indicar tránsito de paso más rápido, el límite de la zona escolar es de 60 km/h en cambio. El número indicado en la propia señal de la zona escolar siempre dice cuál de los dos aplica en esa zona en particular, así que lee la señal en vez de suponer 40 km/h en todas partes."
        }
      },
      {
        type: "heading",
        text: {
          en: "How school zone operating times actually work",
          pt: "Como o horário de funcionamento da zona escolar realmente funciona",
          es: "Cómo funciona realmente el horario de las zonas escolares"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Most Queensland school zones operate 7am to 9am and 2pm to 4pm on school days, but treat that as a generalisation, not a rule you can rely on everywhere. The exact hours for a specific zone are set on that zone's own sign, and they can differ from the standard times. Some council areas outside South East Queensland use different standardised hours for every school zone in their area. Some zones run all day, roughly 7am to 4pm, typically where a school has a split campus and students cross the road between the two sides at various times. Because more than one school can share a single school zone, and different schools can be on different term dates, even the Queensland Government's own advice is to check the sign rather than assume. Its published guidance for anyone unsure whether it is currently a school day is to slow down to the signed school zone limit regardless.",
          pt: "A maioria das zonas escolares da Queensland funciona das 7h às 9h e das 14h às 16h em dias letivos, mas trate isso como uma generalização, não uma regra em que você pode confiar em todo lugar. O horário exato de cada zona é definido na própria placa daquela zona, e pode ser diferente do horário padrão. Alguns municípios fora do South East Queensland usam horários padronizados diferentes para todas as zonas escolares da sua área. Algumas zonas funcionam o dia inteiro, mais ou menos das 7h às 16h, geralmente onde uma escola tem campus dividido e os alunos atravessam a via entre os dois lados em horários variados. Como mais de uma escola pode dividir a mesma zona escolar, e escolas diferentes podem ter calendários letivos diferentes, até a orientação do próprio governo da Queensland é conferir a placa em vez de presumir. A orientação publicada para quem não tem certeza se é dia letivo naquele momento é reduzir para o limite indicado na placa da zona escolar de qualquer forma.",
          es: "La mayoría de las zonas escolares de Queensland funcionan de 7 a 9am y de 2 a 4pm en días de clases, pero trata eso como una generalización, no como una regla en la que puedas confiar en todas partes. El horario exacto de cada zona está fijado en la propia señal de esa zona, y puede diferir del horario estándar. Algunos municipios fuera de South East Queensland usan horarios estandarizados distintos para todas las zonas escolares de su área. Algunas zonas funcionan todo el día, aproximadamente de 7am a 4pm, generalmente donde una escuela tiene un campus dividido y los estudiantes cruzan la vía entre ambos lados en distintos horarios. Como más de una escuela puede compartir una misma zona escolar, y distintas escuelas pueden tener calendarios lectivos distintos, hasta la propia recomendación del Gobierno de Queensland es revisar la señal en vez de suponer. Su orientación publicada para quien no esté seguro de si ese día hay clases es igualmente reducir la velocidad al límite indicado en la señal de la zona escolar."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Static school zone signs show the speed limit and the operating hours printed directly on the sign, and the reduced limit applies every school day during those hours whether or not the sign lights up.",
            pt: "Placas estáticas de zona escolar mostram o limite de velocidade e o horário de funcionamento impressos diretamente na placa, e o limite reduzido vale todo dia letivo naquele horário, acenda a placa ou não.",
            es: "Las señales fijas de zona escolar muestran el límite de velocidad y el horario de funcionamiento impresos directamente en la señal, y el límite reducido aplica todos los días de clases en ese horario, se ilumine la señal o no."
          },
          {
            en: "Flashing school zone signs add a flashing red circle and twin alternating yellow lights above the standard sign, lit only while the zone is actually in effect, a clear visual cue that the reduced limit applies right now.",
            pt: "Placas piscantes de zona escolar acrescentam um círculo vermelho piscante e duas luzes amarelas que piscam alternadamente acima da placa padrão, acesas só enquanto a zona está realmente em vigor, um sinal visual claro de que o limite reduzido vale naquele momento.",
            es: "Las señales intermitentes de zona escolar agregan un círculo rojo intermitente y dos luces amarillas que parpadean alternadamente encima de la señal estándar, encendidas solo mientras la zona está realmente vigente, una señal visual clara de que el límite reducido aplica en ese momento."
          },
          {
            en: "Either way, the safest habit is the one locals use: slow down through a signed school zone during its hours, whether or not you are certain a particular school is actually in session that day.",
            pt: "De qualquer forma, o hábito mais seguro é o mesmo que os locais usam: reduza a velocidade ao passar por uma zona escolar sinalizada durante o horário indicado, tenha certeza ou não de que aquela escola específica está com aula naquele dia.",
            es: "De cualquier forma, el hábito más seguro es el mismo que usan los locales: reduce la velocidad al pasar por una zona escolar señalizada durante su horario, tengas o no la certeza de que esa escuela en particular tiene clases ese día."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Children's crossings and crossing supervisors",
          pt: "Faixas de travessia escolar e os supervisores de travessia",
          es: "Cruces escolares y los supervisores de cruce"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Many school zones include what Queensland calls a children's crossing, a crossing point that only operates when a crossing supervisor is out on the road holding up a stop sign, usually alongside red children crossing flags. Once that supervisor steps out with the sign raised, every approaching driver must stop before the crossing and stay stopped until the supervisor and any children have finished crossing and the supervisor has stepped back off the road. You must also never stop your car on the crossing itself, or close enough to it to block the supervisor's view of approaching traffic. Outside the hours a supervisor is actually present, the same spot generally works like an ordinary marked pedestrian crossing instead.",
          pt: "Muitas zonas escolares incluem o que a Queensland chama de children's crossing, um ponto de travessia que só entra em operação quando um supervisor de travessia está na via segurando uma placa de pare, geralmente ao lado de bandeiras vermelhas de aviso de travessia de crianças. Assim que esse supervisor sai com a placa levantada, todo motorista se aproximando precisa parar antes da faixa e continuar parado até o supervisor e as crianças terminarem de atravessar e o supervisor voltar pra fora da via. Você também nunca deve parar o carro em cima da própria faixa, ou perto demais dela a ponto de bloquear a visão do supervisor sobre o trânsito se aproximando. Fora do horário em que um supervisor está de fato presente, o mesmo local geralmente funciona como uma faixa de pedestre comum.",
          es: "Muchas zonas escolares incluyen lo que Queensland llama un children's crossing, un punto de cruce que solo entra en funcionamiento cuando un supervisor de cruce está en la vía sosteniendo una señal de pare, generalmente junto a banderas rojas de aviso de cruce de niños. En cuanto ese supervisor sale con la señal levantada, todo conductor que se aproxima debe detenerse antes del cruce y permanecer detenido hasta que el supervisor y los niños terminen de cruzar y el supervisor vuelva a salir de la vía. Tampoco debes detener el auto sobre el propio cruce, ni demasiado cerca de él, ya que eso bloquea la vista del supervisor sobre el tránsito que se acerca. Fuera del horario en que un supervisor está realmente presente, el mismo lugar generalmente funciona como un cruce peatonal común."
        }
      },
      {
        type: "heading",
        text: {
          en: "Enforcement: cameras, fines and demerit points",
          pt: "Fiscalização: câmeras, multas e pontos na carteira",
          es: "Fiscalización: cámaras, multas y puntos de demérito"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Queensland enforces school zone and general speed limits with a mix of fixed roadside cameras, mobile camera cars and Queensland Police Service patrols. The Department of Transport and Main Roads has also been trialling camera-equipped flashing school zone signs at selected high-risk locations, so a flashing sign in a school zone is not purely a warning to slow down, it can also be recording your speed. Speeding penalties scale with how far over the limit you are caught, and the same fine and demerit point schedule applies whether the offence happens in a school zone or anywhere else in the state.",
          pt: "A Queensland fiscaliza os limites de velocidade das zonas escolares e os limites gerais com uma combinação de câmeras fixas na via, carros com câmera móvel e patrulhas da Queensland Police Service. O Department of Transport and Main Roads também vem testando placas piscantes de zona escolar equipadas com câmera em locais selecionados de maior risco, então uma placa piscando numa zona escolar não é só um aviso pra reduzir, ela também pode estar registrando sua velocidade. As penalidades por excesso de velocidade aumentam de acordo com o quanto você foi flagrado acima do limite, e a mesma tabela de multa e pontos vale tanto se a infração acontece numa zona escolar quanto em qualquer outro lugar do estado.",
          es: "Queensland fiscaliza los límites de velocidad de las zonas escolares y los límites generales con una combinación de cámaras fijas en la vía, autos con cámara móvil y patrullas de la Queensland Police Service. El Department of Transport and Main Roads también ha estado probando señales intermitentes de zona escolar equipadas con cámara en ubicaciones seleccionadas de mayor riesgo, así que una señal parpadeando en una zona escolar no es solo una advertencia para reducir la velocidad, también puede estar registrando tu velocidad. Las sanciones por exceso de velocidad aumentan según cuánto te hayan detectado por encima del límite, y la misma tabla de multas y puntos de demérito aplica tanto si la infracción ocurre en una zona escolar como en cualquier otro lugar del estado."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Caught less than 11 km/h over the limit: 1 demerit point, currently a $345 fine.",
            pt: "Flagrado a menos de 11 km/h acima do limite: 1 ponto na carteira, atualmente multa de $345.",
            es: "Detectado a menos de 11 km/h sobre el límite: 1 punto de demérito, actualmente una multa de $345."
          },
          {
            en: "11 to 20 km/h over: 3 demerit points, currently a $518 fine.",
            pt: "De 11 a 20 km/h acima: 3 pontos na carteira, atualmente multa de $518.",
            es: "De 11 a 20 km/h sobre el límite: 3 puntos de demérito, actualmente una multa de $518."
          },
          {
            en: "20 to 30 km/h over: 4 demerit points, currently a $777 fine.",
            pt: "De 20 a 30 km/h acima: 4 pontos na carteira, atualmente multa de $777.",
            es: "De 20 a 30 km/h sobre el límite: 4 puntos de demérito, actualmente una multa de $777."
          },
          {
            en: "30 to 40 km/h over: 6 demerit points, currently a $1,295 fine.",
            pt: "De 30 a 40 km/h acima: 6 pontos na carteira, atualmente multa de $1,295.",
            es: "De 30 a 40 km/h sobre el límite: 6 puntos de demérito, actualmente una multa de $1,295."
          },
          {
            en: "More than 40 km/h over: 8 demerit points, currently a $1,986 fine.",
            pt: "Mais de 40 km/h acima: 8 pontos na carteira, atualmente multa de $1,986.",
            es: "Más de 40 km/h sobre el límite: 8 puntos de demérito, actualmente una multa de $1,986."
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "Demerit points double for a second speeding, seatbelt, mobile phone or motorcycle helmet offence committed within 12 months of an earlier one, so a repeat speeding ticket close to your first can cost twice the points.",
          pt: "Os pontos dobram numa segunda infração de excesso de velocidade, cinto de segurança, celular ou capacete de moto cometida dentro de 12 meses de uma anterior, então uma segunda multa de velocidade logo depois da primeira pode custar o dobro dos pontos.",
          es: "Los puntos se duplican en una segunda infracción de exceso de velocidad, cinturón de seguridad, celular o casco de moto cometida dentro de los 12 meses de una anterior, así que una segunda multa por velocidad poco después de la primera puede costar el doble de puntos."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Queensland's own demerit points schedule even lists a separate category for driving at an unsafe speed near a crossing, worth 3 demerit points on its own, with the fine set by a court rather than a fixed on-the-spot amount. That is on top of whatever an ordinary speeding offence at the same moment would already carry.",
          pt: "A própria tabela de pontos da Queensland lista até uma categoria separada para dirigir em velocidade insegura perto de uma faixa de travessia, valendo 3 pontos na carteira por si só, com a multa definida por um tribunal em vez de um valor fixo na hora. Isso é além do que uma infração comum de excesso de velocidade no mesmo momento já custaria.",
          es: "La propia tabla de puntos de Queensland incluso incluye una categoría aparte para conducir a una velocidad insegura cerca de un cruce, que vale 3 puntos de demérito por sí sola, con la multa fijada por un tribunal en vez de un monto fijo en el momento. Eso se suma a lo que una infracción común de exceso de velocidad en ese mismo momento ya costaría."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This post is based on Queensland's Road Rules and the Queensland Government's own published guidance on school zones, speed limits and demerit points. Specific school zone hours, fees and fines are reviewed and changed from time to time, so always follow the sign in front of you and confirm current figures on qld.gov.au before you rely on them. Use KangaLearner's Learn section and QLD practice questions to prepare for the parts of this that show up in your learner licence test.",
          pt: "Este post é baseado nas Road Rules da Queensland e na própria orientação publicada pelo governo da Queensland sobre zonas escolares, limites de velocidade e pontos na carteira. Horários específicos de zona escolar, taxas e multas são revisados e mudam de tempos em tempos, então sempre siga a placa na sua frente e confirme os valores atuais em qld.gov.au antes de confiar neles. Use a seção Aprender e as perguntas de prática de QLD do KangaLearner pra se preparar para as partes disso que caem na sua prova de licença de aprendiz.",
          es: "Este artículo está basado en las Road Rules de Queensland y en la propia orientación publicada por el gobierno de Queensland sobre zonas escolares, límites de velocidad y puntos de demérito. Los horarios específicos de cada zona escolar, las tarifas y las multas se revisan y cambian de vez en cuando, así que sigue siempre la señal que tengas delante y confirma los valores actuales en qld.gov.au antes de confiar en ellos. Usa la sección Aprender y las preguntas de práctica de QLD de KangaLearner para prepararte para las partes de esto que aparezcan en tu examen de licencia de aprendiz."
        }
      }
    ]
  },
  {
    slug: "qld-mobile-phones-driving-guide",
    icon: "safety",
    state: "QLD",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "Mobile phones while driving in Queensland: the rules by licence stage",
      pt: "Celular ao dirigir na Queensland: as regras por etapa da licença",
      es: "El celular al conducir en Queensland: las reglas por etapa de licencia"
    },
    excerpt: {
      en: "From zero tolerance on a learner licence to what a phone cradle actually allows on P2, plus the AI cameras that catch illegal use and what one offence can do to your licence.",
      pt: "Da tolerância zero na licença learner ao que um suporte de celular realmente permite no P2, além das câmeras com IA que flagram o uso ilegal e o que uma infração pode fazer com sua licença.",
      es: "Desde la tolerancia cero en la licencia learner hasta lo que un soporte de celular realmente permite en el P2, además de las cámaras con IA que detectan el uso ilegal y lo que una infracción puede hacerle a tu licencia."
    },
    sourceLabel: {
      en: "Queensland Government, Driving and mobile phones",
      pt: "Queensland Government, Driving and mobile phones",
      es: "Queensland Government, Driving and mobile phones"
    },
    sourceUrl: "https://www.qld.gov.au/transport/safety/road-safety/mobile-phones",
    body: [
      {
        type: "paragraph",
        text: {
          en: "Queensland enforces its mobile phone road rules more heavily than most newcomers expect, with a dedicated network of AI cameras and a set of rules that change depending on which licence you hold. The details that matter most, what actually counts as illegal use, what a phone cradle allows and does not allow, and what a single offence can do to a learner or provisional licence, are spread across several official pages rather than explained in one place. This post pulls them together, based on Queensland Government sources.",
          pt: "A Queensland aplica as regras de celular no trânsito com mais rigor do que a maioria de quem chega de fora imagina, com uma rede dedicada de câmeras com inteligência artificial e um conjunto de regras que muda de acordo com a licença que você tem. Os detalhes que mais importam, o que realmente conta como uso ilegal, o que um suporte de celular permite e o que não permite, e o que uma única infração pode fazer com uma licença learner ou provisional, estão espalhados em várias páginas oficiais em vez de explicados num só lugar. Este post reúne tudo isso, com base em fontes do governo da Queensland.",
          es: "Queensland aplica las reglas de celular al conducir con más rigor de lo que la mayoría de los recién llegados imagina, con una red dedicada de cámaras con inteligencia artificial y un conjunto de reglas que cambia según la licencia que tengas. Los detalles que más importan, qué cuenta realmente como uso ilegal, qué permite y qué no permite un soporte de celular, y qué puede hacerle una sola infracción a una licencia learner o provisional, están repartidos en varias páginas oficiales en vez de explicados en un solo lugar. Este artículo los reúne, basado en fuentes del gobierno de Queensland."
        }
      },
      {
        type: "heading",
        text: {
          en: "What actually counts as illegal phone use",
          pt: "O que realmente conta como uso ilegal do celular",
          es: "Qué cuenta realmente como uso ilegal del celular"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Under Queensland's road rules, holding your phone in your hand while driving is illegal, and so is resting it on any part of your body, such as your lap or your shoulder. This applies whether the phone is switched on or off, in flight mode, or not being used for anything at all. It also applies while you are stopped in traffic or at a red light, not only while the car is moving. A lot of newcomers assume that being stationary changes the rule. It does not. The only exception is once you are properly stopped or parked, which is covered separately below.",
          pt: "Pelas regras de trânsito da Queensland, segurar o celular na mão enquanto dirige é ilegal, e apoiá-lo em qualquer parte do corpo, como o colo ou o ombro, também é. Isso vale mesmo que o celular esteja ligado ou desligado, em modo avião, ou sem estar sendo usado para nada. Também vale enquanto você está parado no trânsito ou num sinal vermelho, não só com o carro em movimento. Muita gente que chega de fora acha que estar parado muda a regra. Não muda. A única exceção é quando você está devidamente parado ou estacionado, o que é explicado separadamente mais abaixo.",
          es: "Según las normas de tránsito de Queensland, sostener el celular en la mano mientras conduces es ilegal, y apoyarlo en cualquier parte del cuerpo, como las piernas o el hombro, también lo es. Esto aplica sin importar si el celular está encendido o apagado, en modo avión, o si no lo estás usando para nada. También aplica mientras estás detenido en el tránsito o en un semáforo en rojo, no solo con el auto en movimiento. Mucha gente recién llegada supone que estar detenido cambia la regla. No cambia. La única excepción es cuando estás correctamente detenido o estacionado, lo cual se explica más abajo por separado."
        }
      },
      {
        type: "heading",
        text: {
          en: "Phone rules by licence stage",
          pt: "As regras do celular por etapa da licença",
          es: "Las reglas del celular por etapa de la licencia"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Learner licence, any age: zero tolerance. You cannot use a phone at all while driving, not hands-free, not Bluetooth, not mounted in a cradle, not even to skip a song. This applies no matter how old you are, an adult learner in their 30s or 40s has exactly the same restriction as a teenager.",
            pt: "Licença learner, qualquer idade: tolerância zero. Você não pode usar o celular de jeito nenhum enquanto dirige, nem viva-voz, nem Bluetooth, nem fixo em suporte, nem sequer pra pular uma música. Isso vale não importa a sua idade, um aprendiz adulto na casa dos 30 ou 40 anos tem exatamente a mesma restrição que um adolescente.",
            es: "Licencia learner, a cualquier edad: tolerancia cero. No puedes usar el celular de ninguna manera mientras conduces, ni manos libres, ni Bluetooth, ni montado en un soporte, ni siquiera para saltar una canción. Esto aplica sin importar tu edad, un aprendiz adulto de 30 o 40 años tiene exactamente la misma restricción que un adolescente."
          },
          {
            en: "P1 licence, under 25: also zero tolerance, the same as a learner. No hands-free calling, no wireless headset, no using the phone's own loudspeaker function, no touching a phone even if it is sitting in a pocket or pouch.",
            pt: "Licença P1, menos de 25 anos: também tolerância zero, igual a um learner. Nada de ligação em viva-voz, nada de fone de ouvido sem fio, nada de usar a função de alto-falante do próprio celular, nada de tocar no celular mesmo que ele esteja num bolso ou numa bolsinha.",
            es: "Licencia P1, menores de 25 años: también tolerancia cero, igual que un learner. Nada de llamadas en manos libres, nada de auriculares inalámbricos, nada de usar la función de altavoz del propio celular, nada de tocar el celular aunque esté en un bolsillo o en una riñonera."
          },
          {
            en: "P1 licence, 25 and over: you get the same hands-free options as a P2 or open licence holder, covered next.",
            pt: "Licença P1, 25 anos ou mais: você tem as mesmas opções de viva-voz que um motorista P2 ou com licença plena, explicadas a seguir.",
            es: "Licencia P1, 25 años o más: tienes las mismas opciones de manos libres que un conductor P2 o con licencia plena, explicadas a continuación."
          },
          {
            en: "P2 licence, any age: hands-free is allowed, either through a phone mounted in a cradle attached to the car, or through voice commands while the phone stays in a pocket or pouch you are wearing. You must not touch or look at the phone in the second case, voice control only.",
            pt: "Licença P2, qualquer idade: viva-voz é permitido, seja com o celular fixo num suporte preso ao carro, seja por comando de voz enquanto o celular fica num bolso ou numa bolsinha que você está usando. No segundo caso, você não pode tocar nem olhar para o celular, só comando de voz.",
            es: "Licencia P2, a cualquier edad: el uso en manos libres está permitido, ya sea con el celular montado en un soporte fijado al auto, ya sea por comando de voz mientras el celular queda en un bolsillo o en una riñonera que llevas puesta. En el segundo caso, no puedes tocar ni mirar el celular, solo comando de voz."
          },
          {
            en: "Open (full) licence, any age: same hands-free rules as P2, cradle mounted or voice only in a pocket or pouch. The phone's position must never block your view of the road.",
            pt: "Licença plena (open), qualquer idade: mesmas regras de viva-voz do P2, fixo em suporte ou só por comando de voz num bolso ou bolsinha. A posição do celular nunca pode atrapalhar sua visão da via.",
            es: "Licencia plena (open), a cualquier edad: las mismas reglas de manos libres que el P2, montado en soporte o solo por comando de voz en un bolsillo o riñonera. La posición del celular nunca debe obstruir tu visión de la vía."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Cradle or pocket: the two ways to go hands-free",
          pt: "Suporte ou bolso: os dois jeitos de usar em viva-voz",
          es: "Soporte o bolsillo: las dos formas de ir en manos libres"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "A cradle attached to the car and a phone kept in your own pocket or pouch are not treated the same way. With a cradle, you are allowed to touch the phone for specific functions, accepting a call, opening navigation, skipping a song, or accepting and ending a trip if you drive for a rideshare app. With a phone in a pocket or pouch, there is no touching or looking at all, only voice commands work. Either way, the phone's position must not obscure your view of the road, and since holding or touching a hand-held phone while driving is illegal on its own, the practical move is to set the cradle up and start your navigation before you pull away, not once you are already on the road.",
          pt: "Um suporte preso ao carro e um celular guardado no seu próprio bolso ou numa bolsinha não são tratados da mesma forma. Com o suporte, você pode tocar no celular pra funções específicas, atender uma ligação, abrir a navegação, pular uma música, ou aceitar e encerrar uma corrida se você dirige pra um aplicativo de transporte. Com o celular no bolso ou na bolsinha, não pode tocar nem olhar de jeito nenhum, só funciona por comando de voz. De qualquer forma, a posição do celular não pode atrapalhar sua visão da via, e como segurar ou tocar num celular na mão já é ilegal por si só enquanto você dirige, o mais prático é montar o suporte e iniciar a navegação antes de sair, não depois de já estar na via.",
          es: "Un soporte fijado al auto y un celular guardado en tu propio bolsillo o en una riñonera no se tratan de la misma manera. Con el soporte, puedes tocar el celular para funciones específicas, aceptar una llamada, abrir la navegación, saltar una canción, o aceptar y terminar un viaje si conduces para una aplicación de transporte. Con el celular en el bolsillo o en la riñonera, no se puede tocar ni mirar en absoluto, solo funciona por comando de voz. De cualquier forma, la posición del celular no debe obstruir tu visión de la vía, y como sostener o tocar un celular de mano ya es ilegal por sí solo mientras conduces, lo más práctico es armar el soporte e iniciar la navegación antes de arrancar, no una vez que ya estás en la vía."
        }
      },
      {
        type: "heading",
        text: {
          en: "When you are allowed to hold your phone",
          pt: "Quando você pode segurar o celular",
          es: "Cuándo puedes sostener el celular"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Paying at a drive-through, or getting a card or money out of your phone's digital wallet, once you are safely stopped.",
            pt: "Pagar num drive-through, ou pegar um cartão ou dinheiro na carteira digital do celular, quando você está parado com segurança.",
            es: "Pagar en un drive-through, o sacar una tarjeta o dinero de la billetera digital del celular, cuando estás detenido de forma segura."
          },
          {
            en: "Entering or leaving a car park or similar road-related area, once you are safely stopped.",
            pt: "Entrar ou sair de um estacionamento ou área semelhante ligada à via, quando você está parado com segurança.",
            es: "Entrar o salir de un estacionamiento o área similar relacionada con la vía, cuando estás detenido de forma segura."
          },
          {
            en: "Showing a digital driver licence, or another required document, to a police officer.",
            pt: "Mostrar a carteira de motorista digital, ou outro documento exigido, para um policial.",
            es: "Mostrar la licencia de conducir digital, o algún otro documento requerido, a un oficial de policía."
          },
          {
            en: "Any use at all once you are properly parked, meaning stopped with the intention of staying in that spot, not just paused in traffic.",
            pt: "Qualquer uso, sem restrição, quando você está devidamente estacionado, ou seja, parado com a intenção de ficar naquele lugar, não só parado no trânsito por um momento.",
            es: "Cualquier uso, sin restricción, cuando estás debidamente estacionado, es decir, detenido con la intención de quedarte en ese lugar, no solo detenido en el tránsito por un momento."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Fines, demerit points and what one offence can do to your licence",
          pt: "Multas, pontos na carteira e o que uma infração pode fazer com sua licença",
          es: "Multas, puntos de demérito y lo que una infracción puede hacerle a tu licencia"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "As of 1 July 2026, an illegal mobile phone offence carries a fine of $1,295 and 4 demerit points. If you commit a second phone offence within 1 year of the first, demerit points double to 8, though the fine stays the same. These numbers apply to every licence type, the difference is what those demerit points then do to your licence, which depends heavily on your licence stage.",
          pt: "Desde 1º de julho de 2026, uma infração ilegal de celular gera uma multa de $1,295 e 4 pontos na carteira. Se você cometer uma segunda infração de celular dentro de 1 ano da primeira, os pontos dobram para 8, mas a multa continua a mesma. Esses números valem pra todo tipo de licença, a diferença é o que esses pontos fazem com sua licença depois, o que depende muito da etapa em que você está.",
          es: "Desde el 1 de julio de 2026, una infracción ilegal de celular conlleva una multa de $1,295 y 4 puntos de demérito. Si cometes una segunda infracción de celular dentro del año siguiente a la primera, los puntos se duplican a 8, aunque la multa sigue siendo la misma. Estos números aplican a todo tipo de licencia, la diferencia está en lo que esos puntos le hacen después a tu licencia, lo cual depende mucho de la etapa en la que estés."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Learner licence: reaching 4 demerit points in any 1 year period triggers an automatic 3 month suspension, and there is no good driving behaviour option to avoid it. Since a single phone offence is worth 4 points, one offence alone is enough.",
            pt: "Licença learner: chegar a 4 pontos em qualquer período de 1 ano gera uma suspensão automática de 3 meses, e não existe opção de período de boa conduta pra evitar isso. Como uma única infração de celular já vale 4 pontos, uma só já é suficiente.",
            es: "Licencia learner: llegar a 4 puntos en cualquier período de 1 año provoca una suspensión automática de 3 meses, y no existe la opción de un período de buena conducta para evitarla. Como una sola infracción de celular ya vale 4 puntos, con una sola alcanza."
          },
          {
            en: "P1 and P2 licences: reaching 4 demerit points in any 1 year period triggers a formal notice giving you a choice, either a 1 year good driving behaviour period, or a 3 month suspension. If you do not choose in time, the 3 month suspension applies automatically. Again, one phone offence is enough to reach that 4 point threshold on its own.",
            pt: "Licenças P1 e P2: chegar a 4 pontos em qualquer período de 1 ano gera um aviso formal te dando uma escolha, ou um período de boa conduta de 1 ano, ou uma suspensão de 3 meses. Se você não escolher a tempo, a suspensão de 3 meses vale automaticamente. De novo, uma infração de celular sozinha já basta pra chegar a esses 4 pontos.",
            es: "Licencias P1 y P2: llegar a 4 puntos en cualquier período de 1 año genera un aviso formal que te da a elegir, un período de buena conducta de 1 año, o una suspensión de 3 meses. Si no eliges a tiempo, la suspensión de 3 meses se aplica automáticamente. De nuevo, una sola infracción de celular ya alcanza para llegar a esos 4 puntos."
          },
          {
            en: "Open licence: the threshold is higher, 12 or more demerit points within any 3 year period before a sanction notice is triggered, so a single 4 point phone offence does not put an open licence at immediate risk the way it does for a learner or P plater, though repeat offences add up quickly since points double each time.",
            pt: "Licença plena (open): o limite é maior, 12 pontos ou mais dentro de qualquer período de 3 anos antes de gerar um aviso de sanção, então uma única infração de celular de 4 pontos não coloca uma licença plena em risco imediato do jeito que coloca uma learner ou uma P. Ainda assim, infrações repetidas somam rápido, já que os pontos dobram a cada vez.",
            es: "Licencia plena (open): el límite es más alto, 12 puntos o más dentro de cualquier período de 3 años antes de generar un aviso de sanción, así que una sola infracción de celular de 4 puntos no pone en riesgo inmediato una licencia plena de la forma en que sí lo hace con una learner o una P. Aun así, las infracciones repetidas se acumulan rápido, ya que los puntos se duplican cada vez."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "How Queensland catches illegal phone use: the AI cameras",
          pt: "Como a Queensland flagra o uso ilegal do celular: as câmeras com IA",
          es: "Cómo Queensland detecta el uso ilegal del celular: las cámaras con IA"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Queensland uses a network of fixed and portable cameras that photograph the front seats of every vehicle that passes, using artificial intelligence to flag possible mobile phone or seatbelt offences. If the system flags an image, it goes to a person for review before any fine is issued, and if no offence is confirmed, the images are deleted. Fixed cameras run 24 hours a day at set locations, portable ones move around, and the government does not publish where they are. In practice, this means you cannot assume you are safe just because you do not see a camera.",
          pt: "A Queensland usa uma rede de câmeras fixas e portáteis que fotografam os bancos da frente de todo veículo que passa, usando inteligência artificial pra identificar possíveis infrações de celular ou cinto de segurança. Se o sistema identifica uma imagem suspeita, ela vai pra revisão de uma pessoa antes de qualquer multa ser emitida, e se nenhuma infração for confirmada, as imagens são apagadas. As câmeras fixas funcionam 24 horas por dia em locais definidos, as portáteis se movem, e o governo não divulga onde elas estão. Na prática, isso significa que você não pode presumir que está seguro só porque não vê nenhuma câmera.",
          es: "Queensland usa una red de cámaras fijas y portátiles que fotografían los asientos delanteros de cada vehículo que pasa, usando inteligencia artificial para detectar posibles infracciones de celular o de cinturón de seguridad. Si el sistema marca una imagen, esta pasa a revisión de una persona antes de emitir cualquier multa, y si no se confirma ninguna infracción, las imágenes se eliminan. Las cámaras fijas funcionan las 24 horas en ubicaciones fijas, las portátiles se desplazan, y el gobierno no publica dónde están. En la práctica, esto significa que no puedes asumir que estás a salvo solo porque no ves ninguna cámara."
        }
      },
      {
        type: "heading",
        text: {
          en: "Other in-car technology: radar detectors are illegal too",
          pt: "Outras tecnologias no carro: detector de radar também é ilegal",
          es: "Otras tecnologías en el auto: el detector de radar también es ilegal"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Phones are not the only piece of technology Queensland regulates inside a car. Queensland's road rules include a specific section on using radar detectors and similar devices, which makes it an offence to have a radar or laser detector, or a jamming device meant to interfere with speed detection equipment, in or on your vehicle. This applies whether or not the device is switched on or working, simply having it in the car is enough to breach the rule. If you are moving from a country where radar detectors are legal or common, such as parts of the United States, leave it at home or do not bring it into the car in Queensland.",
          pt: "O celular não é a única tecnologia que a Queensland regula dentro do carro. As regras de trânsito da Queensland têm uma seção específica sobre o uso de detectores de radar e dispositivos parecidos, que torna infração ter um detector de radar ou laser, ou um aparelho de interferência feito pra atrapalhar equipamentos de detecção de velocidade, dentro ou no seu veículo. Isso vale mesmo que o aparelho esteja ligado ou desligado, funcionando ou não, só o fato de estar no carro já basta pra configurar a infração. Se você está vindo de um país onde detector de radar é legal ou comum, como em partes dos Estados Unidos, deixe o seu em casa ou não leve para o carro na Queensland.",
          es: "El celular no es la única tecnología que Queensland regula dentro de un auto. Las normas de tránsito de Queensland incluyen una sección específica sobre el uso de detectores de radar y dispositivos similares, que convierte en infracción tener un detector de radar o láser, o un dispositivo de interferencia diseñado para afectar equipos de detección de velocidad, dentro o sobre tu vehículo. Esto aplica sin importar si el dispositivo está encendido o apagado, o funcionando o no, con que esté en el auto ya alcanza para configurar la infracción. Si vienes de un país donde el detector de radar es legal o común, como en partes de Estados Unidos, déjalo en casa o no lo lleves al auto en Queensland."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This post covers what Queensland's official pages say about mobile phones and in-car technology specifically. For everything else about driving in the state, and to prepare for the actual content of your learner or licence test, use KangaLearner's Learn section and QLD practice questions.",
          pt: "Este post cobre especificamente o que as páginas oficiais da Queensland dizem sobre celular e tecnologia dentro do carro. Pra tudo o mais sobre dirigir no estado, e pra se preparar para o conteúdo real da sua prova de aprendiz ou de licença, use a seção Aprender e as perguntas de prática de QLD do KangaLearner.",
          es: "Este artículo cubre específicamente lo que dicen las páginas oficiales de Queensland sobre el celular y la tecnología dentro del auto. Para todo lo demás sobre conducir en el estado, y para prepararte para el contenido real de tu examen de aprendiz o de licencia, usa la sección Aprender y las preguntas de práctica de QLD de KangaLearner."
        }
      }
    ]
  },
  {
    slug: "qld-alcohol-drug-driving-guide",
    icon: "safety",
    state: "QLD",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 8,
    title: {
      en: "Alcohol and drug driving rules in Queensland, explained",
      pt: "Regras de álcool e drogas ao volante na Queensland, explicadas",
      es: "Reglas de alcohol y drogas al volante en Queensland, explicadas"
    },
    excerpt: {
      en: "Zero for learners, under 0.05 for open licence holders, and zero again if you drive for work. A deep dive into Queensland's blood alcohol limits, roadside drug testing and what actually happens if you are caught.",
      pt: "Zero para learners, abaixo de 0,05 para quem tem licença plena, e zero de novo se você dirige a trabalho. Um mergulho profundo nos limites de álcool no sangue da Queensland, nos testes de drogas na via e no que realmente acontece se você for pego.",
      es: "Cero para los learners, por debajo de 0,05 para quienes tienen licencia plena, y cero otra vez si conduces por trabajo. Una mirada a fondo a los límites de alcohol en sangre de Queensland, los test de drogas en la vía y lo que realmente pasa si te agarran."
    },
    sourceLabel: {
      en: "Queensland Government, Alcohol limits and drug driving (qld.gov.au)",
      pt: "Queensland Government, Alcohol limits and drug driving (qld.gov.au)",
      es: "Queensland Government, Alcohol limits and drug driving (qld.gov.au)"
    },
    sourceUrl: "https://www.qld.gov.au/transport/safety/road-safety/drink-driving/blood-alcohol",
    body: [
      {
        type: "paragraph",
        text: {
          en: "Most newcomer guides mention, in one line, that Queensland has strict drink driving laws. That line is true, but it hides a system with four separate alcohol limits, a completely separate roadside test for drugs, and rules that apply differently depending on what licence you hold and what you are driving. This post goes deeper into that system: how the blood alcohol limits actually work by licence class, how roadside drug testing works in practice, and what a newcomer should understand about how enforcement plays out, from the first roadside stop to what happens if you are convicted. It is written to help you understand the system, not as legal advice, if you are ever actually charged with an offence you should get advice from a lawyer or Legal Aid Queensland.",
          pt: "A maioria dos guias para quem chega de fora menciona, numa linha só, que a Queensland tem leis rígidas contra dirigir alcoolizado. Essa linha é verdadeira, mas esconde um sistema com quatro limites de álcool diferentes, um teste de drogas na via completamente separado, e regras que mudam dependendo de qual licença você tem e do que você está dirigindo. Este post aprofunda esse sistema: como os limites de álcool no sangue funcionam de verdade por categoria de licença, como o teste de drogas na via funciona na prática, e o que quem chega de fora precisa entender sobre como a fiscalização acontece, desde a primeira parada na via até o que acontece se você for condenado. Ele foi escrito para ajudar você a entender o sistema, não como aconselhamento jurídico, se você realmente for acusado de uma infração, procure orientação de um advogado ou da Legal Aid Queensland.",
          es: "La mayoría de las guías para recién llegados mencionan, en una sola línea, que Queensland tiene leyes estrictas contra conducir bajo los efectos del alcohol. Esa línea es cierta, pero esconde un sistema con cuatro límites de alcohol distintos, un test de drogas en la vía completamente aparte, y reglas que cambian según qué licencia tengas y qué estés conduciendo. Este artículo profundiza en ese sistema: cómo funcionan realmente los límites de alcohol en sangre según la categoría de licencia, cómo funciona en la práctica el test de drogas en la vía, y qué debe entender un recién llegado sobre cómo funciona la fiscalización, desde la primera parada en la vía hasta lo que pasa si te condenan. Está escrito para ayudarte a entender el sistema, no como asesoría legal, si alguna vez te acusan de verdad de una infracción, busca orientación de un abogado o de Legal Aid Queensland."
        }
      },
      {
        type: "heading",
        text: {
          en: "Four different BAC limits, depending on who you are",
          pt: "Quatro limites de álcool diferentes, dependendo de quem você é",
          es: "Cuatro límites de alcohol distintos, según quién seas"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Queensland does not have one blood alcohol limit, it has four, and which one applies to you depends on your licence class and sometimes on what vehicle you are driving, not on how much you think you can handle. The four categories are the no alcohol limit (0.00), the general alcohol limit (below 0.05), the middle alcohol limit (0.10 and over) and the high alcohol limit (0.15 and over), and they are the basis for both the roadside test result and the offence you would be charged with.",
          pt: "A Queensland não tem um único limite de álcool no sangue, ela tem quatro, e qual deles vale para você depende da categoria da sua licença e, às vezes, do veículo que você está dirigindo, não de quanto você acha que aguenta. As quatro categorias são o limite sem álcool (0,00), o limite geral de álcool (abaixo de 0,05), o limite médio de álcool (0,10 ou mais) e o limite alto de álcool (0,15 ou mais), e são elas que definem tanto o resultado do teste na via quanto a infração pela qual você seria autuado.",
          es: "Queensland no tiene un solo límite de alcohol en sangre, tiene cuatro, y cuál de ellos te aplica depende de la categoría de tu licencia y, a veces, del vehículo que estés conduciendo, no de cuánto creas que aguantas. Las cuatro categorías son el límite sin alcohol (0,00), el límite general de alcohol (por debajo de 0,05), el límite medio de alcohol (0,10 o más) y el límite alto de alcohol (0,15 o más), y son la base tanto del resultado del test en la vía como de la infracción por la que te acusarían."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Zero (0.00): every learner, provisional (P1 and P2), probationary or restricted licence holder, at any age. There is no small amount that is allowed.",
            pt: "Zero (0,00): todo motorista com licença learner, provisional (P1 e P2), probatória ou restrita, em qualquer idade. Não existe uma quantidade pequena que seja permitida.",
            es: "Cero (0,00): todo conductor con licencia learner, provisional (P1 y P2), probatoria o restringida, sin importar la edad. No existe una cantidad pequeña que esté permitida."
          },
          {
            en: "Below 0.05: open (full) licence holders, once they are off their zero-alcohol conditions. This is the only category where any measurable alcohol is legally allowed.",
            pt: "Abaixo de 0,05: motoristas com licença plena (open), depois de saírem das condições de zero álcool. Essa é a única categoria em que qualquer quantidade mensurável de álcool é permitida por lei.",
            es: "Por debajo de 0,05: conductores con licencia plena (open), una vez que salen de las condiciones de cero alcohol. Esta es la única categoría en la que cualquier cantidad medible de alcohol está permitida por ley."
          },
          {
            en: "Zero for your first 12 months on a class RE motorcycle licence, even if you already hold an open car licence.",
            pt: "Zero nos seus primeiros 12 meses com uma licença de motocicleta classe RE, mesmo que você já tenha uma licença plena de carro.",
            es: "Cero durante tus primeros 12 meses con una licencia de motocicleta clase RE, incluso si ya tienes una licencia plena de auto."
          },
          {
            en: "Zero regardless of your licence class if you are driving a truck over 4.5 tonnes GVM (gross vehicle mass), a bus built for more than 12 adults, an articulated vehicle such as a B-double or road train, a vehicle carrying enough dangerous goods to require hazard placards, a taxi, limousine or ride-booking vehicle providing a public passenger service, a tow truck, pilot or escort vehicle, a vehicle used for driver training, a specially constructed vehicle or a tractor, or if you already have an interlock condition on your licence.",
            pt: "Zero independente da categoria da sua licença se você estiver dirigindo um caminhão com mais de 4,5 toneladas de peso bruto (GVM), um ônibus feito para mais de 12 adultos, um veículo articulado como um B-double ou road train, um veículo transportando produtos perigosos em quantidade suficiente para exigir placas de identificação de risco, um táxi, limusine ou veículo de aplicativo prestando serviço de transporte de passageiros, um caminhão-guincho, veículo piloto ou de escolta, um veículo usado para treinamento de motoristas, um veículo de construção especial ou um trator, ou se você já tiver uma condição de interlock na sua licença.",
            es: "Cero sin importar la categoría de tu licencia si conduces un camión de más de 4,5 toneladas de peso bruto (GVM), un autobús construido para más de 12 adultos, un vehículo articulado como un B-double o road train, un vehículo que transporta mercancías peligrosas en cantidad suficiente para requerir placas de identificación de riesgo, un taxi, limusina o vehículo de transporte por aplicación que presta un servicio de pasajeros, una grúa, vehículo piloto o de escolta, un vehículo usado para entrenamiento de conductores, un vehículo de construcción especial o un tractor, o si ya tienes una condición de interlock en tu licencia."
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "Below 0.05 is not the same as safe. Queensland's own road safety data shows drink driving is involved in more than a fifth of all lives lost on the state's roads, an average of 57 Queenslanders killed and a further 834 injured every year. 11% of Queenslanders admit to having driven over the limit, and 21% admit to driving the next day when they might still have been over it, since the only thing that actually breaks down alcohol is time, not coffee, food or a shower.",
          pt: "Estar abaixo de 0,05 não é o mesmo que estar seguro. Os próprios dados de segurança no trânsito da Queensland mostram que dirigir alcoolizado está envolvido em mais de um quinto de todas as mortes nas vias do estado, uma média de 57 pessoas mortas por ano na Queensland e mais 834 feridas. 11% dos moradores da Queensland admitem já ter dirigido acima do limite, e 21% admitem dirigir na manhã seguinte quando ainda podem estar acima do limite, já que a única coisa que realmente elimina o álcool do corpo é o tempo, não café, comida ou banho.",
          es: "Estar por debajo de 0,05 no es lo mismo que estar seguro. Los propios datos de seguridad vial de Queensland muestran que conducir bajo los efectos del alcohol está involucrado en más de una quinta parte de todas las muertes en las vías del estado, un promedio de 57 personas fallecidas por año en Queensland y otras 834 heridas. El 11% de los residentes de Queensland admite haber conducido por encima del límite, y el 21% admite conducir a la mañana siguiente cuando todavía podría estar por encima del límite, ya que lo único que realmente elimina el alcohol del cuerpo es el tiempo, no el café, la comida ni una ducha."
        }
      },
      {
        type: "heading",
        text: {
          en: "What happens at the roadside, and after",
          pt: "O que acontece na abordagem policial, e depois",
          es: "Qué pasa en el control policial, y después"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Queensland police carry out random breath testing, meaning you can be stopped and asked to blow into a handheld device without needing to have done anything wrong first. A reading under 0.10 leads to a 24 hour licence suspension on the spot. A reading of 0.10 or over, or refusing to provide a sample, leads to an immediate suspension that lasts until your matter is dealt with by a court.",
          pt: "A polícia da Queensland faz testes de bafômetro aleatórios, ou seja, você pode ser parado e ter que soprar num aparelho portátil sem precisar ter feito nada de errado antes. Um resultado abaixo de 0,10 leva a uma suspensão da licença de 24 horas, na hora. Um resultado de 0,10 ou mais, ou se recusar a soprar, leva a uma suspensão imediata que dura até o seu caso ser julgado por um tribunal.",
          es: "La policía de Queensland hace controles de alcoholemia aleatorios, es decir, te pueden detener y pedirte que soples en un dispositivo portátil sin que hayas hecho nada malo antes. Un resultado por debajo de 0,10 lleva a una suspensión de la licencia de 24 horas, en el momento. Un resultado de 0,10 o más, o negarte a dar la muestra, lleva a una suspensión inmediata que dura hasta que tu caso sea resuelto por un tribunal."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "No alcohol limit breach (learner, provisional or restricted licence with any alcohol detected): disqualification of 3 to 9 months, a fine of up to $2,417, and up to 3 months imprisonment.",
            pt: "Infração ao limite sem álcool (licença learner, provisional ou restrita com qualquer nível de álcool detectado): inabilitação de 3 a 9 meses, multa de até $2,417, e até 3 meses de prisão.",
            es: "Infracción al límite sin alcohol (licencia learner, provisional o restringida con cualquier nivel de alcohol detectado): inhabilitación de 3 a 9 meses, multa de hasta $2,417, y hasta 3 meses de prisión."
          },
          {
            en: "General alcohol limit, low range (0.05 up to but under 0.10): disqualification of 1 to 9 months, a fine of up to $2,417, and up to 3 months imprisonment.",
            pt: "Limite geral de álcool, faixa baixa (de 0,05 até menos de 0,10): inabilitação de 1 a 9 meses, multa de até $2,417, e até 3 meses de prisão.",
            es: "Límite general de alcohol, rango bajo (de 0,05 hasta menos de 0,10): inhabilitación de 1 a 9 meses, multa de hasta $2,417, y hasta 3 meses de prisión."
          },
          {
            en: "Middle alcohol limit (0.10 up to but under 0.15): disqualification of 3 to 12 months, a fine of up to $3,454, and up to 6 months imprisonment.",
            pt: "Limite médio de álcool (de 0,10 até menos de 0,15): inabilitação de 3 a 12 meses, multa de até $3,454, e até 6 meses de prisão.",
            es: "Límite medio de alcohol (de 0,10 hasta menos de 0,15): inhabilitación de 3 a 12 meses, multa de hasta $3,454, y hasta 6 meses de prisión."
          },
          {
            en: "High alcohol limit, driving under the influence (0.15 and over): disqualification of at least 6 months, a fine of up to $4,835, and up to 9 months imprisonment.",
            pt: "Limite alto de álcool, dirigir sob influência (0,15 ou mais): inabilitação de pelo menos 6 meses, multa de até $4,835, e até 9 meses de prisão.",
            es: "Límite alto de alcohol, conducir bajo la influencia (0,15 o más): inhabilitación de al menos 6 meses, multa de hasta $4,835, y hasta 9 meses de prisión."
          },
          {
            en: "A repeat offence within 5 years increases the maximum disqualification to up to 2 years and the maximum fine to up to $10,362.",
            pt: "Uma reincidência dentro de 5 anos aumenta a inabilitação máxima para até 2 anos e a multa máxima para até $10,362.",
            es: "Una reincidencia dentro de 5 años aumenta la inhabilitación máxima a hasta 2 años y la multa máxima a hasta $10,362."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Getting your licence back: alcohol interlocks",
          pt: "Recuperando sua licença: interlocks de álcool",
          es: "Recuperando tu licencia: interlocks de alcohol"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "A conviction for driving under the influence, for a BAC of 0.10 or over, or for refusing to provide a breath or blood sample, enrols you in Queensland's Alcohol Ignition Interlock Program once your disqualification ends. You need to have an interlock, a breath testing device wired to your car's ignition, fitted to whichever vehicle you drive. If you do not take part in the program, you are not permitted to drive at all for 5 years from the end of your disqualification period, or from the date you were issued a work licence.",
          pt: "Uma condenação por dirigir sob influência, por uma concentração de álcool de 0,10 ou mais, ou por se recusar a dar uma amostra de sopro ou sangue, coloca você automaticamente no Alcohol Ignition Interlock Program da Queensland assim que a sua inabilitação terminar. Você vai precisar instalar um interlock, um aparelho de teste de sopro ligado à ignição do carro, no veículo que você dirigir. Se você não participar do programa, fica proibido de dirigir por 5 anos inteiros a partir do fim do período de inabilitação, ou da data em que recebeu uma licença de trabalho.",
          es: "Una condena por conducir bajo la influencia, por una concentración de alcohol de 0,10 o más, o por negarte a dar una muestra de aliento o sangre, te inscribe automáticamente en el Alcohol Ignition Interlock Program de Queensland en cuanto termine tu inhabilitación. Vas a tener que instalar un interlock, un dispositivo de test de aliento conectado al encendido del auto, en el vehículo que conduzcas. Si no participas en el programa, quedas prohibido de conducir por 5 años completos a partir del fin del período de inhabilitación, o de la fecha en que te dieron una licencia de trabajo."
        }
      },
      {
        type: "heading",
        text: {
          en: "Roadside drug testing: what the saliva test actually checks",
          pt: "Teste de drogas na via: o que o teste de saliva realmente verifica",
          es: "Test de drogas en la vía: qué verifica realmente el test de saliva"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Separately from breath testing, Queensland police carry out random roadside saliva tests for four relevant drugs: methamphetamine (also called speed or ice), MDMA, THC (the active compound in cannabis) and cocaine, at random breath testing sites and at dedicated drug test sites. A positive screening result triggers a second saliva sample on the spot, and if that is positive too, the sample goes to a laboratory for confirmation. If an officer separately suspects your driving is actually impaired, you can also be required to give a blood sample. Either way it is genuinely zero tolerance, any detectable trace is enough to be charged, not just visible impairment. A positive result suspends your licence for 24 hours, or immediately and until your court date if you already have a drug driving charge pending.",
          pt: "Separado do teste de bafômetro, a polícia da Queensland faz testes de saliva aleatórios na via para quatro drogas relevantes: metanfetamina (também chamada de speed ou ice), MDMA, THC (o composto ativo da cannabis) e cocaína, nos mesmos locais das blitzes de bafômetro e em locais dedicados a teste de drogas. Um resultado positivo na triagem leva a uma segunda amostra de saliva na hora, e se essa segunda também for positiva, a amostra vai para um laboratório para confirmação. Se um policial suspeitar separadamente que a sua direção está de fato comprometida, você também pode ser obrigado a dar uma amostra de sangue. De um jeito ou de outro, é realmente tolerância zero, qualquer traço detectável já é suficiente para você ser autuado, não só um efeito visível. Um resultado positivo suspende sua licença por 24 horas, ou imediatamente e até a data do seu julgamento se você já tiver uma acusação de dirigir drogado pendente.",
          es: "Aparte del test de alcoholemia, la policía de Queensland hace test de saliva aleatorios en la vía para cuatro drogas relevantes: metanfetamina (también llamada speed o ice), MDMA, THC (el compuesto activo del cannabis) y cocaína, en los mismos puntos de control de alcoholemia y en puntos dedicados a test de drogas. Un resultado positivo en el filtro inicial lleva a una segunda muestra de saliva en el momento, y si esa segunda también da positivo, la muestra va a un laboratorio para confirmación. Si un policía sospecha por separado que tu manejo está realmente afectado, también te pueden pedir una muestra de sangre. De cualquier forma, es realmente tolerancia cero, cualquier rastro detectable ya es suficiente para que te acusen, no solo un efecto visible. Un resultado positivo suspende tu licencia por 24 horas, o de inmediato y hasta la fecha de tu audiencia si ya tienes un cargo pendiente por conducir drogado."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Driving with a relevant drug merely present in your saliva or blood: a first offence disqualification of 1 to 9 months, a fine of up to $2,417 and up to 3 months imprisonment, the same range as low range drink driving.",
            pt: "Dirigir com uma droga relevante apenas presente na saliva ou no sangue: na primeira infração, inabilitação de 1 a 9 meses, multa de até $2,417 e até 3 meses de prisão, a mesma faixa da infração de álcool em faixa baixa.",
            es: "Conducir con una droga relevante simplemente presente en la saliva o la sangre: en la primera infracción, inhabilitación de 1 a 9 meses, multa de hasta $2,417 y hasta 3 meses de prisión, el mismo rango que la infracción de alcohol en rango bajo."
          },
          {
            en: "Driving under the influence of a drug, a more serious charge that requires actual impairment, not just presence: at least 6 months disqualification, a fine of up to $4,835 and up to 9 months imprisonment, matching the high range alcohol penalty.",
            pt: "Dirigir sob influência de uma droga, uma acusação mais séria que exige comprometimento de fato, não só presença: pelo menos 6 meses de inabilitação, multa de até $4,835 e até 9 meses de prisão, igualando a penalidade de álcool em faixa alta.",
            es: "Conducir bajo la influencia de una droga, un cargo más serio que exige una afectación real, no solo presencia: al menos 6 meses de inhabilitación, multa de hasta $4,835 y hasta 9 meses de prisión, igualando la pena de alcohol en rango alto."
          },
          {
            en: "Refusing to provide a saliva sample is its own offence: a fine of up to $6,908 or up to 6 months imprisonment.",
            pt: "Recusar-se a dar uma amostra de saliva é uma infração à parte: multa de até $6,908 ou até 6 meses de prisão.",
            es: "Negarse a dar una muestra de saliva es una infracción aparte: multa de hasta $6,908 o hasta 6 meses de prisión."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Prescriptions do not create an exception",
          pt: "Receita médica não cria exceção",
          es: "La receta médica no crea una excepción"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This is the part that trips up newcomers who come from places where medicinal cannabis use comes with legal driving protections. In Queensland it does not: it is an offence to drive with THC in your system even when it was legitimately prescribed by a doctor. The prescription protects you from a drug possession charge, not from a drug driving charge. The same caution applies more broadly, plenty of ordinary prescription and over the counter medications, including some sold in supermarkets, carry warnings about driving. If you are starting a new medication and are not sure how it affects you, the official advice is simple: ask your doctor or pharmacist, and if you are still unsure, do not drive, take a taxi, rideshare or public transport instead.",
          pt: "Essa é a parte que costuma confundir quem vem de lugares onde o uso de cannabis medicinal vem com alguma proteção legal pra dirigir. Na Queensland não é assim: é uma infração dirigir com THC no organismo mesmo quando ele foi prescrito legitimamente por um médico. A receita te protege de uma acusação de posse de droga, não de uma acusação de dirigir drogado. O mesmo cuidado vale de forma mais ampla, muitos remédios comuns, com ou sem receita, incluindo alguns vendidos em supermercado, trazem avisos sobre dirigir. Se você está começando um remédio novo e não tem certeza de como ele te afeta, a orientação oficial é simples: pergunte ao seu médico ou farmacêutico, e se ainda tiver dúvida, não dirija, pegue um táxi, um aplicativo ou transporte público.",
          es: "Esta es la parte que suele confundir a quienes vienen de lugares donde el uso de cannabis medicinal viene con alguna protección legal para conducir. En Queensland no es así: es una infracción conducir con THC en el organismo incluso cuando fue recetado legítimamente por un médico. La receta te protege de un cargo por posesión de droga, no de un cargo por conducir drogado. La misma precaución aplica de forma más amplia, muchos medicamentos comunes, con o sin receta, incluidos algunos que se venden en el supermercado, traen advertencias sobre conducir. Si estás empezando un medicamento nuevo y no estás seguro de cómo te afecta, la recomendación oficial es simple: pregúntale a tu médico o farmacéutico, y si todavía tienes dudas, no conduzcas, toma un taxi, una app de transporte o transporte público."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "None of this is legal advice, and if you are ever actually charged with a drink or drug driving offence you should speak to a lawyer or contact Legal Aid Queensland rather than rely on a blog post. Fees, fines and thresholds are reviewed periodically, so confirm the current figures on qld.gov.au before you rely on them. To prepare for the knowledge you will actually be tested on, use KangaLearner's Learn section and Queensland practice questions.",
          pt: "Nada disso é aconselhamento jurídico, e se você realmente for acusado de uma infração de dirigir alcoolizado ou drogado, procure um advogado ou entre em contato com a Legal Aid Queensland, em vez de confiar num post de blog. Taxas, multas e limites são revisados periodicamente, então confirme os valores atuais em qld.gov.au antes de se basear neles. Para se preparar para o conteúdo que realmente cai na sua prova, use a seção Aprender e as perguntas de prática da Queensland do KangaLearner.",
          es: "Nada de esto es asesoría legal, y si alguna vez te acusan de verdad de una infracción por conducir alcoholizado o drogado, habla con un abogado o contacta a Legal Aid Queensland, en vez de confiar en un post de blog. Las tarifas, multas y límites se revisan periodicamente, así que confirma los valores actuales en qld.gov.au antes de basarte en ellos. Para prepararte para el contenido que realmente te van a evaluar, usa la sección Aprender y las preguntas de práctica de Queensland de KangaLearner."
        }
      }
    ]
  },
  {
    slug: "qld-regional-remote-driving-guide",
    icon: "safety",
    state: "QLD",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 8,
    title: {
      en: "Regional and remote driving in Queensland: fatigue, wildlife and losing signal",
      pt: "Direção regional e remota na Queensland: fadiga, animais e perda de sinal",
      es: "Manejo regional y remoto en Queensland: fatiga, fauna y pérdida de señal"
    },
    excerpt: {
      en: "Queensland's own road safety data shows nearly two thirds of fatal crashes happen on rural and remote roads. Here is the deeper, official advice on fatigue, wildlife, unsealed roads, trip planning and mobile coverage gaps that the general driving guide does not cover.",
      pt: "Os próprios dados de segurança no trânsito da Queensland mostram que quase dois terços dos acidentes fatais acontecem em estradas rurais e remotas. Veja a orientação oficial mais aprofundada sobre fadiga, animais, estradas não pavimentadas, planejamento de viagem e falta de sinal de celular que o guia geral de direção não cobre.",
      es: "Los propios datos de seguridad vial de Queensland muestran que casi dos tercios de los accidentes fatales ocurren en carreteras rurales y remotas. Esta es la orientación oficial más a fondo sobre fatiga, fauna, caminos sin pavimentar, planificación de viajes y falta de señal de celular que la guía general de manejo no cubre."
    },
    sourceLabel: {
      en: "Queensland Government, StreetSmarts: Regional and Outback driving",
      pt: "Queensland Government, StreetSmarts: Regional and Outback driving",
      es: "Queensland Government, StreetSmarts: Regional and Outback driving"
    },
    sourceUrl: "https://streetsmarts.initiatives.qld.gov.au/regional-driving/",
    body: [
      {
        type: "paragraph",
        text: {
          en: "KangaLearner's Queensland guide for newcomers already introduces the basics of driving in the state, including a short note on regional roads. This post goes much deeper into what actually changes once you leave Brisbane, the Gold Coast or the Sunshine Coast behind. Queensland's own StreetSmarts road safety initiative points to a national pattern worth taking seriously: less than a third of Australians live in regional and remote areas, yet those roads account for nearly two thirds of the country's fatal crashes. This post covers the official advice on fatigue, wildlife, unsealed roads, trip planning and mobile coverage gaps, the five things that change the most once you are driving outside the city.",
          pt: "O guia da Queensland para quem chega de fora do KangaLearner já apresenta o básico de dirigir no estado, incluindo uma nota curta sobre estradas regionais. Este post vai bem mais fundo no que realmente muda quando você sai de Brisbane, da Gold Coast ou da Sunshine Coast. A própria iniciativa de segurança no trânsito da Queensland, a StreetSmarts, aponta um padrão nacional que merece atenção: menos de um terço dos australianos vive em áreas regionais e remotas, mas essas estradas respondem por quase dois terços dos acidentes fatais do país. Este post cobre a orientação oficial sobre fadiga, animais, estradas não pavimentadas, planejamento de viagem e falta de sinal de celular, as cinco coisas que mais mudam quando você está dirigindo fora da cidade.",
          es: "La guía de Queensland para recién llegados de KangaLearner ya presenta lo básico de manejar en el estado, incluida una nota breve sobre carreteras regionales. Este artículo va mucho más a fondo en lo que realmente cambia cuando sales de Brisbane, la Gold Coast o la Sunshine Coast. La propia iniciativa de seguridad vial de Queensland, StreetSmarts, señala un patrón nacional que merece atención: menos de un tercio de los australianos vive en zonas regionales y remotas, pero esas carreteras representan casi dos tercios de los accidentes fatales del país. Este artículo cubre la orientación oficial sobre fatiga, fauna, caminos sin pavimentar, planificación de viajes y falta de señal de celular, las cinco cosas que más cambian cuando manejas fuera de la ciudad."
        }
      },
      {
        type: "heading",
        text: {
          en: "Fatigue: why it is worse than it feels",
          pt: "Fadiga: por que é pior do que parece",
          es: "Fatiga: por qué es peor de lo que parece"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Fatigue is not just a problem for long outback hauls. Being awake for around 17 hours has a similar effect on your driving as a blood alcohol content of 0.05, and fatigue is consistently one of the top five factors contributing to crashes on Queensland roads. Transport and Main Roads reports an average of 31 people killed and 462 seriously injured every year in Queensland crashes where fatigue played a part. Fatigue crashes also tend to be severe, since a driver who has fallen asleep cannot brake, and they are often single vehicle crashes.",
          pt: "Fadiga não é um problema só de viagens longas pelo interior. Ficar acordado por cerca de 17 horas tem um efeito na sua direção parecido com uma concentração de álcool no sangue de 0,05, e a fadiga está sempre entre os cinco principais fatores que contribuem para acidentes nas estradas da Queensland. A Transport and Main Roads registra uma média de 31 mortos e 462 feridos graves por ano em acidentes na Queensland em que a fadiga teve participação. Acidentes por fadiga também costumam ser graves, já que um motorista que pegou no sono não consegue frear, e muitas vezes são acidentes com um único veículo envolvido.",
          es: "La fatiga no es un problema solo de viajes largos por el interior. Estar despierto durante unas 17 horas tiene un efecto en tu manejo parecido al de una concentración de alcohol en sangre de 0,05, y la fatiga está siempre entre los cinco principales factores que contribuyen a los accidentes en las carreteras de Queensland. Transport and Main Roads registra un promedio de 31 muertos y 462 heridos graves por año en accidentes de Queensland donde la fatiga tuvo participación. Los accidentes por fatiga también suelen ser graves, ya que un conductor que se quedó dormido no puede frenar, y muchas veces son accidentes de un solo vehículo."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Drifting between lanes, or unexplained changes in your speed.",
            pt: "Sair da faixa sem perceber, ou mudar de velocidade sem motivo aparente.",
            es: "Salirte del carril sin darte cuenta, o cambiar de velocidad sin motivo aparente."
          },
          {
            en: "Yawning, excessive blinking, or your eyes closing for a moment.",
            pt: "Bocejar, piscar demais, ou os olhos fechando por um instante.",
            es: "Bostezar, parpadear demasiado, o que los ojos se cierren por un instante."
          },
          {
            en: "Trouble keeping your head up, or gaps in your memory of the last few kilometres you drove.",
            pt: "Dificuldade de manter a cabeça erguida, ou lapsos de memória sobre os últimos quilômetros que você dirigiu.",
            es: "Dificultad para mantener la cabeza erguida, o lagunas de memoria sobre los últimos kilómetros que manejaste."
          },
          {
            en: "Slower reactions and microsleeps, brief moments of actual sleep that can happen with your eyes still open.",
            pt: "Reações mais lentas e microssonos, momentos curtos de sono de verdade que podem acontecer com os olhos ainda abertos.",
            es: "Reacciones más lentas y microsueños, momentos breves de sueño real que pueden ocurrir con los ojos todavía abiertos."
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "Most sleep related crashes happen between 2am and 6am, and again between 2pm and 4pm, so plan around those windows on a long drive. More than half of fatigue related crashes happen within just 25 km of where the driver started out, so do not assume you are safe simply because you are still close to home. Queensland has more than 450 official rest areas, some for cars and caravans only, some for heavy vehicles only, and some shared, plus a network of Driver Reviver stops at busy times of year built around the message Stop, Revive, Survive. Take a real break, ideally 15 minutes, at least every 2 hours, and swap drivers or stop for the night rather than pushing through drowsiness.",
          pt: "A maioria dos acidentes ligados ao sono acontece entre 2h e 6h da manhã, e de novo entre 14h e 16h, então planeje uma viagem longa em torno desses horários. Mais da metade dos acidentes por fadiga acontece a até 25 km de onde o motorista saiu, então não presuma que está seguro só porque ainda está perto de casa. A Queensland tem mais de 450 áreas de descanso oficiais, algumas só para carros e trailers, algumas só para veículos pesados, e algumas compartilhadas, além de uma rede de paradas Driver Reviver em épocas de mais movimento, construída em torno da mensagem Stop, Revive, Survive (pare, reanime-se, sobreviva). Faça uma pausa de verdade, idealmente de 15 minutos, pelo menos a cada 2 horas, e revezem no volante ou parem para passar a noite em vez de insistir dirigindo com sono.",
          es: "La mayoría de los accidentes relacionados con el sueño ocurren entre las 2am y las 6am, y de nuevo entre las 2pm y las 4pm, así que planifica un viaje largo en torno a esos horarios. Más de la mitad de los accidentes por fatiga ocurren a solo 25 km de donde salió el conductor, así que no supongas que estás a salvo solo porque todavía estás cerca de casa. Queensland tiene más de 450 áreas de descanso oficiales, algunas solo para autos y casas rodantes, algunas solo para vehículos pesados, y algunas compartidas, además de una red de paradas Driver Reviver en las épocas de más movimiento, construida en torno al mensaje Stop, Revive, Survive (para, reanímate, sobrevive). Toma un descanso de verdad, idealmente de 15 minutos, al menos cada 2 horas, y túrnense al volante o paren a pasar la noche en vez de seguir manejando con sueño."
        }
      },
      {
        type: "heading",
        text: {
          en: "Wildlife: brake firmly, never swerve",
          pt: "Animais: freie firme, nunca desvie bruscamente",
          es: "Fauna: frena con firmeza, nunca gires bruscamente"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Kangaroos, emus, koalas, wombats, sheep and cattle all show up on regional Queensland roads, most often around dawn and dusk when they are most active. Queensland's own advice is specific about what to do when one is on or near the road: do not swerve, since swerving at speed is what causes cars to roll or leave the road, brake firmly in a straight line instead, and sound your horn to encourage the animal to move on. For livestock standing on the road, slow right down, be patient, and use your horn rather than trying to push past.",
          pt: "Cangurus, emas, coalas, wombats, ovelhas e gado aparecem nas estradas regionais da Queensland, principalmente ao amanhecer e ao entardecer, quando estão mais ativos. A própria orientação da Queensland é específica sobre o que fazer quando um animal está na pista ou perto dela: não desvie bruscamente, já que desviar em velocidade é o que faz o carro capotar ou sair da pista, freie firme e em linha reta, e buzine para incentivar o animal a se afastar. Para gado parado na via, reduza bem a velocidade, tenha paciência, e use a buzina em vez de tentar passar por ele.",
          es: "Canguros, emús, koalas, wombats, ovejas y ganado aparecen en las carreteras regionales de Queensland, sobre todo al amanecer y al atardecer, cuando están más activos. La orientación oficial de Queensland es específica sobre qué hacer cuando un animal está en la vía o cerca de ella: no gires bruscamente, ya que girar a velocidad es lo que hace que el auto vuelque o se salga de la vía, frena con firmeza y en línea recta en su lugar, y toca la bocina para animar al animal a moverse. Para el ganado parado en la vía, reduce bien la velocidad, ten paciencia, y usa la bocina en vez de intentar pasar."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "If you hit an animal, pull over safely once you can and turn on your hazard lights. If the animal (other than a crocodile, cassowary or marine mammal) is injured, keep a safe distance and call the RSPCA on 1300 264 625 (1300 ANIMAL). Tell them exactly where you found the animal, since that location helps a carer or vet release it back to the same area later, and it also helps track wildlife collision black spots.",
          pt: "Se você atropelar um animal, pare em um local seguro assim que puder e ligue o pisca-alerta. Se o animal (exceto crocodilo, casuar ou mamífero marinho) estiver ferido, mantenha distância segura e ligue para a RSPCA no 1300 264 625 (1300 ANIMAL). Informe exatamente onde você encontrou o animal, já que essa localização ajuda um cuidador ou veterinário a soltá-lo de volta na mesma área depois, e também ajuda a identificar pontos críticos de atropelamento de animais silvestres.",
          es: "Si atropellas a un animal, detente en un lugar seguro en cuanto puedas y enciende las luces de emergencia. Si el animal (excepto cocodrilo, casuario o mamífero marino) está herido, mantén una distancia segura y llama a la RSPCA al 1300 264 625 (1300 ANIMAL). Diles exactamente dónde encontraste al animal, ya que esa ubicación ayuda a un cuidador o veterinario a soltarlo de nuevo en la misma zona más adelante, y también ayuda a identificar puntos críticos de atropellamiento de fauna silvestre."
        }
      },
      {
        type: "heading",
        text: {
          en: "Unsealed roads: gravel, dust and soft edges",
          pt: "Estradas não pavimentadas: cascalho, poeira e acostamentos macios",
          es: "Caminos sin pavimentar: ripio, polvo y bordes blandos"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Gravel, dirt and sandy surfaces give your tyres far less grip than sealed roads, so the basic rule is to slow down and open up your following distance well beyond what feels necessary on bitumen. Conditions on the same unsealed road can change completely with the weather: dry spells raise dust that can cut visibility to almost nothing, while rain turns the same surface muddy, slippery and sometimes boggy. Treat every unsealed road as changeable rather than assuming it will match what you drove yesterday.",
          pt: "Cascalho, terra e areia oferecem bem menos aderência aos pneus do que vias pavimentadas, então a regra básica é reduzir a velocidade e aumentar bastante a distância do carro da frente, mais do que parece necessário no asfalto. As condições da mesma estrada não pavimentada podem mudar completamente com o clima: períodos secos levantam poeira que pode reduzir a visibilidade a quase nada, enquanto a chuva deixa a mesma superfície lamacenta, escorregadia e às vezes atolada. Trate toda estrada não pavimentada como algo que muda, em vez de presumir que vai estar igual ao dia anterior.",
          es: "El ripio, la tierra y la arena dan mucho menos agarre a los neumáticos que las vías pavimentadas, así que la regla básica es reducir la velocidad y aumentar bastante la distancia con el auto de adelante, más de lo que parece necesario en el asfalto. Las condiciones del mismo camino sin pavimentar pueden cambiar por completo con el clima: los periodos secos levantan polvo que puede reducir la visibilidad a casi nada, mientras que la lluvia deja la misma superficie embarrada, resbaladiza y a veces empantanada. Trata todo camino sin pavimentar como algo cambiante, en vez de suponer que estará igual que el día anterior."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "In dust you cannot see through, do not overtake. Pull over safely, turn your lights on, and switch your air conditioning to recirculate until it clears.",
            pt: "Em poeira que você não consegue enxergar através, não ultrapasse. Pare em um local seguro, ligue os faróis, e coloque o ar condicionado em recirculação até a poeira baixar.",
            es: "En polvo que no te deja ver, no adelantes. Detente en un lugar seguro, enciende las luces, y pon el aire acondicionado en recirculación hasta que se despeje."
          },
          {
            en: "Never overtake a vehicle that is itself raising dust, since you will be driving blind for the moment you pass it.",
            pt: "Nunca ultrapasse um veículo que está levantando poeira, porque você vai dirigir sem enxergar durante o momento da ultrapassagem.",
            es: "Nunca adelantes a un vehículo que está levantando polvo, porque vas a manejar a ciegas durante el momento del adelantamiento."
          },
          {
            en: "A lot of rural Queensland roads are sealed for one lane only, with a gravel or dirt edge on each side. When you meet a vehicle coming the other way, move left and let your left wheels drop onto that edge while keeping your right wheels on the bitumen if you can, slow down before you do it, and watch for loose stones or a sudden drop at the edge of the seal.",
            pt: "Muitas estradas rurais da Queensland são pavimentadas em uma faixa só, com acostamento de cascalho ou terra dos dois lados. Quando você cruzar com um veículo vindo em sentido contrário, mova-se para a esquerda e deixe as rodas da esquerda descerem para o acostamento enquanto mantém as rodas da direita no asfalto se conseguir, reduza a velocidade antes de fazer isso, e fique atento a pedras soltas ou um desnível repentino na borda do asfalto.",
            es: "Muchos caminos rurales de Queensland tienen pavimento de un solo carril, con un borde de tierra o ripio a cada lado. Cuando te cruces con un vehículo que viene en sentido contrario, muévete a la izquierda y deja que las ruedas izquierdas bajen a ese borde mientras mantienes las ruedas derechas sobre el asfalto si puedes, reduce la velocidad antes de hacerlo, y presta atención a piedras sueltas o a un desnivel repentino en el borde del pavimento."
          },
          {
            en: "Turn your headlights on between sunset and sunrise, and any other time visibility drops, both to see and to be seen.",
            pt: "Ligue os faróis entre o pôr do sol e o nascer do sol, e em qualquer outro momento em que a visibilidade cair, tanto para enxergar quanto para ser visto.",
            es: "Enciende las luces entre la puesta y la salida del sol, y en cualquier otro momento en que baje la visibilidad, tanto para ver como para que te vean."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Planning the trip, not just the drive",
          pt: "Planejando a viagem, não só a direção",
          es: "Planificando el viaje, no solo el manejo"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Before you leave a major town, tell a friend, neighbour or family member your planned route and when you expect to arrive, the same advice Queensland gives to anyone heading into a regional or remote area. Check QLDTraffic (qldtraffic.qld.gov.au, the app, or 13 19 40) for road closures, flooding and hazards on your route before you go, not after you are already on the road. If heavy rain is forecast along your route, the official advice is to delay your trip. And if you do reach water over the road, the rule is simple and it is on signs across Queensland: if it is flooded, forget it. More than half of flood related deaths happen because someone drove into floodwater that could have been avoided.",
          pt: "Antes de sair de uma cidade maior, avise um amigo, vizinho ou familiar sobre o trajeto planejado e quando espera chegar, o mesmo conselho que a Queensland dá para qualquer pessoa indo para uma área regional ou remota. Confira o QLDTraffic (qldtraffic.qld.gov.au, o aplicativo, ou o telefone 13 19 40) para ver fechamentos de via, enchentes e riscos no seu trajeto antes de sair, não depois de já estar na estrada. Se há previsão de chuva forte no seu trajeto, a orientação oficial é adiar a viagem. E se você chegar a um trecho com água sobre a via, a regra é simples e está nas placas por toda a Queensland: if it's flooded, forget it, ou seja, se está alagado, esqueça. Mais da metade das mortes por enchente acontece porque alguém entrou numa enchente que dava para evitar.",
          es: "Antes de salir de una ciudad más grande, avísale a un amigo, vecino o familiar sobre la ruta planeada y cuándo esperas llegar, el mismo consejo que Queensland le da a cualquiera que se dirija a una zona regional o remota. Revisa QLDTraffic (qldtraffic.qld.gov.au, la aplicación, o el teléfono 13 19 40) para ver cierres de vías, inundaciones y riesgos en tu ruta antes de salir, no después de estar ya en el camino. Si hay pronóstico de lluvia fuerte en tu ruta, la indicación oficial es posponer el viaje. Y si llegas a un tramo con agua sobre la vía, la regla es simple y está en los carteles por toda Queensland: if it's flooded, forget it, es decir, si está inundado, olvídalo. Más de la mitad de las muertes por inundación ocurren porque alguien entró a una inundación que se podía haber evitado."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Vehicle check before you go: tyres including the spare, lights, wiper blades and washer fluid, battery, coolant, hoses, oil and fuel. Get it serviced beforehand if it is due.",
            pt: "Confira o carro antes de sair: pneus incluindo o estepe, faróis, palhetas do limpador e água do para-brisa, bateria, líquido de arrefecimento, mangueiras, óleo e combustível. Faça a revisão antes se estiver na hora.",
            es: "Revisa el auto antes de salir: neumáticos incluida la rueda de repuesto, luces, escobillas del limpiaparabrisas y líquido lavaparabrisas, batería, refrigerante, mangueras, aceite y combustible. Hazle el service antes si le corresponde."
          },
          {
            en: "Pack for the trip, not just the destination: water, non-perishable food, a first aid kit, a torch, a tow rope, a shovel, and a paper map or offline map as backup.",
            pt: "Leve itens pensando na viagem, não só no destino: água, comida não perecível, kit de primeiros socorros, lanterna, cabo de reboque, pá, e um mapa de papel ou mapa offline como reserva.",
            es: "Lleva cosas pensando en el viaje, no solo en el destino: agua, comida no perecedera, botiquín de primeros auxilios, linterna, cuerda de remolque, pala, y un mapa de papel o mapa sin conexión como respaldo."
          },
          {
            en: "On major highways, fuel stops are rarely more than 200 km apart, but where you see a sign warning of no fuel ahead, take it literally and fill up before you need to.",
            pt: "Nas rodovias principais, os postos de combustível raramente ficam a mais de 200 km um do outro, mas onde houver placa avisando que não há posto à frente, leve a sério e abasteça antes de precisar.",
            es: "En las autopistas principales, las estaciones de servicio rara vez quedan a más de 200 km una de otra, pero donde veas una señal que avisa que no hay combustible más adelante, tómala en serio y carga combustible antes de necesitarlo."
          },
          {
            en: "Build your break time into your schedule rather than treating it as optional: a 15 minute stop every 2 hours changes your total travel time, so plan for it from the start.",
            pt: "Inclua o tempo de pausa no seu planejamento em vez de tratar como opcional: uma parada de 15 minutos a cada 2 horas muda o tempo total da viagem, então já conte com isso desde o início.",
            es: "Incluye el tiempo de pausa en tu planificación en vez de tratarlo como opcional: una parada de 15 minutos cada 2 horas cambia el tiempo total del viaje, así que cuenta con eso desde el principio."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Mobile coverage: plan as if you will lose signal",
          pt: "Cobertura de celular: planeje como se fosse perder o sinal",
          es: "Cobertura de celular: planifica como si fueras a perder la señal"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Once you are past a regional centre, mobile coverage can become patchy or disappear completely between towns, and internet access outside metropolitan areas is often minimal or non-existent. Do not rely on a live map or a search engine to get you through a remote stretch. Download your route on Google Maps for offline use before you leave, since an offline map stays available for a limited time without needing signal, or carry a paper map as a backup that never runs out of battery.",
          pt: "Depois de passar por um centro regional, a cobertura de celular pode ficar irregular ou sumir completamente entre as cidades, e o acesso à internet fora das áreas metropolitanas costuma ser mínimo ou inexistente. Não conte com um mapa ao vivo ou um mecanismo de busca para te guiar em um trecho remoto. Baixe seu trajeto no Google Maps para uso offline antes de sair, já que um mapa offline fica disponível por um tempo limitado sem precisar de sinal, ou leve um mapa de papel como reserva, que nunca fica sem bateria.",
          es: "Una vez que pasas un centro regional, la cobertura de celular puede volverse irregular o desaparecer por completo entre pueblos, y el acceso a internet fuera de las áreas metropolitanas suele ser mínimo o inexistente. No confíes en un mapa en vivo o un buscador para guiarte en un tramo remoto. Descarga tu ruta en Google Maps para uso sin conexión antes de salir, ya que un mapa sin conexión queda disponible por un tiempo limitado sin necesitar señal, o lleva un mapa de papel como respaldo, que nunca se queda sin batería."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "For the moment you actually need help, install Emergency Plus, the free national app built by Australia's emergency services and available at emergencyapp.triplezero.gov.au. It uses your phone's GPS to show your exact coordinates, including a what3words location, which you can read out to a Triple Zero (000) operator even if you only have enough signal for a voice call and no data at all. It will not create coverage where there is none, but it removes the guesswork of describing where you are on a stretch of highway with no landmarks.",
          pt: "Para o momento em que você realmente precisar de ajuda, instale o Emergency Plus, o aplicativo nacional gratuito criado pelos serviços de emergência da Austrália, disponível em emergencyapp.triplezero.gov.au. Ele usa o GPS do celular para mostrar suas coordenadas exatas, incluindo uma localização what3words, que você pode ler para o atendente do Triple Zero (000) mesmo tendo sinal só para ligação de voz e nenhum dado móvel. Ele não cria cobertura onde não existe, mas tira o trabalho de adivinhar como descrever onde você está em um trecho de rodovia sem nenhuma referência.",
          es: "Para el momento en que realmente necesites ayuda, instala Emergency Plus, la aplicación nacional gratuita creada por los servicios de emergencia de Australia, disponible en emergencyapp.triplezero.gov.au. Usa el GPS del celular para mostrar tus coordenadas exactas, incluida una ubicación what3words, que puedes leerle al operador de Triple Zero (000) incluso si solo tienes señal para una llamada de voz y nada de datos. No crea cobertura donde no existe, pero te saca el trabajo de adivinar cómo describir dónde estás en un tramo de autopista sin ninguna referencia."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This post goes beyond KangaLearner's general Queensland driving guide to focus specifically on what changes once you leave the city, based on Queensland's own StreetSmarts regional and outback driving pages and other official Queensland Government sources. Conditions, contact numbers and advice can be updated over time, so check streetsmarts.initiatives.qld.gov.au and qldtraffic.qld.gov.au directly before a long trip. Use KangaLearner's Learn section and QLD practice questions to prepare for the actual test content.",
          pt: "Este post vai além do guia geral de direção na Queensland do KangaLearner para focar especificamente no que muda quando você sai da cidade, com base nas próprias páginas de direção regional e outback da StreetSmarts da Queensland e em outras fontes oficiais do governo da Queensland. Condições, telefones de contato e orientações podem ser atualizados com o tempo, então confira diretamente streetsmarts.initiatives.qld.gov.au e qldtraffic.qld.gov.au antes de uma viagem longa. Use a seção Aprender e as perguntas de prática de QLD do KangaLearner para se preparar para o conteúdo da prova em si.",
          es: "Este artículo va más allá de la guía general de manejo en Queensland de KangaLearner para enfocarse específicamente en lo que cambia cuando sales de la ciudad, basado en las propias páginas de manejo regional y outback de StreetSmarts de Queensland y en otras fuentes oficiales del gobierno de Queensland. Las condiciones, los teléfonos de contacto y las orientaciones pueden actualizarse con el tiempo, así que revisa directamente streetsmarts.initiatives.qld.gov.au y qldtraffic.qld.gov.au antes de un viaje largo. Usa la sección Aprender y las preguntas de práctica de QLD de KangaLearner para prepararte para el contenido real del examen."
        }
      }
    ]
  },
  {
    slug: "qld-motorcycle-learner-licence-guide",
    icon: "checklist",
    state: "QLD",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "Getting your motorcycle learner licence (RE) in Queensland",
      pt: "Tirando sua licença de aprendiz de motocicleta (RE) na Queensland",
      es: "Cómo sacar tu licencia de aprendiz de motocicleta (RE) en Queensland"
    },
    excerpt: {
      en: "Queensland's motorcycle learner licence is not the car process on two wheels: it requires a car licence first, a mandatory training course, and its own helmet standards. Here is how the RE pathway actually works, based on Queensland's official pages.",
      pt: "A licença de aprendiz de motocicleta na Queensland não é o processo do carro sobre duas rodas: ela exige uma licença de carro antes, um curso de treinamento obrigatório, e padrões próprios de capacete. Veja como o caminho da RE funciona de verdade, com base nas páginas oficiais da Queensland.",
      es: "La licencia de aprendiz de motocicleta en Queensland no es el proceso del auto sobre dos ruedas: exige tener antes una licencia de auto, un curso de entrenamiento obligatorio, y estándares propios de casco. Mira cómo funciona en realidad el camino de la RE, basado en las páginas oficiales de Queensland."
    },
    sourceLabel: {
      en: "Queensland Government, Getting a learner motorcycle licence (RE)",
      pt: "Queensland Government, Getting a learner motorcycle licence (RE)",
      es: "Queensland Government, Getting a learner motorcycle licence (RE)"
    },
    sourceUrl: "https://www.qld.gov.au/transport/licensing/motorcycles/getting/learner",
    body: [
      {
        type: "paragraph",
        text: {
          en: "Queensland treats a motorcycle learner licence as a second licence you earn on top of your car licence, not a separate beginner's pathway. If you have already looked at KangaLearner's overview of driving in Queensland, this post goes further into the parts that apply only to riders: the RE learner licence process itself, the rules that apply only while you are learning to ride, which motorcycles you are actually allowed to ride, and the helmet standards the state requires. Everything below comes from the Queensland Government's own transport and licensing pages.",
          pt: "Na Queensland, a licença de aprendiz de motocicleta não é um caminho de iniciante separado, é uma segunda licença que você conquista em cima da sua licença de carro. Se você já viu o panorama geral do KangaLearner sobre dirigir na Queensland, este post vai além, cobrindo as partes que valem só para quem pilota moto: o processo da licença de aprendiz RE em si, as regras que se aplicam só enquanto você está aprendendo a pilotar, quais motocicletas você realmente pode pilotar, e os padrões de capacete exigidos pelo estado. Tudo abaixo vem diretamente das páginas oficiais de trânsito e licenciamento do governo da Queensland.",
          es: "En Queensland, la licencia de aprendiz de motocicleta no es un camino de principiante aparte, es una segunda licencia que consigues encima de tu licencia de auto. Si ya viste el panorama general de KangaLearner sobre conducir en Queensland, este artículo va más a fondo en las partes que aplican solo a quienes andan en moto: el proceso de la licencia de aprendiz RE en sí, las reglas que se aplican solo mientras estás aprendiendo a conducir la moto, qué motocicletas realmente puedes conducir, y los estándares de casco que exige el estado. Todo lo que sigue viene directamente de las páginas oficiales de transporte y licencias del gobierno de Queensland."
        }
      },
      {
        type: "heading",
        text: {
          en: "You need a car licence first",
          pt: "Primeiro, você precisa de uma licença de carro",
          es: "Primero, necesitas una licencia de auto"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "To apply for a motorcycle learner licence (RE) in Queensland, you must already hold a provisional or open car licence, and you must have held it for at least 1 year. The government's stated reason is straightforward: it wants you to already have real on-road driving experience before you start learning to ride. This is the single biggest structural difference from the car learner process, which requires no prior licence at all. In practice, a newcomer cannot walk in and get a motorcycle licence as their very first Australian licence.",
          pt: "Para aplicar para uma licença de aprendiz de motocicleta (RE) na Queensland, você já precisa ter uma licença de carro provisional ou plena (open), e precisa tê-la há pelo menos 1 ano. O motivo declarado pelo governo é direto: eles querem que você já tenha experiência real de direção nas vias antes de começar a aprender a pilotar. Essa é a maior diferença estrutural em relação ao processo do carro, que não exige nenhuma licença prévia. Na prática, isso significa que quem chega de fora não consegue tirar uma licença de motocicleta como sua primeira licença australiana.",
          es: "Para solicitar una licencia de aprendiz de motocicleta (RE) en Queensland, ya debes tener una licencia de auto provisional o plena (open), y debes haberla tenido durante al menos 1 año. La razón que da el gobierno es directa: quieren que ya tengas experiencia real de manejo en la vía antes de empezar a aprender a conducir la moto. Esta es la mayor diferencia estructural respecto al proceso del auto, que no exige ninguna licencia previa. En la práctica, esto significa que alguien recién llegado no puede sacar una licencia de motocicleta como su primera licencia australiana."
        }
      },
      {
        type: "heading",
        text: {
          en: "The path to your RE learner licence",
          pt: "O caminho até a sua licença de aprendiz RE",
          es: "El camino hacia tu licencia de aprendiz RE"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Pass the motorcycle hazard perception test. Queensland requires this before you can take the Q-Ride pre-learner course or, later on, sit the Q-SAFE riding test.",
            pt: "Passe no teste de percepção de risco de motocicleta. A Queensland exige isso antes de você poder fazer o curso pré-aprendiz Q-Ride ou, mais adiante, a prova Q-SAFE.",
            es: "Aprueba el examen de percepción de riesgos de motocicleta. Queensland exige esto antes de que puedas tomar el curso pre-aprendiz Q-Ride o, más adelante, el examen Q-SAFE."
          },
          {
            en: "Complete the Q-Ride pre-learner course. This is hands-on motorcycle training, not just a written test. If you live more than 100km from a Q-Ride training area, you can apply to Transport and Main Roads for an exemption instead.",
            pt: "Complete o curso pré-aprendiz Q-Ride. É um treinamento prático de moto, não só uma prova escrita. Se você mora a mais de 100km de uma área de treinamento Q-Ride, pode pedir uma isenção para a Transport and Main Roads.",
            es: "Completa el curso pre-aprendiz Q-Ride. Es un entrenamiento práctico de moto, no solo un examen escrito. Si vives a más de 100km de un área de entrenamiento Q-Ride, puedes solicitar una exención a la Transport and Main Roads."
          },
          {
            en: "Pass the online motorcycle knowledge test. This only becomes available after you finish the Q-Ride course or get your exemption, so you cannot skip ahead to it.",
            pt: "Passe no teste de conhecimento de motocicleta online. Ele só fica disponível depois que você termina o curso Q-Ride ou consegue a isenção, então você não pode pular direto pra ele.",
            es: "Aprueba el examen de conocimientos de motocicleta en línea. Solo queda disponible después de que termines el curso Q-Ride o consigas la exención, así que no puedes saltarte directamente a él."
          },
          {
            en: "Receive your RE learner licence. Once it is issued you can legally start learning to ride, always under supervision.",
            pt: "Receba sua licença de aprendiz RE. Assim que ela é emitida, você já pode começar a aprender a pilotar, sempre sob supervisão.",
            es: "Recibe tu licencia de aprendiz RE. Una vez emitida, ya puedes empezar a aprender a conducir la moto, siempre bajo supervisión."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Rules while you hold the RE learner licence",
          pt: "Regras enquanto você tem a licença de aprendiz RE",
          es: "Reglas mientras tienes la licencia de aprendiz RE"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Your supervisor cannot ride pillion with you. They must hold an open licence for the same motorcycle class, held for at least 1 year, and they supervise either from another vehicle at a safe distance or, if fitted, from a sidecar attached to your motorcycle. This is very different from supervising a car learner, where the supervisor simply sits in the passenger seat.",
            pt: "Seu supervisor não pode andar na garupa com você. Ele precisa ter uma licença plena (open) para a mesma categoria de motocicleta, há pelo menos 1 ano, e supervisiona de outro veículo a uma distância segura ou, se houver, de um sidecar preso na motocicleta. Isso é bem diferente de supervisionar um aprendiz de carro, onde o supervisor simplesmente senta no banco do passageiro.",
            es: "Tu supervisor no puede ir de acompañante contigo. Debe tener una licencia plena (open) para la misma categoría de motocicleta, con al menos 1 año de antigüedad, y supervisa desde otro vehículo a una distancia segura o, si el equipo lo permite, desde un sidecar acoplado a tu motocicleta. Esto es bastante diferente de supervisar a un aprendiz de auto, donde el supervisor simplemente se sienta en el asiento del pasajero."
          },
          {
            en: "You must display an L plate at the rear of the motorcycle, clearly visible from 20 metres, or wear a high-visibility vest with a capital L on the back instead.",
            pt: "Você precisa exibir uma placa L na traseira da motocicleta, visível claramente a 20 metros, ou, em vez disso, usar um colete de alta visibilidade com um L maiúsculo nas costas.",
            es: "Debes exhibir una placa L en la parte trasera de la motocicleta, visible claramente a 20 metros, o, en su lugar, usar un chaleco de alta visibilidad con una L mayúscula en la espalda."
          },
          {
            en: "You cannot carry any passenger, with one narrow exception: your supervisor riding in a sidecar attached to your motorcycle.",
            pt: "Você não pode levar nenhum passageiro, com uma única exceção: seu supervisor andando em um sidecar preso na motocicleta.",
            es: "No puedes llevar ningún pasajero, con una única excepción: tu supervisor viajando en un sidecar acoplado a tu motocicleta."
          },
          {
            en: "Zero blood alcohol, exactly 0.00, with no small amount allowed. The same zero tolerance applies to drugs.",
            pt: "Álcool zero no sangue, exatamente 0,00, sem nenhuma quantidade pequena permitida. A mesma tolerância zero vale para drogas.",
            es: "Alcohol cero en sangre, exactamente 0.00, sin ninguna cantidad pequeña permitida. La misma tolerancia cero aplica para las drogas."
          },
          {
            en: "You must hold the RE learner licence for at least 90 days before you can upgrade, or at least 12 months if you used the 100km exemption instead of the Q-Ride course.",
            pt: "Você precisa manter a licença de aprendiz RE por pelo menos 90 dias antes de poder avançar para a próxima categoria, ou pelo menos 12 meses se você usou a isenção dos 100km em vez do curso Q-Ride.",
            es: "Debes mantener la licencia de aprendiz RE por al menos 90 días antes de poder subir de categoría, o al menos 12 meses si usaste la exención de los 100km en lugar del curso Q-Ride."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Only LAMS-approved motorcycles",
          pt: "Só motocicletas aprovadas pelo LAMS",
          es: "Solo motocicletas aprobadas por el LAMS"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "As an RE learner you cannot just ride any motorcycle you like, only one on Queensland's Learner Approved Motorcycle Scheme, known as LAMS. Up to 250mL, almost every production model qualifies, except five specific high-performance models the government names directly: the Suzuki RGV250, Kawasaki KR250, Honda NSR250, Yamaha TZR250 and Aprilia RS250. Between 251mL and 660mL, only the specific models listed on Queensland's official LAMS table qualify, capacity alone does not guarantee approval. Electric motorcycles capable of more than 50km/h also need to be on that approved list. A motorcycle that has been modified beyond what the rules allow loses its LAMS approval even if the base model is listed, so if you are buying a bike to learn on, check its registration number against the official list first.",
          pt: "Como aprendiz RE, você não pode simplesmente pilotar qualquer motocicleta, só uma que esteja no Learner Approved Motorcycle Scheme da Queensland, conhecido como LAMS. Até 250mL, praticamente todo modelo de produção se qualifica, com exceção de cinco modelos específicos de alta performance que o governo cita diretamente: Suzuki RGV250, Kawasaki KR250, Honda NSR250, Yamaha TZR250 e Aprilia RS250. Entre 251mL e 660mL, só os modelos específicos listados na tabela oficial de LAMS da Queensland se qualificam, a cilindrada sozinha não garante a aprovação. Motocicletas elétricas capazes de mais de 50km/h também precisam estar nessa lista aprovada. Uma motocicleta que foi modificada além do que as regras permitem perde a aprovação LAMS mesmo que o modelo base esteja na lista, então, se você for comprar uma moto para aprender, confira o número de registro dela na lista oficial antes.",
          es: "Como aprendiz RE, no puedes simplemente conducir cualquier motocicleta, solo una que esté en el Learner Approved Motorcycle Scheme de Queensland, conocido como LAMS. Hasta 250mL, casi todos los modelos de producción califican, con excepción de cinco modelos específicos de alto rendimiento que el gobierno nombra directamente: Suzuki RGV250, Kawasaki KR250, Honda NSR250, Yamaha TZR250 y Aprilia RS250. Entre 251mL y 660mL, solo los modelos específicos listados en la tabla oficial de LAMS de Queensland califican, la cilindrada por sí sola no garantiza la aprobación. Las motocicletas eléctricas capaces de superar los 50km/h también deben estar en esa lista aprobada. Una motocicleta que fue modificada más allá de lo que permiten las reglas pierde su aprobación LAMS aunque el modelo base esté en la lista, así que, si vas a comprar una moto para aprender, revisa su número de registro contra la lista oficial antes de comprarla."
        }
      },
      {
        type: "heading",
        text: {
          en: "Approved helmets and the gear the government recommends",
          pt: "Capacetes aprovados e o equipamento que o governo recomenda",
          es: "Cascos aprobados y el equipo que recomienda el gobierno"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "The helmet requirement is not specific to learners, it applies to every rider and every pillion passenger in Queensland, but it matters most while you are still building the habit. Queensland's transport department requires a helmet that meets AS 1698 or AS/NZS 1698, the Australian standards, or UN ECE 22.05 or 22.06, the European standard. Look for the compliance sticker inside the helmet before you buy or borrow one, a helmet without one of these markings is not legal to ride in.",
          pt: "A exigência do capacete não é específica para aprendizes, ela vale para todo piloto e todo passageiro na Queensland, mas importa mais enquanto você ainda está criando o hábito. O departamento de transporte da Queensland exige um capacete que atenda ao padrão AS 1698 ou AS/NZS 1698, os padrões australianos, ou ao UN ECE 22.05 ou 22.06, o padrão europeu. Procure o selo de conformidade dentro do capacete antes de comprar ou emprestar um, um capacete sem uma dessas marcações não é legal para andar.",
          es: "El requisito del casco no es específico para aprendices, se aplica a todo motociclista y todo acompañante en Queensland, pero importa más mientras todavía estás formando el hábito. El departamento de transporte de Queensland exige un casco que cumpla con el estándar AS 1698 o AS/NZS 1698, los estándares australianos, o con el UN ECE 22.05 o 22.06, el estándar europeo. Busca la etiqueta de cumplimiento dentro del casco antes de comprar o pedir prestado uno, un casco sin una de estas marcas no es legal para conducir."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Beyond the mandatory helmet, Queensland's official motorcycle safety guidance recommends a full protective kit. Wear an abrasion and tear resistant jacket and pants that cover your arms, legs and body and fasten securely at the wrists, waist and ankles. Add gauntlet style gloves with knuckle protection, leather boots that overlap your pants and fasten with a zip or velcro rather than laces, a back protector and a kidney belt, and eye protection meeting AS 1609 if your helmet is not full face. The department also recommends bright or fluorescent clothing, or reflective strips, so other drivers actually see you.",
          pt: "Além do capacete, que é obrigatório, a orientação oficial de segurança para motociclistas da Queensland recomenda um kit completo de proteção. Use jaqueta e calça resistentes à abrasão e a rasgos, que cubram braços, pernas e corpo e fechem bem nos punhos, na cintura e nos tornozelos. Acrescente luvas estilo cano longo com proteção nos nós dos dedos, botas de couro que cubram parte da calça e fechem com zíper ou velcro em vez de cadarço, um protetor de coluna e um cinto para os rins, e proteção para os olhos que atenda ao AS 1609 se o seu capacete não for integral. O departamento também recomenda roupas claras ou fluorescentes, ou faixas refletivas, para que os outros motoristas realmente te vejam.",
          es: "Además del casco, que es obligatorio, la guía oficial de seguridad para motociclistas de Queensland recomienda un equipo de protección completo. Usa chaqueta y pantalón resistentes a la abrasión y a los desgarros, que cubran brazos, piernas y torso y cierren bien en las muñecas, la cintura y los tobillos. Suma guantes tipo mosquetero con protección en los nudillos, botas de cuero que cubran parte del pantalón y cierren con cremallera o velcro en lugar de cordones, un protector de espalda y un cinturón riñonero, y protección para los ojos que cumpla con el AS 1609 si tu casco no es integral. El departamento también recomienda ropa clara o fluorescente, o cintas reflectantes, para que los demás conductores realmente te vean."
        }
      },
      {
        type: "heading",
        text: {
          en: "Upgrading off your learner licence",
          pt: "Passando da licença de aprendiz para a próxima etapa",
          es: "Pasando de la licencia de aprendiz a la siguiente etapa"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Once you have held your RE learner licence long enough, how you upgrade depends on where you live. Within 100km of a Q-Ride training area, you complete the Q-Ride restricted course, which assesses your riding competency directly, and some registered providers can even submit your result online so your licence updates automatically. Beyond that 100km radius, you can instead sit the Q-SAFE riding test through Transport and Main Roads. Either way, you already needed to pass the motorcycle hazard perception test earlier in the process, since Queensland requires that before either pathway, not after.",
          pt: "Depois de manter sua licença de aprendiz RE pelo tempo mínimo exigido, a forma de avançar depende de onde você mora. A até 100km de uma área de treinamento Q-Ride, você faz o curso restrito Q-Ride, que avalia sua competência de pilotagem diretamente, e alguns provedores registrados conseguem até enviar seu resultado online, e assim sua licença é atualizada automaticamente. Além desse raio de 100km, você pode fazer a prova Q-SAFE pela Transport and Main Roads. De qualquer forma, você já precisava ter passado no teste de percepção de risco de motocicleta antes disso, já que a Queensland exige esse teste antes de qualquer um dos dois caminhos, não depois.",
          es: "Después de mantener tu licencia de aprendiz RE el tiempo mínimo exigido, la forma de avanzar depende de dónde vives. A menos de 100km de un área de entrenamiento Q-Ride, haces el curso restringido Q-Ride, que evalúa tu competencia de manejo directamente, y algunos proveedores registrados incluso pueden enviar tu resultado en línea, con lo que tu licencia se actualiza automáticamente. Más allá de ese radio de 100km, puedes en cambio presentar el examen Q-SAFE a través de Transport and Main Roads. De cualquier forma, ya necesitabas haber aprobado el examen de percepción de riesgos de motocicleta antes en el proceso, ya que Queensland exige ese examen antes de cualquiera de los dos caminos, no después."
        }
      },
      {
        type: "heading",
        text: {
          en: "Fees",
          pt: "Taxas",
          es: "Tarifas"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "RE learner licence, issued for 3 years: $80.15",
            pt: "Licença de aprendiz RE, válida por 3 anos: $80.15",
            es: "Licencia de aprendiz RE, vigente por 3 años: $80.15"
          },
          {
            en: "Motorcycle knowledge test: $29.70 (charged only if you pass, when taken online)",
            pt: "Teste de conhecimento de motocicleta: $29.70 (cobrado só se você passar, quando feito online)",
            es: "Examen de conocimientos de motocicleta: $29.70 (se cobra solo si apruebas, cuando se hace en línea)"
          },
          {
            en: "Motorcycle hazard perception test (same fee as the car version): $42.70",
            pt: "Teste de percepção de risco de motocicleta (mesma taxa da versão de carro): $42.70",
            es: "Examen de percepción de riesgos de motocicleta (misma tarifa que la versión de auto): $42.70"
          },
          {
            en: "Practical riding test (Q-SAFE): $69.40",
            pt: "Prova prática de pilotagem (Q-SAFE): $69.40",
            es: "Examen práctico de manejo (Q-SAFE): $69.40"
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "These fees reflect the 1 July 2026 update from Transport and Main Roads and do not include the cost of the Q-Ride course itself, which is set by registered private training providers, not the government. Confirm current amounts on qld.gov.au before you pay.",
          pt: "Esses valores refletem a atualização de 1º de julho de 2026 da Transport and Main Roads e não incluem o custo do próprio curso Q-Ride, que é definido pelos provedores de treinamento privados registrados, não pelo governo. Confirme os valores atuais em qld.gov.au antes de pagar.",
          es: "Estos valores reflejan la actualización del 1 de julio de 2026 de Transport and Main Roads y no incluyen el costo del propio curso Q-Ride, que lo fijan los proveedores de entrenamiento privados registrados, no el gobierno. Confirma los montos actuales en qld.gov.au antes de pagar."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This post covers the motorcycle-specific parts of getting licensed in Queensland: the RE learner pathway, the LAMS rules for which motorcycle you can actually ride, and the helmet and gear standards. It is based directly on Queensland Government pages at qld.gov.au and tmr.qld.gov.au. For the state's general road rules that apply to every driver and rider, see KangaLearner's guide to driving in Queensland. To prepare for your QLD theory test itself, use KangaLearner's Learn section and QLD practice questions.",
          pt: "Este post cobre as partes específicas de moto pra tirar sua licença na Queensland: o caminho da licença de aprendiz RE, as regras do LAMS pra saber qual motocicleta você pode realmente pilotar, e os padrões de capacete e equipamento. Ele é baseado diretamente em páginas do governo da Queensland, em qld.gov.au e tmr.qld.gov.au. Para as regras gerais de trânsito do estado que valem para todo motorista e piloto, veja o guia do KangaLearner sobre dirigir na Queensland. Para se preparar para a prova teórica de QLD em si, use a seção Aprender e as perguntas de prática de QLD do KangaLearner.",
          es: "Este artículo cubre las partes específicas de moto para obtener tu licencia en Queensland: el camino de la licencia de aprendiz RE, las reglas del LAMS para saber qué motocicleta realmente puedes conducir, y los estándares de casco y equipo. Está basado directamente en páginas del gobierno de Queensland, en qld.gov.au y tmr.qld.gov.au. Para las reglas generales de tránsito del estado que aplican a todo conductor y motociclista, mira la guía de KangaLearner sobre conducir en Queensland. Para prepararte para el examen teórico de QLD en sí, usa la sección Aprender y las preguntas de práctica de QLD de KangaLearner."
        }
      }
    ]
  },
  {
    slug: "qld-common-driving-mistakes-guide",
    icon: "safety",
    state: "QLD",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 6,
    title: {
      en: "Common driving mistakes in Queensland: the road rules newcomers get wrong",
      pt: "Erros comuns ao dirigir na Queensland: as regras de trânsito que quem chega de fora erra",
      es: "Errores comunes al conducir en Queensland: las reglas de tránsito que los recién llegados confunden"
    },
    excerpt: {
      en: "Queensland's own road safety campaign publishes a list of the state's most misunderstood road rules. Here is a deep dive into the give-way, lane and indicator mistakes it flags, explained and translated.",
      pt: "A própria campanha de segurança no trânsito da Queensland publica uma lista das regras de trânsito mais mal compreendidas do estado. Aqui está um mergulho profundo nos erros de ceder passagem, faixa e seta que ela aponta, explicados e traduzidos.",
      es: "La propia campaña de seguridad vial de Queensland publica una lista de las reglas de tránsito más mal entendidas del estado. Aquí tienes una inmersión profunda en los errores de ceder el paso, carril e intermitente que señala, explicados y traducidos."
    },
    sourceLabel: {
      en: "Queensland Government, Road Rules Refresher (StreetSmarts) and Queensland road rules pages (qld.gov.au)",
      pt: "Queensland Government, Road Rules Refresher (StreetSmarts) and Queensland road rules pages (qld.gov.au)",
      es: "Queensland Government, Road Rules Refresher (StreetSmarts) and Queensland road rules pages (qld.gov.au)"
    },
    sourceUrl: "https://streetsmarts.initiatives.qld.gov.au/road-rules-refresher/",
    body: [
      {
        type: "paragraph",
        text: {
          en: "Queensland's own road safety campaign, StreetSmarts, publishes a page called the Road Rules Refresher that walks through the rules it says drivers misunderstand most often, even locals who have held a licence for years. If rules like these confuse people who learned to drive in Queensland, they trip up newcomers even more, because a rule that looks familiar from your home country often works differently here. This post is a deep dive into those specific mistakes: give-way situations, lane and indicator habits, and a handful of other rules that are easy to get wrong. Every fact below comes from Queensland Government pages on qld.gov.au and streetsmarts.initiatives.qld.gov.au.",
          pt: "A própria campanha de segurança no trânsito da Queensland, a StreetSmarts, publica uma página chamada Road Rules Refresher que passa pelas regras que, segundo ela, os motoristas mais confundem, até quem mora na Queensland e tem carteira há anos. Se essas regras confundem quem aprendeu a dirigir na Queensland, elas confundem ainda mais quem chega de fora, porque uma regra parecida com a do seu país de origem costuma funcionar diferente aqui. Este post é um mergulho profundo nesses erros específicos: situações de ceder passagem, hábitos de faixa e seta, e mais um punhado de regras fáceis de errar. Cada informação abaixo vem de páginas do governo da Queensland em qld.gov.au e streetsmarts.initiatives.qld.gov.au.",
          es: "La propia campaña de seguridad vial de Queensland, StreetSmarts, publica una página llamada Road Rules Refresher que repasa las reglas que, según dice, los conductores confunden con más frecuencia, incluso quienes viven en Queensland y tienen licencia hace años. Si esas reglas confunden a quienes aprendieron a manejar en Queensland, confunden todavía más a los recién llegados, porque una regla parecida a la de tu país de origen suele funcionar distinto aquí. Este artículo es una inmersión profunda en esos errores específicos: situaciones de ceder el paso, hábitos de carril y de intermitente, y un puñado de reglas más que son fáciles de confundir. Cada dato de abajo viene de páginas del Gobierno de Queensland en qld.gov.au y streetsmarts.initiatives.qld.gov.au."
        }
      },
      {
        type: "heading",
        text: {
          en: "Give way is about position, not direction",
          pt: "Ceder passagem é sobre posição, não direção",
          es: "Ceder el paso es sobre posición, no dirección"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "A lot of newcomers assume give way to the right is a universal rule. It only applies at an unsigned crossroads, an intersection with no traffic lights, lines or signs at all, and if you are turning right there, you must also give way to all oncoming traffic. The rule changes completely at a T-intersection: if the road you are driving on ends there, you give way to every vehicle on the road that continues through, no matter which side it is coming from. And if you reach an intersection where you face a stop sign and the crossing traffic faces a give way sign, neither sign outranks the other. They effectively cancel each other out, and the normal give-way order still decides who goes: vehicles that do not face a stop or give way sign go first, and among vehicles that do have to give way to each other, a vehicle turning right gives way to one going straight ahead or turning left.",
          pt: "Muita gente que chega de fora acha que dar passagem para quem vem da direita é uma regra universal. Ela só vale num cruzamento sem sinalização, uma interseção sem semáforo, sem linhas e sem placas de nenhum tipo, e se você for virar à direita ali, também precisa dar passagem para todo o trânsito que vem no sentido contrário. A regra muda completamente numa interseção em T: se a via em que você está termina ali, você dá passagem para todo veículo na via que continua, não importa de que lado ele esteja vindo. E se você chegar numa interseção onde você enfrenta uma placa de pare e o trânsito transversal enfrenta uma placa de dê a preferência, nenhuma das duas placas vale mais que a outra. Elas praticamente se anulam, e a ordem normal de ceder passagem continua decidindo quem vai primeiro: veículos que não enfrentam placa de pare nem de dê a preferência vão primeiro, e entre os veículos que precisam ceder passagem uns aos outros, quem vai virar à direita cede passagem para quem vai seguir em frente ou virar à esquerda.",
          es: "Mucha gente recién llegada supone que ceder el paso a la derecha es una regla universal. Solo se aplica en un cruce sin señalización, una intersección sin semáforo, sin líneas y sin ningún tipo de señal, y si vas a girar a la derecha ahí, también debes ceder el paso a todo el tránsito que viene de frente. La regla cambia por completo en una intersección en T: si la vía por la que vas termina ahí, cedes el paso a todo vehículo en la vía que continúa, sin importar de qué lado venga. Y si llegas a una intersección donde tú enfrentas una señal de pare y el tránsito transversal enfrenta una señal de ceda el paso, ninguna de las dos señales vale más que la otra. Prácticamente se anulan entre sí, y el orden normal para ceder el paso sigue decidiendo quién pasa primero: los vehículos que no enfrentan señal de pare ni de ceda el paso van primero, y entre los vehículos que deben cederse el paso entre sí, quien va a girar a la derecha cede el paso a quien va derecho o gira a la izquierda."
        }
      },
      {
        type: "heading",
        text: {
          en: "Give-way rules that go beyond intersections",
          pt: "Regras de ceder passagem que vão além dos cruzamentos",
          es: "Reglas de ceder el paso que van más allá de las intersecciones"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Give-way obligations do not stop once you are through an intersection. A handful of situations catch newcomers off guard because they rarely come up in quite the same form in other countries.",
          pt: "A obrigação de ceder passagem não termina quando você passa de um cruzamento. Algumas situações pegam quem chega de fora de surpresa, porque raramente aparecem da mesma forma em outros países.",
          es: "La obligación de ceder el paso no termina al pasar una intersección. Hay varias situaciones que sorprenden a los recién llegados, porque rara vez aparecen de la misma forma en otros países."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Pedestrians and cyclists already on or entering the road you are turning into always get priority, whether or not there is a marked crossing. A lot of newcomers only expect this at zebra crossings or traffic lights, but it applies at every corner.",
            pt: "Pedestres e ciclistas que já estão na via para a qual você está virando, ou entrando nela, sempre têm prioridade, exista ou não uma faixa de pedestre marcada. Muita gente que chega de fora só espera isso em faixas de pedestre ou semáforos, mas vale em toda esquina.",
            es: "Los peatones y ciclistas que ya están en la vía hacia la que estás girando, o que están entrando en ella, siempre tienen prioridad, exista o no un cruce peatonal marcado. Mucha gente recién llegada solo espera esto en cruces peatonales o semáforos, pero aplica en cada esquina."
          },
          {
            en: "In a slip lane, you must give way to all traffic already on the road you are entering, with one exception: a vehicle doing a U-turn does not get priority over you.",
            pt: "Numa faixa de conversão (slip lane), você precisa dar passagem para todo o trânsito que já está na via em que você está entrando, com uma exceção: um veículo fazendo retorno não tem prioridade sobre você.",
            es: "En un carril de incorporación (slip lane), debes ceder el paso a todo el tránsito que ya está en la vía a la que estás entrando, con una excepción: un vehículo haciendo un giro en U no tiene prioridad sobre ti."
          },
          {
            en: "A U-turn always goes last. You must give way to every other vehicle, cyclist and pedestrian before completing one, and you cannot do a U-turn across a continuous line, over a painted island, or at a signalised intersection unless a U-turn permitted sign says otherwise.",
            pt: "Um retorno sempre vai por último. Você precisa dar passagem para todo outro veículo, ciclista e pedestre antes de completar um, e não pode fazer retorno cruzando uma linha contínua, sobre uma ilha pintada, ou numa interseção com semáforo, a não ser que uma placa de retorno permitido diga o contrário.",
            es: "Un giro en U siempre va al final. Debes ceder el paso a todo otro vehículo, ciclista y peatón antes de completarlo, y no puedes hacer un giro en U cruzando una línea continua, sobre una isla pintada, ni en una intersección con semáforo, a menos que una señal de giro en U permitido indique lo contrario."
          },
          {
            en: "In built-up areas with a speed limit of 70 km/h or less, you must give way to a bus displaying a give-way sign when it signals to pull back into traffic from a bus zone, stop or shoulder. Most newcomers have never heard of this rule at all.",
            pt: "Em áreas urbanas com limite de velocidade de 70 km/h ou menos, você precisa dar passagem para um ônibus com placa de dê a preferência quando ele sinalizar para voltar ao trânsito, saindo de uma zona de ônibus, parada ou acostamento. Quase ninguém que chega de fora já ouviu falar dessa regra.",
            es: "En zonas urbanas con un límite de velocidad de 70 km/h o menos, debes ceder el paso a un autobús con una señal de ceda el paso cuando indique que va a reincorporarse al tránsito desde una zona de autobuses, una parada o el costado de la vía. Casi nadie recién llegado ha escuchado hablar de esta regla."
          },
          {
            en: "An emergency vehicle sounding an alarm or showing flashing red or blue lights always gets priority, even if you are facing a green light. Move left and slow down, or stay where you are and let it overtake if moving isn't safe. The law even allows you to cross to the wrong side of the road or go through a red light to clear the way, as long as it is safe.",
            pt: "Um veículo de emergência com sirene ligada ou luzes vermelhas ou azuis piscando sempre tem prioridade, mesmo que o seu sinal esteja verde. Mova-se para a esquerda e reduza a velocidade, ou fique onde está e deixe ele ultrapassar, se não for seguro se mover. A lei até permite cruzar para o lado errado da via ou passar num sinal vermelho para abrir caminho, desde que seja seguro.",
            es: "Un vehículo de emergencia con sirena encendida o luces rojas o azules destellando siempre tiene prioridad, incluso si tu semáforo está en verde. Muévete a la izquierda y reduce la velocidad, o quédate donde estás y déjalo pasar si moverte no es seguro. La ley incluso permite cruzar al lado contrario de la vía o pasar un semáforo en rojo para abrir camino, siempre que sea seguro."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Lane changes, merging and indicators",
          pt: "Troca de faixa, fusão de faixas e uso da seta",
          es: "Cambios de carril, fusión de carriles e intermitentes"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Lane and indicator habits are where old muscle memory causes the most trouble, because these are the small automatic movements you don't consciously think about anymore.",
          pt: "Hábitos de faixa e seta são onde o costume antigo mais atrapalha, porque são os pequenos movimentos automáticos que você nem pensa mais conscientemente.",
          es: "Los hábitos de carril e intermitente son donde la costumbre antigua más estorba, porque son esos pequeños movimientos automáticos en los que ya ni piensas conscientemente."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "On any multi-lane road with a speed limit of 90 km/h or more, you must stay out of the right-hand lane unless you are overtaking, turning right, doing a U-turn, avoiding an obstruction, or driving in heavy traffic. A keep left unless overtaking sign can apply the same rule at lower speeds too.",
            pt: "Em qualquer via com mais de uma faixa e limite de velocidade de 90 km/h ou mais, você precisa ficar fora da faixa da direita, a não ser que esteja ultrapassando, virando à direita, fazendo retorno, desviando de um obstáculo, ou dirigindo em trânsito pesado. Uma placa de mantenha-se à esquerda, salvo para ultrapassar pode aplicar a mesma regra em velocidades mais baixas também.",
            es: "En cualquier vía de más de un carril con un límite de velocidad de 90 km/h o más, debes mantenerte fuera del carril derecho, a menos que estés adelantando, girando a la derecha, haciendo un giro en U, esquivando un obstáculo, o conduciendo en tránsito pesado. Una señal de mantente a la izquierda salvo para adelantar puede aplicar la misma regla también a velocidades más bajas."
          },
          {
            en: "Queensland actually has two different merge rules, and mixing them up is common. Where road markings show your lane ending, treat it like any lane change: give way to vehicles already in the lane you are moving into. Where two lines of traffic simply join with no lane markings at all, the rule is different: give way to whichever vehicle is ahead of you.",
            pt: "A Queensland tem, na verdade, duas regras diferentes de fusão de faixas, e é comum misturar as duas. Onde a sinalização mostra que sua faixa está terminando, trate como qualquer troca de faixa: dê passagem para os veículos que já estão na faixa para onde você está indo. Onde duas linhas de trânsito simplesmente se juntam sem nenhuma marcação de faixa, a regra é diferente: dê passagem para o veículo que estiver à sua frente.",
            es: "Queensland en realidad tiene dos reglas distintas de fusión de carriles, y es común confundirlas. Donde la señalización muestra que tu carril está terminando, trátalo como cualquier cambio de carril: cede el paso a los vehículos que ya están en el carril hacia el que te estás moviendo. Donde dos líneas de tránsito simplemente se juntan sin ninguna marcación de carril, la regla es diferente: cede el paso al vehículo que esté delante de ti."
          },
          {
            en: "At a roundabout, use the left lane and signal left the whole way through if you are turning left. Going straight ahead needs no signal on entry, only a left signal just before you exit. Turning right or doing a U-turn, use the right lane, signal right on approach and keep signalling right until you are ready to exit, then switch to the left indicator. Cancel your indicator as soon as you are off the roundabout.",
            pt: "Numa rotatória, use a faixa da esquerda e sinalize à esquerda o tempo todo se você for virar à esquerda. Seguir em frente não precisa de sinalização na entrada, só uma seta à esquerda pouco antes de sair. Para virar à direita ou fazer retorno, use a faixa da direita, sinalize à direita na aproximação e continue sinalizando à direita até estar pronto para sair, e então troque para a seta esquerda. Desligue a seta assim que sair da rotatória.",
            es: "En una rotonda, usa el carril izquierdo y señaliza a la izquierda todo el trayecto si vas a girar a la izquierda. Seguir derecho no necesita señal al entrar, solo un intermitente izquierdo justo antes de salir. Para girar a la derecha o hacer un giro en U, usa el carril derecho, señaliza a la derecha al aproximarte y sigue señalizando a la derecha hasta estar listo para salir, y ahí cambia al intermitente izquierdo. Apaga el intermitente apenas salgas de la rotonda."
          },
          {
            en: "Before you change lanes, indicate long enough to actually warn the drivers around you, not just a flick at the last second, and turn it off again once you have finished. The same signal-first habit applies when you pull out from a parked position: you must give way to everyone else on the road and signal for at least 5 seconds before moving off.",
            pt: "Antes de trocar de faixa, sinalize com antecedência suficiente para realmente avisar os motoristas ao redor, não só um piscar de última hora, e desligue a seta de novo assim que terminar. O mesmo hábito de sinalizar antes vale quando você sai de uma vaga estacionada: você precisa dar passagem para todo mundo na via e sinalizar por pelo menos 5 segundos antes de se mover.",
            es: "Antes de cambiar de carril, señaliza con suficiente anticipación para realmente avisar a los conductores alrededor, no solo un parpadeo de último momento, y apágalo de nuevo en cuanto termines. El mismo hábito de señalizar antes se aplica cuando sales de un lugar estacionado: debes ceder el paso a todos los demás en la vía y señalizar durante al menos 5 segundos antes de moverte."
          },
          {
            en: "If you ride a motorcycle, lane filtering (moving slowly between stopped or slow-moving traffic) is only legal for open licence holders, at 30 km/h or less, and never between a vehicle and the kerb, in a bicycle lane, in a school zone during school hours, or where a no filtering sign applies. Learner and provisional riders cannot filter at all.",
            pt: "Se você anda de moto, a filtragem entre faixas (avançar devagar entre veículos parados ou em movimento lento) só é legal para quem tem licença plena (open), a 30 km/h ou menos, e nunca entre um veículo e o meio-fio, numa ciclovia, numa zona escolar durante o horário escolar, ou onde se aplica uma placa de proibição de filtragem. Motociclistas com licença learner ou provisional não podem filtrar de jeito nenhum.",
            es: "Si andas en moto, filtrar entre carriles (avanzar despacio entre vehículos detenidos o en movimiento lento) solo es legal para quienes tienen licencia plena (open), a 30 km/h o menos, y nunca entre un vehículo y el bordillo, en un carril para bicicletas, en una zona escolar durante el horario escolar, o donde se aplique una señal de prohibido filtrar. Los motociclistas con licencia learner o provisional no pueden filtrar de ninguna manera."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Reading line markings correctly",
          pt: "Lendo corretamente as marcações no pavimento",
          es: "Cómo leer correctamente las marcas viales"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "The line painted on the road tells you what you are allowed to do, and it is not always obvious from a distance which type you are looking at.",
          pt: "A linha pintada na via diz o que você pode fazer, e nem sempre é óbvio de longe qual tipo de linha você está vendo.",
          es: "La línea pintada en la vía te dice qué puedes hacer, y no siempre es obvio a la distancia qué tipo de línea estás viendo."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Broken lines, single or double: you can overtake, turn or make a U-turn across them when it's safe.",
            pt: "Linhas tracejadas, simples ou duplas: você pode ultrapassar, virar ou fazer retorno cruzando-as quando for seguro.",
            es: "Líneas discontinuas, simples o dobles: puedes adelantar, girar o hacer un giro en U cruzándolas cuando sea seguro."
          },
          {
            en: "A single continuous line: you cannot overtake or U-turn across it, but you can cross it to enter or leave a property or side road, or to safely pass a cyclist.",
            pt: "Uma linha contínua simples: você não pode ultrapassar nem fazer retorno cruzando-a, mas pode cruzá-la para entrar ou sair de uma propriedade ou via lateral, ou para ultrapassar um ciclista com segurança.",
            es: "Una línea continua simple: no puedes adelantar ni hacer un giro en U cruzándola, pero puedes cruzarla para entrar o salir de una propiedad o vía lateral, o para adelantar a un ciclista con seguridad."
          },
          {
            en: "Double continuous lines: the only reason you can cross them at all is to safely pass a cyclist. Everything else, including overtaking and U-turns, is off limits.",
            pt: "Linhas duplas contínuas: o único motivo pelo qual você pode cruzá-las é para ultrapassar um ciclista com segurança. Todo o resto, incluindo ultrapassagem e retorno, está fora de questão.",
            es: "Líneas dobles continuas: el único motivo por el que puedes cruzarlas es para adelantar a un ciclista con seguridad. Todo lo demás, incluidos los adelantamientos y los giros en U, está fuera de los límites."
          },
          {
            en: "A painted island bordered by a single continuous line: you can drive on it for up to 50 metres to enter or leave the road, or to reach a turning lane that starts right after the island. Islands marked with double lines or physical separators cannot be driven on at all, except to avoid an obstruction.",
            pt: "Uma ilha pintada cercada por uma linha contínua simples: você pode dirigir sobre ela por até 50 metros para entrar ou sair da via, ou para alcançar uma faixa de conversão que começa logo após a ilha. Ilhas marcadas com linhas duplas ou separadores físicos não podem ser usadas de jeito nenhum, exceto para desviar de um obstáculo.",
            es: "Una isla pintada bordeada por una línea continua simple: puedes conducir sobre ella hasta 50 metros para entrar o salir de la vía, o para alcanzar un carril de giro que comienza justo después de la isla. Las islas marcadas con líneas dobles o separadores físicos no se pueden usar de ninguna manera, excepto para esquivar un obstáculo."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Distance rules that surprise newcomers",
          pt: "Regras de distância que surpreendem quem chega de fora",
          es: "Reglas de distancia que sorprenden a los recién llegados"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "The official safe following distance in Queensland is 2 seconds in good conditions, not the 3-second rule you may have learned elsewhere. Double it to 4 seconds in poor conditions, add another second for every 3 metres of trailer length if you are towing, and heavy vehicle drivers should also allow at least 4 seconds.",
            pt: "A distância segura oficial de seguimento na Queensland é de 2 segundos em boas condições, não a regra dos 3 segundos que você talvez tenha aprendido em outro lugar. Dobre para 4 segundos em condições ruins, acrescente mais um segundo para cada 3 metros de comprimento do reboque se estiver rebocando, e motoristas de veículos pesados também devem manter pelo menos 4 segundos.",
            es: "La distancia de seguimiento segura oficial en Queensland es de 2 segundos en buenas condiciones, no la regla de los 3 segundos que quizás aprendiste en otro lugar. Duplícala a 4 segundos en condiciones malas, agrega un segundo más por cada 3 metros de largo del remolque si estás remolcando, y los conductores de vehículos pesados también deben mantener al menos 4 segundos."
          },
          {
            en: "When passing a bicycle rider, leave at least 1 metre of space in zones of 60 km/h or less, and 1.5 metres above that. You are allowed to cross centre lines, including double unbroken ones, to keep that distance, as long as you have a clear view and it is safe.",
            pt: "Ao ultrapassar um ciclista, deixe pelo menos 1 metro de espaço em zonas de 60 km/h ou menos, e 1,5 metro acima disso. Você pode cruzar linhas centrais, incluindo linhas duplas contínuas, para manter essa distância, desde que tenha visão clara e seja seguro.",
            es: "Al adelantar a un ciclista, deja al menos 1 metro de espacio en zonas de 60 km/h o menos, y 1,5 metros por encima de eso. Puedes cruzar las líneas centrales, incluidas las dobles continuas, para mantener esa distancia, siempre que tengas visión clara y sea seguro."
          },
          {
            en: "When you pass a vehicle stopped with its emergency lights flashing, whether it's police, ambulance, fire, SES or a tow truck, you must move over (change lanes if the road has more than one and it is safe) and slow down. On a single-lane road, move as far over within your lane as you safely can and slow down instead.",
            pt: "Ao passar por um veículo parado com as luzes de emergência piscando, seja da polícia, ambulância, bombeiros, SES ou um guincho, você precisa se mover para outra faixa (se a via tiver mais de uma e for seguro) e reduzir a velocidade. Numa via de faixa única, mova-se o máximo possível dentro da sua faixa com segurança e reduza a velocidade em vez disso.",
            es: "Al pasar junto a un vehículo detenido con las luces de emergencia destellando, ya sea de la policía, ambulancia, bomberos, SES o una grúa, debes cambiarte de carril (si la vía tiene más de uno y es seguro) y reducir la velocidad. En una vía de un solo carril, muévete lo más posible dentro de tu carril con seguridad y reduce la velocidad en su lugar."
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "All of this comes from Queensland Government road rules pages, most of it from the StreetSmarts Road Rules Refresher and the give-way, lane and line-marking pages on qld.gov.au. These are exactly the kind of details the learner test likes to check, since they catch out people who think they already know the rules. Use KangaLearner's Learn section and QLD practice questions to study the rest of the road rules and get comfortable with how they are actually tested.",
          pt: "Tudo isso vem de páginas oficiais de regras de trânsito do governo da Queensland, boa parte do Road Rules Refresher da StreetSmarts e das páginas sobre ceder passagem, faixas e marcações no pavimento em qld.gov.au. Esses são exatamente o tipo de detalhe que a prova de aprendiz gosta de cobrar, porque pegam quem acha que já conhece as regras. Use a seção Aprender e as perguntas de prática de QLD do KangaLearner para estudar o resto das regras de trânsito e se familiarizar com a forma como elas são cobradas na prova.",
          es: "Todo esto viene de páginas oficiales de reglas de tránsito del Gobierno de Queensland, buena parte del Road Rules Refresher de StreetSmarts y de las páginas sobre ceder el paso, carriles y marcas viales en qld.gov.au. Estos son exactamente el tipo de detalles que el examen de aprendiz suele evaluar, porque sorprenden a quienes creen que ya conocen las reglas. Usa la sección Aprender y las preguntas de práctica de QLD de KangaLearner para estudiar el resto de las reglas de tránsito y familiarizarte con la forma en que se evalúan en el examen."
        }
      }
    ]
  },
  {
    slug: "sa-learner-theory-test-guide",
    icon: "checklist",
    state: "SA",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "How to book and pass the SA learner theory test",
      pt: "Como marcar e passar na prova teórica de learner da SA",
      es: "Cómo reservar y aprobar el examen teórico de learner de SA"
    },
    excerpt: {
      en: "myLs online or a fixed test at Service SA: South Australia gives you two different paths to the learner theory test, each with its own pass mark, fee and rules. Here is what you need to know about both.",
      pt: "myLs online ou uma prova presencial fixa no Service SA: a South Australia oferece dois caminhos diferentes para a prova teórica de learner, cada um com sua própria nota de corte, taxa e regras. Veja o que você precisa saber sobre os dois.",
      es: "myLs en línea o un examen fijo y presencial en Service SA: South Australia ofrece dos caminos distintos para el examen teórico de learner, cada uno con su propia nota de aprobación, tarifa y reglas. Esto es lo que necesitas saber sobre ambos."
    },
    sourceLabel: {
      en: "Service SA, Apply for your learner's permit (L's)",
      pt: "Service SA, Apply for your learner's permit (L's)",
      es: "Service SA, Apply for your learner's permit (L's)"
    },
    sourceUrl: "https://www.sa.gov.au/topics/driving-and-transport/licences/learners-permit/apply",
    body: [
      {
        type: "paragraph",
        text: {
          en: "South Australia calls its learner exam simply the learner's theory test, and the process works differently from the WA and NSW tests already covered on this blog. Instead of one fixed exam, SA gives you two genuinely different official paths: myLs, a self-paced online course that ends in its own test, or a fixed, two part test booked in person at a Service SA centre. This post walks through both, the actual pass mark for each, the fees, and what happens if you do not pass, based on Service SA's and My Licence's own pages.",
          pt: "A South Australia chama seu exame de learner simplesmente de learner's theory test, e o processo funciona diferente das provas de WA e NSW já cobertas neste blog. Em vez de um exame único e fixo, a SA oferece dois caminhos oficiais genuinamente diferentes: o myLs, um curso online no seu próprio ritmo que termina numa prova própria, ou uma prova fixa, com duas partes, marcada presencialmente num centro do Service SA. Este post explica os dois, a nota de corte real de cada um, as taxas, e o que acontece se você não passar, com base nas próprias páginas do Service SA e do My Licence.",
          es: "South Australia llama a su examen de learner simplemente learner's theory test, y el proceso funciona distinto a los exámenes de WA y NSW que ya cubrimos en este blog. En lugar de un examen único y fijo, SA ofrece dos caminos oficiales genuinamente distintos: myLs, un curso en línea a tu propio ritmo que termina en su propio examen, o un examen fijo, de dos partes, que se reserva en persona en un centro de Service SA. Este artículo explica ambos caminos, la nota de aprobación real de cada uno, las tarifas, y qué pasa si no apruebas, basado en las propias páginas de Service SA y de My Licence."
        }
      },
      {
        type: "heading",
        text: {
          en: "Two ways to complete the test",
          pt: "Duas formas de fazer a prova",
          es: "Dos formas de hacer el examen"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "myLs: a self-paced online course of about 4 hours, split into three sections, your driving attitude, signs and rules, and sharing the road. The theory test itself is the final stage, unlocked once you finish all three. You still need to visit a Service SA centre once in person first, to prove your identity, have your photo taken and set up a mySAGOV account, but after that everything happens online, on your own schedule, over up to 12 months from enrolment.",
            pt: "myLs: um curso online no seu próprio ritmo, com cerca de 4 horas, dividido em três seções, sua atitude ao dirigir, sinais e regras, e compartilhar a via. A prova teórica em si é a etapa final, liberada só depois que você termina as três. Você ainda precisa visitar um centro do Service SA uma vez, presencialmente, para comprovar sua identidade, tirar foto e criar uma conta mySAGOV, mas depois disso tudo acontece online, no seu próprio ritmo, por até 12 meses a partir da inscrição.",
            es: "myLs: un curso en línea a tu propio ritmo, de unas 4 horas, dividido en tres secciones, tu actitud al conducir, señales y reglas, y compartir la vía. El examen teórico en sí es la etapa final, que se desbloquea al terminar las tres. Igual necesitas visitar un centro de Service SA una vez, en persona, para comprobar tu identidad, tomarte una foto y crear una cuenta mySAGOV, pero después de eso todo pasa en línea, a tu propio ritmo, durante hasta 12 meses desde la inscripción."
          },
          {
            en: "In person at Service SA: a fixed test you book ahead by calling 13 10 84, sat on a computer screen or on paper at the centre itself, or as a written test only at remote country police stations if you live more than 100 km from a centre. You must already be at least 16 years old to book this option, and the $44 fee is charged every time you attend for an attempt, whether you pass or fail.",
            pt: "Presencialmente no Service SA: uma prova fixa que você marca com antecedência ligando para o 13 10 84, feita na tela do computador ou em papel no próprio centro, ou como prova escrita só em delegacias de polícia do interior remoto, se você mora a mais de 100 km de um centro. Você já precisa ter pelo menos 16 anos pra marcar essa opção, e a taxa de $44 é cobrada toda vez que você comparece pra uma tentativa, passando ou reprovando.",
            es: "En persona en Service SA: un examen fijo que reservas con anticipación llamando al 13 10 84, presentado en la pantalla de una computadora o en papel en el propio centro, o como examen escrito solo en estaciones de policía rurales remotas si vives a más de 100 km de un centro. Ya debes tener al menos 16 años para reservar esta opción, y la tarifa de $44 se cobra cada vez que te presentas para un intento, apruebes o repruebes."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "The test format and pass mark",
          pt: "O formato da prova e a nota de corte",
          es: "El formato del examen y la nota de aprobación"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "The two paths are genuinely different tests, not the same questions in two formats. At Service SA, the test has two parts. Part A is 8 give way diagrams, and you must answer all 8 correctly before you are even allowed to move on to Part B. Part B is 42 multiple choice questions on road rules and safety, and you need at least 32 of those correct. Miss either mark and you fail the whole attempt. myLs works differently: its theory test is 30 questions, and you need at least 27 correct to pass. It must be completed in one sitting, without help from anyone else, and some questions accept more than one correct answer, marked with a hint telling you to select all that apply.",
          pt: "Os dois caminhos são provas genuinamente diferentes, não as mesmas perguntas em dois formatos. No Service SA, a prova tem duas partes. A Parte A são 8 diagramas de ceder passagem, e você precisa acertar todos os 8 antes de sequer poder avançar pra Parte B. A Parte B são 42 questões de múltipla escolha sobre regras de trânsito e segurança, e você precisa acertar pelo menos 32 delas. Errar em qualquer uma das duas reprova a tentativa inteira. O myLs funciona diferente: a prova teórica dele tem 30 questões, e você precisa acertar pelo menos 27 pra passar. Ela precisa ser feita numa sentada só, sem ajuda de ninguém, e algumas questões aceitam mais de uma resposta correta, marcadas com uma dica avisando pra selecionar todas as certas.",
          es: "Los dos caminos son exámenes genuinamente distintos, no las mismas preguntas en dos formatos. En Service SA, el examen tiene dos partes. La Parte A son 8 diagramas de ceda el paso, y debes responder los 8 correctamente antes de poder avanzar a la Parte B. La Parte B son 42 preguntas de opción múltiple sobre reglas de tránsito y seguridad, y necesitas al menos 32 correctas. Si fallas cualquiera de las dos marcas, repruebas todo el intento. myLs funciona distinto: su examen teórico tiene 30 preguntas, y necesitas al menos 27 correctas para aprobar. Debe completarse de una sola vez, sin ayuda de nadie, y algunas preguntas aceptan más de una respuesta correcta, marcadas con una pista que avisa que debes seleccionar todas las correctas."
        }
      },
      {
        type: "heading",
        text: {
          en: "Fees",
          pt: "Taxas",
          es: "Tarifas"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Learner's theory test: $44, whether that is your myLs enrolment or a single attempt at Service SA",
            pt: "Prova teórica de learner: $44, seja pra se inscrever no myLs ou por uma tentativa no Service SA",
            es: "Examen teórico de learner: $44, ya sea para inscribirte en myLs o por un intento en Service SA"
          },
          {
            en: "New learner's permit, valid for 2 years: $78",
            pt: "Nova licença de learner, válida por 2 anos: $78",
            es: "Nuevo permiso de learner, válido por 2 años: $78"
          },
          {
            en: "Learner's logbook: $5, or download a free PDF version instead",
            pt: "Caderneta de learner: $5, ou baixe a versão em PDF gratuita",
            es: "Libreta de learner: $5, o descarga la versión en PDF gratis"
          },
          {
            en: "Printed Driver's Handbook: $10, though the same content is free to read online",
            pt: "The Driver's Handbook impresso: $10, embora o mesmo conteúdo seja gratuito pra ler online",
            es: "The Driver's Handbook impreso: $10, aunque el mismo contenido es gratis para leer en línea"
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "That same $44 buys very different value depending on the path: myLs turns one payment into 12 months of unlimited attempts, while the in person test charges it again on every attempt, pass or fail. These figures are current at the time of writing, but government fees are reviewed periodically, so confirm the exact amount on sa.gov.au or mylicence.sa.gov.au before you pay.",
          pt: "Esse mesmo $44 rende um valor bem diferente dependendo do caminho: no myLs, um único pagamento vira 12 meses de tentativas ilimitadas, enquanto na prova presencial ele é cobrado de novo a cada tentativa, passando ou não. Esses valores são atuais no momento em que este post foi escrito, mas taxas do governo são revisadas periodicamente, então confirme o valor exato em sa.gov.au ou mylicence.sa.gov.au antes de pagar.",
          es: "Ese mismo $44 rinde un valor muy distinto según el camino: en myLs, un solo pago se convierte en 12 meses de intentos ilimitados, mientras que en el examen presencial se cobra de nuevo en cada intento, apruebes o no. Estos valores están vigentes al momento de escribir este artículo, pero las tarifas del gobierno se revisan periodicamente, así que confirma el monto exacto en sa.gov.au o mylicence.sa.gov.au antes de pagar."
        }
      },
      {
        type: "heading",
        text: {
          en: "Proof of identity",
          pt: "Comprovação de identidade",
          es: "Comprobación de identidad"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "SA's identity rule is simpler on paper than some other states: you need at least 1 primary document plus 2 more primary or secondary documents, and together they must prove your full name and date of birth, your signature, and your current SA residential address. For newcomers, the most useful primary option is your overseas passport together with your Australian visa and visa grant notice, which counts as a single primary document on its own. Secondary documents that can fill the rest include a bank statement or letter, a phone or utility bill, or a letter or enrolment certificate from your education institution, generally under 12 months old. If any of your documents are not in English, you need a translation from an Australia based translator. Confirm the exact combination with Service SA (13 10 84) before you go, since documents are checked carefully and photocopies are not accepted.",
          pt: "A regra de identidade da SA é mais simples no papel do que a de alguns outros estados: você precisa de pelo menos 1 documento primário mais 2 outros documentos primários ou secundários, e juntos eles precisam comprovar seu nome completo e data de nascimento, sua assinatura, e seu endereço residencial atual na SA. Pra quem chega de fora, a opção primária mais útil é seu passaporte estrangeiro junto com seu visto australiano e o aviso de concessão do visto, que conta como um único documento primário sozinho. Documentos secundários que podem completar o resto incluem um extrato ou carta do banco, uma conta de telefone ou de serviço, ou uma carta ou certificado de matrícula da sua instituição de ensino, geralmente com menos de 12 meses. Se algum dos seus documentos não estiver em inglês, você precisa de uma tradução feita por um tradutor baseado na Austrália. Confirme a combinação exata com o Service SA (13 10 84) antes de ir, já que os documentos são conferidos com cuidado e cópias não são aceitas.",
          es: "La regla de identidad de SA es más simple en el papel que la de otros estados: necesitas al menos 1 documento primario más 2 documentos adicionales, primarios o secundarios, y juntos deben comprobar tu nombre completo y fecha de nacimiento, tu firma, y tu domicilio actual en SA. Para quienes llegan de afuera, la opción primaria más útil es tu pasaporte extranjero junto con tu visa australiana y el aviso de concesión de la visa, que cuenta como un único documento primario por sí solo. Los documentos secundarios que pueden completar el resto incluyen un extracto o carta del banco, una factura de teléfono o de servicios, o una carta o certificado de matrícula de tu institución educativa, generalmente de menos de 12 meses. Si alguno de tus documentos no está en inglés, necesitas una traducción hecha por un traductor con base en Australia. Confirma la combinación exacta con Service SA (13 10 84) antes de ir, ya que los documentos se revisan con cuidado y no se aceptan fotocopias."
        }
      },
      {
        type: "heading",
        text: {
          en: "If you need a translator, or if you do not pass",
          pt: "Se você precisa de um tradutor, ou se não passar",
          es: "Si necesitas un traductor, o si no apruebas"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "If English is not your strongest language, the in person path has an option myLs does not: My Licence says you can complete the test with a translator at certain Service SA centres. Availability varies by location, so ask when you call 13 10 84 to book. As for not passing: on myLs there is no penalty at all, you can attempt the final test again straight away, at no extra cost, as many times as you need within your 12 month subscription. Fail the in person test at Service SA, and you simply book again and pay the $44 fee again, there is no published waiting period. Either way, once you pass, you can apply for your learner's permit straight away, online through mySAGOV if you did myLs, or on the spot at the counter if you tested in person.",
          pt: "Se o inglês não é seu idioma mais forte, o caminho presencial tem uma opção que o myLs não tem: o My Licence diz que você pode fazer a prova com um tradutor em determinados centros do Service SA. A disponibilidade varia por local, então pergunte ao ligar pro 13 10 84 pra marcar. Sobre não passar: no myLs não existe punição nenhuma, você pode tentar a prova final de novo na hora, sem custo extra, quantas vezes precisar dentro da sua assinatura de 12 meses. Se você reprovar na prova presencial do Service SA, é só marcar de novo e pagar a taxa de $44 outra vez, não existe um prazo de espera publicado. De qualquer forma, assim que você passar, pode aplicar pra sua licença de learner na hora, online pelo mySAGOV se fez o myLs, ou na hora no balcão se fez a prova presencial.",
          es: "Si el inglés no es tu idioma más fuerte, el camino presencial tiene una opción que myLs no tiene: My Licence dice que puedes hacer el examen con un traductor en ciertos centros de Service SA. La disponibilidad varía según el lugar, así que pregunta al llamar al 13 10 84 para reservar. En cuanto a no aprobar: en myLs no hay ninguna penalidad, puedes intentar el examen final de nuevo al instante, sin costo extra, tantas veces como necesites dentro de tu suscripción de 12 meses. Si repruebas el examen presencial en Service SA, simplemente reservas de nuevo y pagas la tarifa de $44 otra vez, no hay un plazo de espera publicado. De cualquier forma, en cuanto apruebes, puedes solicitar tu permiso de learner de inmediato, en línea a través de mySAGOV si hiciste myLs, o en el momento en el mostrador si hiciste el examen presencial."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This post covers the official process for booking and passing South Australia's learner theory test, whichever path you choose. Use KangaLearner's Learn section and SA practice questions to prepare for the actual content, and check mylicence.sa.gov.au or call 13 10 84 to confirm current fees and booking details before your appointment.",
          pt: "Este post cobre o processo oficial pra marcar e passar na prova teórica de learner da South Australia, qualquer que seja o caminho que você escolher. Use a seção Aprender e as perguntas de prática de SA do KangaLearner pra se preparar pro conteúdo em si, e confira mylicence.sa.gov.au ou ligue pra 13 10 84 pra confirmar taxas atuais e detalhes de agendamento antes do seu atendimento.",
          es: "Este artículo cubre el proceso oficial para reservar y aprobar el examen teórico de learner de South Australia, sea cual sea el camino que elijas. Usa la sección Aprender y las preguntas de práctica de SA de KangaLearner para prepararte para el contenido real, y revisa mylicence.sa.gov.au o llama al 13 10 84 para confirmar tarifas actuales y detalles de reserva antes de tu cita."
        }
      }
    ]
  },
  {
    slug: "sa-overseas-licence-conversion-guide",
    icon: "checklist",
    state: "SA",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "Converting your overseas driving licence in South Australia",
      pt: "Convertendo sua carteira de motorista estrangeira na South Australia",
      es: "Convirtiendo tu licencia de conducir extranjera en South Australia"
    },
    excerpt: {
      en: "Who actually needs to convert their overseas licence in SA, who does not, the recognised country shortcut that changed in 2025, and the documents and fees involved either way.",
      pt: "Quem realmente precisa converter a carteira estrangeira na SA, quem não precisa, o atalho de país reconhecido que mudou em 2025, e os documentos e taxas envolvidos.",
      es: "Quién realmente necesita convertir su licencia extranjera en SA, quién no, el atajo de país reconocido que cambió en 2025, y los documentos y tarifas involucrados."
    },
    sourceLabel: {
      en: "SA.GOV.AU, Transfer your overseas driver's licence",
      pt: "SA.GOV.AU, Transfer your overseas driver's licence",
      es: "SA.GOV.AU, Transfer your overseas driver's licence"
    },
    sourceUrl:
      "https://www.sa.gov.au/topics/driving-and-transport/licences/interstate-and-overseas/overseas-licence-transfer",
    body: [
      {
        type: "paragraph",
        text: {
          en: "In South Australia, whether you need to convert your overseas driving licence depends first on your visa status, and then, if you are a permanent resident, on which country issued it. Since May 2025 the rules for some countries got noticeably stricter, so what applied to a friend or relative even a year ago may not apply to you now.",
          pt: "Na South Australia, se você precisa converter sua carteira de motorista estrangeira depende primeiro do seu status de visto, e depois, se você é residente permanente, de qual país emitiu a carteira. Desde maio de 2025 as regras para alguns países ficaram bem mais rígidas, então o que valia para um amigo ou parente até um ano atrás pode não valer mais para você agora.",
          es: "En South Australia, si necesitas convertir tu licencia de conducir extranjera depende primero de tu estado migratorio, y después, si eres residente permanente, de qué país la emitió. Desde mayo de 2025 las reglas para algunos países se volvieron notablemente más estrictas, así que lo que aplicaba a un amigo o familiar hace apenas un año puede que ya no aplique para ti ahora."
        }
      },
      {
        type: "heading",
        text: {
          en: "Do you even need to convert it",
          pt: "Você realmente precisa converter",
          es: "Realmente necesitas convertirla"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Temporary visa holders, including international students: you can keep driving on your current, valid overseas licence for as long as it stays valid. You only have to apply for an SA licence if that overseas licence expires while you are still here, or if you become a permanent resident.",
            pt: "Quem tem visto temporário, incluindo estudantes internacionais: você pode continuar dirigindo com sua carteira estrangeira atual e válida enquanto ela continuar válida. Você só precisa aplicar para uma carteira de SA se essa carteira estrangeira vencer enquanto você ainda está aqui, ou se você se tornar residente permanente.",
            es: "Titulares de visa temporal, incluidos estudiantes internacionales: puedes seguir conduciendo con tu licencia extranjera actual y vigente mientras siga vigente. Solo necesitas solicitar una licencia de SA si esa licencia extranjera vence mientras todavía estás aquí, o si te conviertes en residente permanente."
          },
          {
            en: "Permanent residents: once you are granted permanent residency while living in South Australia, you have 3 months to get a South Australian licence.",
            pt: "Residentes permanentes: assim que você recebe a residência permanente morando na South Australia, você tem 3 meses para conseguir uma carteira de SA.",
            es: "Residentes permanentes: en cuanto se te otorga la residencia permanente viviendo en South Australia, tienes 3 meses para conseguir una licencia de SA."
          },
          {
            en: "Once you are issued a South Australian learner's permit or licence, your overseas licence stops being valid for driving in Australia, even if it has not expired back home.",
            pt: "Assim que você recebe um learner's permit ou uma carteira da South Australia, sua carteira estrangeira deixa de valer para dirigir na Austrália, mesmo que ela ainda não tenha vencido no seu país de origem.",
            es: "En cuanto se te emite un learner's permit o una licencia de South Australia, tu licencia extranjera deja de ser válida para conducir en Australia, aunque todavía no haya vencido en tu país de origen."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Recognised country or not, and why it matters",
          pt: "País reconhecido ou não, e por que isso importa",
          es: "País reconocido o no, y por qué importa"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "South Australia recognises the driver licensing and testing standards of 28 countries for a car or motorbike licence, among them Canada, France, Germany, Ireland, Italy, Japan, New Zealand, Singapore, Spain and the United Kingdom. If your licence is from one of these countries, or you held one from there within the last 5 years, you can get an SA licence without sitting a theory test, Hazard Perception Test or practical driving test. That shortcut usually only covers car (class C) and motorcycle licence classes. New Zealand is the exception, its licence holders can get any SA licence class except road trains and B-doubles. There is also a catch for the UK and Ireland specifically: a provisional licence from either country counts as equivalent to an SA learner's permit, so it does not qualify for the shortcut.",
          pt: "A South Australia reconhece os padrões de habilitação e teste de motorista de 28 países para uma carteira de carro ou moto, entre eles Canadá, França, Alemanha, Irlanda, Itália, Japão, Nova Zelândia, Singapura, Espanha e Reino Unido. Se sua carteira é de um desses países, ou você teve uma de lá nos últimos 5 anos, você consegue uma carteira de SA sem fazer prova teórica, Hazard Perception Test ou prova prática de direção. Esse atalho geralmente cobre só as classes de carro (classe C) e moto. A Nova Zelândia é a exceção, quem tem carteira de lá pode conseguir qualquer classe de carteira de SA, exceto road trains e B-doubles. Também existe uma pegadinha específica para o Reino Unido e a Irlanda: uma carteira provisional (provisional licence) de qualquer um dos dois países é considerada equivalente a um learner's permit de SA, então ela não se qualifica para o atalho.",
          es: "South Australia reconoce los estándares de licenciamiento y evaluación de conductores de 28 países para una licencia de auto o moto, entre ellos Canadá, Francia, Alemania, Irlanda, Italia, Japón, Nueva Zelanda, Singapur, España y Reino Unido. Si tu licencia es de uno de estos países, o tuviste una de ahí en los últimos 5 años, puedes obtener una licencia de SA sin rendir examen teórico, Hazard Perception Test ni examen práctico de manejo. Ese atajo generalmente solo cubre las clases de auto (clase C) y moto. Nueva Zelanda es la excepción, quienes tienen licencia de ahí pueden obtener cualquier clase de licencia de SA, excepto road trains y B-doubles. También hay una trampa específica para el Reino Unido e Irlanda: una licencia provisional (provisional licence) de cualquiera de los dos países se considera equivalente a un learner's permit de SA, así que no califica para el atajo."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "If your licence is from a country not on that list, you need to pass a theory test, a Hazard Perception Test and a practical driving test before South Australia will issue you a licence. This list got longer on 1 May 2025: drivers with a licence from Hong Kong, Poland, Romania, South Africa, South Korea, Taiwan and 11 other countries lost the 'experienced driver recognition' status that used to let them skip those tests too, so they now go through the same process as everyone else outside the 28 recognised countries. The change does not affect anyone who already holds an SA or interstate licence, or visitors driving on the conditions of their own overseas licence. Since these lists change, check the current one on sa.gov.au rather than relying on what applied to a friend or relative even a year or two ago.",
          pt: "Se sua carteira é de um país que não está nessa lista, você precisa passar numa prova teórica, num Hazard Perception Test e numa prova prática de direção antes que a South Australia emita sua carteira. Desde 1 de maio de 2025, essa lista não reconhecida ganhou mais 17 países: quem tem carteira de Hong Kong, Polônia, Romênia, África do Sul, Coreia do Sul, Taiwan e mais 11 países perdeu o status de 'experienced driver recognition' que antes permitia pular essas provas também, e agora passa pelo mesmo processo que qualquer outro país fora da lista de 28 reconhecidos. A mudança não afeta quem já tem carteira de SA ou de outro estado australiano, nem visitantes dirigindo pelas condições da própria carteira estrangeira. Como essas listas mudam, confira a atual em sa.gov.au em vez de confiar no que valia para um amigo ou parente há um ano ou dois.",
          es: "Si tu licencia es de un país que no está en esa lista, necesitas aprobar un examen teórico, un Hazard Perception Test y un examen práctico de manejo antes de que South Australia te emita una licencia. Desde el 1 de mayo de 2025, esa lista de países no reconocidos sumó 17 más: quienes tienen licencia de Hong Kong, Polonia, Rumania, Sudáfrica, Corea del Sur, Taiwán y otros 11 países perdieron el estatus de 'experienced driver recognition' que antes les permitía saltarse esos exámenes también, y ahora pasan por el mismo proceso que cualquier otro país fuera de la lista de 28 reconocidos. El cambio no afecta a quienes ya tienen licencia de SA o de otro estado australiano, ni a los visitantes que conducen según las condiciones de su propia licencia extranjera. Como esas listas cambian, revisa la actual en sa.gov.au en vez de confiar en lo que aplicaba a un amigo o familiar hace uno o dos años."
        }
      },
      {
        type: "heading",
        text: {
          en: "Documents you will need",
          pt: "Documentos que você vai precisar",
          es: "Documentos que vas a necesitar"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Your current overseas driver's licence, showing the date it was issued. If your licence does not show an issue date, you need extra supporting evidence that confirms it.",
            pt: "Sua carteira de motorista estrangeira atual, mostrando a data de emissão. Se sua carteira não mostrar a data de emissão, você precisa de uma evidência extra que confirme essa data.",
            es: "Tu licencia de conducir extranjera actual, que muestre la fecha de emisión. Si tu licencia no muestra la fecha de emisión, necesitas evidencia adicional que confirme esa fecha."
          },
          {
            en: "An English translation if your licence is not in English, or your International Driving Permit instead. Acceptable translators are a NAATI approved translator (stamped and signed, or with a NAATI digital QR stamp), a consulate office in Australia on official letterhead, South Australia's own Interpreting and Translating Centre, or the Department of Social Services' free translating service.",
            pt: "Uma tradução para o inglês se sua carteira não estiver em inglês, ou seu International Driving Permit no lugar dela. Tradutores aceitos incluem um tradutor certificado pela NAATI (carimbado e assinado, ou com o carimbo digital QR da NAATI), um consulado na Austrália em papel timbrado oficial, o próprio Interpreting and Translating Centre da South Australia, ou o serviço gratuito de tradução do Department of Social Services.",
            es: "Una traducción al inglés si tu licencia no está en inglés, o tu International Driving Permit en su lugar. Los traductores aceptados incluyen un traductor certificado por NAATI (sellado y firmado, o con el sello digital QR de NAATI), un consulado en Australia con membrete oficial, el propio Interpreting and Translating Centre de South Australia, o el servicio gratuito de traducción del Department of Social Services."
          },
          {
            en: "Evidence of identity that covers your signature, your age and your address.",
            pt: "Comprovação de identidade que cubra sua assinatura, sua idade e seu endereço.",
            es: "Comprobación de identidad que cubra tu firma, tu edad y tu domicilio."
          },
          {
            en: "If you went through testing: your certificate of competency from the practical driving test, and your passed Hazard Perception Test result.",
            pt: "Se você passou pelos testes: seu certificado de competência da prova prática de direção, e o resultado aprovado do seu Hazard Perception Test.",
            es: "Si pasaste por los exámenes: tu certificado de competencia del examen práctico de manejo, y el resultado aprobado de tu Hazard Perception Test."
          },
          {
            en: "A medical certificate, only if you have a medical condition that affects your driving.",
            pt: "Um atestado médico, só se você tiver uma condição médica que afete sua direção.",
            es: "Un certificado médico, solo si tienes una condición médica que afecte tu manejo."
          },
          {
            en: "You generally get to keep your overseas licence after transferring. The only exceptions are licences from England, Scotland, Wales or Ontario, Canada, which you do have to surrender.",
            pt: "Você geralmente pode ficar com sua carteira estrangeira depois de transferir. As únicas exceções são carteiras da Inglaterra, Escócia, País de Gales ou Ontário, Canadá, que você precisa entregar.",
            es: "Por lo general puedes quedarte con tu licencia extranjera después de la transferencia. Las únicas excepciones son las licencias de Inglaterra, Escocia, Gales u Ontario, Canadá, que sí debes entregar."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Fees",
          pt: "Taxas",
          es: "Tarifas"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "If your country is on the recognised list, you only pay the standard licence fee for however many years you choose. A 1 year full licence costs $79, and a first provisional licence, issued for 3 years, costs $193, whichever applies to you based on your age and how long you have held your overseas licence. If your country is not recognised, you pay for testing on top of that: $44 for the theory test, $37 for the Hazard Perception Test, and a separate fee paid directly to your driving instructor for the VORT or the competency based training, which is not a fixed government amount. These figures are current at the time of writing, but government fees are reviewed periodically, so confirm the exact amount on sa.gov.au before you pay.",
          pt: "Se o seu país está na lista reconhecida, você só paga a taxa padrão de carteira pelo número de anos que escolher. Uma carteira definitiva de 1 ano custa $79, e uma primeira carteira provisional, emitida por 3 anos, custa $193, dependendo do que se aplica a você conforme sua idade e há quanto tempo você tem sua carteira estrangeira. Se o seu país não é reconhecido, você paga pelos testes além disso: $44 pela prova teórica, $37 pelo Hazard Perception Test, e uma taxa separada paga direto ao seu instrutor de direção pelo VORT ou pelo competency based training, que não é um valor fixo do governo. Esses valores são atuais no momento em que este post foi escrito, mas taxas do governo são revisadas periodicamente, então confirme o valor exato em sa.gov.au antes de pagar.",
          es: "Si tu país está en la lista reconocida, solo pagas la tarifa estándar de la licencia por la cantidad de años que elijas. Una licencia plena de 1 año cuesta $79, y una primera licencia provisional, emitida por 3 años, cuesta $193, la que te corresponda según tu edad y cuánto tiempo llevas con tu licencia extranjera. Si tu país no es reconocido, pagas por los exámenes además de eso: $44 por el examen teórico, $37 por el Hazard Perception Test, y una tarifa aparte que se paga directamente a tu instructor de manejo por el VORT o por el competency based training, que no es un monto fijo del gobierno. Estos valores están vigentes al momento de escribir este post, pero las tarifas del gobierno se revisan periodicamente, así que confirma el monto exacto en sa.gov.au antes de pagar."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Whichever path applies to you, use KangaLearner's Learn section and SA practice questions to get ready for the road rules content itself, and confirm the current process, fees and recognised country list on sa.gov.au or mylicence.sa.gov.au before your appointment.",
          pt: "Seja qual for o caminho que se aplica a você, use a seção Aprender e as perguntas de prática de SA do KangaLearner para se preparar para o conteúdo das regras de trânsito, e confirme o processo atual, as taxas e a lista de países reconhecidos em sa.gov.au ou mylicence.sa.gov.au antes do seu atendimento.",
          es: "Sea cual sea el camino que te corresponda, usa la sección Aprender y las preguntas de práctica de SA de KangaLearner para prepararte para el contenido de las reglas de tránsito, y confirma el proceso actual, las tarifas y la lista de países reconocidos en sa.gov.au o mylicence.sa.gov.au antes de tu cita."
        }
      }
    ]
  },
  {
    slug: "sa-p-plate-rules-guide",
    icon: "safety",
    state: "SA",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 9,
    title: {
      en: "P1 and P2 in South Australia: what actually changes between the two stages",
      pt: "P1 e P2 na South Australia: o que muda de verdade entre as duas etapas",
      es: "P1 y P2 en South Australia: qué cambia realmente entre las dos etapas"
    },
    excerpt: {
      en: "Passenger limits, phone rules, the speed cap and high powered vehicles all change between P1 and P2 in South Australia. Here is exactly what applies at each stage, based on the Department for Infrastructure and Transport's own pages.",
      pt: "Limite de passageiros, regras de celular, teto de velocidade e veículos de alta potência, tudo isso muda entre o P1 e o P2 na South Australia. Veja exatamente o que vale em cada etapa, com base nas próprias páginas do Department for Infrastructure and Transport.",
      es: "El límite de pasajeros, las reglas de celular, el tope de velocidad y los vehículos de alta potencia cambian entre P1 y P2 en South Australia. Aquí está exactamente qué aplica en cada etapa, según las propias páginas del Department for Infrastructure and Transport."
    },
    sourceLabel: {
      en: "My Licence South Australia, Provisional Driver's Licence (P1 & P2) conditions and laws",
      pt: "My Licence South Australia, Provisional Driver's Licence (P1 & P2) conditions and laws",
      es: "My Licence South Australia, Provisional Driver's Licence (P1 & P2) conditions and laws"
    },
    sourceUrl: "https://mylicence.sa.gov.au/the-driving-companion/provisional-conditions",
    body: [
      {
        type: "paragraph",
        text: {
          en: "South Australia's provisional licence system runs longer than in most other states: three years in total, split into a stricter P1 stage and a more relaxed P2 stage. The two stages are not just a formality, the real rules around passengers, phones, speed and vehicle choice change noticeably the moment you move from P1 to P2. This post goes through exactly what applies at each stage, based on the Department for Infrastructure and Transport's own My Licence pages.",
          pt: "O sistema de carteira provisória da South Australia dura mais tempo do que na maioria dos outros estados: três anos no total, divididos entre uma etapa P1 mais rígida e uma etapa P2 mais flexível. As duas etapas não são só uma formalidade, as regras de verdade sobre passageiros, celular, velocidade e escolha do veículo mudam de forma perceptível assim que você passa de P1 para P2. Este post detalha exatamente o que vale em cada etapa, com base nas próprias páginas do My Licence, do Department for Infrastructure and Transport.",
          es: "El sistema de licencia provisional de South Australia dura más tiempo que en la mayoría de los otros estados: tres años en total, divididos entre una etapa P1 más estricta y una etapa P2 más flexible. Las dos etapas no son solo una formalidad, las reglas reales sobre pasajeros, celular, velocidad y elección de vehículo cambian de forma notable apenas pasas de P1 a P2. Este artículo repasa exactamente qué aplica en cada etapa, basado en las propias páginas de My Licence, del Department for Infrastructure and Transport."
        }
      },
      {
        type: "heading",
        text: {
          en: "How long you actually spend on P1, and on P2",
          pt: "Quanto tempo você passa mesmo no P1, e no P2",
          es: "Cuánto tiempo pasas realmente en el P1, y en el P2"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "A P1 licence must be held for at least 12 months before it can become a P2, but a second condition matters just as much: you also need to be at least 18 years old. Both have to be true at once, so if you started your P1 before turning 18, you stay on P1 until your 18th birthday even after passing the 12 month mark. The switch from P1 to P2 happens automatically, with nothing to apply for, as long as you were not disqualified during that year. P2 then runs for at least 2 years, and moving on to a full licence needs both 2 years on P2 and turning 20, whichever comes later. Add it up and the floor is 3 years total on provisional licences, one on P1 and two on P2, and you cannot hold a full licence before you turn 20.",
          pt: "Uma carteira P1 precisa ser mantida por pelo menos 12 meses antes de virar P2, mas uma segunda condição importa tanto quanto: você também precisa ter pelo menos 18 anos. As duas coisas precisam ser verdade ao mesmo tempo, então se você começou o P1 antes de completar 18, fica no P1 até o seu aniversário de 18 anos mesmo já tendo passado da marca de 12 meses. A troca de P1 para P2 acontece automaticamente, sem nada pra aplicar, desde que você não tenha sido suspenso durante esse ano. O P2 então dura pelo menos 2 anos, e passar pra carteira definitiva exige tanto 2 anos de P2 quanto completar 20 anos, o que vier depois. Somando tudo, o mínimo é 3 anos no total de carteira provisória, um no P1 e dois no P2, e você não pode ter a carteira definitiva antes de completar 20 anos.",
          es: "Una licencia P1 debe mantenerse por al menos 12 meses antes de convertirse en P2, pero una segunda condición importa igual de mucho: también necesitas tener al menos 18 años. Las dos cosas tienen que ser ciertas al mismo tiempo, así que si empezaste tu P1 antes de cumplir 18, te quedas en P1 hasta tu cumpleaños número 18 aunque ya hayas pasado la marca de los 12 meses. El cambio de P1 a P2 ocurre automáticamente, sin nada que solicitar, siempre que no te hayan suspendido durante ese año. El P2 dura entonces al menos 2 años, y pasar a la licencia plena exige tanto 2 años de P2 como cumplir 20 años, lo que ocurra después. Sumando todo, el mínimo es 3 años en total de licencia provisional, uno en P1 y dos en P2, y no puedes tener la licencia plena antes de cumplir 20 años."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "If your licence is suspended during the provisional period, the clock can reset. Getting suspended on P1 and reapplying means holding the new provisional licence for the full 3 years again, one year on P1 and two years on P2. Getting suspended once you are already on P2 means your new P2 licence runs for another 2 years from when you get it back. In some cases you can choose a Safer Driver Agreement instead of serving a 6 month suspension, but breaching that agreement doubles it to 12 months, with no further agreements or appeals available.",
          pt: "Se sua carteira for suspensa durante o período provisório, o relógio pode reiniciar. Ser suspenso no P1 e reaplicar significa segurar a nova carteira provisória pelos 3 anos completos de novo, um ano no P1 e dois anos no P2. Ser suspenso já no P2 significa que sua nova carteira P2 vale por mais 2 anos a partir de quando você a recupera. Em alguns casos você pode escolher um Safer Driver Agreement em vez de cumprir uma suspensão de 6 meses, mas descumprir esse acordo dobra a suspensão para 12 meses, sem novos acordos ou recursos disponíveis.",
          es: "Si te suspenden la licencia durante el período provisional, el reloj puede reiniciarse. Que te suspendan estando en P1 y volver a solicitarla significa mantener la nueva licencia provisional los 3 años completos otra vez, un año en P1 y dos años en P2. Que te suspendan ya estando en P2 significa que tu nueva licencia P2 dura otros 2 años desde que la recuperas. En algunos casos puedes elegir un Safer Driver Agreement en vez de cumplir una suspensión de 6 meses, pero incumplir ese acuerdo duplica la suspensión a 12 meses, sin más acuerdos ni apelaciones disponibles."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "One more thing changes the moment you move from P1 to P2: you no longer have to display P plates on the car. P1 drivers must show a red P plate on the front and rear of the vehicle, but once you reach P2, South Australia does not require you to display any plate at all.",
          pt: "Mais uma coisa muda assim que você passa do P1 para o P2: você deixa de precisar exibir a placa P no carro. Motoristas P1 precisam mostrar uma placa P vermelha na frente e atrás do veículo, mas ao chegar no P2, a South Australia não exige que você exiba nenhuma placa.",
          es: "Otra cosa cambia en cuanto pasas de P1 a P2: dejas de tener que mostrar la placa P en el auto. Los conductores P1 deben mostrar una placa P roja en la parte delantera y trasera del vehículo, pero al llegar a P2, South Australia no exige que muestres ninguna placa."
        }
      },
      {
        type: "heading",
        text: {
          en: "Passengers and the night curfew: P1 only, and only under 25",
          pt: "Passageiros e o toque de recolher noturno: só no P1, e só para menores de 25",
          es: "Pasajeros y el toque de queda nocturno: solo en P1, y solo para menores de 25"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Two more rules apply only on P1, and only while you are under 25: a limit on how many peer aged passengers you can carry, and a curfew on night driving. Both stop applying the moment you turn 25, and both disappear entirely once you move to P2, regardless of age. If you are already 25 or older when you get your P1, which is common for newcomers who learn to drive as adults, neither rule ever applies to you.",
          pt: "Mais duas regras valem só no P1, e só enquanto você tem menos de 25 anos: um limite de quantos passageiros da mesma faixa etária você pode levar, e um toque de recolher noturno. As duas deixam de valer assim que você completa 25 anos, e as duas desaparecem por completo quando você passa pro P2, independente da idade. Se você já tem 25 anos ou mais quando tira o P1, o que é comum entre quem chega de fora e aprende a dirigir já adulto, nenhuma das duas chega a valer pra você.",
          es: "Otras dos reglas aplican solo en P1, y solo mientras tienes menos de 25 años: un límite de cuántos pasajeros de edad similar puedes llevar, y un toque de queda para manejar de noche. Las dos dejan de aplicar en cuanto cumples 25 años, y las dos desaparecen por completo cuando pasas a P2, sin importar la edad. Si ya tienes 25 años o más cuando obtienes tu P1, algo común entre quienes llegan de otro país y aprenden a conducir ya de adultos, ninguna de las dos llega a aplicarte."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Peer passengers: while on P1 and under 25, you can have at most one passenger aged 16 to 20 in the car at a time, at any hour. Immediate family does not count towards that limit. You can carry more than one only if a Qualified Supervising Driver is sitting next to you, or if carrying multiple passengers that age is a genuine requirement of your job.",
            pt: "Passageiros da mesma faixa etária: no P1 e com menos de 25 anos, você pode levar no máximo um passageiro de 16 a 20 anos no carro por vez, em qualquer horário. Parentes próximos não entram nessa conta. Você só pode levar mais de um se tiver um Qualified Supervising Driver sentado ao seu lado, ou se levar vários passageiros dessa idade for uma exigência de verdade do seu trabalho.",
            es: "Pasajeros de edad similar: en P1 y con menos de 25 años, puedes llevar como máximo un pasajero de 16 a 20 años en el auto a la vez, a cualquier hora. Los familiares directos no cuentan para ese límite. Solo puedes llevar más de uno si tienes un Qualified Supervising Driver sentado a tu lado, o si llevar varios pasajeros de esa edad es un requisito real de tu trabajo."
          },
          {
            en: "Night curfew: while on P1 and under 25, you cannot drive between midnight and 5am unless a Qualified Supervising Driver is next to you, or you are travelling directly to or from work, study, formal volunteering, or an organised sport, arts, religious or charity activity, by the shortest practical route.",
            pt: "Toque de recolher noturno: no P1 e com menos de 25 anos, você não pode dirigir entre meia-noite e 5h da manhã, a não ser que um Qualified Supervising Driver esteja ao seu lado, ou que você esteja indo direto para o trabalho, os estudos, um trabalho voluntário formal, ou uma atividade organizada de esporte, arte, religião ou caridade, pelo caminho mais curto possível.",
            es: "Toque de queda nocturno: en P1 y con menos de 25 años, no puedes conducir entre la medianoche y las 5am, salvo que tengas un Qualified Supervising Driver a tu lado, o que vayas directo al trabajo, al estudio, a un trabajo voluntario formal, o a una actividad organizada de deporte, arte, religión o caridad, por el camino más corto posible."
          },
          {
            en: "The two exemption lists are not the same size: the passenger limit only bends for work, while the curfew also bends for study, volunteering and organised activities. Breaking either rule risks a fine plus 3 demerit points, and those points count towards the 4 demerit point limit that applies across your whole provisional period.",
            pt: "As duas listas de exceção não têm o mesmo tamanho: o limite de passageiros só abre exceção pro trabalho, enquanto o toque de recolher também abre exceção pra estudo, trabalho voluntário e atividades organizadas. Descumprir qualquer uma das duas regras arrisca uma multa mais 3 pontos na carteira, e esses pontos contam pro limite de 4 pontos que vale durante todo o seu período provisório.",
            es: "Las dos listas de excepciones no tienen el mismo tamaño: el límite de pasajeros solo hace excepción para el trabajo, mientras que el toque de queda también hace excepción para estudio, trabajo voluntario y actividades organizadas. Incumplir cualquiera de las dos reglas arriesga una multa más 3 puntos en la licencia, y esos puntos cuentan para el límite de 4 puntos que aplica durante todo tu período provisional."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Mobile phones: banned outright on P1, hands free on P2",
          pt: "Celular: proibido por completo no P1, viva-voz liberado no P2",
          es: "Celular: prohibido por completo en P1, manos libres permitido en P2"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "On a P1 licence you cannot use any function of your mobile phone while driving, full stop. That includes hands free calls, Bluetooth, and using the phone as a GPS, even mounted. The only carve outs are paying through a digital wallet or scanning a QR code while the car is stationary off the road, such as at a drive through or in a car park, and showing a digital licence or ID when an officer asks for it. Once you move to P2, that changes completely: you can use hands free and Bluetooth, including your phone as a GPS, as long as you stick to the same mobile phone road rules that apply to every other driver in South Australia.",
          pt: "No P1, você não pode usar nenhuma função do celular enquanto dirige, ponto final. Isso inclui ligação em viva-voz, Bluetooth, e usar o celular como GPS, mesmo fixo num suporte. As únicas exceções são pagar por algo com carteira digital ou ler um QR code com o carro parado fora da via, como num drive-thru ou estacionamento, e mostrar a carteira digital ou outro documento quando um policial pedir. Ao passar pro P2, isso muda por completo: você pode usar viva-voz e Bluetooth, incluindo o celular como GPS, desde que siga as mesmas regras de trânsito sobre celular que valem pra qualquer outro motorista na South Australia.",
          es: "En P1, no puedes usar ninguna función del celular mientras conduces, punto final. Eso incluye llamadas en manos libres, Bluetooth, y usar el celular como GPS, aunque esté fijo en un soporte. Las únicas excepciones son pagar algo con billetera digital o leer un código QR con el auto detenido fuera de la vía, como en un drive-thru o estacionamiento, y mostrar la licencia digital u otro documento cuando un oficial lo pida. Al pasar a P2, eso cambia por completo: puedes usar manos libres y Bluetooth, incluido el celular como GPS, siempre que sigas las mismas reglas de tránsito sobre el celular que aplican a cualquier otro conductor en South Australia."
        }
      },
      {
        type: "heading",
        text: {
          en: "The 100 km/h speed cap: the same for P1 and P2",
          pt: "O teto de 100 km/h: igual para P1 e P2",
          es: "El tope de 100 km/h: igual para P1 y P2"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Unlike the passenger and curfew rules, the speed conditions apply the same way on P1 and P2, at any age. You must not drive over 100 km/h under any circumstances, even on the stretches of SA highway signed for 110 km/h, where only full licence holders can use the higher limit. Going 10 km/h or more over whatever the posted limit is counts as a breach of your licence conditions, which can mean losing your licence outright rather than just paying a fine. Accumulating 4 or more demerit points at any point during your combined P1 and P2 period has the same effect.",
          pt: "Diferente das regras de passageiro e toque de recolher, as condições de velocidade valem do mesmo jeito no P1 e no P2, em qualquer idade. Você não pode passar de 100 km/h em nenhuma circunstância, mesmo nos trechos de rodovia da SA sinalizados para 110 km/h, onde só quem tem carteira definitiva pode usar o limite maior. Passar 10 km/h ou mais acima do limite sinalizado conta como quebra das condições da sua carteira, o que pode significar perder a carteira de vez, e não só pagar uma multa. Acumular 4 pontos ou mais em qualquer momento do seu período combinado de P1 e P2 tem o mesmo efeito.",
          es: "A diferencia de las reglas de pasajeros y toque de queda, las condiciones de velocidad aplican igual en P1 y en P2, a cualquier edad. No puedes superar los 100 km/h bajo ninguna circunstancia, ni siquiera en los tramos de autopista de SA señalizados con 110 km/h, donde solo quienes tienen licencia plena pueden usar el límite mayor. Superar el límite señalizado por 10 km/h o más cuenta como incumplimiento de las condiciones de tu licencia, lo que puede significar perderla directamente, y no solo pagar una multa. Acumular 4 puntos o más en cualquier momento de tu período combinado de P1 y P2 tiene el mismo efecto."
        }
      },
      {
        type: "heading",
        text: {
          en: "High powered vehicles: off limits under 25, on P1 or P2",
          pt: "Veículos de alta potência: proibidos para menores de 25 anos, no P1 ou no P2",
          es: "Vehículos de alta potencia: prohibidos para menores de 25 años, en P1 o en P2"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "If you are under 25, you cannot drive a high powered vehicle on either P1 or P2, full stop, this is one of the few conditions that carries over unchanged between the two stages. It stops applying the moment you turn 25, or the moment you get a full licence, whichever happens first, and it never applied while you were on your learner's permit in the first place, because you were always supervised then. What counts as high powered depends on the car's age: for vehicles built from 2010 onwards, it comes down to a power to weight ratio above 130 kilowatts per tonne of the car's tare mass (its weight when empty), or any modification made to boost engine performance. For older vehicles, it is based on things like having 8 or more cylinders, or a turbocharged or supercharged engine. You can check a specific 2010-or-later vehicle yourself through the HPV check tool on EzyReg, South Australia's vehicle and licensing account, or the EzyReg mobile app, before you buy or borrow it.",
          pt: "Se você tem menos de 25 anos, não pode dirigir um veículo de alta potência nem no P1 nem no P2, ponto final, essa é uma das poucas condições que continua igual entre as duas etapas. Ela deixa de valer assim que você completa 25 anos, ou assim que tira a carteira definitiva, o que vier primeiro, e nunca valeu enquanto você tinha a carteira learner, porque ali você sempre estava supervisionado. O que conta como alta potência depende do ano do carro: para veículos fabricados a partir de 2010, o critério é uma relação potência-peso acima de 130 quilowatts por tonelada do peso do carro vazio (tare mass), ou qualquer modificação feita para aumentar o desempenho do motor. Para veículos mais antigos, o critério é ter 8 cilindros ou mais, ou um motor turbo ou sobrealimentado. Você pode conferir um veículo de 2010 em diante por conta própria na ferramenta HPV check do EzyReg, a conta de veículos e licenciamento da South Australia, ou pelo aplicativo EzyReg, antes de comprar ou pegar emprestado.",
          es: "Si tienes menos de 25 años, no puedes conducir un vehículo de alta potencia ni en P1 ni en P2, punto final, esta es una de las pocas condiciones que se mantiene igual entre las dos etapas. Deja de aplicar en cuanto cumples 25 años, o en cuanto obtienes la licencia plena, lo que ocurra primero, y nunca aplicó mientras tenías la licencia learner, porque ahí siempre estabas supervisado. Lo que cuenta como alta potencia depende del año del auto: para vehículos fabricados desde 2010, el criterio es una relación potencia-peso superior a 130 kilovatios por tonelada del peso del auto vacío (tare mass), o cualquier modificación hecha para aumentar el rendimiento del motor. Para vehículos más antiguos, el criterio es tener 8 cilindros o más, o un motor turboalimentado o sobrealimentado. Puedes revisar un vehículo de 2010 en adelante por tu cuenta con la herramienta HPV check de EzyReg, la cuenta de vehículos y licencias de South Australia, o con la app de EzyReg, antes de comprarlo o pedirlo prestado."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This restriction is completely separate from the newer Ultra High Powered Vehicle (UHPV) category, which has required its own U class licence from anyone driving one, at any licence stage, since 1 December 2024. A UHPV is defined by an even higher power to weight ratio, 276 kilowatts per tonne or more, on a vehicle no heavier than 4.5 tonnes. If your circumstances genuinely require driving a high powered vehicle before you turn 25, such as no public transport and no other vehicle available for work, you can apply for an exemption certificate using the Application for Exemption from High Powered Vehicle Restrictions form.",
          pt: "Essa restrição é totalmente separada da categoria mais nova de Ultra High Powered Vehicle (UHPV), que exige uma licença própria de categoria U de qualquer pessoa que dirija um desses veículos, em qualquer etapa de carteira, desde 1º de dezembro de 2024. Um UHPV é definido por uma relação potência-peso ainda maior, 276 quilowatts por tonelada ou mais, num veículo de até 4,5 toneladas. Se a sua situação exigir de verdade dirigir um veículo de alta potência antes dos 25 anos, como falta de transporte público e nenhum outro veículo disponível pro trabalho, você pode pedir um certificado de isenção usando o formulário Application for Exemption from High Powered Vehicle Restrictions.",
          es: "Esta restricción es totalmente independiente de la categoría más nueva Ultra High Powered Vehicle (UHPV), que exige una licencia propia de categoría U a cualquier persona que conduzca uno de estos vehículos, en cualquier etapa de licencia, desde el 1 de diciembre de 2024. Un UHPV se define por una relación potencia-peso aún mayor, 276 kilovatios por tonelada o más, en un vehículo de hasta 4,5 toneladas. Si tu situación realmente exige conducir un vehículo de alta potencia antes de los 25 años, como falta de transporte público y ningún otro vehículo disponible para el trabajo, puedes solicitar un certificado de exención usando el formulario Application for Exemption from High Powered Vehicle Restrictions."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "None of this replaces South Australia's own Driver's Handbook, and some of it, like the exemption criteria and the high powered vehicle definitions, is detailed enough that it is worth double checking directly on My Licence before you rely on it. Use KangaLearner's Learn section to study the road rules behind all of this, and SA practice questions to get ready for the parts of it that show up on your test.",
          pt: "Nada disso substitui o próprio Driver's Handbook da South Australia, e parte do conteúdo, como os critérios de isenção e as definições de veículo de alta potência, é detalhado o bastante pra valer a pena conferir direto no My Licence antes de confiar cegamente. Use a seção Aprender do KangaLearner pra estudar as regras de trânsito por trás de tudo isso, e as perguntas de prática de SA pra se preparar pras partes que caem na sua prova.",
          es: "Nada de esto reemplaza el propio Driver's Handbook de South Australia, y parte del contenido, como los criterios de exención y las definiciones de vehículo de alta potencia, es lo bastante detallado como para valer la pena revisarlo directamente en My Licence antes de confiar en él a ciegas. Usa la sección Aprender de KangaLearner para estudiar las reglas de tránsito detrás de todo esto, y las preguntas de práctica de SA para prepararte para las partes que aparecen en tu examen."
        }
      }
    ]
  },
  {
    slug: "sa-roundabouts-give-way-guide",
    icon: "safety",
    state: "SA",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 5,
    title: {
      en: "Roundabouts in South Australia: lanes, indicators, cyclists and the mistakes newcomers make",
      pt: "Rotatórias na South Australia: faixas, seta, ciclistas e os erros de quem chega de fora",
      es: "Rotondas en South Australia: carriles, intermitente, ciclistas y los errores de los recién llegados"
    },
    excerpt: {
      en: "Beyond the basics: how to pick your lane on a multi-lane roundabout, when you actually have to indicate, how cyclists fit in, and the specific mistakes that catch out newcomers in South Australia.",
      pt: "Além do básico: como escolher a faixa numa rotatória com várias faixas, quando você realmente precisa usar a seta, como os ciclistas entram nisso, e os erros específicos que pegam quem chega de fora na South Australia.",
      es: "Más allá de lo básico: cómo elegir el carril en una rotonda de varios carriles, cuándo realmente hay que indicar, cómo encajan los ciclistas, y los errores específicos que sorprenden a los recién llegados en South Australia."
    },
    sourceLabel: {
      en: "My Licence South Australia, The Driver's Handbook: Approaching and entering a roundabout",
      pt: "My Licence South Australia, The Driver's Handbook: Approaching and entering a roundabout",
      es: "My Licence South Australia, The Driver's Handbook: Approaching and entering a roundabout"
    },
    sourceUrl: "https://www.mylicence.sa.gov.au/road-rules/the-drivers-handbook/roundabout",
    body: [
      {
        type: "paragraph",
        text: {
          en: "Roundabouts are where many newcomers make their first driving mistake in South Australia, not because the basic rule is complicated, but because it works differently from what a lot of people were taught in their home country. Our overview guide to driving in SA only touches on roundabouts briefly. This post goes deeper: how to choose your lane on a multi-lane roundabout, when you actually have to indicate, where cyclists fit into all of this, and the specific mistakes that catch out people who are new to Australian roads. Everything below comes directly from My Licence South Australia's own Driver's Handbook.",
          pt: "Rotatórias são onde muita gente que chega de fora comete seu primeiro erro nas vias da South Australia, não porque a regra básica seja complicada, mas porque ela funciona diferente do que muita gente aprendeu no seu país de origem. Nosso guia geral de direção na SA só toca rapidamente no assunto rotatórias. Este post vai mais fundo: como escolher a faixa certa numa rotatória com várias faixas, quando você realmente precisa usar a seta, onde os ciclistas entram nessa história toda, e os erros específicos que pegam quem é novo nas vias australianas. Tudo abaixo vem direto do próprio Driver's Handbook do My Licence South Australia.",
          es: "Las rotondas son donde muchos recién llegados cometen su primer error en las vías de South Australia, no porque la regla básica sea complicada, sino porque funciona distinto de lo que mucha gente aprendió en su país de origen. Nuestra guía general de manejo en SA solo toca las rotondas de forma breve. Este artículo va más a fondo: cómo elegir el carril correcto en una rotonda de varios carriles, cuándo realmente tienes que usar el intermitente, dónde entran los ciclistas en toda esta historia, y los errores específicos que sorprenden a quienes son nuevos en las vías australianas. Todo lo que sigue viene directamente del propio Driver's Handbook de My Licence South Australia."
        }
      },
      {
        type: "heading",
        text: {
          en: "Give way to vehicles already there, not just to the right",
          pt: "Dê passagem pra quem já está lá, não só pra direita",
          es: "Cede el paso a quien ya está ahí, no solo a la derecha"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "A lot of newcomers learn the roundabout rule as giving way to the right and stop there. That is not exactly SA's rule, and the gap between the two can catch you out. My Licence's own Driver's Handbook puts it like this: you must give way to vehicles already in the roundabout, and you should take particular care of vehicles approaching or about to enter from your right because they may enter the roundabout before you. The difference matters at a busy multi-lane roundabout: a car sitting at the give-way line to your right has not entered yet, so you do not automatically give way to it just because of where it is sitting, what matters is whether a vehicle is already circulating.",
          pt: "Muita gente que chega de fora aprende que rotatória é dar passagem para a direita e para por aí. Essa não é exatamente a regra da SA, e a diferença entre as duas pode te pegar de surpresa. O próprio Driver's Handbook do My Licence explica assim: você deve dar passagem para os veículos que já estão na rotatória, e deve ter cuidado especial com veículos se aproximando ou prestes a entrar pela sua direita, porque eles podem entrar na rotatória antes de você. Essa diferença importa numa rotatória movimentada com várias faixas: um carro parado na linha de dar passagem à sua direita ainda não entrou, então você não dá passagem pra ele automaticamente só por causa de onde ele está, o que importa é se um veículo já está circulando.",
          es: "Muchos recién llegados aprenden que en una rotonda hay que ceder el paso a la derecha y se quedan con eso. Esa no es exactamente la regla de SA, y la diferencia entre ambas te puede sorprender. El propio Driver's Handbook de My Licence lo explica así: debes ceder el paso a los vehículos que ya están en la rotonda, y debes tener especial cuidado con los vehículos que se acercan o están por entrar desde tu derecha, porque pueden entrar a la rotonda antes que tú. Esa diferencia importa en una rotonda concurrida con varios carriles: un auto detenido en la línea de ceder el paso a tu derecha todavía no ha entrado, así que no le cedes el paso automáticamente solo por su posición, lo que importa es si un vehículo ya está circulando."
        }
      },
      {
        type: "heading",
        text: {
          en: "Choosing the right lane on a multi-lane roundabout",
          pt: "Escolhendo a faixa certa numa rotatória com várias faixas",
          es: "Cómo elegir el carril correcto en una rotonda de varios carriles"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Decide which exit you need before you get there: move into the correct lane before you reach the roundabout, not once you are already going around it.",
            pt: "Decida qual saída você precisa pegar antes de chegar lá: mude para a faixa certa antes de entrar na rotatória, não depois de já estar dando a volta nela.",
            es: "Decide qué salida necesitas antes de llegar: cámbiate al carril correcto antes de llegar a la rotonda, no una vez que ya estés dando la vuelta en ella."
          },
          {
            en: "First exit, or turning left: use the left lane.",
            pt: "Primeira saída, ou virando à esquerda: use a faixa da esquerda.",
            es: "Primera salida, o girando a la izquierda: usa el carril izquierdo."
          },
          {
            en: "Going straight ahead: either lane works, unless the lane arrows painted on the road say otherwise.",
            pt: "Seguindo em frente: qualquer uma das duas faixas serve, a não ser que as setas pintadas no chão indiquem outra coisa.",
            es: "Siguiendo derecho: cualquiera de los dos carriles sirve, a menos que las flechas pintadas en el pavimento indiquen otra cosa."
          },
          {
            en: "Turning right, meaning you leave from the third exit or any exit after that: use the right-hand lane, and signal right as you approach.",
            pt: "Virando à direita, ou seja, saindo na terceira saída ou em qualquer saída depois dela: use a faixa da direita, e sinalize à direita enquanto se aproxima.",
            es: "Girando a la derecha, es decir, saliendo por la tercera salida o cualquier salida posterior: usa el carril derecho, e indica a la derecha mientras te acercas."
          },
          {
            en: "Going all the way around to head back the way you came: use the right-hand lane too.",
            pt: "Dando a volta completa pra voltar pelo caminho que veio: use a faixa da direita também.",
            es: "Dando la vuelta completa para regresar por donde viniste: usa el carril derecho también."
          },
          {
            en: "Five or more entry roads: follow the lane arrows and signs on site, bigger roundabouts do not always follow the simple pattern above.",
            pt: "Cinco ou mais vias de entrada: siga as setas e placas do local, rotatórias maiores nem sempre seguem o padrão simples acima.",
            es: "Cinco o más vías de entrada: sigue las flechas y señales del lugar, las rotondas más grandes no siempre siguen el patrón simple de arriba."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "The indicator rule most newcomers forget",
          pt: "A regra da seta que quem chega de fora esquece",
          es: "La regla del intermitente que los recién llegados olvidan"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "On a single-lane roundabout, you signal left if you are exiting before halfway round, right if you are exiting after halfway round, and you do not need to signal at all if you are going straight ahead. What most people miss is what happens next, once you are actually in the roundabout. You must signal left immediately before you reach your exit, that is, as you pass the exit just before yours, unless it is genuinely impractical, for example because the roundabout is too small for the indicator to have time to work. This applies even if you entered signalling right. My Licence's own example walks through exactly this for a right turn: approach in the right lane, signal right early, keep to the right lane around the roundabout, then switch to a left signal as you pass the exit before yours, leave by the right lane of your exit road, and cancel the signal. Skip that middle step and the driver waiting to enter behind you has no idea you are about to leave.",
          pt: "Numa rotatória de uma faixa só, você sinaliza à esquerda se vai sair antes da metade do percurso, à direita se vai sair depois da metade, e não precisa sinalizar nada se vai seguir em frente. O que muita gente deixa passar é o que acontece depois, quando você já está dentro da rotatória. Você precisa sinalizar à esquerda imediatamente antes de chegar na sua saída, ou seja, ao passar pela saída logo antes da sua, a não ser que isso seja realmente impraticável, por exemplo porque a rotatória é pequena demais pra seta ter tempo de funcionar. Isso vale mesmo que você tenha entrado sinalizando à direita. O próprio exemplo do My Licence mostra exatamente isso pra uma conversão à direita: aproxime-se pela faixa da direita, sinalize à direita cedo, mantenha-se na faixa da direita ao redor da rotatória, depois troque pra seta à esquerda ao passar pela saída antes da sua, saia pela faixa da direita da sua via de saída, e desligue a seta. Pular essa etapa do meio faz o motorista esperando pra entrar atrás de você não fazer ideia de que você está prestes a sair.",
          es: "En una rotonda de un solo carril, indicas a la izquierda si vas a salir antes de la mitad del recorrido, a la derecha si vas a salir después de la mitad, y no necesitas indicar nada si vas a seguir derecho. Lo que mucha gente pasa por alto es lo que ocurre después, una vez que ya estás dentro de la rotonda. Debes indicar a la izquierda justo antes de llegar a tu salida, es decir, al pasar por la salida justo antes de la tuya, a menos que eso sea realmente impracticable, por ejemplo porque la rotonda es demasiado pequeña para que el intermitente tenga tiempo de funcionar. Esto aplica incluso si entraste indicando a la derecha. El propio ejemplo de My Licence muestra exactamente esto para un giro a la derecha: acércate por el carril derecho, indica a la derecha temprano, mantente en el carril derecho alrededor de la rotonda, luego cambia a indicar a la izquierda al pasar por la salida antes de la tuya, sal por el carril derecho de tu vía de salida, y apaga el intermitente. Saltarse ese paso del medio hace que el conductor que espera para entrar detrás de ti no tenga idea de que estás por salir."
        }
      },
      {
        type: "heading",
        text: {
          en: "Cyclists at roundabouts",
          pt: "Ciclistas nas rotatórias",
          es: "Ciclistas en las rotondas"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Cyclists are treated as vehicles at a roundabout in South Australia, with one extra allowance and one extra obligation that catch drivers off guard. The allowance: on a multi-lane roundabout, a cyclist may turn right from either lane, including the far left one, they are not forced into the right-hand lane the way a car is. The obligation: a cyclist doing this from the far left lane must give way to any vehicle leaving the roundabout from the lane beside them. In practice that means a cyclist can be sitting still in the left lane, indicating right, waiting for cars to exit past them, exactly where a driver would not normally expect anyone to stop. My Licence's own handbook flags this directly: drivers must remember to look out for those cyclists.",
          pt: "Ciclistas são tratados como veículos numa rotatória na South Australia, com uma permissão extra e uma obrigação extra que pegam os motoristas de surpresa. A permissão: numa rotatória com várias faixas, um ciclista pode virar à direita a partir de qualquer uma das faixas, incluindo a faixa mais à esquerda, ele não é obrigado a ir pra faixa da direita como um carro seria. A obrigação: um ciclista fazendo isso pela faixa mais à esquerda precisa dar passagem pra qualquer veículo saindo da rotatória pela faixa ao lado dele. Na prática, isso significa que um ciclista pode estar parado na faixa da esquerda, sinalizando à direita, esperando os carros saírem passando por ele, exatamente onde um motorista normalmente não esperaria que alguém parasse. O próprio manual do My Licence chama atenção pra isso diretamente: os motoristas precisam se lembrar de procurar por esses ciclistas.",
          es: "Los ciclistas son tratados como vehículos en una rotonda en South Australia, con un permiso extra y una obligación extra que sorprenden a los conductores. El permiso: en una rotonda de varios carriles, un ciclista puede girar a la derecha desde cualquiera de los carriles, incluido el más a la izquierda, no está obligado a pasarse al carril derecho como tendría que hacerlo un auto. La obligación: un ciclista que hace esto desde el carril más a la izquierda debe ceder el paso a cualquier vehículo que salga de la rotonda por el carril de al lado. En la práctica, eso significa que un ciclista puede estar detenido en el carril izquierdo, con el intermitente a la derecha puesto, esperando que pasen los autos que salen, justo donde un conductor normalmente no esperaría que alguien se detuviera. El propio manual de My Licence lo señala directamente: los conductores deben recordar estar atentos a esos ciclistas."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Like any vehicle, a cyclist entering a roundabout must give way to whatever is already on it.",
            pt: "Como qualquer veículo, um ciclista que entra numa rotatória precisa dar passagem pra quem já estiver nela.",
            es: "Como cualquier vehículo, un ciclista que entra a una rotonda debe ceder el paso a quien ya esté en ella."
          },
          {
            en: "A pedestrian or cyclist crossing the exit road right at a roundabout is the one required to give way to a vehicle or bicycle entering or leaving there, the opposite of what many newcomers assume. That does not mean you should barrel through, just that the strict rule is different from a normal footpath crossing.",
            pt: "Um pedestre ou ciclista atravessando a via de saída bem na rotatória é quem precisa dar passagem para um veículo ou bicicleta entrando ou saindo dali, o contrário do que muita gente que chega de fora costuma imaginar. Isso não quer dizer que você deva simplesmente acelerar, só que a regra estrita é diferente de uma faixa de pedestre comum.",
            es: "Un peatón o ciclista que cruza la vía de salida justo en una rotonda es quien debe ceder el paso a un vehículo o bicicleta que entra o sale ahí, lo contrario de lo que mucha gente recién llegada suele imaginar. Eso no significa que debas pasar sin cuidado, solo que la regla estricta es distinta a la de un cruce peatonal común."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Mistakes newcomers make most often",
          pt: "Os erros que quem chega de fora mais comete",
          es: "Los errores que los recién llegados cometen con más frecuencia"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Assuming that giving way to the right is the whole rule. What actually matters is whether a vehicle is already on the roundabout, not which side it came from.",
            pt: "Achar que dar passagem para a direita é a regra inteira. O que importa de verdade é se o veículo já está na rotatória, não de que lado ele veio.",
            es: "Creer que ceder el paso a la derecha es toda la regla. Lo que realmente importa es si el vehículo ya está en la rotonda, no de qué lado vino."
          },
          {
            en: "Picking a lane once already inside the roundabout instead of before entering it. Choose your lane on approach, and stay in it around the roundabout.",
            pt: "Escolher a faixa só depois de já estar dentro da rotatória, em vez de escolher antes de entrar. Escolha a faixa na aproximação, e fique nela até completar a volta.",
            es: "Elegir el carril solo cuando ya estás dentro de la rotonda, en vez de elegirlo antes de entrar. Elige el carril al acercarte, y quédate en él durante toda la vuelta."
          },
          {
            en: "Signalling right to enter, then forgetting to switch to a left signal before the exit. The car waiting to enter behind you is watching for that left flick, not your original signal.",
            pt: "Sinalizar à direita pra entrar, e esquecer de trocar pra seta à esquerda antes da saída. O carro esperando pra entrar atrás de você está de olho nesse sinal à esquerda, não no seu sinal original.",
            es: "Indicar a la derecha para entrar, y olvidarte de cambiar al intermitente izquierdo antes de tu salida. El auto que espera para entrar detrás de ti está atento a ese cambio a la izquierda, no a tu señal original."
          },
          {
            en: "Not expecting a cyclist stopped in the left lane of a multi-lane roundabout. They may be waiting there, indicating right, for traffic to clear before they turn.",
            pt: "Não esperar encontrar um ciclista parado na faixa da esquerda numa rotatória com várias faixas. Ele pode estar ali esperando, com a seta à direita ligada, até o trânsito abrir pra ele virar.",
            es: "No esperar encontrarte con un ciclista detenido en el carril izquierdo de una rotonda de varios carriles. Puede estar ahí esperando, con el intermitente derecho puesto, hasta que el tránsito se despeje para poder girar."
          },
          {
            en: "Cutting across the centre island instead of keeping to its left at all times, even on a small or painted roundabout where the island barely stands out.",
            pt: "Cortar caminho por cima da ilha central em vez de manter-se sempre à esquerda dela, mesmo numa rotatória pequena ou só pintada no chão, onde a ilha quase não se destaca.",
            es: "Cortar camino por encima de la isla central en vez de mantenerte siempre a su izquierda, incluso en una rotonda pequeña o solo pintada en el pavimento, donde la isla casi no se nota."
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "This post is based on the roundabout and cyclist sections of My Licence South Australia's own Driver's Handbook. It goes deeper than our general SA driving guide on purpose, roundabouts are worth the extra attention since they come up constantly, both in real traffic and in the learner test. Use KangaLearner's Learn section and SA practice questions to keep working through the rest of the road rules.",
          pt: "Este post é baseado nas seções sobre rotatórias e ciclistas do próprio Driver's Handbook do My Licence South Australia. Ele vai mais fundo do que o nosso guia geral de direção na SA de propósito, rotatórias merecem essa atenção extra porque aparecem o tempo todo, tanto no trânsito real quanto na prova de learner. Use a seção Aprender e as perguntas de prática de SA do KangaLearner pra continuar estudando o resto das regras de trânsito.",
          es: "Este artículo está basado en las secciones sobre rotondas y ciclistas del propio Driver's Handbook de My Licence South Australia. Va más a fondo que nuestra guía general de manejo en SA a propósito, las rotondas merecen esa atención extra porque aparecen todo el tiempo, tanto en el tránsito real como en el examen de learner. Usa la sección Aprender y las preguntas de práctica de SA de KangaLearner para seguir repasando el resto de las reglas de tránsito."
        }
      }
    ]
  },
  {
    slug: "sa-school-zones-speed-limits-guide",
    icon: "safety",
    state: "SA",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "How South Australia's school zone speed limits actually work",
      pt: "Como funcionam de verdade os limites de velocidade das zonas escolares na South Australia",
      es: "Cómo funcionan realmente los límites de velocidad de las zonas escolares en South Australia"
    },
    excerpt: {
      en: "South Australia runs two different school zone speed systems at once, a 25 km/h zone that applies whenever a child is present and a newer 40 km/h zone tied to fixed times. Here is exactly how each one works, plus how to read a road with no speed sign at all.",
      pt: "A South Australia opera dois sistemas diferentes de zona escolar ao mesmo tempo, uma zona de 25 km/h que vale sempre que há uma criança presente e uma zona mais nova de 40 km/h ligada a horários fixos. Veja exatamente como cada uma funciona, além de como interpretar uma via sem nenhuma placa de velocidade.",
      es: "South Australia opera dos sistemas distintos de zona escolar al mismo tiempo, una zona de 25 km/h que se aplica siempre que hay un niño presente y una zona más nueva de 40 km/h ligada a horarios fijos. Aquí está exactamente cómo funciona cada una, además de cómo interpretar una vía sin ninguna señal de velocidad."
    },
    sourceLabel: {
      en: "My Licence South Australia, School safety",
      pt: "My Licence South Australia, School safety",
      es: "My Licence South Australia, School safety"
    },
    sourceUrl: "https://mylicence.sa.gov.au/safe-driving-tips/school_safety",
    body: [
      {
        type: "paragraph",
        text: {
          en: "South Australia runs its school zones differently to most of the country. Instead of one single 40 km/h time window like New South Wales or Queensland, South Australia layers two separate rules on top of each other: a 25 km/h limit that applies whenever a child is actually present, at any hour of any day, and a newer 40 km/h limit tied to a fixed morning and afternoon window that the state started rolling out from 29 September 2025. Getting these two systems, and the general speed limits that apply everywhere else, wrong is an easy way for a newcomer to pick up a fine in the first few months of driving here. This post goes deep on exactly how South Australia's speed limits and school zones work, based on the official Driver's Handbook and the Department for Infrastructure and Transport's own project pages.",
          pt: "A South Australia lida com zonas escolares de um jeito diferente do resto do país. Em vez de uma única janela de horário de 40 km/h como em New South Wales ou Queensland, a South Australia sobrepõe duas regras separadas: um limite de 25 km/h que vale sempre que uma criança está realmente presente, em qualquer hora de qualquer dia, e um limite mais novo de 40 km/h ligado a uma janela fixa de manhã e de tarde, que o estado começou a implantar a partir de 29 de setembro de 2025. Confundir esses dois sistemas, e os limites de velocidade gerais que valem no resto das vias, é um jeito fácil de quem chegou agora levar uma multa nos primeiros meses dirigindo por aqui. Este post entra a fundo em como funcionam de fato os limites de velocidade e as zonas escolares da South Australia, com base no Driver's Handbook oficial e nas próprias páginas de projeto do Department for Infrastructure and Transport.",
          es: "South Australia maneja las zonas escolares de forma distinta al resto del país. En vez de una sola ventana horaria de 40 km/h como en New South Wales o Queensland, South Australia superpone dos reglas separadas: un límite de 25 km/h que se aplica siempre que hay un niño realmente presente, a cualquier hora de cualquier día, y un límite más nuevo de 40 km/h ligado a una ventana fija de mañana y de tarde, que el estado empezó a implementar desde el 29 de septiembre de 2025. Confundir estos dos sistemas, y los límites de velocidad generales que rigen en el resto de las vías, es una forma fácil de que alguien recién llegado se gane una multa en los primeros meses manejando aquí. Este artículo entra a fondo en cómo funcionan realmente los límites de velocidad y las zonas escolares de South Australia, basado en el Driver's Handbook oficial y en las propias páginas de proyecto del Department for Infrastructure and Transport."
        }
      },
      {
        type: "heading",
        text: {
          en: "Default speed limits by road type",
          pt: "Limites de velocidade padrão por tipo de via",
          es: "Límites de velocidad por defecto según el tipo de vía"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Built-up area (the default in suburbs and towns): 50 km/h, for every licence type, learner, provisional or full, unless a sign says otherwise.",
            pt: "Área urbanizada (o padrão em bairros e cidades): 50 km/h, para qualquer tipo de carteira, learner, provisional ou definitiva, a não ser que uma placa diga outra coisa.",
            es: "Área urbanizada (lo habitual en barrios y ciudades): 50 km/h, para cualquier tipo de licencia, learner, provisional o plena, salvo que una señal indique otra cosa."
          },
          {
            en: "Outside a built-up area (the open road): 100 km/h by default. Some open roads are signed up to 110 km/h, but that higher limit is for full licence holders only. Learner and P1/P2 provisional drivers must stay at 100 km/h even where a sign allows 110 km/h.",
            pt: "Fora de área urbanizada (estrada aberta): 100 km/h por padrão. Algumas estradas abertas têm sinalização de até 110 km/h, mas esse limite maior vale só pra quem tem carteira definitiva. Motoristas learner e provisórios P1/P2 precisam ficar em 100 km/h mesmo onde a placa permite 110 km/h.",
            es: "Fuera de un área urbanizada (camino abierto): 100 km/h por defecto. Algunos caminos abiertos tienen señalización de hasta 110 km/h, pero ese límite mayor es solo para quienes tienen licencia plena. Los conductores learner y provisionales P1/P2 deben mantenerse en 100 km/h incluso donde la señal permite 110 km/h."
          },
          {
            en: "Some built-up roads are signed higher than the 50 km/h default, commonly 60 or 80 km/h on busier roads. Heavy vehicles with a GVM (gross vehicle mass) over 12 tonnes, or buses over 5 tonnes, are capped at 100 km/h even on a road signed for 110 km/h, and most road trains are limited to 90 km/h.",
            pt: "Algumas vias urbanizadas têm sinalização acima do padrão de 50 km/h, geralmente 60 ou 80 km/h em vias mais movimentadas. Veículos pesados com GVM (peso bruto do veículo) acima de 12 toneladas, ou ônibus acima de 5 toneladas, ficam limitados a 100 km/h mesmo numa via sinalizada a 110 km/h, e a maioria dos road trains fica limitada a 90 km/h.",
            es: "Algunas vías urbanizadas tienen señalización por encima del límite estándar de 50 km/h, generalmente 60 u 80 km/h en vías más transitadas. Los vehículos pesados con GVM (masa bruta del vehículo) superior a 12 toneladas, o buses de más de 5 toneladas, quedan limitados a 100 km/h incluso en una vía señalizada a 110 km/h, y la mayoría de los road trains queda limitada a 90 km/h."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Working out the limit on a road with no sign",
          pt: "Como descobrir o limite numa via sem placa nenhuma",
          es: "Cómo calcular el límite en una vía sin ninguna señal"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "On a road that has no speed sign at all, South Australia's road rules do not leave the limit to guesswork. Under the Australian Road Rules, a length of road counts as a built-up area, and defaults to 50 km/h, if it has buildings spaced no more than 100 metres apart along the road, or street lights spaced no more than 100 metres apart, for at least 500 metres, or for the whole road if it is shorter than that. In practice, if you are driving between houses or shops close together, or under a continuous run of street lighting, treat the limit as 50 km/h. Once those buildings or lights thin out or disappear for a real stretch of road, you have left the built-up area and the default becomes 100 km/h.",
          pt: "Numa via que não tem nenhuma placa de velocidade, as regras de trânsito da South Australia não deixam o limite no chute. Pelas Australian Road Rules, um trecho de via conta como área urbanizada, e cai no padrão de 50 km/h, se tiver construções espaçadas no máximo 100 metros umas das outras ao longo da via, ou postes de iluminação espaçados no máximo 100 metros, por pelo menos 500 metros, ou pela via inteira se ela for mais curta que isso. Na prática, se você está dirigindo entre casas ou lojas próximas umas das outras, ou sob uma sequência contínua de iluminação pública, trate o limite como 50 km/h. Quando essas construções ou postes ficam mais espaçados ou somem por um trecho real de via, você saiu da área urbanizada e o padrão passa a ser 100 km/h.",
          es: "En una vía que no tiene ninguna señal de velocidad, las reglas de tránsito de South Australia no dejan el límite al azar. Según las Australian Road Rules, un tramo de vía cuenta como área urbanizada, y cae en el límite por defecto de 50 km/h, si tiene construcciones separadas por no más de 100 metros entre sí a lo largo de la vía, o postes de alumbrado separados por no más de 100 metros, durante al menos 500 metros, o durante toda la vía si esta es más corta que eso. En la práctica, si estás manejando entre casas o negocios cercanos entre sí, o bajo una secuencia continua de alumbrado público, trata el límite como 50 km/h. Cuando esas construcciones o postes se espacian más o desaparecen por un tramo real de vía, saliste del área urbanizada y el límite por defecto pasa a ser 100 km/h."
        }
      },
      {
        type: "heading",
        text: {
          en: "Two school zone systems, not one",
          pt: "Duas zonas escolares, não uma só",
          es: "Dos sistemas de zona escolar, no uno solo"
        }
      },
      {
        type: "paragraph",
        text: {
          en: 'South Australia has run a 25 km/h "when children present" school zone system for years, and it has not gone away. Since 29 September 2025, the state has been adding a second, separate 40 km/h time based school speed limit on busier roads near schools that previously carried a limit of 50 km/h or more. The Department for Infrastructure and Transport is explicit that the new 40 km/h limit does not replace the 25 km/h zones. Both can apply on the same stretch of road, and they are triggered differently, so it is worth understanding each one on its own.',
          pt: 'A South Australia já opera há anos um sistema de zona escolar de 25 km/h "quando há crianças presentes", e ele continua valendo. Desde 29 de setembro de 2025, o estado vem acrescentando um segundo sistema, separado, de limite de velocidade escolar de 40 km/h por horário, em vias mais movimentadas perto de escolas que antes tinham limite de 50 km/h ou mais. O Department for Infrastructure and Transport deixa claro que o novo limite de 40 km/h não substitui as zonas de 25 km/h. Os dois podem valer no mesmo trecho de via, e são acionados de formas diferentes, então vale a pena entender cada um separadamente.',
          es: 'South Australia lleva años operando un sistema de zona escolar de 25 km/h "cuando hay niños presentes", y ese sistema sigue vigente. Desde el 29 de septiembre de 2025, el estado viene sumando un segundo sistema, separado, de límite de velocidad escolar de 40 km/h por horario, en vías más transitadas cerca de escuelas que antes tenían un límite de 50 km/h o más. El Department for Infrastructure and Transport aclara que el nuevo límite de 40 km/h no reemplaza las zonas de 25 km/h. Los dos pueden aplicar en el mismo tramo de vía, y se activan de formas distintas, así que vale la pena entender cada uno por separado.'
        }
      },
      {
        type: "list",
        items: [
          {
            en: "The 25 km/h limit applies whenever a child is actually on the road, footpath, median strip or riding a bike within a signed school zone, marked by a school zone sign at the start and an end of school zone sign at the finish, with zigzag lines painted on the road where practical.",
            pt: "O limite de 25 km/h vale sempre que uma criança está de fato na via, na calçada, no canteiro central ou andando de bicicleta dentro de uma zona escolar sinalizada, marcada por uma placa de início de zona escolar e uma placa de fim de zona escolar, com linhas em ziguezague pintadas na via onde for viável.",
            es: "El límite de 25 km/h se aplica siempre que un niño está realmente en la vía, en la vereda, en el separador central o andando en bicicleta dentro de una zona escolar señalizada, marcada por una señal de inicio de zona escolar y una señal de fin de zona escolar, con líneas en zigzag pintadas en la vía donde sea viable."
          },
          {
            en: "It applies at any time a child is present, including outside school hours, on weekends and during school holidays. A child, for this rule, is anyone under 18, or a student of any age wearing a school uniform.",
            pt: "Ele vale a qualquer hora em que uma criança esteja presente, incluindo fora do horário escolar, aos fins de semana e durante as férias escolares. Uma criança, pra efeito dessa regra, é qualquer pessoa com menos de 18 anos, ou um estudante de qualquer idade usando uniforme escolar.",
            es: "Se aplica a cualquier hora en que un niño esté presente, incluso fuera del horario escolar, los fines de semana y durante las vacaciones escolares. Un niño, para efectos de esta regla, es cualquier persona menor de 18 años, o un estudiante de cualquier edad que use uniforme escolar."
          },
          {
            en: "The same 25 km/h applies when you pass a stopped school bus picking up or dropping off children, in either direction, and when you go through a children's crossing, sometimes called a koala crossing, while its lights are flashing.",
            pt: "O mesmo 25 km/h vale quando você passa por um ônibus escolar parado embarcando ou desembarcando crianças, nos dois sentidos, e quando você atravessa uma faixa de pedestre infantil, às vezes chamada de koala crossing, com as luzes piscando.",
            es: "El mismo 25 km/h aplica cuando pasas junto a un bus escolar detenido subiendo o bajando niños, en ambos sentidos, y cuando cruzas un paso de peatones infantil, a veces llamado koala crossing, con las luces intermitentes encendidas."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "The new 40 km/h time based limit",
          pt: "O novo limite de 40 km/h por horário",
          es: "El nuevo límite de 40 km/h por horario"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "The new 40 km/h limit only applies on school days, from 8:00 am to 9:30 am and from 2:00 pm to 4:00 pm, matching drop off and pick up times. It does not apply on weekends, public holidays or school holidays, and school days themselves are set by the Department for Education's own term dates. Signage tells you both when you are approaching one of these zones and exactly where the 40 km/h limit starts, and at some sites those signs are electronic with flashing lights. Installation began in November 2025 and is being rolled out school by school, with roughly 150 sites expected to have the new signs by the end of 2026, so the limit is only enforceable at a given school once its signs are actually in place there.",
          pt: "O novo limite de 40 km/h vale só em dias letivos, das 8h às 9h30 e das 14h às 16h, coincidindo com os horários de entrada e saída. Ele não vale nos fins de semana, feriados ou férias escolares, e os próprios dias letivos são definidos pelo calendário do Department for Education. A sinalização avisa tanto quando você está se aproximando de uma dessas zonas quanto exatamente onde o limite de 40 km/h começa, e em alguns locais essas placas são eletrônicas, com luzes piscando. A instalação começou em novembro de 2025 e está sendo feita escola por escola, com cerca de 150 locais previstos pra ter a nova sinalização até o fim de 2026, então o limite só pode ser fiscalizado numa escola específica depois que a placa de fato estiver instalada ali.",
          es: "El nuevo límite de 40 km/h aplica solo en días de clases, de 8:00 a 9:30 am y de 2:00 a 4:00 pm, coincidiendo con los horarios de entrada y salida. No aplica los fines de semana, feriados ni vacaciones escolares, y los propios días de clases están definidos por el calendario oficial del Department for Education. La señalización avisa tanto cuando te estás acercando a una de estas zonas como exactamente dónde empieza el límite de 40 km/h, y en algunos sitios esas señales son electrónicas, con luces intermitentes. La instalación empezó en noviembre de 2025 y se está haciendo escuela por escuela, con cerca de 150 sitios que tendrán la nueva señalización para fines de 2026, así que el límite solo se puede fiscalizar en una escuela específica una vez que la señal esté realmente instalada ahí."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "If you are on a road with the new 40 km/h signs active for the time window, but you also see a child on the road, footpath or median strip, the lower 25 km/h limit takes over. Treat 40 km/h as the ceiling during those hours, not a fixed speed to cruise at.",
            pt: "Se você está numa via com os novos sinais de 40 km/h ativos naquele horário, mas também vê uma criança na via, na calçada ou no canteiro central, o limite mais baixo de 25 km/h passa a valer. Trate o 40 km/h como um teto durante esse horário, não como uma velocidade fixa pra manter.",
            es: "Si estás en una vía con las nuevas señales de 40 km/h activas durante esa franja horaria, pero además ves a un niño en la vía, en la vereda o en el separador central, pasa a regir el límite más bajo de 25 km/h. Trata el 40 km/h como un techo durante ese horario, no como una velocidad fija para mantener."
          },
          {
            en: "Outside the 8:00 to 9:30 am and 2:00 to 4:00 pm windows, and on non school days, the 40 km/h signs stop applying and the road's normal posted limit takes back over, commonly 50 km/h or higher on the busier roads these zones are installed on.",
            pt: "Fora das janelas das 8h às 9h30 e das 14h às 16h, e em dias que não são letivos, os sinais de 40 km/h deixam de valer e volta a valer o limite normal sinalizado da via, geralmente 50 km/h ou mais nas vias mais movimentadas onde essas zonas são instaladas.",
            es: "Fuera de las franjas de 8:00 a 9:30 am y de 2:00 a 4:00 pm, y en días que no son de clases, las señales de 40 km/h dejan de aplicar y vuelve a regir el límite normal señalizado de la vía, generalmente 50 km/h o más en las vías más transitadas donde se instalan estas zonas."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Enforcement: what a newcomer should know",
          pt: "Fiscalização: o que quem chegou de fora precisa saber",
          es: "Fiscalización: lo que alguien recién llegado necesita saber"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "The 40 km/h zones are built to be camera enforced. Once a site's signs are installed, fixed or upgraded speed cameras there switch automatically to enforcing 40 km/h during the school time windows, then revert to enforcing the road's normal limit the rest of the time. Fixed cameras use sensors built into each lane, while mobile camera vehicles use radar, and either can trigger a photo and a fine the moment they detect a vehicle over the limit that applies at that moment. This means the same stretch of road can be legitimately fined at two different thresholds depending on the exact time of day, which catches out a lot of newcomers who assume a road's speed limit is fixed.",
          pt: "As zonas de 40 km/h são feitas pra funcionar com câmeras. Assim que a sinalização de um local é instalada, as câmeras de velocidade fixas ou atualizadas ali passam a fiscalizar automaticamente o limite de 40 km/h durante os horários escolares, e voltam a fiscalizar o limite normal da via no resto do tempo. Câmeras fixas usam sensores embutidos em cada faixa, enquanto os carros de câmera móvel usam radar, e qualquer um dos dois pode disparar uma foto e uma multa no momento em que detectam um veículo acima do limite que vale naquele instante. Isso significa que o mesmo trecho de via pode ser multado legitimamente em dois limites diferentes, dependendo da hora exata do dia, o que pega muita gente que chegou agora de surpresa, por achar que o limite de uma via é sempre fixo.",
          es: "Las zonas de 40 km/h están pensadas para funcionar con cámaras. En cuanto la señalización de un sitio queda instalada, las cámaras de velocidad fijas o actualizadas ahí pasan a fiscalizar automáticamente el límite de 40 km/h durante los horarios escolares, y vuelven a fiscalizar el límite normal de la vía el resto del tiempo. Las cámaras fijas usan sensores integrados en cada carril, mientras que los vehículos de cámara móvil usan radar, y cualquiera de los dos puede disparar una foto y una multa en el momento en que detectan un vehículo por encima del límite que rige en ese instante. Esto significa que el mismo tramo de vía puede recibir multas legítimas con dos límites distintos, según la hora exacta del día, algo que sorprende a mucha gente recién llegada que asume que el límite de una vía siempre es fijo."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Whether a camera or an officer catches you, speeding in South Australia carries an expiation fee plus demerit points at every level. Go 10 km/h or more over the limit and learner or provisional drivers face disqualification on top of that, even though full licence holders do not at that level. Go 45 km/h or more over any limit, school zone or otherwise, and every driver faces immediate loss of licence regardless of what licence type they hold. Exact fee amounts change periodically, so check mylicence.sa.gov.au for the current figures rather than relying on an old number.",
          pt: "Seja flagrado por câmera ou por um policial, dirigir acima da velocidade na South Australia gera uma taxa de expiação mais pontos de demérito em qualquer nível. Passar 10 km/h ou mais do limite coloca learners e motoristas provisórios em risco de desqualificação além disso, embora quem tem carteira definitiva não entre nessa categoria nesse nível. Passar 45 km/h ou mais de qualquer limite, seja de zona escolar ou não, coloca qualquer motorista em risco de perda imediata da carteira, independentemente do tipo de carteira que a pessoa tenha. Os valores exatos das taxas mudam periodicamente, então confira em mylicence.sa.gov.au os valores atuais em vez de confiar num número antigo.",
          es: "Ya sea que te agarre una cámara o un oficial, exceder el límite de velocidad en South Australia genera una tarifa de expiación más puntos de demérito en cualquier nivel. Superar el límite por 10 km/h o más pone a los conductores learner y provisionales en riesgo de inhabilitación además de eso, aunque quienes tienen licencia plena no entran en esa categoría en ese nivel. Superar el límite por 45 km/h o más, sea en zona escolar o no, pone a cualquier conductor en riesgo de pérdida inmediata de la licencia, sin importar el tipo de licencia que tenga. Los montos exactos de las tarifas cambian periódicamente, así que revisa los valores actuales en mylicence.sa.gov.au en vez de confiar en un número antiguo."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This post covers what South Australia's official sources say about speed limits and school zones specifically, going deeper than our general newcomer guide to driving in the state. Since the 40 km/h rollout is still expanding through 2026, treat any specific school's signage as the final word if it differs from what is written here. Use KangaLearner's Learn section and SA practice questions to prepare for the parts of this that show up on the actual theory test.",
          pt: "Este post cobre o que as fontes oficiais da South Australia dizem especificamente sobre limites de velocidade e zonas escolares, indo mais fundo do que o nosso guia geral pra quem chega agora e vai dirigir no estado. Como a expansão do 40 km/h ainda está em andamento até 2026, trate a sinalização de uma escola específica como a palavra final se ela for diferente do que está escrito aqui. Use a seção Aprender e as perguntas de prática de SA do KangaLearner pra se preparar pras partes disso que caem na prova teórica de verdade.",
          es: "Este artículo cubre lo que dicen las fuentes oficiales de South Australia específicamente sobre límites de velocidad y zonas escolares, yendo más a fondo que nuestra guía general para quien recién llega y va a manejar en el estado. Como la expansión del 40 km/h todavía está en marcha hasta 2026, trata la señalización de una escuela específica como la palabra final si difiere de lo que está escrito aquí. Usa la sección Aprender y las preguntas de práctica de SA de KangaLearner para prepararte para las partes de esto que aparecen en el examen teórico real."
        }
      }
    ]
  },
  {
    slug: "sa-mobile-phones-driving-guide",
    icon: "safety",
    state: "SA",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "Mobile phones behind the wheel in South Australia: the rules by licence stage",
      pt: "Celular ao volante na South Australia: as regras por etapa da licença",
      es: "El celular al volante en South Australia: las reglas por etapa de licencia"
    },
    excerpt: {
      en: "Learners and P1 drivers face a total phone ban, P2 and full licence holders can use hands-free if it is mounted correctly. Here is exactly what South Australia's Driver's Handbook allows, from mounting rules to what counts as illegal use.",
      pt: "Learners e motoristas P1 enfrentam proibição total do celular, enquanto P2 e carteira definitiva podem usar hands-free se estiver bem fixado no suporte. Veja exatamente o que o Driver's Handbook da South Australia permite, das regras de suporte ao que conta como uso ilegal.",
      es: "Los learners y conductores P1 enfrentan una prohibición total del celular, mientras que P2 y licencia plena pueden usar hands-free si está bien fijado en el soporte. Esto es exactamente lo que permite el Driver's Handbook de South Australia, desde las reglas de soporte hasta qué cuenta como uso ilegal."
    },
    sourceLabel: {
      en: "My Licence South Australia, The Driver's Handbook, Mobile Phones While Driving",
      pt: "My Licence South Australia, The Driver's Handbook, Mobile Phones While Driving",
      es: "My Licence South Australia, The Driver's Handbook, Mobile Phones While Driving"
    },
    sourceUrl:
      "https://mylicence.sa.gov.au/roadrules/the-drivers-handbook/mobile_phones_while_driving",
    body: [
      {
        type: "paragraph",
        text: {
          en: "South Australia runs mobile phone detection cameras across the state, and the actual rule behind them, Rule 300 of the Australian Road Rules, is far more specific than most newcomers expect. My Licence, the road safety site run by the Department for Infrastructure and Transport, sets it out in full in The Driver's Handbook. What surprises people most is how much the rule changes by licence stage: a learner or P1 driver faces a total ban on any phone function at all, while a P2 or full licence holder can use hands-free calls and a mounted GPS under specific conditions. This post goes deep on exactly what counts as illegal phone use, what mounting a phone properly means, and what other in-car technology the road rules treat differently from a mobile phone.",
          pt: "A South Australia opera câmeras de detecção de celular em todo o estado, e a regra por trás delas, a Rule 300 das Australian Road Rules, é bem mais específica do que a maioria de quem chega de fora imagina. O My Licence, o site oficial de segurança no trânsito administrado pelo Department for Infrastructure and Transport, detalha tudo isso no The Driver's Handbook. O que mais surpreende é o quanto a regra muda conforme a etapa da licença: um motorista learner ou P1 enfrenta proibição total de qualquer função do celular, enquanto um motorista P2 ou com carteira definitiva pode fazer chamadas em modo hands-free e usar GPS fixado no suporte, sob condições específicas. Este post vai fundo exatamente no que conta como uso ilegal do celular, no que significa fixar o celular corretamente no suporte, e em quais outras tecnologias dentro do carro as regras de trânsito tratam de forma diferente de um celular.",
          es: "South Australia opera cámaras de detección de celular en todo el estado, y la regla detrás de ellas, la Rule 300 de las Australian Road Rules, es mucho más específica de lo que la mayoría de los recién llegados imagina. My Licence, el sitio oficial de seguridad vial administrado por el Department for Infrastructure and Transport, lo detalla por completo en The Driver's Handbook. Lo que más sorprende es cuánto cambia la regla según la etapa de la licencia: un conductor learner o P1 enfrenta una prohibición total de cualquier función del celular, mientras que un conductor P2 o con licencia plena puede hacer llamadas en modo hands-free y usar GPS fijado en el soporte, bajo condiciones específicas. Este artículo profundiza exactamente en qué cuenta como uso ilegal del celular, qué significa fijar el celular correctamente en el soporte, y qué otras tecnologías dentro del auto las reglas de tránsito tratan de forma distinta a un celular."
        }
      },
      {
        type: "heading",
        text: {
          en: "What counts as using a phone under the law",
          pt: "O que conta como usar o celular segundo a lei",
          es: "Qué cuenta como usar el celular según la ley"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Rule 300 defines using a phone broadly. It covers touching the phone to enter or place anything into it, such as typing a text, sending or looking at anything on the screen, turning the phone on or off, and operating any other function. You must not use a hand-held phone at all while your vehicle is moving, and this includes while stationary in traffic, such as at a red light or queued in traffic. The one moment this does not apply is once your vehicle is genuinely parked. Under the Australian Road Rules, a vehicle can count as parked even with the key in the ignition or the engine running, but being stopped at lights or in a traffic queue does not count as parked.",
          pt: "A Rule 300 define o uso do celular de forma bem ampla. Ela cobre tocar no celular pra digitar ou colocar qualquer coisa nele, como escrever uma mensagem, enviar ou olhar qualquer coisa na tela, ligar ou desligar o aparelho, e operar qualquer outra função. Você não pode usar um celular na mão de jeito nenhum enquanto o veículo está em movimento, e isso inclui enquanto está parado no trânsito, como num semáforo vermelho ou numa fila de carros. O único momento em que isso não se aplica é quando o veículo está de fato estacionado. Segundo as Australian Road Rules, um veículo pode contar como estacionado mesmo com a chave na ignição ou o motor ligado, mas estar parado num semáforo ou numa fila de trânsito não conta como estacionado.",
          es: "La Rule 300 define el uso del celular de forma bastante amplia. Cubre tocar el celular para escribir o poner cualquier cosa en él, como redactar un mensaje, enviar o mirar cualquier cosa en la pantalla, encender o apagar el aparato, y operar cualquier otra función. No puedes usar un celular de mano en absoluto mientras el vehículo está en movimiento, y esto incluye mientras está detenido en el tránsito, como en un semáforo en rojo o en una fila de autos. El único momento en que esto no aplica es cuando el vehículo está realmente estacionado. Según las Australian Road Rules, un vehículo puede contar como estacionado incluso con la llave puesta o el motor encendido, pero estar detenido en un semáforo o en una fila de tránsito no cuenta como estacionado."
        }
      },
      {
        type: "heading",
        text: {
          en: "Learner's permit and P1: a complete ban",
          pt: "Learner's permit e P1: proibição total",
          es: "Learner's permit y P1: prohibición total"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "If you hold a learner's permit or a P1 provisional licence, you are banned from using any function of a mobile phone while driving, full stop. The ban explicitly covers hands-free mode, including Bluetooth, loudspeaker operation, the GPS function, and text messaging, even with the phone mounted.",
            pt: "Se você tem learner's permit ou licença provisória P1, está proibido de usar qualquer função do celular enquanto dirige, sem exceção. A proibição cobre explicitamente o modo hands-free, incluindo Bluetooth, uso de viva-voz, a função de GPS, e o envio de mensagens de texto, mesmo com o celular fixado no suporte.",
            es: "Si tienes learner's permit o licencia provisional P1, tienes prohibido usar cualquier función del celular mientras conduces, sin excepción. La prohibición cubre explícitamente el modo hands-free, incluido Bluetooth, el uso de altavoz, la función de GPS, y el envío de mensajes de texto, incluso con el celular fijado en el soporte."
          },
          {
            en: "The only time a learner or P1 driver may touch or use a phone at all is once the car is safely parked, not stopped in traffic or at traffic lights.",
            pt: "O único momento em que um motorista learner ou P1 pode tocar ou usar o celular é quando o carro está de fato estacionado com segurança, não parado no trânsito ou num semáforo.",
            es: "El único momento en que un conductor learner o P1 puede tocar o usar el celular es cuando el auto está realmente estacionado de forma segura, no detenido en el tránsito o en un semáforo."
          },
          {
            en: "One exception applies even to learners and P1 drivers: while the vehicle is stationary in a road related area, such as a car park or drive through, the phone can be used to pay for goods or services, to show a QR code or voucher, or to display a digital licence or other required identification.",
            pt: "Uma exceção vale até pra learners e motoristas P1: enquanto o veículo está parado numa área relacionada à via, como um estacionamento ou um drive through, o celular pode ser usado pra pagar por bens ou serviços, mostrar um código QR ou voucher, ou exibir a licença digital ou outro documento de identificação exigido.",
            es: "Una excepción aplica incluso a learners y conductores P1: mientras el vehículo está detenido en un área relacionada con la vía, como un estacionamiento o un drive through, el celular se puede usar para pagar bienes o servicios, mostrar un código QR o cupón, o mostrar la licencia digital u otro documento de identificación exigido."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "P2 and full licence: what hands-free actually means",
          pt: "P2 e carteira definitiva: o que hands-free realmente significa",
          es: "P2 y licencia plena: qué significa realmente hands-free"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Once you reach P2, the rules match those for a full licence holder. You can make or receive an audio call if the phone is secured in a mount commercially designed and manufactured for that purpose, or if you use it hands-free through Bluetooth, a headset or earphones without touching, holding or resting the phone on any part of your body, including your lap. The phone itself can then sit anywhere in the vehicle, including your pocket, and you are allowed to touch the earpiece or headphone to operate it. What stays illegal at every licence stage, mounted or not, is creating, sending or looking at a text, video message or email, and making or receiving a video call. Police and emergency vehicle drivers are exempt from the phone rule while on duty.",
          pt: "Ao chegar no P2, as regras passam a ser as mesmas de quem tem carteira definitiva. Você pode fazer ou receber uma chamada de voz se o celular estiver fixado num suporte comercialmente projetado e fabricado pra essa finalidade, ou se usar em modo hands-free por Bluetooth, fone de ouvido ou headset, sem tocar, segurar ou apoiar o celular em qualquer parte do corpo, incluindo o colo. Nesse caso, o celular pode ficar em qualquer lugar do veículo, incluindo o bolso, e você pode tocar no fone ou no headset pra operá-lo. O que continua ilegal em toda e qualquer etapa da licença, fixado no suporte ou não, é criar, enviar ou olhar uma mensagem de texto, vídeo ou email, e fazer ou receber uma videochamada. Motoristas da polícia ou de veículos de emergência ficam isentos da regra do celular enquanto em serviço.",
          es: "Al llegar a P2, las reglas pasan a ser las mismas que las de licencia plena. Puedes hacer o recibir una llamada de voz si el celular está fijado en un soporte diseñado y fabricado comercialmente para ese fin, o si lo usas en modo hands-free por Bluetooth, audífonos o auriculares, sin tocar, sostener o apoyar el celular en ninguna parte del cuerpo, incluido el regazo. En ese caso, el celular puede estar en cualquier lugar del vehículo, incluido el bolsillo, y puedes tocar el auricular o el audífono para operarlo. Lo que sigue siendo ilegal en cualquier etapa de la licencia, fijado en el soporte o no, es crear, enviar o mirar un mensaje de texto, video o correo electrónico, y hacer o recibir una videollamada. Los conductores de policía o de vehículos de emergencia están exentos de la regla del celular mientras están en servicio."
        }
      },
      {
        type: "heading",
        text: {
          en: "Mounting your phone, and using it as a GPS",
          pt: "Fixando o celular no suporte, e usando como GPS",
          es: "Fijando el celular en el soporte, y usándolo como GPS"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "A mount has to be commercially designed and manufactured for holding a phone in a vehicle, propping it in a cup holder or on the seat next to you does not qualify. If you want to use your phone's GPS function while driving, it must be fixed in that kind of mount and you must not touch it once you are underway. Set your destination before you start driving, and if you need to change it, pull over and park first rather than adjusting it while moving. This GPS allowance only applies to P2 and full licence holders. Learner's permit and P1 drivers cannot use a phone as a GPS at all, mounted or not.",
          pt: "Um suporte precisa ser comercialmente projetado e fabricado pra segurar o celular dentro do veículo, apoiar o aparelho no porta-copos ou no banco do lado não conta. Se você quiser usar a função de GPS do celular enquanto dirige, ele precisa estar fixado nesse tipo de suporte e você não pode tocar nele depois que começar a andar. Defina o destino antes de começar a dirigir, e se precisar mudar, pare o carro num lugar seguro antes de mexer, em vez de ajustar em movimento. Essa permissão de GPS vale só pra P2 e carteira definitiva. Motoristas learner e P1 não podem usar o celular como GPS de jeito nenhum, fixado no suporte ou não.",
          es: "Un soporte tiene que estar diseñado y fabricado comercialmente para sostener el celular dentro del vehículo, apoyarlo en el portavasos o en el asiento de al lado no cuenta. Si quieres usar la función de GPS del celular mientras conduces, tiene que estar fijado en ese tipo de soporte y no puedes tocarlo una vez que empezaste a andar. Define el destino antes de empezar a conducir, y si necesitas cambiarlo, detente y estaciona primero en vez de ajustarlo en movimiento. Este permiso de GPS aplica solo a P2 y licencia plena. Los conductores learner y P1 no pueden usar el celular como GPS en absoluto, fijado en el soporte o no."
        }
      },
      {
        type: "heading",
        text: {
          en: "Other in-car technology: what is treated differently from a phone",
          pt: "Outras tecnologias no carro: o que é tratado diferente do celular",
          es: "Otras tecnologías en el auto: qué se trata diferente del celular"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "The phone rule does not apply to a driver's aid built into the vehicle itself. The Driver's Handbook lists vehicle system equipment, a dispatch system, a ticket issuing machine, a built in navigational system, a rear view screen, and a closed circuit security camera as examples. In practice, this means a car's own built in sat nav or reversing camera display is not restricted the way a mobile phone is, since the mobile phone rule specifically targets phones, not the vehicle's own systems. The distinction matters for a newcomer buying a first car in SA: a factory fitted navigation screen is not treated the same as propping up a phone.",
          pt: "A regra do celular não se aplica a um recurso de apoio ao motorista embutido no próprio veículo. O Driver's Handbook lista como exemplos o equipamento do sistema do veículo, um sistema de despacho, uma máquina emissora de bilhetes, um sistema de navegação embutido, uma tela de câmera de ré, e uma câmera de segurança de circuito fechado. Na prática, isso significa que o GPS embutido de fábrica ou a tela da câmera de ré do carro não são restritos da mesma forma que um celular, já que a regra do celular mira especificamente o aparelho, não os sistemas próprios do veículo. Essa diferença importa pra quem chegou de fora e está comprando o primeiro carro na SA: uma tela de navegação de fábrica não é tratada da mesma forma que apoiar um celular.",
          es: "La regla del celular no se aplica a una ayuda para el conductor incorporada en el propio vehículo. The Driver's Handbook menciona como ejemplos el equipo del sistema del vehículo, un sistema de despacho, una máquina expendedora de boletos, un sistema de navegación incorporado, una pantalla de cámara de reversa, y una cámara de seguridad de circuito cerrado. En la práctica, esto significa que el GPS de fábrica o la pantalla de la cámara de reversa del auto no están restringidos de la misma forma que un celular, ya que la regla del celular apunta específicamente al aparato, no a los sistemas propios del vehículo. Esta diferencia importa para quien recién llega y está comprando su primer auto en SA: una pantalla de navegación de fábrica no se trata igual que apoyar un celular."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Using a mobile phone while driving increases the risk of a crash where someone is injured by up to four times, and texting increases that risk even further, according to My Licence's own research summary. Demerit points add up fast on a learner's permit or provisional licence: reaching 4 or more can lead to disqualification, compared with 12 or more for a full licence, so a single phone offence goes a lot further toward losing your P plates than it does for an experienced driver. Mobile phone detection cameras now operate across South Australia to enforce all of this. Use KangaLearner's Learn section and SA practice questions to make sure you know these rules cold before you sit the test.",
          pt: "Usar o celular ao dirigir aumenta em até quatro vezes o risco de um acidente com alguém ferido, e mandar mensagem de texto aumenta esse risco ainda mais, segundo o próprio resumo de pesquisas do My Licence. Os pontos de demérito se acumulam rápido pra quem tem learner's permit ou licença provisória: chegar a 4 pontos ou mais pode levar à perda da licença, contra 12 ou mais pra quem tem carteira definitiva, então uma única infração de celular pesa muito mais pra um motorista P do que pra um motorista experiente. Câmeras de detecção de celular já operam em toda a South Australia pra fiscalizar tudo isso. Use a seção Aprender e as perguntas de prática de SA do KangaLearner pra ter certeza de que você conhece essas regras de cor antes de fazer a prova.",
          es: "Usar el celular mientras se conduce aumenta hasta cuatro veces el riesgo de un choque con alguien lesionado, y escribir mensajes de texto aumenta ese riesgo todavía más, según el propio resumen de investigaciones de My Licence. Los puntos de demérito se acumulan rápido para quien tiene learner's permit o licencia provisional: llegar a 4 puntos o más puede llevar a perder la licencia, frente a 12 o más para quien tiene licencia plena, así que una sola infracción de celular pesa mucho más para un conductor P que para uno con experiencia. Cámaras de detección de celular ya operan en toda South Australia para fiscalizar todo esto. Usa la sección Aprender y las preguntas de práctica de SA de KangaLearner para asegurarte de que conoces estas reglas de memoria antes de presentar el examen."
        }
      }
    ]
  },
  {
    slug: "sa-alcohol-drug-driving-guide",
    icon: "safety",
    state: "SA",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 8,
    title: {
      en: "Alcohol and drug driving in South Australia: the rules, explained",
      pt: "Álcool e drogas ao volante na South Australia: as regras, explicadas",
      es: "Alcohol y drogas al volante en South Australia: las reglas, explicadas"
    },
    excerpt: {
      en: "Blood alcohol limits are not the same for every driver in South Australia. A deep dive into BAC by licence class, how roadside drug testing actually works, and what happens if you are caught.",
      pt: "O limite de álcool no sangue não é igual pra todo motorista na South Australia. Um mergulho fundo no BAC por categoria de licença, em como o teste de drogas na via funciona de verdade, e no que acontece se você for pego.",
      es: "El límite de alcohol en sangre no es igual para todos los conductores en South Australia. Una inmersión profunda en el BAC por categoría de licencia, en cómo funciona de verdad la prueba de drogas en la vía, y en qué pasa si te agarran."
    },
    sourceLabel: {
      en: "My Licence South Australia, The Driver's Handbook: Alcohol, Drugs, Medicines and Driving",
      pt: "My Licence South Australia, The Driver's Handbook: Alcohol, Drugs, Medicines and Driving",
      es: "My Licence South Australia, The Driver's Handbook: Alcohol, Drugs, Medicines and Driving"
    },
    sourceUrl: "https://www.mylicence.sa.gov.au/road-rules/the-drivers-handbook/alcohol-drugs",
    body: [
      {
        type: "paragraph",
        text: {
          en: "This post goes deep on one specific part of South Australia's driving rules: alcohol and drugs. It is not a repeat of a general newcomer guide, this is the detail behind the single line most guides give you, blood alcohol limits by licence type, how roadside testing actually works, what happens if you are caught, and the mandatory alcohol interlock scheme. Everything below comes from My Licence, the road safety website run by South Australia's Department for Infrastructure and Transport, and from the state government's own pages on driving offences and disqualification. This is general information to help you understand the system, not legal advice, if you are actually facing a charge, get advice from a lawyer.",
          pt: "Este post mergulha fundo numa parte específica das regras de trânsito da South Australia: álcool e drogas. Não é a repetição de um guia geral pra quem chega de fora, aqui está o detalhe por trás da linha única que a maioria dos guias te dá: limites de álcool no sangue por tipo de licença, como a fiscalização na via funciona de verdade, o que acontece se você for pego, e o esquema obrigatório de bloqueio alcoólico (alcohol interlock). Tudo abaixo vem do My Licence, o site de segurança no trânsito mantido pelo Department for Infrastructure and Transport da South Australia, e das próprias páginas do governo estadual sobre infrações e inabilitação. Isso é informação geral pra te ajudar a entender o sistema, não é aconselhamento jurídico, se você está realmente respondendo a uma acusação, procure um advogado.",
          es: "Este artículo se sumerge a fondo en una parte específica de las reglas de tránsito de South Australia: alcohol y drogas. No es la repetición de una guía general para quien recién llega, aquí está el detalle detrás de la única línea que la mayoría de las guías te da: límites de alcohol en sangre según el tipo de licencia, cómo funciona de verdad la fiscalización en la vía, qué pasa si te agarran, y el esquema obligatorio de bloqueo por alcohol (alcohol interlock). Todo lo que sigue viene de My Licence, el sitio de seguridad vial que mantiene el Department for Infrastructure and Transport de South Australia, y de las propias páginas del gobierno estatal sobre infracciones e inhabilitación. Esto es información general para ayudarte a entender el sistema, no es asesoría legal, si de verdad estás enfrentando un cargo, busca a un abogado."
        }
      },
      {
        type: "heading",
        text: {
          en: "Blood alcohol limits depend on your licence, not just your age",
          pt: "O limite de álcool no sangue depende da sua licença, não só da sua idade",
          es: "El límite de alcohol en sangre depende de tu licencia, no solo de tu edad"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Zero BAC (no alcohol at all): learner permit holders, P1 and P2 provisional drivers, probationary licence holders, drivers of buses, taxis and heavy vehicles, drivers of vehicles carrying dangerous goods, and R-Date licensed riders (a power-restricted motorcycle licence).",
            pt: "BAC zero (nada de álcool): quem tem permissão de learner, motoristas provisórios P1 e P2, quem tem licença probationary, motoristas de ônibus, táxi e veículos pesados, motoristas de veículos que transportam cargas perigosas, e quem tem licença R-Date (uma licença de motocicleta com restrição de potência).",
            es: "BAC cero (nada de alcohol): titulares de permiso learner, conductores provisionales P1 y P2, titulares de licencia probationary, conductores de autobuses, taxis y vehículos pesados, conductores de vehículos que transportan mercancías peligrosas, y titulares de licencia R-Date (una licencia de motocicleta con restricción de potencia)."
          },
          {
            en: "Under 0.05 BAC (a small amount is allowed, but you must stay under the limit): unconditional, full licence holders, and this includes the qualified supervising driver sitting next to a learner. Their own BAC must stay under 0.05 even though they are supervising, not driving.",
            pt: "Abaixo de 0,05 de BAC (uma quantidade pequena é permitida, mas você precisa ficar abaixo do limite): motoristas com carteira definitiva e sem restrições (unconditional), e isso inclui o supervisor qualificado sentado ao lado de um learner. O BAC do próprio supervisor precisa ficar abaixo de 0,05, mesmo que ele esteja supervisionando e não dirigindo.",
            es: "Menos de 0,05 de BAC (se permite una cantidad pequeña, pero debes quedar por debajo del límite): titulares de licencia plena y sin restricciones (unconditional), y esto incluye al supervisor calificado sentado junto a un learner. El propio BAC del supervisor debe quedar por debajo de 0,05, aunque esté supervisando, no conduciendo."
          },
          {
            en: "The risk is not linear: South Australia's own road safety information shows the risk of being involved in a casualty crash doubles for every 0.05 increase above a zero BAC, which is part of why the learner and provisional limit is zero rather than a small allowance.",
            pt: "O risco não é linear: as próprias informações de segurança no trânsito da South Australia mostram que o risco de se envolver num acidente com vítimas dobra a cada aumento de 0,05 acima de BAC zero, o que ajuda a explicar por que o limite pra learners e provisórios é zero, e não uma pequena margem.",
            es: "El riesgo no es lineal: la propia información de seguridad vial de South Australia muestra que el riesgo de verse involucrado en un accidente con víctimas se duplica por cada aumento de 0,05 por encima de un BAC cero, lo que ayuda a explicar por qué el límite para learners y provisionales es cero, y no un pequeño margen."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Two separate offences: a fixed limit, and being too impaired to drive",
          pt: "Duas infrações diferentes: um limite fixo, e estar impossibilitado demais pra dirigir",
          es: "Dos infracciones distintas: un límite fijo, y estar demasiado afectado para conducir"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "South Australia's Road Traffic Act 1961 actually creates two different alcohol offences. The first is driving with the prescribed concentration of alcohol, or PCA, which is simply being over the BAC limit that applies to your licence. The second is driving under the influence, or DUI, a separate charge for being so affected by alcohol or drugs, prescribed or illicit, that you are incapable of exercising effective control of the vehicle. A DUI charge can apply even if your BAC comes in under 0.05, police can rely on how you were driving, the smell of alcohol, unsteadiness, bloodshot or watery eyes, and slurred speech. On top of both of these, refusing to comply with a police officer's direction to take a breath test or breath analysis is its own offence.",
          pt: "O Road Traffic Act 1961 da South Australia na verdade cria duas infrações de álcool diferentes. A primeira é dirigir com a concentração prescrita de álcool, ou PCA, que é simplesmente estar acima do limite de BAC que vale pra sua licença. A segunda é dirigir sob a influência, ou DUI, uma acusação separada por estar tão afetado pelo álcool ou por drogas, prescritas ou ilícitas, a ponto de ficar incapaz de manter controle efetivo do veículo. Uma acusação de DUI pode se aplicar mesmo que seu BAC fique abaixo de 0,05, a polícia pode se basear em como você estava dirigindo, no cheiro de álcool, na falta de firmeza, em olhos vermelhos ou lacrimejantes, e na fala arrastada. Além dessas duas, recusar cumprir a ordem de um policial pra fazer um teste de bafômetro ou uma análise de ar expirado também é uma infração à parte.",
          es: "El Road Traffic Act 1961 de South Australia en realidad crea dos infracciones de alcohol distintas. La primera es conducir con la concentración prescrita de alcohol, o PCA, que es simplemente estar por encima del límite de BAC que corresponde a tu licencia. La segunda es conducir bajo la influencia, o DUI, un cargo aparte por estar tan afectado por el alcohol o por drogas, recetadas o ilícitas, al punto de quedar incapaz de mantener el control efectivo del vehículo. Un cargo de DUI puede aplicarse incluso si tu BAC da menos de 0,05, la policía puede basarse en cómo estabas conduciendo, el olor a alcohol, la falta de firmeza, los ojos rojos o llorosos, y el habla arrastrada. Además de estas dos, negarte a cumplir la orden de un oficial de policía de hacerte un test de alcoholemia o un análisis de aire espirado también es una infracción aparte."
        }
      },
      {
        type: "heading",
        text: {
          en: "How random testing actually works",
          pt: "Como a fiscalização aleatória funciona de verdade",
          es: "Cómo funciona de verdad la fiscalización aleatoria"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Any police officer can stop any driver, at any time, anywhere in South Australia, and require a breath test, no prior suspicion or reason is needed. This applies to the person driving and, separately, to a passenger who is acting as the qualified supervising driver for a learner. If you have been drinking, the only thing that lowers your BAC is time, coffee, food, exercise and cold showers make no real difference, so a heavy night can still leave you over the limit well into the next morning.",
          pt: "Qualquer policial pode parar qualquer motorista, a qualquer hora, em qualquer lugar da South Australia, e exigir um teste de bafômetro, sem precisar de suspeita ou motivo prévio. Isso vale tanto pra quem está dirigindo quanto, separadamente, pro passageiro que está atuando como supervisor qualificado de um learner. Se você bebeu, a única coisa que reduz o seu BAC é o tempo, café, comida, exercício e banho frio não fazem diferença de verdade, então uma noite pesada ainda pode te deixar acima do limite até bem entrada a manhã seguinte.",
          es: "Cualquier policía puede detener a cualquier conductor, en cualquier momento, en cualquier lugar de South Australia, y exigir un test de alcoholemia, sin necesitar sospecha ni motivo previo. Esto aplica tanto a quien está manejando como, por separado, al pasajero que está actuando como supervisor calificado de un learner. Si bebiste, lo único que baja tu BAC es el tiempo, el café, la comida, el ejercicio y las duchas frías no hacen ninguna diferencia real, así que una noche pesada todavía puede dejarte por encima del límite hasta bien entrada la mañana siguiente."
        }
      },
      {
        type: "heading",
        text: {
          en: "If you are caught drink driving",
          pt: "Se você for pego dirigindo alcoolizado",
          es: "Si te agarran manejando alcoholizado"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "BAC between 0.08 and 0.149: police can take your licence on the spot, an immediate loss of licence for 6 months.",
            pt: "BAC entre 0,08 e 0,149: a polícia pode tirar sua licença na hora, uma perda imediata de licença por 6 meses.",
            es: "BAC entre 0,08 y 0,149: la policía puede quitarte la licencia en el acto, una pérdida inmediata de licencia por 6 meses."
          },
          {
            en: "BAC 0.15 or more: immediate loss of licence for 12 months.",
            pt: "BAC de 0,15 ou mais: perda imediata de licença por 12 meses.",
            es: "BAC de 0,15 o más: pérdida inmediata de licencia por 12 meses."
          },
          {
            en: "Driving, or attempting to put the vehicle in motion, while under the influence: immediate loss of licence for 12 months.",
            pt: "Dirigir, ou tentar colocar o veículo em movimento, sob a influência: perda imediata de licença por 12 meses.",
            es: "Conducir, o intentar poner el vehículo en movimiento, bajo la influencia: pérdida inmediata de licencia por 12 meses."
          },
          {
            en: "Refusing an alcohol test or breath analysis: immediate loss of licence for 6 months.",
            pt: "Recusar um teste de álcool ou uma análise de ar expirado: perda imediata de licença por 6 meses.",
            es: "Negarte a un test de alcohol o a un análisis de aire espirado: pérdida inmediata de licencia por 6 meses."
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "Lower readings go through a different process. If you hold a full licence and are caught with a BAC under 0.08, and you have no drink or drug driving offence in the last 5 years, you get an expiation notice with 4 demerit points if you pay it, or you can elect to have the matter heard in court, where a conviction can bring its own disqualification. If you do have a previous offence, Service SA sends you a drink driving disqualification notice by post instead, with the length set by how many such offences you have had within the last 3 years: 3 months for a second, 6 months for a third, 12 months for a fourth or later. There is no right of appeal against a drink driving disqualification. Whatever notice you get, you must personally acknowledge it and pay the fee within 28 days, at a Service SA centre or, for a first notice only, at an Australia Post outlet, or a higher fee applies and an officer will attempt to serve it on you in person.",
          pt: "Leituras mais baixas passam por um processo diferente. Se você tem carteira definitiva e for pego com BAC abaixo de 0,08, e não tiver nenhuma infração de álcool ou drogas nos últimos 5 anos, você recebe uma expiation notice com 4 pontos de demérito se pagar, ou pode optar por levar o caso a tribunal, onde uma condenação pode trazer sua própria inabilitação. Se você já tiver uma infração anterior, o Service SA te envia pelo correio uma notificação de inabilitação por dirigir alcoolizado, com a duração definida por quantas dessas infrações você teve nos últimos 3 anos: 3 meses pra segunda, 6 meses pra terceira, 12 meses pra quarta ou posterior. Não existe direito de recurso contra uma inabilitação por dirigir alcoolizado. Seja qual for a notificação que você receber, precisa reconhecê-la pessoalmente e pagar a taxa em até 28 dias, num centro do Service SA ou, só pra primeira notificação, numa agência do Australia Post, ou uma taxa maior passa a valer e um oficial vai tentar te notificar pessoalmente.",
          es: "Las lecturas más bajas pasan por un proceso distinto. Si tienes licencia plena y te agarran con un BAC menor a 0,08, y no tienes ninguna infracción de alcohol o drogas en los últimos 5 años, recibes una expiation notice con 4 puntos de demérito si la pagas, o puedes optar por llevar el caso a tribunal, donde una condena puede traer su propia inhabilitación. Si ya tienes una infracción anterior, Service SA te envía por correo una notificación de inhabilitación por manejar alcoholizado, con la duración definida según cuántas de esas infracciones tuviste en los últimos 3 años: 3 meses para la segunda, 6 meses para la tercera, 12 meses para la cuarta o posterior. No existe derecho de apelación contra una inhabilitación por manejar alcoholizado. Sea cual sea la notificación que recibas, debes reconocerla en persona y pagar la tarifa dentro de 28 días, en un centro de Service SA o, solo para la primera notificación, en una sucursal de Australia Post, o se aplicará una tarifa mayor y un oficial intentará notificarte en persona."
        }
      },
      {
        type: "heading",
        text: {
          en: "Roadside drug testing: presence, not a limit",
          pt: "Teste de drogas na via: presença, não um limite",
          es: "Prueba de drogas en la vía: presencia, no un límite"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Drug driving works on a different logic to alcohol. South Australia Police run random roadside oral fluid, or saliva, tests for four drugs: THC, the active component in cannabis, methylamphetamine (also called speed, ice or crystal meth), MDMA (ecstasy), and cocaine. There is no equivalent to the 0.05 BAC line here, the presence of any detectable amount of any of these four drugs in your saliva or blood is itself the offence. These tests happen the same way alcohol tests do: any police officer, any time, anywhere in the state, and they also apply to a supervising driver. The saliva test will not pick up ordinary over the counter medicine like cold and flu tablets, but if a driver is actually impaired by a prescription or other drug, they can still be prosecuted under the same driving under the influence offence used for alcohol. Refusing a drug screening test, an oral fluid analysis, or a blood test is an offence on its own. By law, the results can only be used for driving related offences, not anything else.",
          pt: "Dirigir sob efeito de drogas funciona numa lógica diferente do álcool. A South Australia Police faz testes aleatórios de fluido oral, ou saliva, na via, pra quatro drogas: THC, o componente ativo da maconha, metanfetamina (também chamada de speed, ice ou crystal meth), MDMA (ecstasy), e cocaína. Aqui não existe um equivalente à linha de 0,05 de BAC, a presença de qualquer quantidade detectável de qualquer uma dessas quatro drogas na sua saliva ou no seu sangue já é a infração em si. Esses testes acontecem do mesmo jeito que os de álcool: qualquer policial, a qualquer hora, em qualquer lugar do estado, e também valem pro supervisor de um learner. O teste de saliva não detecta remédio comum de venda livre, tipo comprimido pra resfriado e gripe, mas se o motorista estiver realmente incapacitado por um remédio prescrito ou outra droga, ainda pode ser processado pela mesma infração de dirigir sob a influência usada pro álcool. Recusar um teste de triagem de drogas, uma análise de fluido oral, ou um exame de sangue é uma infração à parte. Por lei, os resultados só podem ser usados pra infrações relacionadas à direção, nada além disso.",
          es: "Manejar bajo el efecto de drogas funciona con una lógica distinta a la del alcohol. La policía de South Australia hace pruebas aleatorias de fluido oral, o saliva, en la vía, para cuatro drogas: THC, el componente activo de la marihuana, metanfetamina (también llamada speed, ice o crystal meth), MDMA (éxtasis), y cocaína. Aquí no existe un equivalente a la línea de 0,05 de BAC, la presencia de cualquier cantidad detectable de cualquiera de estas cuatro drogas en tu saliva o en tu sangre ya es la infracción en sí misma. Estas pruebas ocurren de la misma forma que las de alcohol: cualquier policía, en cualquier momento, en cualquier lugar del estado, y también aplican al supervisor de un learner. La prueba de saliva no detecta medicamentos comunes de venta libre, como pastillas para el resfriado y la gripe, pero si el conductor está realmente afectado por un medicamento recetado u otra droga, igual puede ser procesado bajo la misma infracción de conducir bajo la influencia que se usa para el alcohol. Negarte a una prueba de detección de drogas, un análisis de fluido oral, o un examen de sangre es una infracción aparte. Por ley, los resultados solo pueden usarse para infracciones relacionadas con la conducción, nada más."
        }
      },
      {
        type: "heading",
        text: {
          en: "If you are caught drug driving",
          pt: "Se você for pego dirigindo sob efeito de drogas",
          es: "Si te agarran manejando bajo el efecto de drogas"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "A confirmed drug driving result gets you an immediate loss of licence for 3 months, which can start straight away or after 28 days, plus either an expiation notice or a court summons. If you pay the expiation, you also gain 4 demerit points, and either way your licence is cancelled for at least 3 months. Disqualification periods escalate with repeat offences within a 5 year window: 3 months for a first offence, 12 months for a second, 2 years for a third, and 3 years for a fourth or later. If you elect court instead and are convicted, a first offence brings a minimum 6 month disqualification, with the same escalation after that. Before you get a new licence back, you may be asked to complete a drug dependency assessment, and the licence you are issued afterwards is a probationary or provisional one, not a full unconditional licence straight away.",
          pt: "Um resultado confirmado de dirigir sob efeito de drogas te rende uma perda imediata de licença por 3 meses, que pode começar na hora ou depois de 28 dias, mais uma expiation notice ou uma intimação pra tribunal. Se você pagar a expiation, também ganha 4 pontos de demérito, e de qualquer forma sua licença fica cancelada por no mínimo 3 meses. Os períodos de inabilitação aumentam com infrações repetidas dentro de uma janela de 5 anos: 3 meses pra primeira infração, 12 meses pra segunda, 2 anos pra terceira, e 3 anos pra quarta ou posterior. Se você optar por tribunal e for condenado, a primeira infração traz uma inabilitação mínima de 6 meses, com o mesmo aumento depois disso. Antes de receber uma licença nova de volta, você pode precisar fazer uma avaliação de dependência de drogas, e a licença emitida depois é probationary ou provisional, não uma carteira definitiva sem restrições de cara.",
          es: "Un resultado confirmado de manejar bajo el efecto de drogas te da una pérdida inmediata de licencia por 3 meses, que puede empezar de inmediato o después de 28 días, más una expiation notice o una citación a tribunal. Si pagas la expiation, también ganas 4 puntos de demérito, y de cualquier forma tu licencia queda cancelada por al menos 3 meses. Los períodos de inhabilitación aumentan con infracciones repetidas dentro de una ventana de 5 años: 3 meses para la primera infracción, 12 meses para la segunda, 2 años para la tercera, y 3 años para la cuarta o posterior. Si eliges ir a tribunal y te condenan, la primera infracción trae una inhabilitación mínima de 6 meses, con el mismo aumento después de eso. Antes de recibir una licencia nueva, puede que te pidan completar una evaluación de dependencia a drogas, y la licencia que te emiten después es probationary o provisional, no una licencia plena y sin restricciones de inmediato."
        }
      },
      {
        type: "heading",
        text: {
          en: "The mandatory alcohol interlock scheme",
          pt: "O esquema obrigatório de bloqueio alcoólico (alcohol interlock)",
          es: "El esquema obligatorio de bloqueo por alcohol (alcohol interlock)"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "For the more serious drink driving offences, losing your licence for a while is not the end of it. The scheme applies if you recorded a BAC of 0.15 or more on a first offence, 0.08 or more on a second or later offence, refused a breath or blood test, or were convicted of driving under the influence. Once your disqualification period ends, you have to fit an alcohol interlock device to your chosen vehicle for a further period equal to that disqualification, before you can get your full licence back. The device is a breath tester wired into the car, it will not let the engine start if it detects alcohol over the pre-set limit. Fitting and running the device is at your own cost, though a concession scheme exists for eligible concession card holders.",
          pt: "Pras infrações mais sérias de dirigir alcoolizado, perder a licença por um tempo não é o fim da história. O esquema vale se você registrou um BAC de 0,15 ou mais numa primeira infração, 0,08 ou mais numa segunda infração ou posterior, recusou um teste de bafômetro ou de sangue, ou foi condenado por dirigir sob a influência. Quando seu período de inabilitação termina, você precisa instalar um dispositivo de bloqueio alcoólico no veículo escolhido, por um período adicional igual ao dessa inabilitação, antes de poder recuperar sua carteira definitiva. O dispositivo é um bafômetro conectado ao carro, ele não deixa o motor ligar se detectar álcool acima do limite pré-definido. Instalar e manter o dispositivo fica por sua conta, embora exista um esquema de desconto pra quem tem cartão de concessão elegível.",
          es: "Para las infracciones más serias de manejar alcoholizado, perder la licencia por un tiempo no es el final de la historia. El esquema aplica si registraste un BAC de 0,15 o más en una primera infracción, 0,08 o más en una segunda infracción o posterior, te negaste a un test de alcoholemia o de sangre, o fuiste condenado por conducir bajo la influencia. Cuando termina tu período de inhabilitación, tienes que instalar un dispositivo de bloqueo por alcohol en el vehículo que elijas, por un período adicional igual al de esa inhabilitación, antes de poder recuperar tu licencia plena. El dispositivo es un alcoholímetro conectado al auto, no deja que el motor arranque si detecta alcohol por encima del límite preestablecido. Instalar y mantener el dispositivo corre por tu cuenta, aunque existe un esquema de descuento para quienes tienen una tarjeta de concesión elegible."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This post explains what South Australia's own official pages say about alcohol, drugs and enforcement, it is general information, not legal advice, and if you are ever unsure about your own situation, get proper advice rather than guess. If you want confidential information or support about alcohol or other drug use, South Australia's Alcohol and Drug Information Service can be reached on 1300 13 13 40. To get ready for the actual road rules test, use KangaLearner's Learn section and SA practice questions.",
          pt: "Este post explica o que as próprias páginas oficiais da South Australia dizem sobre álcool, drogas e fiscalização, é informação geral, não é aconselhamento jurídico, e se você tiver alguma dúvida sobre a sua própria situação, busque orientação de verdade em vez de arriscar um palpite. Se você quiser informação confidencial ou apoio sobre uso de álcool ou outras drogas, o Alcohol and Drug Information Service da South Australia pode ser contatado pelo 1300 13 13 40. Pra se preparar pra prova de regras de trânsito em si, use a seção Aprender e as perguntas de prática de SA do KangaLearner.",
          es: "Este artículo explica lo que dicen las propias páginas oficiales de South Australia sobre alcohol, drogas y fiscalización, es información general, no es asesoría legal, y si alguna vez tienes dudas sobre tu propia situación, busca orientación real en vez de arriesgarte a adivinar. Si quieres información confidencial o apoyo sobre el uso de alcohol u otras drogas, puedes contactar al Alcohol and Drug Information Service de South Australia al 1300 13 13 40. Para prepararte para el examen de reglas de tránsito en sí, usa la sección Aprender y las preguntas de práctica de SA de KangaLearner."
        }
      }
    ]
  },
  {
    slug: "sa-regional-remote-driving-guide",
    icon: "safety",
    state: "SA",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 8,
    title: {
      en: "Regional and remote driving in South Australia: fatigue, wildlife and unsealed roads",
      pt: "Direção regional e remota na South Australia: fadiga, animais e estradas não pavimentadas",
      es: "Conducción regional y remota en South Australia: fatiga, fauna y caminos sin pavimentar"
    },
    excerpt: {
      en: "Fatigue, kangaroos, unsealed roads and mobile coverage gaps: a deep dive into what changes when you drive outside Adelaide, based on South Australia's own official advice.",
      pt: "Fadiga, cangurus, estradas não pavimentadas e áreas sem sinal de celular: um mergulho profundo no que muda quando você dirige fora de Adelaide, com base nas orientações oficiais da South Australia.",
      es: "Fatiga, canguros, caminos sin pavimentar y zonas sin señal de celular: un análisis profundo de lo que cambia cuando conduces fuera de Adelaide, basado en las orientaciones oficiales de South Australia."
    },
    sourceLabel: {
      en: "My Licence South Australia, Safe driving tips: Country driving",
      pt: "My Licence South Australia, Safe driving tips: Country driving",
      es: "My Licence South Australia, Safe driving tips: Country driving"
    },
    sourceUrl: "https://mylicence.sa.gov.au/safe-driving-tips/country-driving",
    body: [
      {
        type: "paragraph",
        text: {
          en: "My Licence, South Australia's official learner driver resource, and the Department for Infrastructure and Transport both publish detailed advice for driving outside Adelaide, because fatigue, wildlife and unsealed roads make regional and remote trips genuinely different from city driving. This post is a deep dive into five things that change once you leave the sealed suburban network: fatigue, wildlife, unsealed roads, trip planning, and mobile coverage gaps. It goes further than a general driving guide, using official South Australian sources including My Licence, the Department for Infrastructure and Transport's outback roads reporting, and the SA Arid Lands Landscape Board's outback safety advice.",
          pt: "O My Licence, o recurso oficial para motoristas learner da South Australia, e o Department for Infrastructure and Transport publicam orientações detalhadas para dirigir fora de Adelaide, porque fadiga, animais silvestres e estradas não pavimentadas tornam as viagens regionais e remotas genuinamente diferentes da direção na cidade. Este post é um mergulho profundo em cinco coisas que mudam quando você sai da malha pavimentada dos subúrbios: fadiga, animais silvestres, estradas não pavimentadas, planejamento de viagem e áreas sem sinal de celular. Ele vai além de um guia geral de direção, usando fontes oficiais da South Australia, incluindo o My Licence, os relatórios de estradas do outback do Department for Infrastructure and Transport, e as orientações de segurança no outback do SA Arid Lands Landscape Board.",
          es: "My Licence, el recurso oficial para conductores learner de South Australia, y el Department for Infrastructure and Transport publican orientaciones detalladas para conducir fuera de Adelaide, porque la fatiga, la fauna silvestre y los caminos sin pavimentar hacen que los viajes regionales y remotos sean genuinamente distintos a conducir en la ciudad. Este artículo es un análisis profundo de cinco cosas que cambian en cuanto sales de la red pavimentada de los suburbios: fatiga, fauna silvestre, caminos sin pavimentar, planificación de viajes, y zonas sin señal de celular. Va más allá de una guía general de manejo, usando fuentes oficiales de South Australia, incluyendo My Licence, los reportes de caminos del outback del Department for Infrastructure and Transport, y los consejos de seguridad en el outback del SA Arid Lands Landscape Board."
        }
      },
      {
        type: "heading",
        text: {
          en: "Fatigue: recognising it before it becomes dangerous",
          pt: "Fadiga: como reconhecer antes que fique perigosa",
          es: "Fatiga: cómo reconocerla antes de que sea peligrosa"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Fatigue is treated as a serious crash risk in South Australia, and the official advice explains why it hits country trips harder: longer distances mean more continuous time behind the wheel, which is exactly the condition that causes fatigue to build. My Licence's official advice identifies four main causes: not getting enough quality sleep, driving during your body's natural low points (the early hours between about 1am and 6am, and again in the mid-afternoon slump around 2pm to 4pm), simply spending a long time on the driving task, and underlying sleep disorders such as sleep apnoea. One of the most dangerous things about fatigue is that it reduces your own ability to judge how tired you actually are.",
          pt: "A fadiga é tratada como um risco sério de acidente na South Australia, e a orientação oficial explica por que ela atinge as viagens do interior com mais força: distâncias maiores significam mais tempo contínuo ao volante, que é exatamente a condição que faz a fadiga se acumular. A orientação oficial do My Licence identifica quatro causas principais: não dormir o suficiente com qualidade, dirigir nos horários em que seu corpo naturalmente rende menos (as primeiras horas da madrugada, entre a 1h e as 6h, e de novo naquela baixa do meio da tarde, entre 14h e 16h), simplesmente passar muito tempo na tarefa de dirigir, e transtornos do sono como a apneia do sono. Uma das coisas mais perigosas na fadiga é que ela reduz sua própria capacidade de avaliar o quão cansado você realmente está.",
          es: "La fatiga se trata como un riesgo serio de accidente en South Australia, y la orientación oficial explica por qué golpea con más fuerza los viajes por el interior: las distancias más largas significan más tiempo continuo al volante, que es exactamente la condición que hace que la fatiga se acumule. La orientación oficial de My Licence identifica cuatro causas principales: no dormir lo suficiente y con calidad, conducir en los momentos en que tu cuerpo naturalmente rinde menos (las primeras horas de la madrugada, entre la 1am y las 6am, y de nuevo en ese bajón de la media tarde, entre las 2pm y las 4pm), simplemente pasar mucho tiempo en la tarea de conducir, y trastornos del sueño como la apnea del sueño. Una de las cosas más peligrosas de la fatiga es que reduce tu propia capacidad de juzgar qué tan cansado estás realmente."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Constant yawning, sore or heavy eyes, and trouble keeping your head upright.",
            pt: "Bocejar sem parar, olhos doloridos ou pesados, e dificuldade para manter a cabeça erguida.",
            es: "Bostezar sin parar, ojos doloridos o pesados, y dificultad para mantener la cabeza erguida."
          },
          {
            en: "Drifting over lanes, or your driving speed changing without you deciding to change it.",
            pt: "Sair da faixa sem perceber, ou a velocidade mudando sem você decidir mudar.",
            es: "Salirte del carril sin darte cuenta, o que tu velocidad cambie sin que tú decidas cambiarla."
          },
          {
            en: "Delayed reactions, day dreaming, or difficulty remembering the last few kilometres you drove.",
            pt: "Reações atrasadas, distração ou devaneios, ou dificuldade para lembrar dos últimos quilômetros que você dirigiu.",
            es: "Reacciones lentas, quedarte pensando en otra cosa, o dificultad para recordar los últimos kilómetros que manejaste."
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "Coffee, fresh air and loud music are common tricks people rely on, but My Licence's own advice is direct about this: they only help in the short term, and caffeine in particular can cause a rebound where you crash into tiredness once it wears off. The only real cure for fatigue is sleep. If you notice any of the signs above, the advice is to pull over and take a proper break or a power nap rather than pushing on. On longer regional trips, avoid starting straight after a full day of work, avoid driving through the night, and aim to keep your total driving to no more than 8 to 10 hours in a day.",
          pt: "Café, ar fresco e música alta são truques comuns que as pessoas usam, mas a própria orientação do My Licence é direta sobre isso: eles só ajudam a curto prazo, e a cafeína em especial pode causar um efeito rebote, em que o cansaço volta com força assim que ela passa. A única cura de verdade para a fadiga é dormir. Se você notar qualquer um dos sinais acima, a orientação é parar e fazer uma pausa de verdade ou uma soneca, em vez de continuar dirigindo. Em viagens regionais mais longas, evite começar logo depois de um dia inteiro de trabalho, evite dirigir durante a noite, e procure manter sua direção total em no máximo 8 a 10 horas por dia.",
          es: "El café, el aire fresco y la música fuerte son trucos comunes en los que la gente confía, pero la propia orientación de My Licence es directa sobre esto: solo ayudan a corto plazo, y la cafeína en particular puede causar un efecto rebote, en el que el cansancio vuelve con fuerza apenas se le pasa el efecto. La única cura real para la fatiga es dormir. Si notas cualquiera de las señales anteriores, la recomendación es detenerte y tomar un descanso de verdad o una siesta corta, en vez de seguir manejando. En viajes regionales más largos, evita empezar justo después de un día entero de trabajo, evita manejar durante la noche, y trata de mantener tu manejo total en no más de 8 a 10 horas por día."
        }
      },
      {
        type: "heading",
        text: {
          en: "Wildlife: when it happens, and what not to do",
          pt: "Animais na pista: quando acontece, e o que não fazer",
          es: "Fauna en la vía: cuándo ocurre, y qué no hacer"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Kangaroos and other native animals are most active at dusk and dawn, which is exactly when many regional drivers are on the road trying to avoid the heat of the day. My Licence's Driver's Handbook also points out that animals, including cattle, kangaroos, emus, dogs and cats, can be dazzled or hypnotised by the glare of your headlights, which is part of why they freeze or move unpredictably instead of clearing the road. In farming areas, livestock such as cattle and sheep are sometimes moved along or across the road deliberately, not just wandering loose, so slow right down if you see animals or a farmer signalling ahead.",
          pt: "Cangurus e outros animais nativos ficam mais ativos ao entardecer e ao amanhecer, exatamente quando muitos motoristas do interior estão na estrada tentando fugir do calor do dia. O Driver's Handbook do My Licence também aponta que animais, incluindo gado, cangurus, emas, cachorros e gatos, podem ficar ofuscados ou hipnotizados pelo brilho dos seus faróis, o que ajuda a explicar por que eles congelam ou se movem de forma imprevisível em vez de sair da pista. Em áreas rurais, gado e ovelhas às vezes são conduzidos ao longo da via ou atravessando-a de propósito, não apenas perambulando soltos, então reduza bastante a velocidade se avistar animais ou um fazendeiro sinalizando à frente.",
          es: "Los canguros y otros animales nativos están más activos al atardecer y al amanecer, justo cuando muchos conductores del interior están en la carretera tratando de evitar el calor del día. El Driver's Handbook de My Licence también señala que los animales, incluyendo vacas, canguros, emús, perros y gatos, pueden quedar deslumbrados o hipnotizados por el brillo de tus faros, lo que en parte explica por qué se quedan quietos o se mueven de forma impredecible en vez de despejar la vía. En zonas rurales, el ganado como vacas y ovejas a veces es arreado a lo largo del camino o cruzando este a propósito, no solo deambulando suelto, así que reduce bastante la velocidad si ves animales o a un granjero haciendo señas más adelante."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "If an animal is already on the road ahead of you, brake in a controlled, straight line, and sound your horn and flash your headlights to try to move it. Do not swerve, since losing control of the car is more dangerous than the animal itself.",
            pt: "Se um animal já estiver na pista à sua frente, freie em linha reta e de forma controlada, buzine e pisque os faróis para tentar afastá-lo. Não faça uma curva brusca para desviar, já que perder o controle do carro é mais perigoso do que o próprio animal.",
            es: "Si un animal ya está en la vía justo delante de ti, frena en línea recta y de forma controlada, toca la bocina y las luces altas para intentar que se mueva. No gires bruscamente para esquivarlo, ya que perder el control del auto es más peligroso que el animal mismo."
          },
          {
            en: "If you see an animal near the edge of the road, slow down and give it a chance to clear the road before you reach it, especially around dusk and dawn.",
            pt: "Se você avistar um animal perto da beira da pista, reduza a velocidade e dê a ele uma chance de sair da via antes que você chegue perto, especialmente ao entardecer e ao amanhecer.",
            es: "Si ves un animal cerca del borde de la vía, reduce la velocidad y dale la oportunidad de despejar la vía antes de que llegues, especialmente al atardecer y al amanecer."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Unsealed roads: why the physics work against you",
          pt: "Estradas não pavimentadas: por que a física trabalha contra você",
          es: "Caminos sin pavimentar: por qué la física juega en tu contra"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Gravel and other loose or unsealed surfaces roughly halve your tyre grip compared to bitumen, according to My Licence's Driver's Handbook, which means you need about double the distance to brake to a stop. Losing control on a bend also happens at a noticeably lower speed on gravel than it does on a sealed road with the same curve. On top of that, unsealed roads change constantly: potholes, dust, loose or flying gravel and uneven surfaces can appear with no warning, so treat every dirt road as if the conditions could be different from the last time you drove it.",
          pt: "Cascalho e outras superfícies soltas ou não pavimentadas reduzem pela metade a aderência dos seus pneus em comparação com o asfalto, segundo o Driver's Handbook do My Licence, o que significa que você precisa de aproximadamente o dobro da distância para frear até parar. Perder o controle numa curva também acontece numa velocidade visivelmente mais baixa no cascalho do que numa via pavimentada com a mesma curva. Além disso, estradas não pavimentadas mudam o tempo todo: buracos, poeira, cascalho solto ou voando e superfícies irregulares podem aparecer sem aviso algum, então trate toda estrada de terra como se as condições pudessem ser diferentes da última vez que você passou por ali.",
          es: "La grava y otras superficies sueltas o sin pavimentar reducen a la mitad el agarre de tus neumáticos en comparación con el asfalto, según el Driver's Handbook de My Licence, lo que significa que necesitas aproximadamente el doble de distancia para frenar hasta detenerte. Perder el control en una curva también ocurre a una velocidad notablemente más baja en la grava que en un camino pavimentado con la misma curva. Además, los caminos sin pavimentar cambian todo el tiempo: baches, polvo, grava suelta o volando y superficies irregulares pueden aparecer sin ningún aviso, así que trata cada camino de tierra como si las condiciones pudieran ser distintas a la última vez que pasaste por ahí."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Slow down before you need to, not after. There is no fixed safe speed for a dirt road, since it depends on the specific surface in front of you that day.",
            pt: "Reduza a velocidade antes de precisar, não depois. Não existe uma velocidade segura fixa para uma estrada de terra, já que depende da superfície específica à sua frente naquele dia.",
            es: "Reduce la velocidad antes de necesitarlo, no después. No existe una velocidad segura fija para un camino de tierra, ya que depende de la superficie específica que tengas delante ese día."
          },
          {
            en: "A common piece of outback advice is to reduce your tyre pressure to roughly 80 percent of your normal sealed-road pressure for better grip on loose surfaces, and to carry at least two spare tyres, both inflated, if you are heading further out.",
            pt: "Uma orientação comum para o outback é reduzir a pressão dos pneus para cerca de 80 por cento da sua pressão normal em via pavimentada, para ter mais aderência em superfícies soltas, e levar pelo menos dois estepes, ambos calibrados, se você estiver indo mais para o interior.",
            es: "Un consejo común para el outback es bajar la presión de tus neumáticos a aproximadamente el 80 por ciento de tu presión normal en pavimento, para tener más agarre en superficies sueltas, y llevar al menos dos neumáticos de repuesto, ambos inflados, si vas más hacia el interior."
          },
          {
            en: "Carry a long-handled shovel and a strong jack, and turn your headlights on even during the day on country roads, so oncoming traffic can see you through the dust before they can see your vehicle itself.",
            pt: "Leve uma pá de cabo longo e um macaco resistente, e ligue os faróis mesmo durante o dia em estradas rurais, para que o trânsito que vem no sentido contrário consiga ver você através da poeira antes de conseguir ver o próprio veículo.",
            es: "Lleva una pala de mango largo y un gato hidráulico resistente, y enciende las luces incluso de día en caminos rurales, para que el tráfico que viene de frente pueda verte a través del polvo antes de poder ver tu vehículo."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Planning a trip beyond the sealed network",
          pt: "Planejando uma viagem além da malha pavimentada",
          es: "Cómo planificar un viaje más allá de la red pavimentada"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Distance, and the type and condition of the roads you will actually be on, not just the total kilometres on a map.",
            pt: "Distância, e o tipo e a condição das estradas em que você realmente vai estar, não só os quilômetros totais no mapa.",
            es: "La distancia, y el tipo y estado de los caminos en los que realmente vas a estar, no solo los kilómetros totales en un mapa."
          },
          {
            en: "Where the towns, rest areas and services such as petrol stations sit along your route, and how far apart they are.",
            pt: "Onde ficam as cidades, áreas de descanso e serviços como postos de combustível ao longo da sua rota, e a que distância uns dos outros.",
            es: "Dónde quedan los pueblos, áreas de descanso y servicios como estaciones de servicio a lo largo de tu ruta, y qué tan separados están entre sí."
          },
          {
            en: "Weather and its effect on the road, plus how many bridge and creek crossings your route has, since these are exactly where conditions change fastest.",
            pt: "O clima e seu efeito sobre a via, além de quantas travessias de pontes e riachos existem na sua rota, já que é exatamente ali que as condições mudam mais rápido.",
            es: "El clima y su efecto sobre el camino, además de cuántos cruces de puentes y arroyos tiene tu ruta, ya que es justo ahí donde las condiciones cambian más rápido."
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "My Licence notes that rest areas are provided at regular intervals along South Australia's major sealed rural arterial roads, so plan around them rather than assuming you will find somewhere to stop exactly when you need one. If you are towing a caravan or trailer, check its tyres carefully before you go: tyres that only get used once or twice a year can go brittle and are prone to blowouts, even if the tread still looks fine.",
          pt: "O My Licence observa que áreas de descanso são disponibilizadas em intervalos regulares ao longo das principais vias rurais arteriais pavimentadas da South Australia, então planeje em torno delas em vez de assumir que vai achar um lugar para parar bem na hora em que precisar. Se você estiver rebocando um trailer ou caravana, confira os pneus dele com cuidado antes de sair: pneus usados só uma ou duas vezes por ano podem ficar ressecados e propensos a furos, mesmo que a banda de rodagem ainda pareça boa.",
          es: "My Licence señala que hay áreas de descanso a intervalos regulares a lo largo de las principales vías rurales arteriales pavimentadas de South Australia, así que planifica en torno a ellas en lugar de asumir que vas a encontrar dónde parar justo cuando lo necesites. Si estás remolcando una caravana o un trailer, revisa sus neumáticos con cuidado antes de salir: los neumáticos que solo se usan una o dos veces al año pueden volverse quebradizos y propensos a reventones, aunque la banda de rodadura todavía se vea bien."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "A first aid kit, a torch with spare batteries, and reflective triangles.",
            pt: "Um kit de primeiros socorros, uma lanterna com pilhas reserva, e triângulos refletivos.",
            es: "Un botiquín de primeros auxilios, una linterna con pilas de repuesto, y triángulos reflectantes."
          },
          {
            en: "A small tool kit (pliers, screwdrivers, an adjustable wrench, spare fuses and bulbs, a spare fan belt and radiator hoses), a fire extinguisher, jumper leads, a tow rope, and a tyre pump with a pressure gauge.",
            pt: "Um kit de ferramentas pequeno (alicate, chaves de fenda, uma chave inglesa ajustável, fusíveis e lâmpadas reserva, uma correia do ventilador reserva e mangueiras do radiador), um extintor de incêndio, cabos para bateria, uma corda de reboque, e uma bomba de encher pneu com um calibrador de pressão.",
            es: "Un kit de herramientas pequeño (alicate, destornilladores, una llave inglesa ajustable, fusibles y bombillas de repuesto, una correa de ventilador de repuesto y mangueras del radiador), un extintor de incendios, cables para pasar corriente, una cuerda de remolque, y un inflador de neumáticos con un manómetro."
          },
          {
            en: "Water: roughly 6 litres per person per day in mild weather, rising to about 10 litres per person per day in warm weather, plus a 3 to 4 day reserve supply in case you are delayed. Carry extra fuel too, since soft sand, mud and hills all burn through it faster than you would expect.",
            pt: "Água: cerca de 6 litros por pessoa por dia em clima ameno, subindo para cerca de 10 litros por pessoa por dia em clima quente, mais uma reserva para 3 a 4 dias extras, para o caso de você atrasar. Leve combustível extra também, já que areia fofa, lama e subidas consomem mais do que você imaginaria.",
            es: "Agua: cerca de 6 litros por persona por día en clima templado, subiendo a unos 10 litros por persona por día en clima cálido, más una reserva de 3 a 4 días extra por si te retrasas. Lleva combustible extra también, ya que la arena suelta, el barro y las subidas gastan más de lo que imaginarías."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Mobile coverage gaps: what to carry instead",
          pt: "Áreas sem sinal de celular: o que levar no lugar",
          es: "Zonas sin señal de celular: qué llevar en su lugar"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Only around 5 percent of outback South Australia has mobile phone range, and what coverage exists is concentrated in townships along the main sealed roads, according to the SA Arid Lands Landscape Board's outback safety advice. Coverage on the unsealed road network is sporadic at best. It is also worth knowing how Triple Zero actually works: your call can connect through any carrier's network, not just your own, but if there is genuinely no signal from any provider in the area, a 000 call will not go through at all. That is exactly the gap the alternatives below are meant to cover.",
          pt: "Apenas cerca de 5 por cento do outback da South Australia tem sinal de celular, e a cobertura que existe se concentra nos povoados ao longo das principais vias pavimentadas, segundo a orientação de segurança no outback do SA Arid Lands Landscape Board. A cobertura na malha de estradas não pavimentadas é irregular na melhor das hipóteses. Também vale saber como o Triple Zero realmente funciona: seu celular pode se conectar à rede de qualquer operadora, não só a sua, mas se realmente não houver sinal de nenhuma operadora naquela área, uma chamada para o 000 simplesmente não vai completar. É exatamente essa a lacuna que as alternativas abaixo servem para cobrir.",
          es: "Solo alrededor del 5 por ciento del outback de South Australia tiene señal de celular, y la cobertura que existe se concentra en los pueblos a lo largo de los caminos principales pavimentados, según los consejos de seguridad en el outback del SA Arid Lands Landscape Board. La cobertura en la red de caminos sin pavimentar es irregular en el mejor de los casos. También vale la pena saber cómo funciona realmente el Triple Zero: tu celular puede conectarse a la red de cualquier operador, no solo a la tuya, pero si de verdad no hay señal de ningún operador en esa zona, una llamada al 000 simplemente no se va a completar. Ese es exactamente el vacío que las alternativas de abajo buscan cubrir."
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Satellite phones work almost anywhere in Australia, and some outback locations, including Birdsville and Mt Dare, hire them out to travellers.",
            pt: "Telefones via satélite funcionam em praticamente qualquer lugar da Austrália, e alguns pontos no outback, incluindo Birdsville e Mt Dare, alugam aparelhos para viajantes.",
            es: "Los teléfonos satelitales funcionan en casi cualquier parte de Australia, y algunos puntos del outback, incluyendo Birdsville y Mt Dare, los arriendan a los viajeros."
          },
          {
            en: "UHF radios are a common backup: channels 9 to 30 and 39 are for general use, while channels 5 and 35 are reserved for emergencies only, monitored by volunteers where available rather than guaranteed around the clock.",
            pt: "Rádios UHF são um backup comum: os canais 9 a 30 e o 39 são para uso geral, enquanto os canais 5 e 35 são reservados só para emergências, monitorados por voluntários quando disponível, e não garantidos 24 horas por dia.",
            es: "Los radios UHF son un respaldo común: los canales 9 a 30 y el 39 son para uso general, mientras que los canales 5 y 35 están reservados solo para emergencias, monitoreados por voluntarios cuando hay disponibilidad, sin garantía las 24 horas."
          },
          {
            en: "HF radios connected to the VKS-737 network can cover thousands of kilometres, and a Personal Locator Beacon (PLB), registered with the Australian Maritime Safety Authority (AMSA), is worth carrying for when nothing else works.",
            pt: "Rádios HF conectados à rede VKS-737 conseguem cobrir milhares de quilômetros, e um Personal Locator Beacon (PLB), registrado na Australian Maritime Safety Authority (AMSA), vale a pena levar para quando mais nada funcionar.",
            es: "Los radios HF conectados a la red VKS-737 pueden cubrir miles de kilómetros, y un Personal Locator Beacon (PLB), registrado ante la Australian Maritime Safety Authority (AMSA), vale la pena llevarlo para cuando ya nada más funcione."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Outback roads and permits: checking before you go",
          pt: "Estradas do outback e autorizações: o que checar antes de ir",
          es: "Caminos del outback y permisos: qué revisar antes de salir"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Before heading into the outback, check the current Outback Road Report from the Department for Infrastructure and Transport, at dit.sa.gov.au/outbackroads or by calling 1300 361 033. A new report is issued every time conditions change, and it covers closures, restrictions and warnings across the outback road network, so check it again if your trip is delayed by even a few days. To report a road hazard or incident yourself, call 1800 018 313. If your route takes you into Munga-Thirri, the Simpson Desert National Park, or east of Dalhousie Springs in Witjira National Park, you will also need a Desert Parks Pass: it covers 12 months of vehicle entry across seven desert parks and allows camping for up to 21 nights at a time, and you can buy one through parks.sa.gov.au or from agents such as the Pink Roadhouse in Oodnadatta and the Mt Dare Hotel. For urgent questions, there is a Desert Parks Pass hotline on 1800 816 078.",
          pt: "Antes de entrar no outback, confira o Outback Road Report atual do Department for Infrastructure and Transport, em dit.sa.gov.au/outbackroads ou ligando para 1300 361 033. Um novo relatório é emitido toda vez que as condições mudam, e ele cobre fechamentos, restrições e avisos em toda a malha de estradas do outback, então confira de novo se sua viagem atrasar, mesmo que só alguns dias. Para relatar você mesmo um perigo ou incidente na estrada, ligue para 1800 018 313. Se a sua rota passar por Munga-Thirri, o Simpson Desert National Park, ou a leste de Dalhousie Springs no Witjira National Park, você também vai precisar de um Desert Parks Pass: ele cobre 12 meses de entrada de veículos em sete parques do deserto e permite acampar por até 21 noites de cada vez, e você pode comprar um pelo parks.sa.gov.au ou com agentes como o Pink Roadhouse em Oodnadatta e o Mt Dare Hotel. Para dúvidas urgentes, existe uma linha direta do Desert Parks Pass, o 1800 816 078.",
          es: "Antes de entrar al outback, revisa el Outback Road Report actual del Department for Infrastructure and Transport, en dit.sa.gov.au/outbackroads o llamando al 1300 361 033. Se emite un nuevo reporte cada vez que las condiciones cambian, y cubre cierres, restricciones y advertencias en toda la red de caminos del outback, así que revísalo de nuevo si tu viaje se retrasa, aunque sea unos días. Para reportar tú mismo un peligro o incidente en el camino, llama al 1800 018 313. Si tu ruta pasa por Munga-Thirri, el Simpson Desert National Park, o al este de Dalhousie Springs en el Witjira National Park, también vas a necesitar un Desert Parks Pass: cubre 12 meses de entrada de vehículos en siete parques del desierto y permite acampar hasta 21 noches seguidas, y puedes comprarlo en parks.sa.gov.au o con agentes como el Pink Roadhouse en Oodnadatta y el Mt Dare Hotel. Para dudas urgentes, hay una línea directa del Desert Parks Pass, el 1800 816 078."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "This post draws on official advice from My Licence, the Department for Infrastructure and Transport's outback roads reporting, and the SA Arid Lands Landscape Board, current at the time of writing. Road and weather conditions change, so always check dit.sa.gov.au/outbackroads before a remote trip rather than relying on this post alone. Use KangaLearner's Learn section and SA practice questions to prepare for the parts of the test that cover these same road rules.",
          pt: "Este post se baseia em orientações oficiais do My Licence, dos relatórios de estradas do outback do Department for Infrastructure and Transport, e do SA Arid Lands Landscape Board, atuais no momento em que foi escrito. Condições de estrada e clima mudam, então sempre confira dit.sa.gov.au/outbackroads antes de uma viagem remota, em vez de confiar só neste post. Use a seção Aprender e as perguntas de prática de SA do KangaLearner para se preparar para as partes da prova que cobrem essas mesmas regras de trânsito.",
          es: "Este artículo se basa en orientaciones oficiales de My Licence, los reportes de caminos del outback del Department for Infrastructure and Transport, y el SA Arid Lands Landscape Board, vigentes al momento de escribirlo. Las condiciones de camino y clima cambian, así que siempre revisa dit.sa.gov.au/outbackroads antes de un viaje remoto, en vez de confiar solo en este artículo. Usa la sección Aprender y las preguntas de práctica de SA de KangaLearner para prepararte para las partes del examen que cubren estas mismas reglas de tránsito."
        }
      }
    ]
  },
  {
    slug: "sa-motorcycle-learner-licence-guide",
    icon: "checklist",
    state: "SA",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 6,
    title: {
      en: "How the motorcycle learner licence works in South Australia",
      pt: "Como funciona a licença de aprendiz de moto na South Australia",
      es: "Cómo funciona la licencia de aprendiz de moto en South Australia"
    },
    excerpt: {
      en: "Riding a motorcycle in SA starts with a mandatory Rider Safe course before you even get your permit, a minimum age of 18, and a longer path to a full licence than driving a car. Here is how the process and helmet rules actually work.",
      pt: "Andar de moto na SA começa com um curso obrigatório, o Rider Safe, antes mesmo de você conseguir a permissão, idade mínima de 18 anos, e um caminho mais longo até a licença definitiva do que dirigir carro. Veja como o processo e as regras de capacete funcionam de verdade.",
      es: "Andar en moto en SA empieza con un curso obligatorio, el Rider Safe, antes incluso de conseguir el permiso, edad mínima de 18 años, y un camino más largo hacia la licencia definitiva que conducir un auto. Esto es cómo funcionan de verdad el proceso y las reglas de casco."
    },
    sourceLabel: {
      en: "My Licence South Australia, My motorcycle licence",
      pt: "My Licence South Australia, My motorcycle licence",
      es: "My Licence South Australia, My motorcycle licence"
    },
    sourceUrl: "https://mylicence.sa.gov.au/my-motorcycle-licence",
    body: [
      {
        type: "paragraph",
        text: {
          en: "Getting a motorcycle licence in South Australia is not just the car process with two wheels. Before you can even apply for a motorcycle learner's permit, SA requires you to complete Rider Safe, a compulsory hands on training course, something car learners never have to do. The minimum age is higher, the path to a full licence takes longer, and there is a specific approved helmet standard to meet. This post is a deep dive into that motorcycle specific process, based on South Australia's own official pages. For the general road rules that apply to every driver in the state, see KangaLearner's other guide to driving in South Australia.",
          pt: "Tirar a licença de moto na South Australia não é só o processo de carro com duas rodas a menos. Antes mesmo de poder aplicar pra permissão de aprendiz de moto, a SA exige que você complete o Rider Safe, um curso prático obrigatório, algo que quem está aprendendo a dirigir carro nunca precisa fazer. A idade mínima é maior, o caminho até a licença definitiva demora mais, e existe um padrão específico de capacete aprovado que você precisa conhecer. Este post é um mergulho profundo nesse processo específico de moto, baseado nas próprias páginas oficiais da South Australia. Se você quer as regras gerais de trânsito que valem pra qualquer motorista no estado, veja o outro guia do KangaLearner sobre dirigir na South Australia.",
          es: "Sacar la licencia de moto en South Australia no es solo el proceso de auto con dos ruedas menos. Antes incluso de poder aplicar para el permiso de aprendiz de moto, SA exige que completes el Rider Safe, un curso práctico obligatorio, algo que quien está aprendiendo a manejar auto nunca tiene que hacer. La edad mínima es mayor, el camino hasta la licencia definitiva toma más tiempo, y existe un estándar específico de casco aprobado que necesitas conocer. Este artículo es una inmersión profunda en ese proceso específico de moto, basado en las propias páginas oficiales de South Australia. Si buscas las reglas generales de tránsito que aplican a cualquier conductor en el estado, mira la otra guía de KangaLearner sobre conducir en South Australia."
        }
      },
      {
        type: "heading",
        text: {
          en: "Rider Safe: training before your permit",
          pt: "Rider Safe: treinamento antes da permissão",
          es: "Rider Safe: entrenamiento antes del permiso"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Rider Safe is South Australia's compulsory motorcycle rider training course, run by the Department for Infrastructure and Transport. Every novice rider has to attend and pass it before they can apply for a motorcycle learner's permit, there is no way around it. From 9 December 2024, the program got more demanding: applicants now complete a hazard perception and rider knowledge course aimed specifically at motorcyclists, two full day practical training sessions, a pre licence course, and a final licence assessment, roughly double what was required before that date. Training runs at dedicated sites around the state, including St Agnes, Murray Bridge, Millicent, Barmera, Port Pirie and Whyalla. Book through My Licence and confirm current course fees there too, since they went up when the training requirement expanded.",
          pt: "O Rider Safe é o curso obrigatório de treinamento de motociclista da South Australia, administrado pelo Department for Infrastructure and Transport. Todo motociclista novato precisa participar e ser aprovado nele antes de poder aplicar pra permissão de aprendiz de moto, não tem como pular essa etapa. A partir de 9 de dezembro de 2024, o programa ficou mais exigente: quem se inscreve agora completa um curso de percepção de risco e conhecimento voltado especificamente pra motociclistas, duas sessões práticas de dia inteiro, um curso pré-licença, e uma avaliação final de licença, praticamente o dobro do que era exigido antes dessa data. O treinamento acontece em locais dedicados espalhados pelo estado, incluindo St Agnes, Murray Bridge, Millicent, Barmera, Port Pirie e Whyalla. Marque pelo My Licence e confirme lá também as taxas atuais do curso, já que elas aumentaram quando a exigência de treinamento foi ampliada.",
          es: "Rider Safe es el curso obligatorio de entrenamiento para motociclistas de South Australia, administrado por el Department for Infrastructure and Transport. Todo motociclista novato tiene que asistir y aprobarlo antes de poder aplicar para el permiso de aprendiz de moto, no hay forma de saltarse ese paso. Desde el 9 de diciembre de 2024, el programa se volvió más exigente: quien se inscribe ahora completa un curso de percepción de riesgo y conocimiento dirigido específicamente a motociclistas, dos jornadas prácticas de día completo, un curso pre-licencia, y una evaluación final de licencia, prácticamente el doble de lo que se exigía antes de esa fecha. El entrenamiento se dicta en sedes designadas por todo el estado, incluyendo St Agnes, Murray Bridge, Millicent, Barmera, Port Pirie y Whyalla. Reserva a través de My Licence y confirma ahí también las tarifas actuales del curso, ya que aumentaron cuando se ampliaron los requisitos de entrenamiento."
        }
      },
      {
        type: "heading",
        text: {
          en: "From learner to a full licence",
          pt: "Da permissão de aprendiz até a licença plena",
          es: "Del permiso de aprendiz a la licencia plena"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "The minimum age for a motorcycle learner's permit in South Australia is 18, higher than what most newcomers expect if they are comparing it to a car licence. There are two exceptions: you can apply at 17 if you already hold a provisional licence for another vehicle class, or at 16 or 17 if you live in a prescribed regional locality, in which case your permit comes with extra restrictions on when and why you can ride. Once issued, the learner's permit must be held for a minimum of 12 months regardless of your age. After that, riders move to the R-Date licence class, which is restricted under the Learner Approved Motorcycle Scheme to machines of up to 660 mL engine capacity with a power to weight ratio no higher than 150 kW per tonne. R-Date must be held for a minimum of 2 years before the licence automatically upgrades to a full, unrestricted R class licence, with no extra test required at that point. Add it up and the earliest anyone can hold a full motorcycle licence in SA is age 21.",
          pt: "A idade mínima pra permissão de aprendiz de moto na South Australia é 18 anos, mais alta do que a maioria de quem chega de fora espera ao comparar com a licença de carro. Existem duas exceções: você pode aplicar aos 17 anos se já tiver uma licença provisional pra outra categoria de veículo, ou aos 16 ou 17 anos se morar numa localidade regional prescrita, caso em que sua permissão vem com restrições extras sobre quando e por que você pode andar de moto. Depois de emitida, a permissão de aprendiz precisa ser mantida por no mínimo 12 meses, independentemente da sua idade. Depois disso, o motociclista passa pra categoria R-Date, restrita pelo Learner Approved Motorcycle Scheme a motos de até 660 mL de cilindrada com relação potência peso de no máximo 150 kW por tonelada. A R-Date precisa ser mantida por no mínimo 2 anos antes que a licença suba automaticamente pra categoria R plena, sem restrições, sem nenhuma prova extra nesse momento. Somando tudo, a idade mínima pra ter uma licença de moto plena na SA é 21 anos.",
          es: "La edad mínima para el permiso de aprendiz de moto en South Australia es 18 años, más alta de lo que la mayoría de los recién llegados espera al compararla con la licencia de auto. Hay dos excepciones: puedes aplicar a los 17 años si ya tienes una licencia provisional para otra categoría de vehículo, o a los 16 o 17 años si vives en una localidad regional prescrita, caso en el que tu permiso viene con restricciones adicionales sobre cuándo y por qué puedes andar en moto. Una vez emitido, el permiso de aprendiz debe mantenerse por un mínimo de 12 meses sin importar tu edad. Después de eso, el motociclista pasa a la categoría R-Date, restringida bajo el Learner Approved Motorcycle Scheme a motos de hasta 660 mL de cilindrada con una relación potencia peso de no más de 150 kW por tonelada. La R-Date debe mantenerse por un mínimo de 2 años antes de que la licencia suba automáticamente a la categoría R plena, sin restricciones, sin ningún examen adicional en ese momento. Sumando todo, la edad mínima para tener una licencia de moto plena en SA es 21 años."
        }
      },
      {
        type: "heading",
        text: {
          en: "What a learner's permit does not let you do",
          pt: "O que a permissão de aprendiz não deixa você fazer",
          es: "Lo que el permiso de aprendiz no te deja hacer"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Blood alcohol must stay at zero at all times. You cannot carry a pillion passenger or a sidecar passenger under any circumstances, and that includes a person acting as your qualified supervising rider, so once you set off, you ride alone.",
            pt: "O nível de álcool no sangue precisa ficar em zero o tempo todo. Você não pode levar passageiro na garupa nem em sidecar em nenhuma hipótese, e isso inclui uma pessoa atuando como seu supervisor qualificado, ou seja, uma vez que você sai, anda sozinho.",
            es: "El nivel de alcohol en sangre debe estar en cero en todo momento. No puedes llevar pasajero en el asiento trasero ni en sidecar bajo ninguna circunstancia, y eso incluye a una persona actuando como tu supervisor calificado, es decir, una vez que sales, andas solo."
          },
          {
            en: "You must not exceed the posted speed limit by 10 km/h or more, and you must never exceed 100 km/h even where a sign allows a higher limit. Display your L plate and carry your permit every time you ride.",
            pt: "Você não pode ultrapassar o limite de velocidade sinalizado em 10 km/h ou mais, e nunca pode passar de 100 km/h mesmo onde a placa permite um limite maior. Use a placa L e leve sua permissão sempre que for andar de moto.",
            es: "No puedes superar el límite de velocidad señalizado en 10 km/h o más, y nunca puedes pasar de 100 km/h aunque la señal permita un límite mayor. Usa la placa L y lleva tu permiso cada vez que andes en moto."
          },
          {
            en: "No function of a mobile phone is allowed while riding, you cannot tow anything, and you cannot lane filter between other vehicles.",
            pt: "Nenhuma função do celular é permitida enquanto você anda de moto, você não pode rebocar nada, e não pode fazer lane filtering (passar entre veículos parados ou lentos).",
            es: "Ninguna función del celular está permitida mientras conduces, no puedes remolcar nada, y no puedes hacer lane filtering (pasar entre vehículos detenidos o lentos)."
          },
          {
            en: "If you are under 25, you cannot ride between midnight and 5am, even if you already hold a P2 or full licence for another type of vehicle, unless you meet a specific exemption. Check the current exemption criteria on My Licence.",
            pt: "Se você tem menos de 25 anos, não pode andar entre meia-noite e 5h, mesmo já tendo licença P2 ou plena pra outra categoria de veículo, a não ser que se enquadre numa exceção específica. Confira os critérios de exceção atuais no My Licence.",
            es: "Si tienes menos de 25 años, no puedes andar entre medianoche y las 5am, aunque ya tengas licencia P2 o plena para otro tipo de vehículo, a menos que cumplas con una excepción específica. Revisa los criterios de excepción actuales en My Licence."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Approved helmets",
          pt: "Capacetes aprovados",
          es: "Cascos aprobados"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "South Australia only accepts helmets manufactured, tested and marked to specific standards under the Road Traffic (Miscellaneous) Regulations: the Australian and New Zealand standard AS/NZS 1698, or the UN standard ECE 22.05. Amendments to those regulations in 2023 updated the approved helmet rules for motorcycles specifically, so it is worth checking the label on any helmet you bring from overseas or buy secondhand rather than assuming it qualifies. The requirement applies to the rider and to any pillion or sidecar passenger, on a learner's permit, an R-Date licence or a full R licence alike. Buying new from an Australian retailer is the simplest way to be sure the certification sticker inside the helmet is one SA actually recognises.",
          pt: "A South Australia só aceita capacetes fabricados, testados e marcados de acordo com padrões específicos, sob os Road Traffic (Miscellaneous) Regulations: o padrão australiano e neozelandês AS/NZS 1698, ou o padrão da ONU ECE 22.05. Emendas a esses regulamentos em 2023 atualizaram as regras de capacete aprovado especificamente pra motocicletas, então vale a pena conferir a etiqueta de qualquer capacete que você traga de fora ou compre usado, em vez de simplesmente assumir que ele se qualifica. A exigência vale pro motociclista e pra qualquer passageiro na garupa ou em sidecar, seja na permissão de aprendiz, na licença R-Date ou na licença R plena. Comprar novo numa loja australiana é o jeito mais simples de ter certeza de que o selo de certificação dentro do capacete é um que a SA realmente reconhece.",
          es: "South Australia solo acepta cascos fabricados, probados y marcados según estándares específicos, bajo las Road Traffic (Miscellaneous) Regulations: el estándar australiano y neozelandés AS/NZS 1698, o el estándar de la ONU ECE 22.05. Enmiendas a esas regulaciones en 2023 actualizaron las reglas de casco aprobado específicamente para motocicletas, así que vale la pena revisar la etiqueta de cualquier casco que traigas del extranjero o compres usado, en vez de asumir que califica. El requisito aplica al motociclista y a cualquier pasajero en el asiento trasero o en sidecar, ya sea con el permiso de aprendiz, la licencia R-Date o la licencia R plena. Comprar uno nuevo en una tienda australiana es la forma más simple de asegurarte de que la etiqueta de certificación dentro del casco es una que SA realmente reconoce."
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Everything above comes from South Australia's own My Licence pages for motorcycle riders, plus the state's official road traffic regulations, current as of when this was written. Rider Safe fees and program details in particular are reviewed periodically, so confirm them directly on mylicence.sa.gov.au before you book. For the road rules that apply to every South Australian driver, see KangaLearner's other guide to driving in SA, and use KangaLearner's Learn section and SA practice questions to prepare for your theory test.",
          pt: "Tudo acima vem das próprias páginas do My Licence da South Australia pra motociclistas, mais os regulamentos oficiais de trânsito do estado, atuais no momento em que este post foi escrito. As taxas e os detalhes do programa Rider Safe em especial são revisados periodicamente, então confirme direto em mylicence.sa.gov.au antes de marcar o seu curso. Se você quer as regras de trânsito que valem pra qualquer motorista da South Australia, veja o outro guia do KangaLearner sobre dirigir na SA, e use a seção Aprender e as perguntas de prática de SA do KangaLearner pra se preparar pra sua prova teórica.",
          es: "Todo lo anterior viene de las propias páginas de My Licence de South Australia para motociclistas, más los reglamentos oficiales de tránsito del estado, vigentes al momento de escribir este artículo. Las tarifas y los detalles del programa Rider Safe en particular se revisan periódicamente, así que confírmalos directamente en mylicence.sa.gov.au antes de reservar tu curso. Si buscas las reglas de tránsito que aplican a cualquier conductor de South Australia, mira la otra guía de KangaLearner sobre conducir en SA, y usa la sección Aprender y las preguntas de práctica de SA de KangaLearner para prepararte para tu examen teórico."
        }
      }
    ]
  },
  {
    slug: "sa-common-driving-mistakes-guide",
    icon: "safety",
    state: "SA",
    published: false,
    publishedAt: "2026-08-11",
    readingMinutes: 7,
    title: {
      en: "Common driving mistakes in South Australia: give way, lanes and indicators",
      pt: "Erros comuns ao dirigir na South Australia: ceder passagem, faixas e seta",
      es: "Errores comunes al conducir en South Australia: ceder el paso, carriles e intermitente"
    },
    excerpt: {
      en: "South Australia's own Road Rules Refresher singles out give way rules, slip lanes and lane changes as the ones drivers get wrong most. Here is what it actually says, mistake by mistake.",
      pt: "O próprio Road Rules Refresher da South Australia aponta as regras de ceder passagem, faixas de entrada e troca de faixa como as que os motoristas mais erram. Veja o que ele realmente diz, erro por erro.",
      es: "El propio Road Rules Refresher de South Australia señala las reglas de ceder el paso, los carriles de incorporación y los cambios de carril como las que más se equivocan los conductores. Esto es lo que realmente dice, error por error."
    },
    sourceLabel: {
      en: "My Licence South Australia, Road Rules Refresher",
      pt: "My Licence South Australia, Road Rules Refresher",
      es: "My Licence South Australia, Road Rules Refresher"
    },
    sourceUrl: "https://www.mylicence.sa.gov.au/road-rules/road-rules-pocket-guide",
    body: [
      {
        type: "paragraph",
        text: {
          en: "The Department for Infrastructure and Transport publishes a Road Rules Refresher through My Licence, South Australia's official driver licensing website. It is aimed at drivers who already think they know the rules, and it flags give way situations around slip lanes, cyclists, pedestrians and motorcyclists, plus lane changes, as some of the rules people get wrong most often. This post goes through exactly those misunderstood rules, plus a few other mistakes that show up in South Australia's own official material but rarely make it onto a newcomer's mental checklist.",
          pt: "O Department for Infrastructure and Transport publica um Road Rules Refresher pelo My Licence, o site oficial de licenciamento de motoristas da South Australia. Ele é voltado para quem já acha que conhece as regras, e aponta situações de ceder passagem em faixas de entrada (slip lanes), ciclistas, pedestres e motociclistas, além da troca de faixa, como algumas das regras que as pessoas mais erram. Este post percorre exatamente essas regras mal compreendidas, além de alguns outros erros que aparecem no próprio material oficial da South Australia, mas raramente entram na lista mental de quem chega.",
          es: "El Department for Infrastructure and Transport publica una Road Rules Refresher a través de My Licence, el sitio oficial de licencias de conducir de South Australia. Está dirigida a conductores que ya creen conocer las reglas, y señala situaciones de ceder el paso en carriles de incorporación (slip lanes), ciclistas, peatones y motociclistas, además de los cambios de carril, como algunas de las reglas en las que la gente más se equivoca. Este post recorre exactamente esas reglas mal entendidas, además de otros errores que aparecen en el propio material oficial de South Australia, pero rara vez entran en la lista mental de quien recién llega."
        }
      },
      {
        type: "heading",
        text: {
          en: "The myth of right of way",
          pt: "O mito do direito de passagem",
          es: "El mito del derecho de paso"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "The Refresher opens with a blunt line: there is no such thing as having the right of way. Every driver has a duty to give way in specific situations, and even when you are not the one required to give way, you still have to slow down, or stop if needed, to avoid a collision. The guide makes the same point about signs: a STOP sign is not more powerful than a GIVE WAY sign. Neither one hands you priority over anyone else. At a GIVE WAY sign you are allowed to keep moving only if there is no danger of colliding with another vehicle, pedestrian or cyclist, and even then you must slow down and be ready to stop.",
          pt: "O Refresher começa com uma frase direta: não existe o chamado direito de passagem. Todo motorista tem o dever de ceder passagem em situações específicas, e mesmo quando você não é quem precisa ceder, ainda assim tem que reduzir a velocidade, ou parar se for necessário, para evitar uma colisão. O guia faz o mesmo ponto sobre as placas: uma placa de PARE não é mais poderosa que uma placa de DÊ A PREFERÊNCIA. Nenhuma das duas te dá prioridade sobre ninguém. Numa placa de DÊ A PREFERÊNCIA você só pode seguir em frente se não houver risco de colidir com outro veículo, pedestre ou ciclista, e mesmo assim precisa reduzir a velocidade e estar pronto para parar.",
          es: "El Refresher empieza con una frase directa: no existe eso que llaman derecho de paso. Todo conductor tiene el deber de ceder el paso en situaciones específicas, e incluso cuando no eres tú quien debe ceder, igual tienes que reducir la velocidad, o detenerte si hace falta, para evitar una colisión. La guía hace el mismo punto sobre las señales: una señal de PARE no es más poderosa que una señal de CEDA EL PASO. Ninguna de las dos te da prioridad sobre nadie. En una señal de CEDA EL PASO solo puedes seguir si no hay riesgo de chocar con otro vehículo, peatón o ciclista, y aun así debes reducir la velocidad y estar listo para detenerte."
        }
      },
      {
        type: "heading",
        text: {
          en: "Two give way signs at the same intersection",
          pt: "Duas placas de dê a preferência no mesmo cruzamento",
          es: "Dos señales de ceda el paso en el mismo cruce"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Picture two drivers arriving at an intersection from different roads, each facing their own GIVE WAY sign. Both first have to give way to any traffic already on the priority road. Once that is clear, they still have to give way to each other using the normal priority rules, for example a driver turning right across the path of another car must give way to that car, even though a moment earlier both of them were sitting at an identical sign. Facing a GIVE WAY sign does not cancel your other give way duties, it just adds to them.",
          pt: "Imagine dois motoristas chegando a um cruzamento por vias diferentes, cada um com sua própria placa de dê a preferência. Os dois primeiro precisam ceder passagem para qualquer tráfego que já esteja na via principal. Depois disso, ainda precisam ceder passagem um ao outro seguindo as regras normais de prioridade, por exemplo, um motorista virando à direita cruzando o caminho de outro carro precisa ceder passagem para esse carro, mesmo que um instante antes os dois estivessem parados na mesma placa. Estar diante de uma placa de dê a preferência não cancela suas outras obrigações de ceder passagem, só soma a elas.",
          es: "Imagina a dos conductores que llegan a un cruce por vías diferentes, cada uno frente a su propia señal de ceda el paso. Los dos primero deben ceder el paso a cualquier tráfico que ya esté en la vía principal. Después de eso, todavía deben ceder el paso entre ellos siguiendo las reglas normales de prioridad, por ejemplo, un conductor que gira a la derecha cruzando el camino de otro auto debe cederle el paso a ese auto, aunque un momento antes los dos estuvieran frente a la misma señal. Estar frente a una señal de ceda el paso no cancela tus otras obligaciones de ceder el paso, solo se suman a ellas."
        }
      },
      {
        type: "heading",
        text: {
          en: "T-intersections and slip lanes",
          pt: "Cruzamentos em T e faixas de entrada (slip lanes)",
          es: "Intersecciones en T y carriles de incorporación (slip lanes)"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "If you are on a road that ends at a T-intersection, you must give way to all traffic on the road you are joining, in both directions, no matter who reaches the intersection first.",
            pt: "Se você está numa via que termina num cruzamento em T, precisa ceder passagem para todo o tráfego da via em que você está entrando, nos dois sentidos, não importa quem chegue primeiro ao cruzamento.",
            es: "Si estás en una vía que termina en una intersección en T, debes ceder el paso a todo el tráfico de la vía a la que te estás incorporando, en ambos sentidos, sin importar quién llegue primero a la intersección."
          },
          {
            en: "If you take a slip lane, the dedicated lane for a left turn that bypasses the main intersection, you do not automatically have priority just because there is no sign or stop line. You must give way to the traffic already on the road you are merging into, and to any pedestrians or cyclists who might be crossing the slip lane.",
            pt: "Se você pega uma faixa de entrada (slip lane), a faixa dedicada para conversão à esquerda que contorna o cruzamento principal, você não tem prioridade automática só porque não há placa ou linha de parada ali. Você precisa ceder passagem para o tráfego que já está na via em que está entrando, e para qualquer pedestre ou ciclista que esteja cruzando a faixa de entrada.",
            es: "Si tomas un carril de incorporación (slip lane), el carril dedicado para girar a la izquierda que evita la intersección principal, no tienes prioridad automática solo porque no haya señal ni línea de detención ahí. Debes ceder el paso al tráfico que ya está en la vía a la que te estás incorporando, y a cualquier peatón o ciclista que pueda estar cruzando el carril de incorporación."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Lane and indicator mistakes",
          pt: "Erros de faixa e de seta",
          es: "Errores de carril e intermitente"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "Keep left unless overtaking applies on any road signed above 80 km/h, or wherever a Keep Left Unless Overtaking sign is posted, not only on freeways. You may use the right lane to overtake, to turn right while signalling, to get around an obstruction, when the other lanes are congested, or when you are in a lane meant for a special purpose, such as a bus lane you are allowed to use.",
            pt: "A regra de manter-se à esquerda, salvo para ultrapassar, vale em qualquer via sinalizada acima de 80 km/h, ou onde houver placa de Keep Left Unless Overtaking, não só em freeways. Você pode usar a faixa da direita para ultrapassar, para virar à direita sinalizando, para desviar de um obstáculo, quando as outras faixas estiverem congestionadas, ou quando estiver numa faixa com finalidade especial, como uma faixa de ônibus que você tenha permissão de usar.",
            es: "La regla de mantenerse a la izquierda salvo para adelantar aplica en cualquier vía señalizada por encima de 80 km/h, o donde haya un cartel de Keep Left Unless Overtaking, no solo en autopistas. Puedes usar el carril derecho para adelantar, para girar a la derecha mientras señalizas, para esquivar un obstáculo, cuando los otros carriles estén congestionados, o cuando estés en un carril con un fin especial, como un carril de autobús que tengas permitido usar."
          },
          {
            en: "Indicating does not give you priority. My Licence is explicit that giving a signal does not mean other road users have to give way to you, or that you are free to change direction. You still have to check first that it is actually safe.",
            pt: "Usar a seta não te dá prioridade. O My Licence é claro: dar sinal não significa que os outros motoristas têm que ceder passagem para você, nem que você já pode mudar de direção. Você ainda precisa checar antes se está realmente seguro.",
            es: "Usar el intermitente no te da prioridad. My Licence es claro: dar la señal no significa que los demás conductores tengan que cederte el paso, ni que ya puedes cambiar de dirección. Todavía tienes que comprobar antes que realmente es seguro."
          },
          {
            en: "On a roundabout, the left indicator for your exit is not meant to go on only when you reach it. The rule is to signal left as soon as you pass the exit before the one you want, so traffic waiting to enter can see that you are about to leave.",
            pt: "Numa rotatória, a seta esquerda para a sua saída não deve ser ligada só quando você chega nela. A regra é sinalizar à esquerda assim que você passar pela saída anterior à que você quer, para que quem está esperando para entrar veja que você está prestes a sair.",
            es: "En una rotonda, el intermitente izquierdo para tu salida no debe encenderse solo cuando llegas a ella. La regla es señalizar a la izquierda apenas pases la salida anterior a la que quieres tomar, para que quienes esperan para entrar vean que estás a punto de salir."
          },
          {
            en: "Pulling away from a stationary position at the kerb needs at least five seconds of signalling before you move, specifically because a cyclist coming up on your left may not otherwise see you in time. Once you have finished turning or changing lanes, cancel the indicator immediately, leaving it flashing afterwards is a rule breach, not just bad manners.",
            pt: "Sair de uma posição parada no meio-fio precisa de pelo menos cinco segundos de sinalização antes de você se mover, especialmente porque um ciclista vindo pela sua esquerda pode não te ver a tempo. Depois de terminar a conversão ou a troca de faixa, desligue a seta imediatamente, deixá-la piscando depois é uma infração, não só falta de educação.",
            es: "Salir de una posición detenida junto a la acera necesita al menos cinco segundos de señalización antes de moverte, especialmente porque un ciclista que viene por tu izquierda puede no verte a tiempo. Después de terminar el giro o el cambio de carril, apaga el intermitente de inmediato, dejarlo parpadeando después es una infracción, no solo falta de educación."
          },
          {
            en: "Changing lanes is a give way situation too, you must give way to any vehicle already travelling in the lane you are moving into. The indicator alone does not clear your path.",
            pt: "Trocar de faixa também é uma situação de ceder passagem, você precisa ceder passagem para qualquer veículo que já esteja na faixa para onde você está indo. A seta sozinha não libera o caminho.",
            es: "Cambiar de carril también es una situación de ceder el paso, debes ceder el paso a cualquier vehículo que ya esté circulando en el carril al que te estás cambiando. El intermitente por sí solo no despeja el camino."
          }
        ]
      },
      {
        type: "heading",
        text: {
          en: "Trams: a hazard many newcomers do not expect",
          pt: "Bondes: um risco que muita gente que chega não espera",
          es: "Tranvías: un riesgo que muchos recién llegados no esperan"
        }
      },
      {
        type: "paragraph",
        text: {
          en: "Adelaide has trams, and if you have never driven around them before, the way they behave is not intuitive. My Licence's advice is direct: trams travel in both directions, they are deceptively fast and quiet, and they cannot swerve to avoid you. A tram travelling at 50 km/h needs about 70 metres, roughly two tram lengths, to stop. Never try to overtake a tram, keep out of the tram lane and off the tracks, and never park across them. Where a tram stops to pick up or drop off passengers, you must stop and give way to any pedestrian crossing between the edge of the road and the stationary tram.",
          pt: "Adelaide tem bondes, e se você nunca dirigiu perto deles antes, o jeito como eles se comportam não é intuitivo. A orientação do My Licence é direta: bondes andam nos dois sentidos, são enganosamente rápidos e silenciosos, e não conseguem desviar de você. Um bonde a 50 km/h precisa de cerca de 70 metros, mais ou menos dois comprimentos de bonde, para parar. Nunca tente ultrapassar um bonde, fique fora da faixa dele e dos trilhos, e nunca estacione sobre eles. Sempre que um bonde estiver parado para embarque ou desembarque de passageiros, você precisa parar e ceder passagem para qualquer pedestre atravessando entre a borda da via e o bonde parado.",
          es: "Adelaide tiene tranvías, y si nunca has conducido cerca de ellos antes, la forma en que se comportan no es intuitiva. El consejo de My Licence es directo: los tranvías circulan en ambos sentidos, son engañosamente rápidos y silenciosos, y no pueden esquivarte. Un tranvía a 50 km/h necesita unos 70 metros, más o menos dos largos de tranvía, para detenerse. Nunca intentes adelantar a un tranvía, mantente fuera de su carril y de las vías, y nunca te estaciones sobre ellas. Siempre que un tranvía esté detenido para que suban o bajen pasajeros, debes detenerte y ceder el paso a cualquier peatón que cruce entre el borde de la vía y el tranvía detenido."
        }
      },
      {
        type: "heading",
        text: {
          en: "Level crossings and a few other give way situations",
          pt: "Passagens de nível e mais algumas situações de ceder passagem",
          es: "Pasos a nivel y algunas otras situaciones de ceder el paso"
        }
      },
      {
        type: "list",
        items: [
          {
            en: "South Australia has 696 railway level crossings on public roads. A train travelling at 90 km/h needs around 420 metres to stop, so do not assume a train can stop for you. The official advice is to make sure both rail lines are clear for a long distance before you cross, not only the direction a train sound seems to be coming from.",
            pt: "A South Australia tem 696 passagens de nível em vias públicas. Um trem a 90 km/h precisa de cerca de 420 metros para parar, então não presuma que um trem vai conseguir parar por você. A orientação oficial é garantir que as duas linhas férreas estejam livres por uma boa distância antes de atravessar, não só a direção de onde o som do trem parece vir.",
            es: "South Australia tiene 696 pasos a nivel en vías públicas. Un tren a 90 km/h necesita unos 420 metros para detenerse, así que no supongas que un tren podrá parar por ti. La recomendación oficial es asegurarte de que ambas vías del ferrocarril estén despejadas por una buena distancia antes de cruzar, no solo la dirección de la que parece venir el sonido del tren."
          },
          {
            en: "In a built-up area, if a bus signals to pull out from a kerbside stop and has a give way sign displayed, you must give way to it. This applies if you are in the lane next to the kerb, and also in the next lane over if that lane is blocked or is a bicycle lane.",
            pt: "Numa área urbanizada, se um ônibus sinalizar que vai sair de um ponto junto ao meio-fio e estiver com a placa de dê a preferência exibida, você precisa ceder passagem para ele. Isso vale se você está na faixa junto ao meio-fio, e também na faixa seguinte se essa primeira estiver bloqueada ou for uma ciclofaixa.",
            es: "En una zona urbanizada, si un autobús señaliza que va a salir de una parada junto a la acera y tiene mostrada la señal de ceda el paso, debes cederle el paso. Esto aplica si estás en el carril junto a la acera, y también en el siguiente carril si ese primer carril está bloqueado o es un carril para bicicletas."
          },
          {
            en: "When overtaking a cyclist, leave at least 1 metre of space at speeds up to 60 km/h, and 1.5 metres above that. You are allowed to cross a single continuous line to do it safely, including briefly driving over a painted island for up to 50 metres, if that is what it takes to give a cyclist enough room.",
            pt: "Ao ultrapassar um ciclista, deixe pelo menos 1 metro de espaço em velocidades até 60 km/h, e 1,5 metros acima disso. Você pode cruzar uma linha contínua única para fazer isso com segurança, inclusive passando brevemente sobre uma ilha pintada por até 50 metros, se for isso que for preciso para dar espaço suficiente ao ciclista.",
            es: "Al adelantar a un ciclista, deja al menos 1 metro de espacio en velocidades de hasta 60 km/h, y 1,5 metros por encima de eso. Puedes cruzar una línea continua única para hacerlo con seguridad, incluso pasando brevemente sobre una isla pintada por hasta 50 metros, si eso es lo que hace falta para darle al ciclista espacio suficiente."
          }
        ]
      },
      {
        type: "paragraph",
        text: {
          en: "All of this comes from South Australia's own Road Rules Refresher and Driver's Handbook, published through My Licence, not from general driving folklore. It will not replace the full handbook, so use KangaLearner's Learn section and SA practice questions to study everything else the test can ask, and treat this post as the shortlist of traps worth double checking before your test.",
          pt: "Tudo isso vem do próprio Road Rules Refresher e do Driver's Handbook da South Australia, publicados pelo My Licence, não de crenças populares sobre direção. Isso não substitui o manual completo, então use a seção Aprender e as perguntas de prática de SA do KangaLearner para estudar todo o resto que a prova pode cobrar, e trate este post como a lista rápida de armadilhas que vale a pena revisar antes da sua prova.",
          es: "Todo esto viene del propio Road Rules Refresher y del Driver's Handbook de South Australia, publicados a través de My Licence, no de creencias populares sobre el manejo. Esto no reemplaza el manual completo, así que usa la sección Aprender y las preguntas de práctica de SA de KangaLearner para estudiar todo lo demás que el examen puede preguntar, y trata este post como la lista rápida de trampas que vale la pena repasar antes de tu examen."
        }
      }
    ]
  }
];

/** Live posts only — draft posts for states without a launched question bank stay out of every public surface. */
export const PUBLISHED_BLOG_POSTS: BlogPost[] = BLOG_POSTS.filter((p) => p.published);

export function findBlogPost(slug: string): BlogPost | undefined {
  return PUBLISHED_BLOG_POSTS.find((p) => p.slug === slug);
}

/** States that actually have at least one published post, in BLOG_POSTS order (dedup). */
export function getBlogStates(): AuStateCode[] {
  return Array.from(new Set(PUBLISHED_BLOG_POSTS.map((p) => p.state)));
}
