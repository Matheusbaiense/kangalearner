import type { UiLang } from "@/lib/i18n";

/**
 * WA licence journey + HPT/PDA prep hubs.
 * Steals DrivingTestWA's stage organisation (Learner → Red P → Green P → Full) and its
 * 4-part prep structure (Practice / Study tips / Test tips / Details), plus the DVSA UK
 * video-clip hazard-perception model. Content-only, no migration, no auth.
 *
 * Conservative + source-linked. Every page shows VerifiedBadge + "confirm with DoT".
 */

export const JOURNEY_LINKS = {
  learner: "https://www.transport.wa.gov.au/licensing/learner-driver-guide.asp",
  logHours:
    "https://www.transport.wa.gov.au/licensing/drivers-licence/get-a-licence/car/learn-to-drive-log-hours",
  hpt: "https://www.transport.wa.gov.au/licensing/hazard-perception-test.asp",
  pda: "https://www.transport.wa.gov.au/licensing/drivers-licence/get-a-licence/car/book-practical-driving-assessment",
  handbook: "https://www.transport.wa.gov.au/licensing/drive-safe-wa-handbook.asp"
};

export interface JourneyPhase {
  key: "learner" | "p1" | "p2" | "full";
  badge: Record<UiLang, string>;
  title: Record<UiLang, string>;
  summary: Record<UiLang, string>;
  points: Record<UiLang, string>[];
}

export const JOURNEY_PHASES: JourneyPhase[] = [
  {
    key: "learner",
    badge: { en: "Step 1", pt: "Passo 1", es: "Paso 1" },
    title: { en: "Learner's permit", pt: "Licença de learner", es: "Permiso de learner" },
    summary: {
      en: "Pass the Computerised Theory Test (CTT), then log your supervised driving hours.",
      pt: "Passe na prova teórica (CTT) e registre suas horas de condução supervisionada.",
      es: "Aprueba el examen teórico (CTT) y registra tus horas de conducción supervisada."
    },
    points: [
      {
        en: "Pass the theory test (24/30) — KangaLearner prepares you free, in your language.",
        pt: "Passe na prova teórica (24/30) — o KangaLearner te prepara grátis, na sua língua.",
        es: "Aprueba el examen teórico (24/30) — KangaLearner te prepara gratis, en tu idioma."
      },
      {
        en: "Zero BAC, L plates front and back, and a supervising driver at all times.",
        pt: "Zero de álcool (BAC), placas L na frente e atrás, e um supervisor sempre presente.",
        es: "Cero alcohol (BAC), placas L delante y detrás, y un supervisor siempre presente."
      },
      {
        en: "Under 25: log at least 50 supervised hours, including 5 at night, before the PDA.",
        pt: "Menos de 25: registre ao menos 50 horas supervisionadas, incluindo 5 à noite, antes do PDA.",
        es: "Menos de 25: registra al menos 50 horas supervisadas, incluyendo 5 de noche, antes del PDA."
      }
    ]
  },
  {
    key: "p1",
    badge: { en: "Step 2", pt: "Passo 2", es: "Paso 2" },
    title: {
      en: "Provisional P1 (Red P)",
      pt: "Provisória P1 (P vermelho)",
      es: "Provisional P1 (P rojo)"
    },
    summary: {
      en: "After the HPT and PDA you get your P1. Red plates, zero BAC, held for 6 months.",
      pt: "Após o HPT e o PDA você recebe a P1. Placas vermelhas, zero BAC, por 6 meses.",
      es: "Tras el HPT y el PDA obtienes la P1. Placas rojas, cero BAC, durante 6 meses."
    },
    points: [
      {
        en: "Pass the Hazard Perception Test (HPT) and the Practical Driving Assessment (PDA).",
        pt: "Passe no Teste de Percepção de Risco (HPT) e na Avaliação Prática (PDA).",
        es: "Aprueba el Test de Percepción de Peligros (HPT) y la Evaluación Práctica (PDA)."
      },
      {
        en: "Red P plates, zero BAC, and night-driving passenger limits apply.",
        pt: "Placas P vermelhas, zero BAC e limites de passageiros à noite.",
        es: "Placas P rojas, cero BAC y límites de pasajeros de noche."
      }
    ]
  },
  {
    key: "p2",
    badge: { en: "Step 3", pt: "Passo 3", es: "Paso 3" },
    title: {
      en: "Provisional P2 (Green P)",
      pt: "Provisória P2 (P verde)",
      es: "Provisional P2 (P verde)"
    },
    summary: {
      en: "Green plates, zero BAC, held for 24 months before your full licence.",
      pt: "Placas verdes, zero BAC, por 24 meses antes da licença completa.",
      es: "Placas verdes, cero BAC, durante 24 meses antes de la licencia completa."
    },
    points: [
      {
        en: "Hold P2 for at least 2 years with a clean record to progress.",
        pt: "Mantenha a P2 por ao menos 2 anos com ficha limpa para avançar.",
        es: "Mantén la P2 al menos 2 años con historial limpio para avanzar."
      }
    ]
  },
  {
    key: "full",
    badge: { en: "Step 4", pt: "Passo 4", es: "Paso 4" },
    title: { en: "Full licence", pt: "Licença completa", es: "Licencia completa" },
    summary: {
      en: "Restrictions lifted. The general BAC limit (0.05) applies.",
      pt: "Restrições removidas. Vale o limite geral de BAC (0,05).",
      es: "Restricciones levantadas. Aplica el límite general de BAC (0,05)."
    },
    points: [
      {
        en: "Keep driving safely — most crashes happen in the first years of solo driving.",
        pt: "Continue dirigindo com segurança — a maioria dos acidentes é nos primeiros anos sozinho.",
        es: "Sigue conduciendo con seguridad — la mayoría de accidentes son en los primeros años solo."
      }
    ]
  }
];

