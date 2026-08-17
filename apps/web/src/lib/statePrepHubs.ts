import type { AuStateCode, StateProfile } from "@kanga/core";
import type { UiLang } from "@/lib/i18n";

type Localized = Record<UiLang, string>;

/** 4-part prep hub content rendered by PrepHubView. */
export interface PrepHub {
  kicker: Localized;
  title: Localized;
  intro: Localized;
  sections: {
    heading: Localized;
    body: Localized;
  }[];
  officialUrl: string;
}

/**
 * Per-state facts for the hazard-test and practical-test prep hubs (/hpt, /pda).
 * Researched from each jurisdiction's own testing pages and adversarially
 * re-verified on PREP_VERIFIED_AT. GLS stage facts live in stateJourney.ts;
 * exam facts in @kanga/core stateProfiles.
 */
export interface StatePrepData {
  code: AuStateCode;
  /** null = the state has no hazard perception test at any stage (NT). */
  hazard: {
    /** Stage the test belongs to: learner stage, or P1 (QLD sits it later). */
    stage: "learner" | "p1";
    name: string;
    when: Localized;
    format: Localized;
    bookUrl: string;
  } | null;
  practical: {
    name: string;
    format: Localized;
    /** Alternative routes to the licence where they exist (SA VORT/CBT&A, ACT). */
    routes: Localized | null;
    bring: Localized;
    bookUrl: string;
  };
}

export const PREP_VERIFIED_AT = "2026-08-17";

