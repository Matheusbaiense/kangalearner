"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BookOpen,
  Bot,
  CalendarCheck,
  Car,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  ExternalLink,
  GraduationCap,
  Languages,
  MapPinned,
  Moon,
  Route,
  ShieldCheck,
  Smartphone,
  Users
} from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import type { UiLang } from "@/lib/i18n";
import { useStateCopy } from "@/lib/stateCopy";
import { getStateResources, type StateResources } from "@/lib/stateResources";
import type { StateProfile } from "@kanga/core";

type Localized = Record<UiLang, string>;

type ResourceCategory = "official" | "booking" | "study" | "community" | "partner";

type Resource = {
  name: Localized;
  desc: Localized;
  url: string;
  category: ResourceCategory;
  Icon: LucideIcon;
};

type EcosystemItem = {
  title: Localized;
  body: Localized;
  status: Localized;
  href?: string;
  Icon: LucideIcon;
};

/**
 * Official links rendered for the selected jurisdiction. Copy uses {tokens}
 * resolved by useStateCopy; URLs and hour figures come from stateResources.
 */
function buildOfficialResources(profile: StateProfile, res: StateResources): Resource[] {
  const list: Resource[] = [
    {
      name: { en: "{handbook}", pt: "{handbook}", es: "{handbook}" },
      desc: {
        en: "The official {state} handbook for road rules, safe driving and learner preparation.",
        pt: "O manual oficial de {state} para regras de trânsito, direção segura e preparação de learners.",
        es: "El manual oficial de {state} para reglas viales, conducción segura y preparación learner."
      },
      url: profile.handbookUrl,
      category: "official",
      Icon: BookOpen
    },
    {
      name: {
        en: "Official practice test",
        pt: "Prova de prática oficial",
        es: "Examen de práctica oficial"
      },
      desc: {
        en: "The {authority} practice questions and resources for the {testName}.",
        pt: "As questões de prática e recursos do {authority} para o {testName}.",
        es: "Las preguntas de práctica y recursos de {authority} para el {testName}."
      },
      url: res.links.practiceTest,
      category: "study",
      Icon: ClipboardCheck
    },
    {
      name: {
        en: "Get your licence, step by step",
        pt: "Tire sua carteira, passo a passo",
        es: "Obtén tu licencia, paso a paso"
      },
      desc: {
        en: "The official {authority} pathway: eligibility, fees, bookings and every stage to your Ps.",
        pt: "O caminho oficial do {authority}: elegibilidade, taxas, agendamentos e cada etapa até os Ps.",
        es: "La ruta oficial de {authority}: elegibilidad, tarifas, reservas y cada etapa hasta los Ps."
      },
      url: res.links.steps,
      category: "official",
      Icon: Route
    }
  ];

  if (res.links.logbook) {
    list.push({
      name: { en: "Learner log book", pt: "Logbook do learner", es: "Registro del learner" },
      desc: {
        en: "The official log book rules and tools for recording supervised driving hours in {state}.",
        pt: "As regras e ferramentas oficiais do logbook para registrar horas supervisionadas em {state}.",
        es: "Las reglas y herramientas oficiales del registro de horas supervisadas en {state}."
      },
      url: res.links.logbook,
      category: "official",
      Icon: Smartphone
    });
  }

  if (res.links.hazard && res.hazardTestName) {
    list.push({
      name: {
        en: res.hazardTestName,
        pt: res.hazardTestName,
        es: res.hazardTestName
      },
      desc: {
        en: "The hazard test in the {state} learner stage: what it is and how to prepare.",
        pt: "O teste de percepção de risco na etapa learner de {state}: o que é e como se preparar.",
        es: "La prueba de percepción de peligros en la etapa learner de {state}: qué es y cómo prepararte."
      },
      url: res.links.hazard,
      category: "official",
      Icon: AlertTriangle
    });
  }

  if (res.links.booking) {
    list.push({
      name: { en: "Booking portal", pt: "Portal de agendamento", es: "Portal de reservas" },
      desc: {
        en: "The official {authority} portal for bookings, payments and licence services.",
        pt: "O portal oficial do {authority} para agendamentos, pagamentos e serviços de carteira.",
        es: "El portal oficial de {authority} para reservas, pagos y servicios de licencia."
      },
      url: res.links.booking,
      category: "booking",
      Icon: CalendarCheck
    });
  }

  if (profile.code === "WA") {
    list.push({
      name: {
        en: "RAC learner licence guide",
        pt: "Guia RAC para learner licence",
        es: "Guía RAC para learner licence"
      },
      desc: {
        en: "Plain-English guide from RAC WA for learners and supervising drivers.",
        pt: "Guia em linguagem simples da RAC WA para learners e supervisores.",
        es: "Guía en lenguaje simple de RAC WA para learners y supervisores."
      },
      url: "https://www.rac.com.au/cars-transport/info/learner-licence-in-wa",
      category: "partner",
      Icon: Car
    });
  }

  return list;
}

