import type { AuStateCode } from "@kanga/core";
import type { UiLang } from "@/lib/i18n";

type Localized = Record<UiLang, string>;

/**
 * Graduated-licensing and overseas-licence facts per jurisdiction, feeding the
 * /journey, /supervisor and /overseas-licence guides. Exam facts live in
 * STATE_PROFILES (@kanga/core); supervised hours live in stateResources.ts.
 * Every figure and URL below was taken from the state's own licensing pages and
 * adversarially re-verified against those pages on GLS_VERIFIED_AT.
 */
export interface StateGls {
  code: AuStateCode;
  /** Learner stage. */
  learner: {
    minAge: number;
    /** Months the learner licence must be held before the practical test; 0 = none. */
    minTenureMonths: number;
    /** Who the tenure applies to / exemptions. Null when there is nothing to add. */
    tenureNote: Localized | null;
  };
  /** First (or only) provisional stage. */
  p1: {
    minAge: number;
    months: number;
    /** Display name, e.g. "P1 (Red P)" or "Provisional". */
    label: string;
    /** State-specific restrictions worth calling out. */
    note: Localized | null;
  };
  /** Second provisional stage; null = the state has a single provisional stage. */
  p2: {
    months: number;
    label: string;
  } | null;
  /** What the supervising driver must hold. */
  supervisor: Localized;
  /** Official graduated-licensing overview page. */
  glsUrl: string;
  overseas: {
    /** Rule for visitors / temporary visa holders driving on an overseas licence. */
    tempVisaRule: Localized;
    /** Transfer deadline for permanent residents. */
    prDeadline: Localized;
    /** Official recognised-countries / experienced-driver-recognition page. */
    recognisedUrl: string;
    /** Official overseas-licence transfer page. */
    transferUrl: string;
  };
}

export const GLS_VERIFIED_AT = "2026-08-17";

