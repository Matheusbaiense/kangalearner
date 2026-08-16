import type { AuStateCode } from "@kanga/core";

export interface StateFaqItem {
  q: string;
  a: string;
}

/**
 * Fatos oficiais por estado para as paginas SEO /learner-test/[state].
 * REGRA: examQuestions/examPassMark ficam null enquanto nao confirmados em
 * fonte oficial do governo (verifiedAt marca a data da checagem).
 * Contagens do banco de perguntas NAO entram aqui: sao calculadas em build
 * a partir de QUESTIONS + filterByState.
 */
export interface StateTestInfo {
  code: AuStateCode;
  slug: string;
  stateName: string;
  testName: string;
  testAbbr: string | null;
  authority: string;
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
    authorityUrl: "transport.wa.gov.au",
    examQuestions: 30,
    examPassMark: "24 of 30",
    metaTitle: "WA CTT Practice Test, Free Questions",
    descriptionTail: "The official Computerised Theory Test has 30 questions, pass mark 24 of 30.",
    faq: [
      {
        q: "How many questions are in the WA learner theory test?",
        a: "The official Computerised Theory Test (CTT) has 30 multiple choice questions. You need at least 24 correct answers, a pass mark of 80%."
      },
      {
        q: "Who runs the learner theory test in WA?",
        a: "The Department of Transport WA. You sit the CTT at a driver and vehicle services centre or an agent location."
      },
      {
        q: "Where do I book the real CTT?",
        a: "Book through the Department of Transport WA. Check transport.wa.gov.au for locations, fees and current requirements."
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
    authorityUrl: "service.nsw.gov.au",
    examQuestions: 45,
    examPassMark: "41 of 45",
    metaTitle: "NSW DKT Practice Test, Free Learner Questions",
    descriptionTail: "The official Driver Knowledge Test has 45 questions, pass mark 41 of 45.",
    faq: [
      {
        q: "How many questions are in the NSW DKT?",
        a: "The official Driver Knowledge Test has 45 questions: 15 general knowledge and 30 road safety, set by Transport for NSW."
      },
      {
        q: "What score do I need to pass the DKT?",
        a: "You need 41 of 45 overall: at least 12 of 15 general knowledge questions and 29 of 30 road safety questions."
      },
      {
        q: "Where do I sit the real DKT?",
        a: "At a Service NSW centre, or online through DKT Online. Bookings and eligibility are handled via service.nsw.gov.au."
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
    authorityUrl: "vicroads.vic.gov.au",
    examQuestions: 32,
    examPassMark: "78%",
    metaTitle: "VIC Learner Permit Test Practice, Free",
    descriptionTail:
      "The official VicRoads Learner Permit Knowledge Test has 32 questions, pass mark 78%.",
    faq: [
      {
        q: "How many questions are in the VIC learner permit test?",
        a: "The official VicRoads Learner Permit Knowledge Test has 32 multiple choice questions."
      },
      {
        q: "What score do I need to pass the VIC test?",
        a: "The pass mark is 78%, which means 25 of 32 questions correct."
      },
      {
        q: "Where do I sit the real test?",
        a: "At a VicRoads customer service centre. Book and check current requirements at vicroads.vic.gov.au."
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
    authorityUrl: "tmr.qld.gov.au",
    examQuestions: 30,
    examPassMark: "9/10 + 18/20",
    metaTitle: "QLD Road Rules Test Practice, Free Questions",
    descriptionTail:
      "The official TMR road rules test has 30 questions: 10 give way and 20 road rules.",
    faq: [
      {
        q: "How many questions are in the QLD road rules test?",
        a: "The official test has 30 questions: 10 give way questions and 20 general road rules questions."
      },
      {
        q: "What score do I need to pass the QLD test?",
        a: "You need 9 of 10 give way questions and 18 of 20 road rules questions correct. You can also complete PrepL, the online learning alternative."
      },
      {
        q: "Where do I sit the real test?",
        a: "At a Department of Transport and Main Roads customer service centre, or online through PrepL. See tmr.qld.gov.au for details."
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
    authorityUrl: "mylicence.sa.gov.au",
    examQuestions: 50,
    examPassMark: "8/8 + 32/42",
    metaTitle: "SA Learner Theory Test Practice, Free",
    descriptionTail:
      "The official Learner's Theory Test has 50 questions: 8 give way and 42 multiple choice.",
    faq: [
      {
        q: "How many questions are in the SA learner's theory test?",
        a: "The official Learner's Theory Test has 50 questions in two parts: 8 give way questions and 42 multiple choice questions."
      },
      {
        q: "What score do I need to pass the SA test?",
        a: "You must answer all 8 give way questions correctly, then at least 32 of the 42 multiple choice questions."
      },
      {
        q: "Where do I sit the real test?",
        a: "At a Service SA centre, or online through the myLs course. See mylicence.sa.gov.au for bookings and fees."
      }
    ],
    verifiedAt: "2026-08-16"
  },
  {
    code: "ACT",
    slug: "act",
    stateName: "Australian Capital Territory",
    testName: "Road Rules Knowledge Test",
    testAbbr: "RRKT",
    authority: "Access Canberra",
    authorityUrl: "accesscanberra.act.gov.au",
    // Numeros do exame nao confirmados em fonte oficial; ficam fora ate verificacao.
    examQuestions: null,
    examPassMark: null,
    metaTitle: "ACT Road Rules Test Practice, Free",
    descriptionTail: "Prepare for the Road Rules Knowledge Test run by Access Canberra.",
    faq: [
      {
        q: "Who runs the road rules test in the ACT?",
        a: "Access Canberra runs the Road Rules Knowledge Test (RRKT). You must complete a pre-learner licence training course before you can sit it."
      },
      {
        q: "What should I study for the RRKT?",
        a: "The ACT Road Rules Handbook published by Access Canberra. Every question in the real test comes from that handbook."
      },
      {
        q: "Where do I sit the real RRKT?",
        a: "At an Access Canberra service centre. Check accesscanberra.act.gov.au for current requirements and bookings."
      }
    ],
    verifiedAt: "2026-08-16"
  },
  {
    code: "NT",
    slug: "nt",
    stateName: "Northern Territory",
    testName: "Driver Knowledge Test",
    testAbbr: "DKT",
    authority: "Motor Vehicle Registry (MVR)",
    authorityUrl: "nt.gov.au",
    examQuestions: 30,
    examPassMark: "26 of 30",
    metaTitle: "NT DKT Practice Test, Free Questions",
    descriptionTail: "The official MVR theory test has 30 questions, pass mark 26 of 30.",
    faq: [
      {
        q: "How many questions are in the NT driver knowledge test?",
        a: "The official theory test has 30 questions, drawn from a larger pool of road rules questions."
      },
      {
        q: "What score do I need to pass the NT test?",
        a: "You need 26 of 30 questions correct. The test is run by the Motor Vehicle Registry."
      },
      {
        q: "Where do I sit the real test?",
        a: "At a Motor Vehicle Registry office. See nt.gov.au for bookings and the DriveSafe NT program."
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
