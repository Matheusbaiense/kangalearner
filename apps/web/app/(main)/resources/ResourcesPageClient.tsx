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

type Localized = Record<UiLang, string>;

type ResourceCategory = "official" | "booking" | "study" | "community" | "partner";

type Resource = {
  name: Localized;
  desc: Localized;
  url: string;
  category: ResourceCategory;
  Icon: LucideIcon;
};

type JourneyStep = {
  step: string;
  title: Localized;
  body: Localized;
  href?: string;
  Icon: LucideIcon;
};

type EcosystemItem = {
  title: Localized;
  body: Localized;
  status: Localized;
  href?: string;
  Icon: LucideIcon;
};

const OFFICIAL_RESOURCES: Resource[] = [
  {
    name: {
      en: "Drive Safe handbook",
      pt: "Manual Drive Safe",
      es: "Manual Drive Safe"
    },
    desc: {
      en: "The official WA handbook for road rules, safe driving and learner preparation.",
      pt: "O manual oficial de WA para regras de transito, direcao segura e preparacao para learners.",
      es: "El manual oficial de WA para reglas viales, conduccion segura y preparacion learner."
    },
    url: "https://www.transport.wa.gov.au/licensing/drivers-licence/get-a-licence/learner-driver-resources",
    category: "official",
    Icon: BookOpen
  },
  {
    name: {
      en: "Road rules theory test quiz",
      pt: "Quiz oficial de regras de transito",
      es: "Quiz oficial de reglas viales"
    },
    desc: {
      en: "Official Transport WA quiz and resources for the theory test.",
      pt: "Quiz e recursos oficiais do Transport WA para a prova teorica.",
      es: "Quiz y recursos oficiales de Transport WA para el examen teorico."
    },
    url: "https://www.transport.wa.gov.au/licensing/drivers-licence/get-a-licence/learner-driver-resources",
    category: "study",
    Icon: ClipboardCheck
  },
  {
    name: {
      en: "Book through DoTDirect",
      pt: "Agendar pelo DoTDirect",
      es: "Reservar por DoTDirect"
    },
    desc: {
      en: "Use the official portal for bookings, payments and licence services.",
      pt: "Use o portal oficial para agendamentos, pagamentos e servicos de carteira.",
      es: "Usa el portal oficial para reservas, pagos y servicios de licencia."
    },
    url: "https://online.transport.wa.gov.au/dotOnline/",
    category: "booking",
    Icon: CalendarCheck
  },
  {
    name: {
      en: "Hazard Perception Test",
      pt: "Teste de Percepcao de Risco",
      es: "Prueba de Percepcion de Peligros"
    },
    desc: {
      en: "The next major test after learning to drive and logging required hours where they apply.",
      pt: "A proxima etapa importante depois de aprender a dirigir e registrar horas quando exigido.",
      es: "La siguiente etapa importante despues de aprender a conducir y registrar horas cuando aplique."
    },
    url: "https://www.transport.wa.gov.au/licensing/hazard-perception-test.asp",
    category: "official",
    Icon: AlertTriangle
  },
  {
    name: {
      en: "Learn&Log digital log book",
      pt: "Learn&Log logbook digital",
      es: "Learn&Log registro digital"
    },
    desc: {
      en: "The official digital log book service in ServiceWA for eligible WA learner drivers.",
      pt: "O logbook digital oficial no ServiceWA para learners elegiveis em WA.",
      es: "El registro digital oficial en ServiceWA para learners elegibles en WA."
    },
    url: "https://transport.wa.gov.au/licensing/drivers-licence/get-a-licence/learner-driver-resources/digital-learner-log-book",
    category: "official",
    Icon: Smartphone
  },
  {
    name: {
      en: "RAC learner licence guide",
      pt: "Guia RAC para learner licence",
      es: "Guia RAC para learner licence"
    },
    desc: {
      en: "Plain-English guide from RAC WA for learners and supervising drivers.",
      pt: "Guia em linguagem simples da RAC WA para learners e supervisores.",
      es: "Guia en lenguaje simple de RAC WA para learners y supervisores."
    },
    url: "https://www.rac.com.au/cars-transport/info/learner-licence-in-wa",
    category: "partner",
    Icon: Car
  }
];

