// KangaLearner — display labels for question categories (Progress, mock results, weak links)
(function () {
  "use strict";

  var CATEGORY_LABELS = {
    speed: {
      en: "Speed limits",
      pt: "Limites de velocidade",
      es: "Límites de velocidad"
    },
    giveway: {
      en: "Giving way",
      pt: "Dar passagem",
      es: "Ceder el paso"
    },
    signs: {
      en: "Road signs",
      pt: "Sinais de trânsito",
      es: "Señales de tránsito"
    },
    parking: {
      en: "Parking",
      pt: "Estacionamento",
      es: "Estacionamiento"
    },
    alcohol: {
      en: "Alcohol and BAC",
      pt: "Álcool e BAC",
      es: "Alcohol y TAC"
    },
    safety: {
      en: "Road safety",
      pt: "Segurança no trânsito",
      es: "Seguridad vial"
    },
    blindspot: {
      en: "Blind spot and overtaking",
      pt: "Ponto cego e ultrapassagem",
      es: "Ángulo muerto y adelantamiento"
    },
    lanes: {
      en: "Lane rules",
      pt: "Faixas e mudança de faixa",
      es: "Carriles y cambio de carril"
    },
    markings: {
      en: "Road markings",
      pt: "Marcas viárias",
      es: "Marcas viales"
    },
    emergency: {
      en: "Emergencies",
      pt: "Emergências",
      es: "Emergencias"
    },
    lights: {
      en: "Traffic lights",
      pt: "Semáforos",
      es: "Semáforos"
    }
  };

  function getBaseLang(lang) {
    var l = String(lang || "en");
    if (l === "pten") return "pt";
    if (l === "esen") return "es";
    if (l.indexOf("pt") === 0) return "pt";
    if (l.indexOf("es") === 0) return "es";
    return "en";
  }

  function normalizeCategory(cat) {
    var raw = String(cat || "")
      .toLowerCase()
      .trim();
    if (raw.includes("speed") || raw.includes("veloc")) return "speed";
    if (
      raw.includes("give") ||
      raw.includes("way") ||
      raw.includes("prefer") ||
      raw.includes("priority") ||
      raw.includes("ceder") ||
      raw.includes("passagem")
    )
      return "giveway";
    if (raw.includes("sign") || raw.includes("sinal") || raw.includes("señal")) return "signs";
    if (raw.includes("park") || raw.includes("estacion")) return "parking";
    if (
      raw.includes("alcohol") ||
      raw.includes("bac") ||
      raw.includes("tac") ||
      raw.includes("álcool")
    )
      return "alcohol";
    if (raw.includes("safe") || raw.includes("seguran") || raw.includes("seguridad"))
      return "safety";
    if (
      raw.includes("blind") ||
      raw.includes("overtak") ||
      raw.includes("ponto cego") ||
      raw.includes("ángulo") ||
      raw.includes("ultrapass") ||
      raw.includes("adelant")
    )
      return "blindspot";
    if (raw.includes("lane") || raw.includes("faixa") || raw.includes("carril")) return "lanes";
    if (raw.includes("mark") || raw.includes("marca")) return "markings";
    if (raw.includes("emergen")) return "emergency";
    if (raw.includes("light") || raw.includes("sema") || raw.includes("tráfego")) return "lights";
    return raw;
  }

  function getCategoryLabel(cat, lang) {
    var displayLang = getBaseLang(lang);
    var key = normalizeCategory(cat);
    var row = CATEGORY_LABELS[key];
    if (row) return row[displayLang] || row.en || cat || "";
    return cat || "";
  }

  window.KANGA_CATEGORIES = {
    getCategoryLabel: getCategoryLabel,
    normalizeCategory: normalizeCategory,
    getBaseLang: getBaseLang
  };
})();