const PREP: Record<AuStateCode, StatePrepData> = {
  WA: {
    code: "WA",
    hazard: {
      stage: "learner",
      name: "Hazard Perception Test (HPT)",
      when: {
        en: "You need to be at least 16 years and 6 months old and have held your learner's permit for 6 months. Pass it before booking the PDA — a pass stays valid for 5 years.",
        pt: "Você precisa ter pelo menos 16 anos e 6 meses e 6 meses de learner's permit. Passe nele antes de agendar o PDA — a aprovação vale por 5 anos.",
        es: "Debes tener al menos 16 años y 6 meses y llevar 6 meses con el learner's permit. Apruébalo antes de reservar el PDA — la aprobación vale 5 años."
      },
      format: {
        en: "A computer test at a service centre: interactive moving video scenarios where you click when it's safe to act or to reduce the risk of a crash. $29.90 for the first sitting, $24.10 per resit, and free official practice scenarios online tell you if your clicks were too early or too late.",
        pt: "Teste de computador num centro de atendimento: cenários de vídeo interativos onde você clica quando é seguro agir ou para reduzir o risco de colisão. $29,90 na primeira vez, $24,10 por repetição, e cenários oficiais de prática grátis online dizem se seus cliques foram cedo ou tarde demais.",
        es: "Un test de computadora en un centro de atención: escenarios de video interactivos donde haces clic cuando es seguro actuar o para reducir el riesgo de choque. $29,90 la primera vez, $24,10 por repetición, y escenarios oficiales de práctica gratis en línea te dicen si tus clics fueron muy pronto o muy tarde."
      },
      bookUrl:
        "https://www.transport.wa.gov.au/licensing/drivers-licence/get-a-licence/car/sit-hazard-perception-test"
    },
    practical: {
      name: "Practical Driving Assessment (PDA)",
      format: {
        en: "Around 45-50 minutes on the road in 5 sections: 3 following the assessor's directions and 2 set exercises. Seven competency areas are scored — flow, looking behind, movement, path, responsiveness, signalling and vehicle management. Speeding, missing a seatbelt, breaking a rule that threatens safety or forcing the assessor to intervene is an automatic fail.",
        pt: "Cerca de 45-50 minutos na via em 5 seções: 3 seguindo as instruções do avaliador e 2 exercícios definidos. Sete competências são pontuadas — fluidez, olhar para trás, movimento, trajetória, capacidade de resposta, sinalização e controle do veículo. Excesso de velocidade, falta de cinto, infração que ameace a segurança ou intervenção do avaliador reprova na hora.",
        es: "Unos 45-50 minutos en la vía en 5 secciones: 3 siguiendo las indicaciones del evaluador y 2 ejercicios definidos. Se puntúan siete competencias — fluidez, mirar atrás, movimiento, trayectoria, capacidad de respuesta, señalización y control del vehículo. Exceso de velocidad, falta de cinturón, una infracción que amenace la seguridad o que el evaluador intervenga es reprobación inmediata."
      },
      routes: null,
      bring: {
        en: "Your learner's permit, your signed log book (or the Learn&Log electronic declaration), and a registered, roadworthy car with a centre park brake the front passenger can reach. Arrive 15 minutes early. The first PDA is included in the permit fee; resits cost $120.50.",
        pt: "Seu learner's permit, o logbook assinado (ou a declaração eletrônica do Learn&Log) e um carro registrado e em condições, com freio de mão central ao alcance do passageiro. Chegue 15 minutos antes. O primeiro PDA está incluído na taxa do permit; repetições custam $120,50.",
        es: "Tu learner's permit, el logbook firmado (o la declaración electrónica de Learn&Log) y un auto registrado y en condiciones, con freno de mano central al alcance del pasajero. Llega 15 minutos antes. El primer PDA está incluido en la tarifa del permit; las repeticiones cuestan $120,50."
      },
      bookUrl:
        "https://www.transport.wa.gov.au/licensing/drivers-licence/get-a-licence/car/book-practical-driving-assessment"
    }
  },
  NSW: {
    code: "NSW",
    hazard: {
      stage: "learner",
      name: "Hazard Perception Test (HPT)",
      when: {
        en: "Under 25: after 10 months on your Ls. 25 or over: whenever you feel ready. You must pass it before the Driving Test, and the result stays valid for 15 months.",
        pt: "Menos de 25: após 10 meses de L. 25 ou mais: quando se sentir pronto. Você precisa passar antes do Driving Test, e o resultado vale por 15 meses.",
        es: "Menos de 25: tras 10 meses con la L. 25 o más: cuando te sientas listo. Debes aprobarlo antes del Driving Test, y el resultado vale 15 meses."
      },
      format: {
        en: "A touchscreen test at a Service NSW centre: 15 short clips of real traffic filmed from the driver's seat (plus 2 practice clips). You touch the screen when you would slow down, overtake or turn. Available in 10 languages; $58 per attempt.",
        pt: "Teste de tela sensível num centro Service NSW: 15 clipes curtos de trânsito real filmados do banco do motorista (mais 2 de prática). Você toca a tela quando reduziria, ultrapassaria ou viraria. Disponível em 10 idiomas; $58 por tentativa.",
        es: "Un test de pantalla táctil en un centro Service NSW: 15 clips cortos de tráfico real filmados desde el asiento del conductor (más 2 de práctica). Tocas la pantalla cuando reducirías, adelantarías o girarías. Disponible en 10 idiomas; $58 por intento."
      },
      bookUrl: "https://www.service.nsw.gov.au/transaction/book-a-hazard-perception-test-hpt"
    },
    practical: {
      name: "Driving Test",
      format: {
        en: "A set course of 25 zones with a testing officer scoring speed management, road positioning, decision making, responding to hazards and vehicle control. You need at least 90% with no fail items — breaking a road rule, a collision, or anything needing the officer to intervene fails you regardless of score. Fail and you wait at least 7 days; $72 per attempt.",
        pt: "Um percurso definido de 25 zonas com um examinador pontuando gestão de velocidade, posicionamento, tomada de decisão, resposta a riscos e controle do veículo. Você precisa de 90% sem itens de reprovação — infração, colisão ou qualquer intervenção do examinador reprova independentemente da nota. Reprovou? Espera de no mínimo 7 dias; $72 por tentativa.",
        es: "Un recorrido definido de 25 zonas con un examinador que puntúa gestión de velocidad, posicionamiento, toma de decisiones, respuesta a riesgos y control del vehículo. Necesitas al menos 90% sin ítems de reprobación — una infracción, una colisión o cualquier intervención del examinador reprueba sin importar el puntaje. ¿Reprobaste? Esperas mínimo 7 días; $72 por intento."
      },
      routes: null,
      bring: {
        en: "Your learner licence and ID, the licence application form, glasses if you need them, and your completed log book with the signed 120-hour declaration (under-25s; app submissions at least 48 hours before). Bring a registered, roadworthy car and a fully licensed driver — you can't drive away alone if you fail. Arrive 15 minutes early.",
        pt: "Sua learner licence e identidade, o formulário de solicitação, óculos se precisar, e o logbook completo com a declaração assinada das 120 horas (menores de 25; envio pelo app com 48 horas de antecedência). Leve um carro registrado e em condições e um motorista habilitado — você não pode voltar dirigindo sozinho se reprovar. Chegue 15 minutos antes.",
        es: "Tu learner licence e identificación, el formulario de solicitud, lentes si los necesitas, y el logbook completo con la declaración firmada de las 120 horas (menores de 25; envío por la app con 48 horas de antelación). Lleva un auto registrado y en condiciones y un conductor con licencia completa — no puedes irte conduciendo solo si repruebas. Llega 15 minutos antes."
      },
      bookUrl: "https://www.service.nsw.gov.au/transaction/book-a-driver-or-rider-licence-test"
    }
  },
  VIC: {
    code: "VIC",
    hazard: {
      stage: "learner",
      name: "Hazard Perception Test (HPT)",
      when: {
        en: "From 17 years and 11 months, holding a current learner permit. Pass it before the Drive Test — and if you don't pass the Drive Test within 12 months, you sit the HPT again.",
        pt: "A partir de 17 anos e 11 meses, com learner permit válido. Passe antes do Drive Test — e se não passar no Drive Test em 12 meses, faz o HPT de novo.",
        es: "Desde los 17 años y 11 meses, con learner permit vigente. Apruébalo antes del Drive Test — y si no apruebas el Drive Test en 12 meses, rindes el HPT de nuevo."
      },
      format: {
        en: "Taken online through your myVicRoads account (or in person, in 13 languages). Up to 45 minutes: 25 short videos of real driving where you click or tap the 'slow down' response at the right moment. First online attempt is free, then $20.70 each; two attempts per day, and a dropped connection counts as a fail — use a laptop or tablet, not a phone.",
        pt: "Feito online pela sua conta myVicRoads (ou presencial, em 13 idiomas). Até 45 minutos: 25 vídeos curtos de direção real onde você clica ou toca a resposta de 'reduzir' no momento certo. A primeira tentativa online é grátis, depois $20,70 cada; duas tentativas por dia, e queda de conexão conta como reprovação — use notebook ou tablet, não celular.",
        es: "Se rinde en línea con tu cuenta myVicRoads (o presencial, en 13 idiomas). Hasta 45 minutos: 25 videos cortos de conducción real donde haces clic o tocas la respuesta de 'reducir' en el momento justo. El primer intento en línea es gratis, luego $20,70 cada uno; dos intentos por día, y una desconexión cuenta como reprobado — usa laptop o tablet, no el teléfono."
      },
      bookUrl: "https://www.vicroads.vic.gov.au/ls-and-ps/getting-your-ps/hazard-perception-test"
    },
    practical: {
      name: "Drive Test",
      format: {
        en: "About 30 minutes: a pre-drive check of the controls, then about 10 minutes in quieter streets (you must pass this stage to continue) and around 20 minutes on busier roads. Instant fail for a collision, mounting the kerb, speeding by 5 km/h or more (or at all in a school zone), running a stop sign or red light, or needing help from the supervisor or officer.",
        pt: "Cerca de 30 minutos: checagem dos controles antes de sair, depois uns 10 minutos em ruas calmas (você precisa passar nessa etapa para continuar) e uns 20 minutos em vias movimentadas. Reprovação instantânea por colisão, subir na guia, exceder 5 km/h ou mais (ou qualquer excesso em zona escolar), furar stop ou sinal vermelho, ou precisar de ajuda do supervisor ou examinador.",
        es: "Unos 30 minutos: revisión de los controles antes de salir, luego unos 10 minutos en calles tranquilas (debes aprobar esa etapa para continuar) y unos 20 minutos en vías con más tráfico. Reprobación instantánea por colisión, subirse al cordón, exceder 5 km/h o más (o cualquier exceso en zona escolar), pasarse un stop o un semáforo en rojo, o necesitar ayuda del supervisor o examinador."
      },
      routes: null,
      bring: {
        en: "Your learner permit card, your appointment receipt, and your 120 hours completed and declared — the log book or the myLearners app, for under-21s. You supply the car: registered, roadworthy, L plates on, mirrors both sides, and a centre handbrake the front passenger can reach — electronic park brakes can't be used. Arrive on time: latecomers forfeit the booking fee.",
        pt: "Seu cartão de learner permit, o comprovante do agendamento e as 120 horas completas e declaradas — no logbook ou no app myLearners, para menores de 21. O carro é seu: registrado, em condições, com placas L, espelhos dos dois lados e freio de mão central ao alcance do passageiro — freio eletrônico não pode. Chegue no horário: atraso perde a taxa do agendamento.",
        es: "Tu tarjeta de learner permit, el comprobante de la cita y las 120 horas completas y declaradas — en el logbook o en la app myLearners, para menores de 21. El auto lo pones tú: registrado, en condiciones, con placas L, espejos a ambos lados y freno de mano central al alcance del pasajero — los frenos electrónicos no sirven. Llega a tiempo: si te atrasas pierdes la tarifa de la reserva."
      },
      bookUrl: "https://www.vicroads.vic.gov.au/licences/your-ps/get-your-ps/the-drive-test/"
    }
  },
  QLD: {
    code: "QLD",
    hazard: {
      stage: "learner",
      name: "Hazard Perception Test",
      when: {
        en: "Every learner sits it, at any age, after holding the learner licence for 6 months — and you must pass it before booking the Q-SAFE practical test.",
        pt: "Todo learner faz, em qualquer idade, após 6 meses de learner licence — e você precisa passar antes de agendar o teste prático Q-SAFE.",
        es: "Todo learner lo rinde, a cualquier edad, tras 6 meses con la learner licence — y debes aprobarlo antes de reservar el examen práctico Q-SAFE."
      },
      format: {
        en: "An online test on your own device (a laptop beats a phone): 25 computer-generated 3D traffic clips where you show how you'd react. Takes 15-30 minutes in one sitting with a stable connection. One $42.70 payment gives 12 months of access with unlimited attempts and no lock-out.",
        pt: "Teste online no seu próprio aparelho (notebook é melhor que celular): 25 clipes 3D gerados por computador onde você mostra como reagiria. Leva 15-30 minutos numa sessão única com conexão estável. Um pagamento de $42,70 dá 12 meses de acesso com tentativas ilimitadas e sem bloqueio.",
        es: "Un test en línea en tu propio dispositivo (mejor laptop que teléfono): 25 clips 3D generados por computadora donde muestras cómo reaccionarías. Toma 15-30 minutos en una sola sesión con conexión estable. Un pago de $42,70 da 12 meses de acceso con intentos ilimitados y sin bloqueo."
      },
      bookUrl: "https://www.service.transport.qld.gov.au/enrolinhpt"
    },
    practical: {
      name: "Q-SAFE practical driving test",
      format: {
        en: "25-35 minutes with a TMR or police examiner: vehicle and pre-drive checks, set manoeuvres like a reverse park and U-turn, then on-road driving. Small errors add up — too many of the same kind fails you at the end; a critical error (collision, dangerous action, examiner intervention) ends the test on the spot. $69.40 per attempt; fail once and you can rebook for the next day, but the waits grow after that.",
        pt: "25-35 minutos com um examinador do TMR ou da polícia: checagens do veículo e dos controles, manobras definidas como baliza e retorno, e depois direção na via. Erros pequenos acumulam — muitos do mesmo tipo reprovam no fim; um erro crítico (colisão, ação perigosa, intervenção do examinador) encerra o teste na hora. $69,40 por tentativa; reprovou uma vez, pode remarcar para o dia seguinte, mas as esperas crescem depois.",
        es: "25-35 minutos con un examinador de TMR o de la policía: revisiones del vehículo y los controles, maniobras definidas como estacionar en reversa y giro en U, y luego conducción en vía. Los errores pequeños se acumulan — muchos del mismo tipo reprueban al final; un error crítico (colisión, acción peligrosa, intervención del examinador) termina el examen al instante. $69,40 por intento; si repruebas una vez puedes reservar para el día siguiente, pero las esperas crecen después."
      },
      routes: null,
      bring: {
        en: "Arrive 20 minutes early with a registered, roadworthy car showing L plates, the owner's permission to use it, your licence and ID, and — if you're under 25 — your 100-hour logbook already submitted and approved before the test.",
        pt: "Chegue 20 minutos antes com um carro registrado e em condições exibindo placas L, a autorização do dono para usá-lo, sua licença e identidade, e — se tiver menos de 25 — o logbook de 100 horas já enviado e aprovado antes do teste.",
        es: "Llega 20 minutos antes con un auto registrado y en condiciones con placas L, el permiso del dueño para usarlo, tu licencia e identificación, y — si tienes menos de 25 — el logbook de 100 horas ya enviado y aprobado antes del examen."
      },
      bookUrl:
        "https://www.service.transport.qld.gov.au/SBSExternal/public/WelcomeDrivingTest.xhtml"
    }
  },
  SA: {
    code: "SA",
    hazard: {
      stage: "learner",
      name: "Hazard Perception Test (HPT)",
      when: {
        en: "You sit it during the learner stage and must pass it before your P1 can be issued. Since October 2024 it can be done online through mySAGOV, or in person at selected Service SA centres.",
        pt: "Você faz durante a fase learner e precisa passar antes de a P1 ser emitida. Desde outubro de 2024 pode ser feito online pelo mySAGOV, ou presencialmente em centros Service SA selecionados.",
        es: "Lo rindes durante la etapa learner y debes aprobarlo antes de que se emita tu P1. Desde octubre de 2024 puede hacerse en línea por mySAGOV, o presencial en centros Service SA seleccionados."
      },
      format: {
        en: "Scenarios filmed from the driver's point of view, built around the crash types that most catch SA's new drivers. You're told what the driver wants to do and respond only if and when it's safe — sometimes the right answer is to do nothing. One chance per question, no changing answers. Online: $37 enrolment with 12 months of unlimited attempts; in person: $37 per attempt.",
        pt: "Cenários filmados do ponto de vista do motorista, construídos sobre os tipos de colisão que mais pegam os novos motoristas de SA. Dizem o que o motorista quer fazer e você responde só se e quando for seguro — às vezes a resposta certa é não fazer nada. Uma chance por questão, sem mudar resposta. Online: inscrição de $37 com 12 meses de tentativas ilimitadas; presencial: $37 por tentativa.",
        es: "Escenarios filmados desde el punto de vista del conductor, construidos sobre los tipos de choque que más atrapan a los conductores nuevos de SA. Te dicen qué quiere hacer el conductor y respondes solo si y cuando es seguro — a veces la respuesta correcta es no hacer nada. Una oportunidad por pregunta, sin cambiar respuestas. En línea: inscripción de $37 con 12 meses de intentos ilimitados; presencial: $37 por intento."
      },
      bookUrl:
        "https://www.sa.gov.au/topics/driving-and-transport/licences/tests/hazard-perception-test"
    },
    practical: {
      name: "VORT (Vehicle On Road Test)",
      format: {
        en: "About 45 minutes with an authorised examiner: five low-speed manoeuvres — hill start, angle park, U-turn, 3-point turn and reverse parallel park — plus a general drive through lanes, lights, roundabouts and give-way situations. You need 90% or more, and any breach of a road law ends the test as an immediate fail.",
        pt: "Cerca de 45 minutos com um examinador autorizado: cinco manobras de baixa velocidade — saída em rampa, estacionamento em ângulo, retorno, manobra em três pontos e baliza — mais um trajeto geral por faixas, semáforos, rotatórias e preferências. Você precisa de 90% ou mais, e qualquer infração de trânsito encerra o teste como reprovação imediata.",
        es: "Unos 45 minutos con un examinador autorizado: cinco maniobras de baja velocidad — arranque en pendiente, estacionamiento en ángulo, giro en U, giro en tres puntos y estacionamiento en paralelo en reversa — más un recorrido general por carriles, semáforos, rotondas y cedas de paso. Necesitas 90% o más, y cualquier infracción de tránsito termina el examen como reprobación inmediata."
      },
      routes: {
        en: "SA gives you two routes to the certificate of competency: the one-off VORT above, or CBT&A — progressive training through the 30 tasks in your Driving Companion with an authorised examiner, no final test, and unsuccessful attempts simply re-trained. You can switch from CBT&A to a VORT at any time.",
        pt: "SA dá duas rotas até o certificado de competência: o VORT único acima, ou o CBT&A — treinamento progressivo pelas 30 tarefas do Driving Companion com um examinador autorizado, sem prova final, e tentativas malsucedidas são simplesmente retreinadas. Dá para trocar do CBT&A para um VORT a qualquer momento.",
        es: "SA te da dos rutas al certificado de competencia: el VORT único de arriba, o CBT&A — entrenamiento progresivo por las 30 tareas del Driving Companion con un examinador autorizado, sin examen final, y los intentos fallidos simplemente se vuelven a entrenar. Puedes cambiar de CBT&A a un VORT en cualquier momento."
      },
      bring: {
        en: "The VORT runs with a private authorised examiner, booked at least three days ahead. Bring your learner's permit and your Driving Companion — the examiner needs it at every session. After passing, take your certificate of competency to Service SA to apply for the P1.",
        pt: "O VORT acontece com um examinador privado autorizado, agendado com pelo menos três dias de antecedência. Leve seu learner's permit e o Driving Companion — o examinador precisa dele em toda sessão. Depois de passar, leve o certificado de competência ao Service SA para solicitar a P1.",
        es: "El VORT se hace con un examinador privado autorizado, reservado con al menos tres días de antelación. Lleva tu learner's permit y el Driving Companion — el examinador lo necesita en cada sesión. Tras aprobar, lleva el certificado de competencia a Service SA para solicitar la P1."
      },
      bookUrl:
        "https://www.sa.gov.au/topics/driving-and-transport/licences/tests/practical-driving-test"
    }
  },
  TAS: {
    code: "TAS",
    hazard: {
      stage: "learner",
      name: "Hazard Perception Test (HPT)",
      when: {
        en: "You can sit it from 3 months before your earliest practical test date (12 months after your learner licence was issued), and your logbook doesn't need to be finished first. Pass it before booking the P1 assessment — a pass is valid for 12 months.",
        pt: "Você pode fazer a partir de 3 meses antes da sua data mínima de teste prático (12 meses após a emissão da learner licence), e o logbook não precisa estar completo. Passe antes de agendar a avaliação P1 — a aprovação vale 12 meses.",
        es: "Puedes rendirlo desde 3 meses antes de tu fecha mínima de examen práctico (12 meses tras la emisión de la learner licence), y el logbook no necesita estar completo. Apruébalo antes de reservar la evaluación P1 — la aprobación vale 12 meses."
      },
      format: {
        en: "Free and online on the Plates Plus site, on any device: 25 short driving clips where you click 'take action' when it's safe — or let the clip play out when no action is safe. 13 of 25 is a pass, the limit is 45 minutes (most finish in 20), and you can retry immediately, at no cost, as many times as you need.",
        pt: "Grátis e online no site Plates Plus, em qualquer aparelho: 25 clipes curtos de direção onde você clica em 'take action' quando é seguro — ou deixa o clipe rodar quando nenhuma ação é segura. 13 de 25 passa, o limite é 45 minutos (a maioria termina em 20), e você pode tentar de novo na hora, de graça, quantas vezes precisar.",
        es: "Gratis y en línea en el sitio Plates Plus, en cualquier dispositivo: 25 clips cortos de conducción donde haces clic en 'take action' cuando es seguro — o dejas correr el clip cuando ninguna acción es segura. 13 de 25 aprueba, el límite es 45 minutos (la mayoría termina en 20), y puedes reintentar al instante, gratis, cuantas veces necesites."
      },
      bookUrl: "https://www.platesplus.tas.gov.au/hpt"
    },
    practical: {
      name: "P1 Practical Driving Assessment",
      format: {
        en: "The on-road drive runs for around 30 minutes following the assessor's directions. Seven criteria are marked: look, signal, flow, movement, path, responsiveness and vehicle management. $108.93 with a government assessor, arrive at least 15 minutes early, and the drive may be filmed for safety and review.",
        pt: "O trajeto na via dura cerca de 30 minutos seguindo as instruções do avaliador. Sete critérios são avaliados: observação, sinalização, fluidez, movimento, trajetória, capacidade de resposta e controle do veículo. $108,93 com avaliador do governo, chegue pelo menos 15 minutos antes, e a volta pode ser filmada para segurança e revisão.",
        es: "El recorrido en vía dura unos 30 minutos siguiendo las indicaciones del evaluador. Se evalúan siete criterios: observación, señalización, fluidez, movimiento, trayectoria, capacidad de respuesta y control del vehículo. $108,93 con evaluador del gobierno, llega al menos 15 minutos antes, y el recorrido puede filmarse por seguridad y revisión."
      },
      routes: {
        en: "One test, two ways to sit it: a government assessor (book online or at Service Tasmania) or a private Authorised P1 Driving Assessor — between them they cover Hobart, Launceston, Burnie, Devonport and rural sites across the state; private assessors charge the standard fee plus extras like car hire. You can't be assessed by someone who instructed you during your L2 stage.",
        pt: "Uma prova, duas formas de fazer: avaliador do governo (agende online ou no Service Tasmania) ou um Authorised P1 Driving Assessor privado — juntos cobrem Hobart, Launceston, Burnie, Devonport e locais rurais pelo estado; assessores privados cobram a taxa padrão mais extras como aluguel de carro. Você não pode ser avaliado por quem te instruiu na fase L2.",
        es: "Un examen, dos formas de rendirlo: un evaluador del gobierno (reserva en línea o en Service Tasmania) o un Authorised P1 Driving Assessor privado — entre ambos cubren Hobart, Launceston, Burnie, Devonport y sitios rurales por todo el estado; los evaluadores privados cobran la tarifa estándar más extras como alquiler de auto. No puede evaluarte quien te instruyó en la etapa L2."
      },
      bring: {
        en: "Your Tasmanian learner licence, your verified and signed logbook, any medical or exemption paperwork, payment if not already made, and a suitable car. You may be asked to agree to the assessment being filmed.",
        pt: "Sua learner licence da Tasmânia, o logbook verificado e assinado, documentos médicos ou de isenção se houver, o pagamento se ainda não foi feito e um carro adequado. Podem pedir que você concorde com a filmagem da avaliação.",
        es: "Tu learner licence de Tasmania, el logbook verificado y firmado, documentos médicos o de exención si corresponde, el pago si aún no se hizo y un auto adecuado. Pueden pedirte que aceptes que la evaluación sea filmada."
      },
      bookUrl:
        "https://www.service.tas.gov.au/services/transport/driver-and-rider-licences/book-a-provisional-driving-assessment/"
    }
  },
  ACT: {
    code: "ACT",
    hazard: {
      stage: "learner",
      name: "Hazard Perception Test (online)",
      when: {
        en: "After 3 months on your Ls. It's mandatory before you can upgrade to a provisional licence — you'll need the pass certificate before your practical assessment.",
        pt: "Após 3 meses de L. É obrigatório antes de subir para a licença provisória — você vai precisar do certificado de aprovação antes da avaliação prática.",
        es: "Tras 3 meses con la L. Es obligatorio antes de subir a la licencia provisional — necesitarás el certificado de aprobación antes de la evaluación práctica."
      },
      format: {
        en: "Fully online on your own device via safeplatestesting.act.gov.au: 25 videos of about 15 seconds each, 20-30 minutes total, with instant results and a downloadable certificate. First attempt free, $27.90 after that, with lockouts after fails (24 hours, then 3 days). Ten minutes of inactivity counts as a failed attempt — and a bigger screen genuinely helps.",
        pt: "Totalmente online no seu aparelho via safeplatestesting.act.gov.au: 25 vídeos de uns 15 segundos cada, 20-30 minutos no total, com resultado na hora e certificado para baixar. Primeira tentativa grátis, $27,90 depois, com bloqueios após reprovar (24 horas, depois 3 dias). Dez minutos de inatividade contam como reprovação — e uma tela maior ajuda de verdade.",
        es: "Totalmente en línea en tu dispositivo vía safeplatestesting.act.gov.au: 25 videos de unos 15 segundos cada uno, 20-30 minutos en total, con resultado al instante y certificado descargable. Primer intento gratis, $27,90 después, con bloqueos tras reprobar (24 horas, luego 3 días). Diez minutos de inactividad cuentan como intento fallido — y una pantalla más grande ayuda de verdad."
      },
      bookUrl: "https://safeplatestesting.act.gov.au/c/spt?a=apps&ap=hpt"
    },
    practical: {
      name: "one-off practical driving assessment",
      format: {
        en: "A single on-road assessment by an ACT Government examiner in your own car, marked against the ACT Assessment Standards. The most common fails: not following speed signage, skipping head checks and mirrors before lane changes, and overrunning stop or give-way lines. You must be 17 on the day, and rescheduling needs 48 hours' notice.",
        pt: "Uma avaliação única na via com um examinador do governo do ACT no seu carro, avaliada contra os ACT Assessment Standards. As reprovações mais comuns: não seguir a sinalização de velocidade, pular head checks e espelhos antes de mudar de faixa, e passar das linhas de stop ou preferência. Você precisa ter 17 no dia, e remarcar exige 48 horas de aviso.",
        es: "Una evaluación única en la vía con un examinador del gobierno del ACT en tu propio auto, calificada contra los ACT Assessment Standards. Las reprobaciones más comunes: no seguir la señalización de velocidad, saltarse los head checks y espejos antes de cambiar de carril, y pasarse de las líneas de stop o ceda el paso. Debes tener 17 el día del examen, y reprogramar exige 48 horas de aviso."
      },
      routes: {
        en: "Two routes to your Ps in the ACT: the one-off assessment above, or CBT&A — an accredited driving instructor signs off 23 competencies across your lessons (minimum 7, most learners take 10-15) with no separate government test at the end. Both routes need the HPT certificate and your logbook hours.",
        pt: "Duas rotas até os Ps no ACT: a avaliação única acima, ou o CBT&A — um instrutor credenciado atesta 23 competências ao longo das aulas (mínimo 7, a maioria leva 10-15) sem prova do governo no final. As duas rotas exigem o certificado do HPT e as horas do logbook.",
        es: "Dos rutas a tus Ps en el ACT: la evaluación única de arriba, o CBT&A — un instructor acreditado firma 23 competencias a lo largo de tus clases (mínimo 7, la mayoría toma 10-15) sin examen del gobierno al final. Ambas rutas requieren el certificado del HPT y las horas del logbook."
      },
      bring: {
        en: "Your ACT learner licence, completed logbook and HPT certificate, plus your own registered, roadworthy car: L plates on, working centre park brake, at least a quarter tank of fuel and working air-conditioning.",
        pt: "Sua learner licence do ACT, o logbook completo e o certificado do HPT, mais o seu carro registrado e em condições: placas L, freio de mão central funcionando, pelo menos um quarto de tanque e ar-condicionado funcionando.",
        es: "Tu learner licence del ACT, el logbook completo y el certificado del HPT, más tu propio auto registrado y en condiciones: placas L puestas, freno de mano central funcional, al menos un cuarto de tanque y aire acondicionado en funcionamiento."
      },
      bookUrl:
        "https://www.accesscanberra.act.gov.au/driving-transport-and-parking/licences/one-off-practical-driving-assessment"
    }
  },
  NT: {
    code: "NT",
    hazard: null,
    practical: {
      name: "practical driving test",
      format: {
        en: "About 40 minutes with an authorised driving examiner, who scores speed management, road positioning, decision making, responding to hazards and vehicle control across a zoned score sheet — 90% or more with no fail items to pass. Three set manoeuvres: reverse parallel park, three-point turn, and a kerb-side stop with hill start. Every test is video-recorded, driver-assist tech like cruise control must stay off, and if you fail you can try again from the next day.",
        pt: "Cerca de 40 minutos com um examinador autorizado, que pontua gestão de velocidade, posicionamento, tomada de decisão, resposta a riscos e controle do veículo numa planilha por zonas — 90% ou mais sem itens de reprovação para passar. Três manobras obrigatórias: baliza, manobra em três pontos e parada junto à guia com saída em rampa. Todo teste é filmado, assistentes como cruise control ficam desligados, e se reprovar você pode tentar de novo a partir do dia seguinte.",
        es: "Unos 40 minutos con un examinador autorizado, que puntúa gestión de velocidad, posicionamiento, toma de decisiones, respuesta a riesgos y control del vehículo en una hoja por zonas — 90% o más sin ítems de reprobación para aprobar. Tres maniobras obligatorias: estacionar en paralelo en reversa, giro en tres puntos y parada junto al cordón con arranque en pendiente. Todo examen se graba en video, los asistentes como el cruise control deben ir apagados, y si repruebas puedes intentar de nuevo desde el día siguiente."
      },
      routes: null,
      bring: {
        en: "Arrive 10 minutes early with your learner licence (held continuously for 6 months) and a registered, roadworthy car with L plates — examiners check it and can reject it for faults; most offer hire cars for a fee. DriveSafe NT enrolees have the test fee waived. A pass is valid for 12 months to claim your provisional licence at an MVR office.",
        pt: "Chegue 10 minutos antes com sua learner licence (mantida por 6 meses contínuos) e um carro registrado e em condições com placas L — o examinador o inspeciona e pode rejeitá-lo por defeitos; a maioria oferece carro de aluguel por uma taxa. Inscritos no DriveSafe NT têm a taxa do teste dispensada. A aprovação vale 12 meses para retirar a licença provisória num escritório do MVR.",
        es: "Llega 10 minutos antes con tu learner licence (mantenida 6 meses continuos) y un auto registrado y en condiciones con placas L — el examinador lo revisa y puede rechazarlo por fallas; la mayoría ofrece autos de alquiler por una tarifa. Los inscritos en DriveSafe NT tienen la tarifa del examen exonerada. La aprobación vale 12 meses para retirar la licencia provisional en una oficina del MVR."
      },
      bookUrl:
        "https://nt.gov.au/driving/licence/getting-an-nt-licence/get-your-driver-licence/take-a-practical-driving-test-with-an-authorised-driving-examiner"
    }
  }
};

