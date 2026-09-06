import type { AuStateCode, LocalizedText } from "@kanga/core";
import { fill, t, type UiLang } from "@/lib/i18n";

export interface StateFaqItem {
  q: LocalizedText;
  a: LocalizedText;
}

/**
 * Fatos oficiais por estado para as paginas SEO /learner-test/[state].
 * REGRA: examQuestions/examPassMark ficam null enquanto nao confirmados em
 * fonte oficial do governo (verifiedAt marca a data da checagem).
 * Contagens do banco de perguntas NAO entram aqui: sao calculadas em build
 * a partir de QUESTIONS + filterByState.
 * Conteudo por estado (FAQ) e LocalizedText; strings fixas ficam em i18n.ts.
 */
export interface StateTestInfo {
  code: AuStateCode;
  slug: string;
  stateName: string;
  testName: string;
  testAbbr: string | null;
  authority: string;
  /** Sigla curta do orgao para celulas de fatos (nunca o nome extenso em display). */
  authorityAbbr: string;
  authorityUrl: string;
  examQuestions: number | null;
  examPassMark: string | null;
  /** Title da pagina (sem marca, o layout aplica o template "%s | KangaLearner"). */
  metaTitle: string;
  /** Cauda da meta description; o prefixo com a contagem real e computado em build. */
  descriptionTail: string;
  /** FAQ estatica verificada; itens com contagem do banco sao gerados na pagina. */
  faq: StateFaqItem[];
  verifiedAt: string;
}