/** 4-part prep hub content (HPT and PDA). */
export interface PrepHub {
  kicker: Record<UiLang, string>;
  title: Record<UiLang, string>;
  intro: Record<UiLang, string>;
  sections: {
    heading: Record<UiLang, string>;
    body: Record<UiLang, string>;
  }[];
  officialUrl: string;
}

export const HPT_HUB: PrepHub = {
  officialUrl: JOURNEY_LINKS.hpt,
  kicker: {
    en: "Hazard Perception Test",
    pt: "Teste de Percepção de Risco",
    es: "Test de Percepción de Peligros"
  },
  title: {
    en: "HPT prep: spot hazards before they become problems",
    pt: "Preparação HPT: identifique perigos antes que virem problema",
    es: "Preparación HPT: detecta peligros antes de que sean un problema"
  },
  intro: {
    en: "The HPT is a computer test with traffic film clips. You watch real driving scenes and respond when you spot a developing hazard. You take it after your learner's permit, before your P1.",
    pt: "O HPT é um teste de computador com clipes de trânsito. Você assiste a cenas reais de direção e responde ao identificar um perigo em formação. Você o faz após a licença de learner, antes da P1.",
    es: "El HPT es un test de computadora con clips de tráfico. Ves escenas reales de conducción y respondes al detectar un peligro en desarrollo. Lo haces tras el permiso de learner, antes de la P1."
  },
  sections: [
    {
      heading: { en: "What's assessed", pt: "O que é avaliado", es: "Qué se evalúa" },
      body: {
        en: "Your ability to notice and react to developing hazards — pedestrians stepping out, cars braking, merging traffic — at the right moment, not too early or too late.",
        pt: "Sua capacidade de notar e reagir a perigos em formação — pedestres surgindo, carros freando, tráfego entrando — no momento certo, nem cedo nem tarde demais.",
        es: "Tu capacidad de notar y reaccionar a peligros en desarrollo — peatones que salen, autos que frenan, tráfico que se incorpora — en el momento justo, ni muy pronto ni muy tarde."
      }
    },
    {
      heading: { en: "How to prepare", pt: "Como se preparar", es: "Cómo prepararse" },
      body: {
        en: "Practise scanning ahead and to the sides while driving with your supervisor. Talk out loud about what could go wrong next — it trains the same instinct the HPT tests.",
        pt: "Pratique observar à frente e aos lados ao dirigir com seu supervisor. Fale em voz alta sobre o que pode dar errado a seguir — treina o mesmo instinto que o HPT avalia.",
        es: "Practica mirar adelante y a los lados al conducir con tu supervisor. Di en voz alta qué podría salir mal — entrena el mismo instinto que evalúa el HPT."
      }
    },
    {
      heading: { en: "On test day", pt: "No dia do teste", es: "El día del test" },
      body: {
        en: "Respond as soon as a hazard starts to develop, not when it's already dangerous. Don't click randomly — the system can flag that. Stay calm and watch the whole scene.",
        pt: "Responda assim que um perigo começa a se formar, não quando já está perigoso. Não clique aleatoriamente — o sistema pode sinalizar isso. Mantenha a calma e observe toda a cena.",
        es: "Responde apenas un peligro empieza a desarrollarse, no cuando ya es peligroso. No hagas clic al azar — el sistema puede marcarlo. Mantén la calma y observa toda la escena."
      }
    }
  ]
};