export function getStatePrep(code: string): StatePrepData {
  return PREP[code as AuStateCode] ?? PREP.WA;
}

export function listStatePrep(): StatePrepData[] {
  return Object.values(PREP);
}

/* ── Shared coaching copy (true everywhere; the facts above are per-state) ── */

const HAZARD_PREPARE = {
  heading: { en: "How to prepare", pt: "Como se preparar", es: "Cómo prepararse" },
  body: {
    en: "Practise scanning ahead and to the sides while driving with your supervisor. Talk out loud about what could go wrong next. It trains the same instinct the test measures.",
    pt: "Pratique observar à frente e aos lados ao dirigir com seu supervisor. Fale em voz alta sobre o que pode dar errado a seguir. Treina o mesmo instinto que o teste mede.",
    es: "Practica mirar adelante y a los lados al conducir con tu supervisor. Di en voz alta qué podría salir mal. Entrena el mismo instinto que mide el test."
  }
};

const HAZARD_TEST_DAY = {
  heading: { en: "On test day", pt: "No dia do teste", es: "El día del test" },
  body: {
    en: "Respond as soon as a hazard starts to develop, not when it's already dangerous. Don't click randomly — the system can flag that. Stay calm and watch the whole scene.",
    pt: "Responda assim que um perigo começa a se formar, não quando já está perigoso. Não clique aleatoriamente — o sistema pode sinalizar isso. Mantenha a calma e observe toda a cena.",
    es: "Responde apenas un peligro empieza a desarrollarse, no cuando ya es peligroso. No hagas clic al azar — el sistema puede marcarlo. Mantén la calma y observa toda la escena."
  }
};

