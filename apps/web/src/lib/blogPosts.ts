import type { UiLang } from "@/lib/i18n";
import type { IconName } from "@/components/icons";

export type BlogBlock =
  | { type: "paragraph"; text: Record<UiLang, string> }
  | { type: "heading"; text: Record<UiLang, string> }
  | { type: "list"; items: Record<UiLang, string>[] };

export interface BlogPost {
  slug: string;
  icon: IconName;
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
  }
];

export function findBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