type JourneyStep = {
  step: string;
  title: Localized;
  body: Localized;
  href?: string;
  Icon: LucideIcon;
};

function buildJourney(res: StateResources, lang: UiLang): JourneyStep[] {
  const steps: JourneyStep[] = [
    {
      step: "01",
      title: {
        en: "Pass the {testName}",
        pt: "Passe no {testName}",
        es: "Aprueba el {testName}"
      },
      body: {
        en: "Use KangaLearner for multilingual practice, then confirm requirements with {authority} before booking.",
        pt: "Use o KangaLearner para praticar em vários idiomas e confirme os requisitos no {authority} antes de agendar.",
        es: "Usa KangaLearner para practicar en varios idiomas y confirma los requisitos en {authority} antes de reservar."
      },
      href: "/mock-test",
      Icon: GraduationCap
    },
    {
      step: "02",
      title: {
        en: "Learn to drive and log hours",
        pt: "Aprenda a dirigir e registre horas",
        es: "Aprende a conducir y registra horas"
      },
      body: res.hours
        ? {
            en:
              (res.hours.appliesUnder
                ? `If you are under ${res.hours.appliesUnder}, {state} requires at least ${res.hours.total} supervised driving hours, including ${res.hours.night} at night.`
                : `{state} requires at least ${res.hours.total} supervised driving hours, including ${res.hours.night} at night.`) +
              (res.hours.note ? ` ${res.hours.note.en}` : ""),
            pt:
              (res.hours.appliesUnder
                ? `Se você tem menos de ${res.hours.appliesUnder} anos, {state} exige pelo menos ${res.hours.total} horas supervisionadas, incluindo ${res.hours.night} à noite.`
                : `{state} exige pelo menos ${res.hours.total} horas supervisionadas, incluindo ${res.hours.night} à noite.`) +
              (res.hours.note ? ` ${res.hours.note.pt}` : ""),
            es:
              (res.hours.appliesUnder
                ? `Si tienes menos de ${res.hours.appliesUnder} años, {state} exige al menos ${res.hours.total} horas supervisadas, incluyendo ${res.hours.night} de noche.`
                : `{state} exige al menos ${res.hours.total} horas supervisadas, incluyendo ${res.hours.night} de noche.`) +
              (res.hours.note ? ` ${res.hours.note.es}` : "")
          }
        : {
            en: "The NT sets no minimum supervised hours, but the MVR recommends as much supervised practice as possible before the driving test.",
            pt: "O NT não define um mínimo de horas supervisionadas, mas o MVR recomenda o máximo possível de prática supervisionada antes do teste.",
            es: "El NT no fija un mínimo de horas supervisadas, pero el MVR recomienda toda la práctica supervisada posible antes del examen."
          },
      href: res.links.logbook ?? res.links.steps,
      Icon: Clock
    }
  ];

  if (res.hazardTestName) {
    steps.push({
      step: "03",
      title: {
        en: `Prepare for the ${res.hazardTestName}`,
        pt: `Prepare-se para o ${res.hazardTestName}`,
        es: `Prepárate para el ${res.hazardTestName}`
      },
      body: {
        en: "The hazard test is a separate step in {state}. The official sample tests stay with {authority}.",
        pt: "O teste de percepção de risco é uma etapa separada em {state}. Os testes oficiais ficam com o {authority}.",
        es: "La prueba de percepción de peligros es una etapa separada en {state}. Las pruebas oficiales están en {authority}."
      },
      href: res.links.hazard ?? res.links.steps,
      Icon: ShieldCheck
    });
  }

  steps.push({
    step: String(steps.length + 1).padStart(2, "0"),
    title: {
      en: `Book and pass the ${res.practicalTestName}`,
      pt: `Agende e passe no ${res.practicalTestName}`,
      es: `Reserva y aprueba el ${res.practicalTestName}`
    },
    body: {
      en: "Use the official {authority} guidance for vehicle standards, booking rules and what happens on the day.",
      pt: "Use a orientação oficial do {authority} para padrões do veículo, regras de agendamento e o que acontece no dia.",
      es: "Usa la guía oficial de {authority} para normas del vehículo, reglas de reserva y lo que ocurre el día."
    },
    href: res.links.steps,
    Icon: Route
  });

  void lang;
  return steps;
}

