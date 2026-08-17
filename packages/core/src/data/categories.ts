import type { Category as CategoryType } from "./questionsSchema";

export const CATEGORIES: readonly CategoryType[] = [
  {
    key: "Speed Limits",
    icon: "⚡",
    label: {
      en: "Speed Limits",
      pt: "Velocidade",
      es: "Velocidad"
    }
  },
  {
    key: "Give Way Rules",
    icon: "🛑",
    label: {
      en: "Give Way Rules",
      pt: "Preferência",
      es: "Prioridad"
    }
  },
  {
    key: "Alcohol & BAC",
    icon: "🍺",
    label: {
      en: "Alcohol & BAC",
      pt: "Álcool/BAC",
      es: "Alcohol/TAC"
    }
  },
  {
    key: "Parking Rules",
    icon: "🅿️",
    label: {
      en: "Parking Rules",
      pt: "Estacionamento",
      es: "Aparcamiento"
    }
  },
  {
    key: "Traffic Lights",
    icon: "🚦",
    label: {
      en: "Traffic Lights",
      pt: "Semáforos",
      es: "Semáforos"
    }
  },
  {
    key: "Road Signs",
    icon: "🪧",
    label: {
      en: "Road Signs",
      pt: "Sinais",
      es: "Señales"
    }
  },
  {
    key: "Road Safety",
    icon: "🛡️",
    label: {
      en: "Road Safety",
      pt: "Segurança",
      es: "Seguridad"
    }
  },
  {
    key: "Blind Spot & Overtaking",
    icon: "👁️",
    label: {
      en: "Blind Spot & Overtaking",
      pt: "Ponto Cego",
      es: "Ángulo Muerto"
    }
  },
  {
    key: "Road Markings",
    icon: "〰️",
    label: {
      en: "Road Markings",
      pt: "Faixas",
      es: "Marcas"
    }
  },
  {
    key: "Emergencies",
    icon: "🔧",
    label: {
      en: "Emergencies",
      pt: "Emergências",
      es: "Emergencias"
    }
  },
  {
    key: "Motorcycle Safety",
    icon: "🏍️",
    label: {
      en: "Motorcycle Safety",
      pt: "Segurança de Moto",
      es: "Seguridad de Moto"
    }
  },
  {
    key: "Roundabouts",
    icon: "🔄",
    label: {
      en: "Roundabouts",
      pt: "Rotatórias",
      es: "Rotondas"
    }
  },
  {
    key: "Lane Changing",
    icon: "↔️",
    label: {
      en: "Lane Changing",
      pt: "Mudança de Faixa",
      es: "Cambio de Carril"
    }
  },
  {
    key: "Weather Conditions",
    icon: "🌧️",
    label: {
      en: "Weather Conditions",
      pt: "Clima",
      es: "Clima"
    }
  },
  {
    key: "Seatbelts",
    icon: "💺",
    label: {
      en: "Seatbelts",
      pt: "Cintos",
      es: "Cinturones"
    }
  },
  {
    key: "Demerit Points",
    icon: "📋",
    label: {
      en: "Demerit Points",
      pt: "Pontos",
      es: "Puntos"
    }
  },
  {
    key: "Mobile Phones",
    icon: "📵",
    label: {
      en: "Mobile Phones",
      pt: "Celular",
      es: "Móvil"
    }
  },
  {
    key: "Fatigue",
    icon: "😴",
    label: {
      en: "Fatigue",
      pt: "Fadiga",
      es: "Fatiga"
    }
  },
  {
    key: "School Zones",
    icon: "🏫",
    label: {
      en: "School Zones",
      pt: "Zonas Escolares",
      es: "Zonas Escolares"
    }
  },
  {
    key: "Shared Zones",
    icon: "🚶",
    label: {
      en: "Shared Zones",
      pt: "Zonas Compartilhadas",
      es: "Zonas Compartidas"
    }
  },
  {
    key: "Towing",
    icon: "🚛",
    label: {
      en: "Towing",
      pt: "Reboque",
      es: "Remolque"
    }
  }
] as const;