const GLS: Record<AuStateCode, StateGls> = {
  WA: {
    code: "WA",
    learner: {
      minAge: 16,
      minTenureMonths: 6,
      tenureNote: {
        en: "The 6 months applies to every learner, any age — only the 50 supervised hours are waived at 25+.",
        pt: "Os 6 meses valem para todo learner, qualquer idade — só as 50 horas supervisionadas são dispensadas aos 25+.",
        es: "Los 6 meses aplican a todo learner, a cualquier edad — solo las 50 horas supervisadas se eximen a los 25+."
      }
    },
    p1: {
      minAge: 17,
      months: 24,
      label: "Provisional (Red P → Green P)",
      note: {
        en: "One provisional stage: 2 years (or until 19, whichever is longer). Red plates for the first 6 months bring a midnight–5am driving ban and a one-passenger limit; green plates for the remaining 18 months. Zero BAC throughout.",
        pt: "Estágio provisório único: 2 anos (ou até os 19, o que durar mais). Placas vermelhas nos 6 primeiros meses trazem proibição de dirigir da meia-noite às 5h e limite de um passageiro; placas verdes nos 18 meses restantes. Zero BAC o tempo todo.",
        es: "Etapa provisional única: 2 años (o hasta los 19, lo que dure más). Las placas rojas de los primeros 6 meses traen prohibición de conducir de medianoche a 5am y límite de un pasajero; placas verdes los 18 meses restantes. Cero BAC todo el tiempo."
      }
    },
    p2: null,
    supervisor: {
      en: "The supervisor must have held a current driver's licence for at least 4 years, for the vehicle type being driven (manual car → supervisor licensed for manual), stay under the same alcohol/drug limits as a driver, and sign the log book after each session.",
      pt: "O supervisor deve ter carteira válida há pelo menos 4 anos, para o tipo de veículo dirigido (carro manual → supervisor habilitado em manual), respeitar os mesmos limites de álcool/drogas de quem dirige e assinar o logbook após cada sessão.",
      es: "El supervisor debe tener licencia vigente desde hace al menos 4 años, para el tipo de vehículo conducido (auto manual → supervisor habilitado en manual), respetar los mismos límites de alcohol/drogas que un conductor y firmar el logbook tras cada sesión."
    },
    glsUrl: "https://www.transport.wa.gov.au/licensing/drivers-licence/get-a-licence/car",
    overseas: {
      tempVisaRule: {
        en: "Visitors and temporary visa holders (tourists, students, temporary workers) may drive on a current overseas licence for the whole stay — no transfer needed.",
        pt: "Visitantes e vistos temporários (turistas, estudantes, trabalhadores temporários) podem dirigir com a habilitação estrangeira válida durante toda a estadia — sem precisar transferir.",
        es: "Visitantes y visas temporales (turistas, estudiantes, trabajadores temporales) pueden conducir con su licencia extranjera vigente durante toda la estadía — sin necesidad de transferir."
      },
      prDeadline: {
        en: "Australian citizens and permanent residents may drive on the overseas licence for up to 3 months and must apply to transfer within that period — after 3 months the overseas licence is no longer valid to drive in WA.",
        pt: "Cidadãos australianos e residentes permanentes podem dirigir com a habilitação estrangeira por até 3 meses e devem pedir a transferência dentro desse prazo — depois de 3 meses ela deixa de valer para dirigir em WA.",
        es: "Los ciudadanos australianos y residentes permanentes pueden conducir con la licencia extranjera hasta 3 meses y deben solicitar la transferencia dentro de ese plazo — después de 3 meses deja de ser válida para conducir en WA."
      },
      recognisedUrl:
        "https://www.transport.wa.gov.au/licensing/drivers-licence/visit-move-wa/moving-from-overseas",
      transferUrl:
        "https://www.transport.wa.gov.au/licensing/drivers-licence/visit-move-wa/moving-from-overseas"
    }
  },
  NSW: {
    code: "NSW",
    learner: {
      minAge: 16,
      minTenureMonths: 12,
      tenureNote: {
        en: "Applies to learners under 25 (the HPT can be sat after 10 months). Drivers 25+ are exempt from the tenure and the log book.",
        pt: "Vale para learners com menos de 25 (o HPT pode ser feito após 10 meses). Motoristas 25+ são isentos do prazo e do logbook.",
        es: "Aplica a learners menores de 25 (el HPT puede rendirse tras 10 meses). Los conductores 25+ están exentos del plazo y del logbook."
      }
    },
    p1: {
      minAge: 17,
      months: 12,
      label: "P1 (Red P)",
      note: {
        en: "Max 90 km/h, zero BAC, total phone ban, and under-25s may carry only one passenger under 21 between 11pm and 5am.",
        pt: "Máximo de 90 km/h, zero BAC, proibição total de celular, e menores de 25 só podem levar um passageiro com menos de 21 entre 23h e 5h.",
        es: "Máximo 90 km/h, cero BAC, prohibición total de móvil, y los menores de 25 solo pueden llevar un pasajero menor de 21 entre las 23h y las 5h."
      }
    },
    p2: { months: 24, label: "P2 (Green P)" },
    supervisor: {
      en: "The supervisor must hold a full (unrestricted) Australian driver licence and sit next to the learner. NSW sets no minimum number of years the full licence must have been held.",
      pt: "O supervisor deve ter uma carteira australiana plena (sem restrições) e sentar ao lado do learner. NSW não exige tempo mínimo de carteira plena.",
      es: "El supervisor debe tener una licencia australiana completa (sin restricciones) y sentarse junto al learner. NSW no exige un mínimo de años con la licencia completa."
    },
    glsUrl:
      "https://www.nsw.gov.au/driving-boating-and-transport/driver-and-rider-licences/driver-licences",
    overseas: {
      tempVisaRule: {
        en: "Temporary visa holders who arrived on or after 1 July 2023 may drive on the overseas licence for up to 6 months — after that they need a NSW temporary overseas visitor licence to keep driving.",
        pt: "Vistos temporários que chegaram a partir de 1º de julho de 2023 podem dirigir com a habilitação estrangeira por até 6 meses — depois disso precisam de uma licença de visitante temporário de NSW para continuar dirigindo.",
        es: "Las visas temporales que llegaron desde el 1 de julio de 2023 pueden conducir con la licencia extranjera hasta 6 meses — después necesitan una licencia de visitante temporal de NSW para seguir conduciendo."
      },
      prDeadline: {
        en: "Australian citizens and permanent residents must transfer to a NSW licence within 3 months of arrival (or of the permanent visa being granted).",
        pt: "Cidadãos australianos e residentes permanentes devem transferir para a licença de NSW em até 3 meses da chegada (ou da concessão do visto permanente).",
        es: "Los ciudadanos australianos y residentes permanentes deben transferir a una licencia de NSW dentro de los 3 meses de la llegada (o de la concesión de la visa permanente)."
      },
      recognisedUrl:
        "https://www.nsw.gov.au/driving-boating-and-transport/driver-and-rider-licences/visiting-or-moving-to-nsw/moving-your-overseas-licence/knowledge-and-driving-test-exemptions",
      transferUrl:
        "https://www.nsw.gov.au/driving-boating-and-transport/driver-and-rider-licences/visiting-or-moving-to-nsw/moving-your-overseas-licence"
    }
  },
  VIC: {
    code: "VIC",
    learner: {
      minAge: 16,
      minTenureMonths: 12,
      tenureNote: {
        en: "12 months if under 21; drops to 6 months at 21–24 and 3 months at 25+. The 120 log book hours only apply under 21.",
        pt: "12 meses para menores de 21; cai para 6 meses dos 21 aos 24 e 3 meses aos 25+. As 120 horas de logbook só valem para menores de 21.",
        es: "12 meses si eres menor de 21; baja a 6 meses de 21 a 24 y a 3 meses a los 25+. Las 120 horas de logbook solo aplican a menores de 21."
      }
    },
    p1: {
      minAge: 18,
      months: 12,
      label: "P1 (Red P)",
      note: {
        en: "P1 only applies if you're licensed under 21 — at 21+ you start on P2. Zero BAC, only one peer passenger aged 16–22, and a total device ban: probationary drivers can't use the phone at all, calls and navigation included.",
        pt: "A P1 só existe se você se habilita com menos de 21 — aos 21+ você começa na P2. Zero BAC, só um passageiro de 16 a 22 anos, e proibição total de dispositivos: probatórios não podem usar o celular de forma alguma, nem chamadas nem navegação.",
        es: "La P1 solo aplica si te licencias con menos de 21 — a los 21+ empiezas en P2. Cero BAC, solo un pasajero de 16 a 22 años, y prohibición total de dispositivos: los probatorios no pueden usar el móvil en absoluto, ni llamadas ni navegación."
      }
    },
    p2: { months: 36, label: "P2 (Green P)" },
    supervisor: {
      en: "The supervisor must hold a full car licence (not learner or probationary) during every practice drive — VicRoads only accepts log book entries supervised by full licence holders. No minimum years-held requirement.",
      pt: "O supervisor deve ter carteira plena de carro (não learner nem probatória) em toda volta de prática — a VicRoads só aceita registros de logbook supervisionados por quem tem carteira plena. Sem tempo mínimo de carteira.",
      es: "El supervisor debe tener licencia completa de auto (no learner ni probatoria) en cada práctica — VicRoads solo acepta registros de logbook supervisados por titulares de licencia completa. Sin mínimo de años con la licencia."
    },
    glsUrl:
      "https://www.vicroads.vic.gov.au/safety-and-road-rules/driver-safety/young-and-new-drivers/victorias-graduated-licensing-system",
    overseas: {
      tempVisaRule: {
        en: "Victoria's rule is residence-based, not visa-based: you may drive on the overseas licence only if you'll live in Victoria for less than 6 months. Planning to stay longer — on any visa — means converting to a Victorian licence.",
        pt: "A regra de Victoria é por residência, não por visto: você pode dirigir com a habilitação estrangeira só se for morar em Victoria por menos de 6 meses. Se pretende ficar mais — em qualquer visto — precisa converter para a licença de Victoria.",
        es: "La regla de Victoria es por residencia, no por visa: puedes conducir con la licencia extranjera solo si vivirás en Victoria menos de 6 meses. Si planeas quedarte más — con cualquier visa — debes convertir a una licencia de Victoria."
      },
      prDeadline: {
        en: "Convert within 6 months of the day you start living in Victoria. Leaving and coming back does not restart the clock.",
        pt: "Converta em até 6 meses do dia em que começou a morar em Victoria. Sair e voltar não zera o prazo.",
        es: "Convierte dentro de los 6 meses desde el día en que empiezas a vivir en Victoria. Salir y volver no reinicia el plazo."
      },
      recognisedUrl:
        "https://austroads.gov.au/drivers-and-vehicles/overseas-drivers/recognised-overseas-licences-scheme",
      transferUrl:
        "https://www.vicroads.vic.gov.au/licences/convert-your-licence/convert-overseas-licence"
    }
  },
  QLD: {
    code: "QLD",
    learner: {
      minAge: 16,
      minTenureMonths: 12,
      tenureNote: {
        en: "The 12 months applies at every age — only the 100-hour log book is waived at 25+. Drivers 25+ who pass the practical test go straight to P2, skipping P1.",
        pt: "Os 12 meses valem em qualquer idade — só o logbook de 100 horas é dispensado aos 25+. Quem tem 25+ e passa na prova prática vai direto para a P2, pulando a P1.",
        es: "Los 12 meses aplican a cualquier edad — solo el logbook de 100 horas se exime a los 25+. Quien tiene 25+ y aprueba el examen práctico pasa directo a P2, saltando la P1."
      }
    },
    p1: {
      minAge: 17,
      months: 12,
      label: "P1 (Red P)",
      note: {
        en: "Zero BAC, total phone ban (passengers can't use loudspeaker either), no high-powered vehicles, and only one non-family passenger under 21 between 11pm and 5am.",
        pt: "Zero BAC, proibição total de celular (nem passageiros no viva-voz), veículos de alta potência proibidos, e só um passageiro de fora da família com menos de 21 entre 23h e 5h.",
        es: "Cero BAC, prohibición total de móvil (los pasajeros tampoco pueden usar altavoz), vehículos de alta potencia prohibidos, y solo un pasajero no familiar menor de 21 entre las 23h y las 5h."
      }
    },
    p2: { months: 24, label: "P2 (Green P)" },
    supervisor: {
      en: "The supervisor must currently hold a valid open licence for the class of vehicle being driven, and must have held that open licence for at least 1 year.",
      pt: "O supervisor deve ter uma open licence válida para a classe do veículo dirigido, mantida há pelo menos 1 ano.",
      es: "El supervisor debe tener una open licence vigente para la clase de vehículo conducido, mantenida desde hace al menos 1 año."
    },
    glsUrl:
      "https://www.qld.gov.au/transport/licensing/driver-licensing/applying/driver-licence-progression",
    overseas: {
      tempVisaRule: {
        en: "Visitors and temporary visa holders may drive on a current overseas licence with no fixed time limit — the authority only ends 3 months after a permanent (resident) visa is granted, or on specific events like failing a QLD practical test.",
        pt: "Visitantes e vistos temporários podem dirigir com a habilitação estrangeira válida sem prazo fixo — a autorização só termina 3 meses depois da concessão do visto permanente, ou em eventos específicos como reprovar na prova prática de QLD.",
        es: "Los visitantes y visas temporales pueden conducir con la licencia extranjera vigente sin límite fijo — la autorización solo termina 3 meses después de concederse la visa permanente, o en eventos específicos como reprobar el examen práctico de QLD."
      },
      prDeadline: {
        en: "Within 3 months: counted from moving to Queensland if the permanent visa came first, or from the visa grant if it came after. Transfer before the period ends to keep driving.",
        pt: "Em até 3 meses: contados da mudança para Queensland se o visto permanente veio antes, ou da concessão do visto se veio depois. Transfira antes do fim do prazo para continuar dirigindo.",
        es: "Dentro de 3 meses: contados desde la mudanza a Queensland si la visa permanente vino antes, o desde la concesión de la visa si vino después. Transfiere antes de que termine el plazo para seguir conduciendo."
      },
      recognisedUrl:
        "https://www.qld.gov.au/transport/licensing/driver-licensing/overseas/transfer/exempt-countries",
      transferUrl: "https://www.qld.gov.au/transport/licensing/driver-licensing/overseas/transfer"
    }
  },
  SA: {
    code: "SA",
    learner: {
      minAge: 16,
      minTenureMonths: 12,
      tenureNote: {
        en: "12 full months if under 25; 6 months at 25+. Everyone also passes the Hazard Perception Test before P1.",
        pt: "12 meses completos para menores de 25; 6 meses aos 25+. Todos também passam no Hazard Perception Test antes da P1.",
        es: "12 meses completos si eres menor de 25; 6 meses a los 25+. Todos además aprueban el Hazard Perception Test antes de la P1."
      }
    },
    p1: {
      minAge: 17,
      months: 12,
      label: "P1",
      note: {
        en: "Under-25 P1 holders must not drive between midnight and 5am and may carry at most one peer passenger aged 16–20 (immediate family exempt), unless a qualified supervising driver sits beside them. Total phone ban and a 100 km/h cap apply.",
        pt: "Na P1, menores de 25 não podem dirigir entre meia-noite e 5h e só podem levar um passageiro de 16 a 20 anos (família imediata isenta), a menos que um supervisor qualificado esteja ao lado. Proibição total de celular e teto de 100 km/h.",
        es: "En P1, los menores de 25 no pueden conducir entre medianoche y las 5am y solo pueden llevar un pasajero de 16 a 20 años (familia inmediata exenta), salvo que un supervisor calificado esté al lado. Prohibición total de móvil y tope de 100 km/h."
      }
    },
    p2: { months: 24, label: "P2" },
    supervisor: {
      en: "A Qualified Supervising Driver has held a full, unconditional licence for the vehicle class for the past 2 years, has no disqualifications or suspensions in that time, sits beside the learner, and stays under 0.05 BAC.",
      pt: "O supervisor qualificado tem carteira plena e sem condições para a classe do veículo há 2 anos, sem cassações ou suspensões nesse período, senta ao lado do learner e fica abaixo de 0,05 de BAC.",
      es: "El supervisor calificado tiene licencia completa e incondicional para la clase del vehículo desde hace 2 años, sin inhabilitaciones ni suspensiones en ese período, se sienta junto al learner y se mantiene bajo 0,05 de BAC."
    },
    glsUrl: "https://mylicence.sa.gov.au/my-car-licence/graduated-licensing-scheme",
    overseas: {
      tempVisaRule: {
        en: "Visitors on a temporary visa may drive in SA for as long as the overseas licence stays current — no fixed time limit. Carry an English translation or IDP if the licence isn't in English.",
        pt: "Visitantes com visto temporário podem dirigir em SA enquanto a habilitação estrangeira estiver válida — sem prazo fixo. Leve tradução em inglês ou PID se ela não estiver em inglês.",
        es: "Los visitantes con visa temporal pueden conducir en SA mientras la licencia extranjera siga vigente — sin límite fijo. Lleva una traducción al inglés o PIC si no está en inglés."
      },
      prDeadline: {
        en: "Within 3 months of becoming a permanent resident of South Australia you must get an SA licence — after that the overseas licence is no longer valid to drive on.",
        pt: "Em até 3 meses depois de virar residente permanente na South Australia você precisa tirar a licença de SA — depois disso a habilitação estrangeira deixa de valer.",
        es: "Dentro de los 3 meses de convertirte en residente permanente de South Australia debes obtener la licencia de SA — después de eso la licencia extranjera deja de ser válida."
      },
      recognisedUrl:
        "https://www.sa.gov.au/topics/driving-and-transport/licences/interstate-and-overseas/overseas-licence-transfer",
      transferUrl:
        "https://www.sa.gov.au/topics/driving-and-transport/licences/interstate-and-overseas/overseas-licence-transfer"
    }
  },
  TAS: {
    code: "TAS",
    learner: {
      minAge: 16,
      minTenureMonths: 12,
      tenureNote: {
        en: "Applies to every novice, any age — Tasmania has no over-25 exemption. An 'exceptional circumstances' exemption exists via Service Tasmania (17+ and at least 9 months on Ls).",
        pt: "Vale para todo novato, em qualquer idade — a Tasmânia não tem isenção para 25+. Existe uma exceção por 'circunstâncias excepcionais' via Service Tasmania (17+ e ao menos 9 meses de L).",
        es: "Aplica a todo novato, a cualquier edad — Tasmania no tiene exención para 25+. Existe una excepción por 'circunstancias excepcionales' vía Service Tasmania (17+ y al menos 9 meses de L)."
      }
    },
    p1: {
      minAge: 17,
      months: 12,
      label: "P1 (Red P)",
      note: {
        en: "Red P plates, 100 km/h cap, total phone ban (hands-free included), zero BAC, and peer passenger restrictions under 25. The Hazard Perception Test comes before the P1 driving assessment.",
        pt: "Placas P vermelhas, teto de 100 km/h, proibição total de celular (viva-voz incluído), zero BAC e restrição de passageiros para menores de 25. O Hazard Perception Test vem antes da prova prática da P1.",
        es: "Placas P rojas, tope de 100 km/h, prohibición total de móvil (manos libres incluido), cero BAC y restricción de pasajeros para menores de 25. El Hazard Perception Test va antes del examen práctico de P1."
      }
    },
    p2: { months: 24, label: "P2 (Green P)" },
    supervisor: {
      en: "The supervisory driver must hold a full Australian car licence (not a restricted licence), held continuously for the previous 12 months, and must actively instruct while the learner drives.",
      pt: "O supervisor deve ter carteira australiana plena de carro (não restrita), mantida continuamente pelos últimos 12 meses, e instruir ativamente enquanto o learner dirige.",
      es: "El supervisor debe tener licencia australiana completa de auto (no restringida), mantenida de forma continua los últimos 12 meses, e instruir activamente mientras el learner conduce."
    },
    glsUrl:
      "https://www.platesplus.tas.gov.au/getting_your_licence/summary_of_novice_car_licensing_pathway",
    overseas: {
      tempVisaRule: {
        en: "Visitors and temporary visa holders (students, working holiday, refugees) may drive on a current overseas licence for the whole stay — no fixed limit — while it stays valid and no Tasmanian licence has been issued.",
        pt: "Visitantes e vistos temporários (estudantes, working holiday, refugiados) podem dirigir com a habilitação estrangeira válida durante toda a estadia — sem prazo fixo — enquanto ela valer e nenhuma licença da Tasmânia tiver sido emitida.",
        es: "Los visitantes y visas temporales (estudiantes, working holiday, refugiados) pueden conducir con la licencia extranjera vigente durante toda la estadía — sin límite fijo — mientras siga válida y no se haya emitido una licencia de Tasmania."
      },
      prDeadline: {
        en: "Within 6 months of the permanent visa being issued — after that you're considered unlicensed unless the Registrar approves an extension (form MR189).",
        pt: "Em até 6 meses da emissão do visto permanente — depois disso você é considerado sem habilitação, a menos que o Registrar aprove uma extensão (formulário MR189).",
        es: "Dentro de los 6 meses de emitida la visa permanente — después de eso se te considera sin licencia, salvo que el Registrar apruebe una extensión (formulario MR189)."
      },
      recognisedUrl:
        "https://www.transport.tas.gov.au/licensing/interstate_or_overseas_licences/converting_an_overseas_licence",
      transferUrl:
        "https://www.transport.tas.gov.au/licensing/interstate_or_overseas_licences/converting_an_overseas_licence"
    }
  },
  ACT: {
    code: "ACT",
    learner: {
      minAge: 15.75,
      minTenureMonths: 12,
      tenureNote: {
        en: "12 months if under 25; 6 months if 25+ when the learner licence was issued. The online Hazard Perception Test unlocks after 3 months on Ls.",
        pt: "12 meses para menores de 25; 6 meses se tinha 25+ quando tirou a learner licence. O Hazard Perception Test online libera após 3 meses de L.",
        es: "12 meses si eres menor de 25; 6 meses si tenías 25+ al obtener la learner licence. El Hazard Perception Test en línea se habilita tras 3 meses de L."
      }
    },
    p1: {
      minAge: 17,
      months: 12,
      label: "P1 (Red P)",
      note: {
        en: "Between 11pm and 5am, only one passenger aged 16–22 (work/school/family exemptions). Zero BAC, no towing over 750 kg. Drivers licensed at 25+ skip P1 and start on P2.",
        pt: "Entre 23h e 5h, só um passageiro de 16 a 22 anos (exceções de trabalho/estudo/família). Zero BAC, sem rebocar acima de 750 kg. Quem se habilita aos 25+ pula a P1 e começa na P2.",
        es: "Entre las 23h y las 5am, solo un pasajero de 16 a 22 años (excepciones por trabajo/estudio/familia). Cero BAC, sin remolcar más de 750 kg. Quien se licencia a los 25+ salta la P1 y empieza en P2."
      }
    },
    p2: { months: 24, label: "P2 (Green P)" },
    supervisor: {
      en: "The supervisor must hold a valid full Australian driver licence (not learner or provisional) and sit in the front passenger seat. No minimum years-held requirement is stated.",
      pt: "O supervisor deve ter carteira australiana plena válida (não learner nem provisória) e sentar no banco do passageiro da frente. Nenhum tempo mínimo de carteira é exigido.",
      es: "El supervisor debe tener una licencia australiana completa vigente (no learner ni provisional) y sentarse en el asiento delantero del pasajero. No se exige un mínimo de años con la licencia."
    },
    glsUrl:
      "https://www.cityservices.act.gov.au/roads-and-paths/road-safety/learner-and-provisional-drivers",
    overseas: {
      tempVisaRule: {
        en: "Visitors and temporary visa holders may drive on a current overseas licence with no fixed time limit; a temporary visa resident may choose an ACT licence but isn't required to get one.",
        pt: "Visitantes e vistos temporários podem dirigir com a habilitação estrangeira válida sem prazo fixo; um residente com visto temporário pode optar pela licença do ACT, mas não é obrigado.",
        es: "Los visitantes y visas temporales pueden conducir con la licencia extranjera vigente sin límite fijo; un residente con visa temporal puede optar por la licencia del ACT, pero no está obligado."
      },
      prDeadline: {
        en: "Once a permanent visa is granted you may drive on the overseas licence for 3 more months — after that an ACT licence is required to drive in the ACT.",
        pt: "Concedido o visto permanente, você pode dirigir com a habilitação estrangeira por mais 3 meses — depois disso é preciso ter a licença do ACT para dirigir no ACT.",
        es: "Concedida la visa permanente, puedes conducir con la licencia extranjera 3 meses más — después de eso se requiere una licencia del ACT para conducir en el ACT."
      },
      recognisedUrl:
        "https://www.accesscanberra.act.gov.au/driving-transport-and-parking/licences/drivers-with-licences-from-overseas",
      transferUrl:
        "https://www.accesscanberra.act.gov.au/driving-transport-and-parking/licences/drivers-with-licences-from-overseas"
    }
  },
  NT: {
    code: "NT",
    learner: {
      minAge: 16,
      minTenureMonths: 6,
      tenureNote: {
        en: "Applies at every age — the NT has no over-25 exemption for the 6 continuous months. If the learner licence lapses and is reissued, the 6 months restarts.",
        pt: "Vale em qualquer idade — o NT não isenta 25+ dos 6 meses contínuos. Se a learner licence vencer e for reemitida, os 6 meses recomeçam.",
        es: "Aplica a cualquier edad — el NT no exime a los 25+ de los 6 meses continuos. Si la learner licence vence y se reemite, los 6 meses se reinician."
      }
    },
    p1: {
      minAge: 16.5,
      months: 24,
      label: "Provisional (P plates)",
      note: {
        en: "Single provisional stage: 2 years if under 25, 1 year at 25+. Zero BAC, 100 km/h cap, total phone ban (hands-free included), and you can't supervise a learner. The zero-BAC condition runs 12 months past the provisional period or until 25.",
        pt: "Estágio provisório único: 2 anos para menores de 25, 1 ano aos 25+. Zero BAC, teto de 100 km/h, proibição total de celular (viva-voz incluído) e você não pode supervisionar um learner. A condição de zero BAC segue por 12 meses após o período provisório ou até os 25.",
        es: "Etapa provisional única: 2 años si eres menor de 25, 1 año a los 25+. Cero BAC, tope de 100 km/h, prohibición total de móvil (manos libres incluido) y no puedes supervisar a un learner. La condición de cero BAC continúa 12 meses tras el período provisional o hasta los 25."
      }
    },
    p2: null,
    supervisor: {
      en: "The supervisor must hold a full (open) Australian driver licence — an adult relative, a friend, or a driving instructor. The NT sets no minimum years the licence must have been held.",
      pt: "O supervisor deve ter uma carteira australiana plena (open) — um parente adulto, um amigo ou um instrutor. O NT não exige tempo mínimo de carteira.",
      es: "El supervisor debe tener una licencia australiana completa (open) — un pariente adulto, un amigo o un instructor. El NT no exige un mínimo de años con la licencia."
    },
    glsUrl: "https://nt.gov.au/driving/licence/getting-an-nt-licence/get-your-driver-licence",
    overseas: {
      tempVisaRule: {
        en: "The NT rule is residence-based: anyone may drive on a current overseas licence for up to 3 months, but staying more than 3 continuous months means transferring to an NT licence — after that the overseas licence is invalid in the NT.",
        pt: "A regra do NT é por residência: qualquer pessoa pode dirigir com a habilitação estrangeira por até 3 meses, mas ficar mais de 3 meses contínuos exige transferir para a licença do NT — depois disso a habilitação estrangeira deixa de valer no NT.",
        es: "La regla del NT es por residencia: cualquiera puede conducir con la licencia extranjera hasta 3 meses, pero quedarse más de 3 meses continuos exige transferir a una licencia del NT — después de eso la licencia extranjera no es válida en el NT."
      },
      prDeadline: {
        en: "Within 3 months of living in the NT — the rule is residence-based and applies regardless of visa class.",
        pt: "Em até 3 meses morando no NT — a regra é por residência e vale independentemente do tipo de visto.",
        es: "Dentro de los 3 meses viviendo en el NT — la regla es por residencia y aplica sin importar el tipo de visa."
      },
      recognisedUrl:
        "https://nt.gov.au/driving/licence/new-nt-residents-and-visitors/transfer-your-overseas-licence",
      transferUrl:
        "https://nt.gov.au/driving/licence/new-nt-residents-and-visitors/transfer-your-overseas-licence"
    }
  }
};

export function getStateGls(code: string): StateGls {
  return GLS[code as AuStateCode] ?? GLS.WA;
}

export function listStateGls(): StateGls[] {
  return Object.values(GLS);
}
