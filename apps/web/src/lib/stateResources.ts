import type { AuStateCode } from "@kanga/core";
import type { UiLang } from "@/lib/i18n";

type Localized = Record<UiLang, string>;

/**
 * Per-state facts for the /resources hub: supervised-hours minimums and the
 * official pages a learner actually needs (steps, practice test, logbook,
 * hazard test, booking). Exam facts (questions/pass mark/handbook) live in
 * STATE_PROFILES (@kanga/core) — do not duplicate them here.
 * All figures checked against the state's own licensing pages, August 2026.
 */
export interface StateHours {
  total: number;
  night: number;
  /** Hour minimums apply to learners under this age; absent = all ages (TAS). */
  appliesUnder?: number;
  /** Localized exception note (ACT over-25 track, TAS no age exemption…). */
  note?: Localized;
}

export interface StateResourceLinks {
  /** Official "get your licence" steps page. */
  steps: string;
  /** Official practice/theory test page. */
  practiceTest: string;
  /** Official logbook / supervised hours page. */
  logbook?: string;
  /** Official hazard perception test page, when the learner stage has one. */
  hazard?: string;
  /** Official booking portal, when it differs from the steps page. */
  booking?: string;
}

export interface StateResources {
  code: AuStateCode;
  /** null = no minimum supervised hours (NT). */
  hours: StateHours | null;
  /** null = no hazard test in the learner stage (QLD sits it later, NT has none). */
  hazardTestName: string | null;
  practicalTestName: string;
  links: StateResourceLinks;
}

const RESOURCES: Record<AuStateCode, StateResources> = {
  WA: {
    code: "WA",
    hours: { total: 50, night: 5, appliesUnder: 25 },
    hazardTestName: "Hazard Perception Test (HPT)",
    practicalTestName: "Practical Driving Assessment (PDA)",
    links: {
      steps: "https://www.transport.wa.gov.au/licensing/drivers-licence/get-a-licence/car",
      practiceTest:
        "https://www.transport.wa.gov.au/licensing/drivers-licence/get-a-licence/car/take-theory-test",
      logbook:
        "https://transport.wa.gov.au/licensing/drivers-licence/get-a-licence/learner-driver-resources/digital-learner-log-book",
      hazard: "https://www.transport.wa.gov.au/licensing/hazard-perception-test.asp",
      booking: "https://online.transport.wa.gov.au/dotOnline/"
    }
  },
  NSW: {
    code: "NSW",
    hours: { total: 120, night: 20, appliesUnder: 25 },
    hazardTestName: "Hazard Perception Test (HPT)",
    practicalTestName: "Driving Test",
    links: {
      steps:
        "https://www.nsw.gov.au/driving-boating-and-transport/driver-and-rider-licences/driver-licences/learner-driver-licence",
      practiceTest: "https://www.service.nsw.gov.au/referral/road-user-handbook",
      logbook:
        "https://www.nsw.gov.au/driving-boating-and-transport/driver-and-rider-licences/driver-licences/learner-driver-licence/using-your-learner-driver-log-book",
      hazard:
        "https://www.nsw.gov.au/driving-boating-and-transport/driver-and-rider-licences/driver-licences/driver-licence-tests"
    }
  },
  VIC: {
    code: "VIC",
    hours: { total: 120, night: 20, appliesUnder: 21 },
    hazardTestName: "Hazard Perception Test (HPT)",
    practicalTestName: "Drive Test",
    links: {
      steps: "https://www.vicroads.vic.gov.au/licences/your-ls",
      practiceTest: "https://www.vicroads.vic.gov.au/ls-and-ps/getting-your-ls/learner-permit-test"
    }
  },
  QLD: {
    code: "QLD",
    hours: { total: 100, night: 10, appliesUnder: 25 },
    // QLD's hazard perception test is sat later, on P1 — not a learner-stage step.
    hazardTestName: null,
    practicalTestName: "practical driving test",
    links: {
      steps: "https://www.qld.gov.au/transport/licensing/driver-licensing/applying/learner",
      practiceTest: "https://www.service.transport.qld.gov.au/practiceroadrulestest/",
      logbook: "https://www.qld.gov.au/transport/licensing/getting/learner-logbook"
    }
  },
  SA: {
    code: "SA",
    hours: { total: 75, night: 15, appliesUnder: 25 },
    hazardTestName: "Hazard Perception Test",
    practicalTestName: "practical driving test (VORT or CBT&A)",
    links: {
      steps: "https://www.mylicence.sa.gov.au/my-car-licence",
      practiceTest: "https://www.mylicence.sa.gov.au/my-car-licence/practice-theory-test",
      logbook: "https://www.mylicence.sa.gov.au/the-driving-companion",
      hazard: "https://www.mylicence.sa.gov.au/my-car-licence"
    }
  },
  TAS: {
    code: "TAS",
    hours: {
      total: 80,
      night: 15,
      note: {
        en: "Tasmania has no age exemption: every learner logs the full hours.",
        pt: "A Tasmânia não tem isenção por idade: todo learner registra as horas completas.",
        es: "Tasmania no tiene exención por edad: todo learner registra las horas completas."
      }
    },
    hazardTestName: "Hazard Perception Test",
    practicalTestName: "P1 Practical Driving Assessment",
    links: {
      steps: "https://www.transport.tas.gov.au/licensing",
      practiceTest: "https://www.transport.tas.gov.au/dkts/practiceDKTSWelcome.jsp?CAR~Y",
      logbook: "https://www.transport.tas.gov.au/licensing"
    }
  },
  ACT: {
    code: "ACT",
    hours: {
      total: 100,
      night: 10,
      appliesUnder: 25,
      note: {
        en: "Aged 25 or over when your learner licence was issued? The minimum drops to 50 hours including 5 at night.",
        pt: "Tinha 25 anos ou mais quando tirou a learner licence? O mínimo cai para 50 horas, incluindo 5 à noite.",
        es: "¿Tenías 25 años o más al obtener la learner licence? El mínimo baja a 50 horas, incluyendo 5 de noche."
      }
    },
    hazardTestName: "Hazard Perception Test (online)",
    practicalTestName: "driving assessment (one-off or CBT&A)",
    links: {
      steps:
        "https://www.accesscanberra.act.gov.au/driving-transport-and-parking/licences/get-your-learner-driver-licence",
      practiceTest: "https://safeplatestesting.act.gov.au",
      hazard: "https://safeplatestesting.act.gov.au"
    }
  },
  NT: {
    code: "NT",
    hours: null,
    hazardTestName: null,
    practicalTestName: "practical driving test",
    links: {
      steps: "https://nt.gov.au/driving/licences/get-your-driver-licence",
      practiceTest:
        "https://service.nt.gov.au/services/driving-transport/licences/practice-driver-rider-knowledge-test"
    }
  }
};

export function getStateResources(code: string): StateResources {
  return RESOURCES[code as AuStateCode] ?? RESOURCES.WA;
}
