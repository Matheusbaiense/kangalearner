import type { UiLang } from "@/lib/i18n";

/**
 * Overseas Licence in WA hub. The biggest content gap among competitors
 * (DKT covers NSW; EzLicence sells conversions but no WA guide). Newcomer wedge.
 *
 * IMPORTANT: content is conservative and source-linked. The authoritative list of
 * "recognised countries" and current rules live with the Department of Transport WA.
 * Every page shows a VerifiedBadge + "confirm with DoT". Treat copy as pending SME review.
 */

export type RecognitionStatus = "recognised" | "not-recognised" | "check";

export interface OverseasCountry {
  /** ISO-3166 alpha-2, lowercase. Used as the route slug */
  code: string;
  flag: string;
  name: Record<UiLang, string>;
  /** Whether WA generally recognises this country's licence for conversion without a practical test */
  status: RecognitionStatus;
  /** 1-2 line summary, localized */
  summary: Record<UiLang, string>;
  /** Whether the WA theory (Computerised Theory Test) is typically required */
  theoryTestLikely: boolean;
}

const OFFICIAL_DOT =
  "https://www.transport.wa.gov.au/licensing/transfer-an-overseas-drivers-licence.asp";
const OFFICIAL_RECOGNISED = "https://www.transport.wa.gov.au/licensing/recognised-countries.asp";

export const OVERSEAS_OFFICIAL_LINKS = {
  transfer: OFFICIAL_DOT,
  recognised: OFFICIAL_RECOGNISED
};

/** Shared, country-agnostic guidance (the hub intro + the "while visiting" rules). */
export const OVERSEAS_GENERAL: Record<
  UiLang,
  {
    kicker: string;
    title: string;
    intro: string;
    visitingTitle: string;
    visiting: string[];
    convertTitle: string;
    convert: string[];
    recognisedTitle: string;
    recognised: string;
    notRecognisedTitle: string;
    notRecognised: string;
    chooseCountry: string;
    verifyNote: string;
  }
> = {
  en: {
    kicker: "Driving in WA with an overseas licence",
    title: "Already drive? Here's how it works in Western Australia",
    intro:
      "If you arrived in WA with a licence from another country, what you need to do depends on your visa, how long you'll stay, and whether your country is on WA's recognised list. This guide explains the path. And where KangaLearner helps you pass the theory test.",
    visitingTitle: "Visiting or on a temporary visa?",
    visiting: [
      "You can generally drive on a current, valid overseas licence while it stays valid.",
      "If your licence is not in English, carry an official English translation or an International Driving Permit (IDP).",
      "You must follow WA road rules. Being on a foreign licence is not a defence if you break them.",
      "Always confirm your exact situation with the Department of Transport (DoT)."
    ],
    convertTitle: "Becoming a WA resident? You'll need to convert",
    convert: [
      "Permanent residents generally must transfer to a WA licence within 3 months.",
      "Whether you need to sit tests depends on whether your country is recognised by WA.",
      "Prove your identity, pass an eyesight test, and pay the fees.",
      "You keep driving legally while you complete the transfer. Check the DoT steps."
    ],
    recognisedTitle: "From a recognised country",
    recognised:
      "If WA recognises your country, an experienced driver can often transfer without sitting the theory or practical test. Check the official recognised-countries list to be sure.",
    notRecognisedTitle: "From a country that isn't recognised",
    notRecognised:
      "You'll usually need to pass the WA theory test (Computerised Theory Test) and a practical driving assessment (PDA). That's exactly what KangaLearner prepares you for. Free, in your language.",
    chooseCountry: "Find your country",
    verifyNote:
      "Rules change and depend on your visa. This is a plain-English guide, not legal advice. Always confirm with the Department of Transport WA."
  },
  pt: {
    kicker: "Dirigir em WA com licença estrangeira",
    title: "Já dirige? Veja como funciona em Western Australia",
    intro:
      "Se você chegou em WA com uma habilitação de outro país, o que fazer depende do seu visto, do tempo que vai ficar e de o seu país estar ou não na lista de países reconhecidos por WA. Este guia explica o caminho. E onde o KangaLearner te ajuda a passar na prova teórica.",
    visitingTitle: "De visita ou com visto temporário?",
    visiting: [
      "Em geral você pode dirigir com a habilitação estrangeira válida enquanto ela estiver válida.",
      "Se a habilitação não estiver em inglês, leve uma tradução oficial em inglês ou uma Permissão Internacional para Dirigir (PID).",
      "Você precisa seguir as regras de trânsito de WA. Estar com habilitação estrangeira não é desculpa se infringir.",
      "Confirme sempre a sua situação exata com o Departamento de Transportes (DoT)."
    ],
    convertTitle: "Vai morar em WA? Vai precisar converter",
    convert: [
      "Residentes permanentes geralmente devem transferir para a licença de WA em até 3 meses.",
      "Se você precisa fazer provas depende de o seu país ser reconhecido por WA.",
      "Comprove sua identidade, passe no teste de visão e pague as taxas.",
      "Você continua dirigindo legalmente enquanto faz a transferência. Veja os passos do DoT."
    ],
    recognisedTitle: "De um país reconhecido",
    recognised:
      "Se WA reconhece o seu país, um motorista experiente costuma transferir sem fazer a prova teórica ou prática. Confira a lista oficial de países reconhecidos para ter certeza.",
    notRecognisedTitle: "De um país não reconhecido",
    notRecognised:
      "Normalmente você terá que passar na prova teórica de WA (Computerised Theory Test) e na avaliação prática (PDA). É exatamente para isso que o KangaLearner te prepara. Grátis e na sua língua.",
    chooseCountry: "Encontre o seu país",
    verifyNote:
      "As regras mudam e dependem do seu visto. Este é um guia em linguagem simples, não aconselhamento jurídico. Confirme sempre com o Departamento de Transportes de WA."
  },
  es: {
    kicker: "Conducir en WA con licencia extranjera",
    title: "¿Ya conduces? Así funciona en Western Australia",
    intro:
      "Si llegaste a WA con una licencia de otro país, lo que debes hacer depende de tu visa, cuánto te quedarás y de si tu país está en la lista de países reconocidos por WA. Esta guía explica el camino. Y dónde KangaLearner te ayuda a aprobar el examen teórico.",
    visitingTitle: "¿De visita o con visa temporal?",
    visiting: [
      "En general puedes conducir con tu licencia extranjera válida mientras siga vigente.",
      "Si tu licencia no está en inglés, lleva una traducción oficial al inglés o un Permiso Internacional de Conducir (PIC).",
      "Debes cumplir las reglas de tránsito de WA. Tener licencia extranjera no es excusa si las infringes.",
      "Confirma siempre tu situación exacta con el Departamento de Transporte (DoT)."
    ],
    convertTitle: "¿Vas a residir en WA? Tendrás que convertirla",
    convert: [
      "Los residentes permanentes generalmente deben transferir a una licencia de WA en un plazo de 3 meses.",
      "Si necesitas presentar exámenes depende de si tu país es reconocido por WA.",
      "Prueba tu identidad, aprueba el examen de la vista y paga las tarifas.",
      "Sigues conduciendo legalmente mientras completas la transferencia. Revisa los pasos del DoT."
    ],
    recognisedTitle: "Desde un país reconocido",
    recognised:
      "Si WA reconoce tu país, un conductor con experiencia suele transferir sin presentar el examen teórico ni práctico. Revisa la lista oficial de países reconocidos para asegurarte.",
    notRecognisedTitle: "Desde un país no reconocido",
    notRecognised:
      "Normalmente tendrás que aprobar el examen teórico de WA (Computerised Theory Test) y la evaluación práctica (PDA). Para eso justamente te prepara KangaLearner. Gratis y en tu idioma.",
    chooseCountry: "Encuentra tu país",
    verifyNote:
      "Las reglas cambian y dependen de tu visa. Esta es una guía en lenguaje claro, no asesoría legal. Confirma siempre con el Departamento de Transporte de WA."
  }
};