export const PDA_HUB: PrepHub = {
  officialUrl: JOURNEY_LINKS.pda,
  kicker: {
    en: "Practical Driving Assessment",
    pt: "Avaliação Prática (PDA)",
    es: "Evaluación Práctica (PDA)"
  },
  title: {
    en: "PDA prep: drive safely, unsupervised, on the day",
    pt: "Preparação PDA: dirigir com segurança, sem supervisão, no dia",
    es: "Preparación PDA: conducir con seguridad, sin supervisión, el día del examen"
  },
  intro: {
    en: "The PDA is your on-road driving test. An assessor checks that you can drive safely and independently in real traffic. It's the last step before your P1.",
    pt: "O PDA é a sua prova de direção na via. Um avaliador verifica se você dirige com segurança e de forma independente no trânsito real. É o último passo antes da P1.",
    es: "El PDA es tu examen de conducción en vía. Un evaluador comprueba que conduces con seguridad e independencia en tráfico real. Es el último paso antes de tu P1."
  },
  sections: [
    {
      heading: { en: "What to bring", pt: "O que levar", es: "Qué llevar" },
      body: {
        en: "Your learner's permit, a roadworthy and registered car (dual controls aren't required but help), and proof you've logged your required hours.",
        pt: "Sua licença de learner, um carro em condições e registrado (duplo comando não é exigido mas ajuda) e a comprovação das horas registradas.",
        es: "Tu permiso de learner, un auto en condiciones y registrado (el doble comando no es obligatorio pero ayuda) y la prueba de tus horas registradas."
      }
    },
    {
      heading: { en: "How to pass", pt: "Como passar", es: "Cómo aprobar" },
      body: {
        en: "Do the basics consistently: mirror checks, head checks, correct speed, smooth stopping, and give way correctly. Assessors fail more people for missed observations than for nerves.",
        pt: "Faça o básico de forma consistente: espelhos, ponto cego, velocidade correta, parada suave e dar preferência certo. Reprovam mais por falta de observação do que por nervosismo.",
        es: "Haz lo básico con constancia: espejos, punto ciego, velocidad correcta, frenado suave y ceder el paso bien. Reprueban más por falta de observación que por nervios."
      }
    },
    {
      heading: {
        en: "Confidence on the day",
        pt: "Confiança no dia",
        es: "Confianza el día del examen"
      },
      body: {
        en: "Sleep well, arrive early, and do a warm-up drive in the area first. Feeling nervous is normal — practising the route type (not the exact route) helps you stay calm.",
        pt: "Durma bem, chegue cedo e faça uma volta de aquecimento na região antes. Sentir-se nervoso é normal — praticar o tipo de percurso (não a rota exata) ajuda a manter a calma.",
        es: "Duerme bien, llega temprano y haz una vuelta de calentamiento en la zona antes. Estar nervioso es normal — practicar el tipo de recorrido (no la ruta exacta) ayuda a mantener la calma."
      }
    }
  ]
};