const PRACTICAL_HOW_TO_PASS = {
  heading: { en: "How to pass", pt: "Como passar", es: "Cómo aprobar" },
  body: {
    en: "Do the basics consistently: mirror checks, head checks, correct speed, smooth stopping, and give way correctly. Assessors fail more people for missed observations than for nerves.",
    pt: "Faça o básico de forma consistente: espelhos, ponto cego, velocidade correta, parada suave e dar preferência certo. Reprovam mais por falta de observação do que por nervosismo.",
    es: "Haz lo básico con constancia: espejos, punto ciego, velocidad correcta, frenado suave y ceder el paso bien. Reprueban más por falta de observación que por nervios."
  }
};

const PRACTICAL_CONFIDENCE = {
  heading: {
    en: "Confidence on the day",
    pt: "Confiança no dia",
    es: "Confianza el día del examen"
  },
  body: {
    en: "Sleep well, arrive early, and do a warm-up drive in the area first. Feeling nervous is normal. Practising the route type (not the exact route) helps you stay calm.",
    pt: "Durma bem, chegue cedo e faça uma volta de aquecimento na região antes. Sentir-se nervoso é normal. Praticar o tipo de percurso (não a rota exata) ajuda a manter a calma.",
    es: "Duerme bien, llega temprano y haz una vuelta de calentamiento en la zona antes. Estar nervioso es normal. Practicar el tipo de recorrido (no la ruta exacta) ayuda a mantener la calma."
  }
};