const ECOSYSTEM: EcosystemItem[] = [
  {
    title: { en: "Kanga Learn", pt: "Kanga Learn", es: "Kanga Learn" },
    body: {
      en: "Theory, practice questions, topic explanations and mock tests.",
      pt: "Teoria, perguntas de prática, explicações por tópico e simulados.",
      es: "Teoría, preguntas de práctica, explicaciones por tema y simulacros."
    },
    status: { en: "Available now", pt: "Disponível agora", es: "Disponible ahora" },
    href: "/practice",
    Icon: BookOpen
  },
  {
    title: { en: "Kanga Mobile", pt: "Kanga Mobile", es: "Kanga Mobile" },
    body: {
      en: "Offline-first native app for daily study, saved questions and future sync.",
      pt: "App nativo offline-first para estudo diário, perguntas salvas e sync futuro.",
      es: "App nativa offline-first para estudio diario, preguntas guardadas y sync futuro."
    },
    status: { en: "In progress", pt: "Em progresso", es: "En progreso" },
    Icon: Smartphone
  },
  {
    title: { en: "Kanga Drive", pt: "Kanga Drive", es: "Kanga Drive" },
    body: {
      en: "Future hazard-test and driving-test prep, licence journey checklist and driving-hour companion.",
      pt: "Futuro preparo para hazard test e prova prática, checklist da jornada e companion de horas dirigidas.",
      es: "Futura preparación para hazard test y examen práctico, checklist del recorrido y companion de horas."
    },
    status: { en: "Next layer", pt: "Próxima camada", es: "Próxima capa" },
    Icon: Car
  },
  {
    title: { en: "Kanga Connect", pt: "Kanga Connect", es: "Kanga Connect" },
    body: {
      en: "Future instructor discovery, community support and trusted local services.",
      pt: "Futura busca de instrutores, suporte de comunidade e serviços locais confiáveis.",
      es: "Futura búsqueda de instructores, apoyo comunitario y servicios locales confiables."
    },
    status: { en: "Future", pt: "Futuro", es: "Futuro" },
    Icon: Users
  },
  {
    title: { en: "Kanga Tutor", pt: "Kanga Tutor", es: "Kanga Tutor" },
    body: {
      en: "Future AI explanations in plain English, Portuguese and Spanish.",
      pt: "Futuras explicações com IA em inglês simples, português e espanhol.",
      es: "Futuras explicaciones con IA en inglés simple, portugués y español."
    },
    status: { en: "Plugin ready", pt: "Plugin preparado", es: "Plugin preparado" },
    Icon: Bot
  }
];

/* Perth-based groups — only meaningful while WA is selected. */
const WA_COMMUNITY_LINKS: Resource[] = [
  {
    name: { en: "Brasileiros em Perth", pt: "Brasileiros em Perth", es: "Brasileiros em Perth" },
    desc: {
      en: "Portuguese-speaking community group in Perth.",
      pt: "Grupo de comunidade em português em Perth.",
      es: "Grupo comunitario en portugués en Perth."
    },
    url: "https://www.facebook.com/groups/BrasileirosPerth/",
    category: "community",
    Icon: Users
  },
  {
    name: { en: "Latinos in Perth", pt: "Latinos em Perth", es: "Latinos en Perth" },
    desc: {
      en: "Spanish-speaking community support and local questions.",
      pt: "Suporte de comunidade em espanhol e perguntas locais.",
      es: "Apoyo comunitario en español y preguntas locales."
    },
    url: "https://www.facebook.com/groups/latinosperth",
    category: "community",
    Icon: Languages
  },
  {
    name: { en: "Indians in Perth", pt: "Indianos em Perth", es: "Indios en Perth" },
    desc: {
      en: "Perth community group for Indian migrants.",
      pt: "Grupo de comunidade em Perth para imigrantes indianos.",
      es: "Grupo comunitario en Perth para inmigrantes indios."
    },
    url: "https://www.facebook.com/groups/indiansperth",
    category: "community",
    Icon: MapPinned
  }
];