export const STATE_TEST_INFO: StateTestInfo[] = [
  {
    code: "WA",
    slug: "wa",
    stateName: "Western Australia",
    testName: "Computerised Theory Test",
    testAbbr: "CTT",
    authority: "Department of Transport WA",
    authorityAbbr: "DoT WA",
    authorityUrl: "transport.wa.gov.au",
    examQuestions: 30,
    examPassMark: "24 of 30",
    metaTitle: "WA CTT Practice Test, Free Questions",
    descriptionTail: "The official Computerised Theory Test has 30 questions, pass mark 24 of 30.",
    faq: [
      {
        q: {
          en: "How many questions are in the WA learner theory test?",
          pt: "Quantas questões tem o teste teórico de aprendiz de WA?",
          es: "¿Cuántas preguntas tiene el examen teórico de aprendiz de WA?"
        },
        a: {
          en: "The official Computerised Theory Test (CTT) has 30 multiple choice questions. You need at least 24 correct answers, a pass mark of 80%.",
          pt: "O Computerised Theory Test (CTT) oficial tem 30 questões de múltipla escolha. Você precisa de pelo menos 24 respostas corretas, uma nota de corte de 80%.",
          es: "El Computerised Theory Test (CTT) oficial tiene 30 preguntas de opción múltiple. Necesitas al menos 24 respuestas correctas, un puntaje mínimo del 80%."
        }
      },
      {
        q: {
          en: "Who runs the learner theory test in WA?",
          pt: "Quem aplica o teste teórico de aprendiz em WA?",
          es: "¿Quién administra el examen teórico de aprendiz en WA?"
        },
        a: {
          en: "The Department of Transport WA. You sit the CTT at a driver and vehicle services centre or an agent location.",
          pt: "O Department of Transport WA. Você faz o CTT em um centro de serviços de motorista e veículo ou em um posto autorizado.",
          es: "El Department of Transport WA. Rindes el CTT en un centro de servicios de conductores y vehículos o en un agente autorizado."
        }
      },
      {
        q: {
          en: "Where do I book the real CTT?",
          pt: "Onde agendo o CTT real?",
          es: "¿Dónde reservo el CTT real?"
        },
        a: {
          en: "Book through the Department of Transport WA. Check transport.wa.gov.au for locations, fees and current requirements.",
          pt: "Agende pelo Department of Transport WA. Confira transport.wa.gov.au para locais, taxas e requisitos atuais.",
          es: "Reserva a través del Department of Transport WA. Consulta transport.wa.gov.au para ubicaciones, tarifas y requisitos vigentes."
        }
      }
    ],
    verifiedAt: "2026-08-16"
  },
  {
    code: "NSW",
    slug: "nsw",
    stateName: "New South Wales",
    testName: "Driver Knowledge Test",
    testAbbr: "DKT",
    authority: "Transport for NSW",
    authorityAbbr: "TfNSW",
    authorityUrl: "service.nsw.gov.au",
    examQuestions: 45,
    examPassMark: "41 of 45",
    metaTitle: "NSW DKT Practice Test, Free Learner Questions",
    descriptionTail: "The official Driver Knowledge Test has 45 questions, pass mark 41 of 45.",
    faq: [
      {
        q: {
          en: "How many questions are in the NSW DKT?",
          pt: "Quantas questões tem o DKT de NSW?",
          es: "¿Cuántas preguntas tiene el DKT de NSW?"
        },
        a: {
          en: "The official Driver Knowledge Test has 45 questions: 15 general knowledge and 30 road safety, set by Transport for NSW.",
          pt: "O Driver Knowledge Test oficial tem 45 questões: 15 de conhecimentos gerais e 30 de segurança viária, definidas pela Transport for NSW.",
          es: "El Driver Knowledge Test oficial tiene 45 preguntas: 15 de conocimientos generales y 30 de seguridad vial, definidas por Transport for NSW."
        }
      },
      {
        q: {
          en: "What score do I need to pass the DKT?",
          pt: "Que nota preciso para passar no DKT?",
          es: "¿Qué puntaje necesito para aprobar el DKT?"
        },
        a: {
          en: "You need 41 of 45 overall: at least 12 of 15 general knowledge questions and 29 of 30 road safety questions.",
          pt: "Você precisa de 41 de 45 no total: pelo menos 12 das 15 questões de conhecimentos gerais e 29 das 30 de segurança viária.",
          es: "Necesitas 41 de 45 en total: al menos 12 de las 15 preguntas de conocimientos generales y 29 de las 30 de seguridad vial."
        }
      },
      {
        q: {
          en: "Where do I sit the real DKT?",
          pt: "Onde faço o DKT real?",
          es: "¿Dónde rindo el DKT real?"
        },
        a: {
          en: "At a Service NSW centre, or online through DKT Online. Bookings and eligibility are handled via service.nsw.gov.au.",
          pt: "Em um centro Service NSW, ou online pelo DKT Online. Agendamentos e elegibilidade são tratados em service.nsw.gov.au.",
          es: "En un centro de Service NSW, o en línea mediante DKT Online. Las reservas y la elegibilidad se gestionan en service.nsw.gov.au."
        }
      }
    ],
    verifiedAt: "2026-08-16"
  },
  {
    code: "VIC",
    slug: "vic",
    stateName: "Victoria",
    testName: "Learner Permit Knowledge Test",
    testAbbr: null,
    authority: "VicRoads",
    authorityAbbr: "VicRoads",
    authorityUrl: "vicroads.vic.gov.au",
    examQuestions: 32,
    examPassMark: "78%",
    metaTitle: "VIC Learner Permit Test Practice, Free",
    descriptionTail:
      "The official VicRoads Learner Permit Knowledge Test has 32 questions, pass mark 78%.",
    faq: [
      {
        q: {
          en: "How many questions are in the VIC learner permit test?",
          pt: "Quantas questões tem o teste de learner permit de VIC?",
          es: "¿Cuántas preguntas tiene el examen de learner permit de VIC?"
        },
        a: {
          en: "The official VicRoads Learner Permit Knowledge Test has 32 multiple choice questions.",
          pt: "O Learner Permit Knowledge Test oficial da VicRoads tem 32 questões de múltipla escolha.",
          es: "El Learner Permit Knowledge Test oficial de VicRoads tiene 32 preguntas de opción múltiple."
        }
      },
      {
        q: {
          en: "What score do I need to pass the VIC test?",
          pt: "Que nota preciso para passar no teste de VIC?",
          es: "¿Qué puntaje necesito para aprobar el examen de VIC?"
        },
        a: {
          en: "The pass mark is 78%, which means 25 of 32 questions correct.",
          pt: "A nota de corte é 78%, o que significa 25 das 32 questões corretas.",
          es: "El puntaje mínimo es 78%, es decir, 25 de las 32 preguntas correctas."
        }
      },
      {
        q: {
          en: "Where do I sit the real test?",
          pt: "Onde faço o teste real?",
          es: "¿Dónde rindo el examen real?"
        },
        a: {
          en: "At a VicRoads customer service centre. Book and check current requirements at vicroads.vic.gov.au.",
          pt: "Em um centro de atendimento da VicRoads. Agende e confira os requisitos atuais em vicroads.vic.gov.au.",
          es: "En un centro de atención de VicRoads. Reserva y consulta los requisitos vigentes en vicroads.vic.gov.au."
        }
      }
    ],
    verifiedAt: "2026-08-16"
  },
  {
    code: "QLD",
    slug: "qld",
    stateName: "Queensland",
    testName: "Road Rules Test",
    testAbbr: null,
    authority: "Department of Transport and Main Roads (TMR)",
    authorityAbbr: "TMR",
    authorityUrl: "tmr.qld.gov.au",
    examQuestions: 30,
    examPassMark: "9/10 + 18/20",
    metaTitle: "QLD Road Rules Test Practice, Free Questions",
    descriptionTail:
      "The official TMR road rules test has 30 questions: 10 give way and 20 road rules.",
    faq: [
      {
        q: {
          en: "How many questions are in the QLD road rules test?",
          pt: "Quantas questões tem o teste de regras de trânsito de QLD?",
          es: "¿Cuántas preguntas tiene el examen de reglas de tránsito de QLD?"
        },
        a: {
          en: "The official test has 30 questions: 10 give way questions and 20 general road rules questions.",
          pt: "O teste oficial tem 30 questões: 10 de preferência (give way) e 20 de regras gerais de trânsito.",
          es: "El examen oficial tiene 30 preguntas: 10 de ceda el paso (give way) y 20 de reglas generales de tránsito."
        }
      },
      {
        q: {
          en: "What score do I need to pass the QLD test?",
          pt: "Que nota preciso para passar no teste de QLD?",
          es: "¿Qué puntaje necesito para aprobar el examen de QLD?"
        },
        a: {
          en: "You need 9 of 10 give way questions and 18 of 20 road rules questions correct. You can also complete PrepL, the online learning alternative.",
          pt: "Você precisa acertar 9 das 10 questões de preferência e 18 das 20 de regras de trânsito. Você também pode concluir o PrepL, a alternativa de aprendizado online.",
          es: "Necesitas acertar 9 de las 10 preguntas de ceda el paso y 18 de las 20 de reglas de tránsito. También puedes completar PrepL, la alternativa de aprendizaje en línea."
        }
      },
      {
        q: {
          en: "Where do I sit the real test?",
          pt: "Onde faço o teste real?",
          es: "¿Dónde rindo el examen real?"
        },
        a: {
          en: "At a Department of Transport and Main Roads customer service centre, or online through PrepL. See tmr.qld.gov.au for details.",
          pt: "Em um centro de atendimento do Department of Transport and Main Roads, ou online pelo PrepL. Veja tmr.qld.gov.au para detalhes.",
          es: "En un centro de atención del Department of Transport and Main Roads, o en línea mediante PrepL. Consulta tmr.qld.gov.au para más detalles."
        }
      }
    ],
    verifiedAt: "2026-08-16"
  },
  {
    code: "SA",
    slug: "sa",
    stateName: "South Australia",
    testName: "Learner's Theory Test",
    testAbbr: null,
    authority: "Department for Infrastructure and Transport SA",
    authorityAbbr: "DIT SA",
    authorityUrl: "mylicence.sa.gov.au",
    examQuestions: 50,
    examPassMark: "8/8 + 32/42",
    metaTitle: "SA Learner Theory Test Practice, Free",
    descriptionTail:
      "The official Learner's Theory Test has 50 questions: 8 give way and 42 multiple choice.",
    faq: [
      {
        q: {
          en: "How many questions are in the SA learner's theory test?",
          pt: "Quantas questões tem o teste teórico de aprendiz de SA?",
          es: "¿Cuántas preguntas tiene el examen teórico de aprendiz de SA?"
        },
        a: {
          en: "The official Learner's Theory Test has 50 questions in two parts: 8 give way questions and 42 multiple choice questions.",
          pt: "O Learner's Theory Test oficial tem 50 questões em duas partes: 8 de preferência (give way) e 42 de múltipla escolha.",
          es: "El Learner's Theory Test oficial tiene 50 preguntas en dos partes: 8 de ceda el paso (give way) y 42 de opción múltiple."
        }
      },
      {
        q: {
          en: "What score do I need to pass the SA test?",
          pt: "Que nota preciso para passar no teste de SA?",
          es: "¿Qué puntaje necesito para aprobar el examen de SA?"
        },
        a: {
          en: "You must answer all 8 give way questions correctly, then at least 32 of the 42 multiple choice questions.",
          pt: "Você deve acertar todas as 8 questões de preferência e depois pelo menos 32 das 42 de múltipla escolha.",
          es: "Debes acertar las 8 preguntas de ceda el paso y luego al menos 32 de las 42 de opción múltiple."
        }
      },
      {
        q: {
          en: "Where do I sit the real test?",
          pt: "Onde faço o teste real?",
          es: "¿Dónde rindo el examen real?"
        },
        a: {
          en: "At a Service SA centre, or online through the myLs course. See mylicence.sa.gov.au for bookings and fees.",
          pt: "Em um centro Service SA, ou online pelo curso myLs. Veja mylicence.sa.gov.au para agendamentos e taxas.",
          es: "En un centro de Service SA, o en línea mediante el curso myLs. Consulta mylicence.sa.gov.au para reservas y tarifas."
        }
      }
    ],
    verifiedAt: "2026-08-16"
  },
  {
    code: "TAS",
    slug: "tas",
    stateName: "Tasmania",
    testName: "Driver Knowledge Test",
    testAbbr: "DKT",
    authority: "Department of State Growth (Service Tasmania)",
    authorityAbbr: "Service TAS",
    authorityUrl: "transport.tas.gov.au",
    // Estrutura oficial: Compulsory 7/7 + Traffic Rules 4/5 + Road Rules 15/18
    // + Road Safety 4/5 (transport.tas.gov.au practice DKTS).
    examQuestions: 35,
    examPassMark: "30 of 35",
    metaTitle: "TAS Driver Knowledge Test Practice, Free",
    descriptionTail:
      "The official Driver Knowledge Test has 35 questions in four sections, pass mark 30 of 35.",
    faq: [
      {
        q: {
          en: "How many questions are in the TAS driver knowledge test?",
          pt: "Quantas questões tem o teste de conhecimento de TAS?",
          es: "¿Cuántas preguntas tiene el examen de conocimiento de TAS?"
        },
        a: {
          en: "The official Driver Knowledge Test has 35 questions in four sections: 7 compulsory, 5 traffic rules, 18 road rules and 5 road safety.",
          pt: "O Driver Knowledge Test oficial tem 35 questões em quatro seções: 7 obrigatórias, 5 de regras de tráfego, 18 de regras de trânsito e 5 de segurança viária.",
          es: "El Driver Knowledge Test oficial tiene 35 preguntas en cuatro secciones: 7 obligatorias, 5 de reglas de tráfico, 18 de reglas de tránsito y 5 de seguridad vial."
        }
      },
      {
        q: {
          en: "What score do I need to pass the TAS test?",
          pt: "Que nota preciso para passar no teste de TAS?",
          es: "¿Qué puntaje necesito para aprobar el examen de TAS?"
        },
        a: {
          en: "Each section has its own minimum: all 7 compulsory questions, at least 4 of 5 traffic rules, 15 of 18 road rules and 4 of 5 road safety — about 30 of 35 overall.",
          pt: "Cada seção tem seu mínimo: todas as 7 obrigatórias, pelo menos 4 das 5 de regras de tráfego, 15 das 18 de regras de trânsito e 4 das 5 de segurança viária — cerca de 30 de 35 no total.",
          es: "Cada sección tiene su mínimo: las 7 obligatorias, al menos 4 de 5 de reglas de tráfico, 15 de 18 de reglas de tránsito y 4 de 5 de seguridad vial — unas 30 de 35 en total."
        }
      },
      {
        q: {
          en: "Where do I sit the real DKT?",
          pt: "Onde faço o DKT real?",
          es: "¿Dónde rindo el DKT real?"
        },
        a: {
          en: "At a Service Tasmania shop. The official practice test is free on transport.tas.gov.au, and the Plates Plus site covers the full licensing pathway.",
          pt: "Em uma loja Service Tasmania. O teste de prática oficial é grátis em transport.tas.gov.au, e o site Plates Plus cobre o caminho completo da habilitação.",
          es: "En una tienda Service Tasmania. El examen de práctica oficial es gratis en transport.tas.gov.au, y el sitio Plates Plus cubre toda la ruta de la licencia."
        }
      }
    ],
    verifiedAt: "2026-08-17"
  },
  {
    code: "ACT",
    slug: "act",
    stateName: "Australian Capital Territory",
    testName: "Road Rules Knowledge Test",
    testAbbr: "RRKT",
    authority: "Access Canberra",
    authorityAbbr: "Access Canberra",
    authorityUrl: "accesscanberra.act.gov.au",
    // Confirmado em safeplatestesting.act.gov.au (portal oficial de testes do ACT):
    // 35 questoes, no maximo 4 erros no total, e zero erros em Alcohol and Drugs,
    // Intersections, Seat Belts e Vulnerable Road Users.
    examQuestions: 35,
    examPassMark: "31 of 35",
    metaTitle: "ACT Road Rules Test Practice, Free",
    descriptionTail: "The official Road Rules Knowledge Test has 35 questions, pass mark 31 of 35.",
    faq: [
      {
        q: {
          en: "Who runs the road rules test in the ACT?",
          pt: "Quem aplica o teste de regras de trânsito no ACT?",
          es: "¿Quién administra el examen de reglas de tránsito en el ACT?"
        },
        a: {
          en: "Access Canberra runs the Road Rules Knowledge Test (RRKT). You must complete a pre-learner licence training course before you can sit it.",
          pt: "A Access Canberra aplica o Road Rules Knowledge Test (RRKT). Você precisa concluir um curso de treinamento pré-licença de aprendiz antes de poder fazê-lo.",
          es: "Access Canberra administra el Road Rules Knowledge Test (RRKT). Debes completar un curso de formación previo a la licencia de aprendiz antes de poder rendirlo."
        }
      },
      {
        q: {
          en: "What score do I need to pass the ACT test?",
          pt: "Que nota preciso para passar no teste do ACT?",
          es: "¿Qué puntaje necesito para aprobar el examen del ACT?"
        },
        a: {
          en: "The test has 35 questions and you may get at most 4 wrong. Four categories allow no mistakes at all: alcohol and drugs, intersections, seat belts and vulnerable road users.",
          pt: "O teste tem 35 questões e você pode errar no máximo 4. Quatro categorias não admitem erro algum: álcool e drogas, cruzamentos, cintos de segurança e usuários vulneráveis da via.",
          es: "El examen tiene 35 preguntas y puedes fallar como máximo 4. Cuatro categorías no admiten ningún error: alcohol y drogas, intersecciones, cinturones de seguridad y usuarios vulnerables de la vía."
        }
      },
      {
        q: {
          en: "What should I study for the RRKT?",
          pt: "O que devo estudar para o RRKT?",
          es: "¿Qué debo estudiar para el RRKT?"
        },
        a: {
          en: "The ACT Road Rules Handbook published by Access Canberra. Every question in the real test comes from that handbook.",
          pt: "O ACT Road Rules Handbook publicado pela Access Canberra. Toda questão do teste real vem desse manual.",
          es: "El ACT Road Rules Handbook publicado por Access Canberra. Cada pregunta del examen real proviene de ese manual."
        }
      },
      {
        q: {
          en: "Where do I sit the real RRKT?",
          pt: "Onde faço o RRKT real?",
          es: "¿Dónde rindo el RRKT real?"
        },
        a: {
          en: "At an Access Canberra service centre. Check accesscanberra.act.gov.au for current requirements and bookings.",
          pt: "Em um centro de serviços da Access Canberra. Confira accesscanberra.act.gov.au para requisitos atuais e agendamentos.",
          es: "En un centro de servicios de Access Canberra. Consulta accesscanberra.act.gov.au para conocer los requisitos vigentes y reservar."
        }
      }
    ],
    verifiedAt: "2026-08-17"
  },
  {
    code: "NT",
    slug: "nt",
    stateName: "Northern Territory",
    testName: "Driver Knowledge Test",
    testAbbr: "DKT",
    authority: "Motor Vehicle Registry (MVR)",
    authorityAbbr: "MVR",
    authorityUrl: "nt.gov.au",
    examQuestions: 30,
    examPassMark: "26 of 30",
    metaTitle: "NT DKT Practice Test, Free Questions",
    descriptionTail: "The official MVR theory test has 30 questions, pass mark 26 of 30.",
    faq: [
      {
        q: {
          en: "How many questions are in the NT driver knowledge test?",
          pt: "Quantas questões tem o teste teórico de motorista do NT?",
          es: "¿Cuántas preguntas tiene el examen teórico de conductor del NT?"
        },
        a: {
          en: "The official theory test has 30 questions, drawn from a larger pool of road rules questions.",
          pt: "O teste teórico oficial tem 30 questões, sorteadas de um banco maior de questões de regras de trânsito.",
          es: "El examen teórico oficial tiene 30 preguntas, extraídas de un banco más amplio de preguntas de reglas de tránsito."
        }
      },
      {
        q: {
          en: "What score do I need to pass the NT test?",
          pt: "Que nota preciso para passar no teste do NT?",
          es: "¿Qué puntaje necesito para aprobar el examen del NT?"
        },
        a: {
          en: "You need 26 of 30 questions correct. The test is run by the Motor Vehicle Registry.",
          pt: "Você precisa acertar 26 das 30 questões. O teste é aplicado pelo Motor Vehicle Registry.",
          es: "Necesitas acertar 26 de las 30 preguntas. El examen lo administra el Motor Vehicle Registry."
        }
      },
      {
        q: {
          en: "Where do I sit the real test?",
          pt: "Onde faço o teste real?",
          es: "¿Dónde rindo el examen real?"
        },
        a: {
          en: "At a Motor Vehicle Registry office. See nt.gov.au for bookings and the DriveSafe NT program.",
          pt: "Em um escritório do Motor Vehicle Registry. Veja nt.gov.au para agendamentos e o programa DriveSafe NT.",
          es: "En una oficina del Motor Vehicle Registry. Consulta nt.gov.au para reservas y el programa DriveSafe NT."
        }
      }
    ],
    verifiedAt: "2026-08-16"
  }
];