/** Builds the hazard-test prep hub for the selected jurisdiction. */
export function buildHazardHub(profile: StateProfile): PrepHub {
  const prep = getStatePrep(profile.code);

  if (!prep.hazard) {
    // NT: no hazard test at any stage — say so instead of showing WA content.
    return {
      officialUrl: prep.practical.bookUrl,
      kicker: {
        en: "Hazard Perception Test",
        pt: "Teste de Percepção de Risco",
        es: "Test de Percepción de Peligros"
      },
      title: {
        en: `No hazard perception test in the ${profile.code}`,
        pt: `O ${profile.code} não tem teste de percepção de risco`,
        es: `El ${profile.code} no tiene test de percepción de peligros`
      },
      intro: {
        en: `${profile.name} has no hazard perception test at any licensing stage: after the theory test and your supervised practice, you go straight to the ${prep.practical.name}. Hazard scanning is still the skill that test checks on the road.`,
        pt: `${profile.name} não tem teste de percepção de risco em nenhuma etapa: depois da prova teórica e da prática supervisionada, você vai direto para o ${prep.practical.name}. Ler os riscos continua sendo a habilidade que essa prova avalia na via.`,
        es: `${profile.name} no tiene test de percepción de peligros en ninguna etapa: tras el examen teórico y la práctica supervisada, pasas directo al ${prep.practical.name}. Leer los riesgos sigue siendo la habilidad que ese examen evalúa en la vía.`
      },
      sections: [HAZARD_PREPARE]
    };
  }

  const h = prep.hazard;
  const sections: PrepHub["sections"] = [
    {
      heading: { en: "When you sit it", pt: "Quando você faz", es: "Cuándo lo rindes" },
      body: h.when
    },
    {
      heading: {
        en: "What the test looks like",
        pt: "Como é o teste",
        es: "Cómo es el test"
      },
      body: h.format
    },
    HAZARD_PREPARE,
    HAZARD_TEST_DAY
  ];

  return {
    officialUrl: h.bookUrl,
    kicker: {
      en: h.name,
      pt: h.name,
      es: h.name
    },
    title: {
      en: `${profile.code} ${h.name} prep: spot hazards before they become problems`,
      pt: `Preparação para o ${h.name} de ${profile.code}: identifique perigos antes que virem problema`,
      es: `Preparación para el ${h.name} de ${profile.code}: detecta peligros antes de que sean un problema`
    },
    intro:
      h.stage === "p1"
        ? {
            en: `In ${profile.name} the ${h.name} is not a learner-stage test: you sit it later, on your P1, to progress. Here's what it looks like so you can build the skill early.`,
            pt: `Em ${profile.name} o ${h.name} não é da etapa learner: você o faz depois, na P1, para progredir. Veja como ele é para construir a habilidade desde já.`,
            es: `En ${profile.name} el ${h.name} no es de la etapa learner: lo rindes después, en la P1, para progresar. Así es el test, para que desarrolles la habilidad desde ya.`
          }
        : {
            en: `The ${h.name} is ${profile.name}'s hazard test on the way to your Ps. You watch traffic scenes and respond when you spot a developing hazard.`,
            pt: `O ${h.name} é o teste de percepção de risco de ${profile.name} no caminho até os Ps. Você assiste a cenas de trânsito e responde ao identificar um perigo em formação.`,
            es: `El ${h.name} es el test de percepción de peligros de ${profile.name} en el camino a tus Ps. Ves escenas de tráfico y respondes al detectar un peligro en desarrollo.`
          },
    sections
  };
}

