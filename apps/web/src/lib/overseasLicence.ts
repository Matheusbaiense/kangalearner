import type { UiLang } from "@/lib/i18n";
import { getStateGls, type StateGls } from "@/lib/stateJourney";

type Localized = Record<UiLang, string>;

export type RecognitionStatus = "recognised" | "not-recognised" | "check";

export interface OverseasCountry {
  /** ISO-3166 alpha-2, lowercase. Used as the route slug */
  code: string;
  flag: string;
  name: Localized;
  /**
   * Experienced-driver recognition follows the nationally harmonised list, so a
   * country's status is the same in every jurisdiction — the page still sends
   * the reader to the selected state's own official list to confirm.
   */
  status: RecognitionStatus;
  theoryTestLikely: boolean;
  summary: Localized;
}

/** Official transfer + recognised-countries pages for the selected jurisdiction. */
export function getOverseasLinks(code: string): { transfer: string; recognised: string } {
  const gls = getStateGls(code);
  return {
    transfer: gls.overseas.transferUrl,
    recognised: gls.overseas.recognisedUrl || gls.overseas.transferUrl
  };
}

export interface OverseasGeneralCopy {
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

/**
 * Copy for the overseas-licence guide. Strings carry {tokens} for useStateCopy;
 * the first "visiting" and "convert" bullets are the state-specific rules from
 * the verified GLS data, the rest is nationally true.
 */
export function buildOverseasGeneral(gls: StateGls): Record<UiLang, OverseasGeneralCopy> {
  return {
    en: {
      kicker: "Driving in {stateCode} with an overseas licence",
      title: "Already drive? Here's how it works in {state}",
      intro:
        "If you arrived in {state} with a licence from another country, what you need to do depends on your visa, how long you'll stay, and whether your country is on the recognised list. This guide explains the path. And where KangaLearner helps you pass the theory test.",
      visitingTitle: "Visiting or on a temporary visa?",
      visiting: [
        gls.overseas.tempVisaRule.en,
        "If your licence is not in English, carry an official English translation or an International Driving Permit (IDP).",
        "You must follow {state} road rules. Being on a foreign licence is not a defence if you break them.",
        "Always confirm your exact situation with {authority}."
      ],
      convertTitle: "Becoming a resident? You'll need to convert",
      convert: [
        gls.overseas.prDeadline.en,
        "Whether you need to sit tests depends on whether your country is on the recognised list.",
        "Prove your identity, pass an eyesight test, and pay the fees.",
        "Check the official {authority} steps before you book anything."
      ],
      recognisedTitle: "From a recognised country",
      recognised:
        "If your country is on the recognised list, you can usually transfer without sitting the theory or practical test. Check the official list to be sure — the old 'experienced driver' category ended in 2026.",
      notRecognisedTitle: "From a country that isn't recognised",
      notRecognised:
        "You'll usually need to pass the {state} theory test ({testName}) and a practical driving test. That's exactly what KangaLearner prepares you for. Free, in your language.",
      chooseCountry: "Find your country",
      verifyNote:
        "Rules change and depend on your visa. This is a plain-English guide, not legal advice. Always confirm with {authority}."
    },
    pt: {
      kicker: "Dirigir em {stateCode} com licença estrangeira",
      title: "Já dirige? Veja como funciona em {state}",
      intro:
        "Se você chegou em {state} com uma habilitação de outro país, o que fazer depende do seu visto, do tempo que vai ficar e de o seu país estar ou não na lista de reconhecidos. Este guia explica o caminho. E onde o KangaLearner te ajuda a passar na prova teórica.",
      visitingTitle: "De visita ou com visto temporário?",
      visiting: [
        gls.overseas.tempVisaRule.pt,
        "Se a habilitação não estiver em inglês, leve uma tradução oficial em inglês ou uma Permissão Internacional para Dirigir (PID).",
        "Você precisa seguir as regras de trânsito de {state}. Estar com habilitação estrangeira não é desculpa se infringir.",
        "Confirme sempre a sua situação exata com o {authority}."
      ],
      convertTitle: "Vai morar aqui? Vai precisar converter",
      convert: [
        gls.overseas.prDeadline.pt,
        "Se você precisa fazer provas depende de o seu país estar na lista de reconhecidos.",
        "Comprove sua identidade, passe no teste de visão e pague as taxas.",
        "Veja os passos oficiais do {authority} antes de agendar qualquer coisa."
      ],
      recognisedTitle: "De um país reconhecido",
      recognised:
        "Se o seu país está na lista de reconhecidos, você normalmente transfere sem fazer a prova teórica ou prática. Confira a lista oficial para ter certeza — a antiga categoria de 'motorista experiente' acabou em 2026.",
      notRecognisedTitle: "De um país não reconhecido",
      notRecognised:
        "Normalmente você terá que passar na prova teórica de {state} ({testName}) e numa prova prática de direção. É exatamente para isso que o KangaLearner te prepara. Grátis e na sua língua.",
      chooseCountry: "Encontre o seu país",
      verifyNote:
        "As regras mudam e dependem do seu visto. Este é um guia em linguagem simples, não aconselhamento jurídico. Confirme sempre com o {authority}."
    },
    es: {
      kicker: "Conducir en {stateCode} con licencia extranjera",
      title: "¿Ya conduces? Así funciona en {state}",
      intro:
        "Si llegaste a {state} con una licencia de otro país, lo que debes hacer depende de tu visa, cuánto te quedarás y de si tu país está en la lista de reconocidos. Esta guía explica el camino. Y dónde KangaLearner te ayuda a aprobar el examen teórico.",
      visitingTitle: "¿De visita o con visa temporal?",
      visiting: [
        gls.overseas.tempVisaRule.es,
        "Si tu licencia no está en inglés, lleva una traducción oficial al inglés o un Permiso Internacional de Conducir (PIC).",
        "Debes cumplir las reglas de tránsito de {state}. Tener licencia extranjera no es excusa si las infringes.",
        "Confirma siempre tu situación exacta con {authority}."
      ],
      convertTitle: "¿Vas a residir aquí? Tendrás que convertirla",
      convert: [
        gls.overseas.prDeadline.es,
        "Si necesitas presentar exámenes depende de si tu país está en la lista de reconocidos.",
        "Prueba tu identidad, aprueba el examen de la vista y paga las tarifas.",
        "Revisa los pasos oficiales de {authority} antes de reservar nada."
      ],
      recognisedTitle: "Desde un país reconocido",
      recognised:
        "Si tu país está en la lista de reconocidos, normalmente puedes transferir sin presentar el examen teórico ni práctico. Revisa la lista oficial para asegurarte — la antigua categoría de 'conductor con experiencia' terminó en 2026.",
      notRecognisedTitle: "Desde un país no reconocido",
      notRecognised:
        "Normalmente tendrás que aprobar el examen teórico de {state} ({testName}) y un examen práctico de conducción. Para eso justamente te prepara KangaLearner. Gratis y en tu idioma.",
      chooseCountry: "Encuentra tu país",
      verifyNote:
        "Las reglas cambian y dependen de tu visa. Esta es una guía en lenguaje claro, no asesoría legal. Confirma siempre con {authority}."
    }
  };
}

export const OVERSEAS_COUNTRIES: OverseasCountry[] = [
  {
    code: "br",
    flag: "🇧🇷",
    name: { en: "Brazil", pt: "Brasil", es: "Brasil" },
    status: "check",
    theoryTestLikely: true,
    summary: {
      en: "Brazil is generally not on the Australian recognised list, so most Brazilian drivers need to pass the {state} theory test and practical test to convert.",
      pt: "O Brasil geralmente não está na lista australiana de países reconhecidos, então a maioria dos motoristas brasileiros precisa passar na prova teórica e na prática de {state} para converter.",
      es: "Brasil generalmente no está en la lista australiana de países reconocidos, así que la mayoría de los conductores brasileños deben aprobar el examen teórico y práctico de {state} para convertir."
    }
  },
  {
    code: "co",
    flag: "🇨🇴",
    name: { en: "Colombia", pt: "Colômbia", es: "Colombia" },
    status: "check",
    theoryTestLikely: true,
    summary: {
      en: "Colombia is generally not on the Australian recognised list, so you'll usually need the {state} theory test and a practical driving test.",
      pt: "A Colômbia geralmente não está na lista australiana de reconhecidos, então você normalmente precisará da prova teórica e da prova prática de {state}.",
      es: "Colombia generalmente no está en la lista australiana de reconocidos, así que normalmente necesitarás el examen teórico y el examen práctico de {state}."
    }
  },
  {
    code: "es",
    flag: "🇪🇸",
    name: { en: "Spain", pt: "Espanha", es: "España" },
    status: "recognised",
    theoryTestLikely: false,
    summary: {
      en: "Spain is on the Australian recognised list, so you can usually transfer without the theory or practical test. Confirm on the official {state} recognised-countries list.",
      pt: "A Espanha está na lista australiana de reconhecidos, então você normalmente transfere sem prova teórica ou prática. Confirme na lista oficial de {state}.",
      es: "España está en la lista australiana de reconocidos, así que normalmente puedes transferir sin examen teórico ni práctico. Confírmalo en la lista oficial de {state}."
    }
  }
];

export function findCountry(code: string): OverseasCountry | undefined {
  return OVERSEAS_COUNTRIES.find((c) => c.code === code.toLowerCase());
}
