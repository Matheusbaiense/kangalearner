import type { UiLang } from "@/lib/i18n";

/**
 * Confidence / Anxiety track. A calm, practical layer for the most common things
 * that make learners (especially newcomers) nervous behind the wheel.
 * Self-rating is client-side (localStorage); each situation links to where to
 * practise it. No migration, guest-first.
 */

export interface ConfidenceItem {
  key: string;
  icon: string;
  /** Where to go to build confidence on this. A practice category or learn slug. */
  href: string;
  title: Record<UiLang, string>;
  /** Calm, practical guidance. Short. */
  tip: Record<UiLang, string>;
}

export const CONFIDENCE_ITEMS: ConfidenceItem[] = [
  {
    key: "roundabouts",
    icon: "🔄",
    href: "/learn/roundabouts",
    title: { en: "Roundabouts", pt: "Rotatórias", es: "Rotondas" },
    tip: {
      en: "Slow down on approach, pick your lane early, give way to traffic already in the roundabout, and signal out. You don't have to rush. Wait for a safe gap.",
      pt: "Reduza ao se aproximar, escolha a faixa cedo, dê preferência a quem já está na rotatória e sinalize ao sair. Não precisa ter pressa. Espere um espaço seguro.",
      es: "Reduce al acercarte, elige el carril pronto, cede el paso al tráfico que ya está en la rotonda y señaliza al salir. No tengas prisa. Espera un hueco seguro."
    }
  },
  {
    key: "merging",
    icon: "↔️",
    href: "/learn/lane-changing",
    title: {
      en: "Merging & lane changes",
      pt: "Entrar e mudar de faixa",
      es: "Incorporarse y cambiar de carril"
    },
    tip: {
      en: "Mirror, signal, head check, then move when there's a clear gap. Match the speed of the lane you're joining. That makes merging smooth and calm.",
      pt: "Espelho, seta, ponto cego, e mude quando houver espaço livre. Iguale a velocidade da faixa que vai entrar. Isso deixa a manobra suave e tranquila.",
      es: "Espejo, intermitente, punto ciego, y muévete cuando haya hueco. Iguala la velocidad del carril al que entras. Eso hace la maniobra suave y tranquila."
    }
  },
  {
    key: "night",
    icon: "🌙",
    href: "/learn/road-safety",
    title: { en: "Driving at night", pt: "Dirigir à noite", es: "Conducir de noche" },
    tip: {
      en: "Use your headlights, keep more following distance, and slow down. You can only react to what your lights show. Start on quiet, familiar streets.",
      pt: "Use os faróis, mantenha mais distância e reduza. Você só reage ao que os faróis mostram. Comece em ruas tranquilas e conhecidas.",
      es: "Usa las luces, mantén más distancia y reduce. Solo reaccionas a lo que iluminan tus luces. Empieza en calles tranquilas y conocidas."
    }
  },
  {
    key: "weather",
    icon: "🌧️",
    href: "/learn/weather-conditions",
    title: {
      en: "Rain & low visibility",
      pt: "Chuva e baixa visibilidade",
      es: "Lluvia y poca visibilidad"
    },
    tip: {
      en: "Slow down, increase your gap, and use your wipers and lights. If visibility is very poor, it's fine to pull over safely and wait it out.",
      pt: "Reduza, aumente a distância e use limpadores e faróis. Se a visibilidade estiver muito ruim, tudo bem parar com segurança e esperar passar.",
      es: "Reduce, aumenta la distancia y usa limpiaparabrisas y luces. Si la visibilidad es muy mala, está bien detenerte con seguridad y esperar."
    }
  },
  {
    key: "left-side",
    icon: "⬅️",
    href: "/overseas-licence",
    title: {
      en: "Driving on the left",
      pt: "Dirigir pela esquerda",
      es: "Conducir por la izquierda"
    },
    tip: {
      en: "New to left-side driving? Keep left, the driver sits on the right, and at intersections give way to your right. It feels strange for a few drives, then it clicks.",
      pt: "Novo na direção pela esquerda? Mantenha-se à esquerda, o motorista senta à direita e nos cruzamentos dê preferência à sua direita. Estranha nas primeiras vezes, depois engata.",
      es: "¿Nuevo conduciendo por la izquierda? Mantente a la izquierda, el conductor va a la derecha y en los cruces cede el paso a tu derecha. Es raro al principio, luego se asienta."
    }
  },
  {
    key: "test-day",
    icon: "🎯",
    href: "/pda",
    title: {
      en: "Test day nerves",
      pt: "Nervosismo no dia da prova",
      es: "Nervios el día del examen"
    },
    tip: {
      en: "Sleep well, arrive early, and do a short warm-up drive in the area first. Nerves are normal. The assessor wants you to drive safely, not perfectly.",
      pt: "Durma bem, chegue cedo e faça uma volta de aquecimento na região antes. Nervosismo é normal. O avaliador quer que você dirija com segurança, não com perfeição.",
      es: "Duerme bien, llega temprano y haz una vuelta de calentamiento en la zona. Los nervios son normales. El evaluador quiere que conduzcas con seguridad, no a la perfección."
    }
  }
];