// ponytail: TAS fica fora desta leva, o banco tem 0 perguntas de carro (16 moto).
// Adicionar aqui quando o banco TAS de carro existir.

export function findStateBySlug(slug: string): StateTestInfo | undefined {
  return STATE_TEST_INFO.find((s) => s.slug === slug);
}

export interface StateFaqEntry {
  q: string;
  a: string;
}

/**
 * FAQ completa do estado num idioma: itens verificados (LocalizedText) +
 * itens gerados com contagens reais do banco. Usada pelo client (idioma do
 * usuario) e pelo server (en, para o JSON-LD FAQPage).
 */
export function buildStateFaq(
  info: StateTestInfo,
  counts: { total: number; car: number; motorcycle: number },
  lang: UiLang
): StateFaqEntry[] {
  const s = t[lang];
  const testLabel = info.testAbbr ?? info.testName;
  const bankAnswer = fill(counts.motorcycle > 0 ? s.ltFaqBankABoth : s.ltFaqBankACarOnly, {
    total: counts.total,
    car: counts.car,
    moto: counts.motorcycle
  });

  return [
    ...info.faq.map((item) => ({ q: item.q[lang], a: item.a[lang] })),
    { q: fill(s.ltFaqBilingualQ, { test: testLabel }), a: s.ltFaqBilingualA },
    { q: fill(s.ltFaqBankQ, { code: info.code }), a: bankAnswer }
  ];
}