/* Guided newcomer surfaces. WA-specific guides only show while WA is selected. */
const NEWCOMER_LINKS: {
  href: string;
  icon: string;
  waOnly?: boolean;
  label: Localized;
  desc: Localized;
}[] = [
  {
    href: "/today",
    icon: "📅",
    label: { en: "Today", pt: "Hoje", es: "Hoy" },
    desc: {
      en: "Your progress + next action",
      pt: "Seu progresso + próxima ação",
      es: "Tu progreso + próxima acción"
    }
  },
  {
    href: "/journey",
    icon: "🗺️",
    label: { en: "Licence journey", pt: "Jornada da licença", es: "Recorrido de licencia" },
    desc: {
      en: "Learner → P1 → P2 → full",
      pt: "Learner → P1 → P2 → completa",
      es: "Learner → P1 → P2 → completa"
    }
  },
  {
    href: "/overseas-licence",
    icon: "🌏",
    label: { en: "Overseas licence", pt: "Licença estrangeira", es: "Licencia extranjera" },
    desc: {
      en: "Drive in {stateCode} with a foreign licence",
      pt: "Dirigir em {stateCode} com licença de fora",
      es: "Conducir en {stateCode} con licencia de fuera"
    }
  },
  {
    href: "/quick-quiz",
    icon: "⚡",
    label: { en: "Quick quiz", pt: "Quiz rápido", es: "Quiz rápido" },
    desc: {
      en: "10 questions, no account",
      pt: "10 questões, sem conta",
      es: "10 preguntas, sin cuenta"
    }
  },
  {
    href: "/hpt",
    icon: "👁️",
    waOnly: true,
    label: { en: "HPT prep", pt: "Preparação HPT", es: "Preparación HPT" },
    desc: {
      en: "Hazard Perception Test",
      pt: "Teste de Percepção de Risco",
      es: "Test de Percepción de Peligros"
    }
  },
  {
    href: "/pda",
    icon: "🚗",
    waOnly: true,
    label: { en: "PDA prep", pt: "Preparação PDA", es: "Preparación PDA" },
    desc: {
      en: "Practical Driving Assessment",
      pt: "Avaliação Prática de Direção",
      es: "Evaluación Práctica de Conducción"
    }
  },
  {
    href: "/supervisor",
    icon: "🧑‍🏫",
    label: {
      en: "Supervisor companion",
      pt: "Companheiro do supervisor",
      es: "Compañero del supervisor"
    },
    desc: {
      en: "Coaching a learner",
      pt: "Ensinando um learner",
      es: "Enseñando a un learner"
    }
  },
  {
    href: "/eyesight-test",
    icon: "🔤",
    label: { en: "Eyesight check", pt: "Teste de visão", es: "Test de visión" },
    desc: {
      en: "Quick Snellen self-check",
      pt: "Autoteste Snellen rápido",
      es: "Autotest Snellen rápido"
    }
  },
  {
    href: "/confidence",
    icon: "💪",
    label: { en: "Driving confidence", pt: "Confiança ao volante", es: "Confianza al volante" },
    desc: {
      en: "Calm tips for nervous moments",
      pt: "Dicas calmas para o nervosismo",
      es: "Consejos calmados para los nervios"
    }
  }
];

const CATEGORY_BADGE: Record<ResourceCategory, { label: Localized; className: string }> = {
  official: {
    label: { en: "Official", pt: "Oficial", es: "Oficial" },
    className: "official"
  },
  booking: {
    label: { en: "Booking", pt: "Agendamento", es: "Reserva" },
    className: "booking"
  },
  study: {
    label: { en: "Study", pt: "Estudo", es: "Estudio" },
    className: "study"
  },
  community: {
    label: { en: "Community", pt: "Comunidade", es: "Comunidad" },
    className: "community"
  },
  partner: {
    label: { en: "Guide", pt: "Guia", es: "Guía" },
    className: "partner"
  }
};