const JOURNEY: JourneyStep[] = [
  {
    step: "01",
    title: {
      en: "Pass the learner theory test",
      pt: "Passe na prova teorica de learner",
      es: "Aprueba el examen teorico learner"
    },
    body: {
      en: "Use KangaLearner for multilingual practice, then confirm requirements with Transport WA before booking.",
      pt: "Use o KangaLearner para praticar em varios idiomas e confirme os requisitos no Transport WA antes de agendar.",
      es: "Usa KangaLearner para practicar en varios idiomas y confirma los requisitos en Transport WA antes de reservar."
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
    body: {
      en: "If you are under 25, WA requires at least 50 supervised driving hours, including 5 at night. If you are 25 or older, Transport WA says you do not need to log hours before applying for the driving test.",
      pt: "Se voce tem menos de 25 anos, WA exige pelo menos 50 horas supervisionadas, incluindo 5 a noite. Se tem 25 anos ou mais, o Transport WA diz que nao precisa registrar horas antes de aplicar para o driving test.",
      es: "Si tienes menos de 25 anos, WA exige al menos 50 horas supervisadas, incluyendo 5 de noche. Si tienes 25 anos o mas, Transport WA indica que no necesitas registrar horas antes de solicitar el driving test."
    },
    href: "https://www.transport.wa.gov.au/licensing/drivers-licence/get-a-licence/car/learn-to-drive-log-hours",
    Icon: Clock
  },
  {
    step: "03",
    title: {
      en: "Prepare for the HPT",
      pt: "Prepare-se para o HPT",
      es: "Preparate para el HPT"
    },
    body: {
      en: "The Hazard Perception Test is a separate step. KangaLearner can grow into a prep hub, but the official sample tests stay with Transport WA.",
      pt: "O Hazard Perception Test e uma etapa separada. O KangaLearner pode virar um hub de preparo, mas os testes oficiais ficam no Transport WA.",
      es: "La Prueba de Percepcion de Peligros es una etapa separada. KangaLearner puede crecer como centro de preparacion, pero las pruebas oficiales siguen en Transport WA."
    },
    href: "https://www.transport.wa.gov.au/licensing/hazard-perception-test.asp",
    Icon: ShieldCheck
  },
  {
    step: "04",
    title: {
      en: "Book and pass the PDA",
      pt: "Agende e passe no PDA",
      es: "Reserva y aprueba el PDA"
    },
    body: {
      en: "Use official PDA guidance for vehicle standards, booking rules and what happens on assessment day.",
      pt: "Use a orientacao oficial do PDA para padroes do veiculo, regras de agendamento e o que acontece no dia.",
      es: "Usa la guia oficial del PDA para normas del vehiculo, reglas de reserva y lo que ocurre el dia de la evaluacion."
    },
    href: "https://www.transport.wa.gov.au/licensing/drivers-licence/get-a-licence/car/book-practical-driving-assessment",
    Icon: Route
  }
];

const ECOSYSTEM: EcosystemItem[] = [
  {
    title: { en: "Kanga Learn", pt: "Kanga Learn", es: "Kanga Learn" },
    body: {
      en: "Theory, practice questions, topic explanations and mock tests.",
      pt: "Teoria, perguntas de pratica, explicacoes por topico e simulados.",
      es: "Teoria, preguntas de practica, explicaciones por tema y simulacros."
    },
    status: { en: "Available now", pt: "Disponivel agora", es: "Disponible ahora" },
    href: "/practice",
    Icon: BookOpen
  },
  {
    title: { en: "Kanga Mobile", pt: "Kanga Mobile", es: "Kanga Mobile" },
    body: {
      en: "Offline-first native app for daily study, saved questions and future sync.",
      pt: "App nativo offline-first para estudo diario, perguntas salvas e sync futuro.",
      es: "App nativa offline-first para estudio diario, preguntas guardadas y sync futuro."
    },
    status: { en: "In progress", pt: "Em progresso", es: "En progreso" },
    Icon: Smartphone
  },
  {
    title: { en: "Kanga Drive", pt: "Kanga Drive", es: "Kanga Drive" },
    body: {
      en: "Future HPT/PDA prep, licence journey checklist and driving-hour companion.",
      pt: "Futuro preparo para HPT/PDA, checklist da jornada e companion de horas dirigidas.",
      es: "Futura preparacion HPT/PDA, checklist de la jornada y companion de horas conducidas."
    },
    status: { en: "Next layer", pt: "Proxima camada", es: "Proxima capa" },
    Icon: Car
  },
  {
    title: { en: "Kanga Connect", pt: "Kanga Connect", es: "Kanga Connect" },
    body: {
      en: "Future instructor discovery, community support and trusted local services.",
      pt: "Futura busca de instrutores, suporte de comunidade e servicos locais confiaveis.",
      es: "Futura busqueda de instructores, apoyo comunitario y servicios locales confiables."
    },
    status: { en: "Future", pt: "Futuro", es: "Futuro" },
    Icon: Users
  },
  {
    title: { en: "Kanga Tutor", pt: "Kanga Tutor", es: "Kanga Tutor" },
    body: {
      en: "Future AI explanations in plain English, Portuguese and Spanish.",
      pt: "Futuras explicacoes com IA em ingles simples, portugues e espanhol.",
      es: "Futuras explicaciones con IA en ingles simple, portugues y espanol."
    },
    status: { en: "Plugin ready", pt: "Plugin preparado", es: "Plugin preparado" },
    Icon: Bot
  }
];

const COMMUNITY_LINKS: Resource[] = [
  {
    name: { en: "Brasileiros em Perth", pt: "Brasileiros em Perth", es: "Brasileiros em Perth" },
    desc: {
      en: "Portuguese-speaking community group in Perth.",
      pt: "Grupo de comunidade em portugues em Perth.",
      es: "Grupo comunitario en portugues en Perth."
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
      es: "Apoyo comunitario en espanol y preguntas locales."
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
    label: { en: "Guide", pt: "Guia", es: "Guia" },
    className: "partner"
  }
};

const copy = {
  heroStats: [
    {
      value: "30",
      label: {
        en: "questions in the WA learner theory test",
        pt: "perguntas na prova teorica learner de WA",
        es: "preguntas en el examen teorico learner de WA"
      },
      Icon: ClipboardCheck
    },
    {
      value: "24",
      label: {
        en: "correct answers needed to pass",
        pt: "respostas certas para passar",
        es: "respuestas correctas para aprobar"
      },
      Icon: CheckCircle2
    },
    {
      value: "50h",
      label: {
        en: "supervised driving minimum if under 25",
        pt: "minimo supervisionado se menor de 25",
        es: "minimo supervisado si eres menor de 25"
      },
      Icon: Clock
    },
    {
      value: "5h",
      label: {
        en: "night driving included in those hours",
        pt: "de conducao noturna dentro dessas horas",
        es: "de conduccion nocturna dentro de esas horas"
      },
      Icon: Moon
    }
  ],
  officialNote: {
    en: "KangaLearner helps you study and plan. It is not a government service; always confirm current rules, fees and eligibility with Transport WA.",
    pt: "O KangaLearner ajuda voce a estudar e se organizar. Nao e um servico do governo; confirme sempre regras, taxas e elegibilidade atuais com o Transport WA.",
    es: "KangaLearner te ayuda a estudiar y organizarte. No es un servicio del gobierno; confirma siempre reglas, tarifas y elegibilidad actuales con Transport WA."
  },
  journeyTitle: {
    en: "Your WA licence pathway",
    pt: "Sua jornada para a carteira em WA",
    es: "Tu camino hacia la licencia en WA"
  },
  journeySub: {
    en: "From learner theory to driving practice, HPT and PDA. Use this as a plain-language map, then follow the official source for the final rule.",
    pt: "Da prova teorica ate pratica de direcao, HPT e PDA. Use isto como um mapa em linguagem simples e siga a fonte oficial para a regra final.",
    es: "Del examen teorico a la practica de conduccion, HPT y PDA. Usa esto como mapa en lenguaje simple y sigue la fuente oficial para la regla final."
  },
  officialTitle: {
    en: "Official and trusted resources",
    pt: "Recursos oficiais e confiaveis",
    es: "Recursos oficiales y confiables"
  },
  ecosystemTitle: {
    en: "The KangaLearner ecosystem",
    pt: "O ecossistema KangaLearner",
    es: "El ecosistema KangaLearner"
  },
  ecosystemSub: {
    en: "The product starts with WA learner theory, then expands into mobile study, driving preparation, community and trusted services.",
    pt: "O produto comeca com teoria learner de WA e expande para estudo mobile, preparo para dirigir, comunidade e servicos confiaveis.",
    es: "El producto empieza con teoria learner de WA y se expande a estudio movil, preparacion para conducir, comunidad y servicios confiables."
  },
  communityTitle: {
    en: "Community starting points",
    pt: "Pontos de partida na comunidade",
    es: "Puntos de partida en la comunidad"
  },
  communitySub: {
    en: "Community groups can help with local context, but they are not official legal sources.",
    pt: "Grupos de comunidade podem ajudar com contexto local, mas nao sao fontes legais oficiais.",
    es: "Los grupos comunitarios pueden ayudar con contexto local, pero no son fuentes legales oficiales."
  },
  checklistTitle: {
    en: "Before test day",
    pt: "Antes do dia da prova",
    es: "Antes del dia del examen"
  },
  checklistItems: {
    en: [
      "Confirm current fees, booking details and ID requirements with Transport WA.",
      "Practise all topics, then take at least one full 30-question mock test.",
      "Review wrong and saved questions instead of only doing new ones.",
      "Arrive early, rested and without relying on your phone in the test room."
    ],
    pt: [
      "Confirme taxas, detalhes do agendamento e documentos exigidos no Transport WA.",
      "Pratique todos os topicos e faca pelo menos um simulado completo de 30 perguntas.",
      "Revise erradas e salvas em vez de fazer apenas perguntas novas.",
      "Chegue cedo, descansado e sem depender do celular na sala da prova."
    ],
    es: [
      "Confirma tarifas, detalles de reserva y documentos requeridos en Transport WA.",
      "Practica todos los temas y haz al menos un simulacro completo de 30 preguntas.",
      "Revisa preguntas incorrectas y guardadas en lugar de hacer solo nuevas.",
      "Llega temprano, descansado y sin depender del celular en la sala del examen."
    ]
  },
  open: { en: "Open", pt: "Abrir", es: "Abrir" },
  startPractice: { en: "Start practice", pt: "Comecar pratica", es: "Empezar practica" },
  takeMock: { en: "Take a mock test", pt: "Fazer simulado", es: "Hacer simulacro" },
  learnMore: { en: "Learn more", pt: "Saiba mais", es: "Saber mas" }
};

function text(value: Localized, lang: UiLang) {
  return value[lang] ?? value.en;
}

function ResourceCard({ resource, lang }: { resource: Resource; lang: UiLang }) {
  const badge = CATEGORY_BADGE[resource.category];

  return (
    <a className="resource-card" href={resource.url} target="_blank" rel="noopener noreferrer">
      <span className="resource-card-icon" aria-hidden="true">
        <resource.Icon size={22} strokeWidth={2} />
      </span>
      <span className={`resource-badge ${badge.className}`}>{text(badge.label, lang)}</span>
      <strong>{text(resource.name, lang)}</strong>
      <p>{text(resource.desc, lang)}</p>
      <span className="resource-open">
        {text(copy.open, lang)}
        <ExternalLink size={15} strokeWidth={2} aria-hidden="true" />
      </span>
    </a>
  );
}

export function ResourcesPageClient() {
  const { uiLang: lang, s } = useLang();

  return (
    <main className="app-page resources-page">
      <div className="container section-pad">
        <section className="resources-hero">
          <div className="page-header resources-hero-copy">
            <p className="resources-kicker">{s.resourcesKicker}</p>
            <h1 className="page-title">{s.resourcesTitle}</h1>
            <p className="page-sub">{s.resourcesSub}</p>
            <div className="resources-hero-actions">
              <Link href="/practice" className="btn btn-primary">
                {text(copy.startPractice, lang)}
              </Link>
              <Link href="/mock-test" className="btn btn-ghost-light">
                {text(copy.takeMock, lang)}
              </Link>
            </div>
          </div>

          <div className="resources-stat-grid" aria-label="WA learner licence key facts">
            {copy.heroStats.map(({ value, label, Icon }) => (
              <div key={value} className="resources-stat">
                <Icon size={20} strokeWidth={2} aria-hidden="true" />
                <strong>{value}</strong>
                <span>{text(label, lang)}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="resources-official-note">
          <ShieldCheck size={18} strokeWidth={2} aria-hidden="true" />
          <span>{text(copy.officialNote, lang)}</span>
        </div>

        <section className="resource-section resource-section-panel">
          <div className="resource-section-head">
            <h2>{text(copy.journeyTitle, lang)}</h2>
            <p>{text(copy.journeySub, lang)}</p>
          </div>
          <div className="licence-journey-grid">
            {JOURNEY.map((item) => {
              const href = item.href ?? "#";
              const inner = (
                <>
                  <span className="journey-step-num">{item.step}</span>
                  <span className="journey-step-icon" aria-hidden="true">
                    <item.Icon size={22} strokeWidth={2} />
                  </span>
                  <strong>{text(item.title, lang)}</strong>
                  <p>{text(item.body, lang)}</p>
                  <span className="resource-open">
                    {href.startsWith("/") ? text(copy.learnMore, lang) : text(copy.open, lang)}
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
            <h2>{text(copy.officialTitle, lang)}</h2>
            <p>{s.resourcesWaOnly}</p>
          </div>
          <div className="resource-card-grid">
            {OFFICIAL_RESOURCES.map((resource) => (
              <ResourceCard
                key={`${resource.category}-${resource.name.en}`}
                resource={resource}
                lang={lang}
              />
            ))}
          </div>
        </section>

        <section className="resource-section resource-section-panel">
          <div className="resource-section-head">
            <h2>{text(copy.ecosystemTitle, lang)}</h2>
            <p>{text(copy.ecosystemSub, lang)}</p>
          </div>
          <div className="ecosystem-grid">
            {ECOSYSTEM.map((item) => {
              const content = (
                <>
                  <span className="ecosystem-icon" aria-hidden="true">
                    <item.Icon size={22} strokeWidth={2} />
                  </span>
                  <span className="ecosystem-status">{text(item.status, lang)}</span>
                  <strong>{text(item.title, lang)}</strong>
                  <p>{text(item.body, lang)}</p>
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

        <section className="resource-section">
          <div className="resource-section-head">
            <h2>{text(copy.communityTitle, lang)}</h2>
            <p>{text(copy.communitySub, lang)}</p>
          </div>
          <div className="resource-card-grid compact">
            {COMMUNITY_LINKS.map((resource) => (
              <ResourceCard
                key={`${resource.category}-${resource.name.en}`}
                resource={resource}
                lang={lang}
              />
            ))}
          </div>
        </section>

        <section className="resource-section resource-checklist">
          <div>
            <h2>{text(copy.checklistTitle, lang)}</h2>
            <ul className="checklist-list">
              {copy.checklistItems[lang].map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} strokeWidth={2} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="resource-checklist-cta">
            <Link href="/practice" className="btn btn-primary">
              {s.resourcesPracticeNow}
            </Link>
            <Link href="/mock-test" className="btn btn-ghost-light">
              {text(copy.takeMock, lang)}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