export const OVERSEAS_COUNTRIES: OverseasCountry[] = [
  {
    code: "br",
    flag: "🇧🇷",
    name: { en: "Brazil", pt: "Brasil", es: "Brasil" },
    status: "check",
    theoryTestLikely: true,
    summary: {
      en: "Brazil is generally not on WA's recognised list, so most Brazilian drivers need to pass the WA theory test and practical assessment to convert.",
      pt: "O Brasil geralmente não está na lista de países reconhecidos por WA, então a maioria dos motoristas brasileiros precisa passar na prova teórica e na prática de WA para converter.",
      es: "Brasil generalmente no está en la lista reconocida por WA, así que la mayoría de los conductores brasileños deben aprobar el examen teórico y práctico de WA para convertir."
    }
  },
  {
    code: "co",
    flag: "🇨🇴",
    name: { en: "Colombia", pt: "Colômbia", es: "Colombia" },
    status: "check",
    theoryTestLikely: true,
    summary: {
      en: "Colombia is generally not recognised by WA, so you'll usually need the WA theory test and a practical driving assessment.",
      pt: "A Colômbia geralmente não é reconhecida por WA, então você normalmente precisará da prova teórica e da avaliação prática de WA.",
      es: "Colombia generalmente no es reconocida por WA, así que normalmente necesitarás el examen teórico y la evaluación práctica de WA."
    }
  },
  {
    code: "es",
    flag: "🇪🇸",
    name: { en: "Spain", pt: "Espanha", es: "España" },
    status: "recognised",
    theoryTestLikely: false,
    summary: {
      en: "Spain is commonly recognised by WA, so an experienced driver can often transfer without the theory or practical test. Confirm on the official recognised-countries list.",
      pt: "A Espanha costuma ser reconhecida por WA, então um motorista experiente normalmente transfere sem prova teórica ou prática. Confirme na lista oficial de países reconhecidos.",
      es: "España suele ser reconocida por WA, así que un conductor con experiencia normalmente transfiere sin examen teórico ni práctico. Confírmalo en la lista oficial de países reconocidos."
    }
  }
];

export function findCountry(code: string): OverseasCountry | undefined {
  return OVERSEAS_COUNTRIES.find((c) => c.code === code.toLowerCase());
}