const copy = {
  newcomerTitle: {
    en: "Your {stateCode} journey",
    pt: "Sua jornada em {stateCode}",
    es: "Tu recorrido en {stateCode}"
  },
  newcomerSub: {
    en: "Step-by-step guides for getting on the road in {state}.",
    pt: "Guias passo a passo para quem está começando a dirigir em {state}.",
    es: "Guías paso a paso para quien empieza a conducir en {state}."
  },
  statQuestions: {
    en: "questions in the {state} learner theory test",
    pt: "perguntas na prova teórica learner de {state}",
    es: "preguntas en el examen teórico learner de {state}"
  },
  statPass: {
    en: "correct answers needed to pass",
    pt: "respostas certas para passar",
    es: "respuestas correctas para aprobar"
  },
  statHours: {
    en: "supervised driving minimum where it applies",
    pt: "mínimo supervisionado quando exigido",
    es: "mínimo supervisado cuando aplica"
  },
  statHoursNone: {
    en: "no minimum supervised hours in the NT",
    pt: "sem mínimo de horas supervisionadas no NT",
    es: "sin mínimo de horas supervisadas en el NT"
  },
  statNight: {
    en: "night driving included in those hours",
    pt: "de condução noturna dentro dessas horas",
    es: "de conducción nocturna dentro de esas horas"
  },
  officialNote: {
    en: "KangaLearner helps you study and plan. It is not a government service; always confirm current rules, fees and eligibility with {authority}.",
    pt: "O KangaLearner ajuda você a estudar e se organizar. Não é um serviço do governo; confirme sempre regras, taxas e elegibilidade atuais com o {authority}.",
    es: "KangaLearner te ayuda a estudiar y organizarte. No es un servicio del gobierno; confirma siempre reglas, tarifas y elegibilidad actuales con {authority}."
  },
  journeyTitle: {
    en: "Your {stateCode} licence pathway",
    pt: "Sua jornada para a carteira em {stateCode}",
    es: "Tu camino hacia la licencia en {stateCode}"
  },
  journeySub: {
    en: "From learner theory to driving practice and the {stateCode} tests. Use this as a plain-language map, then follow the official source for the final rule.",
    pt: "Da prova teórica até a prática de direção e as provas de {stateCode}. Use isto como um mapa em linguagem simples e siga a fonte oficial para a regra final.",
    es: "Del examen teórico a la práctica de conducción y las pruebas de {stateCode}. Usa esto como mapa en lenguaje simple y sigue la fuente oficial para la regla final."
  },
  officialTitle: {
    en: "Official and trusted resources",
    pt: "Recursos oficiais e confiáveis",
    es: "Recursos oficiales y confiables"
  },
  officialSubtitle: {
    en: "Official {state} links, checked against {authority}.",
    pt: "Links oficiais de {state}, conferidos no {authority}.",
    es: "Enlaces oficiales de {state}, verificados con {authority}."
  },
  ecosystemTitle: {
    en: "The KangaLearner ecosystem",
    pt: "O ecossistema KangaLearner",
    es: "El ecosistema KangaLearner"
  },
  ecosystemSub: {
    en: "The product starts with learner theory, then expands into mobile study, driving preparation, community and trusted services.",
    pt: "O produto começa com a teoria de learner e expande para estudo mobile, preparo para dirigir, comunidade e serviços confiáveis.",
    es: "El producto empieza con la teoría learner y se expande a estudio móvil, preparación para conducir, comunidad y servicios confiables."
  },
  communityTitle: {
    en: "Community starting points",
    pt: "Pontos de partida na comunidade",
    es: "Puntos de partida en la comunidad"
  },
  communitySub: {
    en: "Community groups can help with local context, but they are not official legal sources.",
    pt: "Grupos de comunidade podem ajudar com contexto local, mas não são fontes legais oficiais.",
    es: "Los grupos comunitarios pueden ayudar con contexto local, pero no son fuentes legales oficiales."
  },
  checklistTitle: {
    en: "Before test day",
    pt: "Antes do dia da prova",
    es: "Antes del día del examen"
  },
  checklistItems: {
    en: [
      "Confirm current fees, booking details and ID requirements with {authority}.",
      "Practise all topics, then take at least one full 30-question mock test.",
      "Review wrong and saved questions instead of only doing new ones.",
      "Arrive early, rested and without relying on your phone in the test room."
    ],
    pt: [
      "Confirme taxas, detalhes do agendamento e documentos exigidos no {authority}.",
      "Pratique todos os tópicos e faça pelo menos um simulado completo de 30 perguntas.",
      "Revise erradas e salvas em vez de fazer apenas perguntas novas.",
      "Chegue cedo, descansado e sem depender do celular na sala da prova."
    ],
    es: [
      "Confirma tarifas, detalles de reserva y documentos requeridos en {authority}.",
      "Practica todos los temas y haz al menos un simulacro completo de 30 preguntas.",
      "Revisa preguntas incorrectas y guardadas en lugar de hacer solo nuevas.",
      "Llega temprano, descansado y sin depender del celular en la sala del examen."
    ]
  },
  open: { en: "Open", pt: "Abrir", es: "Abrir" },
  startPractice: { en: "Start practice", pt: "Começar prática", es: "Empezar práctica" },
  takeMock: { en: "Take a mock test", pt: "Fazer simulado", es: "Hacer simulacro" },
  learnMore: { en: "Learn more", pt: "Saiba mais", es: "Saber más" }
};

