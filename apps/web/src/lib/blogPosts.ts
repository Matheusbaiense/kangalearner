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
  }
];

export function findBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** States that actually have at least one post, in BLOG_POSTS order (dedup). */
export function getBlogStates(): AuStateCode[] {
  return Array.from(new Set(BLOG_POSTS.map((p) => p.state)));
}