/** Builds the practical-test prep hub for the selected jurisdiction. */
export function buildPracticalHub(profile: StateProfile): PrepHub {
  const prep = getStatePrep(profile.code);
  const p = prep.practical;

  const sections: PrepHub["sections"] = [
    {
      heading: { en: "What the test is", pt: "Como é a prova", es: "Cómo es el examen" },
      body: p.format
    }
  ];
  if (p.routes) {
    sections.push({
      heading: {
        en: "Your route options",
        pt: "Suas opções de rota",
        es: "Tus opciones de ruta"
      },
      body: p.routes
    });
  }
  sections.push(
    {
      heading: { en: "What to bring", pt: "O que levar", es: "Qué llevar" },
      body: p.bring
    },
    PRACTICAL_HOW_TO_PASS,
    PRACTICAL_CONFIDENCE
  );

  return {
    officialUrl: p.bookUrl,
    kicker: {
      en: p.name,
      pt: p.name,
      es: p.name
    },
    title: {
      en: `${profile.code} ${p.name} prep: drive safely, unsupervised, on the day`,
      pt: `Preparação para o ${p.name} de ${profile.code}: dirigir com segurança, sem supervisão, no dia`,
      es: `Preparación para el ${p.name} de ${profile.code}: conducir con seguridad, sin supervisión, el día del examen`
    },
    intro: {
      en: `The ${p.name} is your on-road driving test in ${profile.name}. An assessor checks that you can drive safely and independently in real traffic. It's the last step before your Ps.`,
      pt: `O ${p.name} é a sua prova de direção na via em ${profile.name}. Um avaliador verifica se você dirige com segurança e de forma independente no trânsito real. É o último passo antes dos Ps.`,
      es: `El ${p.name} es tu examen de conducción en vía en ${profile.name}. Un evaluador comprueba que conduces con seguridad e independencia en tráfico real. Es el último paso antes de tus Ps.`
    },
    sections
  };
}