function ResourceCard({
  resource,
  lang,
  t
}: {
  resource: Resource;
  lang: UiLang;
  t: (c: Localized) => string;
}) {
  const badge = CATEGORY_BADGE[resource.category];

  return (
    <a className="resource-card" href={resource.url} target="_blank" rel="noopener noreferrer">
      <span className="resource-card-icon" aria-hidden="true">
        <resource.Icon size={22} strokeWidth={2} />
      </span>
      <span className={`resource-badge ${badge.className}`}>{badge.label[lang]}</span>
      <strong>{t(resource.name)}</strong>
      <p>{t(resource.desc)}</p>
      <span className="resource-open">
        {copy.open[lang]}
        <ExternalLink size={15} strokeWidth={2} aria-hidden="true" />
      </span>
    </a>
  );
}

export function ResourcesPageClient() {
  const { uiLang: lang, s } = useLang();
  const { profile, t, ts } = useStateCopy();
  const res = getStateResources(profile.code);

  const officialResources = buildOfficialResources(profile, res);
  const journey = buildJourney(res, lang);
  const newcomerLinks = NEWCOMER_LINKS.filter((n) => !n.waOnly || profile.code === "WA");

  const heroStats: { value: string; label: Localized; Icon: LucideIcon }[] = [
    { value: String(profile.totalQuestions), label: copy.statQuestions, Icon: ClipboardCheck },
    { value: String(profile.minCorrect), label: copy.statPass, Icon: CheckCircle2 },
    ...(res.hours
      ? [
          { value: `${res.hours.total}h`, label: copy.statHours, Icon: Clock },
          { value: `${res.hours.night}h`, label: copy.statNight, Icon: Moon }
        ]
      : [{ value: "—", label: copy.statHoursNone, Icon: Clock }])
  ];

  return (
    <main className="app-page resources-page">
      <div className="container section-pad">
        <section className="resources-hero">
          <div className="page-header resources-hero-copy">
            <p className="resources-kicker">{s.resourcesKicker}</p>
            <h1 className="page-title">{ts(s.resourcesTitleByState)}</h1>
            <p className="page-sub">{ts(s.resourcesSubByState)}</p>
            <div className="resources-hero-actions">
              <Link href="/practice" className="btn btn-primary">
                {copy.startPractice[lang]}
              </Link>
              <Link href="/mock-test" className="btn btn-ghost-light">
                {copy.takeMock[lang]}
              </Link>
            </div>
          </div>

          <div
            className="resources-stat-grid"
            aria-label={`${profile.name} learner licence key facts`}
          >
            {heroStats.map(({ value, label, Icon }, i) => (
              <div key={i} className="resources-stat">
                <Icon size={20} strokeWidth={2} aria-hidden="true" />
                <strong>{value}</strong>
                <span>{t(label)}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="resources-official-note">
          <ShieldCheck size={18} strokeWidth={2} aria-hidden="true" />
          <span>{t(copy.officialNote)}</span>
        </div>

        {/* Newcomer journey hub: guided surfaces (today, quiz, WA guides when WA is selected) */}
        <section className="resource-section">
          <div className="resource-section-head">
            <h2>{t(copy.newcomerTitle)}</h2>
            <p>{t(copy.newcomerSub)}</p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 12
            }}
          >
            {newcomerLinks.map((n) => (
              <Link key={n.href} href={n.href} className="overseas-country-card">
                <span style={{ fontSize: "var(--text-xl)" }} aria-hidden>
                  {n.icon}
                </span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <strong>{n.label[lang]}</strong>
                  <span style={{ fontSize: "var(--text-sm)", color: "var(--muted)" }}>
                    {t(n.desc)}
                  </span>
                </span>
                <span className="overseas-country-arrow" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="resource-section resource-section-panel">
          <div className="resource-section-head">
            <h2>{t(copy.journeyTitle)}</h2>
            <p>{t(copy.journeySub)}</p>
          </div>
          <div className="licence-journey-grid">
            {journey.map((item) => {
              const href = item.href ?? "#";
              const inner = (
                <>
                  <span className="journey-step-num">{item.step}</span>
                  <span className="journey-step-icon" aria-hidden="true">
                    <item.Icon size={22} strokeWidth={2} />
                  </span>
                  <strong>{t(item.title)}</strong>
                  <p>{t(item.body)}</p>
                  <span className="resource-open">
                    {href.startsWith("/") ? copy.learnMore[lang] : copy.open[lang]}
                    {href.startsWith("/") ? null : (
                      <ExternalLink size={15} strokeWidth={2} aria-hidden="true" />
                    )}
                  </span>
                </>
              );

              return href.startsWith("/") ? (
                <Link key={item.step} className="journey-step-card" href={href}>
                  {inner}
                </Link>
              ) : (
                <a
                  key={item.step}
                  className="journey-step-card"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              );
            })}
          </div>
        </section>

        <section className="resource-section">
          <div className="resource-section-head">
            <h2>{t(copy.officialTitle)}</h2>
            <p>{t(copy.officialSubtitle)}</p>
          </div>
          <div className="resource-card-grid">
            {officialResources.map((resource) => (
              <ResourceCard
                key={`${resource.category}-${resource.name.en}`}
                resource={resource}
                lang={lang}
                t={t}
              />
            ))}
          </div>
        </section>

        <section className="resource-section resource-section-panel">
          <div className="resource-section-head">
            <h2>{t(copy.ecosystemTitle)}</h2>
            <p>{t(copy.ecosystemSub)}</p>
          </div>
          <div className="ecosystem-grid">
            {ECOSYSTEM.map((item) => {
              const content = (
                <>
                  <span className="ecosystem-icon" aria-hidden="true">
                    <item.Icon size={22} strokeWidth={2} />
                  </span>
                  <span className="ecosystem-status">{item.status[lang]}</span>
                  <strong>{item.title[lang]}</strong>
                  <p>{item.body[lang]}</p>
                </>
              );

              return item.href ? (
                <Link key={item.title.en} href={item.href} className="ecosystem-card available">
                  {content}
                </Link>
              ) : (
                <article key={item.title.en} className="ecosystem-card">
                  {content}
                </article>
              );
            })}
          </div>
        </section>

        {profile.code === "WA" && (
          <section className="resource-section">
            <div className="resource-section-head">
              <h2>{t(copy.communityTitle)}</h2>
              <p>{t(copy.communitySub)}</p>
            </div>
            <div className="resource-card-grid compact">
              {WA_COMMUNITY_LINKS.map((resource) => (
                <ResourceCard
                  key={`${resource.category}-${resource.name.en}`}
                  resource={resource}
                  lang={lang}
                  t={t}
                />
              ))}
            </div>
          </section>
        )}

        <section className="resource-section resource-checklist">
          <div>
            <h2>{t(copy.checklistTitle)}</h2>
            <ul className="checklist-list">
              {copy.checklistItems[lang].map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} strokeWidth={2} aria-hidden="true" />
                  <span>{ts(item)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="resource-checklist-cta">
            <Link href="/practice" className="btn btn-primary">
              {s.resourcesPracticeNow}
            </Link>
            <Link href="/mock-test" className="btn btn-ghost-light">
              {copy.takeMock[lang]}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
