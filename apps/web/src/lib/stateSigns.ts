import type { AuStateCode, LocalizedText } from "@kanga/core";

/**
 * Placas reais por estado para a secao "Placas que caem na prova" das paginas
 * /learner-test/[state]. Cada imagem vem de apps/web/public/icons/signs e e
 * referenciada pelas proprias perguntas daquele estado (conferidas
 * visualmente: so placas legiveis, nunca diagramas de cenario).
 * Estado sem entrada aqui simplesmente nao renderiza a secao.
 */
export interface StateSign {
  src: string;
  alt: LocalizedText;
}

const SIGNS = "/icons/signs";

export const STATE_SIGNS: Partial<Record<AuStateCode, StateSign[]>> = {
  WA: [
    {
      src: `${SIGNS}/give-way-sign.png`,
      alt: {
        en: "Give way sign",
        pt: "Placa de preferência (Give Way)",
        es: "Señal de ceda el paso (Give Way)"
      }
    },
    {
      src: `${SIGNS}/no-entry.png`,
      alt: {
        en: "No entry sign",
        pt: "Placa de entrada proibida (No Entry)",
        es: "Señal de prohibido entrar (No Entry)"
      }
    },
    {
      src: `${SIGNS}/no-u-turn-sign.png`,
      alt: {
        en: "No U-turn sign",
        pt: "Placa de proibido retornar (No U Turn)",
        es: "Señal de prohibido girar en U"
      }
    },
    {
      src: `${SIGNS}/keep-left.png`,
      alt: {
        en: "Keep left sign",
        pt: "Placa de manter-se à esquerda (Keep Left)",
        es: "Señal de manténgase a la izquierda (Keep Left)"
      }
    },
    {
      src: `${SIGNS}/one-way.png`,
      alt: {
        en: "One way sign",
        pt: "Placa de mão única (One Way)",
        es: "Señal de sentido único (One Way)"
      }
    },
    {
      src: `${SIGNS}/speed-limit-60.png`,
      alt: {
        en: "60 km/h speed limit sign",
        pt: "Placa de limite de velocidade de 60 km/h",
        es: "Señal de límite de velocidad de 60 km/h"
      }
    },
    {
      src: `${SIGNS}/winding-road.png`,
      alt: {
        en: "Winding road warning sign",
        pt: "Placa de aviso de estrada sinuosa",
        es: "Señal de advertencia de camino sinuoso"
      }
    },
    {
      src: `${SIGNS}/childrens-crossing-warning.png`,
      alt: {
        en: "Children's crossing warning sign",
        pt: "Placa de aviso de travessia de crianças",
        es: "Señal de advertencia de cruce de niños"
      }
    }
  ],
  NSW: [
    {
      src: `${SIGNS}/nsw-stop-sign.png`,
      alt: { en: "Stop sign", pt: "Placa de pare (Stop)", es: "Señal de alto (Stop)" }
    },
    {
      src: `${SIGNS}/nsw-give-way-sign.png`,
      alt: {
        en: "Give way sign",
        pt: "Placa de preferência (Give Way)",
        es: "Señal de ceda el paso (Give Way)"
      }
    },
    {
      src: `${SIGNS}/nsw-keep-left-sign.png`,
      alt: {
        en: "Keep left sign",
        pt: "Placa de manter-se à esquerda (Keep Left)",
        es: "Señal de manténgase a la izquierda (Keep Left)"
      }
    },
    {
      src: `${SIGNS}/nsw-no-right-turn-sign.png`,
      alt: {
        en: "No right turn sign",
        pt: "Placa de proibido virar à direita",
        es: "Señal de prohibido girar a la derecha"
      }
    },
    {
      src: `${SIGNS}/nsw-speed-limit-50-sign.png`,
      alt: {
        en: "50 km/h speed limit sign",
        pt: "Placa de limite de velocidade de 50 km/h",
        es: "Señal de límite de velocidad de 50 km/h"
      }
    },
    {
      src: `${SIGNS}/nsw-freeway-begins-sign.png`,
      alt: {
        en: "Freeway begins sign",
        pt: "Placa de início de freeway",
        es: "Señal de inicio de autopista"
      }
    },
    {
      src: `${SIGNS}/nsw-hump-ahead-warning-sign.png`,
      alt: {
        en: "Hump ahead warning sign",
        pt: "Placa de aviso de lombada adiante",
        es: "Señal de advertencia de lomo de burro adelante"
      }
    },
    {
      src: `${SIGNS}/nsw-slippery-when-wet-sign.png`,
      alt: {
        en: "Slippery when wet warning sign",
        pt: "Placa de aviso de pista escorregadia quando molhada",
        es: "Señal de advertencia de camino resbaladizo con lluvia"
      }
    }
  ],
  VIC: [
    {
      src: `${SIGNS}/vic-k0154.jpg`,
      alt: { en: "Stop sign", pt: "Placa de pare (Stop)", es: "Señal de alto (Stop)" }
    },
    {
      src: `${SIGNS}/vic-k0146.jpg`,
      alt: {
        en: "Keep left unless overtaking sign",
        pt: "Placa de manter-se à esquerda exceto para ultrapassar",
        es: "Señal de manténgase a la izquierda salvo para adelantar"
      }
    },
    {
      src: `${SIGNS}/vic-k0141.jpg`,
      alt: {
        en: "Slow hand-held sign",
        pt: "Placa manual de devagar (Slow)",
        es: "Señal manual de despacio (Slow)"
      }
    },
    {
      src: `${SIGNS}/vic-k0132.jpg`,
      alt: {
        en: "40 km/h local traffic area sign",
        pt: "Placa de área de tráfego local a 40 km/h",
        es: "Señal de zona de tráfico local a 40 km/h"
      }
    },
    {
      src: `${SIGNS}/vic-k0134.jpg`,
      alt: {
        en: "10 km/h shared zone sign",
        pt: "Placa de zona compartilhada a 10 km/h",
        es: "Señal de zona compartida a 10 km/h"
      }
    },
    {
      src: `${SIGNS}/vic-k0127.jpg`,
      alt: {
        en: "Slippery surface warning sign",
        pt: "Placa de aviso de pista escorregadia",
        es: "Señal de advertencia de superficie resbaladiza"
      }
    },
    {
      src: `${SIGNS}/vic-k0135.jpg`,
      alt: {
        en: "Curve with 45 km/h advisory speed sign",
        pt: "Placa de curva com velocidade recomendada de 45 km/h",
        es: "Señal de curva con velocidad recomendada de 45 km/h"
      }
    },
    {
      src: `${SIGNS}/vic-k0152.jpg`,
      alt: {
        en: "Stop sign ahead warning sign",
        pt: "Placa de aviso de pare adiante",
        es: "Señal de advertencia de alto adelante"
      }
    }
  ],
  QLD: [
    {
      src: `${SIGNS}/qld-image-81.jpg`,
      alt: { en: "Stop sign", pt: "Placa de pare (Stop)", es: "Señal de alto (Stop)" }
    },
    {
      src: `${SIGNS}/qld-image-82.jpg`,
      alt: {
        en: "Give way sign",
        pt: "Placa de preferência (Give Way)",
        es: "Señal de ceda el paso (Give Way)"
      }
    },
    {
      src: `${SIGNS}/qld-image-85.jpg`,
      alt: {
        en: "No entry sign",
        pt: "Placa de entrada proibida (No Entry)",
        es: "Señal de prohibido entrar (No Entry)"
      }
    },
    {
      src: `${SIGNS}/qld-image-74.jpg`,
      alt: {
        en: "Keep left sign",
        pt: "Placa de manter-se à esquerda (Keep Left)",
        es: "Señal de manténgase a la izquierda (Keep Left)"
      }
    },
    {
      src: `${SIGNS}/qld-image-78.jpg`,
      alt: {
        en: "One way sign",
        pt: "Placa de mão única (One Way)",
        es: "Señal de sentido único (One Way)"
      }
    },
    {
      src: `${SIGNS}/qld-image-95.jpg`,
      alt: {
        en: "110 km/h speed limit sign",
        pt: "Placa de limite de velocidade de 110 km/h",
        es: "Señal de límite de velocidad de 110 km/h"
      }
    },
    {
      src: `${SIGNS}/qld-image-66.jpg`,
      alt: {
        en: "Slippery surface warning sign",
        pt: "Placa de aviso de pista escorregadia",
        es: "Señal de advertencia de superficie resbaladiza"
      }
    },
    {
      src: `${SIGNS}/qld-image-87.jpg`,
      alt: {
        en: "10 km/h shared zone sign",
        pt: "Placa de zona compartilhada a 10 km/h",
        es: "Señal de zona compartida a 10 km/h"
      }
    }
  ],
  SA: [
    {
      src: `${SIGNS}/si068.gif`,
      alt: {
        en: "No right turn sign",
        pt: "Placa de proibido virar à direita",
        es: "Señal de prohibido girar a la derecha"
      }
    },
    {
      src: `${SIGNS}/si008.gif`,
      alt: {
        en: "Left turn only sign",
        pt: "Placa de conversão obrigatória à esquerda",
        es: "Señal de giro obligatorio a la izquierda"
      }
    },
    {
      src: `${SIGNS}/si013.gif`,
      alt: {
        en: "60 km/h speed limit sign",
        pt: "Placa de limite de velocidade de 60 km/h",
        es: "Señal de límite de velocidad de 60 km/h"
      }
    },
    {
      src: `${SIGNS}/si016.gif`,
      alt: {
        en: "Kangaroos next 30 km warning sign",
        pt: "Placa de aviso de cangurus nos próximos 30 km",
        es: "Señal de advertencia de canguros en los próximos 30 km"
      }
    },
    {
      src: `${SIGNS}/si017.gif`,
      alt: {
        en: "T-intersection warning sign",
        pt: "Placa de aviso de cruzamento em T",
        es: "Señal de advertencia de intersección en T"
      }
    },
    {
      src: `${SIGNS}/si025.gif`,
      alt: {
        en: "Children crossing warning sign",
        pt: "Placa de aviso de travessia de crianças",
        es: "Señal de advertencia de cruce de niños"
      }
    },
    {
      src: `${SIGNS}/si045.gif`,
      alt: {
        en: "Road narrows warning sign",
        pt: "Placa de aviso de pista estreitando",
        es: "Señal de advertencia de camino que se angosta"
      }
    },
    {
      src: `${SIGNS}/si056.gif`,
      alt: {
        en: "Curve with 35 km/h advisory speed sign",
        pt: "Placa de curva com velocidade recomendada de 35 km/h",
        es: "Señal de curva con velocidad recomendada de 35 km/h"
      }
    }
  ],
  ACT: [
    {
      src: `${SIGNS}/act-SI001.gif`,
      alt: {
        en: "No entry sign",
        pt: "Placa de entrada proibida (No Entry)",
        es: "Señal de prohibido entrar (No Entry)"
      }
    },
    {
      src: `${SIGNS}/act-SI002.gif`,
      alt: {
        en: "Keep left sign",
        pt: "Placa de manter-se à esquerda (Keep Left)",
        es: "Señal de manténgase a la izquierda (Keep Left)"
      }
    },
    {
      src: `${SIGNS}/act-SI005.gif`,
      alt: {
        en: "No U-turn sign",
        pt: "Placa de proibido retornar (No U Turn)",
        es: "Señal de prohibido girar en U"
      }
    },
    {
      src: `${SIGNS}/act-SI009.gif`,
      alt: {
        en: "One way sign",
        pt: "Placa de mão única (One Way)",
        es: "Señal de sentido único (One Way)"
      }
    },
    {
      src: `${SIGNS}/act-SI013.gif`,
      alt: {
        en: "60 km/h speed limit sign",
        pt: "Placa de limite de velocidade de 60 km/h",
        es: "Señal de límite de velocidad de 60 km/h"
      }
    },
    {
      src: `${SIGNS}/act-SI016.gif`,
      alt: {
        en: "Kangaroos next 30 km warning sign",
        pt: "Placa de aviso de cangurus nos próximos 30 km",
        es: "Señal de advertencia de canguros en los próximos 30 km"
      }
    },
    {
      src: `${SIGNS}/act-SI017.gif`,
      alt: {
        en: "T-intersection warning sign",
        pt: "Placa de aviso de cruzamento em T",
        es: "Señal de advertencia de intersección en T"
      }
    },
    {
      src: `${SIGNS}/act-SI021.gif`,
      alt: {
        en: "Winding road warning sign",
        pt: "Placa de aviso de estrada sinuosa",
        es: "Señal de advertencia de camino sinuoso"
      }
    }
  ],
  NT: [
    {
      src: `${SIGNS}/nt-SI001.png`,
      alt: {
        en: "No entry sign",
        pt: "Placa de entrada proibida (No Entry)",
        es: "Señal de prohibido entrar (No Entry)"
      }
    },
    {
      src: `${SIGNS}/nt-SI002.png`,
      alt: {
        en: "Keep left sign",
        pt: "Placa de manter-se à esquerda (Keep Left)",
        es: "Señal de manténgase a la izquierda (Keep Left)"
      }
    },
    {
      src: `${SIGNS}/nt-SI007.png`,
      alt: {
        en: "Left turn only sign",
        pt: "Placa de conversão obrigatória à esquerda",
        es: "Señal de giro obligatorio a la izquierda"
      }
    },
    {
      src: `${SIGNS}/nt-SI009.png`,
      alt: {
        en: "60 km/h speed limit sign",
        pt: "Placa de limite de velocidade de 60 km/h",
        es: "Señal de límite de velocidad de 60 km/h"
      }
    },
    {
      src: `${SIGNS}/nt-SL002.png`,
      alt: {
        en: "110 km/h speed limit sign",
        pt: "Placa de limite de velocidade de 110 km/h",
        es: "Señal de límite de velocidad de 110 km/h"
      }
    },
    {
      src: `${SIGNS}/nt-SI011.png`,
      alt: {
        en: "Kangaroos next 30 km warning sign",
        pt: "Placa de aviso de cangurus nos próximos 30 km",
        es: "Señal de advertencia de canguros en los próximos 30 km"
      }
    },
    {
      src: `${SIGNS}/nt-SI016.png`,
      alt: {
        en: "Winding road warning sign",
        pt: "Placa de aviso de estrada sinuosa",
        es: "Señal de advertencia de camino sinuoso"
      }
    },
    {
      src: `${SIGNS}/nt-SI019.png`,
      alt: {
        en: "Children crossing warning sign",
        pt: "Placa de aviso de travessia de crianças",
        es: "Señal de advertencia de cruce de niños"
      }
    }
  ]
};
