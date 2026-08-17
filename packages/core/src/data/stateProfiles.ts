// Type-only import: a value import from ../index would close an import cycle
// (index re-exports this module) and leave PROFILES undefined at init time.
import type { AuStateCode } from "../index";

/**
 * Per-jurisdiction facts used by any copy that would otherwise hardcode WA.
 * Every number below is the car (class C) learner theory test as published by
 * the jurisdiction's own licensing authority — checked August 2026.
 */
export interface StateProfile {
  code: AuStateCode;
  /** Full jurisdiction name, e.g. "Western Australia". */
  name: string;
  /** Licensing authority as it should read in copy. */
  authority: string;
  /** Official name of the theory test. */
  testName: string;
  /** Official study handbook. */
  handbook: string;
  /** Landing page for the handbook (page, not PDF — PDF filenames rot). */
  handbookUrl: string;
  /** Car theory test: total questions and minimum correct answers to pass. */
  totalQuestions: number;
  minCorrect: number;
  /**
   * True when the pass mark is split across sections, so minCorrect/totalQuestions
   * understates what is actually required (you cannot trade one section off another).
   */
  sectioned: boolean;
  /**
   * Pass mark for display, spelling out the section minimums where they exist.
   * Single source for both the Learn copy and the /learner-test SEO pages.
   */
  passMarkLabel: string;
  /** Signed school zone speed limit in km/h (SA is the outlier at 25). */
  schoolZoneKmh: number;
}

const PROFILES: Record<AuStateCode, StateProfile> = {
  WA: {
    code: "WA",
    name: "Western Australia",
    authority: "Department of Transport (WA)",
    testName: "Computerised Theory Test (CTT)",
    handbook: "Drive Safe handbook",
    handbookUrl:
      "https://www.transport.wa.gov.au/licensing/drivers-licence/get-a-licence/car/learn-road-rules",
    totalQuestions: 30,
    minCorrect: 24,
    sectioned: false,
    passMarkLabel: "24 of 30",
    schoolZoneKmh: 40
  },
  NSW: {
    code: "NSW",
    name: "New South Wales",
    authority: "Transport for NSW",
    testName: "Driver Knowledge Test (DKT)",
    handbook: "Road User Handbook",
    handbookUrl: "https://www.service.nsw.gov.au/referral/road-user-handbook",
    // 15 general knowledge (min 12) + 30 road safety (min 29).
    totalQuestions: 45,
    minCorrect: 41,
    sectioned: true,
    passMarkLabel: "41 of 45 (12/15 general + 29/30 road safety)",
    schoolZoneKmh: 40
  },
  VIC: {
    code: "VIC",
    name: "Victoria",
    authority: "VicRoads",
    testName: "Learner Permit Knowledge Test",
    handbook: "Road to Solo Driving handbook",
    handbookUrl: "https://www.vicroads.vic.gov.au/licences/your-ls/your-learner-handbooks",
    totalQuestions: 32,
    minCorrect: 25,
    sectioned: false,
    passMarkLabel: "25 of 32 (78%)",
    schoolZoneKmh: 40
  },
  QLD: {
    code: "QLD",
    name: "Queensland",
    authority: "Department of Transport and Main Roads",
    testName: "written road rules test",
    handbook: "Your Keys to Driving in Queensland",
    handbookUrl: "https://www.publications.qld.gov.au/dataset/your-keys-to-driving-in-queensland",
    // 10 give way (min 9) + 20 road rules (min 18).
    totalQuestions: 30,
    minCorrect: 27,
    sectioned: true,
    passMarkLabel: "27 of 30 (9/10 give way + 18/20 road rules)",
    schoolZoneKmh: 40
  },
  SA: {
    code: "SA",
    name: "South Australia",
    authority: "Department for Infrastructure and Transport (Service SA)",
    testName: "Learner's Theory Test (LTT)",
    handbook: "The Driver's Handbook",
    handbookUrl: "https://mylicence.sa.gov.au/road-rules/the-drivers-handbook",
    // 8 give-way questions (all 8 required) + 42 general knowledge (min 32).
    totalQuestions: 50,
    minCorrect: 40,
    sectioned: true,
    passMarkLabel: "40 of 50 (8/8 give way + 32/42 general)",
    schoolZoneKmh: 25
  },
  TAS: {
    code: "TAS",
    name: "Tasmania",
    authority: "Department of State Growth (Service Tasmania)",
    testName: "Driver Knowledge Test",
    handbook: "Tasmanian Road Rules Handbook",
    handbookUrl:
      "https://www.transport.tas.gov.au/road_safety_and_rules/road_rules/tasmanian_road_rules/tasmanian_road_rules_booklet",
    // Compulsory 7/7 + traffic rules 4/5 + road rules 15/18 + road safety 4/5.
    totalQuestions: 35,
    minCorrect: 30,
    sectioned: true,
    passMarkLabel: "30 of 35, with a minimum in each section",
    schoolZoneKmh: 40
  },
  ACT: {
    code: "ACT",
    name: "Australian Capital Territory",
    authority: "Access Canberra",
    testName: "Road Rules Knowledge Test",
    handbook: "ACT Road Rules Handbook",
    handbookUrl:
      "https://www.accesscanberra.act.gov.au/driving-transport-and-parking/licences/get-your-learner-driver-licence",
    // 35 questions, max 4 wrong overall, and zero errors allowed in four categories.
    totalQuestions: 35,
    minCorrect: 31,
    sectioned: true,
    passMarkLabel: "31 of 35, and no mistakes in four categories",
    schoolZoneKmh: 40
  },
  NT: {
    code: "NT",
    name: "Northern Territory",
    authority: "Motor Vehicle Registry (MVR)",
    testName: "theory test",
    handbook: "Road Users' Handbook",
    handbookUrl:
      "https://nt.gov.au/driving/licence/getting-an-nt-licence/get-your-driver-licence/nt-road-users-handbook",
    totalQuestions: 30,
    minCorrect: 26,
    sectioned: false,
    passMarkLabel: "26 of 30",
    schoolZoneKmh: 40
  }
};

export const STATE_PROFILES: StateProfile[] = Object.values(PROFILES);

/** Falls back to WA for anything unrecognised, matching the app-wide default state. */
export function getStateProfile(code: string | null | undefined): StateProfile {
  return PROFILES[code as AuStateCode] ?? PROFILES.WA;
}

export function passPercent(profile: StateProfile): number {
  return Math.round((profile.minCorrect / profile.totalQuestions) * 100);
}

/**
 * Replaces {token} placeholders in copy with the selected jurisdiction's facts.
 * Unknown tokens are left untouched so a typo shows up instead of silently vanishing.
 * `extra` carries tokens the caller resolves per UI language (e.g. sectionNote).
 */
export function applyStateTokens(
  text: string,
  profile: StateProfile,
  extra: Record<string, string> = {}
): string {
  const values: Record<string, string> = {
    ...extra,
    state: profile.name,
    stateCode: profile.code,
    authority: profile.authority,
    testName: profile.testName,
    handbook: profile.handbook,
    questions: String(profile.totalQuestions),
    minCorrect: String(profile.minCorrect),
    passPct: String(passPercent(profile)),
    schoolZone: String(profile.schoolZoneKmh)
  };
  return text
    .replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match)
    .replace(/\s{2,}/g, " ")
    .trim();
}
